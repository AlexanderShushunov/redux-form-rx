import React from 'react';
import {Field, formValues} from 'redux-form';

export const ContactForm = formValues('employed')(
    ({handleSubmit, notModel, employed}) => (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <Field
                        name="firstName"
                        component="input"
                        type="text"
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <Field
                        name="lastName"
                        component="input"
                        type="text"
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <Field
                        name="email"
                        component="input"
                        type="email"
                    />
                </div>
                <div>
                    <label htmlFor="employed">Employed</label>
                    <span>
                    <Field
                        name="employed"
                        id="employed"
                        component="input"
                        type="checkbox"
                    />
                </span>
                </div>
                <div>
                    <label htmlFor="phone">
                        {employed ? 'Inner phone number' : 'Mobile'}
                    </label>
                    <Field
                        name="phone"
                        component="input"
                        type="text"
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <div>
                {notModel}
            </div>
        </div>
    )
);
