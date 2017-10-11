import 'rxjs/add/operator/map';
import {get} from 'lodash';
import {stepBack} from './step-back';

export function pluckPrev(propName, defaultValue) {
    return this
        ::stepBack()
        .map(props => get(props, propName, defaultValue));
}
