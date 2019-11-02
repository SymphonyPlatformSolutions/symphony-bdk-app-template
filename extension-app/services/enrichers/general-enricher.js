/* global SYMPHONY */
import { openModal } from 'services/modal-service';
import { frontendURL, setupLinkPrefix } from 'utils/system/setup-url';
import { SmsRenderer } from 'sms-sdk-renderer-node';
import { ENRICHER_EVENTS, MODAL_IDS } from './entities';
import AlertTest from './templates/base/alert-test-body.hbs';
import LinkTemplate from './templates/text/link.hbs';
import MyTemplate from './templates/base/custom-template.hbs';
import CurrencyQuote from './templates/base/currency-quote.hbs';
import ActionButton from './templates/components/action-button.hbs';

const LINK_PREFIX = setupLinkPrefix();
const FRONTEND_SERVE_URL = frontendURL();

const CUSTOM_TEMPLATE_NAMES = {
  MY_TEMPLATE: 'my-template',
  CURRENCY_QUOTE: 'currency-quote',
};

const partials = {
  'alert-test': AlertTest,
  link: LinkTemplate,
  'action-button': ActionButton,
};

const customTemplates = {
  [CUSTOM_TEMPLATE_NAMES.MY_TEMPLATE]: MyTemplate,
  [CUSTOM_TEMPLATE_NAMES.CURRENCY_QUOTE]: CurrencyQuote,
};

export default class GeneralEnricher {
  constructor(name) {
    this.name = name;
    this.messageEvents = Object.keys(ENRICHER_EVENTS).map(
      key => ENRICHER_EVENTS[key].type,
    );
    this.implements = ['render', 'action'];
    SmsRenderer.register(partials, customTemplates);
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
      data = typeof entity.payload === 'object'
        ? entity.payload
        : JSON.parse(entity.payload);
    }

    let actionData = {};
    let template;

    switch (type) {
      case ENRICHER_EVENTS.HELP_COMMAND.type:
        template = SmsRenderer.renderAppMessage(
          {
            title: 'Bot Commands',
            description: data.commands,
          },
          SmsRenderer.smsTypes.INFORMATION,
        );
        break;
      case ENRICHER_EVENTS.WELCOME_MESSAGE_DIRECT_CHAT.type:
        template = SmsRenderer.renderAppMessage(
          {
            title: 'Welcome!',
            description: data.message,
          },
          SmsRenderer.smsTypes.INFORMATION,
        );
        break;
      case ENRICHER_EVENTS.EXTENDED_CARD.type:
        template = SmsRenderer.renderAppMessage(
          {
            title: 'My custom entity editor',
            link: data.link,
            extraContent: data.extraContent,
          },
          CUSTOM_TEMPLATE_NAMES.MY_TEMPLATE,
        );
        break;
      case ENRICHER_EVENTS.CURRENCY_QUOTE.type:
        actionData = GeneralEnricher.actionFactory(
          [
            {
              id: 'Buy',
              service: this.name,
              type: MODAL_IDS.CURRENCY_QUOTE_MODAL.type,
              entityData: data,
              label: 'Buy',
            },
          ],
          this.name,
          MODAL_IDS.CURRENCY_QUOTE_MODAL.entity,
        );
        template = SmsRenderer.renderAppMessage(
          {
            header: data,
            buttons: [{ buttonId: 'Buy' }],
          },
          CUSTOM_TEMPLATE_NAMES.CURRENCY_QUOTE,
        );
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
      case MODAL_IDS.EXAMPLE_MODAL.type:
        openModal(
          MODAL_IDS.EXAMPLE_MODAL.entity,
          this.name,
          `${FRONTEND_SERVE_URL}${LINK_PREFIX}`,
          '560px',
          { page: MODAL_IDS.EXAMPLE_MODAL.entity, data },
        );
        break;
      case MODAL_IDS.CURRENCY_QUOTE_MODAL.type:
        openModal(
          MODAL_IDS.CURRENCY_QUOTE_MODAL.entity,
          this.name,
          `${FRONTEND_SERVE_URL}${LINK_PREFIX}`,
          '260px',
          { page: MODAL_IDS.CURRENCY_QUOTE_MODAL.entity, data },
        );
        break;
      default:
        openModal(
          'noEntityDialog',
          this.name,
          `${FRONTEND_SERVE_URL}${LINK_PREFIX}`,
          '300px',
          { page: 'error' },
        );
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
