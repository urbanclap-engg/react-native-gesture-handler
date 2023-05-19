function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseGesture, Gesture } from './gesture';
function extendRelation(currentRelation, extendWith) {
  if (currentRelation === undefined) {
    return [...extendWith];
  } else {
    return [...currentRelation, ...extendWith];
  }
}
export class ComposedGesture extends Gesture {
  constructor() {
    super();
    _defineProperty(this, "gestures", []);
    _defineProperty(this, "simultaneousGestures", []);
    _defineProperty(this, "requireGesturesToFail", []);
    for (var _len = arguments.length, gestures = new Array(_len), _key = 0; _key < _len; _key++) {
      gestures[_key] = arguments[_key];
    }
    this.gestures = gestures;
  }
  prepareSingleGesture(gesture, simultaneousGestures, requireGesturesToFail) {
    if (gesture instanceof BaseGesture) {
      const newConfig = {
        ...gesture.config
      };
      newConfig.simultaneousWith = extendRelation(newConfig.simultaneousWith, simultaneousGestures);
      newConfig.requireToFail = extendRelation(newConfig.requireToFail, requireGesturesToFail);
      gesture.config = newConfig;
    } else if (gesture instanceof ComposedGesture) {
      gesture.simultaneousGestures = simultaneousGestures;
      gesture.requireGesturesToFail = requireGesturesToFail;
      gesture.prepare();
    }
  }
  prepare() {
    for (const gesture of this.gestures) {
      this.prepareSingleGesture(gesture, this.simultaneousGestures, this.requireGesturesToFail);
    }
  }
  initialize() {
    for (const gesture of this.gestures) {
      gesture.initialize();
    }
  }
  toGestureArray() {
    return this.gestures.flatMap(gesture => gesture.toGestureArray());
  }
}
export class SimultaneousGesture extends ComposedGesture {
  prepare() {
    const simultaneousArray = this.gestures.flatMap(gesture => gesture.toGestureArray()).concat(this.simultaneousGestures);
    for (const gesture of this.gestures) {
      this.prepareSingleGesture(gesture, simultaneousArray, this.requireGesturesToFail);
    }
  }
}
export class ExclusiveGesture extends ComposedGesture {
  prepare() {
    const gestureArrays = this.gestures.map(gesture => gesture.toGestureArray());
    let requireToFail = [];
    for (let i = 0; i < this.gestures.length; i++) {
      this.prepareSingleGesture(this.gestures[i], this.simultaneousGestures, this.requireGesturesToFail.concat(requireToFail));
      requireToFail = requireToFail.concat(gestureArrays[i]);
    }
  }
}
//# sourceMappingURL=gestureComposition.js.map