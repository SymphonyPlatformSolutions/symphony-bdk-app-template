import React, { useState } from 'react';
import styled from 'styled-components';

export default function DemoForm(props) {
  const [name, setName] = useState('');
  const [isFruit, setFruit] = useState(true);

  return (
    <div>
      <input value={name} type="text" placeholder="Fruit Name" onChange={e => setName(e.target.value)} />
      <label htmlFor="fruit">
        <Radio
          checked={isFruit}
          type="radio"
          id="fruit"
          name="fruitOrVeg"
          onChange={() => setFruit(true)}
        />
        Fruit
      </label>
      <label htmlFor="vegetable">
        <Radio
          checked={!isFruit}
          type="radio"
          id="vegetable"
          name="fruitOrVeg"
          onChange={() => setFruit(false)}
        />
        Vegetable
      </label>
      <Button onClick={() => console.log(name, isFruit)}>Submit</Button>
    </div>
  );
}

const Radio = styled.input`
`;
const Button = styled.button`
`;
