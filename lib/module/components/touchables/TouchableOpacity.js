function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { Animated, Easing, StyleSheet, View } from 'react-native';
import GenericTouchable, { TOUCHABLE_STATE } from './GenericTouchable';
import * as React from 'react';
import { Component } from 'react';

/**
 * TouchableOpacity bases on timing animation which has been used in RN's core
 */
export default class TouchableOpacity extends Component {
  constructor() {
    super(...arguments);
    // opacity is 1 one by default but could be overwritten
    _defineProperty(this, "getChildStyleOpacityWithDefault", () => {
      const childStyle = StyleSheet.flatten(this.props.style) || {};
      return childStyle.opacity == null ? 1 : childStyle.opacity;
    });
    _defineProperty(this, "opacity", new Animated.Value(this.getChildStyleOpacityWithDefault()));
    _defineProperty(this, "setOpacityTo", (value, duration) => {
      Animated.timing(this.opacity, {
        toValue: value,
        duration: duration,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: false
      }).start();
    });
    _defineProperty(this, "onStateChange", (_from, to) => {
      if (to === TOUCHABLE_STATE.BEGAN) {
        this.setOpacityTo(this.props.activeOpacity, 0);
      } else if (to === TOUCHABLE_STATE.UNDETERMINED || to === TOUCHABLE_STATE.MOVED_OUTSIDE) {
        this.setOpacityTo(this.getChildStyleOpacityWithDefault(), 150);
      }
    });
  }
  render() {
    const {
      style = {},
      ...rest
    } = this.props;
    return /*#__PURE__*/React.createElement(GenericTouchable, _extends({}, rest, {
      style: [style, {
        opacity: this.opacity // TODO: fix this
      }],

      onStateChange: this.onStateChange
    }), this.props.children ? this.props.children : /*#__PURE__*/React.createElement(View, null));
  }
}
_defineProperty(TouchableOpacity, "defaultProps", {
  ...GenericTouchable.defaultProps,
  activeOpacity: 0.2
});
//# sourceMappingURL=TouchableOpacity.js.map