export const ENRICHER_EVENTS = {
  WELCOME_MESSAGE_DIRECT_CHAT: {
    type: 'com.symphony.ms.devtools.template.welcomeMessageDirectChat',
    json: {
      message: 'Thank <b>you</b> for using the template app!',
    },
  },
  HELP_COMMAND: {
    type: 'com.symphony.ms.devtools.template.helpCommand',
    json: {
      title: 'Bot Commands',
      content: [
        '<b>@bot</b> /help - will display a help message',
        '<b>@bot</b> /buy GOGL34 - In order to buy you need to pass the stock identifier',
        '<b>@bot</b> /sell TSLA34 - In order to sell you need to pass the stock identifier',
      ],
    },
  },
  NOTIFICATION: {
    type: 'com.symphony.ms.devtools.notification',
    json: {
      alert: false,
      title: 'Something Interesting occurred!',
      content: {
        header: 'this is an notification sample expand to learn more',
        body: 'it exemplifies the capabilities we have using the sdk',
      },
      showStatusBar: true,
      comment: {
        body: 'so interesting!',
      },
      description: 'this is a brief description',
      assignee: {
        displayName: 'John Doe',
      },
      type: {
        name: 'sample',
      },
      status: {
        name: 'Awesome',
      },
      priority: {
        name: 'normal',
      },
      labels: [
        { text: 'Example' },
        { text: 'SDK' },
        { text: 'MS' },
      ],
    },
  },
  EXTENDED_CARD: {
    type: 'com.symphony.ms.devtools.testingEntity',
    json: {
      extraContent: 'Any other content that\'s in the entities.js file',
      link: {
        url: 'https://google.com',
        content: 'Click here for google!',
      },
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
