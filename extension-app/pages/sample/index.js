import React from 'react';
import Header from 'components/header';
import RoomsSelectorContainer from 'components/room-selector';
import Styled from 'styled-components';


const ContainerWrapper = Styled.div`
  display: flex;
  flex-direction: column;
  margin: 35px 10px;
}`;

class Sample extends React.PureComponent {
  render() {
    return (
      <div>
        <Header />
        <div className="page-container">
          <ContainerWrapper>
            <RoomsSelectorContainer />
          </ContainerWrapper>
        </div>
      </div>
    );
  }
}

export default Sample;
