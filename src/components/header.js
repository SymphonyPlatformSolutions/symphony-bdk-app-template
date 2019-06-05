import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../services/theme/theme-context';
import { themeNames } from './theme/theme-provider';

const Header = () => {
  const theme = useContext(ThemeContext);
  return (
    <HeaderDiv dark={theme.name === themeNames.DARK}>Template App</HeaderDiv>
  );
};

const HeaderDiv = styled.div`
  margin: auto;
  width: 8em;
  color: #FFFFFF;
  text-align: center;
  border: 2px solid $color-secondary;
  border-radius: 3px;
  font-size: 2em;
  background-color: ${props => (props.dark ? '#5A5C60' : '#181818')}`;
export default Header;
