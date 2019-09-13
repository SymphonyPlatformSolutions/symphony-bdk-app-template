/* global SYMPHONY */

import React, { useEffect, useState } from 'react';
import Styled, { ThemeProvider } from 'styled-components';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setupLinkPrefix } from 'utils/system/setup-url';
import { getJWTFromSymphony } from 'reducers/users/actions';
import ModalRoot from 'components/commons/modal';
import { ModalProvider } from 'components/commons/modal/modal-context';
import ToastProvider from 'components/toast-provider';
import { THEMES, THEME_TYPES, Loader } from 'sms-sdk-toolbox-ui';
import { PROJECT_THEMES } from '../utils/themes/PROJECT_THEMES';
import LocationRouter from './location-router';
import Sample from './sample';

const LINK_PREFIX = setupLinkPrefix();

const LoadContainer = Styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ContainerWrapper = Styled.div`
  max-width: 100%;
  margin: 0px 21px;
`;

const Routes = (props) => {
  const [currentTheme, setTheme] = useState(THEMES[0]);

  const setThemeProps = () => {
    const isDark = window.themeColor
      ? (window.themeColor === THEME_TYPES.DARK) : false;
    setTheme(isDark ? THEMES[1] : THEMES[0]);
    document.body.className = `symphony-external-app ${window.themeColor.toLowerCase()} ${window.themeSize}`;
  };

  useEffect(() => {
    const { actions, jwtService } = props;
    console.log('getJWT');
    actions.getJWTFromSymphony(jwtService);
  }, []);

  useEffect(() => {
    const uiService = SYMPHONY.services.subscribe('ui');

    uiService.listen('themeChangeV2', () => {
      SYMPHONY.remote.hello().then((theme) => {
        const themeSize = theme.themeV2.size;
        const themeColor = theme.themeV2.name;
        const appTheme = themeColor.toUpperCase() === THEME_TYPES.DARK
          ? THEME_TYPES.DARK
          : themeColor.toUpperCase() === THEME_TYPES.LIGHT
            ? THEME_TYPES.LIGHT
            : THEME_TYPES.LIGHT;
        window.themeColor = appTheme;
        window.themeSize = themeSize;
        setThemeProps();
      });
    });

    setThemeProps();
  }, [window.themeColor, window.themeSize]);

  const { jwt } = props;
  const Default = () => <Redirect to={`${LINK_PREFIX}/app.html`} />;

  if (jwt) {
    if (jwt === 'loading') {
      return (<LoadContainer><Loader type="v2" /></LoadContainer>);
    }

    return (
      <ContainerWrapper>
        <ThemeProvider theme={currentTheme}>
            {/*<ToastRoot />???*/}
            {/*<ModalWrapper>*/}
            <ModalProvider>
              <ModalRoot />
                <BrowserRouter>
                  <Switch>
                    <Route exact path={`${LINK_PREFIX}/app.html`} component={LocationRouter} />
                    <Route exact path={`${LINK_PREFIX}/home/:tab`} component={Sample} />
                    <Route component={Default} />
                  </Switch>
                </BrowserRouter>
            </ModalProvider>
            {/*</ModalWrapper>*/}
        </ThemeProvider>
      </ContainerWrapper>
    );
  }

  return <p>JWT Error</p>;
};

Routes.propTypes = {
  jwt: PropTypes.string,
};

Routes.defaultProps = {
  jwt: 'loading',
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getJWTFromSymphony }, dispatch),
});

const mapStateToProps = state => ({
  jwt: state.user.jwt,
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
