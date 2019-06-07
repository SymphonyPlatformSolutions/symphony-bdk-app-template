import React from 'react';
import Header from '../components/header';
import DemoComponentContainer from '../components/demo/demo-component-container';

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <Header />
        <div className="page-container">
          TEMPLATE PAGE
        </div>
        <div>
          <h1>Fruit Basket</h1>
          <DemoComponentContainer />
        </div>
      </div>
    );
  }
}

export default App;
