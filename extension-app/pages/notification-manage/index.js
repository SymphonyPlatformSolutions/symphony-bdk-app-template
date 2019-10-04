import React, { useState } from 'react';
import {
  Box,
  Text,
  Table,
  Button,
  ModalConsumer,
  DangerConfirmationModal,
} from 'sms-sdk-toolbox-ui';
import { Link } from 'react-router-dom';
import { setupLinkPrefix } from 'utils/system/setup-url';

const LINK_PREFIX = setupLinkPrefix();

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
    width: undefined,
  },
  {
    Header: 'Instance',
    accessor: 'instance',
    width: undefined,
    tooltip: 'This column is sortable!',
  },
  {
    sortable: false,
    acessor: null,
    width: 50,
    hasActions: true,
  },
];

const Confirmation = (props) => {
  const { hideModal, deleteHandler } = props;
  return (
    <DangerConfirmationModal
      hideModal={hideModal}
      confirmButtonText="Yes, I'm sure"
      message="Doing this action will permanetly change the way you perceive the universe around you."
      modalTitle="Are you sure?"
      confirmationHandler={() => {
        deleteHandler();
        hideModal();
      }}
    />
  );
};

const NotificationManagePage = (props) => {
  const {
    notifications, instances, deleteLoading, deleteHandler,
  } = props;
  const [triggerOpenModal, setTriggerOpenModal] = useState(null);

  const parsedNotifications = notifications.map(el => ({
    ...el,
    instance: instances.find(i => el.instanceId === i.id).name,
    actionsMenu: el.isEditable
      ? [
        {
          label: 'Delete',
          callback: () => {
            setTriggerOpenModal(el.id);
          },
          type: 'danger',
        },
      ]
      : undefined,
  }));


  return (
    <ModalConsumer>
      {(context) => {
        if (triggerOpenModal) {
          context.showModal(
            Confirmation,
            {
              hideModal: context.hideModal,
              deleteHandler: () => deleteHandler(triggerOpenModal),
            },
            { hasClose: false },
          );
          setTriggerOpenModal(null);
        }

        return (
          <Box style={{ width: '100%' }}>
            <Text isTitle type="primary">
              Manage Notifications
            </Text>
            <div>
              <Link to={`${LINK_PREFIX}/createNotification`}>
                <Button>Create Notification</Button>
              </Link>
            </div>
            <Box horizontal>
              <Table
                loading={deleteLoading}
                columns={columns}
                data={parsedNotifications}
              />
            </Box>
          </Box>
        );
      }}
    </ModalConsumer>
  );
};

export default NotificationManagePage;
