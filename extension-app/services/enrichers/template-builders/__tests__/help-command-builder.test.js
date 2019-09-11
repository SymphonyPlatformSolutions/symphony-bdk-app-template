import HelpCommandBuilder from '../help-command-builder';

const helpCommandData = {
  commands: '<br /> <b>Example:</b> @Example &lt;comand example&gt;',
};

describe('Help Command Builder', () => {
  it('Should build message', () => {
    expect(HelpCommandBuilder.build(helpCommandData)).toMatchSnapshot();
  });
});
