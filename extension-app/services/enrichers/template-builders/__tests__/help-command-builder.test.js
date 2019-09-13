import HelpCommandBuilder from '../help-command-builder';

const helpCommandData = {
  commands: '<b>Example:</b> @Example &lt;comand example&gt; <br /> ',
};

describe('Help Command Builder', () => {
  it('Should build message', () => {
    expect(HelpCommandBuilder.build(helpCommandData)).toMatchSnapshot();
  });
});
