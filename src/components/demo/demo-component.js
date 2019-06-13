import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function DemoComponent({
  isFruit, name,
  submitHandler, deleteHandler,
  isCreate, cancelCreationHandler,
  loading, innerIndex,
}) {
  const [{ typedName, fruitChecked }, setTransientData] = useState({
    typedName: name,
    fruitChecked: isFruit,
  });
  const [{ savedName, savedFruit }, setSavedData] = useState({
    savedName: name,
    savedFruit: isFruit,
  });
  const [isEdit, toggleEdit] = useState(false);

  if (name !== savedName || isFruit !== savedFruit) {
    setSavedData({ savedName: name, savedFruit: isFruit });
    setTransientData({ typedName: name, fruitChecked: isFruit });
    toggleEdit(false);
  }

  if (isCreate || isEdit) {
    return (
      <ComponentContainer>
        <FruitContainer>
          <InputContainer>
            <Input
              value={typedName}
              type="text"
              placeholder="Fruit Name"
              onChange={e => setTransientData({
                typedName: e.target.value,
                fruitChecked,
              })}
            />
            <CheckContainer>
              <InputLabel htmlFor={`fruit_${innerIndex}`}>
                <Radio
                  checked={fruitChecked}
                  type="radio"
                  id={`fruit_${innerIndex}`}
                  name={`fruitOrVegetable_${innerIndex}`}
                  onChange={() => setTransientData({ typedName, fruitChecked: true })}
                />
              Fruit
              </InputLabel>
              <InputLabel htmlFor={`vegetable_${innerIndex}`}>
                <Radio
                  checked={!fruitChecked}
                  type="radio"
                  id={`vegetable_${innerIndex}`}
                  name={`fruitOrVegetable_${innerIndex}`}
                  onChange={() => setTransientData({ typedName, fruitChecked: false })}
                />
              Vegetable
              </InputLabel>
            </CheckContainer>
          </InputContainer>
          <ButtonContainer>
            <Button
              onClick={() => submitHandler({ name: typedName, isFruit: fruitChecked })}
            >Submit
            </Button>
            <Button onClick={() => {
              if (!isCreate) {
                setTransientData({ typedName: name, fruitChecked: isFruit });
                toggleEdit(false);
              } else {
                cancelCreationHandler();
              }
            }}
            >Cancel
            </Button>
          </ButtonContainer>
        </FruitContainer>
        <LoadingContainer>
          {loading && <Loading>Loading...</Loading>}
        </LoadingContainer>
      </ComponentContainer>
    );
  }

  return (
    <ComponentContainer>
      <FruitContainer>
        <TextLabel>
          <Fruit>{isFruit ? '🍉' : '🥕'}</Fruit>{name}
        </TextLabel>
        <ButtonContainer>
          <Button onClick={() => toggleEdit(true)}>Edit</Button>
          <Button onClick={() => deleteHandler()}>Delete</Button>
        </ButtonContainer>
      </FruitContainer>
      <LoadingContainer>
        {loading && <Loading>Loading...</Loading>}
      </LoadingContainer>
    </ComponentContainer>
  );
}

DemoComponent.propTypes = {
  isFruit: PropTypes.bool,
  name: PropTypes.string.isRequired,
  submitHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  cancelCreationHandler: PropTypes.func.isRequired,
  innerIndex: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  isCreate: PropTypes.bool,
};

DemoComponent.defaultProps = {
  isFruit: true,
  loading: false,
  isCreate: false,
};

const FruitContainer = styled.div`
  width: 25rem;
  display: flex;
  padding: 0.6rem 1rem;
  align-items: center;
  justify-content: space-between;
`;
const Fruit = styled.span`
  padding-right: 1rem;
`;
const TextLabel = styled.span`
  font-size: 1.3rem;
`;
const InputLabel = styled.label``;
const Radio = styled.input``;
const Button = styled.button`
  padding: 0.4rem;
  border: 1px solid #4D4D4D;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 7px;
  cursor: pointer;
  &:hover {
    background-color: #EDEDED;
  }
`;
const Loading = styled.span`
  margin-left: 2rem;
`;
const Input = styled.input`
  padding: 0.4rem 0.8rem;
  height: 1rem;
  border-radius: 7px;
  border: 1px solid #4D4D4D;
`;
const CheckContainer = styled.div`
  margin-top: 0.3rem;
  display: flex;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
`;
const LoadingContainer = styled.div`
  width: 5rem;
`;
const ButtonContainer = styled.div`
  width: 7rem;
  display: flex;
  justify-content: space-between;
`;
const ComponentContainer = styled.div`
  width: 36rem;
  align-items: center;
  justify-content: space-between;
  display: flex;
`;
