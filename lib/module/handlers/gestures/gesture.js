function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { getNextHandlerTag } from '../handlersRegistry';

// allow adding a ref to a gesture handler

export const CALLBACK_TYPE = {
  UNDEFINED: 0,
  BEGAN: 1,
  START: 2,
  UPDATE: 3,
  CHANGE: 4,
  END: 5,
  FINALIZE: 6,
  TOUCHES_DOWN: 7,
  TOUCHES_MOVE: 8,
  TOUCHES_UP: 9,
  TOUCHES_CANCELLED: 10
};

// Allow using CALLBACK_TYPE as object and type
// eslint-disable-next-line @typescript-eslint/no-redeclare
export class Gesture {}
export class BaseGesture extends Gesture {
  constructor() {
    super(...arguments);
    _defineProperty(this, "handlerTag", -1);
    _defineProperty(this, "handlerName", '');
    _defineProperty(this, "config", {});
    _defineProperty(this, "handlers", {
      handlerTag: -1,
      isWorklet: [false, false, false, false]
    });
  }
  addDependency(key, gesture) {
    const value = this.config[key];
    this.config[key] = value ? Array().concat(value, gesture) : [gesture];
  }
  withRef(ref) {
    this.config.ref = ref;
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  isWorklet(callback) {
    //@ts-ignore if callback is a worklet, the property will be available, if not then the check will return false
    return callback.__workletHash !== undefined;
  }
  onBegin(callback) {
    this.handlers.onBegin = callback;
    this.handlers.isWorklet[CALLBACK_TYPE.BEGAN] = this.isWorklet(callback);
    return this;
  }
  onStart(callback) {
    this.handlers.onStart = callback;
    this.handlers.isWorklet[CALLBACK_TYPE.START] = this.isWorklet(callback);
    return this;
  }
  onEnd(callback) {
    this.handlers.onEnd = callback;
    //@ts-ignore if callback is a worklet, the property will be available, if not then the check will return false
    this.handlers.isWorklet[CALLBACK_TYPE.END] = this.isWorklet(callback);
    return this;
  }
  onFinalize(callback) {
    this.handlers.onFinalize = callback;
    //@ts-ignore if callback is a worklet, the property will be available, if not then the check will return false
    this.handlers.isWorklet[CALLBACK_TYPE.FINALIZE] = this.isWorklet(callback);
    return this;
  }
  onTouchesDown(callback) {
    this.config.needsPointerData = true;
    this.handlers.onTouchesDown = callback;
    this.handlers.isWorklet[CALLBACK_TYPE.TOUCHES_DOWN] = this.isWorklet(callback);
    return this;
  }
  onTouchesMove(callback) {
    this.config.needsPointerData = true;
    this.handlers.onTouchesMove = callback;
    this.handlers.isWorklet[CALLBACK_TYPE.TOUCHES_MOVE] = this.isWorklet(callback);
    return this;
  }
  onTouchesUp(callback) {
    this.config.needsPointerData = true;
    this.handlers.onTouchesUp = callback;
    this.handlers.isWorklet[CALLBACK_TYPE.TOUCHES_UP] = this.isWorklet(callback);
    return this;
  }
  onTouchesCancelled(callback) {
    this.config.needsPointerData = true;
    this.handlers.onTouchesCancelled = callback;
    this.handlers.isWorklet[CALLBACK_TYPE.TOUCHES_CANCELLED] = this.isWorklet(callback);
    return this;
  }
  enabled(enabled) {
    this.config.enabled = enabled;
    return this;
  }
  shouldCancelWhenOutside(value) {
    this.config.shouldCancelWhenOutside = value;
    return this;
  }
  hitSlop(hitSlop) {
    this.config.hitSlop = hitSlop;
    return this;
  }
  simultaneousWithExternalGesture() {
    for (var _len = arguments.length, gestures = new Array(_len), _key = 0; _key < _len; _key++) {
      gestures[_key] = arguments[_key];
    }
    for (const gesture of gestures) {
      this.addDependency('simultaneousWith', gesture);
    }
    return this;
  }
  requireExternalGestureToFail() {
    for (var _len2 = arguments.length, gestures = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      gestures[_key2] = arguments[_key2];
    }
    for (const gesture of gestures) {
      this.addDependency('requireToFail', gesture);
    }
    return this;
  }
  initialize() {
    this.handlerTag = getNextHandlerTag();
    this.handlers = {
      ...this.handlers,
      handlerTag: this.handlerTag
    };
    if (this.config.ref) {
      this.config.ref.current = this;
    }
  }
  toGestureArray() {
    return [this];
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  prepare() {}
}
export class ContinousBaseGesture extends BaseGesture {
  onUpdate(callback) {
    this.handlers.onUpdate = callback;
    this.handlers.isWorklet[CALLBACK_TYPE.UPDATE] = this.isWorklet(callback);
    return this;
  }
  onChange(callback) {
    this.handlers.onChange = callback;
    this.handlers.isWorklet[CALLBACK_TYPE.CHANGE] = this.isWorklet(callback);
    return this;
  }
  manualActivation(manualActivation) {
    this.config.manualActivation = manualActivation;
    return this;
  }
}
//# sourceMappingURL=gesture.js.map