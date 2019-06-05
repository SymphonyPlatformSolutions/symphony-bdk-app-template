import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function DemoComponent({ isFruit, name }) {
  return (<Label><Fruit>{isFruit ? '🍉' : '🥕'}</Fruit>{name}</Label>);
}

DemoComponent.propTypes = {
  isFruit: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

DemoComponent.defaultProps = {
  isFruit: true,
};

const Fruit = styled.span`
  padding-right: 1rem;
`;
const Label = styled.div`
  margin: 1rem 1.5rem;
  font-size: 1.3rem;
`;
