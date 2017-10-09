import React from 'react';
import {reduxForm, formValueSelector, change} from 'redux-form';
import {connect} from 'react-redux';
import {ContactForm} from 'contact-form';

const FORM_NAME = 'TempValueWithLifecycle';

@connect(
    state => formValueSelector(FORM_NAME)(state, 'employed', 'phone'),
    {
        changePhone: newValue => change(FORM_NAME, 'phone', newValue)
    }
)
@reduxForm({
    form: FORM_NAME
})
export class TempValueWithLifecycle extends React.Component {

    tempPhone = '';

    componentWillReceiveProps({employed}) {
        if (this.props.employed !== employed) {
            this.props.changePhone(this.tempPhone);
            this.tempPhone = this.props.phone || '';
        }
    }

    render() {
        return (<ContactForm {...this.props} />);
    }
}
