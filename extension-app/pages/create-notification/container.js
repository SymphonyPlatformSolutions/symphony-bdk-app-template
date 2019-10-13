import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postNotification } from 'reducers/notifications/actions';
import { Redirect } from 'react-router-dom';
import { setupLinkPrefix } from 'utils/system/setup-url';
import CreateNotificationPage from '.';

const LINK_PREFIX = setupLinkPrefix();

const CreateNotificationContainer = (props) => {
  const {
    loading, instances, actions, error,
  } = props;
  const [actionFired, setActionFired] = useState(false);

  if (actionFired && !loading && !error) {
    return <Redirect to={`${LINK_PREFIX}/home/1`} />;
  }

  return (
    <CreateNotificationPage
      loading={loading}
      instances={instances}
      createHandler={(notification) => { actions.postNotification(notification); setActionFired(true); }}
    />
  );
};

CreateNotificationContainer.propTypes = {};

CreateNotificationContainer.defaultProps = {};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ postNotification }, dispatch),
});

const mapStateToProps = state => ({
  loading: state.notifications.loading,
  error: state.notifications.error,
  instances: state.instances.instances,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateNotificationContainer);
