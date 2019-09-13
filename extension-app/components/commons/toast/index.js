/* eslint react/no-array-index-key: "off" */
// Disabling because text has no alternative for key

import React from 'react';
import PropTypes from 'prop-types';
import Styled, { keyframes, css } from 'styled-components';

const COLORS = {
  success: '#56b68b',
  error: '#ec4d5c',
  info: '#767676',
  warning: '#d36535',
};

const AnimationMoveInTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-7rem);
  }

  6% {
    opacity: 1;
    transform: translateY(0.7rem);
  }

  8% {
    transform: translate(0);
  }

  92% {
    transform: translate(0);
  }

  94% {
    opacity: 1;
    transform: translateY(0.7rem);
  }

  100% {
    opacity: 0;
    transform: translateY(-7em);
  }
`;

const Animation = css`
  animation: ${AnimationMoveInTop} 5s ease-out .2s;
  animation-fill-mode: backwards;
  position: fixed;
`;

const AnimationProvider = Styled.div`
  ${props => !props.isEmbedded && Animation}
`;

const ToastContainer = Styled.div`
  ${props => !props.isEmbedded && `
    display: inherit;
    left: 50%;
    position: absolute;    
  `}
`;

const StyledToast = Styled.div`
  display: grid;
  grid-template-areas: 'logo text button';
  grid-template-columns: 2.6rem auto auto;
  grid-template-rows: auto;
  z-index: 10;
  margin-top: ${props => (props.isEmbedded ? '0' : '1rem')};
  max-width: ${props => (props.isEmbedded ? '100%' : '28rem')};
  min-width: 17rem;
  min-height: 2.2rem;
  border-radius: 0.3rem;
  list-style-type: none;
  transform: ${props => (props.isEmbedded ? 'transform: none' : 'translateX(-50%)')};
  ${props => props.isEmbedded && `
    position: inherit;
    width: 100%;
  `}
  background-color: ${props => COLORS[props.type]};
`;

const ToastLogo = Styled.div`
  grid-area: logo;
  display: grid;
  font-weight: bold;
  border-top-left-radius: 0.3rem;
  border-bottom-left-radius: 0.3rem;
  justify-content: center;
  align-content: center;
`;

const ToastIconContainer = Styled.div`
  display: flex;
  width: 1.5rem;
  border-radius: 50%;
  height: 1.5rem;
  background-color: white;
  text-align: center;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
`;

const ToastText = Styled.div`
  margin: 0.32rem 0.24rem 0.3rem 0.5rem;
  grid-area: text;
  align-self: center;
  justify-self: start;
  text-align: start;
  color: #ffffff;
`;

const ToastButtonContainer = Styled.div`
  grid-area: button;
  align-self: center;
  justify-self: end;
`;

const ToastButton = Styled.button`
  margin: 2px 4px 0 0;
  border: none;
  background: none;
  color: #ffffff;
  cursor: pointer;
`;

const ToastIcon = Styled.i`
  display: inline;
  font-weight: bold;
  color: ${props => COLORS[props.type]};
  ${props => props.type === 'success' && 'font-size: 1rem;'}
`;

const Toast = (props) => {
  let currentTimeout;

  const getMessageFromCode = () => {
    const { codeError } = props;

    switch (codeError) {
      case 403:
        return 'Not Allowed';
      case 404:
        return 'Not Found';
      case 409:
        return 'URL already exists';
      default:
        return 'Try again later...';
    }
  };

  const startTimeout = () => {
    const { toastHide, isEmbedded } = props;
    if (isEmbedded) {
      return;
    }
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }
    currentTimeout = setTimeout(toastHide, 5000);
  };

  let iconModifier;
  let textMessage;
  const {
    toastText, toastType, toastHide, isEmbedded,
    title,
  } = props;

  startTimeout();

  switch (toastType) {
    case 'success':
      iconModifier = 'check';
      textMessage = toastText;
      break;
    case 'error':
      iconModifier = 'times';
      textMessage = `${toastText}: ${getMessageFromCode()}`;
      break;
    case 'info':
      iconModifier = 'info';
      textMessage = toastText;
      break;
    case 'warning':
      iconModifier = 'exclamation-triangle';
      textMessage = toastText;
      break;
    default:
      break;
  }

  return (
    <ToastContainer title={title} isEmbedded={isEmbedded}>
      <AnimationProvider isEmbedded={isEmbedded}>
        <StyledToast isEmbedded={isEmbedded} type={toastType}>
          <ToastLogo>
            <ToastIconContainer>
              <ToastIcon
                type={toastType}
                className={`fas fa-${iconModifier}`}
              />
            </ToastIconContainer>
          </ToastLogo>
          <ToastText>
            <span>
              {textMessage
                ? textMessage
                  .split('\n')
                  .map((item, i) => (
                    <div key={`toast_text_line_${i}`}>{item}</div>
                  ))
                : ''}
            </span>
          </ToastText>
          {isEmbedded ? null : (
            <ToastButtonContainer>
              <ToastButton
                type="button"
                onClick={toastHide}
              >
                <i className="fas fa-times" />
              </ToastButton>
            </ToastButtonContainer>
          )}
        </StyledToast>
      </AnimationProvider>
    </ToastContainer>
  );
};

Toast.propTypes = {
  /** Callback to hide the Toast. Comes from Container,
   *  and triggers the Redux removeToast action. */
  toastHide: PropTypes.func,
  /** Text to be displayed */
  toastText: PropTypes.string.isRequired,
  /** Type of Toast. Can be **success** or **error** */
  toastType: PropTypes.string.isRequired,
  /** Error Code, to render different Error Messages. */
  codeError: PropTypes.number,
  /** Boolean to see if Toast is to be positioned on the page, or to float above */
  isEmbedded: PropTypes.bool,
};

Toast.defaultProps = {
  toastHide: undefined,
  codeError: undefined,
  isEmbedded: false,
};
export default Toast;
