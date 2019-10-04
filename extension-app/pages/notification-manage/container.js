import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getNotifications,
  deleteNotification,
} from 'reducers/notifications/actions';
import { Loader, Box } from 'sms-sdk-toolbox-ui';
import NotificationManagePage from '.';

const NotificationPageContainer = (props) => {
  const {
    loading, instances, actions, notifications,
  } = props;

  const firstLoading = !notifications && loading;
  const deleteLoading = notifications && loading;

  useEffect(() => {
    if (!notifications) {
      actions.getNotifications();
    }
  }, []);

  if (firstLoading) {
    return (
      <Box horizontal>
        <Loader type="v2" />
      </Box>
    );
  }

  console.log('GOT NOTIFICATIONS', notifications);

  return (
    <NotificationManagePage
      notifications={notifications}
      deleteLoading={deleteLoading}
      deleteHandler={id => actions.deleteNotification(id)}
      instances={instances}
    />
  );
};

NotificationPageContainer.propTypes = {};

NotificationPageContainer.defaultProps = {};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { getNotifications, deleteNotification },
    dispatch,
  ),
});

const mapStateToProps = state => ({
  loading: state.notifications.loading,
  notifications: state.notifications.notifications,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationPageContainer);
