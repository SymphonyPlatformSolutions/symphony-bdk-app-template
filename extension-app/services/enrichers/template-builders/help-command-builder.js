import template from '../handlebars-config';
import helpCommandIcon from '../../../public/assets/help-command-icon.svg';
import { actionColors } from '../js-constants';

export default class HelpCommandBuilder {
  static build(data) {
    return template({
      tempoAccent: null,
      icon: null,
      headerPartial: () => 'help-command-header',
      bodyPartial: () => 'help-command-body',
      header: {
        service: null,
        incidentId: null,
        genericTitle: 'Help',
        details: {
          icon: helpCommandIcon,
          message: 'See below the commands you can use to interact with the Template Bot.',
        },
      },
      body: {
        hashes: null,
        buttons: null,
        details: {
          fakeCard: {
            accent: actionColors.helpCommand,
            header: 'Commands',
            headerColor: actionColors.helpCommand,
          },
          commands: data.commands,
        },
      },
    });
  }
}
