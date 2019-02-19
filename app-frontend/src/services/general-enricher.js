/* global SYMPHONY */
export default class GeneralEnricher {
  constructor(name, messageEvents, userId) {
    this.name = name;
    this.messageEvents = messageEvents;
    this.implements = ['render', 'action'];
    this.userId = userId;
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
}
