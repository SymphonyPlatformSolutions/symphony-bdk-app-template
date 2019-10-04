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
  const { instances, createHandler, loading } = props;
  const [chosenInstance, setChosenInstance] = useState(null);
  const [notificationName, setNotificationName] = useState(null);

  const parsedInstances = instances.map(el => ({
    value: el.id,
    label: el.name,
  }));

  const disableSubmit = !chosenInstance || !notificationName;

  return (
    <Box style={{ maxWidth: '30rem', marginTop: '60px' }}>
      <Text isTitle type="primary">
        Create Notification
      </Text>
      <FormBox>
        <FormGroup>
          <Dropdown
            label="Choose Instance"
            value={chosenInstance}
            onChange={setChosenInstance}
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
          onClick={() => createHandler({
            instanceId: chosenInstance.value,
            name: notificationName,
          })}
        >Create
        </Button>
      </Box>
    </Box>
  );
};

export default CreateNotificationPage;
