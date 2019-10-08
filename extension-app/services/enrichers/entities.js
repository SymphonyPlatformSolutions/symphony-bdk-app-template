export const ENRICHER_EVENTS = {
  TESTING: {
    type: 'com.symphony.ms.devtools.testingEntity',
    json: {
      commands: '<b>Example:</b> @Example &lt;comand example&gt; <br /> ',
    },
  },
  MY_ENTITY: {
    type: 'MyEntity',
    json: {},
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
