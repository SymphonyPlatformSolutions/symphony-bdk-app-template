import React from 'react';
import { Box, Tabs, HelpPageBuilder } from 'sms-sdk-toolbox-ui';
import NotificationPageContainer from 'pages/notification-manage/container';
import InstanceManagePage from 'pages/instance-page';

const PAGE_DATA_TWO_LEVELS = {
  title: 'Help page',
  description: 'this is a two levels help Page, it has topics, sub-topic and contents',
  topics: [],
};

const MainPage = (props) => {
  const { instances, chosenTab } = props;

  return (
    <Box space={20}>
      <Box horizontal space={60} style={{ maxWidth: '50rem' }}>
        <Tabs activeTab={chosenTab || 0}>
          <div label="Instances">
            <InstanceManagePage instances={instances} />
          </div>
          <div label="Notifications">
            <NotificationPageContainer instances={instances} />
          </div>
          <div label="Help" align="right">
            <HelpPageBuilder config={PAGE_DATA_TWO_LEVELS} />
          </div>
        </Tabs>
      </Box>
    </Box>
  );
};

export default MainPage;
