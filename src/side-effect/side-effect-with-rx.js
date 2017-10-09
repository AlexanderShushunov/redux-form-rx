import {reduxForm, formValueSelector, change} from 'redux-form';
import {connect} from '@redneckz/react-redux-rxjs';
import 'rxjs/add/operator/map';
import {onChange, doAction} from 'rx-utils';
import {isFieldTouched} from 'form-utils';
import {ContactForm} from 'contact-form';

const FORM_NAME = 'SideEffectWithRx';
const selector = formValueSelector(FORM_NAME);

function helpUserFillEmail({isEmailTouched, firstName}) {
    if (firstName && !isEmailTouched) {
        return change(FORM_NAME, 'email', `${firstName}@hotmail.com`);
    }
}

export const SideEffectWithRx = connect(
    state$ => state$.map(
        state => ({
            firstName: selector(state, 'firstName'),
            isEmailTouched: isFieldTouched(FORM_NAME, 'email')(state)
        })
    ),
    (dispatch, props$) => props$
        ::onChange('firstName')
        ::doAction(helpUserFillEmail, dispatch)
)(reduxForm({
    form: FORM_NAME
})(ContactForm));
