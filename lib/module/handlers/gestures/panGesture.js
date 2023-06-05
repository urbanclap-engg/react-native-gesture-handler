function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { ContinousBaseGesture } from './gesture';
function changeEventCalculator(current, previous) {
  'worklet';

  let changePayload;
  if (previous === undefined) {
    changePayload = {
      changeX: current.translationX,
      changeY: current.translationY
    };
  } else {
    changePayload = {
      changeX: current.translationX - previous.translationX,
      changeY: current.translationY - previous.translationY
    };
  }
  return {
    ...current,
    ...changePayload
  };
}
export class PanGesture extends ContinousBaseGesture {
  constructor() {
    super();
    _defineProperty(this, "config", {});
    this.handlerName = 'PanGestureHandler';
  }
  activeOffsetY(offset) {
    if (Array.isArray(offset)) {
      this.config.activeOffsetYStart = offset[0];
      this.config.activeOffsetYEnd = offset[1];
    } else if (offset < 0) {
      this.config.activeOffsetYStart = offset;
    } else {
      this.config.activeOffsetYEnd = offset;
    }
    return this;
  }
  activeOffsetX(offset) {
    if (Array.isArray(offset)) {
      this.config.activeOffsetXStart = offset[0];
      this.config.activeOffsetXEnd = offset[1];
    } else if (offset < 0) {
      this.config.activeOffsetXStart = offset;
    } else {
      this.config.activeOffsetXEnd = offset;
    }
    return this;
  }
  failOffsetY(offset) {
    if (Array.isArray(offset)) {
      this.config.failOffsetYStart = offset[0];
      this.config.failOffsetYEnd = offset[1];
    } else if (offset < 0) {
      this.config.failOffsetYStart = offset;
    } else {
      this.config.failOffsetYEnd = offset;
    }
    return this;
  }
  failOffsetX(offset) {
    if (Array.isArray(offset)) {
      this.config.failOffsetXStart = offset[0];
      this.config.failOffsetXEnd = offset[1];
    } else if (offset < 0) {
      this.config.failOffsetXStart = offset;
    } else {
      this.config.failOffsetXEnd = offset;
    }
    return this;
  }
  minPointers(minPointers) {
    this.config.minPointers = minPointers;
    return this;
  }
  maxPointers(maxPointers) {
    this.config.maxPointers = maxPointers;
    return this;
  }
  minDistance(distance) {
    this.config.minDist = distance;
    return this;
  }
  minVelocity(velocity) {
    this.config.minVelocity = velocity;
    return this;
  }
  minVelocityX(velocity) {
    this.config.minVelocityX = velocity;
    return this;
  }
  minVelocityY(velocity) {
    this.config.minVelocityY = velocity;
    return this;
  }
  averageTouches(value) {
    this.config.avgTouches = value;
    return this;
  }
  enableTrackpadTwoFingerGesture(value) {
    this.config.enableTrackpadTwoFingerGesture = value;
    return this;
  }
  onChange(callback) {
    // @ts-ignore TS being overprotective, PanGestureHandlerEventPayload is Record
    this.handlers.changeEventCalculator = changeEventCalculator;
    return super.onChange(callback);
  }
}
//# sourceMappingURL=panGesture.js.map