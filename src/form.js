import React from 'react';
import {Field, reduxForm, formValueSelector, change} from 'redux-form';
import {connect} from '@redneckz/react-redux-rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

const FORM_NAME = 'contact';
const selector = formValueSelector(FORM_NAME);

export const ContactForm = connect(
    state$ => state$.map(
        state => selector(state, 'firstName', 'lastName', 'email')
    ),
    (dispatch, props$) => props$
        .map(({firstName}) => firstName)
        ::dispatch(firstName => change(FORM_NAME, 'lastName', firstName))
)(
    reduxForm({
        form: FORM_NAME
    })(({handleSubmit, firstName = '', lastName = '', email = ''}) => {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <Field name="firstName" component="input" type="text" />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <Field name="lastName" component="input" type="text" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field name="email" component="input" type="email" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <div>
                    {`${firstName} ${lastName} ${email}`}
                </div>
            </div>
        );
    })
);
