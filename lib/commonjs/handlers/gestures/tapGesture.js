"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TapGesture = void 0;
var _gesture = require("./gesture");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class TapGesture extends _gesture.BaseGesture {
  constructor() {
    super();
    _defineProperty(this, "config", {});
    this.handlerName = 'TapGestureHandler';
  }
  minPointers(minPointers) {
    this.config.minPointers = minPointers;
    return this;
  }
  numberOfTaps(count) {
    this.config.numberOfTaps = count;
    return this;
  }
  maxDistance(maxDist) {
    this.config.maxDist = maxDist;
    return this;
  }
  maxDuration(duration) {
    this.config.maxDurationMs = duration;
    return this;
  }
  maxDelay(delay) {
    this.config.maxDelayMs = delay;
    return this;
  }
  maxDeltaX(delta) {
    this.config.maxDeltaX = delta;
    return this;
  }
  maxDeltaY(delta) {
    this.config.maxDeltaY = delta;
    return this;
  }
}
exports.TapGesture = TapGesture;
//# sourceMappingURL=tapGesture.js.map