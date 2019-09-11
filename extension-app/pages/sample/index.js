import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {setupLinkPrefix} from 'utils/system/setup-url';
import {
  Box,
  Text,
  Button,
  Separator,
  Tabs,
  Table,
} from 'sms-sdk-toolbox-ui';

const LINK_PREFIX = setupLinkPrefix();

const TAB_IDS = {
  example: 0,
  example2: 1,
};

const Sample = (props) => {
  const {match: {params: {tab}}} = props;

  const tableColumns = [{
    name: 'Service',
    cell: row => <Text data-testid="Notification service" type="primary" size="small">{row.service.name || 'Service name'}</Text>,
  }, {
    name: 'Chat',
    cell: row => <Text type="primary" size="small">{getRoomName(rooms, row.threadId, row.isRoom)}</Text>,
  }];

  return (
    <Box vertical>
      <Tabs activeTab={tab ? (TAB_IDS[tab] || 0) : 0}>
        <div label="Example">
          <Text style={{ padding: 0, margin: 0, fontSize: '1.2rem' }} type="primary" size="small" title>
            Example page using lib
          </Text>
          <Box style={{ marginTop: '20px' }}>
            <Separator />
          </Box>
          <Link to={`${LINK_PREFIX}/home/example2`}>
            <Button>Change to second tab</Button>
          </Link>
        </div>
        <div label="Example2">
          <Box vertical style={{ marginTop: 20 }}>
            <Table
              loading={false}
              emptyMessage="No data on table"
              data={null}
              columns={tableColumns}
            />
          </Box>
        </div>
      </Tabs>
    </Box>
  );
};

Sample.propTypes = {
  match: PropTypes.object,
};

Sample.defaultProps = {
  match: {params: {tab: 'example'}},
};

export default Sample;
