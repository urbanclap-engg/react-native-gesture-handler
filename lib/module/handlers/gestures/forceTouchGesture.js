function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { ContinousBaseGesture } from './gesture';
function changeEventCalculator(current, previous) {
  'worklet';

  let changePayload;
  if (previous === undefined) {
    changePayload = {
      forceChange: current.force
    };
  } else {
    changePayload = {
      forceChange: current.force - previous.force
    };
  }
  return {
    ...current,
    ...changePayload
  };
}
export class ForceTouchGesture extends ContinousBaseGesture {
  constructor() {
    super();
    _defineProperty(this, "config", {});
    this.handlerName = 'ForceTouchGestureHandler';
  }
  minForce(force) {
    this.config.minForce = force;
    return this;
  }
  maxForce(force) {
    this.config.maxForce = force;
    return this;
  }
  feedbackOnActivation(value) {
    this.config.feedbackOnActivation = value;
    return this;
  }
  onChange(callback) {
    // @ts-ignore TS being overprotective, ForceTouchGestureHandlerEventPayload is Record
    this.handlers.changeEventCalculator = changeEventCalculator;
    return super.onChange(callback);
  }
}
//# sourceMappingURL=forceTouchGesture.js.map