import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/pluck';

export function stepBack() {
    return this.scan(
        ({prev, curr}, value) => ({prev: curr, curr: value})
    ).pluck('prev');
}
