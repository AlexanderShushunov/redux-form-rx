import React from 'react';
import {reduxForm, formValueSelector, change} from 'redux-form';
import {connect} from 'react-redux';
import {isFieldTouched} from 'form-utils';
import {ContactForm} from 'contact-form';
import {asyncFunc} from './async-func';

const FORM_NAME = 'ComplexCaseWithLifecycle';

const mapStateToProps = state => ({
    ...formValueSelector(FORM_NAME)(state, 'firstName', 'employed', 'lastName', 'phone'),
    isEmailTouched: isFieldTouched(FORM_NAME, 'email')(state)
});

@connect(
    mapStateToProps,
    {
        changePhone: newValue => change(FORM_NAME, 'phone', newValue),
        changeEmail: newValue => change(FORM_NAME, 'email', newValue)
    }
)
@reduxForm({
    form: FORM_NAME
})
export class ComplexCaseWithLifecycle extends React.Component {

    state = {
        notModel: -1
    };

    setStateIsSafe = false;

    tempPhone = '';

    componentDidMount() {
        this.setStateIsSafe = true;
        this.fetchNotModel(this.props.firstName);
    }

    componentWillReceiveProps({lastName, firstName, employed, isEmailTouched}) {
        if (this.props.lastName !== lastName) {
            this.fetchNotModel(lastName);
        }
        if (this.props.firstName !== firstName) {
            if (firstName && !isEmailTouched) {
                this.props.changeEmail(`${firstName}@hotmail.com`);
            }
        }
        if (this.props.employed !== employed) {
            this.props.changePhone(this.tempPhone);
            this.tempPhone = this.props.phone || '';
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
