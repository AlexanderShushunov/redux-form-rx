import {reduxForm, formValueSelector} from 'redux-form';
import {connect} from '@redneckz/react-redux-rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {onChange, addStateProps} from 'rx-utils';
import {ContactForm} from 'contact-form';
import {asyncFunc} from './async-func';

const FORM_NAME = 'FetchPropWithRx';

const mapStateToProps = state => ({
    lastName: formValueSelector(FORM_NAME)(state, 'lastName')
});

export const FetchPropWithRx = connect(
    (state$, props$) =>
        props$
            ::addStateProps(state$, mapStateToProps)
            ::onChange('lastName')
            .switchMap(({lastName}) => asyncFunc(lastName))
            .map(notModel => ({notModel}))
)(reduxForm({
    form: FORM_NAME
})(ContactForm));

FetchPropWithRx.defaultProps = {
    notModel: -1
};