import { BaseGesture } from './gesture';
export class FlingGesture extends BaseGesture {
    constructor() {
        super();
        this.config = {};
        this.handlerName = 'FlingGestureHandler';
    }
    numberOfPointers(pointers) {
        this.config.numberOfPointers = pointers;
        return this;
    }
    direction(direction) {
        this.config.direction = direction;
        return this;
    }
}
