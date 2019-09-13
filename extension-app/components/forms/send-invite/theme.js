import styled from 'styled-components';
import {
  Box, Text,
} from 'sms-sdk-toolbox-ui';
import { THEME_TYPES } from '../../commons/colors';

const getBorderColor = ({ theme }) => (
  theme.mode === THEME_TYPES.DARK
    ? null
    : `1px solid ${theme.theme.lightgrey}`
);

const getBackgroundColor = ({ theme }) => (
  theme.mode === THEME_TYPES.DARK
    ? theme.theme.darkaccent
    : theme.theme.white
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
  opacity: 0;
  transform: translate(-50%,-30%);
  transition: opacity 1s cubic-bezier(.25,.8,.25,1);
  &.open {
    opacity: 1;
  }
`;
export const StyledHeader = styled(Box)`
  align-items: center;
`;

export const StyledNameBox = styled(Box)`
  width: 220px;
`;

export const StyledLabel = styled(Text)`
  padding: 0;
`;

export const StyledForm = styled.form`
 padding: 24px;
`;

export const FormErrorMessage = styled.div`
  opacity: ${props => (props.showError ? 1 : 0)};
  color: ${props => props.theme.theme.danger};
  height: 16px;
  margin-top: 2px;
  font-size: .8rem;
  font-style: italic;
`;
