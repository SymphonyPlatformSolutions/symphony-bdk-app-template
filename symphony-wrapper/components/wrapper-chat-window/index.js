import React from 'react';
import styled from 'styled-components';
import { ChevronUp, Block } from 'styled-icons/boxicons-regular';
import { Attachment, MusicNote } from 'styled-icons/material';
import { Smiley } from 'styled-icons/octicons';
import { Pin } from 'styled-icons/boxicons-solid';
import { ExternalLink, Close } from 'styled-icons/evil';

const ChatWindow = styled.div`
  display: grid;
  grid-auto-rows: 71px auto 40px;  
  border-color: transparent!important;
  border-width: 0!important;
  border-radius: 3px!important;
  box-shadow: 0 0 0 0 transparent;
  margin: 10px 5px 9px 6px;
  background-color: #ffffff;
`;

const ChatWindowHeader = styled.div`
  display: inline-flex;
  flex-direction: column;
  border-bottom: 1px solid #e0e4eb;
  height: 70px;
`;

const ChatWindowHeaderTitle = styled.h3`
  margin: 0 0 0 10px;
`;

const ChatWindowBody = styled.div`
  overflow: auto;
  flex-grow: 1;
`;
const ChatWindowFooter = styled.div`
  overflow: auto;
  height: 40px;
`;


const MessageBoxWrapper = styled.div`
  display: flex;
  height: 34px;
  flex-direction: row;
  border-radius: 2px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
  border: 1px solid #c9cbd1;
  margin 0 24px 0 24px;
  color: #c9cbd1;
  :hover {
    border: 2px solid #6a707c;
    color: #6a707c;
  }
  ::placeholder {
     color: #6a707c;
  }
`;

const IconChevronUp = styled(ChevronUp)`
  margin-top: 9px;
  margin-left: 9px;
`;

const ChatToolbar = styled.div`
  display: flex;
  margin-right: 10px;
  align-items: center;
`;
const IconBlock = styled(Block)`
  margin-left: 8px;
`;
const IconAttachment = styled(Attachment)`
  margin-left: 8px;
`;
const IconMusicNote = styled(MusicNote)`
  margin-left: 8px;
`;
const IconSmiley = styled(Smiley)`
  margin-left: 8px;
`;

const ChatInput = styled.input`
  border: none;
  flex-grow: 1;
`;

const Separator = styled.span`
  margin-left: 8px;
`;

const IconPin = styled(Pin)`
  margin-left: 8px;
`;
const IconExternalLink = styled(ExternalLink)`
  margin-left: 8px;
`;
const IconClose = styled(Close)`
  margin-left: 8px;
`;

function MessageBox() {
  return (
    <MessageBoxWrapper>
      <IconChevronUp size={20} />
      <ChatInput placeholder="Type your message here..." />
      <ChatToolbar>
        <IconAttachment size={20} />
        <IconSmiley size={18} />
        <IconBlock size={20} />
        <Separator>|</Separator>
        <IconMusicNote size={20} />
      </ChatToolbar>
    </MessageBoxWrapper>
  );
}

const ChatWindowHeaderToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 15px 0 0;
  color: #808289;
  font-weight: 200;
`;

const WrapperChatWindow = ({ children, title, hasFooter }) => (
  <ChatWindow>
    <ChatWindowHeader>
      <ChatWindowHeaderToolbar>
        <IconPin size={20} />
        <IconExternalLink size={20} />
        <IconClose size={20} />
      </ChatWindowHeaderToolbar>
      <ChatWindowHeaderTitle>{title}</ChatWindowHeaderTitle>
    </ChatWindowHeader>
    <ChatWindowBody>
      {children}
    </ChatWindowBody>
    { hasFooter && (
      <ChatWindowFooter>
        <MessageBox />
      </ChatWindowFooter>
    )}
  </ChatWindow>
);

export default WrapperChatWindow;
