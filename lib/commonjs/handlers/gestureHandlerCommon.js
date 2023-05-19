"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baseGestureHandlerWithMonitorProps = exports.baseGestureHandlerProps = void 0;
exports.filterConfig = filterConfig;
exports.findNodeHandle = findNodeHandle;
var _reactNative = require("react-native");
var _handlersRegistry = require("./handlersRegistry");
var _utils = require("../utils");
// Previous types exported gesture handlers as classes which creates an interface and variable, both named the same as class.
// Without those types, we'd introduce breaking change, forcing users to prefix every handler type specification with typeof
// e.g. React.createRef<TapGestureHandler> -> React.createRef<typeof TapGestureHandler>.
// See https://www.typescriptlang.org/docs/handbook/classes.html#constructor-functions for reference.

const commonProps = ['id', 'enabled', 'shouldCancelWhenOutside', 'hitSlop'];
const componentInteractionProps = ['waitFor', 'simultaneousHandlers'];
const baseGestureHandlerProps = [...commonProps, ...componentInteractionProps, 'onBegan', 'onFailed', 'onCancelled', 'onActivated', 'onEnded', 'onGestureEvent', 'onHandlerStateChange'];
exports.baseGestureHandlerProps = baseGestureHandlerProps;
const baseGestureHandlerWithMonitorProps = [...commonProps, 'needsPointerData', 'manualActivation'];

//TODO(TS) events in handlers

// Events payloads are types instead of interfaces due to TS limitation.
// See https://github.com/microsoft/TypeScript/issues/15300 for more info.
exports.baseGestureHandlerWithMonitorProps = baseGestureHandlerWithMonitorProps;
function isConfigParam(param, name) {
  // param !== Object(param) returns false if `param` is a function
  // or an object and returns true if `param` is null
  return param !== undefined && (param !== Object(param) || !('__isNative' in param)) && name !== 'onHandlerStateChange' && name !== 'onGestureEvent';
}
function filterConfig(props, validProps) {
  let defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const filteredConfig = {
    ...defaults
  };
  for (const key of validProps) {
    let value = props[key];
    if (isConfigParam(value, key)) {
      if (key === 'simultaneousHandlers' || key === 'waitFor') {
        value = transformIntoHandlerTags(props[key]);
      } else if (key === 'hitSlop' && typeof value !== 'object') {
        value = {
          top: value,
          left: value,
          bottom: value,
          right: value
        };
      }
      filteredConfig[key] = value;
    }
  }
  return filteredConfig;
}
function transformIntoHandlerTags(handlerIDs) {
  handlerIDs = (0, _utils.toArray)(handlerIDs);
  if (_reactNative.Platform.OS === 'web') {
    return handlerIDs.map(_ref => {
      let {
        current
      } = _ref;
      return current;
    }).filter(handle => handle);
  }
  // converts handler string IDs into their numeric tags
  return handlerIDs.map(handlerID => {
    var _handlerID$current;
    return _handlersRegistry.handlerIDToTag[handlerID] || ((_handlerID$current = handlerID.current) === null || _handlerID$current === void 0 ? void 0 : _handlerID$current.handlerTag) || -1;
  }).filter(handlerTag => handlerTag > 0);
}
function findNodeHandle(node) {
  if (_reactNative.Platform.OS === 'web') return node;
  return (0, _reactNative.findNodeHandle)(node);
}
//# sourceMappingURL=gestureHandlerCommon.js.map