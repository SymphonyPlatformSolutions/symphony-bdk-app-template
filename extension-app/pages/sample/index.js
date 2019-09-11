import React from 'react';
import Header from 'components/header';
import RoomsSelectorContainer from 'components/room-selector';
import Styled from 'styled-components';
import DemoComponentContainer from 'components/demo-component-container';


const ContainerWrapper = Styled.div`
  display: flex;
  flex-direction: column;
  margin: 35px 10px;
}`;

const Sample = () => (
  <div>
    <Header />
    <div className="page-container">
      <ContainerWrapper>
        <RoomsSelectorContainer />
      </ContainerWrapper>
    </div>
    <div>
      <h1>Fruit Basket</h1>
      <DemoComponentContainer />
    </div>
  </div>
);

export default Sample;
