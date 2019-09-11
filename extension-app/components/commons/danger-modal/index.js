import React from 'react';
import Styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { Button, Box, THEME_TYPES } from 'sms-sdk-toolbox-ui';

const Container = Styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: auto;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "title"
    "message"
    "buttons";
`;

const Title = Styled.h1`
  grid-area: title;
  justify-self: center;
  margin-top: 0;
`;

const Message = Styled.span`
  grid-area: message;
  justify-self: center;
  text-align: center;
`;

const ButtonContainer = Styled.div`
  grid-area: buttons;
  justify-self: center;
  align-self: center;
  margin-top: 1em;
`;

const RightButton = Styled.div`
  display: inline;
  margin-left: 1.5rem;
`;

const modalCustomStyles = theme => ({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  content: {
    bottom: 'none',
    margin: '30vh auto',
    backgroundColor: theme && theme.mode === THEME_TYPES.DARK ? theme.colors.dark : '#fff',
    border: theme && theme.mode === THEME_TYPES.DARK ? 'none' : 'inherit',
    width: '30em',
    borderRadius: '10px',
    outline: 'none',
  },
});

const DangerActionConfirmation = (props) => {
  const {
    show,
    message,
    confirmButtonText,
    dismissCallback,
    confirmCallback,
    theme,
  } = props;

  return (
    <ReactModal
      isOpen={show}
      onRequestClose={dismissCallback}
      contentLabel="Delete Confirmation Modal"
      style={modalCustomStyles(theme)}
    >
      <Box align="center">
        <Title>Are you sure?</Title>
        <Message>{message}</Message>
        <ButtonContainer>
          <Button fill="outlined" type="danger" onClick={dismissCallback} title="Cancel">
            Cancel
          </Button>
          <RightButton>
            <Button type="danger" onClick={confirmCallback} title="Confirm action">
              {confirmButtonText}
            </Button>
          </RightButton>
        </ButtonContainer>
      </Box>
    </ReactModal>
  );
};

DangerActionConfirmation.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  confirmButtonText: PropTypes.string.isRequired,
  dismissCallback: PropTypes.func.isRequired,
  confirmCallback: PropTypes.func.isRequired,
  theme: PropTypes.object,
};

DangerActionConfirmation.defaultProps = {
  theme: null,
};

export default withTheme(DangerActionConfirmation);
