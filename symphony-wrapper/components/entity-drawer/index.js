import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { BlueButton } from '../commons';

const DrawerModal = styled.div`
  position: fixed;
  border-radius: 2px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  padding: 2rem;
  left: -50%;
  opacity: 0;
  transition: left 0.3s ease-in-out, opacity 0.3s ease-in-out;
  background-color: white;
  &.open {
    left: 6px;
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 45rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #b2b2b2;
  padding: 7px;
`;

const TextField = styled.input`
  width: 25rem;
  border-radius: 4px;
  border: 1px solid #b2b2b2;
  padding: 7px;
`;

const CloseButton = styled.button`
  border: none;
  border-radius: 50%;
  height: 1.8rem;
  width: 1.8rem;
  font-size: 1.3rem;
  color: #919191;
  cursor: pointer;
  background-color: none;
`;

const Title = styled.span`
  font-size: 2rem;
`;
const TopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

let textFieldRef;
let jsonFieldRef;
const EntityDrawer = (props) => {
  const { closeHandler, submitHandler, isOpen } = props;

  return (
    <DrawerModal className={isOpen ? 'open' : null}>
      <Container>
        <TopContainer>
          <Title>Add entities for enriching</Title>
          <CloseButton type="button" onClick={closeHandler}>x</CloseButton>
        </TopContainer>
        <h4>Entity Name</h4>
        <TextField type="text" ref={(ref) => { textFieldRef = ref; }} />
        <hr />
        <h4>Entity JSON</h4>
        <TextArea placeholder="Valid JSON" rows="15" ref={(ref) => { jsonFieldRef = ref; }} />
        <BlueButton width="10rem" type="button" onClick={() => submitHandler(textFieldRef.value, { id: jsonFieldRef.value || '{}' })}>Launch entity
        </BlueButton>
      </Container>
    </DrawerModal>
  );
};

EntityDrawer.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

EntityDrawer.defaultProps = {
  isOpen: false,
};

export default EntityDrawer;
