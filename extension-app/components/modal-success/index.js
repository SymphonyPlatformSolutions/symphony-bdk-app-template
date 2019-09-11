import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from 'sms-sdk-toolbox-ui';
import removeSymphonyModal from 'services/modal-service';

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const SuccessModal = (props) => {
  const { text, modalId, title } = props;

  const cancelHandler = () => {
    removeSymphonyModal(modalId);
  };

  return (
    <StyledModal title={title}>
      <h1>{text}</h1>
      <Button onClick={cancelHandler}>Close</Button>
    </StyledModal>
  );
};

SuccessModal.propTypes = {
  modalId: PropTypes.string.isRequired,
  text: PropTypes.string,
  title: PropTypes.string,
};

SuccessModal.defaultProps = {
  title: null,
  text: 'Action done succesfully',
};

export default SuccessModal;
