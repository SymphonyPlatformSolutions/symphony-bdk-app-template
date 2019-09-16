import React from 'react';
import styled, { withTheme } from 'styled-components';
import { ModalConsumer } from './modal-context';
import { THEME_TYPES } from '../colors';

const Overlay = styled.div`{
  background-color: #808080c7;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
}`;

const getBorderColor = ({ theme }) => (
  theme.mode === THEME_TYPES.DARK
    ? null
    : `1px solid ${theme.colors.lightgrey}`
);

const getBackgroundColor = ({ theme }) => (
  theme.mode === THEME_TYPES.DARK
    ? theme.colors.darkaccent
    : theme.colors.white
);

export const Modal = styled.div`
  width: 420px;
  overflow: visible;
  border-radius: 4px;
  background:  ${props => getBackgroundColor(props)};
  z-index: 9000;
  border: ${props => getBorderColor(props)};
  position: absolute;
  top: 30%;
  left: 50%;
  opacity: 0;
  transform: translate(-50%,-30%);
  transition: opacity 1s cubic-bezier(.25,.8,.25,1);
  &.open {
    opacity: 1;
  }
`;

const ModalRoot = ({ theme }) => {
  return (
    <ModalConsumer>
      {({ component: Component, props, hideModal }) => (Component
        ? (
          <Overlay>
            <Modal theme={theme}>
              <Component {...props} onRequestClose={hideModal} />
            </Modal>
          </Overlay>
        )
        : null)
      }
    </ModalConsumer>
  );
}

export default withTheme(ModalRoot);
