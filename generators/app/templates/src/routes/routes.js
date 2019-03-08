import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { setupLinkPrefix } from '../utils/setup-url';
import getJWTFromSymphony from '../actions/action-jwt-service';
import App from '../pages/app';

const LINK_PREFIX = setupLinkPrefix();

class Routes extends Component {
  componentDidMount() {
    const { actions, jwtService } = this.props;

    actions.getJWTFromSymphony(jwtService);
  }

  render() {
    const { jwt } = this.props;
    if (jwt) {
      if (jwt === 'loading') {
        return (<p>Loading...</p>);
      }

      return (
        <BrowserRouter>
          <Switch>
            <Route exact path={`${LINK_PREFIX}/app.html`} component={App} />
          </Switch>
        </BrowserRouter>
      );
    }

    return (<p>Authentication Error</p>);
  }
}

Routes.propTypes = {
  jwt: PropTypes.string,
  jwtService: PropTypes.object,
  actions: PropTypes.object,
};

Routes.defaultProps = {
  jwtService: undefined,
  jwt: undefined,
  actions: undefined,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getJWTFromSymphony }, dispatch),
});

const mapStateToProps = state => ({
  jwt: state.jwt.jwt,
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
