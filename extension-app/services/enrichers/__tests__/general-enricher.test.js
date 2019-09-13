/* global SYMPHONY */
import GeneralEnricher from '../general-enricher';
import HelpCommandBuilder from '../template-builders/help-command-builder';
import WelcomeMessageBuilder from '../template-builders/welcome-message-builder';
import WelcomeMessageAboutRoomBuilder from '../template-builders/welcome-message-about-room-builder';

jest.mock('../template-builders/help-command-builder');
jest.mock('../template-builders/welcome-message-builder');
jest.mock('../template-builders/welcome-message-about-room-builder');

describe('GeneralEnricher', () => {
  const NAME = 'name';
  const MESSAGE_TYPE = 'com.symphony.ms.devtools.testingEntity';
  const USER_ID = 10;
  let modalType;
  const registerRenderer = jest.fn();
  const mockModalShow = jest.fn((type) => {
    modalType = type;
  });

  global.SYMPHONY = {
    services: {
      make: jest.fn(),
      subscribe: jest.fn(() => ({
        registerRenderer,
        show: mockModalShow,
      })),
    },
  };

  let enricher;
  beforeEach(() => {
    enricher = new GeneralEnricher(NAME, [MESSAGE_TYPE], USER_ID);
  });

  it('should return the enricher name when calling getName', () => {
    expect(enricher.getName()).toEqual(NAME);
  });

  it('should call SYMPHONY services.make upon init', () => {
    enricher.init();
    expect(SYMPHONY.services.make).toBeCalledWith(
      NAME,
      enricher,
      ['render', 'action'],
      true,
    );
  });

  it('should call SYMPHONY services.subscribe once upon register', () => {
    enricher.register();
    expect(SYMPHONY.services.subscribe).toBeCalledTimes(1);
    expect(registerRenderer).toBeCalledWith(MESSAGE_TYPE, {}, NAME);
  });

  it('should reduce the Actions into a single object with actionFactory', () => {
    const mockActions = [
      {
        id: 100,
        label: 'action 1',
        service: 'service 1',
        type: 'type 1',
        entityData: {
          data: 'data 1',
        },
      },
      {
        id: 200,
        label: 'action 2',
        service: 'service 2',
        type: 'type 2',
        entityData: {
          data: 'data 2',
        },
      },
    ];
    const mockEntity = {
      entitiyDate: 'Entity Data',
    };
    const shouldReturn = {
      100: {
        service: 'My service',
        label: 'action 1',
        data: {
          entity: mockEntity,
          service: 'service 1',
          type: 'type 1',
          entityData: {
            data: 'data 1',
          },
        },
      },
      200: {
        service: 'My service',
        label: 'action 2',
        data: {
          entity: mockEntity,
          service: 'service 2',
          type: 'type 2',
          entityData: {
            data: 'data 2',
          },
        },
      },
    };

    expect(
      GeneralEnricher.actionFactory(mockActions, 'My service', mockEntity),
    ).toEqual(shouldReturn);
  });

  it('should reduce the Actions into a single object with actionFactory with type not with id', () => {
    const mockActions = [
      {
        id: undefined,
        label: 'action 1',
        service: 'service 1',
        type: 'type_1',
        entityData: {
          data: 'data 1',
        },
      },
      {
        id: undefined,
        label: 'action 2',
        service: 'service 2',
        type: 'type_2',
        entityData: {
          data: 'data 2',
        },
      },
    ];
    const mockEntity = {
      entitiyDate: 'Entity Data',
    };
    const shouldReturn = {
      type_1: {
        service: 'My service',
        label: 'action 1',
        data: {
          entity: mockEntity,
          service: 'service 1',
          type: 'type_1',
          entityData: {
            data: 'data 1',
          },
        },
      },
      type_2: {
        service: 'My service',
        label: 'action 2',
        data: {
          entity: mockEntity,
          service: 'service 2',
          type: 'type_2',
          entityData: {
            data: 'data 2',
          },
        },
      },
    };

    expect(
      GeneralEnricher.actionFactory(mockActions, 'My service', mockEntity),
    ).toEqual(shouldReturn);
  });

  it("should call the Modal with the noEntityDialog type when entity is't identifiable", () => {
    const mockData = {};
    enricher.action(mockData);

    expect(mockModalShow).toHaveBeenCalled();
    expect(modalType).toEqual('noEntityDialog');
  });

  it('should render the default type', () => {
    const entity = {
      id: JSON.stringify({ data: 'My data' }),
    };
    const shouldReturn = {
      data: {},
      template:
        '<messageML><p>No template found for this message entity</p><br />Caught: </messageML>',
    };

    expect(enricher.render('', entity)).toEqual(shouldReturn);
  });

  describe('Builders', () => {
    const mockedEntityData = { data: 'My data' };
    const entity = {
      id: JSON.stringify(mockedEntityData),
    };
    const shouldReturn = {
      data: {},
      template: 'mocked return',
    };

    it('should render the Help Command message', () => {
      HelpCommandBuilder.build.mockImplementation(() => 'mocked return');
      expect(
        enricher.render(
          'com.symphony.ms.devtools.template.helpCommand',
          entity,
        ),
      ).toEqual(shouldReturn);
    });

    it('should render the Welcome Message (direct chat)', () => {
      WelcomeMessageBuilder.build.mockImplementation(() => 'mocked return');
      expect(
        enricher.render(
          'com.symphony.ms.devtools.template.welcomeMessageDirectChat',
          entity,
        ),
      ).toEqual(shouldReturn);
    });

    it('should render the Welcome Message (room)', () => {
      WelcomeMessageBuilder.build.mockImplementation(() => 'mocked return');
      expect(
        enricher.render(
          'com.symphony.ms.devtools.template.welcomeMessageRoom',
          entity,
        ),
      ).toEqual(shouldReturn);
    });

    it('should render the Welcome Message about room', () => {
      WelcomeMessageAboutRoomBuilder.build.mockImplementation(
        () => 'mocked return',
      );
      expect(
        enricher.render(
          'com.symphony.ms.devtools.template.welcomeMessageAboutRoom',
          entity,
        ),
      ).toEqual(shouldReturn);
    });
  });
});
