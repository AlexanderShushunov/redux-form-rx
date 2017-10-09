import React from 'react';
import {reduxForm, formValueSelector} from 'redux-form';
import {connect} from 'react-redux';
import {ContactForm} from 'contact-form';
import {asyncFunc} from './async-func';

const FORM_NAME = 'FetchPropWithLifecycle';

const mapStateToProps = state => ({
    lastName: formValueSelector(FORM_NAME)(state, 'lastName')
});

@connect(
    mapStateToProps
)
@reduxForm({
    form: FORM_NAME
})
export class FetchPropWithLifecycle extends React.Component {

    state = {
        notModel: -1
    };

    setStateIsSafe = false;

    componentDidMount() {
        this.setStateIsSafe = true;
        this.fetchNotModel(this.props.lastName);
    }

    componentWillReceiveProps({lastName}) {
        if (this.props.lastName !== lastName) {
            this.fetchNotModel(lastName);
        }
    }

    componentWillUnmount() {
        this.setStateIsSafe = false;
    }

    fetchNotModel(lastName) {
        asyncFunc(lastName)
            .then(notModel => this.safeSetState({
                    notModel
                })
            );
    }

    safeSetState = (newState) => {
        if (!this.setStateIsSafe) {
            return;
        }
        this.setState(newState);
    };

    render() {
        return (<ContactForm {...this.props} notModel={this.state.notModel} />);
    }
}
