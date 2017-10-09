import {get} from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/withLatestFrom';

export function onChange(propName) {
    return this
        .map(props => get(props, propName))
        .distinctUntilChanged() // detect than prop change
        .withLatestFrom(this) // add all other props
        .map(([, props]) => props)
}
