import template from '../handlebars-config';
import { actionColors } from '../js-constants';

export default class WelcomeMessageBuilder {
  static build() {
    return template({
      tempoAccent: null,
      icon: null,
      headerPartial: () => 'welcome-message-header',
      header: {
        service: null,
        incidentId: null,
        genericTitle: 'Hello!',
        details: {
          fakeCard: {
            accent: actionColors.welcomeMessage,
            header: 'Commands',
            headerColor: actionColors.welcomeMessage,
          },
        },
      },
      body: null,
    });
  }
}
