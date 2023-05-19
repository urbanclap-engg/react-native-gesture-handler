"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var React = _interopRequireWildcard(require("react"));
var _GenericTouchable = _interopRequireDefault(require("./GenericTouchable"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * TouchableNativeFeedback behaves slightly different than RN's TouchableNativeFeedback.
 * There's small difference with handling long press ripple since RN's implementation calls
 * ripple animation via bridge. This solution leaves all animations' handling for native components so
 * it follows native behaviours.
 */
class TouchableNativeFeedback extends React.Component {
  getExtraButtonProps() {
    const extraProps = {};
    const {
      background
    } = this.props;
    if (background) {
      // I changed type values to match those used in RN
      // TODO(TS): check if it works the same as previous implementation - looks like it works the same as RN component, so it should be ok
      if (background.type === 'RippleAndroid') {
        extraProps['borderless'] = background.borderless;
        extraProps['rippleColor'] = background.color;
      } else if (background.type === 'ThemeAttrAndroid') {
        extraProps['borderless'] = background.attribute === 'selectableItemBackgroundBorderless';
      }
      // I moved it from above since it should be available in all options
      extraProps['rippleRadius'] = background.rippleRadius;
    }
    extraProps['foreground'] = this.props.useForeground;
    return extraProps;
  }
  render() {
    const {
      style = {},
      ...rest
    } = this.props;
    return /*#__PURE__*/React.createElement(_GenericTouchable.default, _extends({}, rest, {
      style: style,
      extraButtonProps: this.getExtraButtonProps()
    }));
  }
}
exports.default = TouchableNativeFeedback;
_defineProperty(TouchableNativeFeedback, "defaultProps", {
  ..._GenericTouchable.default.defaultProps,
  useForeground: true,
  extraButtonProps: {
    // Disable hiding ripple on Android
    rippleColor: null
  }
});
// could be taken as RNTouchableNativeFeedback.SelectableBackground etc. but the API may change
_defineProperty(TouchableNativeFeedback, "SelectableBackground", rippleRadius => ({
  type: 'ThemeAttrAndroid',
  // I added `attribute` prop to clone the implementation of RN and be able to use only 2 types
  attribute: 'selectableItemBackground',
  rippleRadius
}));
_defineProperty(TouchableNativeFeedback, "SelectableBackgroundBorderless", rippleRadius => ({
  type: 'ThemeAttrAndroid',
  attribute: 'selectableItemBackgroundBorderless',
  rippleRadius
}));
_defineProperty(TouchableNativeFeedback, "Ripple", (color, borderless, rippleRadius) => ({
  type: 'RippleAndroid',
  color,
  borderless,
  rippleRadius
}));
_defineProperty(TouchableNativeFeedback, "canUseNativeForeground", () => _reactNative.Platform.Version >= 23);
//# sourceMappingURL=TouchableNativeFeedback.android.js.map