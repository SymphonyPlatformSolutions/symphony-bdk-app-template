/* global SYMPHONY */
import IncidentCreationBuilder from './template-builders/incident-creation-builder';
import { ENRICHER_EVENTS } from './entities';

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
      case ENRICHER_EVENTS.INCIDENT_CREATION.type:
        template = IncidentCreationBuilder.build(data);
        break;
      default:
        template = `<messageML><p>No template found for this message entity</p><br />Caught: ${type}</messageML>`;
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
    let fullURL;
    let modalType;

    switch (data.entity) {
      default:
        modalType = 'noEntityDialog';
        fullURL = 'https://google.com';
    }
    this.dialogsService.show(modalType, this.name,
      `<dialog><iframe height="500" width="100%" src="${fullURL}" ></iframe></dialog>`,
      undefined, {});
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
