import {reduxForm, formValueSelector, change} from 'redux-form';
import {connect} from '@redneckz/react-redux-rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {onChange, addStateProps, doAction, assignLatest} from 'rx-utils';
import {isFieldTouched} from 'form-utils';
import {ContactForm} from 'contact-form';
import {asyncFunc} from './async-func';

const FORM_NAME = 'ComplexCaseWithRx';
const selector = (...fields) => state => formValueSelector(FORM_NAME)(state, ...fields);

const changEmail = ({firstName}) => firstName && change(FORM_NAME, 'email', `${firstName}@hotmail.com`);

const fillEmailByFirstName = {
    mapStateToProps: state => ({
        firstName: selector('firstName')(state),
        isEmailTouched: isFieldTouched(FORM_NAME, 'email')(state)
    }),
    mapDispatchToProps: (dispatch, props$) =>
        props$
            ::onChange('firstName')
            .filter(({isEmailTouched}) => !isEmailTouched)
            ::doAction(changEmail, dispatch)
};

const switchPhone = () => {
    let tempValue;
    return ({phone}) => {
        const action = change(FORM_NAME, 'phone', tempValue || '');
        tempValue = phone;
        return action;
    }
};

const saveOtherPhoneType = {
    mapStateToProps: selector('employed', 'phone'),
    mapDispatchToProps: (dispatch, props$) => props$
        ::onChange('employed')
        ::doAction(switchPhone(), dispatch)
};

function fetchNotModel(state$, props$) {
    return props$
        ::addStateProps(state$, state => ({
            lastName: selector('lastName')(state)
        }))
        ::onChange('lastName')
        .switchMap(({lastName}) => asyncFunc(lastName))
        .map(notModel => ({notModel}));
}

export const ComplexCaseWithRx = connect(
    (state$, props$) => assignLatest(
        state$.map(fillEmailByFirstName.mapStateToProps),
        state$.map(saveOtherPhoneType.mapStateToProps),
        fetchNotModel(state$, props$)
    ),
    (dispatch, props$) => assignLatest(
        fillEmailByFirstName.mapDispatchToProps(dispatch, props$),
        saveOtherPhoneType.mapDispatchToProps(dispatch, props$)
    )
)(reduxForm({
    form: FORM_NAME
})(ContactForm));

ComplexCaseWithRx.defaultProps = {
    notModel: -1
};