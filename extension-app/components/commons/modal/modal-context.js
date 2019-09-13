import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ModalContext = createContext({
  component: null,
  props: {},
  showModal: () => {},
  hideModal: () => {},
});

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    component: null,
    props: {},
    showModal: (targetComp, targetCompProps = {}) => {
      setModalState({
        ...modalState,
        component: targetComp,
        props: targetCompProps,
      });
    },
    hideModal: () => setModalState({
      ...modalState,
      props: null,
      component: null,
    }),
  });

  return (
    <ModalContext.Provider value={modalState}>
      { children }
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.array,
};

ModalProvider.defaultProps = {
  children: [],
};

export const ModalConsumer = ModalContext.Consumer;
