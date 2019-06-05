import React from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../services/theme/theme-context';

export const themeNames = {
  DARK: 'dark',
  LIGHT: 'light',
};

export default class ThemeProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: props.theme,
    };
  }

  componentDidMount() {
    const { uiService } = this.props;
    uiService.listen('themeChangeV2', (data) => {
      document.body.className = `integration-app-body ${data.name.toLowerCase()} ${data.size}`;
      this.setState({ theme: data });
    });
  }

  render() {
    const { theme } = this.state;
    const { children } = this.props;

    return (
      <ThemeContext.Provider value={theme}>
        {children}
      </ThemeContext.Provider>
    );
  }
}

ThemeProvider.propTypes = {
  uiService: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
  theme: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.string,
    classes: PropTypes.array,
  }),
};

ThemeProvider.defaultProps = {
  theme: {
    name: 'light',
    size: 'normal',
    classes: [],
  },
};
