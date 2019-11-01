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
  EXTENDED_CARD: {
    type: 'com.symphony.ms.devtools.testingEntity',
    json: {
      extraContent: 'Any other content that\'s in the entities.js file',
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
    type: 'com.symphony.ms.devtools.example-modal',
    entityData: {},
  },
  CURRENCY_QUOTE_MODAL: {
    entity: 'currency-quote',
    type: 'com.symphony.ms.devtools.currency-quote-modal',
    entityData: {},
  },
};
