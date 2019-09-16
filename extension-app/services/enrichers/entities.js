export const ENRICHER_EVENTS = {
  TESTING: {
    type: 'com.symphony.ms.devtools.testingEntity',
    json: {
      commands: '<b>Example:</b> @Example &lt;comand example&gt; <br /> ',
    },
  },
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
  WELCOME_MESSAGE_ABOUT_ROOM: {
    type: 'com.symphony.ms.devtools.template.welcomeMessageAboutRoom',
    json: { room_name: 'All Technicians' },
  },
};

export const MODAL_IDS = {
  EXAMPLE_MODAL: {
    entity: 'example-modal',
    entityData: {},
  },
};
