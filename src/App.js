import React, { Component } from 'react';
import {SideEffectWithRx} from './side-effect/side-effect-with-rx';
import {SideEffectWithLifecycle} from './side-effect/side-effect-with-lifecycle';

const log = _ => console.log(_);

class App extends Component {
  render() {
    return (
      <div className="App">
          <SideEffectWithRx onSubmit={log} />
          <SideEffectWithLifecycle onSubmit={log} />
      </div>
    );
  }
}

export default App;
