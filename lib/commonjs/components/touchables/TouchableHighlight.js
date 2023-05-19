"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _GenericTouchable = _interopRequireWildcard(require("./GenericTouchable"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * TouchableHighlight follows RN's implementation
 */
class TouchableHighlight extends React.Component {
  constructor(props) {
    super(props);
    // Copied from RN
    _defineProperty(this, "showUnderlay", () => {
      var _this$props$onShowUnd, _this$props;
      if (!this.hasPressHandler()) {
        return;
      }
      this.setState({
        extraChildStyle: {
          opacity: this.props.activeOpacity
        },
        extraUnderlayStyle: {
          backgroundColor: this.props.underlayColor
        }
      });
      (_this$props$onShowUnd = (_this$props = this.props).onShowUnderlay) === null || _this$props$onShowUnd === void 0 ? void 0 : _this$props$onShowUnd.call(_this$props);
    });
    _defineProperty(this, "hasPressHandler", () => this.props.onPress || this.props.onPressIn || this.props.onPressOut || this.props.onLongPress);
    _defineProperty(this, "hideUnderlay", () => {
      var _this$props$onHideUnd, _this$props2;
      this.setState({
        extraChildStyle: null,
        extraUnderlayStyle: null
      });
      (_this$props$onHideUnd = (_this$props2 = this.props).onHideUnderlay) === null || _this$props$onHideUnd === void 0 ? void 0 : _this$props$onHideUnd.call(_this$props2);
    });
    _defineProperty(this, "onStateChange", (_from, to) => {
      if (to === _GenericTouchable.TOUCHABLE_STATE.BEGAN) {
        this.showUnderlay();
      } else if (to === _GenericTouchable.TOUCHABLE_STATE.UNDETERMINED || to === _GenericTouchable.TOUCHABLE_STATE.MOVED_OUTSIDE) {
        this.hideUnderlay();
      }
    });
    this.state = {
      extraChildStyle: null,
      extraUnderlayStyle: null
    };
  }
  renderChildren() {
    if (!this.props.children) {
      return /*#__PURE__*/React.createElement(_reactNative.View, null);
    }
    const child = React.Children.only(this.props.children); // TODO: not sure if OK but fixes error
    return /*#__PURE__*/React.cloneElement(child, {
      style: _reactNative.StyleSheet.compose(child.props.style, this.state.extraChildStyle)
    });
  }
  render() {
    const {
      style = {},
      ...rest
    } = this.props;
    const {
      extraUnderlayStyle
    } = this.state;
    return /*#__PURE__*/React.createElement(_GenericTouchable.default, _extends({}, rest, {
      style: [style, extraUnderlayStyle],
      onStateChange: this.onStateChange
    }), this.renderChildren());
  }
}
exports.default = TouchableHighlight;
_defineProperty(TouchableHighlight, "defaultProps", {
  ..._GenericTouchable.default.defaultProps,
  activeOpacity: 0.85,
  delayPressOut: 100,
  underlayColor: 'black'
});
//# sourceMappingURL=TouchableHighlight.js.map