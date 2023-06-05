import * as React from 'react';
import { requireNativeComponent } from 'react-native';
const GestureHandlerRootViewNative = requireNativeComponent('GestureHandlerRootView');
export default function GestureHandlerRootView(_ref) {
  let {
    children,
    ...rest
  } = _ref;
  return /*#__PURE__*/React.createElement(GestureHandlerRootViewNative, rest, children);
}
//# sourceMappingURL=GestureHandlerRootView.android.js.map