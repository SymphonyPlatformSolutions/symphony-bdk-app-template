import React from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Search, QuestionMark } from 'styled-icons/boxicons-regular';
import { Mention, Inbox } from 'styled-icons/octicons';
import { UserFriends } from 'styled-icons/fa-solid';
import { Share2 } from 'styled-icons/feather';

import { Cog } from 'styled-icons/boxicons-solid';

const Topbar = styled.div`
  width: 100%;
  height: 60px;
  background: #f9f8f8;
`;

const IconSearch = styled(Search)`
  color: #6a6b74;
  font-weight: 600;
  position: absolute;
  margin: 19px 0 0 33px;
`;

const IconMention = styled(Mention)`
  margin: 8px 0 0 7px;
`;

const IconCommunity = styled(UserFriends)`
  margin: 8px 0 0 7px;
`;

const IconInbox = styled(Inbox)`
  margin: 8px 0 0 7px;
`;

const IconMarket = styled(Share2)`
  margin: 8px 0 0 7px;
`;

const IconHelp = styled(QuestionMark)`
  margin: 8px 0 0 7px;
`;

const IconCog = styled(Cog)`
  margin: 8px 0 0 7px;
`;

const IconText = styled.p`
  font-size: 9px;
`;

const Searchbar = styled.input`
  color: #6a6b74;
  background: #e3e5e8;
  width: 90%;
  height: 34px;
  border: none;
  font-size: 1rem;
  padding-left: 40px;
  -webkit-font-smoothing: antialiased;
  font-variant-ligatures: none!important;
  margin: 12px 20px 10px 25px;
  border-radius: 2px;
 
  :hover {
    background: #CDCFD2;
    color: #00061b;
  }
  ::placeholder {
    color: #6a6b74;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
  margin-top: 2px;
`;

const IconShield = styled.div`
  border-radius: 50%;
  background: #e3e5e8;
  color: #72727e;
  width: 34px;
  height: 34px;
  &:hover {
    font-weight: bold;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #72727e;
`;

const IconWrapperWithShadow = styled(IconWrapper)`
  box-shadow: ....;
`;

function TopbarIcon({ children, label }) {
  return (
    <IconWrapper>
      <IconShield>
        { children }
      </IconShield>
      <IconText>{label}</IconText>
    </IconWrapper>
  );
}

const WrapperTopbar = () => (
  <Topbar>
    <Grid fluid>
      <Row>
        <Col xs={2} sm={3} md={5} lg={7} xl={9}>
          <IconSearch size="20px" />
          <Searchbar placeholder="Search" />
        </Col>
        <Col xs={9} sm={9} md={7} lg={5} xl={3}>
          <IconContainer>
            <TopbarIcon label="MENTIONS">
              <IconMention size="20px" />
            </TopbarIcon>
            <TopbarIcon label="COMMUNITY">
              <IconCommunity size="20px" />
            </TopbarIcon>
            <TopbarIcon label="INBOX">
              <IconInbox size="20px" />
            </TopbarIcon>
            <TopbarIcon label="MARKET">
              <IconMarket size="20px" />
            </TopbarIcon>
            <TopbarIcon label="HELP">
              <IconHelp size="20px" />
            </TopbarIcon>
             <TopbarIcon label="SETTINGS">
               <IconCog size="20px" />
            </TopbarIcon>
          </IconContainer>
        </Col>
      </Row>
    </Grid>
  </Topbar>
);

export default WrapperTopbar;
