/* global SYMPHONY */

const ENRICHER_EVENTS = [
  'com.symphony.ms.devtools.template.test',
];
export default class GeneralEnricher {
  constructor(name, messageEvents, userId) {
    this.name = name;
    this.messageEvents = messageEvents;
    this.implements = ['render', 'action'];
    this.userId = userId;
  }

  static getMessages() {
    return ENRICHER_EVENTS;
  }

  setTheme(theme) {
    this.theme = theme;
  }

  getName() {
    return this.name;
  }

  init() {
    SYMPHONY.services.make(this.name, this, this.implements, true);
  }

  register() {
    const entity = SYMPHONY.services.subscribe('entity');

    if (this.messageEvents) {
      this.messageEvents.forEach((element) => {
        entity.registerRenderer(element, {}, this.name);
      });
    }

    this.dialogsService = SYMPHONY.services.subscribe('dialogs');
  }

  render(type, entity) {
    const data = typeof entity.id === 'object' ? entity.id : JSON.parse(entity.id);
    let actionData = {};
    let template;

    switch (type) {
      case 'org.symphony.ms.devtools.myEntity':
        if (data.event === 'update') {
          template = 'myTemplate';
        }
        break;
      default:
        template = `<messageML><p><strong>ERROR</strong> message not rendered.</p><br /> Caught: ${type}</messageML>`;
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
