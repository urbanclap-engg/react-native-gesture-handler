import Hammer from '@egjs/hammerjs';
import IndiscreteGestureHandler from './IndiscreteGestureHandler';
class PinchGestureHandler extends IndiscreteGestureHandler {
  get name() {
    return 'pinch';
  }
  get NativeGestureClass() {
    return Hammer.Pinch;
  }
  transformNativeEvent(_ref) {
    let {
      scale,
      velocity,
      center
    } = _ref;
    return {
      focalX: center.x,
      focalY: center.y,
      velocity,
      scale
    };
  }
}
export default PinchGestureHandler;
//# sourceMappingURL=PinchGestureHandler.js.map