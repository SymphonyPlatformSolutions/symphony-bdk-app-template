import React from 'react';
import PropTypes from 'prop-types';
import { setupLinkPrefix } from 'utils/system/setup-url';
import { ModalConsumer } from 'components/commons/modal/modal-context';
import {
  Box,
  Text,
  Button,
  Separator,
  Tabs,
  Table,
  ToasterConsumer,
} from 'sms-sdk-toolbox-ui';
import SampleModal from '../sample-modal/index';

const LINK_PREFIX = setupLinkPrefix();

const { generateDemoInfo } = require('../../../mock-json-server/mock-file');

const TAB_IDS = {
  button: 0,
  table: 1,
  modal: 2,
};

const handleShowCreateInviteModal = (showModal, hideModalCallback) => () => {
  showModal(SampleModal, {
    callBack: () => {
      hideModalCallback();
    },
    hideModal: () => {
      hideModalCallback();
    },
  });
};

const Sample = (props) => {
  const { match: { params: { tab } } } = props;

  const tableColumns = [{
    name: 'Name',
    cell: row => <Text data-testid="Notification service" type="primary" size="small">{row.name || 'Fruit name'}</Text>,
  }, {
    name: 'Fruit',
    cell: row => <Text type="primary" size="small">{row.isFruit ? 'Fruit' : 'Vegetable'}</Text>,
  }];

  return (
    <ModalConsumer>
      {({ showModal, hideModal }) => (
        <Box vertical>
          <Tabs activeTab={tab ? (TAB_IDS[tab] || 0) : 0}>
            <Box label="Text And Button">
              <Box vertical type="primary" style={{ width: '100%' }}>
                <Text type="primary" size="small">
                  Example page using lib
                </Text>
                <Separator />
                <ToasterConsumer>
                  {context => (
                    <Button onClick={() => context.showToast({ message: 'An absolute success!', type: 'success' })}>
                      Success
                    </Button>
                  )}
                </ToasterConsumer>
                <Separator />
                <Button
                  data-testid="createinvite"
                  onClick={handleShowCreateInviteModal(showModal, hideModal)}
                >
                  Open example modal
                </Button>
              </Box>
            </Box>
            <Box label="Table Example">
              <Box type="primary" style={{ width: '100%' }}>
                <Table
                  loading={false}
                  emptyMessage="No data on table"
                  data={generateDemoInfo()}
                  columns={tableColumns}
                />
              </Box>
            </Box>
          </Tabs>
        </Box>
      )}
    </ModalConsumer>
  );
};

Sample.propTypes = {
  match: PropTypes.object,
};

Sample.defaultProps = {
  match: { params: { tab: 'button' } },
};

export default Sample;
