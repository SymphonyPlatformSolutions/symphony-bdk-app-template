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
    type: 'currencyQuote',
    json: {
      from: {
        currency: 'USD',
        value: 1,
      },
      to: {
        currency: 'BRL',
        value: 4.10,
      },
      exchangeRate: 0.243902439,
    },
  },
};

export const MODAL_IDS = {
  EXAMPLE_MODAL: {
    entity: 'example-modal',
    entityData: {},
  },
};
