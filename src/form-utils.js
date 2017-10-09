import {getFormMeta} from 'redux-form';

export const isFieldTouched = (formName, fieldName) => state => {
    const meta = getFormMeta(formName)(state);
    return meta && meta[fieldName] && meta[fieldName].touched;
};