import React, { useState } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { ENRICHER_EVENTS } from 'services/enrichers/entities';
import WrapperSidenav from '../../components/wrapper-sidenav';
import WrapperTopbar from '../../components/wrapper-topbar';
import WrapperChatWindow from '../../components/wrapper-chat-window';
import EntityDrawer from '../../components/entity-drawer';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 0;
  display: flex;
  font-family: SymphonyLato,"Hiragino Kaku Gothic Pro",Meiryo,"Yu Gothic Medium",sans-serif;
  font-weight: 400;
  font-style: normal;
`;

const CenterContainer = styled.div`
  width: 100%;
  display: flex;
  border-left: 2px solid #E0E4EB;
  border-right: 2px solid #E0E4EB;
  flex-direction: column;
`;

const CenterContainerBody = styled.div`
  display: grid;
  grid-auto-rows: auto auto;
  height: 100%;
  background: #e3e5e8;
  
  @media (min-width: 1300px) {
    grid-auto-flow: column;
  }
`;

const ExtensionAppIframe = styled.iframe`
  width: 100%;
  height: calc(100% - 5px);
  border: none;
`;

let rendererRef;

const SymphonyWrapper = () => {
  const [isDrawerOpen, toggleDrawer] = useState(false);
  const submitHandler = (entityType, entityJson) => {
    const { madeServices } = window.SYMPHONY.services;
    if (!madeServices || !madeServices.length) {
      console.log('No services were made, so nothing to render the entity!');
      return;
    }

    if (madeServices) {
      const enricherService = madeServices.find(el => el.name.includes('enricher'));
      if (!enricherService) {
        console.log('No enricher service made!');
        return;
      }
      const template = enricherService.instance.render(entityType, entityJson);
      rendererRef.contentWindow.postMessage({
        call: 'sendValue',
        value: {
          template,
          entityJson,
        },
      }, '*');
    }
  };

  return (
    <Wrapper>
      {ReactDOM.createPortal(<EntityDrawer
        closeHandler={() => toggleDrawer(false)}
        submitHandler={submitHandler}
        isOpen={isDrawerOpen}
      />, document.body)}
      <WrapperSidenav toggleEntityDrawer={() => toggleDrawer(true)} />
      <CenterContainer>
        <WrapperTopbar />
        <CenterContainerBody>
          <WrapperChatWindow title="Symphony News">
            <ExtensionAppIframe src="https://localhost:4000/app.html" />
          </WrapperChatWindow>
          <WrapperChatWindow title="Enricher Test" hasFooter>
            <ExtensionAppIframe
              src="https://localhost:4000/renderer-app.html"
              ref={(ref) => { rendererRef = ref; }}
            />
          </WrapperChatWindow>
        </CenterContainerBody>
      </CenterContainer>
    </Wrapper>
  );
};

export default SymphonyWrapper;
