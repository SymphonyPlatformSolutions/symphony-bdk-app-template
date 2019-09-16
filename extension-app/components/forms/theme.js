import {
  THEME_TYPES,
} from 'sms-sdk-toolbox-ui';

import styled from 'styled-components';

const getBorderColor = ({ theme }) => (
  theme.mode === THEME_TYPES.DARK
    ? null
    : `1px solid ${theme.colors.lightgrey}`
);

const getBackgroundColor = ({ theme }) => (
  theme.mode === THEME_TYPES.DARK
    ? theme.colors.darkaccent
    : theme.colors.white
);

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
  opacity: 1;
  transform: translate(-50%,-30%);
  transition: opacity 1s cubic-bezier(.25,.8,.25,1);
  &.open {
    opacity: 1;
  }
`;

export const StyledForm = styled.form`
 padding: 24px;
`;
