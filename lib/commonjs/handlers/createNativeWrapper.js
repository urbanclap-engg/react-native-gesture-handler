"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createNativeWrapper;
var React = _interopRequireWildcard(require("react"));
var _NativeViewGestureHandler = require("./NativeViewGestureHandler");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/*
 * This array should consist of:
 *   - All keys in propTypes from NativeGestureHandler
 *     (and all keys in GestureHandlerPropTypes)
 *   - 'onGestureHandlerEvent'
 *   - 'onGestureHandlerStateChange'
 */
const NATIVE_WRAPPER_PROPS_FILTER = [..._NativeViewGestureHandler.nativeViewProps, 'onGestureHandlerEvent', 'onGestureHandlerStateChange'];
function createNativeWrapper(Component) {
  let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const ComponentWrapper = /*#__PURE__*/React.forwardRef((props, ref) => {
    // filter out props that should be passed to gesture handler wrapper
    const gestureHandlerProps = Object.keys(props).reduce((res, key) => {
      // TS being overly protective with it's types, see https://github.com/microsoft/TypeScript/issues/26255#issuecomment-458013731 for more info
      const allowedKeys = NATIVE_WRAPPER_PROPS_FILTER;
      if (allowedKeys.includes(key)) {
        // @ts-ignore FIXME(TS)
        res[key] = props[key];
      }
      return res;
    }, {
      ...config
    } // watch out not to modify config
    );

    const _ref = (0, React.useRef)();
    const _gestureHandlerRef = (0, React.useRef)();
    (0, React.useImperativeHandle)(ref,
    // @ts-ignore TODO(TS) decide how nulls work in this context
    () => {
      const node = _gestureHandlerRef.current;
      // add handlerTag for relations config
      if (_ref.current && node) {
        // @ts-ignore FIXME(TS) think about createHandler return type
        _ref.current.handlerTag = node.handlerTag;
        return _ref.current;
      }
      return null;
    }, [_ref, _gestureHandlerRef]);
    return /*#__PURE__*/React.createElement(_NativeViewGestureHandler.NativeViewGestureHandler, _extends({}, gestureHandlerProps, {
      // @ts-ignore TODO(TS)
      ref: _gestureHandlerRef
    }), /*#__PURE__*/React.createElement(Component, _extends({}, props, {
      ref: _ref
    })));
  });
  ComponentWrapper.displayName = Component.displayName || 'ComponentWrapper';
  return ComponentWrapper;
}
//# sourceMappingURL=createNativeWrapper.js.map