import React, { useState, useEffect } from 'react';
import {
  Box, Button,
} from 'sms-sdk-toolbox-ui';
import PropTypes from 'prop-types';

import {
  StyledModal,
  StyledForm,
} from './theme';

const ModalForm = ({
  hideModal,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  });

  const openClassName = open ? 'open' : null;

  const stopCascade = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <StyledModal className={openClassName}>
        <Box>
          <Box horizontal justify="center" style={{ marginTop: '10px' }}>
            <Button type="primary" fill="outlined" onClick={hideModal}>Cancel</Button>
          </Box>
        </Box>
    </StyledModal>
  );
};

ModalForm.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default ModalForm;
