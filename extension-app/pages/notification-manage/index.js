import React, { useState } from 'react';
import {
  Box, Text, Table, Button,
} from 'sms-sdk-toolbox-ui';
import { Link } from 'react-router-dom';
import { setupLinkPrefix } from 'utils/system/setup-url';

const LINK_PREFIX = setupLinkPrefix();

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
    width: undefined,
  }, {
    Header: 'Instance',
    accessor: 'instance',
    width: undefined,
    tooltip: 'This column is sortable!',
  }, {
    sortable: false,
    acessor: null,
    width: 50,
    hasActions: true,
  },
];


const NotificationManagePage = (props) => {
  const {
    notifications, instances, deleteLoading, deleteHandler,
  } = props;

  const parsedNotifications = notifications.map(el => ({
    ...el,
    instance: instances.find(i => el.instanceId === i.id).name,
    actionsMenu: el.isEditable ? [
      {
        label: 'Delete',
        callback: () => deleteHandler(el.id),
        type: 'danger',
      },
    ] : undefined,
  }));

  return (
    <Box style={{ width: '100%' }}>
      <Text isTitle type="primary">Manage Notifications</Text>
      <Link to={`${LINK_PREFIX}/createNotification`}>
        <Button>Create Notification</Button>
      </Link>
      <Box horizontal>
        <Table loading={deleteLoading} columns={columns} data={parsedNotifications} />
      </Box>
    </Box>
  );
};

export default NotificationManagePage;
