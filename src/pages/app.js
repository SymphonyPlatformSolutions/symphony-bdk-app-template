import React from 'react';
import Header from '../components/header';
import DemoComponentContainer from '../components/demo-component/demo-component-container';

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <Header />
        <div className="page-container">
          TEMPLATE PAGE
        </div>
        <div>
          <h1>Random Brazilian Fruits and Veggies</h1>
          <DemoComponentContainer />
        </div>
      </div>
    );
  }
}

export default App;
