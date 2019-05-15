import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getJWTFromSymphony from '../actions/action-jwt-service';
import Routes from '../routes/routes';

class RoutesContainer extends Component {
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
        <Routes jwt={jwt} />
      );
    }

    return (<p>Authentication Error</p>);
  }
}

RoutesContainer.propTypes = {
  jwt: PropTypes.string,
  jwtService: PropTypes.object,
  actions: PropTypes.object,
};

RoutesContainer.defaultProps = {
  jwtService: undefined,
  jwt: undefined,
  actions: undefined,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getJWTFromSymphony }, dispatch),
});

const mapStateToProps = state => ({
  jwt: state.user.jwt,
});

export default connect(mapStateToProps, mapDispatchToProps)(RoutesContainer);
