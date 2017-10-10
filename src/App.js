import React, {Component} from 'react';
import {SideEffectWithRx} from './side-effect/side-effect-with-rx';
import {SideEffectWithLifecycle} from './side-effect/side-effect-with-lifecycle';
import {FetchPropWithLifecycle} from './fetch-prop/fetch-prop-with-lifecycle';
import {FetchPropWithRx} from './fetch-prop/fetch-prop-with-rx';
import {TempValueWithLifecycle} from './temp-value/temp-value-with-lifecycle';
import {TempValueWithRx} from './temp-value/temp-value-with-rx';
import {ComplexCaseWithLifecycle} from './complex-case/complex-case-with-lifecycle';

const log = _ => console.log(_);

class App extends Component {
    render() {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'space-around'
            }}>
                <div>
                    ----------Temp Value-----------------
                    <TempValueWithLifecycle onSubmit={log} />
                    <TempValueWithRx onSubmit={log} />
                </div>
                <div>
                    ----------Side Effect----------------
                    <SideEffectWithRx onSubmit={log} />
                    <SideEffectWithLifecycle onSubmit={log} />
                </div>
                <div>
                    ----------Fetch Prop-----------------
                    <FetchPropWithLifecycle onSubmit={log} />
                    <FetchPropWithRx onSubmit={log} />
                </div>
                <div>
                    ----------Complex Example-------------
                    <ComplexCaseWithLifecycle onSubmit={log} />
                </div>
            </div>
        );
    }
}

export default App;
