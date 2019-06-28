import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MODAL_IDS } from 'utils/system/app-constants';
import { BlueButton } from '../commons';


const DialogDrawer = styled.div`
  position: fixed;
  border-radius: 2px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  padding: 2rem;
  left: -100%;
  opacity: 0;
  transition: left 0.3s ease-in-out, opacity 0.3s ease-in-out;
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  &.open {
    left: 6px;
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 45rem;
`;

const CloseButton = styled.button`
  border: none;
  border-radius: 50%;
  height: 1.8rem;
  width: 1.8rem;
  font-size: 1.3rem;
  color: #919191;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: none;
`;

const Title = styled.span`
  font-size: 2rem;
`;
const TopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledSelect = styled.select`
  background: white;
  border: 2px solid #807c7c;
  padding: 5px;
`;

const FloatingRightButton = styled(BlueButton)`
  margin: 10px 0 0 0;
  position: absolute;
  right: 15px;
  width: 10rem;
`;

const keyMapDialogs = Object.keys(MODAL_IDS).map(key => ({
  key,
  value: MODAL_IDS[key],
}));


function ModalDrawer({ closeHandler, isOpen }) {
  const [dialog, setDialog] = useState(keyMapDialogs[0].value);

  const handleOnClick = () => {
    const { madeServices } = window.SYMPHONY.services;
    if (!madeServices || !madeServices.length) {
      console.log('No services were made, so nothing to render the entity!');
      return;
    }

    if (madeServices) {
      const enricherService = madeServices.find(el => el.name.includes('enricher'));
      enricherService.instance.action({entity: dialog});
    }

    closeHandler();
  };

  return (
    <DialogDrawer className={isOpen ? 'open' : null}>
      <Container>
        <TopContainer>
          <Title>Open a custom dialog</Title>
          <span>
            <i>These dialogs need to be <b>defined</b></i>
          </span>
          <CloseButton type="button" onClick={closeHandler}>x</CloseButton>
        </TopContainer>
        <h4>Select Dialog to Open</h4>
        <StyledSelect onChange={({target}) => setDialog(target.value)}>
          {
             keyMapDialogs.map(
               entry => <option key={entry.key} value={entry.value}>{entry.key}</option>,
             )
           }
        </StyledSelect>
        <FloatingRightButton
          type="button"
          onClick={handleOnClick}
        >
             Open Dialog
        </FloatingRightButton>
      </Container>
    </DialogDrawer>
  );
}

export default ModalDrawer;
