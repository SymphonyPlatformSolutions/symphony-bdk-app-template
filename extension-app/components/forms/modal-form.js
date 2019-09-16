import React from 'react';
import {
  Box, Button, Text,
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
    <Box vertical justify="center" style={{ marginTop: '10px' }}>
      <Box>
        <Text isTitle> Sample </Text>
      </Box>
      <Box type="secondary">
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun
        </Text>
      </Box>
      <Button type="primary" fill="outlined" onClick={onRequestClose}>Cancel</Button>
    </Box>
  </StyledBox>
);

ModalForm.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
};

export default ModalForm;
