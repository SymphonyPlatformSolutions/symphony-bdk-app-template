import React from 'react';
import styled from 'styled-components';
import { Filter } from 'styled-icons/boxicons-regular';
import { AddCircleOutline } from 'styled-icons/material';
import PropTypes from 'prop-types';
import { BlueButton } from '../commons';

const IconFilter = styled(Filter)`
  position: absolute;
  margin: 22px 0 0 19px;
  color: #e0e4eb;
  font-weight: bold;
`;

const AddButton = styled.div`
  line-height: 1;
  background-color: #007ecc;
  border-radius: 24px;
  height: 40px;
  width: 40px;
  position: absolute;
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.24), 0 0 6px 0 rgba(0, 0, 0, 0.12);
  left: 228px;
  ::before {
    content: "+";
    position: absolute;
    font-size: 31px;
    -webkit-font-smoothing: antialiased;
    color: white;
    padding-left: 12px;
    margin-top: 6px;
  }
`;

const SideNav = styled.div`
  width: 250px;
  min-width: 250px;
  height: 100%;
  background: #273d5d;
  overflow: hidden;
`;

const AvatarWrap = styled.div`
  display: flex;
  margin: 14px 14px 0 14px;
`;

const AvatarImg = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
`;

const AwayStatus = styled.div`
 width: 12px;
 height:12px;
 background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMiAxMiI+PHBhdGggZD0iTTYgMkMzLjggMiAyIDMuOCAyIDZzMS44IDQgNCA0IDQtMS44IDQtNC0xLjgtNC00LTR6bTIgNUg1VjRoMXYyaDJ2MXoiIGZpbGw9IiNmN2JiMDAiLz48L3N2Zz4=) center/12px no-repeat;
`;

const AvailableStatus = styled.div`
 width: 12px;
 height:12px;
 background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMiAxMiI+PHBhdGggZD0iTTYgMTBjLTIuMiAwLTQtMS44LTQtNHMxLjgtNCA0LTQgNCAxLjggNCA0LTEuOCA0LTQgNHoiIGZpbGw9IiM2YjYiLz48L3N2Zz4=) center/12px no-repeat;
`;

const AvatarStatus = styled(AvailableStatus)`
 position: absolute;
 left: 36px;
 top: 36px;
`;

const UserNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

const UserNameText = styled.span`
 color: #2f9bf4;
 font-weight: 600;
 font-size: 0.9rem;
 line-height: 1;
 :hover {
   text-decoration: underline;
 }
`;

const UserNamePresence = styled.span`
  font-weight: 500;
  font-size: .7rem;
  margin-top: 6px;
  -webkit-font-smoothing: antialiased;
  color: #9fa4ad;
`;

const FilterList = styled.input`
  color: #e0e4eb;
  background: #374c68;
  border: none;
  font-weight: 600;
  font-size: .8rem;
  padding-left: 40px;
  height: 27px;
  font-variant-ligatures: none!important;
  margin: 20px 0 0 14px;
  
  :hover {
    background: #425876;
  }
  ::placeholder {
    color: #e0e4eb;
  }
`;

const SideNavPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #99a4b3;
  font-size: 0.7rem;
  font-weight: 700;
`;

const SideNavPanelContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

const SideNavPanelInnerContainer = styled.div`
  background: #1e3049;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
`;

const SideNavPresenceContainer = styled.div`
  display: flex;
  align-items: center;
`;
const SideNavPresenceText = styled.span`
  white-space: nowrap; 
  overflow: hidden;
  width: 195px;
  text-overflow: ellipsis;
  font-size: .8rem;
  font-weight: 500;
  margin: 10px 0 10px 10px;
`;

const SideNavPresenceIcon = styled.span`
  width: 16px;
  height: 16px;
  background: ${props => props.url};
`;

const DrawerButtonContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  justify-content: center;
  display: flex;
`;

function SideNavChatPresence({ status, text, icon }) {
  const statusIcon = status === null ? null : status ? <AvailableStatus /> : <AwayStatus />;
  const hasIcon = icon !== null ? `url("${icon}")` : null;
  return (
    <SideNavPresenceContainer>
      {hasIcon && (<SideNavPresenceIcon url={hasIcon} />)}
      { statusIcon }
      <SideNavPresenceText>{text}</SideNavPresenceText>
    </SideNavPresenceContainer>
  );
}

SideNavChatPresence.propTypes = {
  status: PropTypes.bool,
  text: PropTypes.string,
  icon: PropTypes.string,
};

SideNavChatPresence.defaultProps = {
  status: false,
  text: '',
  icon: '',
};

function SideNavPanels({ label, hasAdd, list }) {
  return (
    <SideNavPanelContainer>
      <SideNavPanelContainerHeader>
        <p style={{ margin: 0 }}>{label}</p>
        { hasAdd && (<AddCircleOutline size={20} />)}
      </SideNavPanelContainerHeader>
      { list.length && (
        <SideNavPanelInnerContainer>
          {list.map(entry => <SideNavChatPresence key={entry.id} {...entry} />)}
        </SideNavPanelInnerContainer>
      )}
    </SideNavPanelContainer>
  );
}

SideNavPanels.propTypes = {
  label: PropTypes.string,
  hasAdd: PropTypes.bool,
  list: PropTypes.array,
};

SideNavPanels.defaultProps = {
  label: '',
  hasAdd: false,
  list: [],
};

const WrapperSidenav = (props) => {
  const { toggleEntityDrawer } = props;
  return (
    <SideNav>
      <AvatarWrap>
        <div>
          <AvatarImg src="assets/picard-avatar.png" />
          <AvatarStatus />
        </div>
        <UserNameWrapper>
          <UserNameText>Picard</UserNameText>
          <UserNamePresence>Available</UserNamePresence>
        </UserNameWrapper>
        <AddButton />
      </AvatarWrap>
      <div>
        <IconFilter size="28" />
        <FilterList placeholder="Filter List" />
      </div>
      { window.SYMPHONY.chats.map(
        entry => (<SideNavPanels key={entry.id} {...entry} />),
      )}
      <DrawerButtonContainer>
        <BlueButton type="button" onClick={toggleEntityDrawer}>Open Entity Drawer</BlueButton>
      </DrawerButtonContainer>
    </SideNav>
  );
};
WrapperSidenav.propTypes = {
  toggleEntityDrawer: PropTypes.func.isRequired,
};

export default WrapperSidenav;
