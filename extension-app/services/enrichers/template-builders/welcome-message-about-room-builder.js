import template from '../handlebars-config';
import { actionColors } from '../js-constants';

// Message received in a direct chat explain about the Bot that was added in one of the user's room
export default class WelcomeMessageAboutRoomBuilder {
  static build(data) {
    return template({
      tempoAccent: null,
      icon: null,
      headerPartial: () => 'welcome-message-about-room-header',
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
          roomName: data.room_name,
        },
      },
      body: null,
    });
  }
}
