/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import GestureHandler from './GestureHandler';
import { PixelRatio } from 'react-native';
class DraggingGestureHandler extends GestureHandler {
  get shouldEnableGestureOnSetup() {
    return true;
  }
  transformNativeEvent(_ref) {
    let {
      deltaX,
      deltaY,
      velocityX,
      velocityY,
      center: {
        x,
        y
      }
    } = _ref;
    // @ts-ignore FIXME(TS)
    const rect = this.view.getBoundingClientRect();
    const ratio = PixelRatio.get();
    return {
      translationX: deltaX - (this.__initialX || 0),
      translationY: deltaY - (this.__initialY || 0),
      absoluteX: x,
      absoluteY: y,
      velocityX: velocityX * ratio,
      velocityY: velocityY * ratio,
      x: x - rect.left,
      y: y - rect.top
    };
  }
}
export default DraggingGestureHandler;
//# sourceMappingURL=DraggingGestureHandler.js.map