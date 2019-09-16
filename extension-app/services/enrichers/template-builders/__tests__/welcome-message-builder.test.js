import WelcomeMessageBuilder from '../welcome-message-builder';

describe('Welcome Message Builder', () => {
  it('Should build message', () => {
    expect(WelcomeMessageBuilder.build()).toMatchSnapshot();
  });
});
