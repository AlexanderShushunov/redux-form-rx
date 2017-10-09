import {reduxForm, formValueSelector, change} from 'redux-form';
import {connect} from '@redneckz/react-redux-rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {onChange, doAction} from 'rx-utils';
import {ContactForm} from 'contact-form';

const FORM_NAME = 'TempValueWithRx';

const switchPhone = () => {
    let tempValue = '';
    return ({phone}) => {
        const action = change(FORM_NAME, 'phone', tempValue || '');
        tempValue = phone;
        return action;
    };
};

export const TempValueWithRx = connect(
    state$ => state$.map(
        state => formValueSelector(FORM_NAME)(state, 'employed', 'phone')
    ),
    (dispatch, props$) => props$
        ::onChange('employed')
        ::doAction(switchPhone(), dispatch)
)(reduxForm({
    form: FORM_NAME
})(ContactForm));
