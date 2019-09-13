import React from 'react';
import styled from 'styled-components';
import { ModalConsumer } from './modal-context';

const Overlay = styled.div`
  background-color: #808080c7;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
}`;

const ModalRoot = () => (
  <ModalConsumer>
    {({ component: Component, props, hideModal }) => (Component
      ? (
        <Overlay>
          <Component {...props} onRequestClose={hideModal} />
        </Overlay>
      )
      : null)
    }
  </ModalConsumer>
);

export default ModalRoot;
