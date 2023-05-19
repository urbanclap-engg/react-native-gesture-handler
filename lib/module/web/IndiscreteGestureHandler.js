import GestureHandler from './GestureHandler';

/**
 * The base class for **Rotation** and **Pinch** gesture handlers.
 */
class IndiscreteGestureHandler extends GestureHandler {
  get shouldEnableGestureOnSetup() {
    return false;
  }
  updateGestureConfig(_ref) {
    let {
      minPointers = 2,
      maxPointers = 2,
      ...props
    } = _ref;
    return super.updateGestureConfig({
      minPointers,
      maxPointers,
      ...props
    });
  }
  isGestureEnabledForEvent(_ref2, _recognizer, _ref3) {
    let {
      minPointers,
      maxPointers
    } = _ref2;
    let {
      maxPointers: pointerLength
    } = _ref3;
    if (pointerLength > maxPointers) {
      return {
        failed: true
      };
    }
    const validPointerCount = pointerLength >= minPointers;
    return {
      success: validPointerCount
    };
  }
}
export default IndiscreteGestureHandler;
//# sourceMappingURL=IndiscreteGestureHandler.js.map