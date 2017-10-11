import {reduxForm, formValueSelector, change} from 'redux-form';
import {connect} from '@redneckz/react-redux-rxjs';
import 'rxjs/add/operator/map';
import {onChange, doAction, pluckPrev} from 'rx-utils';
import {ContactForm} from 'contact-form';

const FORM_NAME = 'TempValueWithRx';

const changePhone = newValue => change(FORM_NAME, 'phone', newValue);

export const TempValueWithRx = connect(
    state$ => state$.map(
        state => formValueSelector(FORM_NAME)(state, 'employed', 'phone')
    ),
    (dispatch, props$) => props$
        ::onChange('employed')
        ::pluckPrev('phone', '')
        ::doAction(changePhone, dispatch)
)(reduxForm({
    form: FORM_NAME
})(ContactForm));
