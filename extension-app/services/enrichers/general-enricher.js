/* global SYMPHONY */
import { openModal } from 'services/modal-service';
import { frontendURL, setupLinkPrefix } from 'utils/system/setup-url';
import { ENRICHER_EVENTS, MODAL_IDS } from './entities';
import MyEntityBuilder from './template-builders/my-entity-builder';
import CurrencyQuoteBuilder from './template-builders/currency-quote-builder';
import HelpCommandBuilder from './template-builders/help-command-builder';
import WelcomeMessageBuilder from './template-builders/welcome-message-builder';
import WelcomeMessageAboutRoomBuilder from './template-builders/welcome-message-about-room-builder';

const LINK_PREFIX = setupLinkPrefix();
const FRONTEND_SERVE_URL = frontendURL();

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
  }

  render(type, entity) {
    let data = {};
    if (entity.id) {
      data = typeof entity.id === 'object' ? entity.id : JSON.parse(entity.id);
    } else if (entity.payload) {
      data = typeof entity.payload === 'object' ? entity.payload : JSON.parse(entity.payload);
    }

    let actionData = {};
    let template;

    switch (type) {
      case ENRICHER_EVENTS.HELP_COMMAND.type:
        template = HelpCommandBuilder.build(data);
        break;
      case ENRICHER_EVENTS.WELCOME_MESSAGE_DIRECT_CHAT.type:
      case ENRICHER_EVENTS.WELCOME_MESSAGE_ROOM.type:
        template = WelcomeMessageBuilder.build();
        break;
      case ENRICHER_EVENTS.WELCOME_MESSAGE_ABOUT_ROOM.type:
        template = WelcomeMessageAboutRoomBuilder.build(data);
        break;
      case ENRICHER_EVENTS.TESTING.type:
        template = `<messageML>
          <h1>An enriched message!</h1>
          <p>What we got from the entity: ${JSON.stringify(data)}</p>
          <p><b>WOW</b> that's exciting!</p>
        </messageML>`;
        break;
      case ENRICHER_EVENTS.MY_ENTITY.type:
        template = MyEntityBuilder.build(data);
        break;
      case ENRICHER_EVENTS.CURRENCY_QUOTE.type:
        actionData = GeneralEnricher.actionFactory([{
          id: 'Buy',
          service: this.name,
          type: MODAL_IDS.CURRENCY_QUOTE_MODAL.type,
          entityData: data,
          label: 'Buy',
        }], this.name, MODAL_IDS.CURRENCY_QUOTE_MODAL.entity);
        template = CurrencyQuoteBuilder.build(data);
        break;
      default:
        template = `<messageML><p>No template found for this message entity</p><br />Caught: ${type}</messageML>`;
        break;
    }

    return {
      template,
      data: actionData,
    };
  }

  action(data) {
    switch (data.type) {
      case MODAL_IDS.EXAMPLE_MODAL.entity:
        openModal(MODAL_IDS.EXAMPLE_MODAL.entity, this.name, `${FRONTEND_SERVE_URL}${LINK_PREFIX}`, '560px', { page: 'exampleModal' });
        break;
      case MODAL_IDS.CURRENCY_QUOTE_MODAL.type:
        openModal(MODAL_IDS.CURRENCY_QUOTE_MODAL.entity, this.name, `${FRONTEND_SERVE_URL}${LINK_PREFIX}`, '260px', { page: MODAL_IDS.CURRENCY_QUOTE_MODAL.entity });
        break;
      default:
        openModal('noEntityDialog', this.name, `${FRONTEND_SERVE_URL}${LINK_PREFIX}`, '300px', { page: 'error' });
        break;
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
