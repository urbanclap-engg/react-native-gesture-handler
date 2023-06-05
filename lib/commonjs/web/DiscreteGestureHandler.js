"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _GestureHandler = _interopRequireDefault(require("./GestureHandler"));
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

class DiscreteGestureHandler extends _GestureHandler.default {
  get isDiscrete() {
    return true;
  }
  get shouldEnableGestureOnSetup() {
    return true;
  }
  shouldFailUnderCustomCriteria(_ref, _ref2) {
    let {
      x,
      y,
      deltaX,
      deltaY
    } = _ref;
    let {
      maxDeltaX,
      maxDeltaY,
      maxDistSq,
      shouldCancelWhenOutside
    } = _ref2;
    if (shouldCancelWhenOutside) {
      if (!this.isPointInView({
        x,
        y
      })) {
        return true;
      }
    }
    return (0, _utils.TEST_MAX_IF_NOT_NAN)(Math.abs(deltaX), maxDeltaX) || (0, _utils.TEST_MAX_IF_NOT_NAN)(Math.abs(deltaY), maxDeltaY) || (0, _utils.TEST_MAX_IF_NOT_NAN)(Math.abs(deltaY * deltaY + deltaX * deltaX), maxDistSq);
  }
  transformNativeEvent(_ref3) {
    let {
      center: {
        x,
        y
      }
    } = _ref3;
    // @ts-ignore FIXME(TS)
    const rect = this.view.getBoundingClientRect();
    return {
      absoluteX: x,
      absoluteY: y,
      x: x - rect.left,
      y: y - rect.top
    };
  }
  isGestureEnabledForEvent(_ref4, _recognizer, _ref5) {
    let {
      minPointers,
      maxPointers,
      maxDeltaX,
      maxDeltaY,
      maxDistSq,
      shouldCancelWhenOutside
    } = _ref4;
    let {
      maxPointers: pointerLength,
      center,
      deltaX,
      deltaY
    } = _ref5;
    const validPointerCount = pointerLength >= minPointers && pointerLength <= maxPointers;
    if (this.shouldFailUnderCustomCriteria({
      ...center,
      deltaX,
      deltaY
    }, {
      maxDeltaX,
      maxDeltaY,
      maxDistSq,
      shouldCancelWhenOutside
    }) ||
    // A user probably won't land a multi-pointer tap on the first tick (so we cannot just cancel each time)
    // but if the gesture is running and the user adds or subtracts another pointer then it should fail.
    !validPointerCount && this.isGestureRunning) {
      return {
        failed: true
      };
    }
    return {
      success: validPointerCount
    };
  }
}
var _default = DiscreteGestureHandler;
exports.default = _default;
//# sourceMappingURL=DiscreteGestureHandler.js.map