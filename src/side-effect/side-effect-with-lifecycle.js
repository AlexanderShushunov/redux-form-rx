import React from 'react';
import {reduxForm, formValueSelector, change} from 'redux-form';
import {connect} from 'react-redux';
import {isFieldTouched} from 'form-utils';
import {ContactForm} from 'contact-form';

const FORM_NAME = 'SideEffectWithLifecycle';
const selector = formValueSelector(FORM_NAME);

@connect(
    state => ({
        firstName: selector(state, 'firstName'),
        isEmailTouched: isFieldTouched(FORM_NAME, 'email')(state)
    }),
    {
        changeEmail: newValue => change(FORM_NAME, 'email', newValue)
    }
)
@reduxForm({
    form: FORM_NAME
})
export class SideEffectWithLifecycle extends React.Component {
    componentWillReceiveProps({firstName, isEmailTouched}) {
        if (this.props.firstName !== firstName) {
            if (firstName && !isEmailTouched) {
                this.props.changeEmail(`${firstName}@hotmail.com`);
            }
        }
    }

    render() {
        return (<ContactForm {...this.props} />);
    }
}
