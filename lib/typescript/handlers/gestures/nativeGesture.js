import { BaseGesture } from './gesture';
export class NativeGesture extends BaseGesture {
    constructor() {
        super();
        this.config = {};
        this.handlerName = 'NativeViewGestureHandler';
    }
    shouldActivateOnStart(value) {
        this.config.shouldActivateOnStart = value;
        return this;
    }
    disallowInterruption(value) {
        this.config.disallowInterruption = value;
        return this;
    }
}
