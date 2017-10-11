import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import {assign} from 'lodash';

export const assignLatest = (...observables) =>
    Observable.combineLatest(observables)
    .map(values => assign({}, ...values));