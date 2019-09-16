import styled from 'styled-components';

export const StyledModal = styled.div`
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

export const StyledForm = styled.form`
 padding: 24px;
`;
