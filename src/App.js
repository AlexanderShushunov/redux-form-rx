import React, { Component } from 'react';
import {ContactForm} from './form';

const log = _ => console.log(_);

class App extends Component {
  render() {
    return (
      <div className="App">
          <ContactForm onSubmit={log} />
      </div>
    );
  }
}

export default App;
