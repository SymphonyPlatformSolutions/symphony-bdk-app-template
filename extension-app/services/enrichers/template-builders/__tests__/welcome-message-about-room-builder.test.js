import WelcomeMessageAboutRoomBuilder from '../welcome-message-about-room-builder';

const data = {
  room_name: 'All Technicians',
};

describe('Welcome Message About Room Builder', () => {
  it('Should build message', () => {
    expect(WelcomeMessageAboutRoomBuilder.build(data)).toMatchSnapshot();
  });
});
