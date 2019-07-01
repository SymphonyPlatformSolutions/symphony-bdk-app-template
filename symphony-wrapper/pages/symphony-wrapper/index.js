import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import WrapperSidenav from '../../components/wrapper-sidenav';
import WrapperTopbar from '../../components/wrapper-topbar';
import WrapperChatWindow from '../../components/wrapper-chat-window';
import EntityDrawer from '../../components/entity-drawer';
import Modal from '../../components/modal';
import DialogDrawer from '../../components/modal-drawer';

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
let internalPointer;

const SymphonyWrapper = () => {
  const [isEntityDrawerOpened, toggleEntityDrawer] = useState(false);
  const [isDialogDrawerOpened, toggleDialogDrawer] = useState(false);

  const [isModalOpenned, toggleModal] = useState(false);
  const [modalOptions, setModalOptions] = useState(null);

  const extensionAppRef = useRef();

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

  useEffect(() => {
    internalPointer = setInterval(() => {
      if (extensionAppRef.current.contentWindow) {
        extensionAppRef.current.contentWindow.SYMPHONY = Object.assign({}, window.SYMPHONY);
      }
    }, 1);

    window.addEventListener('openDialog', ({ detail }) => {
      toggleModal(true);
      setModalOptions({
        url: detail.url,
        height: detail.height,
        width: detail.width,
      });
    });
  }, []);


  const onExtensionAppLoaded = () => {
    clearInterval(internalPointer);
  };

  return (
    <Wrapper>
      {ReactDOM.createPortal(<EntityDrawer
        closeHandler={() => toggleEntityDrawer(false)}
        submitHandler={submitHandler}
        isOpen={isEntityDrawerOpened}
      />, document.body)}
      {ReactDOM.createPortal(<DialogDrawer
        isOpen={isDialogDrawerOpened}
        closeHandler={() => toggleDialogDrawer(false)}
      />, document.body)}
      <WrapperSidenav
        toggleEntityDrawer={() => toggleEntityDrawer(true)}
        toggleDialogDrawer={() => toggleDialogDrawer(true)}
      />
      { isModalOpenned && <Modal modalOptions={modalOptions} closeHandler={() => toggleModal(false)} />}
      <CenterContainer>
        <WrapperTopbar />
        <CenterContainerBody>
          <WrapperChatWindow title="Symphony News">
            <ExtensionAppIframe
              ref={extensionAppRef}
              onLoad={onExtensionAppLoaded}
              src="app.html"
            />
          </WrapperChatWindow>
          <WrapperChatWindow title="Enricher Test">
            <ExtensionAppIframe src="renderer-app.html" ref={(ref) => { rendererRef = ref; }} />
          </WrapperChatWindow>
        </CenterContainerBody>
      </CenterContainer>
    </Wrapper>
  );
};

export default SymphonyWrapper;
