import React from 'react';
import {
  Box, Button,
} from 'sms-sdk-toolbox-ui';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledBox = styled(Box)`
  padding: 40px;
`;

const ModalForm = ({
  onRequestClose,
}) => (
  <StyledBox>
    <Box horizontal justify="center" style={{ marginTop: '10px' }}>
      <Button type="primary" fill="outlined" onClick={onRequestClose}>Cancel</Button>
    </Box>
  </StyledBox>
);

ModalForm.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default ModalForm;
