import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/ignoreElements';

export function doAction(actionCreator, dispatch) {
    return this
        .map(actionCreator)
        .filter(Boolean)
        ::dispatch()
        .ignoreElements();
}