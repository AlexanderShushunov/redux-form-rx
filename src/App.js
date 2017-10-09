import React, { Component } from 'react';
import {SideEffectWithRx} from './side-effect/side-effect-with-rx';
import {SideEffectWithLifecycle} from './side-effect/side-effect-with-lifecycle';
import {FetchPropWithLifecycle} from './fetch-prop/fetch-prop-with-lifecycle';
import {FetchPropWithRx} from './fetch-prop/fetch-prop-with-rx';

const log = _ => console.log(_);

class App extends Component {
  render() {
    return (
      <div className="App">
          <SideEffectWithRx onSubmit={log} />
          <SideEffectWithLifecycle onSubmit={log} />
          <FetchPropWithLifecycle onSubmit={log} />
          <FetchPropWithRx onSubmit={log} />
      </div>
    );
  }
}

export default App;
