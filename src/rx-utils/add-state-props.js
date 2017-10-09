import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

export function addStateProps(state$, mapStateToProps) {
    return state$
        .map(mapStateToProps)
        .withLatestFrom(this)
        .map(([propsFromState, props]) => ({...props, ...propsFromState}));
}
