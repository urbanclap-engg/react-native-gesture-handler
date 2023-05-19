import { FlingGesture } from './flingGesture';
import { ForceTouchGesture } from './forceTouchGesture';
import { ComposedGesture, ExclusiveGesture, SimultaneousGesture } from './gestureComposition';
import { LongPressGesture } from './longPressGesture';
import { PanGesture } from './panGesture';
import { PinchGesture } from './pinchGesture';
import { RotationGesture } from './rotationGesture';
import { TapGesture } from './tapGesture';
import { NativeGesture } from './nativeGesture';
import { ManualGesture } from './manualGesture';
export const GestureObjects = {
  Tap: () => {
    return new TapGesture();
  },
  Pan: () => {
    return new PanGesture();
  },
  Pinch: () => {
    return new PinchGesture();
  },
  Rotation: () => {
    return new RotationGesture();
  },
  Fling: () => {
    return new FlingGesture();
  },
  LongPress: () => {
    return new LongPressGesture();
  },
  ForceTouch: () => {
    return new ForceTouchGesture();
  },
  Native: () => {
    return new NativeGesture();
  },
  Manual: () => {
    return new ManualGesture();
  },
  /**
   * Builds a composed gesture consisting of gestures provided as parameters.
   * The first one that becomes active cancels the rest of gestures.
   */
  Race: function () {
    for (var _len = arguments.length, gestures = new Array(_len), _key = 0; _key < _len; _key++) {
      gestures[_key] = arguments[_key];
    }
    return new ComposedGesture(...gestures);
  },
  /**
   * Builds a composed gesture that allows all base gestures to run simultaneously.
   */
  Simultaneous() {
    for (var _len2 = arguments.length, gestures = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      gestures[_key2] = arguments[_key2];
    }
    return new SimultaneousGesture(...gestures);
  },
  /**
   * Builds a composed gesture where only one of the provided gestures can become active.
   * Priority is decided through the order of gestures: the first one has higher priority
   * than the second one, second one has higher priority than the third one, and so on.
   * For example, to make a gesture that recognizes both single and double tap you need
   * to call Exclusive(doubleTap, singleTap).
   */
  Exclusive() {
    for (var _len3 = arguments.length, gestures = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      gestures[_key3] = arguments[_key3];
    }
    return new ExclusiveGesture(...gestures);
  }
};
//# sourceMappingURL=gestureObjects.js.map