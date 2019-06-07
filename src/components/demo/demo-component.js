import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function DemoComponent({
  isFruit, name,
  submitCallback, deleteCallback,
  isLoading,
}) {
  const [{ typedName, fruitChecked }, setTransientData] = useState({ typedName: name, fruitChecked: isFruit });
  const [{ savedName, savedFruit }, setSavedData] = useState({ savedName: name, savedFruit: isFruit });
  const [isEdit, toggleEdit] = useState(false);

  if (name !== savedName || isFruit !== savedFruit) {
    setSavedData({ savedName: name, savedFruit: isFruit });
    setTransientData({ typedName: name, fruitChecked: isFruit });
    toggleEdit(false);
  }

  if (isEdit) {
    return (
      <div>
        <input
          value={typedName}
          type="text"
          placeholder="Fruit Name"
          onChange={e => setTransientData({
            typedName: e.target.value,
            fruitChecked,
          })}
        />
        <label htmlFor="fruit">
          <Radio
            checked={fruitChecked}
            type="radio"
            id="fruit"
            name="fruitOrVeg"
            onChange={() => setTransientData({ typedName, fruitChecked: true })}
          />
          Fruit
        </label>
        <label htmlFor="vegetable">
          <Radio
            checked={!fruitChecked}
            type="radio"
            id="vegetable"
            name="fruitOrVeg"
            onChange={() => setTransientData({ typedName, fruitChecked: false })}
          />
          Vegetable
        </label>
        <Button onClick={() => submitCallback({ name: typedName, isFruit: fruitChecked })}>Submit</Button>
        <Button onClick={() => { setTransientData({ typedName: name, fruitChecked: isFruit }); toggleEdit(false); }}>Cancel</Button>
        {isLoading && <Loading>Loading...</Loading>}
      </div>
    );
  }

  return (
    <div>
      <Label>
        <Fruit>{isFruit ? '🍉' : '🥕'}</Fruit>{name}
        <button onClick={() => toggleEdit(true)}>Edit</button>
        <button onClick={() => deleteCallback()}>Delete</button>
        {isLoading && <Loading>Loading...</Loading>}
      </Label>
    </div>
  );
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
const Label = styled.span`
  margin: 1rem 1.5rem;
  font-size: 1.3rem;
`;
const Radio = styled.input`
`;
const Button = styled.button`
`;
const Loading = styled.span`
  margin-left: 2rem;
`;
