import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Close } from 'styled-icons/evil';

const IconClose = styled(Close)`
  margin-left: 8px;
  position: absolute;
  right: 5px;
  top: 5px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const ModalContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: #000000cc;
`;

const ModalWrapper = styled.div`
  position: absolute;
  min-width: 530px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border: 1px solid #d8dee8;
`;

const ModalIframe = styled.iframe`
  border: none;
`;

let internalPointer;


function Modal({ modalOptions, closeHandler }) {
  const iframeRef = useRef();

  useEffect(() => {
    internalPointer = setInterval(() => {
      if (iframeRef.current) {
        iframeRef.current.contentWindow.SYMPHONY = Object.assign({}, window.SYMPHONY);
      }
    }, 1);
  }, []);

  const closeIframe = () => {
    clearInterval(internalPointer);
    iframeRef.current.contentWindow.SYMPHONY.services = {
      subscribe: () => ({
        close: () => {
          closeHandler();
        },
      }),
    };
  };
  return (
    <ModalContainer>
      <ModalWrapper>
        <IconClose size={25} bold onClick={closeHandler} />
        <ModalIframe
          width={modalOptions.width}
          height={modalOptions.height}
          ref={iframeRef}
          src={modalOptions.url}
          onLoad={closeIframe} />
      </ModalWrapper>
    </ModalContainer>
  );
}

Modal.propTypes = {
  modalOptions: PropTypes.object.isRequired,
  closeHandler: PropTypes.func.isRequired,
};


export default Modal;
