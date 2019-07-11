/* global SYMPHONY */
import { ENRICHER_EVENTS } from './entities';
import { MODAL_IDS } from '../../utils/system/app-constants';

export default class GeneralEnricher {
  constructor(name) {
    this.name = name;
    this.messageEvents = Object.keys(ENRICHER_EVENTS).map(key => ENRICHER_EVENTS[key].type);
    this.implements = ['render', 'action'];
  }

  static getMessages() {
    return Object.keys(ENRICHER_EVENTS).map(key => ENRICHER_EVENTS[key].type);
  }


  getName() {
    return this.name;
  }

  init() {
    SYMPHONY.services.make(this.name, this, this.implements, true);
  }

  register() {
    const entity = SYMPHONY.services.subscribe('entity');
    this.messageEvents.forEach((element) => {
      entity.registerRenderer(element, {}, this.name);
    });

    this.dialogsService = SYMPHONY.services.subscribe('dialogs');
  }

  render(type, entity) {
    const data = typeof entity.id === 'object' ? entity.id : JSON.parse(entity.id);
    let actionData = {};
    let template;

    switch (type) {
      case ENRICHER_EVENTS.TESTING.type:
        template = `<messageML>
          <h1>An enriched message!</h1>
          <p>What we got from the entity: ${JSON.stringify(data)}</p>
          <p><b>WOW</b> that's exciting!</p>
        </messageML>`;
        break;
      default:
        template = `<messageML><p><b>ERROR</b> message not rendered.</p><p>Caught: ${type}</p></messageML>`;
        actionData = {};
        break;
    }

    return {
      template,
      data: actionData,
    };
  }

  action(data) {
    this.dialogsService = SYMPHONY.services.subscribe('dialogs');
    let fullURL = `app.html?queryObj=${encodeURIComponent(JSON.stringify({ page: data.entity }))}`;
    let modalType;

    switch (data.entity) {
      case MODAL_IDS.EXAMPLE_MODAL.entity:
        this.dialogsService.show(modalType, this.name,
          `<dialog><iframe height="500" width="100%" src="${fullURL}" ></iframe></dialog>`,
          undefined, {});
        break;
      default:
        modalType = 'noEntityDialog';
        fullURL = 'https://yahoo.com';
        this.dialogsService.show(modalType, this.name,
          `<dialog><iframe height="500" width="100%" src="${fullURL}" ></iframe></dialog>`,
          undefined, {});
    }
  }

  static actionFactory(actions, service, entity) {
    return actions.reduce((result, action) => {
      const actionObj = {};
      const actionId = action.id || action.type;

      const actionData = {
        service,
        label: action.label,
        data: {
          entity,
          service: action.service,
          type: action.type,
          entityData: action.entityData,
        },
      };

      actionObj[actionId] = actionData;
      return Object.assign(result, actionObj);
    }, {});
  }
}
