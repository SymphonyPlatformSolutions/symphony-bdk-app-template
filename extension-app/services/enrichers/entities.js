export const ENRICHER_EVENTS = {
  HELP_COMMAND: {
    type: 'com.symphony.ms.devtools.template.helpCommand',
    json: {
      commands: '<b>Example:</b> @Example &lt;comand example&gt; <br /> ',
    },
  },
  WELCOME_MESSAGE_DIRECT_CHAT: {
    type: 'com.symphony.ms.devtools.template.welcomeMessageDirectChat',
    json: null,
  },
  WELCOME_MESSAGE_ROOM: {
    type: 'com.symphony.ms.devtools.template.welcomeMessageRoom',
    json: null,
  },
  TESTING: {
    type: 'com.symphony.ms.devtools.testingEntity',
    json: {
      extraContent: 'Anything else that I\'d like here!',
    },
  },
  CURRENCY_QUOTE: {
    type: 'com.symphony.ms.devtools.currencyQuote',
    json: {
      from: 'USD',
      from_name: 'United States Dollar',
      to: 'EUR',
      to_name: 'Euro',
      rate: 0.9124,
    },
  },
};

export const MODAL_IDS = {
  EXAMPLE_MODAL: {
    entity: 'example-modal',
    entityData: {},
  },
  CURRENCY_QUOTE_MODAL: {
    type: 'currency-quote',
    entity: 'com.symphony.ms.devtools.currency-quote-modal',
    entityData: {},
  },
};
