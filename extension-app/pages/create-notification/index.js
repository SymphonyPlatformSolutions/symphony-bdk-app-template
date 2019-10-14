import React, { useState } from 'react';
import {
  Box,
  FormBox,
  Text,
  FormGroup,
  Dropdown,
  InputField,
  Button,
} from 'sms-sdk-toolbox-ui';
import { Link } from 'react-router-dom';
import { setupLinkPrefix } from 'utils/system/setup-url';

const LINK_PREFIX = setupLinkPrefix();

const CreateNotificationPage = (props) => {
  const {
    instances, submitHandler, loading, editingNotification,
  } = props;

  const [chosenInstance, setChosenInstance] = useState(
    editingNotification ? editingNotification.instanceId : null,
  );
  const [notificationName, setNotificationName] = useState(
    editingNotification ? editingNotification.name : null,
  );
  const parsedInstances = instances.map(el => ({
    value: el.id,
    label: el.name,
  }));

  const disableSubmit = !chosenInstance || !notificationName;
  return (
    <Box style={{ maxWidth: '30rem', marginTop: '60px' }}>
      <Text isTitle type="primary">
        {editingNotification
          ? `Edit notification "${editingNotification.name}"`
          : 'Create'}{' '}
        Notification
      </Text>
      <FormBox>
        <FormGroup>
          <Dropdown
            label="Choose Instance"
            chosenValue={chosenInstance}
            onChange={e => setChosenInstance(e.value)}
            options={parsedInstances}
          />
        </FormGroup>
        <FormGroup>
          <InputField
            value={notificationName}
            onChange={e => setNotificationName(e.target.value)}
            label="Notification Name"
          />
        </FormGroup>
      </FormBox>
      <Box horizontal justify="flex-end" align="flex-end">
        <Link to={`${LINK_PREFIX}/home/1`}>
          <Button fill="outlined">Cancel</Button>
        </Link>
        <Button
          loading={loading}
          disabled={disableSubmit}
          onClick={() => (editingNotification
            ? submitHandler({
              ...editingNotification,
              instanceId: chosenInstance,
              name: notificationName,
            })
            : submitHandler({
              instanceId: chosenInstance,
              name: notificationName,
            }))
          }
        >
          {editingNotification ? 'Update' : 'Create'}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateNotificationPage;
