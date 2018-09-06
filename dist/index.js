(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["library"] = factory();
	else
		root["library"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 138);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(139);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closest = exports.distance = exports.patch = exports.absolute = exports.negate = exports.isEqual = exports.subtract = exports.add = undefined;

var _toConsumableArray2 = __webpack_require__(47);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = __webpack_require__(9);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var add = exports.add = function add(point1, point2) {
  return {
    x: point1.x + point2.x,
    y: point1.y + point2.y
  };
};

var subtract = exports.subtract = function subtract(point1, point2) {
  return {
    x: point1.x - point2.x,
    y: point1.y - point2.y
  };
};

var isEqual = exports.isEqual = function isEqual(point1, point2) {
  return point1.x === point2.x && point1.y === point2.y;
};

var negate = exports.negate = function negate(point) {
  return {
    x: point.x !== 0 ? -point.x : 0,
    y: point.y !== 0 ? -point.y : 0
  };
};

var absolute = exports.absolute = function absolute(point) {
  return {
    x: Math.abs(point.x),
    y: Math.abs(point.y)
  };
};

var patch = exports.patch = function patch(line, value) {
  var _ref;

  var otherValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return _ref = {}, (0, _defineProperty3.default)(_ref, line, value), (0, _defineProperty3.default)(_ref, line === 'x' ? 'y' : 'x', otherValue), _ref;
};

var distance = exports.distance = function distance(point1, point2) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
};

var closest = exports.closest = function closest(target, points) {
  return Math.min.apply(Math, (0, _toConsumableArray3.default)(points.map(function (point) {
    return distance(target, point);
  })));
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (resultFn) {
  var isEqual = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : simpleIsEqual;

  var lastThis = void 0;
  var lastArgs = [];
  var lastResult = void 0;
  var calledOnce = false;

  var isNewArgEqualToLast = function isNewArgEqualToLast(newArg, index) {
    return isEqual(newArg, lastArgs[index]);
  };

  var result = function result() {
    for (var _len = arguments.length, newArgs = Array(_len), _key = 0; _key < _len; _key++) {
      newArgs[_key] = arguments[_key];
    }

    if (calledOnce && lastThis === this && newArgs.length === lastArgs.length && newArgs.every(isNewArgEqualToLast)) {
      return lastResult;
    }

    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    lastResult = resultFn.apply(this, newArgs);
    return lastResult;
  };

  return result;
};

var simpleIsEqual = function simpleIsEqual(a, b) {
  return a === b;
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(96)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(195)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(62)('wks');
var uid = __webpack_require__(45);
var Symbol = __webpack_require__(11).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(42);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(104);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(11);
var core = __webpack_require__(4);
var ctx = __webpack_require__(58);
var hide = __webpack_require__(27);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(28);
var IE8_DOM_DEFINE = __webpack_require__(105);
var toPrimitive = __webpack_require__(59);
var dP = Object.defineProperty;

exports.f = __webpack_require__(22) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(164), __esModule: true };

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(104);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(63);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(188);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(192);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(63);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(214), __esModule: true };

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getArea = __webpack_require__(31);

var _getArea2 = _interopRequireDefault(_getArea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var top = window.pageYOffset;
  var left = window.pageXOffset;
  var width = window.innerWidth;
  var height = window.innerHeight;

  var right = left + width;
  var bottom = top + height;

  return (0, _getArea2.default)({
    top: top, left: left, right: right, bottom: bottom
  });
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var prefix = function prefix(key) {
  return 'private-react-beautiful-dnd-key-do-not-use-' + key;
};

var storeKey = exports.storeKey = prefix('store');
var droppableIdKey = exports.droppableIdKey = prefix('droppable-id');
var dimensionMarshalKey = exports.dimensionMarshalKey = prefix('dimension-marshal');
var styleContextKey = exports.styleContextKey = prefix('style-context');
var canLiftContextKey = exports.canLiftContextKey = prefix('can-lift');

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _assign = __webpack_require__(34);

var ReactCurrentOwner = __webpack_require__(44);

var warning = __webpack_require__(8);
var canDefineProperty = __webpack_require__(43);
var hasOwnProperty = Object.prototype.hasOwnProperty;

var REACT_ELEMENT_TYPE = __webpack_require__(93);

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown, specialPropRefWarningShown;

function hasValidRef(config) {
  if (process.env.NODE_ENV !== 'production') {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  if (process.env.NODE_ENV !== 'production') {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  if (process.env.NODE_ENV !== 'production') {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    if (canDefineProperty) {
      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });
      // self and source are DEV only properties.
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      });
      // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.
      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });
    } else {
      element._store.validated = false;
      element._self = self;
      element._source = source;
    }
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if (process.env.NODE_ENV !== 'production') {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
 */
ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
};

module.exports = ReactElement;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(29)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 23 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(216);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FinsembleFontIcon_FinsembleFontIcon__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FinsembleButtonLabel_FinsembleButtonLabel__ = __webpack_require__(97);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/

/**
 * A Button Consists of a Title and/or an Icon and a tooltip.
 */





//Default to giving every button a pointer cursor.
const styles = {
	cursor: 'pointer'
};

//The specific buttonTypes we'll apply CSS classes for.
const classMap = {
	MenuItemLabel: 'menu-item-label',
	MenuItemActions: 'menu-item-actions',
	Toolbar: 'finsemble-toolbar-button',
	Dialog: 'fsbl-button'
};
/**
 * Used for menuLauncher buttons. This gets us the position relative to the current monitor, so we know where where the user can click and cause a blur. If the user clicks outside of the button's bounding box, we blur the menu. A subsequent click will open the menu. If the user clicks the button to open the menu, then clicks the button again, we blur the menu, and the next click will not open the menu. This prevents a spastic, blinking menu when the user clicks it twice.
 *
 * @param {any} domElementClientRect
 * @returns
 */
function BoundingBoxRelativeToWindow(domElementClientRect) {
	function promiseResolver(resolve, reject) {
		finsembleWindow.getBounds((err, bounds) => {
			let boundingBox = {
				top: bounds.top - domElementClientRect.top,
				left: bounds.left + domElementClientRect.left,
				width: domElementClientRect.width,
				height: domElementClientRect.height
			};

			boundingBox.right = boundingBox.left + boundingBox.width;
			boundingBox.bottom = boundingBox.top + boundingBox.height;
			resolve(boundingBox);
		});
	}
	return new Promise(promiseResolver);
}

/**
 * The building block for most of our toolbar and menu buttons.
 *
 * @class Button
 * @extends {React.Component}
* */
class Button extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
	constructor(props) {
		super(props);
		//Necessary to bind the correct _this_ to methods on the class.
		this.bindCorrectContext();
		this.finWindow = fin.desktop.Window.getCurrent();
		//Used by menuLaunchers. see `this.launchMenu` for more.

		this.openMenuOnClick = true;
		var types = this.props.buttonType || [];
		//coerce to array.
		if (typeof types === 'string') {
			types = [types];
		}

		this.state = {
			types: types
		};
	}

	/**
  * Ensures that the `this` is correct when the functions below are invoked.
  *
  * @memberof Button
  */
	bindCorrectContext() {
		this.launchMenu = this.launchMenu.bind(this);
		this.launchComponent = this.launchComponent.bind(this);
		this.validateProps = this.validateProps.bind(this);
		this.spawnMenu = this.spawnMenu.bind(this);
	}

	/**
  * Helper to validate properties and to throw errors if they're missing.
  *
  * @param {any} propName
  * @memberof Button
  */
	validateProp(propName) {
		if (typeof this.props[propName] === 'undefined') {
			throw new Error(`Missing Requeired Prop on FinsembleButton: ${propName}`);
		}
	}
	/**
  * Loops through and calls validateProp.
  *
  * @param {any} arr
  * @memberof Button
  */
	validateProps(arr) {
		arr.forEach(propName => {
			this.validateProp(propName);
		});
	}
	/**
  * Handles all of the logic for menuLaunching.
  *
  * 1. User clicks button; we open the menu below the button. We add a listener on blur. When the window blurs, we check to see if the user clicked our button again. Blur happens in the menu before the click will happen in the button.
  * 2a. User clicks the button again. We hide menu and invalidate the next button click, so that the menu will not open twice. This allows the button to open _and_ close the menu.
  * 2b. User clicks outside of the button. We hide the menu. Next click will open the menu.
  *
  * @param {any} e Click event.
  * @memberof Button
  */
	launchMenu(e) {
		//If the click action has been invalidated (because the user clicked the menu Launcher while the menu was open), we allow subsequent clicks to open the menu.
		if (!this.openMenuOnClick) {
			this.openMenuOnClick = true;
			return;
		}
		let self = this;
		//Params for the dialogManager.
		let params = {
			monitor: 'mine',
			position: 'relative',
			left: e.currentTarget.getBoundingClientRect().left,
			forceOntoMonitor: true,
			top: 'adjacent',
			spawnIfNotFound: true
		};
		//gets the parent button wrapper.
		let DOM = e.target.parentElement;

		/**
   * When the menu is shown, we add a blur event handler. This allows us to figure out if the user is trying to close the menu by clicking the button a 2nd time, or if they're trying to open the menu on the first click.
   * @param {*} shownErr
   * @param {*} shownResponse
   */
		var onMenuShown = function (shownErr, shownResponse) {
			if (shownResponse) {
				let onMenuBlurred = (() => {
					var _ref = _asyncToGenerator(function* (blurErr, blurResponse) {
						//On blur, check the mouse position. If click was inside of the button, we invalidate the click event that will be coming soon.
						let clientRect = DOM.getBoundingClientRect();
						let boundingBox = yield new BoundingBoxRelativeToWindow(clientRect);
						//Assumption is that the blur happened elsewhere. If the blur happened on the button, we don't want to open the menu on click.
						let openMenuOnClick = true;
						fin.desktop.System.getMousePosition(function (position) {
							//If the click was inside of the opening button's bounding rectangle, don't hide.
							if (position.left > boundingBox.left && position.left < boundingBox.right && position.top < boundingBox.bottom && position.top > boundingBox.top) {
								openMenuOnClick = false;
							}

							self.openMenuOnClick = openMenuOnClick;
							console.log('LaunchMenu Post Blur', self.openMenuOnClick, boundingBox, position);
						});
						finWindow.removeEventListener('blurred', onMenuBlurred);
					});

					return function onMenuBlurred(_x, _x2) {
						return _ref.apply(this, arguments);
					};
				})();

				let finWindow = shownResponse.finWindow;
				;
				finWindow.addEventListener('blurred', onMenuBlurred);

				//Our appLauncher is listening on this channel for items to populate it.
				//@todo move this into the AppLauncherButton code.
				FSBL.Clients.RouterClient.publish(`${finWindow.name}.ComponentsToRender`, self.props.customData);
			}
		};

		//Display the menu.
		let windowName;
		if (self.props.menuWindowName) {
			windowName = self.props.menuWindowName;
		} else {
			windowName = self.props.menuType + (self.props.label ? self.props.label : self.props.tooltip ? self.props.tooltip : '');
		}

		FSBL.Clients.LauncherClient.showWindow({
			windowName: windowName,
			componentType: self.props.menuType
		}, params, onMenuShown);
	}

	launchComponent(e) {
		let params = { addToWorkspace: true, monitor: 'mine' };
		if (this.props.params) {
			params = this.props.params;
		}
		if (e.shiftKey) {
			FSBL.Clients.LauncherClient.bringWindowsToFront({ componentType: this.props.component });
		} else {
			FSBL.Clients.LauncherClient.spawn(this.props.component, params);
		}
	}

	/**
  * Helper to console.warn.
  *
  * @param {string} msg
  * @memberof Button
  */
	warn(msg) {
		console.warn(msg);
	}
	/**
  * Warns that no
  */
	warnNoClick() {
		this.warn('No onclick property passed to the Finsemble Button component.');
	}

	/**
  * Spawns menus
  * @param {*} cb
  */
	spawnMenu(cb) {
		let self = this;
		let windowName;
		if (this.props.menuWindowName) {
			windowName = this.props.menuWindowName;
		} else {
			windowName = this.props.menuType + (this.props.label ? this.props.label : this.props.tooltip ? this.props.tooltip : '');
		}
		const COMPONENT_UPDATE_CHANNEL = `${windowName}.ComponentsToRender`;

		FSBL.Clients.LauncherClient.showWindow({
			windowName: windowName,
			componentType: this.props.menuType
		}, {
			spawnIfNotFound: true,
			data: self.props.customData

		}, function (err, response) {
			FSBL.Clients.RouterClient.publish(COMPONENT_UPDATE_CHANNEL, self.props.customData);
			if (cb) {
				return cb();
			}
		});
	}
	componentWillMount() {
		if (this.state.types.includes('MenuLauncher') && this.props.preSpawn) {
			let self = this;
			FSBL.Clients.DistributedStoreClient.createStore({
				store: 'Finsemble-Menu-Store',
				global: true,
				values: { creator: fin.desktop.Window.getCurrent().name }
			}, function (err, store) {
				self.store = store;
				store.getValues(function (err, data) {
					if (err) return console.error(err);
					let isCreator = data.creator === fin.desktop.Window.getCurrent().name;
					if (!isCreator) return;
					//If this button didn't create the store don't do anything
					if (!data || !data[self.props.menuType]) {
						// If the menu doesn't exist yet spawn it.
						console.log('Prespawning.', self.props.menuType);
						self.spawnMenu(function () {
							if (!data) {
								data = {};
							}
							self.store.setValue({ field: self.props.menuType, value: true });
						});
					}
				});
			});
		}
	}
	getRandomID() {
		var S4 = function () {
			return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
		};
		return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
	}

	render() {
		//If the user doesn't want to show the component, return null.
		if (this.props.show === false) {
			return null;
		}
		//If we don't receive an onClick prop, we will throw a warning to the console.
		this._onClick = typeof this.props.onClick !== 'undefined' ? this.props.onClick : this.warnNoClick;

		//Some intitial setup/defaults setting.
		let self = this,
		    image = null,
		    label = null,
		    iconPosition = this.props.iconPosition || 'left',
		    iconClasses = this.props.iconClasses || '',
		    classes = this.props.className || '',
		    types = this.props.buttonType || [],
		    draggable = typeof this.props.draggable !== 'undefined' ? this.props.draggable : false;

		//Render icon.
		if (this.props.icon) {
			image = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { draggable: draggable, onDragStart: this.props.onDragStart, onDrag: this.props.onDrag, onDragEnd: this.props.onDragEnd, className: iconClasses, src: this.props.icon });
		}
		//coerce to array.
		if (typeof types === 'string') {
			types = [types];
		}

		//Render fontIcon.
		if (this.props.fontIcon) {
			if (types.includes('Toolbar')) {
				iconClasses += ' finsemble-toolbar-button-icon';
			}
			image = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__FinsembleFontIcon_FinsembleFontIcon__["a" /* default */], { className: iconClasses, icon: this.props.fontIcon });
		}

		//Render label.
		if (this.props.label) {
			let buttonClasses = '';
			if (types.includes('Toolbar')) {
				buttonClasses += 'finsemble-toolbar-button-label';
			}
			label = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__FinsembleButtonLabel_FinsembleButtonLabel__["a" /* default */], { draggable: draggable, onDragStart: this.props.onDragStart, onDrag: this.props.onDrag, onDragEnd: this.props.onDragEnd, className: buttonClasses, align: iconPosition === 'left' ? 'right' : 'left', label: this.props.label });
		}

		if (types.length) {
			//Add classes to the button based on the types passed in.
			types.forEach(type => {
				if (classMap[type]) {
					classes += ` ${classMap[type]}`;
				}
			});
			//If the button is a MenuLauncher, set its onCLick to launchMenu.
			if (types.includes('MenuLauncher')) {
				//If you're a menuLauncher, you must tell us the type of menu to open.
				this.validateProp('menuType');
				this._onClick = this.launchMenu;
			}
			if (types.includes('AppLauncher')) {
				//If you're a menuLauncher, you must tell us the type of menu to open.
				this.validateProp('component');
				this._onClick = this.launchComponent;
			}
		} else {
			this.warn('No type property passed to button.');
		}

		//Wrapper to allow for beforeClick and AfterClick
		this.onClick = function (e) {
			if (self.props.beforeClick) self.props.beforeClick(e);
			if (self._onClick) self._onClick(e);
			if (self.props.afterClick) self.props.afterClick(e);
		};
		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{
				id: this.props.id || this.getRandomID(),
				onMouseUp: this.props.onMouseUp,
				onMouseDown: this.props.onMouseDown,
				onClick: this.onClick,
				title: this.props.title || '',
				className: classes },
			image,
			label,
			this.props.children
		);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Button;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */


/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

function reactProdInvariant(code) {
  var argCount = arguments.length - 1;

  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

  for (var argIdx = 0; argIdx < argCount; argIdx++) {
    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
  }

  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

  var error = new Error(message);
  error.name = 'Invariant Violation';
  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

  throw error;
}

module.exports = reactProdInvariant;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(12);
var createDesc = __webpack_require__(36);
module.exports = __webpack_require__(22) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(35);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(113);
var defined = __webpack_require__(60);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var top = _ref.top,
      right = _ref.right,
      bottom = _ref.bottom,
      left = _ref.left;
  return {
    top: top,
    right: right,
    bottom: bottom,
    left: left,
    width: right - left,
    height: bottom - top,
    center: {
      x: (right + left) / 2,
      y: (bottom + top) / 2
    }
  };
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(18);

var _keys2 = _interopRequireDefault(_keys);

var _memoizeOne = __webpack_require__(3);

var _memoizeOne2 = _interopRequireDefault(_memoizeOne);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _memoizeOne2.default)(function (droppable, draggables) {
  return (0, _keys2.default)(draggables).map(function (id) {
    return draggables[id];
  }).filter(function (draggable) {
    return droppable.descriptor.id === draggable.descriptor.droppableId;
  }).sort(function (a, b) {
    return a.descriptor.index - b.descriptor.index;
  });
});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getDisplacementMap = __webpack_require__(122);

var _getDisplacementMap2 = _interopRequireDefault(_getDisplacementMap);

var _isPartiallyVisible = __webpack_require__(76);

var _isPartiallyVisible2 = _interopRequireDefault(_isPartiallyVisible);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var draggable = _ref.draggable,
      destination = _ref.destination,
      previousImpact = _ref.previousImpact,
      viewport = _ref.viewport;

  var id = draggable.descriptor.id;
  var map = (0, _getDisplacementMap2.default)(previousImpact.movement.displaced);

  var isVisible = (0, _isPartiallyVisible2.default)({
    target: draggable.page.withMargin,
    destination: destination,
    viewport: viewport
  });

  var shouldAnimate = function () {
    if (!isVisible) {
      return false;
    }

    var previous = map[id];

    if (!previous) {
      return true;
    }

    return previous.shouldAnimate;
  }();

  var displacement = {
    draggableId: id,
    isVisible: isVisible,
    shouldAnimate: shouldAnimate
  };

  return displacement;
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(60);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(112);
var enumBugKeys = __webpack_require__(68);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCorners = exports.offset = exports.isEqual = exports.addPosition = exports.add = undefined;

var _extends2 = __webpack_require__(24);

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var add = exports.add = function add(spacing1, spacing2) {
  return {
    top: spacing1.top + spacing2.top,
    left: spacing1.left + spacing2.left,
    right: spacing1.right + spacing2.right,
    bottom: spacing1.bottom + spacing2.bottom
  };
};

var addPosition = exports.addPosition = function addPosition(spacing, position) {
  return (0, _extends3.default)({}, spacing, {
    right: spacing.right + position.x,
    bottom: spacing.bottom + position.y
  });
};

var isEqual = exports.isEqual = function isEqual(spacing1, spacing2) {
  return spacing1.top === spacing2.top && spacing1.right === spacing2.right && spacing1.bottom === spacing2.bottom && spacing1.left === spacing2.left;
};

var offset = exports.offset = function offset(spacing, point) {
  return {
    top: spacing.top + point.y,
    right: spacing.right + point.x,
    bottom: spacing.bottom + point.y,
    left: spacing.left + point.x
  };
};

var getCorners = exports.getCorners = function getCorners(spacing) {
  return [{ x: spacing.left, y: spacing.top }, { x: spacing.right, y: spacing.top }, { x: spacing.left, y: spacing.bottom }, { x: spacing.right, y: spacing.bottom }];
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _position = __webpack_require__(2);

exports.default = function (_ref) {
  var source = _ref.source,
      sourceEdge = _ref.sourceEdge,
      destination = _ref.destination,
      destinationEdge = _ref.destinationEdge,
      destinationAxis = _ref.destinationAxis;

  var getCorner = function getCorner(area) {
    return (0, _position.patch)(destinationAxis.line, area[destinationAxis[destinationEdge]], area[destinationAxis.crossAxisStart]);
  };

  var corner = getCorner(destination);

  var centerDiff = (0, _position.absolute)((0, _position.subtract)(source.center, getCorner(source)));

  var signed = (0, _position.patch)(destinationAxis.line, (sourceEdge === 'end' ? -1 : 1) * centerDiff[destinationAxis.line], centerDiff[destinationAxis.crossLine]);

  return (0, _position.add)(corner, signed);
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



var canDefineProperty = false;
if (process.env.NODE_ENV !== 'production') {
  try {
    // $FlowFixMe https://github.com/facebook/flow/issues/285
    Object.defineProperty({}, 'x', { get: function () {} });
    canDefineProperty = true;
  } catch (x) {
    // IE will fail on defineProperty
  }
}

module.exports = canDefineProperty;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

module.exports = ReactCurrentOwner;

/***/ }),
/* 45 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 46 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(220);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


var origin = { x: 0, y: 0 };

var noMovement = exports.noMovement = {
  displaced: [],
  amount: origin,
  isBeyondStartPosition: false
};

var noImpact = {
  movement: noMovement,
  direction: null,
  destination: null
};

exports.default = noImpact;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDroppableDimension = exports.scrollDroppable = exports.clip = exports.getDraggableDimension = exports.noSpacing = undefined;

var _extends2 = __webpack_require__(24);

var _extends3 = _interopRequireDefault(_extends2);

var _axis = __webpack_require__(232);

var _getArea = __webpack_require__(31);

var _getArea2 = _interopRequireDefault(_getArea);

var _spacing = __webpack_require__(40);

var _position = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var origin = { x: 0, y: 0 };

var noSpacing = exports.noSpacing = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

var addPosition = function addPosition(area, point) {
  var top = area.top,
      right = area.right,
      bottom = area.bottom,
      left = area.left;

  return (0, _getArea2.default)({
    top: top + point.y,
    left: left + point.x,
    bottom: bottom + point.y,
    right: right + point.x
  });
};

var addSpacing = function addSpacing(area, spacing) {
  var top = area.top,
      right = area.right,
      bottom = area.bottom,
      left = area.left;

  return (0, _getArea2.default)({
    top: top - spacing.top,
    left: left - spacing.left,

    bottom: bottom + spacing.bottom,
    right: right + spacing.right
  });
};

var getDraggableDimension = exports.getDraggableDimension = function getDraggableDimension(_ref) {
  var descriptor = _ref.descriptor,
      client = _ref.client,
      _ref$margin = _ref.margin,
      margin = _ref$margin === undefined ? noSpacing : _ref$margin,
      _ref$windowScroll = _ref.windowScroll,
      windowScroll = _ref$windowScroll === undefined ? origin : _ref$windowScroll;

  var withScroll = addPosition(client, windowScroll);

  var dimension = {
    descriptor: descriptor,
    placeholder: {
      margin: margin,
      withoutMargin: {
        width: client.width,
        height: client.height
      }
    },

    client: {
      withoutMargin: (0, _getArea2.default)(client),
      withMargin: (0, _getArea2.default)(addSpacing(client, margin))
    },

    page: {
      withoutMargin: (0, _getArea2.default)(withScroll),
      withMargin: (0, _getArea2.default)(addSpacing(withScroll, margin))
    }
  };

  return dimension;
};

var clip = exports.clip = function clip(frame, subject) {
  var result = (0, _getArea2.default)({
    top: Math.max(subject.top, frame.top),
    right: Math.min(subject.right, frame.right),
    bottom: Math.min(subject.bottom, frame.bottom),
    left: Math.max(subject.left, frame.left)
  });

  if (result.width <= 0 || result.height <= 0) {
    return null;
  }

  return result;
};

var scrollDroppable = exports.scrollDroppable = function scrollDroppable(droppable, newScroll) {
  var existing = droppable.viewport;

  var scrollDiff = (0, _position.subtract)(newScroll, existing.frameScroll.initial);

  var scrollDisplacement = (0, _position.negate)(scrollDiff);
  var displacedSubject = (0, _spacing.offset)(existing.subject, scrollDisplacement);

  var viewport = {
    frame: existing.frame,
    subject: existing.subject,

    frameScroll: {
      initial: existing.frameScroll.initial,
      current: newScroll,
      diff: {
        value: scrollDiff,
        displacement: scrollDisplacement
      }
    },
    clipped: clip(existing.frame, displacedSubject)
  };

  return (0, _extends3.default)({}, droppable, {
    viewport: viewport
  });
};

var getDroppableDimension = exports.getDroppableDimension = function getDroppableDimension(_ref2) {
  var descriptor = _ref2.descriptor,
      client = _ref2.client,
      frameClient = _ref2.frameClient,
      _ref2$frameScroll = _ref2.frameScroll,
      frameScroll = _ref2$frameScroll === undefined ? origin : _ref2$frameScroll,
      _ref2$direction = _ref2.direction,
      direction = _ref2$direction === undefined ? 'vertical' : _ref2$direction,
      _ref2$margin = _ref2.margin,
      margin = _ref2$margin === undefined ? noSpacing : _ref2$margin,
      _ref2$padding = _ref2.padding,
      padding = _ref2$padding === undefined ? noSpacing : _ref2$padding,
      _ref2$windowScroll = _ref2.windowScroll,
      windowScroll = _ref2$windowScroll === undefined ? origin : _ref2$windowScroll,
      _ref2$isEnabled = _ref2.isEnabled,
      isEnabled = _ref2$isEnabled === undefined ? true : _ref2$isEnabled;

  var withMargin = addSpacing(client, margin);
  var withWindowScroll = addPosition(client, windowScroll);


  var subject = addSpacing(withWindowScroll, margin);

  var frame = function () {
    if (!frameClient) {
      return subject;
    }
    return addPosition(frameClient, windowScroll);
  }();

  var viewport = {
    frame: frame,
    frameScroll: {
      initial: frameScroll,

      current: frameScroll,
      diff: {
        value: origin,
        displacement: origin
      }
    },
    subject: subject,
    clipped: clip(frame, subject)
  };

  var dimension = {
    descriptor: descriptor,
    isEnabled: isEnabled,
    axis: direction === 'vertical' ? _axis.vertical : _axis.horizontal,
    client: {
      withoutMargin: (0, _getArea2.default)(client),
      withMargin: (0, _getArea2.default)(withMargin),
      withMarginAndPadding: (0, _getArea2.default)(addSpacing(withMargin, padding))
    },
    page: {
      withoutMargin: (0, _getArea2.default)(withWindowScroll),
      withMargin: subject,
      withMarginAndPadding: (0, _getArea2.default)(addSpacing(withWindowScroll, (0, _spacing.add)(margin, padding)))
    },
    viewport: viewport
  };

  return dimension;
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// turn {x: {val: 1, stiffness: 1, damping: 2}, y: 2} generated by
// `{x: spring(1, {stiffness: 1, damping: 2}), y: 2}` into {x: 1, y: 2}



exports.__esModule = true;
exports['default'] = stripStyle;

function stripStyle(style) {
  var ret = {};
  for (var key in style) {
    if (!Object.prototype.hasOwnProperty.call(style, key)) {
      continue;
    }
    ret[key] = typeof style[key] === 'number' ? style[key] : style[key].val;
  }
  return ret;
}

module.exports = exports['default'];

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (event) {
  event.preventDefault();
  event.stopPropagation();
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = lowPriorityWarning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2016-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



var _prodInvariant = __webpack_require__(26);

var ReactCurrentOwner = __webpack_require__(44);

var invariant = __webpack_require__(6);
var warning = __webpack_require__(8);

function isNative(fn) {
  // Based on isNative() from Lodash
  var funcToString = Function.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var reIsNative = RegExp('^' + funcToString
  // Take an example native function source for comparison
  .call(hasOwnProperty
  // Strip regex characters so we can use it for regex
  ).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&'
  // Remove hasOwnProperty from the template to make it generic
  ).replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  try {
    var source = funcToString.call(fn);
    return reIsNative.test(source);
  } catch (err) {
    return false;
  }
}

var canUseCollections =
// Array.from
typeof Array.from === 'function' &&
// Map
typeof Map === 'function' && isNative(Map) &&
// Map.prototype.keys
Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
// Set
typeof Set === 'function' && isNative(Set) &&
// Set.prototype.keys
Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

var setItem;
var getItem;
var removeItem;
var getItemIDs;
var addRoot;
var removeRoot;
var getRootIDs;

if (canUseCollections) {
  var itemMap = new Map();
  var rootIDSet = new Set();

  setItem = function (id, item) {
    itemMap.set(id, item);
  };
  getItem = function (id) {
    return itemMap.get(id);
  };
  removeItem = function (id) {
    itemMap['delete'](id);
  };
  getItemIDs = function () {
    return Array.from(itemMap.keys());
  };

  addRoot = function (id) {
    rootIDSet.add(id);
  };
  removeRoot = function (id) {
    rootIDSet['delete'](id);
  };
  getRootIDs = function () {
    return Array.from(rootIDSet.keys());
  };
} else {
  var itemByKey = {};
  var rootByKey = {};

  // Use non-numeric keys to prevent V8 performance issues:
  // https://github.com/facebook/react/pull/7232
  var getKeyFromID = function (id) {
    return '.' + id;
  };
  var getIDFromKey = function (key) {
    return parseInt(key.substr(1), 10);
  };

  setItem = function (id, item) {
    var key = getKeyFromID(id);
    itemByKey[key] = item;
  };
  getItem = function (id) {
    var key = getKeyFromID(id);
    return itemByKey[key];
  };
  removeItem = function (id) {
    var key = getKeyFromID(id);
    delete itemByKey[key];
  };
  getItemIDs = function () {
    return Object.keys(itemByKey).map(getIDFromKey);
  };

  addRoot = function (id) {
    var key = getKeyFromID(id);
    rootByKey[key] = true;
  };
  removeRoot = function (id) {
    var key = getKeyFromID(id);
    delete rootByKey[key];
  };
  getRootIDs = function () {
    return Object.keys(rootByKey).map(getIDFromKey);
  };
}

var unmountedIDs = [];

function purgeDeep(id) {
  var item = getItem(id);
  if (item) {
    var childIDs = item.childIDs;

    removeItem(id);
    childIDs.forEach(purgeDeep);
  }
}

function describeComponentFrame(name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
}

function getDisplayName(element) {
  if (element == null) {
    return '#empty';
  } else if (typeof element === 'string' || typeof element === 'number') {
    return '#text';
  } else if (typeof element.type === 'string') {
    return element.type;
  } else {
    return element.type.displayName || element.type.name || 'Unknown';
  }
}

function describeID(id) {
  var name = ReactComponentTreeHook.getDisplayName(id);
  var element = ReactComponentTreeHook.getElement(id);
  var ownerID = ReactComponentTreeHook.getOwnerID(id);
  var ownerName;
  if (ownerID) {
    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
  }
  process.env.NODE_ENV !== 'production' ? warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
  return describeComponentFrame(name, element && element._source, ownerName);
}

var ReactComponentTreeHook = {
  onSetChildren: function (id, nextChildIDs) {
    var item = getItem(id);
    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.childIDs = nextChildIDs;

    for (var i = 0; i < nextChildIDs.length; i++) {
      var nextChildID = nextChildIDs[i];
      var nextChild = getItem(nextChildID);
      !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
      !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
      if (nextChild.parentID == null) {
        nextChild.parentID = id;
        // TODO: This shouldn't be necessary but mounting a new root during in
        // componentWillMount currently causes not-yet-mounted components to
        // be purged from our tree data so their parent id is missing.
      }
      !(nextChild.parentID === id) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
    }
  },
  onBeforeMountComponent: function (id, element, parentID) {
    var item = {
      element: element,
      parentID: parentID,
      text: null,
      childIDs: [],
      isMounted: false,
      updateCount: 0
    };
    setItem(id, item);
  },
  onBeforeUpdateComponent: function (id, element) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.element = element;
  },
  onMountComponent: function (id) {
    var item = getItem(id);
    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.isMounted = true;
    var isRoot = item.parentID === 0;
    if (isRoot) {
      addRoot(id);
    }
  },
  onUpdateComponent: function (id) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.updateCount++;
  },
  onUnmountComponent: function (id) {
    var item = getItem(id);
    if (item) {
      // We need to check if it exists.
      // `item` might not exist if it is inside an error boundary, and a sibling
      // error boundary child threw while mounting. Then this instance never
      // got a chance to mount, but it still gets an unmounting event during
      // the error boundary cleanup.
      item.isMounted = false;
      var isRoot = item.parentID === 0;
      if (isRoot) {
        removeRoot(id);
      }
    }
    unmountedIDs.push(id);
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeHook._preventPurging) {
      // Should only be used for testing.
      return;
    }

    for (var i = 0; i < unmountedIDs.length; i++) {
      var id = unmountedIDs[i];
      purgeDeep(id);
    }
    unmountedIDs.length = 0;
  },
  isMounted: function (id) {
    var item = getItem(id);
    return item ? item.isMounted : false;
  },
  getCurrentStackAddendum: function (topElement) {
    var info = '';
    if (topElement) {
      var name = getDisplayName(topElement);
      var owner = topElement._owner;
      info += describeComponentFrame(name, topElement._source, owner && owner.getName());
    }

    var currentOwner = ReactCurrentOwner.current;
    var id = currentOwner && currentOwner._debugID;

    info += ReactComponentTreeHook.getStackAddendumByID(id);
    return info;
  },
  getStackAddendumByID: function (id) {
    var info = '';
    while (id) {
      info += describeID(id);
      id = ReactComponentTreeHook.getParentID(id);
    }
    return info;
  },
  getChildIDs: function (id) {
    var item = getItem(id);
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element) {
      return null;
    }
    return getDisplayName(element);
  },
  getElement: function (id) {
    var item = getItem(id);
    return item ? item.element : null;
  },
  getOwnerID: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element || !element._owner) {
      return null;
    }
    return element._owner._debugID;
  },
  getParentID: function (id) {
    var item = getItem(id);
    return item ? item.parentID : null;
  },
  getSource: function (id) {
    var item = getItem(id);
    var element = item ? item.element : null;
    var source = element != null ? element._source : null;
    return source;
  },
  getText: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (typeof element === 'string') {
      return element;
    } else if (typeof element === 'number') {
      return '' + element;
    } else {
      return null;
    }
  },
  getUpdateCount: function (id) {
    var item = getItem(id);
    return item ? item.updateCount : 0;
  },


  getRootIDs: getRootIDs,
  getRegisteredIDs: getItemIDs,

  pushNonStandardWarningStack: function (isCreatingElement, currentSource) {
    if (typeof console.reactStack !== 'function') {
      return;
    }

    var stack = [];
    var currentOwner = ReactCurrentOwner.current;
    var id = currentOwner && currentOwner._debugID;

    try {
      if (isCreatingElement) {
        stack.push({
          name: id ? ReactComponentTreeHook.getDisplayName(id) : null,
          fileName: currentSource ? currentSource.fileName : null,
          lineNumber: currentSource ? currentSource.lineNumber : null
        });
      }

      while (id) {
        var element = ReactComponentTreeHook.getElement(id);
        var parentID = ReactComponentTreeHook.getParentID(id);
        var ownerID = ReactComponentTreeHook.getOwnerID(id);
        var ownerName = ownerID ? ReactComponentTreeHook.getDisplayName(ownerID) : null;
        var source = element && element._source;
        stack.push({
          name: ownerName,
          fileName: source ? source.fileName : null,
          lineNumber: source ? source.lineNumber : null
        });
        id = parentID;
      }
    } catch (err) {
      // Internal state is messed up.
      // Stop building the stack (it's just a nice to have).
    }

    console.reactStack(stack);
  },
  popNonStandardWarningStack: function () {
    if (typeof console.reactStackEnd !== 'function') {
      return;
    }
    console.reactStackEnd();
  }
};

module.exports = ReactComponentTreeHook;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/



class FinsembleFontIcon extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let classes = this.props.className || '';

		if (this.props.icon) {
			//If you're unfamiliar with this syntax, it's equivalent to
			//classes+=' ' + this.props.icon;
			classes += ` ${this.props.icon}`;
		} else {
			throw new Error('No icon prop for FontIcon Component.');
		}

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', _extends({}, this.props, { className: classes }));
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FinsembleFontIcon;


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_beautiful_dnd__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_beautiful_dnd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_beautiful_dnd__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



class FinsembleDraggable extends __WEBPACK_IMPORTED_MODULE_1_react___default.a.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let draggableId = this.props.draggableId || `Id-Unset-${Math.random() * 23214}`;
		let isDragDisabled = typeof this.props.isDragDisabled === 'undefined' ? false : this.props.isDragDisabled;
		let noop = () => {};
		return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
			__WEBPACK_IMPORTED_MODULE_0_react_beautiful_dnd__["Draggable"],
			{ isDragDisabled: isDragDisabled, key: this.props.index, draggableId: draggableId, index: this.props.index },
			(provided, snapshot) => __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
				'div',
				{ onClick: this.props.onClick || noop, className: this.props.wrapperClass || '' },
				__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
					'div',
					_extends({ ref: provided.innerRef
					}, provided.draggableProps, provided.dragHandleProps),
					this.props.children
				),
				provided.placeholder
			)
		);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FinsembleDraggable;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dragDropContext = __webpack_require__(159);

Object.defineProperty(exports, 'DragDropContext', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_dragDropContext).default;
  }
});

var _droppable = __webpack_require__(250);

Object.defineProperty(exports, 'Droppable', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_droppable).default;
  }
});

var _draggable = __webpack_require__(268);

Object.defineProperty(exports, 'Draggable', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_draggable).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(163);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(35);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 60 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(62)('keys');
var uid = __webpack_require__(45);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(11);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(166);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(178);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 64 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(28);
var dPs = __webpack_require__(170);
var enumBugKeys = __webpack_require__(68);
var IE_PROTO = __webpack_require__(61)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(106)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(173).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 67 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 68 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(12).f;
var has = __webpack_require__(23);
var TAG = __webpack_require__(7)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(7);


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(11);
var core = __webpack_require__(4);
var LIBRARY = __webpack_require__(65);
var wksExt = __webpack_require__(70);
var defineProperty = __webpack_require__(12).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 72 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(204);




/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) || Object(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) != objectTag) {
    return false;
  }
  var proto = Object(__WEBPACK_IMPORTED_MODULE_1__getPrototype_js__["a" /* default */])(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ __webpack_exports__["a"] = (isPlainObject);


/***/ }),
/* 74 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (lowerBound, upperBound) {
  return function (value) {
    return value <= upperBound && value >= lowerBound;
  };
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isVisibleThroughFrame = __webpack_require__(123);

var _isVisibleThroughFrame2 = _interopRequireDefault(_isVisibleThroughFrame);

var _spacing = __webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var target = _ref.target,
      destination = _ref.destination,
      viewport = _ref.viewport;

  var displacement = destination.viewport.frameScroll.diff.displacement;
  var withScroll = (0, _spacing.offset)(target, displacement);

  if (!destination.viewport.clipped) {
    return false;
  }

  var isVisibleInDroppable = (0, _isVisibleThroughFrame2.default)(destination.viewport.clipped)(withScroll);

  var isVisibleInViewport = (0, _isVisibleThroughFrame2.default)(viewport)(withScroll);

  return isVisibleInDroppable && isVisibleInViewport;
};

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.defaultMemoize = defaultMemoize;
exports.createSelectorCreator = createSelectorCreator;
exports.createStructuredSelector = createStructuredSelector;
function defaultEqualityCheck(a, b) {
  return a === b;
}

function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  }

  // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
  var length = prev.length;
  for (var i = 0; i < length; i++) {
    if (!equalityCheck(prev[i], next[i])) {
      return false;
    }
  }

  return true;
}

function defaultMemoize(func) {
  var equalityCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityCheck;

  var lastArgs = null;
  var lastResult = null;
  // we reference arguments instead of spreading them for performance reasons
  return function () {
    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
      // apply arguments instead of spreading for performance.
      lastResult = func.apply(null, arguments);
    }

    lastArgs = arguments;
    return lastResult;
  };
}

function getDependencies(funcs) {
  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

  if (!dependencies.every(function (dep) {
    return typeof dep === 'function';
  })) {
    var dependencyTypes = dependencies.map(function (dep) {
      return typeof dep;
    }).join(', ');
    throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
  }

  return dependencies;
}

function createSelectorCreator(memoize) {
  for (var _len = arguments.length, memoizeOptions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    memoizeOptions[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      funcs[_key2] = arguments[_key2];
    }

    var recomputations = 0;
    var resultFunc = funcs.pop();
    var dependencies = getDependencies(funcs);

    var memoizedResultFunc = memoize.apply(undefined, [function () {
      recomputations++;
      // apply arguments instead of spreading for performance.
      return resultFunc.apply(null, arguments);
    }].concat(memoizeOptions));

    // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.
    var selector = defaultMemoize(function () {
      var params = [];
      var length = dependencies.length;

      for (var i = 0; i < length; i++) {
        // apply arguments instead of spreading and mutate a local list of params for performance.
        params.push(dependencies[i].apply(null, arguments));
      }

      // apply arguments instead of spreading for performance.
      return memoizedResultFunc.apply(null, params);
    });

    selector.resultFunc = resultFunc;
    selector.recomputations = function () {
      return recomputations;
    };
    selector.resetRecomputations = function () {
      return recomputations = 0;
    };
    return selector;
  };
}

var createSelector = exports.createSelector = createSelectorCreator(defaultMemoize);

function createStructuredSelector(selectors) {
  var selectorCreator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : createSelector;

  if (typeof selectors !== 'object') {
    throw new Error('createStructuredSelector expects first argument to be an object ' + ('where each property is a selector, instead received a ' + typeof selectors));
  }
  var objectKeys = Object.keys(selectors);
  return selectorCreator(objectKeys.map(function (key) {
    return selectors[key];
  }), function () {
    for (var _len3 = arguments.length, values = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      values[_key3] = arguments[_key3];
    }

    return values.reduce(function (composition, value, index) {
      composition[objectKeys[index]] = value;
      return composition;
    }, {});
  });
}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// currently used to initiate the velocity style object to 0


exports.__esModule = true;
exports['default'] = mapToZero;

function mapToZero(obj) {
  var ret = {};
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      ret[key] = 0;
    }
  }
  return ret;
}

module.exports = exports['default'];

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// stepper is used a lot. Saves allocation to return the same array wrapper.
// This is fine and danger-free against mutations because the callsite
// immediately destructures it and gets the numbers inside without passing the


exports.__esModule = true;
exports["default"] = stepper;

var reusedTuple = [0, 0];

function stepper(secondPerFrame, x, v, destX, k, b, precision) {
  // Spring stiffness, in kg / s^2

  // for animations, destX is really spring length (spring at rest). initial
  // position is considered as the stretched/compressed position of a spring
  var Fspring = -k * (x - destX);

  // Damping, in kg / s
  var Fdamper = -b * v;

  // usually we put mass here, but for animation purposes, specifying mass is a
  // bit redundant. you could simply adjust k and b accordingly
  // let a = (Fspring + Fdamper) / mass;
  var a = Fspring + Fdamper;

  var newV = v + a * secondPerFrame;
  var newX = x + newV * secondPerFrame;

  if (Math.abs(newV) < precision && Math.abs(newX - destX) < precision) {
    reusedTuple[0] = destX;
    reusedTuple[1] = 0;
    return reusedTuple;
  }

  reusedTuple[0] = newX;
  reusedTuple[1] = newV;
  return reusedTuple;
}

module.exports = exports["default"];
// array reference around.

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.7.1
(function() {
  var getNanoSeconds, hrtime, loadTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - loadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(277)
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function(object) {
  if (!object) {
    object = root;
  }
  object.requestAnimationFrame = raf
  object.cancelAnimationFrame = caf
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// usage assumption: currentStyle values have already been rendered but it says
// nothing of whether currentStyle is stale (see unreadPropStyle)


exports.__esModule = true;
exports['default'] = shouldStopAnimation;

function shouldStopAnimation(currentStyle, style, currentVelocity) {
  for (var key in style) {
    if (!Object.prototype.hasOwnProperty.call(style, key)) {
      continue;
    }

    if (currentVelocity[key] !== 0) {
      return false;
    }

    var styleValue = typeof style[key] === 'number' ? style[key] : style[key].val;
    // stepper will have already taken care of rounding precision errors, so
    // won't have such thing as 0.9999 !=== 1
    if (currentStyle[key] !== styleValue) {
      return false;
    }
  }

  return true;
}

module.exports = exports['default'];

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _memoizeOne = __webpack_require__(3);

var _memoizeOne2 = _interopRequireDefault(_memoizeOne);

var _rafSchd = __webpack_require__(133);

var _rafSchd2 = _interopRequireDefault(_rafSchd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (callbacks, isDraggingFn) {
  var ifDragging = function ifDragging(fn) {
    if (isDraggingFn()) {
      fn();
    }
  };

  var memoizedMove = (0, _memoizeOne2.default)(function (x, y) {
    var point = { x: x, y: y };
    callbacks.onMove(point);
  });

  var move = (0, _rafSchd2.default)(function (point) {
    ifDragging(function () {
      return memoizedMove(point.x, point.y);
    });
  });

  var moveForward = (0, _rafSchd2.default)(function () {
    ifDragging(callbacks.onMoveForward);
  });

  var moveBackward = (0, _rafSchd2.default)(function () {
    ifDragging(callbacks.onMoveBackward);
  });

  var crossAxisMoveForward = (0, _rafSchd2.default)(function () {
    ifDragging(callbacks.onCrossAxisMoveForward);
  });

  var crossAxisMoveBackward = (0, _rafSchd2.default)(function () {
    ifDragging(callbacks.onCrossAxisMoveBackward);
  });

  var windowScrollMove = (0, _rafSchd2.default)(function () {
    ifDragging(callbacks.onWindowScroll);
  });

  return {
    move: move,
    moveForward: moveForward,
    moveBackward: moveBackward,
    crossAxisMoveForward: crossAxisMoveForward,
    crossAxisMoveBackward: crossAxisMoveBackward,
    windowScrollMove: windowScrollMove
  };
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (ref) {
  return ref ? ref.ownerDocument.defaultView : window;
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var tab = exports.tab = 9;
var enter = exports.enter = 13;
var escape = exports.escape = 27;
var space = exports.space = 32;
var arrowLeft = exports.arrowLeft = 37;
var arrowUp = exports.arrowUp = 38;
var arrowRight = exports.arrowRight = 39;
var arrowDown = exports.arrowDown = 40;

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_beautiful_dnd__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_beautiful_dnd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_beautiful_dnd__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);




class FinsembleDroppable extends __WEBPACK_IMPORTED_MODULE_1_react___default.a.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let direction = this.props.direction || 'horizontal';
		let droppableId = this.props.droppableId || 'droppable';
		return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
			__WEBPACK_IMPORTED_MODULE_0_react_beautiful_dnd__["Droppable"],
			{ direction: direction, droppableId: droppableId },
			(provided, snapshot) => __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
				'div',
				{ className: this.props.classes,
					ref: provided.innerRef
				},
				this.props.children,
				provided.placeholder
			)
		);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FinsembleDroppable;


/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_beautiful_dnd__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_beautiful_dnd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_beautiful_dnd__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);


class FinsembleDnDContext extends __WEBPACK_IMPORTED_MODULE_1_react___default.a.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let defaultOnDragEnd = () => {
			console.warn('No onDragEnd passed to FinsembleDnDContext');
		};
		let defaultOnDragStart = () => {};
		let onDragEnd = this.props.onDragEnd || defaultOnDragEnd;
		let onDragStart = this.props.onDragStart || defaultOnDragStart;
		return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
			__WEBPACK_IMPORTED_MODULE_0_react_beautiful_dnd__["DragDropContext"],
			{ onDragEnd: onDragEnd, onDragStart: onDragStart },
			this.props.children
		);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FinsembleDnDContext;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _prodInvariant = __webpack_require__(26),
    _assign = __webpack_require__(34);

var ReactNoopUpdateQueue = __webpack_require__(91);

var canDefineProperty = __webpack_require__(43);
var emptyObject = __webpack_require__(92);
var invariant = __webpack_require__(6);
var lowPriorityWarning = __webpack_require__(52);

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

ReactComponent.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : _prodInvariant('85') : void 0;
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'forceUpdate');
  }
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
if (process.env.NODE_ENV !== 'production') {
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    if (canDefineProperty) {
      Object.defineProperty(ReactComponent.prototype, methodName, {
        get: function () {
          lowPriorityWarning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
          return undefined;
        }
      });
    }
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
ReactPureComponent.prototype = new ComponentDummy();
ReactPureComponent.prototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
_assign(ReactPureComponent.prototype, ReactComponent.prototype);
ReactPureComponent.prototype.isPureReactComponent = true;

module.exports = {
  Component: ReactComponent,
  PureComponent: ReactPureComponent
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var warning = __webpack_require__(8);

function warnNoop(publicInstance, callerName) {
  if (process.env.NODE_ENV !== 'production') {
    var constructor = publicInstance.constructor;
    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @internal
   */
  enqueueCallback: function (publicInstance, callback) {},

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState) {
    warnNoop(publicInstance, 'setState');
  }
};

module.exports = ReactNoopUpdateQueue;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.

var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

module.exports = REACT_ELEMENT_TYPE;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



/* global Symbol */

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

module.exports = getIteratorFn;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */



var ReactCurrentOwner = __webpack_require__(44);
var ReactComponentTreeHook = __webpack_require__(53);
var ReactElement = __webpack_require__(21);

var checkReactTypeSpec = __webpack_require__(145);

var canDefineProperty = __webpack_require__(43);
var getIteratorFn = __webpack_require__(94);
var warning = __webpack_require__(8);
var lowPriorityWarning = __webpack_require__(52);

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = ReactCurrentOwner.current.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return ' Check your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = ' Check the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var memoizer = ownerHasKeyUseWarning.uniqueKey || (ownerHasKeyUseWarning.uniqueKey = {});

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (memoizer[currentComponentErrorInfo]) {
    return;
  }
  memoizer[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
  }

  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, ReactComponentTreeHook.getCurrentStackAddendum(element)) : void 0;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (ReactElement.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    // Entry iterators provide implicit keys.
    if (iteratorFn) {
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement.isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  if (componentClass.propTypes) {
    checkReactTypeSpec(componentClass.propTypes, element.props, 'prop', name, element, null);
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}

var ReactElementValidator = {
  createElement: function (type, props, children) {
    var validType = typeof type === 'string' || typeof type === 'function';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    if (!validType) {
      if (typeof type !== 'function' && typeof type !== 'string') {
        var info = '';
        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in.";
        }

        var sourceInfo = getSourceInfoErrorAddendum(props);
        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        info += ReactComponentTreeHook.getCurrentStackAddendum();

        var currentSource = props !== null && props !== undefined && props.__source !== undefined ? props.__source : null;
        ReactComponentTreeHook.pushNonStandardWarningStack(true, currentSource);
        process.env.NODE_ENV !== 'production' ? warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info) : void 0;
        ReactComponentTreeHook.popNonStandardWarningStack();
      }
    }

    var element = ReactElement.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    return element;
  },

  createFactory: function (type) {
    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    if (process.env.NODE_ENV !== 'production') {
      if (canDefineProperty) {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            lowPriorityWarning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
    }

    return validatedFactory;
  },

  cloneElement: function (element, props, children) {
    var newElement = ReactElement.cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }
};

module.exports = ReactElementValidator;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(42);
var invariant = __webpack_require__(6);
var warning = __webpack_require__(8);
var assign = __webpack_require__(34);

var ReactPropTypesSecret = __webpack_require__(54);
var checkPropTypes = __webpack_require__(150);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/

const BUTTON_BASE_CLASS = 'finsemble-button-label';
class FinsembleButtonLabel extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
	constructor(props) {
		super(props);
	}
	render() {
		//Renders a buttonLabel with the appropriate classes.
		let classes = this.props.className || '';
		let align = this.props.align || 'left';
		let alignClassMap = {
			'left': 'finsemble-button-label-left',
			'right': 'finsemble-button-label-right'
		};
		let labelClass = alignClassMap[align];

		classes += ` ${BUTTON_BASE_CLASS} ${labelClass}`;
		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ draggable: this.props.draggable, onDragStart: this.props.onDragStart, onDragEnd: this.props.onDragEnd, className: classes },
			this.props.label
		);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FinsembleButtonLabel;


/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/

const MENU_BASE_CLASS = 'menu';
/**
 * Little helper just to set some defaults if the user passes in undefined values.
 *
 * @param {any} pad
 * @returns
 */
function Padding(pad) {
	let padding = {
		height: 0,
		width: 0
	};

	if (pad && pad.height) {
		padding.height = pad.height;
	}
	if (pad && pad.width) {
		padding.width = pad.width;
	}

	return padding;
}

class FinsembleMenu extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
	//Sets up the menu, adding listeners and necessary CSS Classes.
	constructor(props) {
		super(props);
		this.finWindow = fin.desktop.Window.getCurrent();
		this.state = {
			bounds: {
				height: 2000
			}
		};
		this.props = props;
		this.bindCorrectContext();
		this.padding = new Padding(this.props.padding);
		this.finWindow.updateOptions({
			alwaysOnTop: true
		});
		this.addListeners();
		document.body.className += ' Menu';
	}

	/**
     * Required to make `this` correct inside of these functions.
     *
     * @memberof FinsembleMenu
     */
	bindCorrectContext() {
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.hideMenu = this.hideMenu.bind(this);
		this.onWindowBlurred = this.onWindowBlurred.bind(this);
		this.onWindowShown = this.onWindowShown.bind(this);
		this.onCloseRequested = this.onCloseRequested.bind(this);
		this.onBeforeUnload = this.onBeforeUnload.bind(this);
		this.onBoundsChanged = this.onBoundsChanged.bind(this);
		this.addListeners = this.addListeners.bind(this);
		this.cacheBounds = this.cacheBounds.bind(this);
	}
	/**
     * Adds listeners that will handle page reloads, and the user pressing the escape key.
     *
     * @memberof FinsembleMenu
     */
	addListeners() {
		this.addFinWindowListeners();
		window.addEventListener('beforeunload', this.onBeforeUnload);
		document.body.addEventListener('keydown', this.handleKeyDown);
	}
	/**
     * Listen for openfin events.
     *
     * @memberof FinsembleMenu
     */
	addFinWindowListeners() {
		this.finWindow.addEventListener('blurred', this.onWindowBlurred);
		this.finWindow.addEventListener('shown', this.onWindowShown);
		this.finWindow.addEventListener('close-requested', this.onCloseRequested);
		this.finWindow.addEventListener('bounds-changed', this.onBoundsChanged);
	}
	/**
     * If the user presses escape while the window is visible, hide it.
     *
     * @param {any} e
     * @memberof FinsembleMenu
     */
	handleKeyDown(e) {
		if (e.code === 'Escape') {
			this.hideMenu();
		}
	}

	//hide.
	hideMenu() {
		this.finWindow.hide();
	}
	/**
     * Cache bounds so that on reload, we don't add padding again. This is just for development. We don't want our menus to keep getting fatter as `FSBL.Clients.WindowClient.fitToDOM` is called.
     *
     * @param {any} bounds
     * @memberof FinsembleMenu
     */
	onBoundsChanged(bounds) {
		this.setState({
			bounds: bounds
		});
	}

	/**
     * Before the page reloads, set its size to what it was when the page loaded. This is so that when the reload completes, and `FSBL.Clients.WindowClient.fitToDOM` is called, the menu will be the appropriate size. Also removes listeners that we added in the constructor.
     *
     * @memberof FinsembleMenu
     */
	onBeforeUnload() {
		let bounds = this.state.bounds;

		this.finWindow.setBounds(bounds.left, bounds.top, bounds.width - this.padding.width, bounds.height - this.padding.height);

		this.onCloseRequested();
	}
	/**
     * Cache bounds and focus on the window when it's shown.
     *
     * @memberof FinsembleMenu
     */
	onWindowShown() {
		this.finWindow.focus();
		this.cacheBounds();
	}
	/**
     * When the window is blurred, we hide the menu.
     *
     * @memberof FinsembleMenu
     */
	onWindowBlurred() {
		this.hideMenu();
	}

	/**
     * General cleanup.
     *
     * @memberof FinsembleMenu
     */
	onCloseRequested() {
		// this.finWindow.removeEventListener('close-requested', this.onCloseRequested);
		this.finWindow.removeEventListener('blurred', this.onWindowBlurred);
		this.finWindow.removeEventListener('shown', this.onWindowShown);
		this.finWindow.removeEventListener('bounds-changed', this.onBoundsChanged);
	}

	/**
     * Cache bounds so that before we reload the page, we can remove padding. This prevents fitToDom from forcing the window to grow and grow on subsequent reloads.
     *
     * @memberof FinsembleMenu
     */
	cacheBounds() {
		this.finWindow.getBounds(bounds => {
			console.log(bounds, 'cache');
			this.setState({
				bounds: bounds
			});
		});
	}
	/**
     * Calls fit to dom if the menu has padding on it.
     *
     * @memberof FinsembleMenu
     */
	componentDidMount() {
		if (this.padding) {
			FSBL.Clients.WindowClient.fitToDOM({
				padding: this.padding
			}, this.cacheBounds);
		}
	}
	render() {
		let classes = this.props.className || '';
		classes += ` ${MENU_BASE_CLASS}`;
		//Menus don't have scrollbars.
		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ style: { overflow: 'hidden' }, className: classes },
			this.props.children
		);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FinsembleMenu;


/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FinsembleMenuItemLabel_FinsembleMenuItemLabel__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FinsembleMenuItemActions_FinsembleMenuItemActions__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FinsembleMenuItemAction_FinsembleMenuItemAction__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__FinsembleFontIcon_FinsembleFontIcon__ = __webpack_require__(55);






const BUTTON_BASE_CLASS = 'menu-item';

/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/
class FinsembleMenuItem extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
	constructor(props) {
		super(props);
	}
	/**
  * Helper to validate properties and to throw errors if they're missing.
  *
  * @param {any} propName
  * @memberof Button
  */
	validateProp(propName) {
		if (typeof this.props[propName] === 'undefined') {
			throw new Error(`Missing Requeired Prop on FinsembleMenuItem: ${propName}`);
		}
	}
	/**
  * Loops through and calls validateProp.
  *
  * @param {any} arr
  * @memberof Button
  */
	validateProps(arr) {
		arr.forEach(propName => {
			this.validateProp(propName);
		});
	}

	render() {
		let classes = this.props.className || BUTTON_BASE_CLASS;
		if (classes !== BUTTON_BASE_CLASS) {
			//If you're unfamiliar with this syntax, it's equivalent to
			//classes+=' ' + BUTTON_BASE_CLASS;
			classes += ` ${BUTTON_BASE_CLASS}`;
		}

		let actions = null,
		    label = null,
		    actionItems = [];

		//add the trashcan icon.
		if (this.props.isDeletable) {
			this.validateProp('deleteAction');
			actionItems.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				__WEBPACK_IMPORTED_MODULE_3__FinsembleMenuItemAction_FinsembleMenuItemAction__["a" /* default */],
				{ key: 'delete', onClick: this.props.deleteAction },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__FinsembleFontIcon_FinsembleFontIcon__["a" /* default */], { icon: 'ff-delete' })
			));
		}

		//add the pin icon.
		if (this.props.isPinnable) {
			this.validateProps(['pinAction', 'isPinned']);
			//Add extra classes if the item is pinned.
			let pinIconClass = this.props.pinIcon || 'ff-pin';
			let activePinClass = this.props.activePinModifier || 'finsemble-item-pinned';
			let pinIcon = this.props.isPinned ? `${pinIconClass} ${activePinClass}` : pinIconClass;
			actionItems.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				__WEBPACK_IMPORTED_MODULE_3__FinsembleMenuItemAction_FinsembleMenuItemAction__["a" /* default */],
				{ key: 'pin', onClick: this.props.pinAction },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__FinsembleFontIcon_FinsembleFontIcon__["a" /* default */], { icon: pinIcon })
			));
		}

		//If we have a pin or deelte button, put them in the wrapper.
		if (actionItems.length) {
			actions = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				__WEBPACK_IMPORTED_MODULE_2__FinsembleMenuItemActions_FinsembleMenuItemActions__["a" /* default */],
				null,
				actionItems
			);
		}

		//If we have a label, set up the onClick and render the menuItemLabel.
		if (this.props.label) {
			label = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__FinsembleMenuItemLabel_FinsembleMenuItemLabel__["a" /* default */], {
				menuItemProps: this.props,
				draggable: this.props.draggable,
				onDragStart: this.props.onDragStart,
				onDrag: this.props.onDrag,
				onDragEnd: this.props.onDragEnd,
				onClick: this.props.onClick || this.props.onLabelClick,
				className: 'menu-item-label-fullwidth',
				label: this.props.label });
		}

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: classes },
			label,
			actions,
			this.props.children
		);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FinsembleMenuItem;


/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FinsembleButton_FinsembleButton__ = __webpack_require__(25);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/



class FinsembleMenuItemLabel extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			__WEBPACK_IMPORTED_MODULE_1__FinsembleButton_FinsembleButton__["a" /* default */],
			_extends({ buttonType: 'MenuItemLabel' }, this.props),
			this.props.children
		);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FinsembleMenuItemLabel;


/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FinsembleButton_FinsembleButton__ = __webpack_require__(25);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/

const BUTTON_BASE_CLASS = '';


class FinsembleMenuItemActions extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			__WEBPACK_IMPORTED_MODULE_1__FinsembleButton_FinsembleButton__["a" /* default */],
			_extends({ buttonType: 'MenuItemActions' }, this.props),
			this.props.children
		);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FinsembleMenuItemActions;


/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FinsembleButton_FinsembleButton__ = __webpack_require__(25);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/



const BUTTON_BASE_CLASS = 'menu-item-action';

class FinsembleMenuItemAction extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let classes = this.props.className || BUTTON_BASE_CLASS;
		if (classes !== BUTTON_BASE_CLASS) {
			//If you're unfamiliar with this syntax, it's equivalent to
			//classes+=' ' + BUTTON_BASE_CLASS;
			classes += ` ${BUTTON_BASE_CLASS}`;
		}
		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			__WEBPACK_IMPORTED_MODULE_1__FinsembleButton_FinsembleButton__["a" /* default */],
			_extends({}, this.props, { className: classes }),
			this.props.children
		);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FinsembleMenuItemAction;


/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FinsembleDraggable_FinsembleDraggable__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FinsembleDroppable_FinsembleDroppable__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FinsembleDnDContext_FinsembleDnDContext__ = __webpack_require__(89);
/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/





const SECTION_BASE_CLASS = 'menu-section';
function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0,
		    v = c === 'x' ? r : r & 0x3 | 0x8;
		return v.toString(16);
	});
}
class FinsembleMenuSection extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			bounds: {
				height: 0
			},
			sectionHeight: 0,
			maxHeight: typeof props.maxHeight !== undefined ? props.maxHeight : '100%'
		};
		this.wrapperReference = null;
		this.bindCorrectContext();
		this.finWindow = fin.desktop.Window.getCurrent();
		this.finWindow.addEventListener('shown', this.onWindowShown);
	}

	bindCorrectContext() {
		this.onBoundsChanged = this.onBoundsChanged.bind(this);
		this.onWindowShown = this.onWindowShown.bind(this);
		this.applySectionHeight = this.applySectionHeight.bind(this);
	}

	componentWillMount() {
		window.addEventListener('resize', this.onBoundsChanged);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onBoundsChanged);
	}

	onBoundsChanged() {
		this.finWindow.getBounds(bounds => {
			this.setState({
				bounds: bounds
			}, this.applySectionHeight);
		});
	}

	onWindowShown() {
		this.finWindow.focus();
	}
	componentDidUpdate() {
		this.applySectionHeight();
	}
	componentDidMount() {
		this.applySectionHeight();
	}
	applySectionHeight() {
		if (this.wrapperReference) {
			var height = this.getSectionHeight();
			if (!isNaN(height)) height = height + 'px';
			this.wrapperReference.setAttribute('style', `height:${height}`);
		}
	}
	/**
  * If the section is larger than the space allowed in the window, we cap it off to create a scrollbar.
  */
	getSectionHeight() {
		let windowFillHeight = this.state.bounds.height - this.wrapperReference.offsetTop;
		let sectionHeight = '100%';
		if (this.props.scrollable && this.wrapperReference) {
			//The maximum height is essentially the amount of real estate from the top of the element to the bottom of the window.
			sectionHeight = Array.from(this.wrapperReference.children).map(el => el.offsetHeight).reduce((accumulator, currentValue) => {
				return accumulator + currentValue;
			}, 0);

			if (sectionHeight > windowFillHeight) {
				sectionHeight = windowFillHeight;
			}
		}
		return sectionHeight;
	}

	render() {

		let classes = this.props.className || SECTION_BASE_CLASS;
		if (classes !== SECTION_BASE_CLASS) {
			//If you're unfamiliar with this syntax, it's equivalent to
			//classes+=' ' + SECTION_BASE_CLASS;
			classes += ` ${SECTION_BASE_CLASS}`;
		}
		let section = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ ref: el => {
					this.wrapperReference = el;
				}, className: classes },
			this.props.children
		);
		if (this.props.isArrangeable) {
			let children = __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.map(this.props.children, (child, i) => {
				let isDragDisabled = false;
				if (typeof child.props.isDragDisabled !== 'undefined') {
					isDragDisabled = child.props.isDragDisabled;
				}
				return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					__WEBPACK_IMPORTED_MODULE_1__FinsembleDraggable_FinsembleDraggable__["a" /* default */],
					{ isDragDisabled: isDragDisabled, draggableId: uuidv4(), index: i },
					child
				);
			});
			return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				__WEBPACK_IMPORTED_MODULE_3__FinsembleDnDContext_FinsembleDnDContext__["a" /* default */],
				{ onDragStart: this.props.onDragStart, onDragEnd: this.props.onDragEnd },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					__WEBPACK_IMPORTED_MODULE_2__FinsembleDroppable_FinsembleDroppable__["a" /* default */],
					{ droppableId: uuidv4(), direction: 'vertical' },
					children
				)
			);
		}
		return section;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FinsembleMenuSection;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(161), __esModule: true };

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(22) && !__webpack_require__(29)(function () {
  return Object.defineProperty(__webpack_require__(106)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(35);
var document = __webpack_require__(11).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(23);
var toObject = __webpack_require__(37);
var IE_PROTO = __webpack_require__(61)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(10);
var core = __webpack_require__(4);
var fails = __webpack_require__(29);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(168)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(110)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(65);
var $export = __webpack_require__(10);
var redefine = __webpack_require__(111);
var hide = __webpack_require__(27);
var has = __webpack_require__(23);
var Iterators = __webpack_require__(38);
var $iterCreate = __webpack_require__(169);
var setToStringTag = __webpack_require__(69);
var getPrototypeOf = __webpack_require__(107);
var ITERATOR = __webpack_require__(7)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(27);


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(23);
var toIObject = __webpack_require__(30);
var arrayIndexOf = __webpack_require__(171)(false);
var IE_PROTO = __webpack_require__(61)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(67);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(64);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(112);
var hiddenKeys = __webpack_require__(68).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(46);
var createDesc = __webpack_require__(36);
var toIObject = __webpack_require__(30);
var toPrimitive = __webpack_require__(59);
var has = __webpack_require__(23);
var IE8_DOM_DEFINE = __webpack_require__(105);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(22) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(120);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return __WEBPACK_IMPORTED_MODULE_0__createStore__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return __WEBPACK_IMPORTED_MODULE_1__combineReducers__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionCreators", function() { return __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "applyMiddleware", function() { return __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return __WEBPACK_IMPORTED_MODULE_4__compose__["a"]; });







/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  Object(__WEBPACK_IMPORTED_MODULE_5__utils_warning__["a" /* default */])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["b"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_symbol_observable__);



/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = observable, _ref2;
}

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(198);


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _memoizeOne = __webpack_require__(3);

var _memoizeOne2 = _interopRequireDefault(_memoizeOne);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _memoizeOne2.default)(function (displaced) {
  return displaced.reduce(function (map, displacement) {
    map[displacement.draggableId] = displacement;
    return map;
  }, {});
});

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isWithin = __webpack_require__(75);

var _isWithin2 = _interopRequireDefault(_isWithin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (frame) {
  var isWithinVertical = (0, _isWithin2.default)(frame.top, frame.bottom);
  var isWithinHorizontal = (0, _isWithin2.default)(frame.left, frame.right);

  return function (subject) {
    var isContained = isWithinVertical(subject.top) && isWithinVertical(subject.bottom) && isWithinHorizontal(subject.left) && isWithinHorizontal(subject.right);

    if (isContained) {
      return true;
    }

    var isPartiallyVisibleVertically = isWithinVertical(subject.top) || isWithinVertical(subject.bottom);
    var isPartiallyVisibleHorizontally = isWithinHorizontal(subject.left) || isWithinHorizontal(subject.right);

    var isPartiallyContained = isPartiallyVisibleVertically && isPartiallyVisibleHorizontally;

    if (isPartiallyContained) {
      return true;
    }

    var isBiggerVertically = subject.top < frame.top && subject.bottom > frame.bottom;
    var isBiggerHorizontally = subject.left < frame.left && subject.right > frame.right;

    var isTargetBiggerThanFrame = isBiggerVertically && isBiggerHorizontally;

    if (isTargetBiggerThanFrame) {
      return true;
    }

    var isTargetBiggerOnOneAxis = isBiggerVertically && isPartiallyVisibleHorizontally || isBiggerHorizontally && isPartiallyVisibleVertically;

    return isTargetBiggerOnOneAxis;
  };
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _position = __webpack_require__(2);

var _spacing = __webpack_require__(40);

var _isPartiallyVisible = __webpack_require__(76);

var _isPartiallyVisible2 = _interopRequireDefault(_isPartiallyVisible);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var draggable = _ref.draggable,
      destination = _ref.destination,
      newCenter = _ref.newCenter,
      viewport = _ref.viewport;

  var diff = (0, _position.subtract)(newCenter, draggable.page.withMargin.center);
  var shifted = (0, _spacing.offset)(draggable.page.withMargin, diff);

  return (0, _isPartiallyVisible2.default)({
    target: shifted,
    destination: destination,
    viewport: viewport
  });
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.css = exports.physics = undefined;

var _extends2 = __webpack_require__(24);

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var physics = exports.physics = function () {
  var base = {
    stiffness: 1000,
    damping: 60,

    precision: 0.99
  };

  var standard = (0, _extends3.default)({}, base);

  var fast = (0, _extends3.default)({}, base, {
    stiffness: base.stiffness * 2
  });

  return { standard: standard, fast: fast };
}();

var css = exports.css = {
  outOfTheWay: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)'
};

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lift = exports.dropAnimationFinished = exports.cancel = exports.drop = exports.completeDrop = exports.prepare = exports.clean = exports.crossAxisMoveBackward = exports.crossAxisMoveForward = exports.moveForward = exports.moveBackward = exports.moveByWindowScroll = exports.move = exports.updateDroppableDimensionIsEnabled = exports.updateDroppableDimensionScroll = exports.publishDroppableDimensions = exports.publishDraggableDimensions = exports.completeLift = exports.requestDimensions = undefined;

var _noImpact = __webpack_require__(48);

var _noImpact2 = _interopRequireDefault(_noImpact);

var _getNewHomeClientCenter = __webpack_require__(249);

var _getNewHomeClientCenter2 = _interopRequireDefault(_getNewHomeClientCenter);

var _position = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var origin = { x: 0, y: 0 };

var getScrollDiff = function getScrollDiff(_ref) {
  var initial = _ref.initial,
      current = _ref.current,
      droppable = _ref.droppable;

  var windowScrollDiff = (0, _position.subtract)(initial.windowScroll, current.windowScroll);

  var droppableScrollDiff = droppable ? droppable.viewport.frameScroll.diff.displacement : origin;

  return (0, _position.add)(windowScrollDiff, droppableScrollDiff);
};

var requestDimensions = exports.requestDimensions = function requestDimensions(id) {
  return {
    type: 'REQUEST_DIMENSIONS',
    payload: id
  };
};

var completeLift = exports.completeLift = function completeLift(id, client, windowScroll, isScrollAllowed) {
  return {
    type: 'COMPLETE_LIFT',
    payload: {
      id: id,
      client: client,
      windowScroll: windowScroll,
      isScrollAllowed: isScrollAllowed
    }
  };
};

var publishDraggableDimensions = exports.publishDraggableDimensions = function publishDraggableDimensions(dimensions) {
  return {
    type: 'PUBLISH_DRAGGABLE_DIMENSIONS',
    payload: dimensions
  };
};

var publishDroppableDimensions = exports.publishDroppableDimensions = function publishDroppableDimensions(dimensions) {
  return {
    type: 'PUBLISH_DROPPABLE_DIMENSIONS',
    payload: dimensions
  };
};

var updateDroppableDimensionScroll = exports.updateDroppableDimensionScroll = function updateDroppableDimensionScroll(id, offset) {
  return {
    type: 'UPDATE_DROPPABLE_DIMENSION_SCROLL',
    payload: {
      id: id,
      offset: offset
    }
  };
};

var updateDroppableDimensionIsEnabled = exports.updateDroppableDimensionIsEnabled = function updateDroppableDimensionIsEnabled(id, isEnabled) {
  return {
    type: 'UPDATE_DROPPABLE_DIMENSION_IS_ENABLED',
    payload: {
      id: id,
      isEnabled: isEnabled
    }
  };
};

var move = exports.move = function move(id, client, windowScroll) {
  return {
    type: 'MOVE',
    payload: {
      id: id,
      client: client,
      windowScroll: windowScroll
    }
  };
};

var moveByWindowScroll = exports.moveByWindowScroll = function moveByWindowScroll(id, windowScroll) {
  return {
    type: 'MOVE_BY_WINDOW_SCROLL',
    payload: {
      id: id,
      windowScroll: windowScroll
    }
  };
};

var moveBackward = exports.moveBackward = function moveBackward(id) {
  return {
    type: 'MOVE_BACKWARD',
    payload: id
  };
};

var moveForward = exports.moveForward = function moveForward(id) {
  return {
    type: 'MOVE_FORWARD',
    payload: id
  };
};

var crossAxisMoveForward = exports.crossAxisMoveForward = function crossAxisMoveForward(id) {
  return {
    type: 'CROSS_AXIS_MOVE_FORWARD',
    payload: id
  };
};

var crossAxisMoveBackward = exports.crossAxisMoveBackward = function crossAxisMoveBackward(id) {
  return {
    type: 'CROSS_AXIS_MOVE_BACKWARD',
    payload: id
  };
};

var clean = exports.clean = function clean() {
  return {
    type: 'CLEAN',
    payload: null
  };
};

var prepare = exports.prepare = function prepare() {
  return {
    type: 'PREPARE',
    payload: null
  };
};

var animateDrop = function animateDrop(_ref2) {
  var trigger = _ref2.trigger,
      newHomeOffset = _ref2.newHomeOffset,
      impact = _ref2.impact,
      result = _ref2.result;
  return {
    type: 'DROP_ANIMATE',
    payload: {
      trigger: trigger,
      newHomeOffset: newHomeOffset,
      impact: impact,
      result: result
    }
  };
};

var completeDrop = exports.completeDrop = function completeDrop(result) {
  return {
    type: 'DROP_COMPLETE',
    payload: result
  };
};

var drop = exports.drop = function drop() {
  return function (dispatch, getState) {
    var state = getState();

    if (state.phase === 'PREPARING' || state.phase === 'COLLECTING_INITIAL_DIMENSIONS') {
      dispatch(clean());
      return;
    }

    if (state.phase !== 'DRAGGING') {
      console.error('not able to drop in phase: \'' + state.phase + '\'');
      dispatch(clean());
      return;
    }

    if (!state.drag) {
      console.error('not able to drop when there is invalid drag state', state);
      dispatch(clean());
      return;
    }

    var _state$drag = state.drag,
        impact = _state$drag.impact,
        initial = _state$drag.initial,
        current = _state$drag.current;

    var descriptor = initial.descriptor;
    var draggable = state.dimension.draggable[initial.descriptor.id];
    var home = state.dimension.droppable[draggable.descriptor.droppableId];
    var destination = impact.destination ? state.dimension.droppable[impact.destination.droppableId] : null;

    var source = {
      droppableId: descriptor.droppableId,
      index: descriptor.index
    };

    var result = {
      draggableId: descriptor.id,
      type: home.descriptor.type,
      source: source,
      destination: impact.destination
    };

    var newCenter = (0, _getNewHomeClientCenter2.default)({
      movement: impact.movement,
      draggable: draggable,
      draggables: state.dimension.draggable,
      destination: destination
    });

    var clientOffset = (0, _position.subtract)(newCenter, draggable.client.withMargin.center);
    var scrollDiff = getScrollDiff({
      initial: initial,
      current: current,
      droppable: destination || home
    });
    var newHomeOffset = (0, _position.add)(clientOffset, scrollDiff);

    var isAnimationRequired = !(0, _position.isEqual)(current.client.offset, newHomeOffset);

    if (!isAnimationRequired) {
      dispatch(completeDrop(result));
      return;
    }

    dispatch(animateDrop({
      trigger: 'DROP',
      newHomeOffset: newHomeOffset,
      impact: impact,
      result: result
    }));
  };
};

var cancel = exports.cancel = function cancel() {
  return function (dispatch, getState) {
    var state = getState();

    if (state.phase !== 'DRAGGING') {
      dispatch(clean());
      return;
    }

    if (!state.drag) {
      console.error('invalid drag state', state);
      dispatch(clean());
      return;
    }

    var _state$drag2 = state.drag,
        initial = _state$drag2.initial,
        current = _state$drag2.current;

    var descriptor = initial.descriptor;
    var home = state.dimension.droppable[descriptor.droppableId];

    var source = {
      index: descriptor.index,
      droppableId: descriptor.droppableId
    };

    var result = {
      draggableId: descriptor.id,
      type: home.descriptor.type,
      source: source,

      destination: null
    };

    var isAnimationRequired = !(0, _position.isEqual)(current.client.offset, origin);

    if (!isAnimationRequired) {
      dispatch(completeDrop(result));
      return;
    }

    var scrollDiff = getScrollDiff({ initial: initial, current: current, droppable: home });

    dispatch(animateDrop({
      trigger: 'CANCEL',
      newHomeOffset: scrollDiff,
      impact: _noImpact2.default,
      result: result
    }));
  };
};

var dropAnimationFinished = exports.dropAnimationFinished = function dropAnimationFinished() {
  return function (dispatch, getState) {
    var state = getState();

    if (state.phase !== 'DROP_ANIMATING') {
      console.error('cannot end drop that is no longer animating', state);
      dispatch(clean());
      return;
    }

    if (!state.drop || !state.drop.pending) {
      console.error('cannot end drop that has no pending state', state);
      dispatch(clean());
      return;
    }

    dispatch(completeDrop(state.drop.pending.result));
  };
};

var lift = exports.lift = function lift(id, client, windowScroll, isScrollAllowed) {
  return function (dispatch, getState) {
    var initial = getState();

    if (initial.phase === 'DROP_ANIMATING') {
      if (!initial.drop || !initial.drop.pending) {
        console.error('cannot flush drop animation if there is no pending');
        dispatch(clean());
      } else {
        dispatch(completeDrop(initial.drop.pending.result));
      }
    }

    dispatch(prepare());

    setTimeout(function () {
      var state = getState();

      if (state.phase !== 'PREPARING') {
        return;
      }

      dispatch(requestDimensions(id));

      setTimeout(function () {
        var newState = getState();

        if (newState.phase !== 'COLLECTING_INITIAL_DIMENSIONS') {
          return;
        }

        dispatch(completeLift(id, client, windowScroll, isScrollAllowed));
      });
    });
  };
};

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Provider__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_connectAdvanced__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__connect_connect__ = __webpack_require__(255);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Provider", function() { return __WEBPACK_IMPORTED_MODULE_0__components_Provider__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createProvider", function() { return __WEBPACK_IMPORTED_MODULE_0__components_Provider__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "connectAdvanced", function() { return __WEBPACK_IMPORTED_MODULE_1__components_connectAdvanced__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "connect", function() { return __WEBPACK_IMPORTED_MODULE_2__connect_connect__["a"]; });






/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return subscriptionShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return storeShape; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);


var subscriptionShape = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.shape({
  trySubscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  tryUnsubscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  notifyNestedSubs: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  isSubscribed: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired
});

var storeShape = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.shape({
  subscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  dispatch: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  getState: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired
});

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = connectAdvanced;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hoist_non_react_statics__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hoist_non_react_statics___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_hoist_non_react_statics__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_Subscription__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_PropTypes__ = __webpack_require__(128);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }








var hotReloadingVersion = 0;
var dummyState = {};
function noop() {}
function makeSelectorStateful(sourceSelector, store) {
  // wrap the selector in an object that tracks its results between runs.
  var selector = {
    run: function runComponentSelector(props) {
      try {
        var nextProps = sourceSelector(store.getState(), props);
        if (nextProps !== selector.props || selector.error) {
          selector.shouldComponentUpdate = true;
          selector.props = nextProps;
          selector.error = null;
        }
      } catch (error) {
        selector.shouldComponentUpdate = true;
        selector.error = error;
      }
    }
  };

  return selector;
}

function connectAdvanced(
/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
     export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory) {
  var _contextTypes, _childContextTypes;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$getDisplayName = _ref.getDisplayName,
      getDisplayName = _ref$getDisplayName === undefined ? function (name) {
    return 'ConnectAdvanced(' + name + ')';
  } : _ref$getDisplayName,
      _ref$methodName = _ref.methodName,
      methodName = _ref$methodName === undefined ? 'connectAdvanced' : _ref$methodName,
      _ref$renderCountProp = _ref.renderCountProp,
      renderCountProp = _ref$renderCountProp === undefined ? undefined : _ref$renderCountProp,
      _ref$shouldHandleStat = _ref.shouldHandleStateChanges,
      shouldHandleStateChanges = _ref$shouldHandleStat === undefined ? true : _ref$shouldHandleStat,
      _ref$storeKey = _ref.storeKey,
      storeKey = _ref$storeKey === undefined ? 'store' : _ref$storeKey,
      _ref$withRef = _ref.withRef,
      withRef = _ref$withRef === undefined ? false : _ref$withRef,
      connectOptions = _objectWithoutProperties(_ref, ['getDisplayName', 'methodName', 'renderCountProp', 'shouldHandleStateChanges', 'storeKey', 'withRef']);

  var subscriptionKey = storeKey + 'Subscription';
  var version = hotReloadingVersion++;

  var contextTypes = (_contextTypes = {}, _contextTypes[storeKey] = __WEBPACK_IMPORTED_MODULE_4__utils_PropTypes__["a" /* storeShape */], _contextTypes[subscriptionKey] = __WEBPACK_IMPORTED_MODULE_4__utils_PropTypes__["b" /* subscriptionShape */], _contextTypes);
  var childContextTypes = (_childContextTypes = {}, _childContextTypes[subscriptionKey] = __WEBPACK_IMPORTED_MODULE_4__utils_PropTypes__["b" /* subscriptionShape */], _childContextTypes);

  return function wrapWithConnect(WrappedComponent) {
    __WEBPACK_IMPORTED_MODULE_1_invariant___default()(typeof WrappedComponent == 'function', 'You must pass a component to the function returned by ' + ('connect. Instead received ' + JSON.stringify(WrappedComponent)));

    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    var displayName = getDisplayName(wrappedComponentName);

    var selectorFactoryOptions = _extends({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      withRef: withRef,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent
    });

    var Connect = function (_Component) {
      _inherits(Connect, _Component);

      function Connect(props, context) {
        _classCallCheck(this, Connect);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.version = version;
        _this.state = {};
        _this.renderCount = 0;
        _this.store = props[storeKey] || context[storeKey];
        _this.propsMode = Boolean(props[storeKey]);
        _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);

        __WEBPACK_IMPORTED_MODULE_1_invariant___default()(_this.store, 'Could not find "' + storeKey + '" in either the context or props of ' + ('"' + displayName + '". Either wrap the root component in a <Provider>, ') + ('or explicitly pass "' + storeKey + '" as a prop to "' + displayName + '".'));

        _this.initSelector();
        _this.initSubscription();
        return _this;
      }

      Connect.prototype.getChildContext = function getChildContext() {
        var _ref2;

        // If this component received store from props, its subscription should be transparent
        // to any descendants receiving store+subscription from context; it passes along
        // subscription passed to it. Otherwise, it shadows the parent subscription, which allows
        // Connect to control ordering of notifications to flow top-down.
        var subscription = this.propsMode ? null : this.subscription;
        return _ref2 = {}, _ref2[subscriptionKey] = subscription || this.context[subscriptionKey], _ref2;
      };

      Connect.prototype.componentDidMount = function componentDidMount() {
        if (!shouldHandleStateChanges) return;

        // componentWillMount fires during server side rendering, but componentDidMount and
        // componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount.
        // Otherwise, unsubscription would never take place during SSR, causing a memory leak.
        // To handle the case where a child component may have triggered a state change by
        // dispatching an action in its componentWillMount, we have to re-run the select and maybe
        // re-render.
        this.subscription.trySubscribe();
        this.selector.run(this.props);
        if (this.selector.shouldComponentUpdate) this.forceUpdate();
      };

      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.selector.run(nextProps);
      };

      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        return this.selector.shouldComponentUpdate;
      };

      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.subscription) this.subscription.tryUnsubscribe();
        this.subscription = null;
        this.notifyNestedSubs = noop;
        this.store = null;
        this.selector.run = noop;
        this.selector.shouldComponentUpdate = false;
      };

      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
        __WEBPACK_IMPORTED_MODULE_1_invariant___default()(withRef, 'To access the wrapped instance, you need to specify ' + ('{ withRef: true } in the options argument of the ' + methodName + '() call.'));
        return this.wrappedInstance;
      };

      Connect.prototype.setWrappedInstance = function setWrappedInstance(ref) {
        this.wrappedInstance = ref;
      };

      Connect.prototype.initSelector = function initSelector() {
        var sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions);
        this.selector = makeSelectorStateful(sourceSelector, this.store);
        this.selector.run(this.props);
      };

      Connect.prototype.initSubscription = function initSubscription() {
        if (!shouldHandleStateChanges) return;

        // parentSub's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.
        var parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey];
        this.subscription = new __WEBPACK_IMPORTED_MODULE_3__utils_Subscription__["a" /* default */](this.store, parentSub, this.onStateChange.bind(this));

        // `notifyNestedSubs` is duplicated to handle the case where the component is  unmounted in
        // the middle of the notification loop, where `this.subscription` will then be null. An
        // extra null check every change can be avoided by copying the method onto `this` and then
        // replacing it with a no-op on unmount. This can probably be avoided if Subscription's
        // listeners logic is changed to not call listeners that have been unsubscribed in the
        // middle of the notification loop.
        this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
      };

      Connect.prototype.onStateChange = function onStateChange() {
        this.selector.run(this.props);

        if (!this.selector.shouldComponentUpdate) {
          this.notifyNestedSubs();
        } else {
          this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
          this.setState(dummyState);
        }
      };

      Connect.prototype.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate() {
        // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
        // needs to notify nested subs. Once called, it unimplements itself until further state
        // changes occur. Doing it this way vs having a permanent `componentDidUpdate` that does
        // a boolean check every time avoids an extra method call most of the time, resulting
        // in some perf boost.
        this.componentDidUpdate = undefined;
        this.notifyNestedSubs();
      };

      Connect.prototype.isSubscribed = function isSubscribed() {
        return Boolean(this.subscription) && this.subscription.isSubscribed();
      };

      Connect.prototype.addExtraProps = function addExtraProps(props) {
        if (!withRef && !renderCountProp && !(this.propsMode && this.subscription)) return props;
        // make a shallow copy so that fields added don't leak to the original selector.
        // this is especially important for 'ref' since that's a reference back to the component
        // instance. a singleton memoized selector would then be holding a reference to the
        // instance, preventing the instance from being garbage collected, and that would be bad
        var withExtras = _extends({}, props);
        if (withRef) withExtras.ref = this.setWrappedInstance;
        if (renderCountProp) withExtras[renderCountProp] = this.renderCount++;
        if (this.propsMode && this.subscription) withExtras[subscriptionKey] = this.subscription;
        return withExtras;
      };

      Connect.prototype.render = function render() {
        var selector = this.selector;
        selector.shouldComponentUpdate = false;

        if (selector.error) {
          throw selector.error;
        } else {
          return Object(__WEBPACK_IMPORTED_MODULE_2_react__["createElement"])(WrappedComponent, this.addExtraProps(selector.props));
        }
      };

      return Connect;
    }(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);

    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = displayName;
    Connect.childContextTypes = childContextTypes;
    Connect.contextTypes = contextTypes;
    Connect.propTypes = contextTypes;

    if (process.env.NODE_ENV !== 'production') {
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        var _this2 = this;

        // We are hot reloading!
        if (this.version !== version) {
          this.version = version;
          this.initSelector();

          // If any connected descendants don't hot reload (and resubscribe in the process), their
          // listeners will be lost when we unsubscribe. Unfortunately, by copying over all
          // listeners, this does mean that the old versions of connected descendants will still be
          // notified of state changes; however, their onStateChange function is a no-op so this
          // isn't a huge deal.
          var oldListeners = [];

          if (this.subscription) {
            oldListeners = this.subscription.listeners.get();
            this.subscription.tryUnsubscribe();
          }
          this.initSubscription();
          if (shouldHandleStateChanges) {
            this.subscription.trySubscribe();
            oldListeners.forEach(function (listener) {
              return _this2.subscription.listeners.subscribe(listener);
            });
          }
        }
      };
    }

    return __WEBPACK_IMPORTED_MODULE_0_hoist_non_react_statics___default()(Connect, WrappedComponent);
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = wrapMapToPropsConstant;
/* unused harmony export getDependsOnOwnProps */
/* harmony export (immutable) */ __webpack_exports__["b"] = wrapMapToPropsFunc;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_verifyPlainObject__ = __webpack_require__(132);


function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);

    function constantSelector() {
      return constant;
    }
    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
}

// dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
// 
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..
function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
}

// Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
// 
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//    
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//    
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//    
function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;

    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    };

    // allow detectFactoryAndVerify to get ownProps
    proxy.dependsOnOwnProps = true;

    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);

      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }

      if (process.env.NODE_ENV !== 'production') Object(__WEBPACK_IMPORTED_MODULE_0__utils_verifyPlainObject__["a" /* default */])(props, displayName, methodName);

      return props;
    };

    return proxy;
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = verifyPlainObject;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__warning__ = __webpack_require__(77);



function verifyPlainObject(value, displayName, methodName) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(value)) {
    Object(__WEBPACK_IMPORTED_MODULE_1__warning__["a" /* default */])(methodName + '() in ' + displayName + ' must return a plain object. Instead received ' + value + '.');
  }
}

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (fn) {
  var lastArgs = [];
  var frameId = null;

  var wrapperFn = function wrapperFn() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    lastArgs = args;

    if (frameId) {
      return frameId;
    }

    frameId = requestAnimationFrame(function () {
      frameId = null;
      fn.apply(undefined, _toConsumableArray(lastArgs));
    });

    return frameId;
  };

  wrapperFn.cancel = function () {
    if (!frameId) {
      return;
    }

    cancelAnimationFrame(frameId);
    frameId = null;
  };

  var resultFn = wrapperFn;

  return resultFn;
};

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _placeholder = __webpack_require__(267);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_placeholder).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = {
  noWobble: { stiffness: 170, damping: 26 }, // the default, if nothing provided
  gentle: { stiffness: 120, damping: 14 },
  wobbly: { stiffness: 180, damping: 12 },
  stiff: { stiffness: 210, damping: 20 }
};
module.exports = exports["default"];

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keyCodes = __webpack_require__(87);

var keyCodes = _interopRequireWildcard(_keyCodes);

var _stopEvent = __webpack_require__(51);

var _stopEvent2 = _interopRequireDefault(_stopEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var blocked = [keyCodes.enter, keyCodes.tab];

exports.default = function (event) {
  if (blocked.indexOf(event.keyCode) >= 0) {
    (0, _stopEvent2.default)(event);
  }
};

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getArea = __webpack_require__(31);

var _getArea2 = _interopRequireDefault(_getArea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (el) {
  return (0, _getArea2.default)(el.getBoundingClientRect()).center;
};

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FinsembleButton_FinsembleButton__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FinsembleButtonLabel_FinsembleButtonLabel__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FinsembleDialog_FinsembleDialog__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FinsembleDialogButton_FinsembleDialogButton__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__FinsembleDialogQuestion_FinsembleDialogQuestion__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__FinsembleDialogTextInput_FinsembleDialogTextInput__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__FinsembleFontIcon_FinsembleFontIcon__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__FinsembleMenu_FinsembleMenu__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__FinsembleMenuItem_FinsembleMenuItem__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__FinsembleMenuItemAction_FinsembleMenuItemAction__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__FinsembleMenuItemActions_FinsembleMenuItemActions__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__FinsembleMenuItemLabel_FinsembleMenuItemLabel__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__FinsembleMenuSection_FinsembleMenuSection__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__FinsembleMenuSectionLabel_FinsembleMenuSectionLabel__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__FinsembleOverflowMenu_FinsembleOverflowMenu__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__FinsembleToolbar_FinsembleToolbar__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__FinsembleToolbarSection_FinsembleToolbarSection__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__FinsembleToolbarSeparator_FinsembleToolbarSeparator__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__FinsembleDnDContext_FinsembleDnDContext__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__FinsembleDraggable_FinsembleDraggable__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__FinsembleDroppable_FinsembleDroppable__ = __webpack_require__(88);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FinsembleButton", function() { return __WEBPACK_IMPORTED_MODULE_0__FinsembleButton_FinsembleButton__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FinsembleButtonLabel", function() { return __WEBPACK_IMPORTED_MODULE_1__FinsembleButtonLabel_FinsembleButtonLabel__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FinsembleDialog", function() { return __WEBPACK_IMPORTED_MODULE_2__FinsembleDialog_FinsembleDialog__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FinsembleDialogButton", function() { return __WEBPACK_IMPORTED_MODULE_3__FinsembleDialogButton_FinsembleDialogButton__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FinsembleDialogQuestion", function() { return __WEBPACK_IMPORTED_MODULE_4__FinsembleDialogQuestion_FinsembleDialogQuestion__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FinsembleDialogTextInput", function() { return __WEBPACK_IMPORTED_MODULE_5__FinsembleDialogTextInput_FinsembleDialogTextInput__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FinsembleFontIcon", function() { return __WEBPACK_IMPORTED_MODULE_6__FinsembleFontIcon_FinsembleFontIcon__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FinsembleMenu", function() { return __WEBPACK_IMPORTED_MODULE_7__FinsembleMenu_FinsembleMenu__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FinsembleMenuItem", function() { return __WEBPACK_IMPORTED_MODULE_8__FinsembleMenuItem_FinsembleMenuItem__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FinsembleMenuItemAction", function() { return __WEBPACK_IMPORTED_MODULE_9__FinsembleMenuItemAction_FinsembleMenuItemAction__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FinsembleMenuItemActions", function() { return __WEBPACK_IMPORTED_MODULE_10__FinsembleMenuItemActions_FinsembleMenuItemActions__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FinsembleMenuItemLabel", function() { return __WEBPACK_IMPORTED_MODULE_11__FinsembleMenuItemLabel_FinsembleMenuItemLabel__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FinsembleMenuSection", function() { return __WEBPACK_IMPORTED_MODULE_12__FinsembleMenuSection_FinsembleMenuSection__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FinsembleMenuSectionLabel", function() { return __WEBPACK_IMPORTED_MODULE_13__FinsembleMenuSectionLabel_FinsembleMenuSectionLabel__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FinsembleOverflowMenu", function() { return __WEBPACK_IMPORTED_MODULE_14__FinsembleOverflowMenu_FinsembleOverflowMenu__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FinsembleToolbar", function() { return __WEBPACK_IMPORTED_MODULE_15__FinsembleToolbar_FinsembleToolbar__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FinsembleToolbarSection", function() { return __WEBPACK_IMPORTED_MODULE_16__FinsembleToolbarSection_FinsembleToolbarSection__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FinsembleToolbarSeparator", function() { return __WEBPACK_IMPORTED_MODULE_17__FinsembleToolbarSeparator_FinsembleToolbarSeparator__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FinsembleDnDContext", function() { return __WEBPACK_IMPORTED_MODULE_18__FinsembleDnDContext_FinsembleDnDContext__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FinsembleDraggable", function() { return __WEBPACK_IMPORTED_MODULE_19__FinsembleDraggable_FinsembleDraggable__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FinsembleDroppable", function() { return __WEBPACK_IMPORTED_MODULE_20__FinsembleDroppable_FinsembleDroppable__["a"]; });























/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _assign = __webpack_require__(34);

var ReactBaseClasses = __webpack_require__(90);
var ReactChildren = __webpack_require__(140);
var ReactDOMFactories = __webpack_require__(144);
var ReactElement = __webpack_require__(21);
var ReactPropTypes = __webpack_require__(148);
var ReactVersion = __webpack_require__(151);

var createReactClass = __webpack_require__(152);
var onlyChild = __webpack_require__(154);

var createElement = ReactElement.createElement;
var createFactory = ReactElement.createFactory;
var cloneElement = ReactElement.cloneElement;

if (process.env.NODE_ENV !== 'production') {
  var lowPriorityWarning = __webpack_require__(52);
  var canDefineProperty = __webpack_require__(43);
  var ReactElementValidator = __webpack_require__(95);
  var didWarnPropTypesDeprecated = false;
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

var __spread = _assign;
var createMixin = function (mixin) {
  return mixin;
};

if (process.env.NODE_ENV !== 'production') {
  var warnedForSpread = false;
  var warnedForCreateMixin = false;
  __spread = function () {
    lowPriorityWarning(warnedForSpread, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.');
    warnedForSpread = true;
    return _assign.apply(null, arguments);
  };

  createMixin = function (mixin) {
    lowPriorityWarning(warnedForCreateMixin, 'React.createMixin is deprecated and should not be used. ' + 'In React v16.0, it will be removed. ' + 'You can use this mixin directly instead. ' + 'See https://fb.me/createmixin-was-never-implemented for more info.');
    warnedForCreateMixin = true;
    return mixin;
  };
}

var React = {
  // Modern

  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild
  },

  Component: ReactBaseClasses.Component,
  PureComponent: ReactBaseClasses.PureComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement.isValidElement,

  // Classic

  PropTypes: ReactPropTypes,
  createClass: createReactClass,
  createFactory: createFactory,
  createMixin: createMixin,

  // This looks DOM specific but these are actually isomorphic helpers
  // since they are just generating DOM strings.
  DOM: ReactDOMFactories,

  version: ReactVersion,

  // Deprecated hook for JSX spread, don't use this for anything.
  __spread: __spread
};

if (process.env.NODE_ENV !== 'production') {
  var warnedForCreateClass = false;
  if (canDefineProperty) {
    Object.defineProperty(React, 'PropTypes', {
      get: function () {
        lowPriorityWarning(didWarnPropTypesDeprecated, 'Accessing PropTypes via the main React package is deprecated,' + ' and will be removed in  React v16.0.' + ' Use the latest available v15.* prop-types package from npm instead.' + ' For info on usage, compatibility, migration and more, see ' + 'https://fb.me/prop-types-docs');
        didWarnPropTypesDeprecated = true;
        return ReactPropTypes;
      }
    });

    Object.defineProperty(React, 'createClass', {
      get: function () {
        lowPriorityWarning(warnedForCreateClass, 'Accessing createClass via the main React package is deprecated,' + ' and will be removed in React v16.0.' + " Use a plain JavaScript class instead. If you're not yet " + 'ready to migrate, create-react-class v15.* is available ' + 'on npm as a temporary, drop-in replacement. ' + 'For more info see https://fb.me/react-create-class');
        warnedForCreateClass = true;
        return createReactClass;
      }
    });
  }

  // React.DOM factories are deprecated. Wrap these methods so that
  // invocations of the React.DOM namespace and alert users to switch
  // to the `react-dom-factories` package.
  React.DOM = {};
  var warnedForFactories = false;
  Object.keys(ReactDOMFactories).forEach(function (factory) {
    React.DOM[factory] = function () {
      if (!warnedForFactories) {
        lowPriorityWarning(false, 'Accessing factories like React.DOM.%s has been deprecated ' + 'and will be removed in v16.0+. Use the ' + 'react-dom-factories package instead. ' + ' Version 1.0 provides a drop-in replacement.' + ' For more info, see https://fb.me/react-dom-factories', factory);
        warnedForFactories = true;
      }
      return ReactDOMFactories[factory].apply(ReactDOMFactories, arguments);
    };
  });
}

module.exports = React;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var PooledClass = __webpack_require__(141);
var ReactElement = __webpack_require__(21);

var emptyFunction = __webpack_require__(42);
var traverseAllChildren = __webpack_require__(142);

var twoArgumentPooler = PooledClass.twoArgumentPooler;
var fourArgumentPooler = PooledClass.fourArgumentPooler;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
ForEachBookKeeping.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
MapBookKeeping.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement.isValidElement(mappedChild)) {
      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

function forEachSingleChildDummy(traverseContext, child, name) {
  return null;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, forEachSingleChildDummy, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
  count: countChildren,
  toArray: toArray
};

module.exports = ReactChildren;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



var _prodInvariant = __webpack_require__(26);

var invariant = __webpack_require__(6);

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler
};

module.exports = PooledClass;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _prodInvariant = __webpack_require__(26);

var ReactCurrentOwner = __webpack_require__(44);
var REACT_ELEMENT_TYPE = __webpack_require__(93);

var getIteratorFn = __webpack_require__(94);
var invariant = __webpack_require__(6);
var KeyEscapeUtils = __webpack_require__(143);
var warning = __webpack_require__(8);

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * This is inlined from ReactElement since this file is shared between
 * isomorphic and renderers. We could extract this to a
 *
 */

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (component && typeof component === 'object' && component.key != null) {
    // Explicit key
    return KeyEscapeUtils.escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' ||
  // The following is inlined from ReactElement. This means we can optimize
  // some checks. React Fiber also inlines this logic for similar purposes.
  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (iteratorFn) {
      var iterator = iteratorFn.call(children);
      var step;
      if (iteratorFn !== children.entries) {
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        if (process.env.NODE_ENV !== 'production') {
          var mapsAsChildrenAddendum = '';
          if (ReactCurrentOwner.current) {
            var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
            if (mapsAsChildrenOwnerName) {
              mapsAsChildrenAddendum = ' Check the render method of `' + mapsAsChildrenOwnerName + '`.';
            }
          }
          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.%s', mapsAsChildrenAddendum) : void 0;
          didWarnAboutMaps = true;
        }
        // Iterator will provide entry [k,v] tuples rather than values.
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        }
      }
    } else if (type === 'object') {
      var addendum = '';
      if (process.env.NODE_ENV !== 'production') {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
        if (children._isReactElement) {
          addendum = " It looks like you're using an element created by a different " + 'version of React. Make sure to use only one copy of React.';
        }
        if (ReactCurrentOwner.current) {
          var name = ReactCurrentOwner.current.getName();
          if (name) {
            addendum += ' Check the render method of `' + name + '`.';
          }
        }
      }
      var childrenString = String(children);
       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

module.exports = traverseAllChildren;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
function unescape(key) {
  var unescapeRegex = /(=0|=2)/g;
  var unescaperLookup = {
    '=0': '=',
    '=2': ':'
  };
  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

  return ('' + keySubstring).replace(unescapeRegex, function (match) {
    return unescaperLookup[match];
  });
}

var KeyEscapeUtils = {
  escape: escape,
  unescape: unescape
};

module.exports = KeyEscapeUtils;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var ReactElement = __webpack_require__(21);

/**
 * Create a factory that creates HTML tag elements.
 *
 * @private
 */
var createDOMFactory = ReactElement.createFactory;
if (process.env.NODE_ENV !== 'production') {
  var ReactElementValidator = __webpack_require__(95);
  createDOMFactory = ReactElementValidator.createFactory;
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 *
 * @public
 */
var ReactDOMFactories = {
  a: createDOMFactory('a'),
  abbr: createDOMFactory('abbr'),
  address: createDOMFactory('address'),
  area: createDOMFactory('area'),
  article: createDOMFactory('article'),
  aside: createDOMFactory('aside'),
  audio: createDOMFactory('audio'),
  b: createDOMFactory('b'),
  base: createDOMFactory('base'),
  bdi: createDOMFactory('bdi'),
  bdo: createDOMFactory('bdo'),
  big: createDOMFactory('big'),
  blockquote: createDOMFactory('blockquote'),
  body: createDOMFactory('body'),
  br: createDOMFactory('br'),
  button: createDOMFactory('button'),
  canvas: createDOMFactory('canvas'),
  caption: createDOMFactory('caption'),
  cite: createDOMFactory('cite'),
  code: createDOMFactory('code'),
  col: createDOMFactory('col'),
  colgroup: createDOMFactory('colgroup'),
  data: createDOMFactory('data'),
  datalist: createDOMFactory('datalist'),
  dd: createDOMFactory('dd'),
  del: createDOMFactory('del'),
  details: createDOMFactory('details'),
  dfn: createDOMFactory('dfn'),
  dialog: createDOMFactory('dialog'),
  div: createDOMFactory('div'),
  dl: createDOMFactory('dl'),
  dt: createDOMFactory('dt'),
  em: createDOMFactory('em'),
  embed: createDOMFactory('embed'),
  fieldset: createDOMFactory('fieldset'),
  figcaption: createDOMFactory('figcaption'),
  figure: createDOMFactory('figure'),
  footer: createDOMFactory('footer'),
  form: createDOMFactory('form'),
  h1: createDOMFactory('h1'),
  h2: createDOMFactory('h2'),
  h3: createDOMFactory('h3'),
  h4: createDOMFactory('h4'),
  h5: createDOMFactory('h5'),
  h6: createDOMFactory('h6'),
  head: createDOMFactory('head'),
  header: createDOMFactory('header'),
  hgroup: createDOMFactory('hgroup'),
  hr: createDOMFactory('hr'),
  html: createDOMFactory('html'),
  i: createDOMFactory('i'),
  iframe: createDOMFactory('iframe'),
  img: createDOMFactory('img'),
  input: createDOMFactory('input'),
  ins: createDOMFactory('ins'),
  kbd: createDOMFactory('kbd'),
  keygen: createDOMFactory('keygen'),
  label: createDOMFactory('label'),
  legend: createDOMFactory('legend'),
  li: createDOMFactory('li'),
  link: createDOMFactory('link'),
  main: createDOMFactory('main'),
  map: createDOMFactory('map'),
  mark: createDOMFactory('mark'),
  menu: createDOMFactory('menu'),
  menuitem: createDOMFactory('menuitem'),
  meta: createDOMFactory('meta'),
  meter: createDOMFactory('meter'),
  nav: createDOMFactory('nav'),
  noscript: createDOMFactory('noscript'),
  object: createDOMFactory('object'),
  ol: createDOMFactory('ol'),
  optgroup: createDOMFactory('optgroup'),
  option: createDOMFactory('option'),
  output: createDOMFactory('output'),
  p: createDOMFactory('p'),
  param: createDOMFactory('param'),
  picture: createDOMFactory('picture'),
  pre: createDOMFactory('pre'),
  progress: createDOMFactory('progress'),
  q: createDOMFactory('q'),
  rp: createDOMFactory('rp'),
  rt: createDOMFactory('rt'),
  ruby: createDOMFactory('ruby'),
  s: createDOMFactory('s'),
  samp: createDOMFactory('samp'),
  script: createDOMFactory('script'),
  section: createDOMFactory('section'),
  select: createDOMFactory('select'),
  small: createDOMFactory('small'),
  source: createDOMFactory('source'),
  span: createDOMFactory('span'),
  strong: createDOMFactory('strong'),
  style: createDOMFactory('style'),
  sub: createDOMFactory('sub'),
  summary: createDOMFactory('summary'),
  sup: createDOMFactory('sup'),
  table: createDOMFactory('table'),
  tbody: createDOMFactory('tbody'),
  td: createDOMFactory('td'),
  textarea: createDOMFactory('textarea'),
  tfoot: createDOMFactory('tfoot'),
  th: createDOMFactory('th'),
  thead: createDOMFactory('thead'),
  time: createDOMFactory('time'),
  title: createDOMFactory('title'),
  tr: createDOMFactory('tr'),
  track: createDOMFactory('track'),
  u: createDOMFactory('u'),
  ul: createDOMFactory('ul'),
  'var': createDOMFactory('var'),
  video: createDOMFactory('video'),
  wbr: createDOMFactory('wbr'),

  // SVG
  circle: createDOMFactory('circle'),
  clipPath: createDOMFactory('clipPath'),
  defs: createDOMFactory('defs'),
  ellipse: createDOMFactory('ellipse'),
  g: createDOMFactory('g'),
  image: createDOMFactory('image'),
  line: createDOMFactory('line'),
  linearGradient: createDOMFactory('linearGradient'),
  mask: createDOMFactory('mask'),
  path: createDOMFactory('path'),
  pattern: createDOMFactory('pattern'),
  polygon: createDOMFactory('polygon'),
  polyline: createDOMFactory('polyline'),
  radialGradient: createDOMFactory('radialGradient'),
  rect: createDOMFactory('rect'),
  stop: createDOMFactory('stop'),
  svg: createDOMFactory('svg'),
  text: createDOMFactory('text'),
  tspan: createDOMFactory('tspan')
};

module.exports = ReactDOMFactories;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _prodInvariant = __webpack_require__(26);

var ReactPropTypeLocationNames = __webpack_require__(146);
var ReactPropTypesSecret = __webpack_require__(147);

var invariant = __webpack_require__(6);
var warning = __webpack_require__(8);

var ReactComponentTreeHook;

if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook = __webpack_require__(53);
}

var loggedTypeFailures = {};

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?object} element The React element that is being type-checked
 * @param {?number} debugID The React component instance that is being type-checked
 * @private
 */
function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
  for (var typeSpecName in typeSpecs) {
    if (typeSpecs.hasOwnProperty(typeSpecName)) {
      var error;
      // Prop type validation may throw. In case they do, we don't want to
      // fail the render phase where it didn't fail before. So we log it.
      // After these have been cleaned up, we'll let them throw.
      try {
        // This is intentionally an invariant that gets caught. It's the same
        // behavior as without this statement except with a better message.
        !(typeof typeSpecs[typeSpecName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
      } catch (ex) {
        error = ex;
      }
      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error) : void 0;
      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures[error.message] = true;

        var componentStackInfo = '';

        if (process.env.NODE_ENV !== 'production') {
          if (!ReactComponentTreeHook) {
            ReactComponentTreeHook = __webpack_require__(53);
          }
          if (debugID !== null) {
            componentStackInfo = ReactComponentTreeHook.getStackAddendumByID(debugID);
          } else if (element !== null) {
            componentStackInfo = ReactComponentTreeHook.getCurrentStackAddendum(element);
          }
        }

        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
      }
    }
  }
}

module.exports = checkReactTypeSpec;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



var ReactPropTypeLocationNames = {};

if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
}

module.exports = ReactPropTypeLocationNames;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _require = __webpack_require__(21),
    isValidElement = _require.isValidElement;

var factory = __webpack_require__(149);

module.exports = factory(isValidElement);

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



// React 15.5 references this module, and assumes PropTypes are still callable in production.
// Therefore we re-export development-only version with all the PropTypes checks here.
// However if one is migrating to the `prop-types` npm library, they will go through the
// `index.js` entry point, and it will branch depending on the environment.
var factory = __webpack_require__(96);
module.exports = function(isValidElement) {
  // It is still allowed in 15.5.
  var throwOnDirectAccess = false;
  return factory(isValidElement, throwOnDirectAccess);
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(6);
  var warning = __webpack_require__(8);
  var ReactPropTypesSecret = __webpack_require__(54);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



module.exports = '15.6.2';

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _require = __webpack_require__(90),
    Component = _require.Component;

var _require2 = __webpack_require__(21),
    isValidElement = _require2.isValidElement;

var ReactNoopUpdateQueue = __webpack_require__(91);
var factory = __webpack_require__(153);

module.exports = factory(Component, isValidElement, ReactNoopUpdateQueue);

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _assign = __webpack_require__(34);

var emptyObject = __webpack_require__(92);
var _invariant = __webpack_require__(6);

if (process.env.NODE_ENV !== 'production') {
  var warning = __webpack_require__(8);
}

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

var ReactPropTypeLocationNames;
if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
} else {
  ReactPropTypeLocationNames = {};
}

function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
  /**
   * Policies that describe methods in `ReactClassInterface`.
   */

  var injectedMixins = [];

  /**
   * Composite components are higher-level components that compose other composite
   * or host components.
   *
   * To create a new type of `ReactClass`, pass a specification of
   * your new class to `React.createClass`. The only requirement of your class
   * specification is that you implement a `render` method.
   *
   *   var MyComponent = React.createClass({
   *     render: function() {
   *       return <div>Hello World</div>;
   *     }
   *   });
   *
   * The class specification supports a specific protocol of methods that have
   * special meaning (e.g. `render`). See `ReactClassInterface` for
   * more the comprehensive protocol. Any other properties and methods in the
   * class specification will be available on the prototype.
   *
   * @interface ReactClassInterface
   * @internal
   */
  var ReactClassInterface = {
    /**
     * An array of Mixin objects to include when defining your component.
     *
     * @type {array}
     * @optional
     */
    mixins: 'DEFINE_MANY',

    /**
     * An object containing properties and methods that should be defined on
     * the component's constructor instead of its prototype (static methods).
     *
     * @type {object}
     * @optional
     */
    statics: 'DEFINE_MANY',

    /**
     * Definition of prop types for this component.
     *
     * @type {object}
     * @optional
     */
    propTypes: 'DEFINE_MANY',

    /**
     * Definition of context types for this component.
     *
     * @type {object}
     * @optional
     */
    contextTypes: 'DEFINE_MANY',

    /**
     * Definition of context types this component sets for its children.
     *
     * @type {object}
     * @optional
     */
    childContextTypes: 'DEFINE_MANY',

    // ==== Definition methods ====

    /**
     * Invoked when the component is mounted. Values in the mapping will be set on
     * `this.props` if that prop is not specified (i.e. using an `in` check).
     *
     * This method is invoked before `getInitialState` and therefore cannot rely
     * on `this.state` or use `this.setState`.
     *
     * @return {object}
     * @optional
     */
    getDefaultProps: 'DEFINE_MANY_MERGED',

    /**
     * Invoked once before the component is mounted. The return value will be used
     * as the initial value of `this.state`.
     *
     *   getInitialState: function() {
     *     return {
     *       isOn: false,
     *       fooBaz: new BazFoo()
     *     }
     *   }
     *
     * @return {object}
     * @optional
     */
    getInitialState: 'DEFINE_MANY_MERGED',

    /**
     * @return {object}
     * @optional
     */
    getChildContext: 'DEFINE_MANY_MERGED',

    /**
     * Uses props from `this.props` and state from `this.state` to render the
     * structure of the component.
     *
     * No guarantees are made about when or how often this method is invoked, so
     * it must not have side effects.
     *
     *   render: function() {
     *     var name = this.props.name;
     *     return <div>Hello, {name}!</div>;
     *   }
     *
     * @return {ReactComponent}
     * @required
     */
    render: 'DEFINE_ONCE',

    // ==== Delegate methods ====

    /**
     * Invoked when the component is initially created and about to be mounted.
     * This may have side effects, but any external subscriptions or data created
     * by this method must be cleaned up in `componentWillUnmount`.
     *
     * @optional
     */
    componentWillMount: 'DEFINE_MANY',

    /**
     * Invoked when the component has been mounted and has a DOM representation.
     * However, there is no guarantee that the DOM node is in the document.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been mounted (initialized and rendered) for the first time.
     *
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidMount: 'DEFINE_MANY',

    /**
     * Invoked before the component receives new props.
     *
     * Use this as an opportunity to react to a prop transition by updating the
     * state using `this.setState`. Current props are accessed via `this.props`.
     *
     *   componentWillReceiveProps: function(nextProps, nextContext) {
     *     this.setState({
     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
     *     });
     *   }
     *
     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
     * transition may cause a state change, but the opposite is not true. If you
     * need it, you are probably looking for `componentWillUpdate`.
     *
     * @param {object} nextProps
     * @optional
     */
    componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Invoked while deciding if the component should be updated as a result of
     * receiving new props, state and/or context.
     *
     * Use this as an opportunity to `return false` when you're certain that the
     * transition to the new props/state/context will not require a component
     * update.
     *
     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
     *     return !equal(nextProps, this.props) ||
     *       !equal(nextState, this.state) ||
     *       !equal(nextContext, this.context);
     *   }
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @return {boolean} True if the component should update.
     * @optional
     */
    shouldComponentUpdate: 'DEFINE_ONCE',

    /**
     * Invoked when the component is about to update due to a transition from
     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
     * and `nextContext`.
     *
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * NOTE: You **cannot** use `this.setState()` in this method.
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @param {ReactReconcileTransaction} transaction
     * @optional
     */
    componentWillUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component's DOM representation has been updated.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been updated.
     *
     * @param {object} prevProps
     * @param {?object} prevState
     * @param {?object} prevContext
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component is about to be removed from its parent and have
     * its DOM representation destroyed.
     *
     * Use this as an opportunity to deallocate any external resources.
     *
     * NOTE: There is no `componentDidUnmount` since your component will have been
     * destroyed by that point.
     *
     * @optional
     */
    componentWillUnmount: 'DEFINE_MANY',

    // ==== Advanced methods ====

    /**
     * Updates the component's currently mounted DOM representation.
     *
     * By default, this implements React's rendering and reconciliation algorithm.
     * Sophisticated clients may wish to override this.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     * @overridable
     */
    updateComponent: 'OVERRIDE_BASE'
  };

  /**
   * Mapping from class specification keys to special processing functions.
   *
   * Although these are declared like instance properties in the specification
   * when defining classes using `React.createClass`, they are actually static
   * and are accessible on the constructor instead of the prototype. Despite
   * being static, they must be defined outside of the "statics" key under
   * which all other static methods are defined.
   */
  var RESERVED_SPEC_KEYS = {
    displayName: function(Constructor, displayName) {
      Constructor.displayName = displayName;
    },
    mixins: function(Constructor, mixins) {
      if (mixins) {
        for (var i = 0; i < mixins.length; i++) {
          mixSpecIntoComponent(Constructor, mixins[i]);
        }
      }
    },
    childContextTypes: function(Constructor, childContextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, childContextTypes, 'childContext');
      }
      Constructor.childContextTypes = _assign(
        {},
        Constructor.childContextTypes,
        childContextTypes
      );
    },
    contextTypes: function(Constructor, contextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, contextTypes, 'context');
      }
      Constructor.contextTypes = _assign(
        {},
        Constructor.contextTypes,
        contextTypes
      );
    },
    /**
     * Special case getDefaultProps which should move into statics but requires
     * automatic merging.
     */
    getDefaultProps: function(Constructor, getDefaultProps) {
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps = createMergedResultFunction(
          Constructor.getDefaultProps,
          getDefaultProps
        );
      } else {
        Constructor.getDefaultProps = getDefaultProps;
      }
    },
    propTypes: function(Constructor, propTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, propTypes, 'prop');
      }
      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
    },
    statics: function(Constructor, statics) {
      mixStaticSpecIntoComponent(Constructor, statics);
    },
    autobind: function() {}
  };

  function validateTypeDef(Constructor, typeDef, location) {
    for (var propName in typeDef) {
      if (typeDef.hasOwnProperty(propName)) {
        // use a warning instead of an _invariant so components
        // don't show up in prod but only in __DEV__
        if (process.env.NODE_ENV !== 'production') {
          warning(
            typeof typeDef[propName] === 'function',
            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
              'React.PropTypes.',
            Constructor.displayName || 'ReactClass',
            ReactPropTypeLocationNames[location],
            propName
          );
        }
      }
    }
  }

  function validateMethodOverride(isAlreadyDefined, name) {
    var specPolicy = ReactClassInterface.hasOwnProperty(name)
      ? ReactClassInterface[name]
      : null;

    // Disallow overriding of base class methods unless explicitly allowed.
    if (ReactClassMixin.hasOwnProperty(name)) {
      _invariant(
        specPolicy === 'OVERRIDE_BASE',
        'ReactClassInterface: You are attempting to override ' +
          '`%s` from your class specification. Ensure that your method names ' +
          'do not overlap with React methods.',
        name
      );
    }

    // Disallow defining methods more than once unless explicitly allowed.
    if (isAlreadyDefined) {
      _invariant(
        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
        'ReactClassInterface: You are attempting to define ' +
          '`%s` on your component more than once. This conflict may be due ' +
          'to a mixin.',
        name
      );
    }
  }

  /**
   * Mixin helper which handles policy validation and reserved
   * specification keys when building React classes.
   */
  function mixSpecIntoComponent(Constructor, spec) {
    if (!spec) {
      if (process.env.NODE_ENV !== 'production') {
        var typeofSpec = typeof spec;
        var isMixinValid = typeofSpec === 'object' && spec !== null;

        if (process.env.NODE_ENV !== 'production') {
          warning(
            isMixinValid,
            "%s: You're attempting to include a mixin that is either null " +
              'or not an object. Check the mixins included by the component, ' +
              'as well as any mixins they include themselves. ' +
              'Expected object but got %s.',
            Constructor.displayName || 'ReactClass',
            spec === null ? null : typeofSpec
          );
        }
      }

      return;
    }

    _invariant(
      typeof spec !== 'function',
      "ReactClass: You're attempting to " +
        'use a component class or function as a mixin. Instead, just use a ' +
        'regular object.'
    );
    _invariant(
      !isValidElement(spec),
      "ReactClass: You're attempting to " +
        'use a component as a mixin. Instead, just use a regular object.'
    );

    var proto = Constructor.prototype;
    var autoBindPairs = proto.__reactAutoBindPairs;

    // By handling mixins before any other properties, we ensure the same
    // chaining order is applied to methods with DEFINE_MANY policy, whether
    // mixins are listed before or after these methods in the spec.
    if (spec.hasOwnProperty(MIXINS_KEY)) {
      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
    }

    for (var name in spec) {
      if (!spec.hasOwnProperty(name)) {
        continue;
      }

      if (name === MIXINS_KEY) {
        // We have already handled mixins in a special case above.
        continue;
      }

      var property = spec[name];
      var isAlreadyDefined = proto.hasOwnProperty(name);
      validateMethodOverride(isAlreadyDefined, name);

      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
        RESERVED_SPEC_KEYS[name](Constructor, property);
      } else {
        // Setup methods on prototype:
        // The following member methods should not be automatically bound:
        // 1. Expected ReactClass methods (in the "interface").
        // 2. Overridden methods (that were mixed in).
        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
        var isFunction = typeof property === 'function';
        var shouldAutoBind =
          isFunction &&
          !isReactClassMethod &&
          !isAlreadyDefined &&
          spec.autobind !== false;

        if (shouldAutoBind) {
          autoBindPairs.push(name, property);
          proto[name] = property;
        } else {
          if (isAlreadyDefined) {
            var specPolicy = ReactClassInterface[name];

            // These cases should already be caught by validateMethodOverride.
            _invariant(
              isReactClassMethod &&
                (specPolicy === 'DEFINE_MANY_MERGED' ||
                  specPolicy === 'DEFINE_MANY'),
              'ReactClass: Unexpected spec policy %s for key %s ' +
                'when mixing in component specs.',
              specPolicy,
              name
            );

            // For methods which are defined more than once, call the existing
            // methods before calling the new property, merging if appropriate.
            if (specPolicy === 'DEFINE_MANY_MERGED') {
              proto[name] = createMergedResultFunction(proto[name], property);
            } else if (specPolicy === 'DEFINE_MANY') {
              proto[name] = createChainedFunction(proto[name], property);
            }
          } else {
            proto[name] = property;
            if (process.env.NODE_ENV !== 'production') {
              // Add verbose displayName to the function, which helps when looking
              // at profiling tools.
              if (typeof property === 'function' && spec.displayName) {
                proto[name].displayName = spec.displayName + '_' + name;
              }
            }
          }
        }
      }
    }
  }

  function mixStaticSpecIntoComponent(Constructor, statics) {
    if (!statics) {
      return;
    }
    for (var name in statics) {
      var property = statics[name];
      if (!statics.hasOwnProperty(name)) {
        continue;
      }

      var isReserved = name in RESERVED_SPEC_KEYS;
      _invariant(
        !isReserved,
        'ReactClass: You are attempting to define a reserved ' +
          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
          'as an instance property instead; it will still be accessible on the ' +
          'constructor.',
        name
      );

      var isInherited = name in Constructor;
      _invariant(
        !isInherited,
        'ReactClass: You are attempting to define ' +
          '`%s` on your component more than once. This conflict may be ' +
          'due to a mixin.',
        name
      );
      Constructor[name] = property;
    }
  }

  /**
   * Merge two objects, but throw if both contain the same key.
   *
   * @param {object} one The first object, which is mutated.
   * @param {object} two The second object
   * @return {object} one after it has been mutated to contain everything in two.
   */
  function mergeIntoWithNoDuplicateKeys(one, two) {
    _invariant(
      one && two && typeof one === 'object' && typeof two === 'object',
      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
    );

    for (var key in two) {
      if (two.hasOwnProperty(key)) {
        _invariant(
          one[key] === undefined,
          'mergeIntoWithNoDuplicateKeys(): ' +
            'Tried to merge two objects with the same key: `%s`. This conflict ' +
            'may be due to a mixin; in particular, this may be caused by two ' +
            'getInitialState() or getDefaultProps() methods returning objects ' +
            'with clashing keys.',
          key
        );
        one[key] = two[key];
      }
    }
    return one;
  }

  /**
   * Creates a function that invokes two functions and merges their return values.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createMergedResultFunction(one, two) {
    return function mergedResult() {
      var a = one.apply(this, arguments);
      var b = two.apply(this, arguments);
      if (a == null) {
        return b;
      } else if (b == null) {
        return a;
      }
      var c = {};
      mergeIntoWithNoDuplicateKeys(c, a);
      mergeIntoWithNoDuplicateKeys(c, b);
      return c;
    };
  }

  /**
   * Creates a function that invokes two functions and ignores their return vales.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createChainedFunction(one, two) {
    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  }

  /**
   * Binds a method to the component.
   *
   * @param {object} component Component whose method is going to be bound.
   * @param {function} method Method to be bound.
   * @return {function} The bound method.
   */
  function bindAutoBindMethod(component, method) {
    var boundMethod = method.bind(component);
    if (process.env.NODE_ENV !== 'production') {
      boundMethod.__reactBoundContext = component;
      boundMethod.__reactBoundMethod = method;
      boundMethod.__reactBoundArguments = null;
      var componentName = component.constructor.displayName;
      var _bind = boundMethod.bind;
      boundMethod.bind = function(newThis) {
        for (
          var _len = arguments.length,
            args = Array(_len > 1 ? _len - 1 : 0),
            _key = 1;
          _key < _len;
          _key++
        ) {
          args[_key - 1] = arguments[_key];
        }

        // User is trying to bind() an autobound method; we effectively will
        // ignore the value of "this" that the user is trying to use, so
        // let's warn.
        if (newThis !== component && newThis !== null) {
          if (process.env.NODE_ENV !== 'production') {
            warning(
              false,
              'bind(): React component methods may only be bound to the ' +
                'component instance. See %s',
              componentName
            );
          }
        } else if (!args.length) {
          if (process.env.NODE_ENV !== 'production') {
            warning(
              false,
              'bind(): You are binding a component method to the component. ' +
                'React does this for you automatically in a high-performance ' +
                'way, so you can safely remove this call. See %s',
              componentName
            );
          }
          return boundMethod;
        }
        var reboundMethod = _bind.apply(boundMethod, arguments);
        reboundMethod.__reactBoundContext = component;
        reboundMethod.__reactBoundMethod = method;
        reboundMethod.__reactBoundArguments = args;
        return reboundMethod;
      };
    }
    return boundMethod;
  }

  /**
   * Binds all auto-bound methods in a component.
   *
   * @param {object} component Component whose method is going to be bound.
   */
  function bindAutoBindMethods(component) {
    var pairs = component.__reactAutoBindPairs;
    for (var i = 0; i < pairs.length; i += 2) {
      var autoBindKey = pairs[i];
      var method = pairs[i + 1];
      component[autoBindKey] = bindAutoBindMethod(component, method);
    }
  }

  var IsMountedPreMixin = {
    componentDidMount: function() {
      this.__isMounted = true;
    }
  };

  var IsMountedPostMixin = {
    componentWillUnmount: function() {
      this.__isMounted = false;
    }
  };

  /**
   * Add more to the ReactClass base class. These are all legacy features and
   * therefore not already part of the modern ReactComponent.
   */
  var ReactClassMixin = {
    /**
     * TODO: This will be deprecated because state should always keep a consistent
     * type signature and the only use case for this, is to avoid that.
     */
    replaceState: function(newState, callback) {
      this.updater.enqueueReplaceState(this, newState, callback);
    },

    /**
     * Checks whether or not this composite component is mounted.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function() {
      if (process.env.NODE_ENV !== 'production') {
        warning(
          this.__didWarnIsMounted,
          '%s: isMounted is deprecated. Instead, make sure to clean up ' +
            'subscriptions and pending requests in componentWillUnmount to ' +
            'prevent memory leaks.',
          (this.constructor && this.constructor.displayName) ||
            this.name ||
            'Component'
        );
        this.__didWarnIsMounted = true;
      }
      return !!this.__isMounted;
    }
  };

  var ReactClassComponent = function() {};
  _assign(
    ReactClassComponent.prototype,
    ReactComponent.prototype,
    ReactClassMixin
  );

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  function createClass(spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function(props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (process.env.NODE_ENV !== 'production') {
        warning(
          this instanceof Constructor,
          'Something is calling a React component directly. Use a factory or ' +
            'JSX instead. See: https://fb.me/react-legacyfactory'
        );
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (process.env.NODE_ENV !== 'production') {
        // We allow auto-mocks to proceed as if they're returning null.
        if (
          initialState === undefined &&
          this.getInitialState._isMockFunction
        ) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      _invariant(
        typeof initialState === 'object' && !Array.isArray(initialState),
        '%s.getInitialState(): must return an object or null',
        Constructor.displayName || 'ReactCompositeComponent'
      );

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
    mixSpecIntoComponent(Constructor, spec);
    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (process.env.NODE_ENV !== 'production') {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    _invariant(
      Constructor.prototype.render,
      'createClass(...): Class specification must implement a `render` method.'
    );

    if (process.env.NODE_ENV !== 'production') {
      warning(
        !Constructor.prototype.componentShouldUpdate,
        '%s has a method called ' +
          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
          'The name is phrased as a question because the function is ' +
          'expected to return a value.',
        spec.displayName || 'A component'
      );
      warning(
        !Constructor.prototype.componentWillRecieveProps,
        '%s has a method called ' +
          'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
        spec.displayName || 'A component'
      );
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  }

  return createClass;
}

module.exports = factory;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


var _prodInvariant = __webpack_require__(26);

var ReactElement = __webpack_require__(21);

var invariant = __webpack_require__(6);

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143') : void 0;
  return children;
}

module.exports = onlyChild;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/


const DIALOG_BASE_CLASS = 'dialog';
class FinsembleDialog extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
	constructor(props) {
		super(props);
		this.props = props;

		this.finWindow = fin.desktop.Window.getCurrent();
		this.finWindow.updateOptions({
			alwaysOnTop: true
		});

		this.bindCorrectContext();
		this.setDefaults();

		//Using state here because we have a default value that's set in `setDefaults`.
		FSBL.Clients.DialogManager.userInputTimeout = this.state.userInputTimeout;
		FSBL.Clients.DialogManager.isModal = this.props.isModal;

		this.addResponder();

		document.body.addEventListener('keydown', this.handleKeyDown);
		document.body.className += ' dialog';
	}
	/**
  * Sets default values and throws errors/warns the user that certain info wasn't provided.
  *
  * @memberof FinsembleDialog
  */
	setDefaults() {
		let { behaviorOnResponse, userInputTimeout } = this.props;
		if (typeof this.props.onShowRequested === 'undefined') {
			throw new Error('No onShowRequested passed to FinsembleDialog. Pass onShowRequested as a property to the FinsembleDialog component.');
		}

		if (typeof behaviorOnResponse === 'undefined') {
			console.warn('No behaviorOnResponse passed to FinsembleDialog. After the dialog sends data back to its opener, this behavior is invoked. The default behavior is to hide. Valid options are "hide" and "close".');
			behaviorOnResponse = 'hide';
		}

		if (typeof userInputTimeout === 'undefined') {
			console.warn('No userInputTimeout passed to FinsembleDialog. This value sets a timeout that warns the dialog\'s opener after a period of inactivity. Default is 10000ms. This prop must be a number in MS.\n');
			userInputTimeout = 10000;
		}

		this.state = {
			behaviorOnResponse: behaviorOnResponse,
			userInputTimeout: userInputTimeout
		};
	}
	bindCorrectContext() {
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.hideDialog = this.hideDialog.bind(this);
	}

	handleKeyDown(e) {
		if (FSBL.Clients.DialogManager.openerMessage === null && e.code === 'Escape') {
			this.hideDialog();
		}
	}

	hideDialog() {
		//hide.
		this.finWindow.hide();
	}

	closeDialog() {
		//close.
		this.finWindow.close(true);
	}

	componentDidMount() {
		//DialogManager uses this when it sends its response back to the originating window. After that response is sent, we either hide or close the dialog.
		FSBL.Clients.DialogManager.behaviorOnResponse = this.state.behaviorOnResponse;
		if (this.props.isModal) {
			this.finWindow.addEventListener('shown', FSBL.Clients.DialogManager.showModal);
			this.finWindow.addEventListener('hidden', FSBL.Clients.DialogManager.hideModal);
		}
	}

	componentWillUnmount() {
		if (this.props.isModal) {
			this.finWindow.removeEventListener('shown', FSBL.Clients.DialogManager.showModal);
			this.finWindow.removeEventListener('hidden', FSBL.Clients.DialogManager.hideModal);
		}
	}

	addResponder() {
		let self = this;
		FSBL.Clients.DialogManager.registerDialogCallback(this.props.onShowRequested);
	}

	render() {
		let classes = this.props.className;
		classes += ` ${DIALOG_BASE_CLASS}`;
		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: classes },
			this.props.children
		);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FinsembleDialog;


/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FinsembleButton_FinsembleButton__ = __webpack_require__(25);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/

const BUTTON_BASE_CLASS = 'fsbl-button';



class FinsembleDialogButton extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
	constructor(props) {
		super(props);
	}
	render() {
		//Default size is medium.
		let size = this.props.buttonSize || 'md';
		//If you're unfamiliar with this syntax, it's equivalent to
		//let classes='fsbl-button-' + size;
		let classes = `fsbl-button-${size}`;
		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			__WEBPACK_IMPORTED_MODULE_1__FinsembleButton_FinsembleButton__["a" /* default */],
			_extends({ className: classes }, this.props, { buttonType: 'Dialog' }),
			this.props.children
		);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FinsembleDialogButton;


/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/

const DIALOG_QUESTION_BASE_CLASS = 'dialog-question';

class FinsembleDialogQuestion extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
	constructor(props) {
		super(props);
	}
	render() {
		//This just adds the base class to any classNames passed into the dialogQuestion.
		let classes = this.props.className;
		//If you're unfamiliar with this syntax, it's equivalent to
		//classes+=' ' + DIALOG_QUESTION_BASE_CLASS;
		classes += ` ${DIALOG_QUESTION_BASE_CLASS}`;
		let props = this.props;

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: classes },
			this.props.question,
			this.props.children
		);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FinsembleDialogQuestion;


/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);

/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/


const DIALOG_INPUT_BASE_CLASS = 'dialog-input';

class FinsembleDialogTextInput extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let classes = this.props.className || '';
		//If you're unfamiliar with this syntax, it's equivalent to
		//classes+=' ' + DIALOG_INPUT_BASE_CLASS;
		classes += ` ${DIALOG_INPUT_BASE_CLASS}`;
		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: classes },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'label',
				{ htmlFor: 'single-input' },
				this.props.inputLabel
			),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'form-group' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { autoFocus: this.props.autoFocus, type: 'text', maxLength: typeof this.props.maxLength !== 'undefined' ? this.props.maxLength : null, onChange: this.props.onInputChange, placeholder: this.props.placeholder ? this.props.placeholder : '' })
			),
			this.props.children
		);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FinsembleDialogTextInput;


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dragDropContext = __webpack_require__(160);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_dragDropContext).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(9);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = __webpack_require__(13);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(16);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _DragDropContext$chil;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(5);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createStore = __webpack_require__(196);

var _createStore2 = _interopRequireDefault(_createStore);

var _fireHooks = __webpack_require__(244);

var _fireHooks2 = _interopRequireDefault(_fireHooks);

var _dimensionMarshal = __webpack_require__(245);

var _dimensionMarshal2 = _interopRequireDefault(_dimensionMarshal);

var _styleMarshal = __webpack_require__(246);

var _styleMarshal2 = _interopRequireDefault(_styleMarshal);

var _canStartDrag = __webpack_require__(248);

var _canStartDrag2 = _interopRequireDefault(_canStartDrag);

var _contextKeys = __webpack_require__(20);

var _actionCreators = __webpack_require__(126);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DragDropContext = function (_React$Component) {
  (0, _inherits3.default)(DragDropContext, _React$Component);

  function DragDropContext() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DragDropContext);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DragDropContext.__proto__ || (0, _getPrototypeOf2.default)(DragDropContext)).call.apply(_ref, [this].concat(args))), _this), _this.canLift = function (id) {
      return (0, _canStartDrag2.default)(_this.store.getState(), id);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DragDropContext, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _ref2;

      return _ref2 = {}, (0, _defineProperty3.default)(_ref2, _contextKeys.storeKey, this.store), (0, _defineProperty3.default)(_ref2, _contextKeys.dimensionMarshalKey, this.dimensionMarshal), (0, _defineProperty3.default)(_ref2, _contextKeys.styleContextKey, this.styleMarshal.styleContext), (0, _defineProperty3.default)(_ref2, _contextKeys.canLiftContextKey, this.canLift), _ref2;
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      this.store = (0, _createStore2.default)();

      this.styleMarshal = (0, _styleMarshal2.default)();

      var callbacks = {
        cancel: function cancel() {
          _this2.store.dispatch((0, _actionCreators.clean)());
        },
        publishDraggables: function publishDraggables(dimensions) {
          _this2.store.dispatch((0, _actionCreators.publishDraggableDimensions)(dimensions));
        },
        publishDroppables: function publishDroppables(dimensions) {
          _this2.store.dispatch((0, _actionCreators.publishDroppableDimensions)(dimensions));
        },
        updateDroppableScroll: function updateDroppableScroll(id, newScroll) {
          _this2.store.dispatch((0, _actionCreators.updateDroppableDimensionScroll)(id, newScroll));
        },
        updateDroppableIsEnabled: function updateDroppableIsEnabled(id, isEnabled) {
          _this2.store.dispatch((0, _actionCreators.updateDroppableDimensionIsEnabled)(id, isEnabled));
        }
      };
      this.dimensionMarshal = (0, _dimensionMarshal2.default)(callbacks);

      var previous = this.store.getState();

      this.unsubscribe = this.store.subscribe(function () {
        var previousValue = previous;
        var current = _this2.store.getState();

        previous = current;

        if (current.phase === previousValue.phase) {
          return;
        }

        var hooks = {
          onDragStart: _this2.props.onDragStart,
          onDragEnd: _this2.props.onDragEnd
        };
        (0, _fireHooks2.default)(hooks, previousValue, current);

        _this2.styleMarshal.onPhaseChange(current);

        _this2.dimensionMarshal.onPhaseChange(current);
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.styleMarshal.mount();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
      this.styleMarshal.unmount();
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);
  return DragDropContext;
}(_react2.default.Component);

DragDropContext.childContextTypes = (_DragDropContext$chil = {}, (0, _defineProperty3.default)(_DragDropContext$chil, _contextKeys.storeKey, _propTypes2.default.shape({
  dispatch: _propTypes2.default.func.isRequired,
  subscribe: _propTypes2.default.func.isRequired,
  getState: _propTypes2.default.func.isRequired
}).isRequired), (0, _defineProperty3.default)(_DragDropContext$chil, _contextKeys.dimensionMarshalKey, _propTypes2.default.object.isRequired), (0, _defineProperty3.default)(_DragDropContext$chil, _contextKeys.styleContextKey, _propTypes2.default.string.isRequired), (0, _defineProperty3.default)(_DragDropContext$chil, _contextKeys.canLiftContextKey, _propTypes2.default.func.isRequired), _DragDropContext$chil);
exports.default = DragDropContext;

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(162);
var $Object = __webpack_require__(4).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(10);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(22), 'Object', { defineProperty: __webpack_require__(12).f });


/***/ }),
/* 163 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(165);
module.exports = __webpack_require__(4).Object.getPrototypeOf;


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(37);
var $getPrototypeOf = __webpack_require__(107);

__webpack_require__(108)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(167), __esModule: true };

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(109);
__webpack_require__(174);
module.exports = __webpack_require__(70).f('iterator');


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(64);
var defined = __webpack_require__(60);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(66);
var descriptor = __webpack_require__(36);
var setToStringTag = __webpack_require__(69);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(27)(IteratorPrototype, __webpack_require__(7)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(12);
var anObject = __webpack_require__(28);
var getKeys = __webpack_require__(39);

module.exports = __webpack_require__(22) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(30);
var toLength = __webpack_require__(114);
var toAbsoluteIndex = __webpack_require__(172);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(64);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(11).document;
module.exports = document && document.documentElement;


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(175);
var global = __webpack_require__(11);
var hide = __webpack_require__(27);
var Iterators = __webpack_require__(38);
var TO_STRING_TAG = __webpack_require__(7)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(176);
var step = __webpack_require__(177);
var Iterators = __webpack_require__(38);
var toIObject = __webpack_require__(30);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(110)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 176 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 177 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(179), __esModule: true };

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(180);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
module.exports = __webpack_require__(4).Symbol;


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(11);
var has = __webpack_require__(23);
var DESCRIPTORS = __webpack_require__(22);
var $export = __webpack_require__(10);
var redefine = __webpack_require__(111);
var META = __webpack_require__(181).KEY;
var $fails = __webpack_require__(29);
var shared = __webpack_require__(62);
var setToStringTag = __webpack_require__(69);
var uid = __webpack_require__(45);
var wks = __webpack_require__(7);
var wksExt = __webpack_require__(70);
var wksDefine = __webpack_require__(71);
var enumKeys = __webpack_require__(182);
var isArray = __webpack_require__(183);
var anObject = __webpack_require__(28);
var toIObject = __webpack_require__(30);
var toPrimitive = __webpack_require__(59);
var createDesc = __webpack_require__(36);
var _create = __webpack_require__(66);
var gOPNExt = __webpack_require__(184);
var $GOPD = __webpack_require__(116);
var $DP = __webpack_require__(12);
var $keys = __webpack_require__(39);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(115).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(46).f = $propertyIsEnumerable;
  __webpack_require__(72).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(65)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(27)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(45)('meta');
var isObject = __webpack_require__(35);
var has = __webpack_require__(23);
var setDesc = __webpack_require__(12).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(29)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(39);
var gOPS = __webpack_require__(72);
var pIE = __webpack_require__(46);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(67);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(30);
var gOPN = __webpack_require__(115).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 185 */
/***/ (function(module, exports) {



/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(71)('asyncIterator');


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(71)('observable');


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(189), __esModule: true };

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(190);
module.exports = __webpack_require__(4).Object.setPrototypeOf;


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(10);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(191).set });


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(35);
var anObject = __webpack_require__(28);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(58)(Function.call, __webpack_require__(116).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(193), __esModule: true };

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(194);
var $Object = __webpack_require__(4).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(10);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(66) });


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(42);
var invariant = __webpack_require__(6);
var ReactPropTypesSecret = __webpack_require__(54);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = __webpack_require__(63);

var _typeof3 = _interopRequireDefault(_typeof2);

var _redux = __webpack_require__(117);

var _reduxThunk = __webpack_require__(212);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducer = __webpack_require__(213);

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composeEnhancers = (typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : _redux.compose;

exports.default = function () {
  return (0, _redux.createStore)(_reducer2.default, composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2.default)));
};

/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(201);




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? Object(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value)
    : Object(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = (baseGetTag);


/***/ }),
/* 198 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(199);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = (root);


/***/ }),
/* 199 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(74)))

/***/ }),
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(119);


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (getRawTag);


/***/ }),
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = (objectToString);


/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(203);


/** Built-in value references. */
var getPrototype = Object(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = (getPrototype);


/***/ }),
/* 203 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (overArg);


/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ __webpack_exports__["a"] = (isObjectLike);


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(206);


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(208);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74), __webpack_require__(207)(module)))

/***/ }),
/* 207 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),
/* 209 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(120);




function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!Object(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__["a" /* default */])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),
/* 211 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyMiddleware;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(121);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

exports['default'] = thunk;

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(18);

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = __webpack_require__(9);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = __webpack_require__(24);

var _extends5 = _interopRequireDefault(_extends4);

var _memoizeOne = __webpack_require__(3);

var _memoizeOne2 = _interopRequireDefault(_memoizeOne);

var _position = __webpack_require__(2);

var _noImpact = __webpack_require__(48);

var _getDragImpact = __webpack_require__(229);

var _getDragImpact2 = _interopRequireDefault(_getDragImpact);

var _moveToNextIndex = __webpack_require__(235);

var _moveToNextIndex2 = _interopRequireDefault(_moveToNextIndex);

var _moveCrossAxis = __webpack_require__(238);

var _moveCrossAxis2 = _interopRequireDefault(_moveCrossAxis);

var _dimension = __webpack_require__(49);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noDimensions = {
  request: null,
  draggable: {},
  droppable: {}
};

var origin = { x: 0, y: 0 };

var clean = (0, _memoizeOne2.default)(function () {
  var phase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'IDLE';
  return {
    phase: phase,
    drag: null,
    drop: null,
    dimension: noDimensions
  };
});

var canPublishDimension = function canPublishDimension(phase) {
  return ['IDLE', 'DROP_ANIMATING', 'DROP_COMPLETE'].indexOf(phase) === -1;
};

var move = function move(_ref) {
  var state = _ref.state,
      clientSelection = _ref.clientSelection,
      shouldAnimate = _ref.shouldAnimate,
      windowScroll = _ref.windowScroll,
      impact = _ref.impact;

  if (state.phase !== 'DRAGGING') {
    console.error('cannot move while not dragging');
    return clean();
  }

  var last = state.drag;

  if (last == null) {
    console.error('cannot move if there is no drag information');
    return clean();
  }

  var previous = last.current;
  var initial = last.initial;
  var currentWindowScroll = windowScroll || previous.windowScroll;

  var client = function () {
    var offset = (0, _position.subtract)(clientSelection, initial.client.selection);

    var result = {
      offset: offset,
      selection: clientSelection,
      center: (0, _position.add)(offset, initial.client.center)
    };
    return result;
  }();

  var page = {
    selection: (0, _position.add)(client.selection, currentWindowScroll),
    offset: (0, _position.add)(client.offset, currentWindowScroll),
    center: (0, _position.add)(client.center, currentWindowScroll)
  };

  var current = {
    client: client,
    page: page,
    shouldAnimate: shouldAnimate,
    windowScroll: currentWindowScroll
  };

  var newImpact = impact || (0, _getDragImpact2.default)({
    pageCenter: page.center,
    draggable: state.dimension.draggable[initial.descriptor.id],
    draggables: state.dimension.draggable,
    droppables: state.dimension.droppable,
    previousImpact: last.impact
  });

  var drag = {
    initial: initial,
    impact: newImpact,
    current: current
  };

  return (0, _extends5.default)({}, state, {
    drag: drag
  });
};

var updateStateAfterDimensionChange = function updateStateAfterDimensionChange(newState) {
  if (newState.phase === 'COLLECTING_INITIAL_DIMENSIONS') {
    return newState;
  }

  if (newState.phase !== 'DRAGGING') {
    return newState;
  }

  if (!newState.drag) {
    console.error('cannot update a draggable dimension in an existing drag as there is invalid drag state');
    return clean();
  }

  return move({
    state: newState,

    clientSelection: newState.drag.current.client.selection,
    shouldAnimate: newState.drag.current.shouldAnimate
  });
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : clean('IDLE');
  var action = arguments[1];

  if (action.type === 'CLEAN') {
    return clean();
  }

  if (action.type === 'PREPARE') {
    return clean('PREPARING');
  }

  if (action.type === 'REQUEST_DIMENSIONS') {
    if (state.phase !== 'PREPARING') {
      console.error('trying to start a lift while not preparing for a lift');
      return clean();
    }

    var id = action.payload;

    return {
      phase: 'COLLECTING_INITIAL_DIMENSIONS',
      drag: null,
      drop: null,
      dimension: {
        request: id,
        draggable: {},
        droppable: {}
      }
    };
  }

  if (action.type === 'PUBLISH_DRAGGABLE_DIMENSIONS') {
    var dimensions = action.payload;

    if (!canPublishDimension(state.phase)) {
      console.warn('dimensions rejected as no longer allowing dimension capture in phase', state.phase);
      return state;
    }

    var additions = dimensions.reduce(function (previous, current) {
      previous[current.descriptor.id] = current;
      return previous;
    }, {});

    var newState = (0, _extends5.default)({}, state, {
      dimension: {
        request: state.dimension.request,
        droppable: state.dimension.droppable,
        draggable: (0, _extends5.default)({}, state.dimension.draggable, additions)
      }
    });

    return updateStateAfterDimensionChange(newState);
  }

  if (action.type === 'PUBLISH_DROPPABLE_DIMENSIONS') {
    var _dimensions = action.payload;

    if (!canPublishDimension(state.phase)) {
      console.warn('dimensions rejected as no longer allowing dimension capture in phase', state.phase);
      return state;
    }

    var _additions = _dimensions.reduce(function (previous, current) {
      previous[current.descriptor.id] = current;
      return previous;
    }, {});

    var _newState = (0, _extends5.default)({}, state, {
      dimension: {
        request: state.dimension.request,
        draggable: state.dimension.draggable,
        droppable: (0, _extends5.default)({}, state.dimension.droppable, _additions)
      }
    });

    return updateStateAfterDimensionChange(_newState);
  }

  if (action.type === 'COMPLETE_LIFT') {
    if (state.phase !== 'COLLECTING_INITIAL_DIMENSIONS') {
      console.error('trying complete lift without collecting dimensions');
      return state;
    }

    var _action$payload = action.payload,
        _id = _action$payload.id,
        client = _action$payload.client,
        _windowScroll = _action$payload.windowScroll,
        isScrollAllowed = _action$payload.isScrollAllowed;

    var page = {
      selection: (0, _position.add)(client.selection, _windowScroll),
      center: (0, _position.add)(client.center, _windowScroll)
    };

    var draggable = state.dimension.draggable[_id];

    if (!draggable) {
      console.error('could not find draggable in store after lift');
      return clean();
    }

    var descriptor = draggable.descriptor;

    var initial = {
      descriptor: descriptor,
      isScrollAllowed: isScrollAllowed,
      client: client,
      page: page,
      windowScroll: _windowScroll
    };

    var current = {
      client: {
        selection: client.selection,
        center: client.center,
        offset: origin
      },
      page: {
        selection: page.selection,
        center: page.center,
        offset: origin
      },
      windowScroll: _windowScroll,
      shouldAnimate: false
    };

    var home = state.dimension.droppable[descriptor.droppableId];

    if (!home) {
      console.error('Cannot find home dimension for initial lift');
      return clean();
    }

    var destination = {
      index: descriptor.index,
      droppableId: descriptor.droppableId
    };

    var _impact = {
      movement: _noImpact.noMovement,
      direction: home.axis.direction,
      destination: destination
    };

    return (0, _extends5.default)({}, state, {
      phase: 'DRAGGING',
      drag: {
        initial: initial,
        current: current,
        impact: _impact
      }
    });
  }

  if (action.type === 'UPDATE_DROPPABLE_DIMENSION_SCROLL') {
    if (state.phase !== 'DRAGGING') {
      console.error('cannot update a droppable dimensions scroll when not dragging');
      return clean();
    }

    if (state.drag == null) {
      console.error('invalid store state');
      return clean();
    }

    if (!state.drag.initial.isScrollAllowed) {
      return clean();
    }

    var _action$payload2 = action.payload,
        _id2 = _action$payload2.id,
        offset = _action$payload2.offset;


    var target = state.dimension.droppable[_id2];

    if (!target) {
      console.warn('cannot update scroll for droppable as it has not yet been collected');
      return state;
    }

    var dimension = (0, _dimension.scrollDroppable)(target, offset);

    var _newState2 = (0, _extends5.default)({}, state, {
      dimension: {
        request: state.dimension.request,
        draggable: state.dimension.draggable,
        droppable: (0, _extends5.default)({}, state.dimension.droppable, (0, _defineProperty3.default)({}, _id2, dimension))
      }
    });

    return updateStateAfterDimensionChange(_newState2);
  }

  if (action.type === 'UPDATE_DROPPABLE_DIMENSION_IS_ENABLED') {
    if (!(0, _keys2.default)(state.dimension.droppable).length) {
      return state;
    }

    var _action$payload3 = action.payload,
        _id3 = _action$payload3.id,
        isEnabled = _action$payload3.isEnabled;

    var _target = state.dimension.droppable[_id3];

    if (!_target) {
      console.warn('cannot update enabled state for droppable as it has not yet been collected');
      return state;
    }

    if (_target.isEnabled === isEnabled) {
      console.warn('trying to set droppable isEnabled to ' + String(isEnabled) + ' but it is already ' + String(isEnabled));
      return state;
    }

    var updatedDroppableDimension = (0, _extends5.default)({}, _target, {
      isEnabled: isEnabled
    });

    var result = (0, _extends5.default)({}, state, {
      dimension: (0, _extends5.default)({}, state.dimension, {
        droppable: (0, _extends5.default)({}, state.dimension.droppable, (0, _defineProperty3.default)({}, _id3, updatedDroppableDimension))
      })
    });

    return updateStateAfterDimensionChange(result);
  }

  if (action.type === 'MOVE') {
    var _action$payload4 = action.payload,
        _client = _action$payload4.client,
        _windowScroll2 = _action$payload4.windowScroll;

    return move({
      state: state,
      clientSelection: _client,
      windowScroll: _windowScroll2,
      shouldAnimate: false
    });
  }

  if (action.type === 'MOVE_BY_WINDOW_SCROLL') {
    var _windowScroll3 = action.payload.windowScroll;


    if (!state.drag) {
      console.error('cannot move with window scrolling if no current drag');
      return clean();
    }

    return move({
      state: state,
      clientSelection: state.drag.current.client.selection,
      windowScroll: _windowScroll3,
      shouldAnimate: false
    });
  }

  if (action.type === 'MOVE_FORWARD' || action.type === 'MOVE_BACKWARD') {
    if (state.phase !== 'DRAGGING') {
      console.error('cannot move while not dragging', action);
      return clean();
    }

    if (!state.drag) {
      console.error('cannot move if there is no drag information');
      return clean();
    }

    var existing = state.drag;
    var isMovingForward = action.type === 'MOVE_FORWARD';

    if (!existing.impact.destination) {
      console.error('cannot move if there is no previous destination');
      return clean();
    }

    var droppable = state.dimension.droppable[existing.impact.destination.droppableId];

    var _result = (0, _moveToNextIndex2.default)({
      isMovingForward: isMovingForward,
      draggableId: existing.initial.descriptor.id,
      droppable: droppable,
      draggables: state.dimension.draggable,
      previousImpact: existing.impact
    });

    if (!_result) {
      return state;
    }

    var _impact2 = _result.impact;
    var _page = _result.pageCenter;
    var _client2 = (0, _position.subtract)(_page, existing.current.windowScroll);

    return move({
      state: state,
      impact: _impact2,
      clientSelection: _client2,
      shouldAnimate: true
    });
  }

  if (action.type === 'CROSS_AXIS_MOVE_FORWARD' || action.type === 'CROSS_AXIS_MOVE_BACKWARD') {
    if (state.phase !== 'DRAGGING') {
      console.error('cannot move cross axis when not dragging');
      return clean();
    }

    if (!state.drag) {
      console.error('cannot move cross axis if there is no drag information');
      return clean();
    }

    if (!state.drag.impact.destination) {
      console.error('cannot move cross axis if not in a droppable');
      return clean();
    }

    var _current = state.drag.current;
    var _descriptor = state.drag.initial.descriptor;
    var draggableId = _descriptor.id;
    var center = _current.page.center;
    var droppableId = state.drag.impact.destination.droppableId;
    var _home = {
      index: _descriptor.index,
      droppableId: _descriptor.droppableId
    };

    var _result2 = (0, _moveCrossAxis2.default)({
      isMovingForward: action.type === 'CROSS_AXIS_MOVE_FORWARD',
      pageCenter: center,
      draggableId: draggableId,
      droppableId: droppableId,
      home: _home,
      draggables: state.dimension.draggable,
      droppables: state.dimension.droppable,
      previousImpact: state.drag.impact
    });

    if (!_result2) {
      return state;
    }

    var _page2 = _result2.pageCenter;
    var _client3 = (0, _position.subtract)(_page2, _current.windowScroll);

    return move({
      state: state,
      clientSelection: _client3,
      impact: _result2.impact,
      shouldAnimate: true
    });
  }

  if (action.type === 'DROP_ANIMATE') {
    var _action$payload5 = action.payload,
        trigger = _action$payload5.trigger,
        newHomeOffset = _action$payload5.newHomeOffset,
        _impact3 = _action$payload5.impact,
        _result3 = _action$payload5.result;


    if (state.phase !== 'DRAGGING') {
      console.error('cannot animate drop while not dragging', action);
      return state;
    }

    if (!state.drag) {
      console.error('cannot animate drop - invalid drag state');
      return clean();
    }

    var pending = {
      trigger: trigger,
      newHomeOffset: newHomeOffset,
      result: _result3,
      impact: _impact3
    };

    return {
      phase: 'DROP_ANIMATING',
      drag: null,
      drop: {
        pending: pending,
        result: null
      },
      dimension: state.dimension
    };
  }

  if (action.type === 'DROP_COMPLETE') {
    var _result4 = action.payload;

    return {
      phase: 'DROP_COMPLETE',
      drag: null,
      drop: {
        pending: null,
        result: _result4
      },
      dimension: noDimensions
    };
  }

  return state;
};

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(215);
module.exports = __webpack_require__(4).Object.keys;


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(37);
var $keys = __webpack_require__(39);

__webpack_require__(108)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(217), __esModule: true };

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(218);
module.exports = __webpack_require__(4).Object.assign;


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(10);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(219) });


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(39);
var gOPS = __webpack_require__(72);
var pIE = __webpack_require__(46);
var toObject = __webpack_require__(37);
var IObject = __webpack_require__(113);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(29)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(221), __esModule: true };

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(109);
__webpack_require__(222);
module.exports = __webpack_require__(4).Array.from;


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(58);
var $export = __webpack_require__(10);
var toObject = __webpack_require__(37);
var call = __webpack_require__(223);
var isArrayIter = __webpack_require__(224);
var toLength = __webpack_require__(114);
var createProperty = __webpack_require__(225);
var getIterFn = __webpack_require__(226);

$export($export.S + $export.F * !__webpack_require__(228)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(28);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(38);
var ITERATOR = __webpack_require__(7)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(12);
var createDesc = __webpack_require__(36);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(227);
var ITERATOR = __webpack_require__(7)('iterator');
var Iterators = __webpack_require__(38);
module.exports = __webpack_require__(4).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(67);
var TAG = __webpack_require__(7)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(7)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getDroppableOver = __webpack_require__(230);

var _getDroppableOver2 = _interopRequireDefault(_getDroppableOver);

var _getDraggablesInsideDroppable = __webpack_require__(32);

var _getDraggablesInsideDroppable2 = _interopRequireDefault(_getDraggablesInsideDroppable);

var _noImpact = __webpack_require__(48);

var _noImpact2 = _interopRequireDefault(_noImpact);

var _inHomeList = __webpack_require__(233);

var _inHomeList2 = _interopRequireDefault(_inHomeList);

var _inForeignList = __webpack_require__(234);

var _inForeignList2 = _interopRequireDefault(_inForeignList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var pageCenter = _ref.pageCenter,
      draggable = _ref.draggable,
      draggables = _ref.draggables,
      droppables = _ref.droppables,
      previousImpact = _ref.previousImpact;

  var previousDroppableOverId = previousImpact.destination && previousImpact.destination.droppableId;

  var destinationId = (0, _getDroppableOver2.default)({
    target: pageCenter,
    draggable: draggable,
    draggables: draggables,
    droppables: droppables,
    previousDroppableOverId: previousDroppableOverId
  });

  if (!destinationId) {
    return _noImpact2.default;
  }

  var destination = droppables[destinationId];

  if (!destination.isEnabled) {
    return _noImpact2.default;
  }

  var home = droppables[draggable.descriptor.droppableId];
  var isWithinHomeDroppable = home.descriptor.id === destinationId;
  var insideDestination = (0, _getDraggablesInsideDroppable2.default)(destination, draggables);

  if (isWithinHomeDroppable) {
    return (0, _inHomeList2.default)({
      pageCenter: pageCenter,
      draggable: draggable,
      home: home,
      insideHome: insideDestination,
      previousImpact: previousImpact || _noImpact2.default
    });
  }

  return (0, _inForeignList2.default)({
    pageCenter: pageCenter,
    draggable: draggable,
    destination: destination,
    insideDestination: insideDestination,
    previousImpact: previousImpact || _noImpact2.default
  });
};

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(18);

var _keys2 = _interopRequireDefault(_keys);

var _memoizeOne = __webpack_require__(3);

var _memoizeOne2 = _interopRequireDefault(_memoizeOne);

var _getArea = __webpack_require__(31);

var _getArea2 = _interopRequireDefault(_getArea);

var _getDraggablesInsideDroppable = __webpack_require__(32);

var _getDraggablesInsideDroppable2 = _interopRequireDefault(_getDraggablesInsideDroppable);

var _isPositionInFrame = __webpack_require__(231);

var _isPositionInFrame2 = _interopRequireDefault(_isPositionInFrame);

var _position = __webpack_require__(2);

var _spacing = __webpack_require__(40);

var _dimension = __webpack_require__(49);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRequiredGrowth = (0, _memoizeOne2.default)(function (draggable, draggables, droppable) {

  var getResult = function getResult(existingSpace) {
    var requiredSpace = draggable.page.withMargin[droppable.axis.size];

    if (requiredSpace <= existingSpace) {
      return null;
    }
    var requiredGrowth = (0, _position.patch)(droppable.axis.line, requiredSpace - existingSpace);

    return requiredGrowth;
  };

  var dimensions = (0, _getDraggablesInsideDroppable2.default)(droppable, draggables);

  if (!dimensions.length) {
    var _existingSpace = droppable.page.withMargin[droppable.axis.size];
    return getResult(_existingSpace);
  }

  var endOfDraggables = dimensions[dimensions.length - 1].page.withMargin[droppable.axis.end];
  var endOfDroppable = droppable.page.withMargin[droppable.axis.end];
  var existingSpace = endOfDroppable - endOfDraggables;

  return getResult(existingSpace);
});

var getWithGrowth = (0, _memoizeOne2.default)(function (area, growth) {
  return (0, _getArea2.default)((0, _spacing.addPosition)(area, growth));
});

var getClippedAreaWithPlaceholder = function getClippedAreaWithPlaceholder(_ref) {
  var draggable = _ref.draggable,
      draggables = _ref.draggables,
      droppable = _ref.droppable,
      previousDroppableOverId = _ref.previousDroppableOverId;

  var isHome = draggable.descriptor.droppableId === droppable.descriptor.id;
  var wasOver = Boolean(previousDroppableOverId && previousDroppableOverId === droppable.descriptor.id);
  var subject = droppable.viewport.subject;
  var frame = droppable.viewport.frame;
  var clipped = droppable.viewport.clipped;

  if (!clipped) {
    return clipped;
  }

  if (isHome || !wasOver) {
    return clipped;
  }

  var requiredGrowth = getRequiredGrowth(draggable, draggables, droppable);

  if (!requiredGrowth) {
    return clipped;
  }

  var isClippedByFrame = subject[droppable.axis.size] !== frame[droppable.axis.size];

  var subjectWithGrowth = getWithGrowth(clipped, requiredGrowth);

  if (!isClippedByFrame) {
    return subjectWithGrowth;
  }

  return (0, _dimension.clip)(frame, subjectWithGrowth);
};

exports.default = function (_ref2) {
  var target = _ref2.target,
      draggable = _ref2.draggable,
      draggables = _ref2.draggables,
      droppables = _ref2.droppables,
      previousDroppableOverId = _ref2.previousDroppableOverId;

  var maybe = (0, _keys2.default)(droppables).map(function (id) {
    return droppables[id];
  }).filter(function (droppable) {
    return droppable.isEnabled;
  }).find(function (droppable) {
    var withPlaceholder = getClippedAreaWithPlaceholder({
      draggable: draggable, draggables: draggables, droppable: droppable, previousDroppableOverId: previousDroppableOverId
    });

    if (!withPlaceholder) {
      return false;
    }

    return (0, _isPositionInFrame2.default)(withPlaceholder)(target);
  });

  return maybe ? maybe.descriptor.id : null;
};

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isWithin = __webpack_require__(75);

var _isWithin2 = _interopRequireDefault(_isWithin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (frame) {
  var isWithinVertical = (0, _isWithin2.default)(frame.top, frame.bottom);
  var isWithinHorizontal = (0, _isWithin2.default)(frame.left, frame.right);

  return function (point) {
    return isWithinVertical(point.y) && isWithinVertical(point.y) && isWithinHorizontal(point.x) && isWithinHorizontal(point.x);
  };
};

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var vertical = exports.vertical = {
  direction: 'vertical',
  line: 'y',
  crossLine: 'x',
  start: 'top',
  end: 'bottom',
  size: 'height',
  crossAxisStart: 'left',
  crossAxisEnd: 'right',
  crossAxisSize: 'width'
};

var horizontal = exports.horizontal = {
  direction: 'horizontal',
  line: 'x',
  crossLine: 'y',
  start: 'left',
  end: 'right',
  size: 'width',
  crossAxisStart: 'top',
  crossAxisEnd: 'bottom',
  crossAxisSize: 'height'
};

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _position = __webpack_require__(2);

var _getDisplacement = __webpack_require__(33);

var _getDisplacement2 = _interopRequireDefault(_getDisplacement);

var _getViewport = __webpack_require__(19);

var _getViewport2 = _interopRequireDefault(_getViewport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var pageCenter = _ref.pageCenter,
      draggable = _ref.draggable,
      home = _ref.home,
      insideHome = _ref.insideHome,
      previousImpact = _ref.previousImpact;

  var viewport = (0, _getViewport2.default)();
  var axis = home.axis;

  var originalCenter = draggable.page.withoutMargin.center;

  var homeScrollDiff = home.viewport.frameScroll.diff.value;

  var currentCenter = (0, _position.add)(pageCenter, homeScrollDiff);

  var isBeyondStartPosition = currentCenter[axis.line] - originalCenter[axis.line] > 0;

  var amount = (0, _position.patch)(axis.line, draggable.client.withMargin[axis.size]);

  var displaced = insideHome.filter(function (child) {
    if (child === draggable) {
      return false;
    }

    var area = child.page.withoutMargin;

    if (isBeyondStartPosition) {
      if (area.center[axis.line] < originalCenter[axis.line]) {
        return false;
      }

      return currentCenter[axis.line] > area[axis.start];
    }

    if (originalCenter[axis.line] < area.center[axis.line]) {
      return false;
    }

    return currentCenter[axis.line] < area[axis.end];
  }).map(function (dimension) {
    return (0, _getDisplacement2.default)({
      draggable: dimension,
      destination: home,
      previousImpact: previousImpact,
      viewport: viewport
    });
  });

  var ordered = isBeyondStartPosition ? displaced.reverse() : displaced;
  var index = function () {
    var startIndex = insideHome.indexOf(draggable);
    var length = ordered.length;
    if (!length) {
      return startIndex;
    }

    if (isBeyondStartPosition) {
      return startIndex + length;
    }

    return startIndex - length;
  }();

  var movement = {
    amount: amount,
    displaced: ordered,
    isBeyondStartPosition: isBeyondStartPosition
  };

  var impact = {
    movement: movement,
    direction: axis.direction,
    destination: {
      droppableId: home.descriptor.id,
      index: index
    }
  };

  return impact;
};

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _position = __webpack_require__(2);

var _getDisplacement = __webpack_require__(33);

var _getDisplacement2 = _interopRequireDefault(_getDisplacement);

var _getViewport = __webpack_require__(19);

var _getViewport2 = _interopRequireDefault(_getViewport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var pageCenter = _ref.pageCenter,
      draggable = _ref.draggable,
      destination = _ref.destination,
      insideDestination = _ref.insideDestination,
      previousImpact = _ref.previousImpact;

  var axis = destination.axis;
  var viewport = (0, _getViewport2.default)();

  var destinationScrollDiff = destination.viewport.frameScroll.diff.value;
  var currentCenter = (0, _position.add)(pageCenter, destinationScrollDiff);

  var displaced = insideDestination.filter(function (child) {
    var threshold = child.page.withoutMargin[axis.end];
    return threshold > currentCenter[axis.line];
  }).map(function (dimension) {
    return (0, _getDisplacement2.default)({
      draggable: dimension,
      destination: destination,
      previousImpact: previousImpact,
      viewport: viewport
    });
  });

  var newIndex = insideDestination.length - displaced.length;

  var movement = {
    amount: (0, _position.patch)(axis.line, draggable.page.withMargin[axis.size]),
    displaced: displaced,
    isBeyondStartPosition: false
  };

  var impact = {
    movement: movement,
    direction: axis.direction,
    destination: {
      droppableId: destination.descriptor.id,
      index: newIndex
    }
  };

  return impact;
};

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inHomeList = __webpack_require__(236);

var _inHomeList2 = _interopRequireDefault(_inHomeList);

var _inForeignList = __webpack_require__(237);

var _inForeignList2 = _interopRequireDefault(_inForeignList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (args) {
  var draggableId = args.draggableId,
      draggables = args.draggables,
      droppable = args.droppable;


  var draggable = draggables[draggableId];
  var isInHomeList = draggable.descriptor.droppableId === droppable.descriptor.id;

  if (!droppable.isEnabled) {
    return null;
  }

  if (isInHomeList) {
    return (0, _inHomeList2.default)(args);
  }

  return (0, _inForeignList2.default)(args);
};

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(47);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _memoizeOne = __webpack_require__(3);

var _memoizeOne2 = _interopRequireDefault(_memoizeOne);

var _getDraggablesInsideDroppable = __webpack_require__(32);

var _getDraggablesInsideDroppable2 = _interopRequireDefault(_getDraggablesInsideDroppable);

var _position = __webpack_require__(2);

var _isVisibleInNewLocation = __webpack_require__(124);

var _isVisibleInNewLocation2 = _interopRequireDefault(_isVisibleInNewLocation);

var _getViewport = __webpack_require__(19);

var _getViewport2 = _interopRequireDefault(_getViewport);

var _moveToEdge = __webpack_require__(41);

var _moveToEdge2 = _interopRequireDefault(_moveToEdge);

var _getDisplacement = __webpack_require__(33);

var _getDisplacement2 = _interopRequireDefault(_getDisplacement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getIndex = (0, _memoizeOne2.default)(function (draggables, target) {
  return draggables.indexOf(target);
});

exports.default = function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      draggableId = _ref.draggableId,
      previousImpact = _ref.previousImpact,
      droppable = _ref.droppable,
      draggables = _ref.draggables;

  var location = previousImpact.destination;

  if (!location) {
    console.error('cannot move to next index when there is not previous destination');
    return null;
  }

  var draggable = draggables[draggableId];
  var axis = droppable.axis;

  var insideDroppable = (0, _getDraggablesInsideDroppable2.default)(droppable, draggables);

  var startIndex = getIndex(insideDroppable, draggable);
  var currentIndex = location.index;
  var proposedIndex = isMovingForward ? currentIndex + 1 : currentIndex - 1;

  if (startIndex === -1) {
    console.error('could not find draggable inside current droppable');
    return null;
  }

  if (proposedIndex > insideDroppable.length - 1) {
    return null;
  }

  if (proposedIndex < 0) {
    return null;
  }

  var destination = insideDroppable[proposedIndex];
  var isMovingTowardStart = isMovingForward && proposedIndex <= startIndex || !isMovingForward && proposedIndex >= startIndex;

  var edge = function () {
    if (!isMovingTowardStart) {
      return isMovingForward ? 'end' : 'start';
    }

    return isMovingForward ? 'start' : 'end';
  }();

  var newCenter = (0, _moveToEdge2.default)({
    source: draggable.page.withoutMargin,
    sourceEdge: edge,
    destination: destination.page.withoutMargin,
    destinationEdge: edge,
    destinationAxis: droppable.axis
  });

  var viewport = (0, _getViewport2.default)();

  var isVisible = (0, _isVisibleInNewLocation2.default)({
    draggable: draggable,
    destination: droppable,
    newCenter: newCenter,
    viewport: viewport
  });

  if (!isVisible) {
    return null;
  }

  var destinationDisplacement = {
    draggableId: destination.descriptor.id,
    isVisible: true,
    shouldAnimate: true
  };

  var modified = isMovingTowardStart ? previousImpact.movement.displaced.slice(1, previousImpact.movement.displaced.length) : [destinationDisplacement].concat((0, _toConsumableArray3.default)(previousImpact.movement.displaced));

  var displaced = modified.map(function (displacement) {
    var target = draggables[displacement.draggableId];

    var updated = (0, _getDisplacement2.default)({
      draggable: target,
      destination: droppable,
      previousImpact: previousImpact,
      viewport: viewport
    });

    return updated;
  });

  var newImpact = {
    movement: {
      displaced: displaced,

      amount: (0, _position.patch)(axis.line, draggable.page.withMargin[axis.size]),
      isBeyondStartPosition: proposedIndex > startIndex
    },
    destination: {
      droppableId: droppable.descriptor.id,
      index: proposedIndex
    },
    direction: droppable.axis.direction
  };

  var result = {
    pageCenter: newCenter,
    impact: newImpact
  };

  return result;
};

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(47);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getDraggablesInsideDroppable = __webpack_require__(32);

var _getDraggablesInsideDroppable2 = _interopRequireDefault(_getDraggablesInsideDroppable);

var _position = __webpack_require__(2);

var _moveToEdge = __webpack_require__(41);

var _moveToEdge2 = _interopRequireDefault(_moveToEdge);

var _getDisplacement = __webpack_require__(33);

var _getDisplacement2 = _interopRequireDefault(_getDisplacement);

var _getViewport = __webpack_require__(19);

var _getViewport2 = _interopRequireDefault(_getViewport);

var _isVisibleInNewLocation = __webpack_require__(124);

var _isVisibleInNewLocation2 = _interopRequireDefault(_isVisibleInNewLocation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      draggableId = _ref.draggableId,
      previousImpact = _ref.previousImpact,
      droppable = _ref.droppable,
      draggables = _ref.draggables;

  if (!previousImpact.destination) {
    console.error('cannot move to next index when there is not previous destination');
    return null;
  }

  var location = previousImpact.destination;
  var draggable = draggables[draggableId];
  var axis = droppable.axis;

  var insideForeignDroppable = (0, _getDraggablesInsideDroppable2.default)(droppable, draggables);

  var currentIndex = location.index;
  var proposedIndex = isMovingForward ? currentIndex + 1 : currentIndex - 1;
  var lastIndex = insideForeignDroppable.length - 1;

  if (proposedIndex > insideForeignDroppable.length) {
    return null;
  }

  if (proposedIndex < 0) {
    return null;
  }

  var movingRelativeTo = insideForeignDroppable[Math.min(proposedIndex, lastIndex)];

  var isMovingPastLastIndex = proposedIndex > lastIndex;
  var sourceEdge = 'start';
  var destinationEdge = function () {
    if (isMovingPastLastIndex) {
      return 'end';
    }

    return 'start';
  }();

  var viewport = (0, _getViewport2.default)();
  var newCenter = (0, _moveToEdge2.default)({
    source: draggable.page.withoutMargin,
    sourceEdge: sourceEdge,
    destination: movingRelativeTo.page.withMargin,
    destinationEdge: destinationEdge,
    destinationAxis: droppable.axis
  });

  var isVisible = function () {
    if (isMovingPastLastIndex) {
      return true;
    }

    return (0, _isVisibleInNewLocation2.default)({
      draggable: draggable,
      destination: droppable,
      newCenter: newCenter,
      viewport: viewport
    });
  }();

  if (!isVisible) {
    return null;
  }

  var movingRelativeToDisplacement = {
    draggableId: movingRelativeTo.descriptor.id,
    isVisible: true,
    shouldAnimate: true
  };

  var modified = isMovingForward ? previousImpact.movement.displaced.slice(1, previousImpact.movement.displaced.length) : [movingRelativeToDisplacement].concat((0, _toConsumableArray3.default)(previousImpact.movement.displaced));

  var displaced = modified.map(function (displacement) {
    if (displacement === movingRelativeToDisplacement) {
      return displacement;
    }

    var target = draggables[displacement.draggableId];

    var updated = (0, _getDisplacement2.default)({
      draggable: target,
      destination: droppable,
      viewport: viewport,
      previousImpact: previousImpact
    });

    return updated;
  });

  var newImpact = {
    movement: {
      displaced: displaced,

      amount: (0, _position.patch)(axis.line, draggable.page.withMargin[axis.size]),

      isBeyondStartPosition: false
    },
    destination: {
      droppableId: droppable.descriptor.id,
      index: proposedIndex
    },
    direction: droppable.axis.direction
  };

  return {
    pageCenter: newCenter,
    impact: newImpact
  };
};

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getBestCrossAxisDroppable = __webpack_require__(239);

var _getBestCrossAxisDroppable2 = _interopRequireDefault(_getBestCrossAxisDroppable);

var _getClosestDraggable = __webpack_require__(240);

var _getClosestDraggable2 = _interopRequireDefault(_getClosestDraggable);

var _moveToNewDroppable = __webpack_require__(241);

var _moveToNewDroppable2 = _interopRequireDefault(_moveToNewDroppable);

var _noImpact = __webpack_require__(48);

var _noImpact2 = _interopRequireDefault(_noImpact);

var _getDraggablesInsideDroppable = __webpack_require__(32);

var _getDraggablesInsideDroppable2 = _interopRequireDefault(_getDraggablesInsideDroppable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      pageCenter = _ref.pageCenter,
      draggableId = _ref.draggableId,
      droppableId = _ref.droppableId,
      home = _ref.home,
      draggables = _ref.draggables,
      droppables = _ref.droppables,
      previousImpact = _ref.previousImpact;

  var draggable = draggables[draggableId];
  var source = droppables[droppableId];

  var destination = (0, _getBestCrossAxisDroppable2.default)({
    isMovingForward: isMovingForward,
    pageCenter: pageCenter,
    source: source,
    droppables: droppables
  });

  if (!destination) {
    return null;
  }

  var insideDestination = (0, _getDraggablesInsideDroppable2.default)(destination, draggables);

  var target = (0, _getClosestDraggable2.default)({
    axis: destination.axis,
    pageCenter: pageCenter,
    destination: destination,
    insideDestination: insideDestination
  });

  if (insideDestination.length && !target) {
    return null;
  }

  return (0, _moveToNewDroppable2.default)({
    pageCenter: pageCenter,
    destination: destination,
    draggable: draggable,
    target: target,
    insideDestination: insideDestination,
    home: home,
    previousImpact: previousImpact || _noImpact2.default
  });
};

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(18);

var _keys2 = _interopRequireDefault(_keys);

var _position = __webpack_require__(2);

var _isWithin = __webpack_require__(75);

var _isWithin2 = _interopRequireDefault(_isWithin);

var _spacing = __webpack_require__(40);

var _getViewport = __webpack_require__(19);

var _getViewport2 = _interopRequireDefault(_getViewport);

var _isVisibleThroughFrame = __webpack_require__(123);

var _isVisibleThroughFrame2 = _interopRequireDefault(_isVisibleThroughFrame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getSafeClipped = function getSafeClipped(droppable) {
  var area = droppable.viewport.clipped;

  if (!area) {
    throw new Error('cannot get clipped area from droppable');
  }
  return area;
};

exports.default = function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      pageCenter = _ref.pageCenter,
      source = _ref.source,
      droppables = _ref.droppables;

  var sourceClipped = source.viewport.clipped;

  if (!sourceClipped) {
    return null;
  }

  var axis = source.axis;
  var isBetweenSourceClipped = (0, _isWithin2.default)(sourceClipped[axis.start], sourceClipped[axis.end]);
  var viewport = (0, _getViewport2.default)();

  var candidates = (0, _keys2.default)(droppables).map(function (id) {
    return droppables[id];
  }).filter(function (droppable) {
    return droppable !== source;
  }).filter(function (droppable) {
    return droppable.isEnabled;
  }).filter(function (droppable) {
    return Boolean(droppable.viewport.clipped);
  }).filter(function (droppable) {
    return (0, _isVisibleThroughFrame2.default)(viewport)(droppable.viewport.frame);
  }).filter(function (droppable) {
    var targetClipped = getSafeClipped(droppable);

    if (isMovingForward) {
      return sourceClipped[axis.crossAxisEnd] <= targetClipped[axis.crossAxisStart];
    }

    return targetClipped[axis.crossAxisEnd] <= sourceClipped[axis.crossAxisStart];
  }).filter(function (droppable) {
    var targetClipped = getSafeClipped(droppable);

    var isBetweenDestinationClipped = (0, _isWithin2.default)(targetClipped[axis.start], targetClipped[axis.end]);

    return isBetweenSourceClipped(targetClipped[axis.start]) || isBetweenSourceClipped(targetClipped[axis.end]) || isBetweenDestinationClipped(sourceClipped[axis.start]) || isBetweenDestinationClipped(sourceClipped[axis.end]);
  }).sort(function (a, b) {
    var first = getSafeClipped(a)[axis.crossAxisStart];
    var second = getSafeClipped(b)[axis.crossAxisStart];

    if (isMovingForward) {
      return first - second;
    }
    return second - first;
  }).filter(function (droppable, index, array) {
    return getSafeClipped(droppable)[axis.crossAxisStart] === getSafeClipped(array[0])[axis.crossAxisStart];
  });

  if (!candidates.length) {
    return null;
  }

  if (candidates.length === 1) {
    return candidates[0];
  }

  var contains = candidates.filter(function (droppable) {
    var isWithinDroppable = (0, _isWithin2.default)(getSafeClipped(droppable)[axis.start], getSafeClipped(droppable)[axis.end]);
    return isWithinDroppable(pageCenter[axis.line]);
  });

  if (contains.length === 1) {
    return contains[0];
  }

  if (contains.length > 1) {
    return contains.sort(function (a, b) {
      return getSafeClipped(a)[axis.start] - getSafeClipped(b)[axis.start];
    })[0];
  }

  return candidates.sort(function (a, b) {
    var first = (0, _position.closest)(pageCenter, (0, _spacing.getCorners)(getSafeClipped(a)));
    var second = (0, _position.closest)(pageCenter, (0, _spacing.getCorners)(getSafeClipped(b)));

    if (first !== second) {
      return first - second;
    }

    return getSafeClipped(a)[axis.start] - getSafeClipped(b)[axis.start];
  })[0];
};

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _position = __webpack_require__(2);

var _getViewport = __webpack_require__(19);

var _getViewport2 = _interopRequireDefault(_getViewport);

var _isPartiallyVisible = __webpack_require__(76);

var _isPartiallyVisible2 = _interopRequireDefault(_isPartiallyVisible);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var axis = _ref.axis,
      pageCenter = _ref.pageCenter,
      destination = _ref.destination,
      insideDestination = _ref.insideDestination;

  if (!insideDestination.length) {
    return null;
  }

  var viewport = (0, _getViewport2.default)();

  var result = insideDestination.filter(function (draggable) {
    return (0, _isPartiallyVisible2.default)({
      target: draggable.page.withMargin,
      destination: destination,
      viewport: viewport
    });
  }).sort(function (a, b) {
    var distanceToA = (0, _position.distance)(pageCenter, a.page.withMargin.center);
    var distanceToB = (0, _position.distance)(pageCenter, b.page.withMargin.center);

    if (distanceToA < distanceToB) {
      return -1;
    }

    if (distanceToB < distanceToA) {
      return 1;
    }

    return a.page.withMargin[axis.start] - b.page.withMargin[axis.start];
  });

  return result.length ? result[0] : null;
};

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toHomeList = __webpack_require__(242);

var _toHomeList2 = _interopRequireDefault(_toHomeList);

var _toForeignList = __webpack_require__(243);

var _toForeignList2 = _interopRequireDefault(_toForeignList);

var _position = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var pageCenter = _ref.pageCenter,
      destination = _ref.destination,
      draggable = _ref.draggable,
      target = _ref.target,
      home = _ref.home,
      insideDestination = _ref.insideDestination,
      previousImpact = _ref.previousImpact;

  var amount = (0, _position.patch)(destination.axis.line, draggable.client.withMargin[destination.axis.size]);

  if (destination.descriptor.id === draggable.descriptor.droppableId) {
    return (0, _toHomeList2.default)({
      amount: amount,
      originalIndex: home.index,
      target: target,
      insideDroppable: insideDestination,
      draggable: draggable,
      droppable: destination,
      previousImpact: previousImpact
    });
  }

  return (0, _toForeignList2.default)({
    amount: amount,
    pageCenter: pageCenter,
    target: target,
    insideDroppable: insideDestination,
    draggable: draggable,
    droppable: destination,
    previousImpact: previousImpact
  });
};

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moveToEdge = __webpack_require__(41);

var _moveToEdge2 = _interopRequireDefault(_moveToEdge);

var _getViewport = __webpack_require__(19);

var _getViewport2 = _interopRequireDefault(_getViewport);

var _getDisplacement = __webpack_require__(33);

var _getDisplacement2 = _interopRequireDefault(_getDisplacement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var amount = _ref.amount,
      originalIndex = _ref.originalIndex,
      target = _ref.target,
      insideDroppable = _ref.insideDroppable,
      draggable = _ref.draggable,
      droppable = _ref.droppable,
      previousImpact = _ref.previousImpact;

  if (!target) {
    console.error('there will always be a target in the original list');
    return null;
  }

  var axis = droppable.axis;
  var targetIndex = insideDroppable.indexOf(target);

  if (targetIndex === -1) {
    console.error('unable to find target in destination droppable');
    return null;
  }

  if (targetIndex === originalIndex) {
    var _newCenter = draggable.page.withoutMargin.center;
    var _newImpact = {
      movement: {
        displaced: [],
        amount: amount,
        isBeyondStartPosition: false
      },
      direction: droppable.axis.direction,
      destination: {
        droppableId: droppable.descriptor.id,
        index: originalIndex
      }
    };

    return {
      pageCenter: _newCenter,
      impact: _newImpact
    };
  }

  var isMovingPastOriginalIndex = targetIndex > originalIndex;
  var edge = isMovingPastOriginalIndex ? 'end' : 'start';

  var newCenter = (0, _moveToEdge2.default)({
    source: draggable.page.withoutMargin,
    sourceEdge: edge,
    destination: isMovingPastOriginalIndex ? target.page.withoutMargin : target.page.withMargin,
    destinationEdge: edge,
    destinationAxis: axis
  });

  var modified = function () {
    if (!isMovingPastOriginalIndex) {
      return insideDroppable.slice(targetIndex, originalIndex);
    }

    var from = originalIndex + 1;

    var to = targetIndex + 1;

    return insideDroppable.slice(from, to).reverse();
  }();

  var viewport = (0, _getViewport2.default)();
  var displaced = modified.map(function (dimension) {
    return (0, _getDisplacement2.default)({
      draggable: dimension,
      destination: droppable,
      previousImpact: previousImpact,
      viewport: viewport
    });
  });

  var newImpact = {
    movement: {
      displaced: displaced,
      amount: amount,
      isBeyondStartPosition: isMovingPastOriginalIndex
    },
    direction: axis.direction,
    destination: {
      droppableId: droppable.descriptor.id,
      index: targetIndex
    }
  };

  return {
    pageCenter: newCenter,
    impact: newImpact
  };
};

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moveToEdge = __webpack_require__(41);

var _moveToEdge2 = _interopRequireDefault(_moveToEdge);

var _getDisplacement = __webpack_require__(33);

var _getDisplacement2 = _interopRequireDefault(_getDisplacement);

var _getViewport = __webpack_require__(19);

var _getViewport2 = _interopRequireDefault(_getViewport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var amount = _ref.amount,
      pageCenter = _ref.pageCenter,
      target = _ref.target,
      insideDroppable = _ref.insideDroppable,
      draggable = _ref.draggable,
      droppable = _ref.droppable,
      previousImpact = _ref.previousImpact;

  var axis = droppable.axis;
  var isGoingBeforeTarget = Boolean(target && pageCenter[droppable.axis.line] < target.page.withMargin.center[droppable.axis.line]);

  if (!target) {

    var _newCenter = (0, _moveToEdge2.default)({
      source: draggable.page.withoutMargin,
      sourceEdge: 'start',
      destination: droppable.page.withMarginAndPadding,
      destinationEdge: 'start',
      destinationAxis: axis
    });

    var _newImpact = {
      movement: {
        displaced: [],
        amount: amount,
        isBeyondStartPosition: false
      },
      direction: axis.direction,
      destination: {
        droppableId: droppable.descriptor.id,
        index: 0
      }
    };

    return {
      pageCenter: _newCenter,
      impact: _newImpact
    };
  }

  var targetIndex = insideDroppable.indexOf(target);
  var proposedIndex = isGoingBeforeTarget ? targetIndex : targetIndex + 1;

  if (targetIndex === -1) {
    console.error('could not find target inside destination');
    return null;
  }

  var newCenter = (0, _moveToEdge2.default)({
    source: draggable.page.withoutMargin,
    sourceEdge: 'start',
    destination: target.page.withMargin,
    destinationEdge: isGoingBeforeTarget ? 'start' : 'end',
    destinationAxis: axis
  });

  var viewport = (0, _getViewport2.default)();
  var displaced = insideDroppable.slice(proposedIndex, insideDroppable.length).map(function (dimension) {
    return (0, _getDisplacement2.default)({
      draggable: dimension,
      destination: droppable,
      viewport: viewport,
      previousImpact: previousImpact
    });
  });

  var newImpact = {
    movement: {
      displaced: displaced,
      amount: amount,
      isBeyondStartPosition: false
    },
    direction: axis.direction,
    destination: {
      droppableId: droppable.descriptor.id,
      index: proposedIndex
    }
  };

  return {
    pageCenter: newCenter,
    impact: newImpact
  };
};

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (hooks, previous, current) {
  var onDragStart = hooks.onDragStart,
      onDragEnd = hooks.onDragEnd;

  var currentPhase = current.phase;
  var previousPhase = previous.phase;

  if (currentPhase === previousPhase) {
    return;
  }

  if (currentPhase === 'DRAGGING' && previousPhase !== 'DRAGGING') {
    if (!onDragStart) {
      return;
    }

    if (!current.drag) {
      console.error('cannot fire onDragStart hook without drag state', { current: current, previous: previous });
      return;
    }

    var descriptor = current.drag.initial.descriptor;
    var home = current.dimension.droppable[descriptor.droppableId];

    if (!home) {
      console.error('cannot find dimension for home droppable');
      return;
    }

    var source = {
      index: descriptor.index,
      droppableId: descriptor.droppableId
    };

    var start = {
      draggableId: descriptor.id,
      type: home.descriptor.type,
      source: source
    };

    onDragStart(start);
    return;
  }

  if (currentPhase === 'DROP_COMPLETE' && previousPhase !== 'DROP_COMPLETE') {
    if (!current.drop || !current.drop.result) {
      console.error('cannot fire onDragEnd hook without drag state', { current: current, previous: previous });
      return;
    }

    var _current$drop$result = current.drop.result,
        _source = _current$drop$result.source,
        destination = _current$drop$result.destination,
        draggableId = _current$drop$result.draggableId,
        type = _current$drop$result.type;

    if (!destination) {
      onDragEnd(current.drop.result);
      return;
    }

    var didMove = _source.droppableId !== destination.droppableId || _source.index !== destination.index;

    if (didMove) {
      onDragEnd(current.drop.result);
      return;
    }

    var muted = {
      draggableId: draggableId,
      type: type,
      source: _source,
      destination: null
    };

    onDragEnd(muted);
    return;
  }

  if (currentPhase === 'IDLE' && previousPhase === 'DRAGGING') {
    if (!previous.drag) {
      console.error('cannot fire onDragEnd for cancel because cannot find previous drag');
      return;
    }

    var _descriptor = previous.drag.initial.descriptor;
    var _home = previous.dimension.droppable[_descriptor.droppableId];

    if (!_home) {
      console.error('cannot find dimension for home droppable');
      return;
    }

    var _source2 = {
      index: _descriptor.index,
      droppableId: _descriptor.droppableId
    };

    var result = {
      draggableId: _descriptor.id,
      type: _home.descriptor.type,
      source: _source2,
      destination: null
    };
    onDragEnd(result);
    return;
  }

  if (currentPhase === 'IDLE' && previousPhase === 'DROP_ANIMATING') {
    if (!previous.drop || !previous.drop.pending) {
      console.error('cannot fire onDragEnd for cancel because cannot find previous pending drop');
      return;
    }

    var _result = {
      draggableId: previous.drop.pending.result.draggableId,
      type: previous.drop.pending.result.type,
      source: previous.drop.pending.result.source,
      destination: null
    };
    onDragEnd(_result);
  }
};

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(47);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = __webpack_require__(18);

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = __webpack_require__(9);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = __webpack_require__(24);

var _extends5 = _interopRequireDefault(_extends4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (callbacks) {
  var state = {
    droppables: {},
    draggables: {},
    isCollecting: false,
    request: null,
    frameId: null
  };

  var setState = function setState(partial) {
    var newState = (0, _extends5.default)({}, state, partial);
    state = newState;
  };

  var cancel = function cancel() {
    var _console;

    (_console = console).error.apply(_console, arguments);

    if (!state.isCollecting) {
      return;
    }

    stopCollecting();
    callbacks.cancel();
  };

  var registerDraggable = function registerDraggable(descriptor, getDimension) {
    var id = descriptor.id;

    if (!state.droppables[descriptor.droppableId]) {
      cancel('Cannot register Draggable ' + id + ' as there is no entry for the Droppable ' + descriptor.droppableId);
      return;
    }

    var entry = {
      descriptor: descriptor,
      getDimension: getDimension
    };
    var draggables = (0, _extends5.default)({}, state.draggables, (0, _defineProperty3.default)({}, id, entry));

    setState({
      draggables: draggables
    });

    if (!state.isCollecting) {
      return;
    }

    console.warn('Adding a draggable during a drag is currently not supported');
  };

  var registerDroppable = function registerDroppable(descriptor, droppableCallbacks) {
    var id = descriptor.id;

    var entry = {
      descriptor: descriptor,
      callbacks: droppableCallbacks
    };

    var droppables = (0, _extends5.default)({}, state.droppables, (0, _defineProperty3.default)({}, id, entry));

    setState({
      droppables: droppables
    });

    if (!state.isCollecting) {
      return;
    }

    console.warn('Currently not supporting updating Droppables during a drag');
  };

  var updateDroppableIsEnabled = function updateDroppableIsEnabled(id, isEnabled) {
    if (!state.droppables[id]) {
      cancel('Cannot update the scroll on Droppable ' + id + ' as it is not registered');
      return;
    }

    if (!state.isCollecting) {
      return;
    }
    callbacks.updateDroppableIsEnabled(id, isEnabled);
  };

  var updateDroppableScroll = function updateDroppableScroll(id, newScroll) {
    if (!state.droppables[id]) {
      cancel('Cannot update the scroll on Droppable ' + id + ' as it is not registered');
      return;
    }

    if (!state.isCollecting) {
      return;
    }
    callbacks.updateDroppableScroll(id, newScroll);
  };

  var unregisterDraggable = function unregisterDraggable(descriptor) {
    var entry = state.draggables[descriptor.id];

    if (!entry) {
      cancel('Cannot unregister Draggable with id ' + descriptor.id + ' as it is not registered');
      return;
    }

    if (entry.descriptor !== descriptor) {
      return;
    }

    var newMap = (0, _extends5.default)({}, state.draggables);
    delete newMap[descriptor.id];

    setState({
      draggables: newMap
    });

    if (!state.isCollecting) {
      return;
    }

    console.warn('currently not supporting unmounting a Draggable during a drag');
  };

  var unregisterDroppable = function unregisterDroppable(descriptor) {
    var entry = state.droppables[descriptor.id];

    if (!entry) {
      cancel('Cannot unregister Droppable with id ' + descriptor.id + ' as as it is not registered');
      return;
    }

    if (entry.descriptor !== descriptor) {
      return;
    }

    var newMap = (0, _extends5.default)({}, state.droppables);
    delete newMap[descriptor.id];

    setState({
      droppables: newMap
    });

    if (!state.isCollecting) {
      return;
    }

    console.warn('currently not supporting unmounting a Droppable during a drag');
  };

  var getToBeCollected = function getToBeCollected() {
    var draggables = state.draggables;
    var droppables = state.droppables;
    var request = state.request;

    if (!request) {
      console.error('cannot find request in state');
      return [];
    }

    var descriptor = draggables[request].descriptor;
    var home = droppables[descriptor.droppableId].descriptor;

    var draggablesToBeCollected = (0, _keys2.default)(draggables).map(function (id) {
      return draggables[id].descriptor;
    }).filter(function (item) {
      return item.id !== descriptor.id;
    }).filter(function (item) {
      var entry = droppables[item.droppableId];

      if (!entry) {
        console.warn('Orphan Draggable found ' + item.id + ' which says it belongs to unknown Droppable ' + item.droppableId);
        return false;
      }

      return entry.descriptor.type === home.type;
    });

    var droppablesToBeCollected = (0, _keys2.default)(droppables).map(function (id) {
      return droppables[id].descriptor;
    }).filter(function (item) {
      return item.id !== home.id;
    }).filter(function (item) {
      var droppable = droppables[item.id].descriptor;
      return droppable.type === home.type;
    });

    var toBeCollected = [].concat((0, _toConsumableArray3.default)(droppablesToBeCollected), (0, _toConsumableArray3.default)(draggablesToBeCollected));

    return toBeCollected;
  };

  var processPrimaryDimensions = function processPrimaryDimensions(request) {
    if (state.isCollecting) {
      cancel('Cannot start capturing dimensions for a drag it is already dragging');
      return;
    }

    if (!request) {
      cancel('Cannot start capturing dimensions with an invalid request', request);
      return;
    }

    setState({
      isCollecting: true,
      request: request
    });

    var draggables = state.draggables;
    var droppables = state.droppables;
    var draggableEntry = draggables[request];

    if (!draggableEntry) {
      cancel('Cannot find Draggable with id ' + request + ' to start collecting dimensions');
      return;
    }

    var homeEntry = droppables[draggableEntry.descriptor.droppableId];

    if (!homeEntry) {
      cancel('Cannot find home Droppable [id:' + draggableEntry.descriptor.droppableId + '] for Draggable [id:' + request + ']');
      return;
    }

    var home = homeEntry.callbacks.getDimension();
    var draggable = draggableEntry.getDimension();

    callbacks.publishDroppables([home]);
    callbacks.publishDraggables([draggable]);

    homeEntry.callbacks.watchScroll();
  };

  var setFrameId = function setFrameId(frameId) {
    setState({
      frameId: frameId
    });
  };

  var processSecondaryDimensions = function processSecondaryDimensions() {
    if (!state.isCollecting) {
      cancel('Cannot collect secondary dimensions when collection is not occurring');
      return;
    }

    var toBeCollected = getToBeCollected();

    var collectFrameId = requestAnimationFrame(function () {
      var toBePublishedBuffer = toBeCollected.map(function (descriptor) {
        if (descriptor.type) {
          return state.droppables[descriptor.id].callbacks.getDimension();
        }

        return state.draggables[descriptor.id].getDimension();
      });

      var publishFrameId = requestAnimationFrame(function () {
        var toBePublished = toBePublishedBuffer.reduce(function (previous, dimension) {
          if (dimension.placeholder) {
            previous.draggables.push(dimension);
          } else {
            previous.droppables.push(dimension);
          }
          return previous;
        }, { draggables: [], droppables: [] });

        if (toBePublished.droppables.length) {
          callbacks.publishDroppables(toBePublished.droppables);
        }
        if (toBePublished.draggables.length) {
          callbacks.publishDraggables(toBePublished.draggables);
        }

        toBePublished.droppables.forEach(function (dimension) {
          var entry = state.droppables[dimension.descriptor.id];
          entry.callbacks.watchScroll();
        });

        setFrameId(null);
      });

      setFrameId(publishFrameId);
    });

    setFrameId(collectFrameId);
  };

  var stopCollecting = function stopCollecting() {
    (0, _keys2.default)(state.droppables).forEach(function (id) {
      return state.droppables[id].callbacks.unwatchScroll();
    });

    if (state.frameId) {
      cancelAnimationFrame(state.frameId);
    }

    setState({
      isCollecting: false,
      request: null,
      frameId: null
    });
  };

  var onPhaseChange = function onPhaseChange(current) {
    var phase = current.phase;

    if (phase === 'COLLECTING_INITIAL_DIMENSIONS') {
      processPrimaryDimensions(current.dimension.request);
      return;
    }

    if (phase === 'DRAGGING') {
      if (current.dimension.request !== state.request) {
        cancel('Request in local state does not match that of the store');
        return;
      }

      processSecondaryDimensions();
      return;
    }

    if (phase === 'DROP_ANIMATING' || phase === 'DROP_COMPLETE') {
      if (state.isCollecting) {
        stopCollecting();
      }
      return;
    }

    if (phase === 'IDLE') {
      if (state.isCollecting) {
        stopCollecting();
      }
    }
  };

  var marshal = {
    registerDraggable: registerDraggable,
    unregisterDraggable: unregisterDraggable,
    registerDroppable: registerDroppable,
    unregisterDroppable: unregisterDroppable,
    updateDroppableIsEnabled: updateDroppableIsEnabled,
    updateDroppableScroll: updateDroppableScroll,
    onPhaseChange: onPhaseChange
  };

  return marshal;
};

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _memoizeOne = __webpack_require__(3);

var _memoizeOne2 = _interopRequireDefault(_memoizeOne);

var _getStyles = __webpack_require__(247);

var _getStyles2 = _interopRequireDefault(_getStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var count = 0;

var prefix = 'data-react-beautiful-dnd';

exports.default = function () {
  var context = '' + count++;
  var styles = (0, _getStyles2.default)(context);

  var state = {
    el: null
  };

  var setState = function setState(newState) {
    state = newState;
  };

  var setStyle = (0, _memoizeOne2.default)(function (proposed) {
    if (!state.el) {
      console.error('cannot set style of style tag if not mounted');
      return;
    }

    state.el.innerHTML = proposed;
  });

  var mount = function mount() {
    if (state.el) {
      console.error('Style marshal already mounted');
      return;
    }

    var el = document.createElement('style');
    el.type = 'text/css';

    el.setAttribute(prefix, context);
    var head = document.querySelector('head');

    if (!head) {
      throw new Error('Cannot find the head to append a style to');
    }

    head.appendChild(el);
    setState({
      el: el
    });

    setStyle(styles.resting);
  };

  var onPhaseChange = function onPhaseChange(current) {
    if (!state.el) {
      console.error('cannot update styles until style marshal is mounted');
      return;
    }

    var phase = current.phase;

    if (phase === 'DRAGGING') {
      setStyle(styles.dragging);
      return;
    }

    if (phase === 'DROP_ANIMATING') {
      if (!current.drop || !current.drop.pending) {
        console.error('Invalid state found in style-marshal');
        return;
      }

      var trigger = current.drop.pending.trigger;

      if (trigger === 'DROP') {
        setStyle(styles.dropAnimating);
        return;
      }
      setStyle(styles.userCancel);
      return;
    }

    setStyle(styles.resting);
  };

  var unmount = function unmount() {
    if (!state.el) {
      console.error('Cannot unmount style marshal as it is already unmounted');
      return;
    }
    var previous = state.el;

    setState({
      el: null
    });

    if (!previous.parentNode) {
      console.error('Cannot unmount style marshal as cannot find parent');
      return;
    }

    previous.parentNode.removeChild(previous);
  };

  var marshal = {
    onPhaseChange: onPhaseChange,
    styleContext: context,
    mount: mount,
    unmount: unmount
  };

  return marshal;
};

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _animation = __webpack_require__(125);

var prefix = 'data-react-beautiful-dnd';

exports.default = function (styleContext) {
  var dragHandleSelector = '[' + prefix + '-drag-handle="' + styleContext + '"]';
  var draggableSelector = '[' + prefix + '-draggable="' + styleContext + '"]';

  var dragHandleStyles = {
    base: '\n      ' + dragHandleSelector + ' {\n        -webkit-touch-callout: none;\n        -webkit-tap-highlight-color: rgba(0,0,0,0);\n        touch-action: manipulation;\n      }\n    ',
    grabCursor: '\n      ' + dragHandleSelector + ' {\n        cursor: -webkit-grab;\n        cursor: grab;\n      }\n    ',
    blockPointerEvents: '\n      ' + dragHandleSelector + ' {\n        pointer-events: none;\n      }\n    '
  };

  var draggableStyles = {
    animateMovement: '\n      ' + draggableSelector + ' {\n        transition: ' + _animation.css.outOfTheWay + ';\n      }\n    '
  };

  var bodyStyles = {
    whileActiveDragging: '\n      body {\n        cursor: grabbing;\n        cursor: -webkit-grabbing;\n        user-select: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n      }\n    '
  };

  var resting = [dragHandleStyles.base, dragHandleStyles.grabCursor].join('');

  var dragging = [dragHandleStyles.base, dragHandleStyles.blockPointerEvents, draggableStyles.animateMovement, bodyStyles.whileActiveDragging].join('');

  var dropAnimating = [dragHandleStyles.base, dragHandleStyles.grabCursor, draggableStyles.animateMovement].join('');

  var userCancel = [dragHandleStyles.base, draggableStyles.animateMovement].join('');

  return { resting: resting, dragging: dragging, dropAnimating: dropAnimating, userCancel: userCancel };
};

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, id) {
  var phase = state.phase;

  if (phase === 'IDLE' || phase === 'DROP_COMPLETE') {
    return true;
  }

  if (phase === 'PREPARING' || phase === 'COLLECTING_INITIAL_DIMENSIONS' || phase === 'DRAGGING') {
    return false;
  }

  if (phase === 'DROP_ANIMATING') {
    if (!state.drop || !state.drop.pending) {
      console.error('Invalid state shape for drop animating');
      return false;
    }

    if (state.drop.pending.result.draggableId === id) {
      return false;
    }

    return state.drop.pending.trigger === 'DROP';
  }

  console.warn('unhandled phase ' + phase + ' in canLift check');
  return false;
};

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moveToEdge = __webpack_require__(41);

var _moveToEdge2 = _interopRequireDefault(_moveToEdge);

var _getDraggablesInsideDroppable = __webpack_require__(32);

var _getDraggablesInsideDroppable2 = _interopRequireDefault(_getDraggablesInsideDroppable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var movement = _ref.movement,
      draggable = _ref.draggable,
      draggables = _ref.draggables,
      destination = _ref.destination;

  var homeCenter = draggable.client.withMargin.center;

  if (destination == null) {
    return homeCenter;
  }

  var displaced = movement.displaced,
      isBeyondStartPosition = movement.isBeyondStartPosition;

  var axis = destination.axis;

  var isWithinHomeDroppable = destination.descriptor.id === draggable.descriptor.droppableId;

  if (isWithinHomeDroppable && !displaced.length) {
    return homeCenter;
  }

  var draggablesInDestination = (0, _getDraggablesInsideDroppable2.default)(destination, draggables);

  var destinationFragment = function () {
    if (isWithinHomeDroppable) {
      return draggables[displaced[0].draggableId].client.withMargin;
    }

    if (displaced.length) {
      return draggables[displaced[0].draggableId].client.withMargin;
    }

    if (draggablesInDestination.length) {
      return draggablesInDestination[draggablesInDestination.length - 1].client.withMargin;
    }

    return destination.client.withMarginAndPadding;
  }();

  var _ref2 = function () {
    if (isWithinHomeDroppable) {
      if (isBeyondStartPosition) {
        return { sourceEdge: 'end', destinationEdge: 'end' };
      }

      return { sourceEdge: 'start', destinationEdge: 'start' };
    }

    if (!displaced.length && draggablesInDestination.length) {
      return { sourceEdge: 'start', destinationEdge: 'end' };
    }

    return { sourceEdge: 'start', destinationEdge: 'start' };
  }(),
      sourceEdge = _ref2.sourceEdge,
      destinationEdge = _ref2.destinationEdge;

  var source = draggable.client.withMargin;

  var targetCenter = (0, _moveToEdge2.default)({
    source: source,
    sourceEdge: sourceEdge,
    destination: destinationFragment,
    destinationEdge: destinationEdge,
    destinationAxis: axis
  });

  return targetCenter;
};

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connectedDroppable = __webpack_require__(251);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_connectedDroppable).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeSelector = undefined;

var _reactRedux = __webpack_require__(127);

var _reselect = __webpack_require__(78);

var _memoizeOne = __webpack_require__(3);

var _memoizeOne2 = _interopRequireDefault(_memoizeOne);

var _contextKeys = __webpack_require__(20);

var _selectors = __webpack_require__(262);

var _droppable = __webpack_require__(263);

var _droppable2 = _interopRequireDefault(_droppable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makeSelector = exports.makeSelector = function makeSelector() {
  var idSelector = function idSelector(state, ownProps) {
    return ownProps.droppableId;
  };
  var isDropDisabledSelector = function isDropDisabledSelector(state, ownProps) {
    return ownProps.isDropDisabled || false;
  };

  var getIsDraggingOver = (0, _memoizeOne2.default)(function (id, destination) {
    if (!destination) {
      return false;
    }
    return destination.droppableId === id;
  });

  var getPlaceholder = (0, _memoizeOne2.default)(function (id, destination, draggable) {
    if (!draggable) {
      return null;
    }

    if (!destination) {
      return null;
    }

    if (id === draggable.descriptor.droppableId) {
      return null;
    }

    if (id !== destination.droppableId) {
      return null;
    }

    return draggable.placeholder;
  });

  var getMapProps = (0, _memoizeOne2.default)(function (isDraggingOver, placeholder) {
    return {
      isDraggingOver: isDraggingOver,
      placeholder: placeholder
    };
  });

  return (0, _reselect.createSelector)([_selectors.phaseSelector, _selectors.dragSelector, _selectors.draggingDraggableSelector, _selectors.pendingDropSelector, idSelector, isDropDisabledSelector], function (phase, drag, draggable, pending, id, isDropDisabled) {
    if (isDropDisabled) {
      return getMapProps(false, null);
    }

    if (phase === 'DRAGGING') {
      if (!drag) {
        console.error('cannot determine dragging over as there is not drag');
        return getMapProps(false, null);
      }

      var isDraggingOver = getIsDraggingOver(id, drag.impact.destination);

      var placeholder = getPlaceholder(id, drag.impact.destination, draggable);
      return getMapProps(isDraggingOver, placeholder);
    }

    if (phase === 'DROP_ANIMATING') {
      if (!pending) {
        console.error('cannot determine dragging over as there is no pending result');
        return getMapProps(false, null);
      }

      var _isDraggingOver = getIsDraggingOver(id, pending.impact.destination);
      var _placeholder = getPlaceholder(id, pending.result.destination, draggable);
      return getMapProps(_isDraggingOver, _placeholder);
    }

    return getMapProps(false, null);
  });
};

var makeMapStateToProps = function makeMapStateToProps() {
  var selector = makeSelector();
  return function (state, props) {
    return selector(state, props);
  };
};

exports.default = (0, _reactRedux.connect)(makeMapStateToProps, null, null, { storeKey: _contextKeys.storeKey })(_droppable2.default);

/***/ }),
/* 252 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = createProvider;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_warning__ = __webpack_require__(77);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }
  didWarnAboutReceivingStore = true;

  Object(__WEBPACK_IMPORTED_MODULE_3__utils_warning__["a" /* default */])('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}

function createProvider() {
  var _Provider$childContex;

  var storeKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'store';
  var subKey = arguments[1];

  var subscriptionKey = subKey || storeKey + 'Subscription';

  var Provider = function (_Component) {
    _inherits(Provider, _Component);

    Provider.prototype.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[storeKey] = this[storeKey], _ref[subscriptionKey] = null, _ref;
    };

    function Provider(props, context) {
      _classCallCheck(this, Provider);

      var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

      _this[storeKey] = props.store;
      return _this;
    }

    Provider.prototype.render = function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react__["Children"].only(this.props.children);
    };

    return Provider;
  }(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

  if (process.env.NODE_ENV !== 'production') {
    Provider.prototype.componentWillReceiveProps = function (nextProps) {
      if (this[storeKey] !== nextProps.store) {
        warnAboutReceivingStore();
      }
    };
  }

  Provider.propTypes = {
    store: __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__["a" /* storeShape */].isRequired,
    children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element.isRequired
  };
  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[storeKey] = __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__["a" /* storeShape */].isRequired, _Provider$childContex[subscriptionKey] = __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__["b" /* subscriptionShape */], _Provider$childContex);

  return Provider;
}

/* harmony default export */ __webpack_exports__["b"] = (createProvider());
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try { // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
};


/***/ }),
/* 254 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subscription; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

var CLEARED = null;
var nullListeners = {
  notify: function notify() {}
};

function createListenerCollection() {
  // the current/next pattern is copied from redux's createStore code.
  // TODO: refactor+expose that code to be reusable here?
  var current = [];
  var next = [];

  return {
    clear: function clear() {
      next = CLEARED;
      current = CLEARED;
    },
    notify: function notify() {
      var listeners = current = next;
      for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    },
    get: function get() {
      return next;
    },
    subscribe: function subscribe(listener) {
      var isSubscribed = true;
      if (next === current) next = current.slice();
      next.push(listener);

      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return;
        isSubscribed = false;

        if (next === current) next = current.slice();
        next.splice(next.indexOf(listener), 1);
      };
    }
  };
}

var Subscription = function () {
  function Subscription(store, parentSub, onStateChange) {
    _classCallCheck(this, Subscription);

    this.store = store;
    this.parentSub = parentSub;
    this.onStateChange = onStateChange;
    this.unsubscribe = null;
    this.listeners = nullListeners;
  }

  Subscription.prototype.addNestedSub = function addNestedSub(listener) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  };

  Subscription.prototype.notifyNestedSubs = function notifyNestedSubs() {
    this.listeners.notify();
  };

  Subscription.prototype.isSubscribed = function isSubscribed() {
    return Boolean(this.unsubscribe);
  };

  Subscription.prototype.trySubscribe = function trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange);

      this.listeners = createListenerCollection();
    }
  };

  Subscription.prototype.tryUnsubscribe = function tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      this.listeners.clear();
      this.listeners = nullListeners;
    }
  };

  return Subscription;
}();



/***/ }),
/* 255 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createConnect */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_connectAdvanced__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_shallowEqual__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mapDispatchToProps__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mapStateToProps__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mergeProps__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__selectorFactory__ = __webpack_require__(260);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }








/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }

  return function (dispatch, options) {
    throw new Error('Invalid value of type ' + typeof arg + ' for ' + name + ' argument when connecting component ' + options.wrappedComponentName + '.');
  };
}

function strictEqual(a, b) {
  return a === b;
}

// createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios
function createConnect() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$connectHOC = _ref.connectHOC,
      connectHOC = _ref$connectHOC === undefined ? __WEBPACK_IMPORTED_MODULE_0__components_connectAdvanced__["a" /* default */] : _ref$connectHOC,
      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
      mapStateToPropsFactories = _ref$mapStateToPropsF === undefined ? __WEBPACK_IMPORTED_MODULE_3__mapStateToProps__["a" /* default */] : _ref$mapStateToPropsF,
      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
      mapDispatchToPropsFactories = _ref$mapDispatchToPro === undefined ? __WEBPACK_IMPORTED_MODULE_2__mapDispatchToProps__["a" /* default */] : _ref$mapDispatchToPro,
      _ref$mergePropsFactor = _ref.mergePropsFactories,
      mergePropsFactories = _ref$mergePropsFactor === undefined ? __WEBPACK_IMPORTED_MODULE_4__mergeProps__["a" /* default */] : _ref$mergePropsFactor,
      _ref$selectorFactory = _ref.selectorFactory,
      selectorFactory = _ref$selectorFactory === undefined ? __WEBPACK_IMPORTED_MODULE_5__selectorFactory__["a" /* default */] : _ref$selectorFactory;

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
    var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref2$pure = _ref2.pure,
        pure = _ref2$pure === undefined ? true : _ref2$pure,
        _ref2$areStatesEqual = _ref2.areStatesEqual,
        areStatesEqual = _ref2$areStatesEqual === undefined ? strictEqual : _ref2$areStatesEqual,
        _ref2$areOwnPropsEqua = _ref2.areOwnPropsEqual,
        areOwnPropsEqual = _ref2$areOwnPropsEqua === undefined ? __WEBPACK_IMPORTED_MODULE_1__utils_shallowEqual__["a" /* default */] : _ref2$areOwnPropsEqua,
        _ref2$areStatePropsEq = _ref2.areStatePropsEqual,
        areStatePropsEqual = _ref2$areStatePropsEq === undefined ? __WEBPACK_IMPORTED_MODULE_1__utils_shallowEqual__["a" /* default */] : _ref2$areStatePropsEq,
        _ref2$areMergedPropsE = _ref2.areMergedPropsEqual,
        areMergedPropsEqual = _ref2$areMergedPropsE === undefined ? __WEBPACK_IMPORTED_MODULE_1__utils_shallowEqual__["a" /* default */] : _ref2$areMergedPropsE,
        extraOptions = _objectWithoutProperties(_ref2, ['pure', 'areStatesEqual', 'areOwnPropsEqual', 'areStatePropsEqual', 'areMergedPropsEqual']);

    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');

    return connectHOC(selectorFactory, _extends({
      // used in error messages
      methodName: 'connect',

      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return 'Connect(' + name + ')';
      },

      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),

      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual

    }, extraOptions));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (createConnect());

/***/ }),
/* 256 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = shallowEqual;
var hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

/***/ }),
/* 257 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export whenMapDispatchToPropsIsFunction */
/* unused harmony export whenMapDispatchToPropsIsMissing */
/* unused harmony export whenMapDispatchToPropsIsObject */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__ = __webpack_require__(131);



function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? Object(__WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__["b" /* wrapMapToPropsFunc */])(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}

function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? Object(__WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__["a" /* wrapMapToPropsConstant */])(function (dispatch) {
    return { dispatch: dispatch };
  }) : undefined;
}

function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && typeof mapDispatchToProps === 'object' ? Object(__WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__["a" /* wrapMapToPropsConstant */])(function (dispatch) {
    return Object(__WEBPACK_IMPORTED_MODULE_0_redux__["bindActionCreators"])(mapDispatchToProps, dispatch);
  }) : undefined;
}

/* harmony default export */ __webpack_exports__["a"] = ([whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject]);

/***/ }),
/* 258 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export whenMapStateToPropsIsFunction */
/* unused harmony export whenMapStateToPropsIsMissing */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wrapMapToProps__ = __webpack_require__(131);


function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? Object(__WEBPACK_IMPORTED_MODULE_0__wrapMapToProps__["b" /* wrapMapToPropsFunc */])(mapStateToProps, 'mapStateToProps') : undefined;
}

function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? Object(__WEBPACK_IMPORTED_MODULE_0__wrapMapToProps__["a" /* wrapMapToPropsConstant */])(function () {
    return {};
  }) : undefined;
}

/* harmony default export */ __webpack_exports__["a"] = ([whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing]);

/***/ }),
/* 259 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export defaultMergeProps */
/* unused harmony export wrapMergePropsFunc */
/* unused harmony export whenMergePropsIsFunction */
/* unused harmony export whenMergePropsIsOmitted */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_verifyPlainObject__ = __webpack_require__(132);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return _extends({}, ownProps, stateProps, dispatchProps);
}

function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
        pure = _ref.pure,
        areMergedPropsEqual = _ref.areMergedPropsEqual;

    var hasRunOnce = false;
    var mergedProps = void 0;

    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;

        if (process.env.NODE_ENV !== 'production') Object(__WEBPACK_IMPORTED_MODULE_0__utils_verifyPlainObject__["a" /* default */])(mergedProps, displayName, 'mergeProps');
      }

      return mergedProps;
    };
  };
}

function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}

function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}

/* harmony default export */ __webpack_exports__["a"] = ([whenMergePropsIsFunction, whenMergePropsIsOmitted]);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 260 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export impureFinalPropsSelectorFactory */
/* unused harmony export pureFinalPropsSelectorFactory */
/* harmony export (immutable) */ __webpack_exports__["a"] = finalPropsSelectorFactory;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__verifySubselectors__ = __webpack_require__(261);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }



function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}

function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
  var areStatesEqual = _ref.areStatesEqual,
      areOwnPropsEqual = _ref.areOwnPropsEqual,
      areStatePropsEqual = _ref.areStatePropsEqual;

  var hasRunAtLeastOnce = false;
  var state = void 0;
  var ownProps = void 0;
  var stateProps = void 0;
  var dispatchProps = void 0;
  var mergedProps = void 0;

  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }

  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewState() {
    var nextStateProps = mapStateToProps(state, ownProps);
    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;

    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);

    return mergedProps;
  }

  function handleSubsequentCalls(nextState, nextOwnProps) {
    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    var stateChanged = !areStatesEqual(nextState, state);
    state = nextState;
    ownProps = nextOwnProps;

    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }

  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
}

// TODO: Add more comments

// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.

function finalPropsSelectorFactory(dispatch, _ref2) {
  var initMapStateToProps = _ref2.initMapStateToProps,
      initMapDispatchToProps = _ref2.initMapDispatchToProps,
      initMergeProps = _ref2.initMergeProps,
      options = _objectWithoutProperties(_ref2, ['initMapStateToProps', 'initMapDispatchToProps', 'initMergeProps']);

  var mapStateToProps = initMapStateToProps(dispatch, options);
  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  var mergeProps = initMergeProps(dispatch, options);

  if (process.env.NODE_ENV !== 'production') {
    Object(__WEBPACK_IMPORTED_MODULE_0__verifySubselectors__["a" /* default */])(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
  }

  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;

  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 261 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = verifySubselectors;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_warning__ = __webpack_require__(77);


function verify(selector, methodName, displayName) {
  if (!selector) {
    throw new Error('Unexpected value for ' + methodName + ' in ' + displayName + '.');
  } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
    if (!selector.hasOwnProperty('dependsOnOwnProps')) {
      Object(__WEBPACK_IMPORTED_MODULE_0__utils_warning__["a" /* default */])('The selector for ' + methodName + ' of ' + displayName + ' did not specify a value for dependsOnOwnProps.');
    }
  }
}

function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
  verify(mapStateToProps, 'mapStateToProps', displayName);
  verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
  verify(mergeProps, 'mergeProps', displayName);
}

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.draggingDraggableSelector = exports.dragSelector = exports.pendingDropSelector = exports.phaseSelector = undefined;

var _reselect = __webpack_require__(78);

var phaseSelector = exports.phaseSelector = function phaseSelector(state) {
  return state.phase;
};

var pendingDropSelector = exports.pendingDropSelector = function pendingDropSelector(state) {
  if (!state.drop || !state.drop.pending) {
    return null;
  }
  return state.drop.pending;
};

var dragSelector = exports.dragSelector = function dragSelector(state) {
  return state.drag;
};

var draggableMapSelector = function draggableMapSelector(state) {
  return state.dimension.draggable;
};

var draggingDraggableSelector = exports.draggingDraggableSelector = (0, _reselect.createSelector)([phaseSelector, dragSelector, pendingDropSelector, draggableMapSelector], function (phase, drag, pending, draggables) {
  if (phase === 'DRAGGING') {
    if (!drag) {
      console.error('cannot get placeholder dimensions as there is an invalid drag state');
      return null;
    }

    var draggable = draggables[drag.initial.descriptor.id];
    return draggable;
  }

  if (phase === 'DROP_ANIMATING') {
    if (!pending) {
      console.error('cannot get placeholder dimensions as there is an invalid drag state');
      return null;
    }

    if (!pending.result.destination) {
      return null;
    }

    var _draggable = draggables[pending.result.draggableId];
    return _draggable;
  }

  return null;
});

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(9);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = __webpack_require__(13);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(16);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(5);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _droppableDimensionPublisher = __webpack_require__(264);

var _droppableDimensionPublisher2 = _interopRequireDefault(_droppableDimensionPublisher);

var _placeholder = __webpack_require__(134);

var _placeholder2 = _interopRequireDefault(_placeholder);

var _contextKeys = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Droppable = function (_Component) {
  (0, _inherits3.default)(Droppable, _Component);

  function Droppable() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Droppable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Droppable.__proto__ || (0, _getPrototypeOf2.default)(Droppable)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      ref: null
    }, _this.setRef = function (ref) {
      if (ref === null) {
        return;
      }

      if (ref === _this.state.ref) {
        return;
      }

      _this.setState({
        ref: ref
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Droppable, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var value = (0, _defineProperty3.default)({}, _contextKeys.droppableIdKey, this.props.droppableId);
      return value;
    }
  }, {
    key: 'getPlaceholder',
    value: function getPlaceholder() {
      if (!this.props.placeholder) {
        return null;
      }

      return _react2.default.createElement(_placeholder2.default, { placeholder: this.props.placeholder });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          direction = _props.direction,
          droppableId = _props.droppableId,
          ignoreContainerClipping = _props.ignoreContainerClipping,
          isDraggingOver = _props.isDraggingOver,
          isDropDisabled = _props.isDropDisabled,
          type = _props.type;

      var provided = {
        innerRef: this.setRef,
        placeholder: this.getPlaceholder()
      };
      var snapshot = {
        isDraggingOver: isDraggingOver
      };

      return _react2.default.createElement(
        _droppableDimensionPublisher2.default,
        {
          droppableId: droppableId,
          type: type,
          direction: direction,
          ignoreContainerClipping: ignoreContainerClipping,
          isDropDisabled: isDropDisabled,
          targetRef: this.state.ref
        },
        children(provided, snapshot)
      );
    }
  }]);
  return Droppable;
}(_react.Component);

Droppable.defaultProps = {
  type: 'DEFAULT',
  isDropDisabled: false,
  direction: 'vertical',
  ignoreContainerClipping: false
};
Droppable.childContextTypes = (0, _defineProperty3.default)({}, _contextKeys.droppableIdKey, _propTypes2.default.string.isRequired);
exports.default = Droppable;

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _droppableDimensionPublisher = __webpack_require__(265);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_droppableDimensionPublisher).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(9);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = __webpack_require__(13);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(16);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(0);

var _propTypes = __webpack_require__(5);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _memoizeOne = __webpack_require__(3);

var _memoizeOne2 = _interopRequireDefault(_memoizeOne);

var _rafSchd = __webpack_require__(133);

var _rafSchd2 = _interopRequireDefault(_rafSchd);

var _getWindowScrollPosition = __webpack_require__(79);

var _getWindowScrollPosition2 = _interopRequireDefault(_getWindowScrollPosition);

var _getArea = __webpack_require__(31);

var _getArea2 = _interopRequireDefault(_getArea);

var _dimension = __webpack_require__(49);

var _getClosestScrollable = __webpack_require__(266);

var _getClosestScrollable2 = _interopRequireDefault(_getClosestScrollable);

var _contextKeys = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var origin = { x: 0, y: 0 };

var DroppableDimensionPublisher = function (_Component) {
  (0, _inherits3.default)(DroppableDimensionPublisher, _Component);

  function DroppableDimensionPublisher(props, context) {
    (0, _classCallCheck3.default)(this, DroppableDimensionPublisher);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DroppableDimensionPublisher.__proto__ || (0, _getPrototypeOf2.default)(DroppableDimensionPublisher)).call(this, props, context));

    _this.closestScrollable = null;
    _this.isWatchingScroll = false;
    _this.publishedDescriptor = null;

    _this.getScrollOffset = function () {
      if (!_this.closestScrollable) {
        return origin;
      }

      var offset = {
        x: _this.closestScrollable.scrollLeft,
        y: _this.closestScrollable.scrollTop
      };

      return offset;
    };

    _this.memoizedUpdateScroll = (0, _memoizeOne2.default)(function (x, y) {
      if (!_this.publishedDescriptor) {
        console.error('Cannot update scroll on unpublished droppable');
        return;
      }

      var newScroll = { x: x, y: y };
      var marshal = _this.context[_contextKeys.dimensionMarshalKey];
      marshal.updateDroppableScroll(_this.publishedDescriptor.id, newScroll);
    });
    _this.scheduleScrollUpdate = (0, _rafSchd2.default)(function (offset) {
      if (_this.isWatchingScroll) {
        _this.memoizedUpdateScroll(offset.x, offset.y);
      }
    });

    _this.onClosestScroll = function () {
      _this.scheduleScrollUpdate(_this.getScrollOffset());
    };

    _this.watchScroll = function () {
      if (!_this.props.targetRef) {
        console.error('cannot watch droppable scroll if not in the dom');
        return;
      }

      if (_this.closestScrollable == null) {
        return;
      }

      if (_this.isWatchingScroll) {
        return;
      }

      _this.isWatchingScroll = true;
      _this.closestScrollable.addEventListener('scroll', _this.onClosestScroll, { passive: true });
    };

    _this.unwatchScroll = function () {
      if (!_this.isWatchingScroll) {
        return;
      }

      _this.isWatchingScroll = false;

      if (!_this.closestScrollable) {
        console.error('cannot unbind event listener if element is null');
        return;
      }

      _this.closestScrollable.removeEventListener('scroll', _this.onClosestScroll);
    };

    _this.getMemoizedDescriptor = (0, _memoizeOne2.default)(function (id, type) {
      return {
        id: id,
        type: type
      };
    });

    _this.unpublish = function () {
      if (!_this.publishedDescriptor) {
        console.error('cannot unpublish descriptor when none is published');
        return;
      }

      var marshal = _this.context[_contextKeys.dimensionMarshalKey];
      marshal.unregisterDroppable(_this.publishedDescriptor);
      _this.publishedDescriptor = null;
    };

    _this.publish = function (descriptor) {
      if (descriptor === _this.publishedDescriptor) {
        return;
      }

      if (_this.publishedDescriptor) {
        _this.unpublish();
      }

      var marshal = _this.context[_contextKeys.dimensionMarshalKey];
      marshal.registerDroppable(descriptor, _this.callbacks);
      _this.publishedDescriptor = descriptor;
    };

    _this.getDimension = function () {
      var _this$props = _this.props,
          direction = _this$props.direction,
          ignoreContainerClipping = _this$props.ignoreContainerClipping,
          isDropDisabled = _this$props.isDropDisabled,
          targetRef = _this$props.targetRef;


      if (!targetRef) {
        throw new Error('DimensionPublisher cannot calculate a dimension when not attached to the DOM');
      }

      if (_this.isWatchingScroll) {
        throw new Error('Attempting to recapture Droppable dimension while already watching scroll on previous capture');
      }

      var descriptor = _this.publishedDescriptor;

      if (!descriptor) {
        throw new Error('Cannot get dimension for unpublished droppable');
      }

      _this.closestScrollable = (0, _getClosestScrollable2.default)(targetRef);
      var frameScroll = _this.getScrollOffset();
      var style = window.getComputedStyle(targetRef);

      var margin = {
        top: parseInt(style.marginTop, 10),
        right: parseInt(style.marginRight, 10),
        bottom: parseInt(style.marginBottom, 10),
        left: parseInt(style.marginLeft, 10)
      };
      var padding = {
        top: parseInt(style.paddingTop, 10),
        right: parseInt(style.paddingRight, 10),
        bottom: parseInt(style.paddingBottom, 10),
        left: parseInt(style.paddingLeft, 10)
      };

      var client = (0, _getArea2.default)(targetRef.getBoundingClientRect());

      var frameClient = function () {
        if (ignoreContainerClipping) {
          return null;
        }
        if (!_this.closestScrollable) {
          return null;
        }
        if (_this.closestScrollable === targetRef) {
          return null;
        }
        return (0, _getArea2.default)(_this.closestScrollable.getBoundingClientRect());
      }();

      var dimension = (0, _dimension.getDroppableDimension)({
        descriptor: descriptor,
        direction: direction,
        client: client,
        frameClient: frameClient,
        frameScroll: frameScroll,
        margin: margin,
        padding: padding,
        windowScroll: (0, _getWindowScrollPosition2.default)(),
        isEnabled: !isDropDisabled
      });

      return dimension;
    };

    var callbacks = {
      getDimension: _this.getDimension,
      watchScroll: _this.watchScroll,
      unwatchScroll: _this.unwatchScroll
    };
    _this.callbacks = callbacks;
    return _this;
  }

  (0, _createClass3.default)(DroppableDimensionPublisher, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.targetRef) {
        console.error('Cannot update droppable dimension publisher without a target ref');
        return;
      }

      var droppableId = nextProps.droppableId,
          type = nextProps.type;

      var descriptor = this.getMemoizedDescriptor(droppableId, type);

      this.publish(descriptor);

      if (this.props.isDropDisabled === nextProps.isDropDisabled) {
        return;
      }

      var marshal = this.context[_contextKeys.dimensionMarshalKey];
      marshal.updateDroppableIsEnabled(nextProps.droppableId, !nextProps.isDropDisabled);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.isWatchingScroll) {
        console.warn('unmounting droppable while it was watching scroll');
        this.unwatchScroll();
      }

      this.unpublish();
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);
  return DroppableDimensionPublisher;
}(_react.Component);

DroppableDimensionPublisher.contextTypes = (0, _defineProperty3.default)({}, _contextKeys.dimensionMarshalKey, _propTypes2.default.object.isRequired);
exports.default = DroppableDimensionPublisher;

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var isScrollable = function isScrollable() {
  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return values.some(function (value) {
    return value === 'auto' || value === 'scroll';
  });
};

var isElementScrollable = function isElementScrollable(el) {
  var style = window.getComputedStyle(el);
  return isScrollable(style.overflow, style.overflowY, style.overflowX);
};

var getClosestScrollable = function getClosestScrollable(el) {
  if (el == null) {
    return null;
  }

  if (!isElementScrollable(el)) {
    return getClosestScrollable(el.parentElement);
  }

  return el;
};

exports.default = getClosestScrollable;

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(13);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(16);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Placeholder = function (_PureComponent) {
  (0, _inherits3.default)(Placeholder, _PureComponent);

  function Placeholder() {
    (0, _classCallCheck3.default)(this, Placeholder);
    return (0, _possibleConstructorReturn3.default)(this, (Placeholder.__proto__ || (0, _getPrototypeOf2.default)(Placeholder)).apply(this, arguments));
  }

  (0, _createClass3.default)(Placeholder, [{
    key: 'render',
    value: function render() {

      var placeholder = this.props.placeholder;
      var _placeholder$margin = placeholder.margin,
          top = _placeholder$margin.top,
          left = _placeholder$margin.left,
          bottom = _placeholder$margin.bottom,
          right = _placeholder$margin.right;
      var _placeholder$withoutM = placeholder.withoutMargin,
          width = _placeholder$withoutM.width,
          height = _placeholder$withoutM.height;


      var style = {
        width: width,
        height: height,
        marginTop: top,
        marginLeft: left,
        marginBottom: bottom,
        marginRight: right,
        pointerEvents: 'none',
        boxSizing: 'border-box'
      };
      return _react2.default.createElement('div', { style: style });
    }
  }]);
  return Placeholder;
}(_react.PureComponent);

exports.default = Placeholder;

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connectedDraggable = __webpack_require__(269);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_connectedDraggable).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeSelector = undefined;

var _memoizeOne = __webpack_require__(3);

var _memoizeOne2 = _interopRequireDefault(_memoizeOne);

var _reactRedux = __webpack_require__(127);

var _reselect = __webpack_require__(78);

var _draggable = __webpack_require__(270);

var _draggable2 = _interopRequireDefault(_draggable);

var _contextKeys = __webpack_require__(20);

var _position = __webpack_require__(2);

var _getDisplacementMap = __webpack_require__(122);

var _getDisplacementMap2 = _interopRequireDefault(_getDisplacementMap);

var _actionCreators = __webpack_require__(126);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var origin = { x: 0, y: 0 };

var defaultMapProps = {
  isDropAnimating: false,
  isDragging: false,
  offset: origin,
  shouldAnimateDragMovement: false,

  shouldAnimateDisplacement: true,

  dimension: null,
  direction: null
};

var makeSelector = exports.makeSelector = function makeSelector() {
  var memoizedOffset = (0, _memoizeOne2.default)(function (x, y) {
    return {
      x: x, y: y
    };
  });

  var getNotDraggingProps = (0, _memoizeOne2.default)(function (offset, shouldAnimateDisplacement) {
    return {
      isDropAnimating: false,
      isDragging: false,
      offset: offset,
      shouldAnimateDisplacement: shouldAnimateDisplacement,

      shouldAnimateDragMovement: false,
      dimension: null,
      direction: null
    };
  });

  var getDraggingProps = (0, _memoizeOne2.default)(function (offset, shouldAnimateDragMovement, dimension, direction) {
    return {
      isDragging: true,
      isDropAnimating: false,
      shouldAnimateDisplacement: false,
      offset: offset,
      shouldAnimateDragMovement: shouldAnimateDragMovement,
      dimension: dimension,
      direction: direction
    };
  });

  var draggingSelector = function draggingSelector(state, ownProps) {
    if (state.phase !== 'DRAGGING' && state.phase !== 'DROP_ANIMATING') {
      return null;
    }

    if (state.phase === 'DRAGGING') {
      if (!state.drag) {
        console.error('invalid drag state found in selector');
        return null;
      }

      if (state.drag.initial.descriptor.id !== ownProps.draggableId) {
        return null;
      }

      var offset = state.drag.current.client.offset;
      var dimension = state.dimension.draggable[ownProps.draggableId];
      var direction = state.drag.impact.direction;
      var shouldAnimateDragMovement = state.drag.current.shouldAnimate;

      return getDraggingProps(memoizedOffset(offset.x, offset.y), shouldAnimateDragMovement, dimension, direction);
    }

    if (!state.drop || !state.drop.pending) {
      console.error('cannot provide props for dropping item when there is invalid state');
      return null;
    }

    if (state.drop.pending.result.draggableId !== ownProps.draggableId) {
      return null;
    }

    return {
      isDragging: false,
      isDropAnimating: true,
      offset: state.drop.pending.newHomeOffset,

      dimension: state.dimension.draggable[ownProps.draggableId],

      direction: null,

      shouldAnimateDragMovement: false,

      shouldAnimateDisplacement: false
    };
  };

  var getOutOfTheWayMovement = function getOutOfTheWayMovement(id, movement) {
    var map = (0, _getDisplacementMap2.default)(movement.displaced);
    var displacement = map[id];

    if (!displacement) {
      return null;
    }

    if (!displacement.isVisible) {
      return null;
    }

    var amount = movement.isBeyondStartPosition ? (0, _position.negate)(movement.amount) : movement.amount;

    return getNotDraggingProps(memoizedOffset(amount.x, amount.y), displacement.shouldAnimate);
  };

  var movingOutOfTheWaySelector = function movingOutOfTheWaySelector(state, ownProps) {
    if (state.phase !== 'DRAGGING' && state.phase !== 'DROP_ANIMATING') {
      return null;
    }

    if (state.phase === 'DRAGGING') {
      if (!state.drag) {
        console.error('cannot correctly move item out of the way when there is invalid state');
        return null;
      }

      if (state.drag.initial.descriptor.id === ownProps.draggableId) {
        return null;
      }

      return getOutOfTheWayMovement(ownProps.draggableId, state.drag.impact.movement);
    }

    if (!state.drop || !state.drop.pending) {
      console.error('cannot provide props for dropping item when there is invalid state');
      return null;
    }

    if (state.drop.pending.result.draggableId === ownProps.draggableId) {
      return null;
    }

    return getOutOfTheWayMovement(ownProps.draggableId, state.drop.pending.impact.movement);
  };

  return (0, _reselect.createSelector)([draggingSelector, movingOutOfTheWaySelector], function (dragging, movingOutOfTheWay) {
    if (dragging) {
      return dragging;
    }

    if (movingOutOfTheWay) {
      return movingOutOfTheWay;
    }

    return defaultMapProps;
  });
};

var makeMapStateToProps = function makeMapStateToProps() {
  var selector = makeSelector();

  return function (state, props) {
    return selector(state, props);
  };
};

var mapDispatchToProps = {
  lift: _actionCreators.lift,
  move: _actionCreators.move,
  moveForward: _actionCreators.moveForward,
  moveBackward: _actionCreators.moveBackward,
  crossAxisMoveForward: _actionCreators.crossAxisMoveForward,
  crossAxisMoveBackward: _actionCreators.crossAxisMoveBackward,
  moveByWindowScroll: _actionCreators.moveByWindowScroll,
  drop: _actionCreators.drop,
  dropAnimationFinished: _actionCreators.dropAnimationFinished,
  cancel: _actionCreators.cancel
};

exports.default = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps, null, { storeKey: _contextKeys.storeKey })(_draggable2.default);

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zIndexOptions = undefined;

var _defineProperty2 = __webpack_require__(9);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = __webpack_require__(13);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(16);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Draggable$contextTyp;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(5);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _memoizeOne = __webpack_require__(3);

var _memoizeOne2 = _interopRequireDefault(_memoizeOne);

var _invariant = __webpack_require__(130);

var _invariant2 = _interopRequireDefault(_invariant);

var _draggableDimensionPublisher = __webpack_require__(271);

var _draggableDimensionPublisher2 = _interopRequireDefault(_draggableDimensionPublisher);

var _moveable = __webpack_require__(273);

var _moveable2 = _interopRequireDefault(_moveable);

var _dragHandle = __webpack_require__(283);

var _dragHandle2 = _interopRequireDefault(_dragHandle);

var _getWindowScrollPosition = __webpack_require__(79);

var _getWindowScrollPosition2 = _interopRequireDefault(_getWindowScrollPosition);

var _getCenterPosition = __webpack_require__(137);

var _getCenterPosition2 = _interopRequireDefault(_getCenterPosition);

var _placeholder = __webpack_require__(134);

var _placeholder2 = _interopRequireDefault(_placeholder);

var _contextKeys = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var zIndexOptions = exports.zIndexOptions = {
  dragging: 5000,
  dropAnimating: 4500
};

var Draggable = function (_Component) {
  (0, _inherits3.default)(Draggable, _Component);

  function Draggable(props, context) {
    (0, _classCallCheck3.default)(this, Draggable);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Draggable.__proto__ || (0, _getPrototypeOf2.default)(Draggable)).call(this, props, context));

    _this.state = {
      ref: null
    };

    _this.onMoveEnd = function () {
      if (!_this.props.isDropAnimating) {
        return;
      }

      _this.props.dropAnimationFinished();
    };

    _this.onLift = function (options) {
      _this.throwIfCannotDrag();
      var client = options.client,
          isScrollAllowed = options.isScrollAllowed;
      var _this$props = _this.props,
          lift = _this$props.lift,
          draggableId = _this$props.draggableId;
      var ref = _this.state.ref;


      if (!ref) {
        throw new Error('cannot lift at this time');
      }

      var initial = {
        selection: client,
        center: (0, _getCenterPosition2.default)(ref)
      };

      var windowScroll = (0, _getWindowScrollPosition2.default)();

      lift(draggableId, initial, windowScroll, isScrollAllowed);
    };

    _this.onMove = function (client) {
      _this.throwIfCannotDrag();

      var _this$props2 = _this.props,
          draggableId = _this$props2.draggableId,
          dimension = _this$props2.dimension,
          move = _this$props2.move;

      if (!dimension) {
        return;
      }

      var windowScroll = (0, _getWindowScrollPosition2.default)();

      move(draggableId, client, windowScroll);
    };

    _this.onMoveForward = function () {
      _this.throwIfCannotDrag();
      _this.props.moveForward(_this.props.draggableId);
    };

    _this.onMoveBackward = function () {
      _this.throwIfCannotDrag();
      _this.props.moveBackward(_this.props.draggableId);
    };

    _this.onCrossAxisMoveForward = function () {
      _this.throwIfCannotDrag();
      _this.props.crossAxisMoveForward(_this.props.draggableId);
    };

    _this.onCrossAxisMoveBackward = function () {
      _this.throwIfCannotDrag();
      _this.props.crossAxisMoveBackward(_this.props.draggableId);
    };

    _this.onWindowScroll = function () {
      _this.throwIfCannotDrag();
      var windowScroll = (0, _getWindowScrollPosition2.default)();
      _this.props.moveByWindowScroll(_this.props.draggableId, windowScroll);
    };

    _this.onDrop = function () {
      _this.throwIfCannotDrag();
      _this.props.drop();
    };

    _this.onCancel = function () {
      _this.props.cancel();
    };

    _this.setRef = function (ref) {
      if (ref === null) {
        return;
      }

      if (ref === _this.state.ref) {
        return;
      }

      _this.setState({
        ref: ref
      });
    };

    _this.getDraggableRef = function () {
      return _this.state.ref;
    };

    _this.getDraggingStyle = (0, _memoizeOne2.default)(function (dimension, isDropAnimating, movementStyle) {
      var _dimension$client$wit = dimension.client.withoutMargin,
          width = _dimension$client$wit.width,
          height = _dimension$client$wit.height,
          top = _dimension$client$wit.top,
          left = _dimension$client$wit.left;

      var style = {
        position: 'fixed',
        boxSizing: 'border-box',
        zIndex: isDropAnimating ? zIndexOptions.dropAnimating : zIndexOptions.dragging,
        width: width,
        height: height,
        top: top,
        left: left,
        margin: 0,
        pointerEvents: 'none',
        transition: 'none',
        transform: movementStyle.transform ? '' + movementStyle.transform : null
      };
      return style;
    });
    _this.getNotDraggingStyle = (0, _memoizeOne2.default)(function (movementStyle, shouldAnimateDisplacement) {
      var style = {
        transform: movementStyle.transform,

        transition: shouldAnimateDisplacement ? null : 'none'
      };
      return style;
    });
    _this.getProvided = (0, _memoizeOne2.default)(function (isDragging, isDropAnimating, shouldAnimateDisplacement, dimension, dragHandleProps, movementStyle) {
      var useDraggingStyle = isDragging || isDropAnimating;

      var draggableStyle = function () {
        if (!useDraggingStyle) {
          return _this.getNotDraggingStyle(movementStyle, shouldAnimateDisplacement);
        }

        (0, _invariant2.default)(dimension, 'draggable dimension required for dragging');

        return _this.getDraggingStyle(dimension, isDropAnimating, movementStyle);
      }();

      var provided = {
        innerRef: _this.setRef,
        draggableProps: {
          'data-react-beautiful-dnd-draggable': _this.styleContext,
          style: draggableStyle
        },
        dragHandleProps: dragHandleProps,
        placeholder: useDraggingStyle ? _this.getPlaceholder() : null
      };
      return provided;
    });
    _this.getSnapshot = (0, _memoizeOne2.default)(function (isDragging, isDropAnimating) {
      return {
        isDragging: isDragging || isDropAnimating
      };
    });
    _this.getSpeed = (0, _memoizeOne2.default)(function (isDragging, shouldAnimateDragMovement, isDropAnimating) {
      if (isDropAnimating) {
        return 'STANDARD';
      }

      if (isDragging && shouldAnimateDragMovement) {
        return 'FAST';
      }

      return 'INSTANT';
    });


    var callbacks = {
      onLift: _this.onLift,
      onMove: _this.onMove,
      onDrop: _this.onDrop,
      onCancel: _this.onCancel,
      onMoveBackward: _this.onMoveBackward,
      onMoveForward: _this.onMoveForward,
      onCrossAxisMoveForward: _this.onCrossAxisMoveForward,
      onCrossAxisMoveBackward: _this.onCrossAxisMoveBackward,
      onWindowScroll: _this.onWindowScroll
    };

    _this.callbacks = callbacks;
    _this.styleContext = context[_contextKeys.styleContextKey];
    return _this;
  }

  (0, _createClass3.default)(Draggable, [{
    key: 'throwIfCannotDrag',
    value: function throwIfCannotDrag() {
      (0, _invariant2.default)(this.state.ref, 'Draggable: cannot drag as no DOM node has been provided');
      (0, _invariant2.default)(!this.props.isDragDisabled, 'Draggable: cannot drag as dragging is not enabled');
    }
  }, {
    key: 'getPlaceholder',
    value: function getPlaceholder() {
      var dimension = this.props.dimension;
      (0, _invariant2.default)(dimension, 'cannot get a drag placeholder when not dragging');

      return _react2.default.createElement(_placeholder2.default, { placeholder: dimension.placeholder });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          draggableId = _props.draggableId,
          index = _props.index,
          offset = _props.offset,
          isDragging = _props.isDragging,
          isDropAnimating = _props.isDropAnimating,
          isDragDisabled = _props.isDragDisabled,
          dimension = _props.dimension,
          children = _props.children,
          direction = _props.direction,
          shouldAnimateDragMovement = _props.shouldAnimateDragMovement,
          shouldAnimateDisplacement = _props.shouldAnimateDisplacement,
          disableInteractiveElementBlocking = _props.disableInteractiveElementBlocking;

      var droppableId = this.context[_contextKeys.droppableIdKey];

      var speed = this.getSpeed(isDragging, shouldAnimateDragMovement, isDropAnimating);

      return _react2.default.createElement(
        _draggableDimensionPublisher2.default,
        {
          draggableId: draggableId,
          droppableId: droppableId,
          index: index,
          targetRef: this.state.ref
        },
        _react2.default.createElement(
          _moveable2.default,
          {
            speed: speed,
            destination: offset,
            onMoveEnd: this.onMoveEnd
          },
          function (movementStyle) {
            return _react2.default.createElement(
              _dragHandle2.default,
              {
                draggableId: draggableId,
                isDragging: isDragging,
                direction: direction,
                isEnabled: !isDragDisabled,
                callbacks: _this2.callbacks,
                getDraggableRef: _this2.getDraggableRef,

                canDragInteractiveElements: disableInteractiveElementBlocking
              },
              function (dragHandleProps) {
                return children(_this2.getProvided(isDragging, isDropAnimating, shouldAnimateDisplacement, dimension, dragHandleProps, movementStyle), _this2.getSnapshot(isDragging, isDropAnimating));
              }
            );
          }
        )
      );
    }
  }]);
  return Draggable;
}(_react.Component);

Draggable.defaultProps = {
  isDragDisabled: false,

  disableInteractiveElementBlocking: false
};
Draggable.contextTypes = (_Draggable$contextTyp = {}, (0, _defineProperty3.default)(_Draggable$contextTyp, _contextKeys.droppableIdKey, _propTypes2.default.string.isRequired), (0, _defineProperty3.default)(_Draggable$contextTyp, _contextKeys.styleContextKey, _propTypes2.default.string.isRequired), _Draggable$contextTyp);
exports.default = Draggable;

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draggableDimensionPublisher = __webpack_require__(272);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_draggableDimensionPublisher).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(9);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = __webpack_require__(13);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(16);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(0);

var _propTypes = __webpack_require__(5);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _memoizeOne = __webpack_require__(3);

var _memoizeOne2 = _interopRequireDefault(_memoizeOne);

var _getWindowScrollPosition = __webpack_require__(79);

var _getWindowScrollPosition2 = _interopRequireDefault(_getWindowScrollPosition);

var _dimension = __webpack_require__(49);

var _contextKeys = __webpack_require__(20);

var _getArea = __webpack_require__(31);

var _getArea2 = _interopRequireDefault(_getArea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DraggableDimensionPublisher = function (_Component) {
  (0, _inherits3.default)(DraggableDimensionPublisher, _Component);

  function DraggableDimensionPublisher() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DraggableDimensionPublisher);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DraggableDimensionPublisher.__proto__ || (0, _getPrototypeOf2.default)(DraggableDimensionPublisher)).call.apply(_ref, [this].concat(args))), _this), _this.publishedDescriptor = null, _this.getMemoizedDescriptor = (0, _memoizeOne2.default)(function (id, droppableId, index) {
      return {
        id: id,
        droppableId: droppableId,
        index: index
      };
    }), _this.unpublish = function () {
      if (!_this.publishedDescriptor) {
        console.error('cannot unpublish descriptor when none is published');
        return;
      }

      var marshal = _this.context[_contextKeys.dimensionMarshalKey];
      marshal.unregisterDraggable(_this.publishedDescriptor);
      _this.publishedDescriptor = null;
    }, _this.publish = function (descriptor) {
      if (descriptor === _this.publishedDescriptor) {
        return;
      }

      if (_this.publishedDescriptor) {
        _this.unpublish();
      }

      var marshal = _this.context[_contextKeys.dimensionMarshalKey];
      marshal.registerDraggable(descriptor, _this.getDimension);
      _this.publishedDescriptor = descriptor;
    }, _this.getDimension = function () {
      var targetRef = _this.props.targetRef;

      if (!targetRef) {
        throw new Error('DraggableDimensionPublisher cannot calculate a dimension when not attached to the DOM');
      }

      var descriptor = _this.publishedDescriptor;

      if (!descriptor) {
        throw new Error('Cannot get dimension for unpublished draggable');
      }

      var style = window.getComputedStyle(targetRef);

      var margin = {
        top: parseInt(style.marginTop, 10),
        right: parseInt(style.marginRight, 10),
        bottom: parseInt(style.marginBottom, 10),
        left: parseInt(style.marginLeft, 10)
      };

      var client = (0, _getArea2.default)(targetRef.getBoundingClientRect());

      var dimension = (0, _dimension.getDraggableDimension)({
        descriptor: descriptor,
        client: client,
        margin: margin,
        windowScroll: (0, _getWindowScrollPosition2.default)()
      });

      return dimension;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DraggableDimensionPublisher, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var draggableId = nextProps.draggableId,
          droppableId = nextProps.droppableId,
          index = nextProps.index,
          targetRef = nextProps.targetRef;


      if (!targetRef) {
        console.error('Updating draggable dimension handler without a targetRef');
        return;
      }

      var descriptor = this.getMemoizedDescriptor(draggableId, droppableId, index);

      this.publish(descriptor);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unpublish();
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);
  return DraggableDimensionPublisher;
}(_react.Component);

DraggableDimensionPublisher.contextTypes = (0, _defineProperty3.default)({}, _contextKeys.dimensionMarshalKey, _propTypes2.default.object.isRequired);
exports.default = DraggableDimensionPublisher;

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moveable = __webpack_require__(274);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_moveable).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(13);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(16);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactMotion = __webpack_require__(275);

var _animation = __webpack_require__(125);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var origin = {
  x: 0,
  y: 0
};

var noMovement = {
  transform: null
};

var isAtOrigin = function isAtOrigin(point) {
  return point.x === origin.x && point.y === origin.y;
};

var getStyle = function getStyle(isNotMoving, x, y) {
  if (isNotMoving) {
    return noMovement;
  }

  var point = { x: x, y: y };

  if (isAtOrigin(point)) {
    return noMovement;
  }
  var style = {
    transform: 'translate(' + point.x + 'px, ' + point.y + 'px)'
  };
  return style;
};

var Movable = function (_Component) {
  (0, _inherits3.default)(Movable, _Component);

  function Movable() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Movable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Movable.__proto__ || (0, _getPrototypeOf2.default)(Movable)).call.apply(_ref, [this].concat(args))), _this), _this.onRest = function () {
      var onMoveEnd = _this.props.onMoveEnd;


      if (!onMoveEnd) {
        return;
      }

      setTimeout(function () {
        return onMoveEnd();
      });
    }, _this.getFinal = function () {
      var destination = _this.props.destination;
      var speed = _this.props.speed;

      if (speed === 'INSTANT') {
        return destination;
      }

      var selected = speed === 'FAST' ? _animation.physics.fast : _animation.physics.standard;

      return {
        x: (0, _reactMotion.spring)(destination.x, selected),
        y: (0, _reactMotion.spring)(destination.y, selected)
      };
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Movable, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var final = this.getFinal();

      var isNotMoving = isAtOrigin(final);

      return _react2.default.createElement(
        _reactMotion.Motion,
        { defaultStyle: origin, style: final, onRest: this.onRest },
        function (current) {
          return _this2.props.children(getStyle(isNotMoving, current.x, current.y));
        }
      );
    }
  }]);
  return Movable;
}(_react.Component);

Movable.defaultProps = {
  destination: origin
};
exports.default = Movable;

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

var _Motion = __webpack_require__(276);

exports.Motion = _interopRequire(_Motion);

var _StaggeredMotion = __webpack_require__(278);

exports.StaggeredMotion = _interopRequire(_StaggeredMotion);

var _TransitionMotion = __webpack_require__(279);

exports.TransitionMotion = _interopRequire(_TransitionMotion);

var _spring = __webpack_require__(281);

exports.spring = _interopRequire(_spring);

var _presets = __webpack_require__(135);

exports.presets = _interopRequire(_presets);

var _stripStyle = __webpack_require__(50);

exports.stripStyle = _interopRequire(_stripStyle);

// deprecated, dummy warning function

var _reorderKeys = __webpack_require__(282);

exports.reorderKeys = _interopRequire(_reorderKeys);

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mapToZero = __webpack_require__(80);

var _mapToZero2 = _interopRequireDefault(_mapToZero);

var _stripStyle = __webpack_require__(50);

var _stripStyle2 = _interopRequireDefault(_stripStyle);

var _stepper3 = __webpack_require__(81);

var _stepper4 = _interopRequireDefault(_stepper3);

var _performanceNow = __webpack_require__(82);

var _performanceNow2 = _interopRequireDefault(_performanceNow);

var _raf = __webpack_require__(83);

var _raf2 = _interopRequireDefault(_raf);

var _shouldStopAnimation = __webpack_require__(84);

var _shouldStopAnimation2 = _interopRequireDefault(_shouldStopAnimation);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(5);

var _propTypes2 = _interopRequireDefault(_propTypes);

var msPerFrame = 1000 / 60;

var Motion = (function (_React$Component) {
  _inherits(Motion, _React$Component);

  _createClass(Motion, null, [{
    key: 'propTypes',
    value: {
      // TOOD: warn against putting a config in here
      defaultStyle: _propTypes2['default'].objectOf(_propTypes2['default'].number),
      style: _propTypes2['default'].objectOf(_propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].object])).isRequired,
      children: _propTypes2['default'].func.isRequired,
      onRest: _propTypes2['default'].func
    },
    enumerable: true
  }]);

  function Motion(props) {
    var _this = this;

    _classCallCheck(this, Motion);

    _React$Component.call(this, props);
    this.wasAnimating = false;
    this.animationID = null;
    this.prevTime = 0;
    this.accumulatedTime = 0;
    this.unreadPropStyle = null;

    this.clearUnreadPropStyle = function (destStyle) {
      var dirty = false;
      var _state = _this.state;
      var currentStyle = _state.currentStyle;
      var currentVelocity = _state.currentVelocity;
      var lastIdealStyle = _state.lastIdealStyle;
      var lastIdealVelocity = _state.lastIdealVelocity;

      for (var key in destStyle) {
        if (!Object.prototype.hasOwnProperty.call(destStyle, key)) {
          continue;
        }

        var styleValue = destStyle[key];
        if (typeof styleValue === 'number') {
          if (!dirty) {
            dirty = true;
            currentStyle = _extends({}, currentStyle);
            currentVelocity = _extends({}, currentVelocity);
            lastIdealStyle = _extends({}, lastIdealStyle);
            lastIdealVelocity = _extends({}, lastIdealVelocity);
          }

          currentStyle[key] = styleValue;
          currentVelocity[key] = 0;
          lastIdealStyle[key] = styleValue;
          lastIdealVelocity[key] = 0;
        }
      }

      if (dirty) {
        _this.setState({ currentStyle: currentStyle, currentVelocity: currentVelocity, lastIdealStyle: lastIdealStyle, lastIdealVelocity: lastIdealVelocity });
      }
    };

    this.startAnimationIfNecessary = function () {
      // TODO: when config is {a: 10} and dest is {a: 10} do we raf once and
      // call cb? No, otherwise accidental parent rerender causes cb trigger
      _this.animationID = _raf2['default'](function (timestamp) {
        // check if we need to animate in the first place
        var propsStyle = _this.props.style;
        if (_shouldStopAnimation2['default'](_this.state.currentStyle, propsStyle, _this.state.currentVelocity)) {
          if (_this.wasAnimating && _this.props.onRest) {
            _this.props.onRest();
          }

          // no need to cancel animationID here; shouldn't have any in flight
          _this.animationID = null;
          _this.wasAnimating = false;
          _this.accumulatedTime = 0;
          return;
        }

        _this.wasAnimating = true;

        var currentTime = timestamp || _performanceNow2['default']();
        var timeDelta = currentTime - _this.prevTime;
        _this.prevTime = currentTime;
        _this.accumulatedTime = _this.accumulatedTime + timeDelta;
        // more than 10 frames? prolly switched browser tab. Restart
        if (_this.accumulatedTime > msPerFrame * 10) {
          _this.accumulatedTime = 0;
        }

        if (_this.accumulatedTime === 0) {
          // no need to cancel animationID here; shouldn't have any in flight
          _this.animationID = null;
          _this.startAnimationIfNecessary();
          return;
        }

        var currentFrameCompletion = (_this.accumulatedTime - Math.floor(_this.accumulatedTime / msPerFrame) * msPerFrame) / msPerFrame;
        var framesToCatchUp = Math.floor(_this.accumulatedTime / msPerFrame);

        var newLastIdealStyle = {};
        var newLastIdealVelocity = {};
        var newCurrentStyle = {};
        var newCurrentVelocity = {};

        for (var key in propsStyle) {
          if (!Object.prototype.hasOwnProperty.call(propsStyle, key)) {
            continue;
          }

          var styleValue = propsStyle[key];
          if (typeof styleValue === 'number') {
            newCurrentStyle[key] = styleValue;
            newCurrentVelocity[key] = 0;
            newLastIdealStyle[key] = styleValue;
            newLastIdealVelocity[key] = 0;
          } else {
            var newLastIdealStyleValue = _this.state.lastIdealStyle[key];
            var newLastIdealVelocityValue = _this.state.lastIdealVelocity[key];
            for (var i = 0; i < framesToCatchUp; i++) {
              var _stepper = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);

              newLastIdealStyleValue = _stepper[0];
              newLastIdealVelocityValue = _stepper[1];
            }

            var _stepper2 = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);

            var nextIdealX = _stepper2[0];
            var nextIdealV = _stepper2[1];

            newCurrentStyle[key] = newLastIdealStyleValue + (nextIdealX - newLastIdealStyleValue) * currentFrameCompletion;
            newCurrentVelocity[key] = newLastIdealVelocityValue + (nextIdealV - newLastIdealVelocityValue) * currentFrameCompletion;
            newLastIdealStyle[key] = newLastIdealStyleValue;
            newLastIdealVelocity[key] = newLastIdealVelocityValue;
          }
        }

        _this.animationID = null;
        // the amount we're looped over above
        _this.accumulatedTime -= framesToCatchUp * msPerFrame;

        _this.setState({
          currentStyle: newCurrentStyle,
          currentVelocity: newCurrentVelocity,
          lastIdealStyle: newLastIdealStyle,
          lastIdealVelocity: newLastIdealVelocity
        });

        _this.unreadPropStyle = null;

        _this.startAnimationIfNecessary();
      });
    };

    this.state = this.defaultState();
  }

  Motion.prototype.defaultState = function defaultState() {
    var _props = this.props;
    var defaultStyle = _props.defaultStyle;
    var style = _props.style;

    var currentStyle = defaultStyle || _stripStyle2['default'](style);
    var currentVelocity = _mapToZero2['default'](currentStyle);
    return {
      currentStyle: currentStyle,
      currentVelocity: currentVelocity,
      lastIdealStyle: currentStyle,
      lastIdealVelocity: currentVelocity
    };
  };

  // it's possible that currentStyle's value is stale: if props is immediately
  // changed from 0 to 400 to spring(0) again, the async currentStyle is still
  // at 0 (didn't have time to tick and interpolate even once). If we naively
  // compare currentStyle with destVal it'll be 0 === 0 (no animation, stop).
  // In reality currentStyle should be 400

  Motion.prototype.componentDidMount = function componentDidMount() {
    this.prevTime = _performanceNow2['default']();
    this.startAnimationIfNecessary();
  };

  Motion.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    if (this.unreadPropStyle != null) {
      // previous props haven't had the chance to be set yet; set them here
      this.clearUnreadPropStyle(this.unreadPropStyle);
    }

    this.unreadPropStyle = props.style;
    if (this.animationID == null) {
      this.prevTime = _performanceNow2['default']();
      this.startAnimationIfNecessary();
    }
  };

  Motion.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.animationID != null) {
      _raf2['default'].cancel(this.animationID);
      this.animationID = null;
    }
  };

  Motion.prototype.render = function render() {
    var renderedChildren = this.props.children(this.state.currentStyle);
    return renderedChildren && _react2['default'].Children.only(renderedChildren);
  };

  return Motion;
})(_react2['default'].Component);

exports['default'] = Motion;
module.exports = exports['default'];

// after checking for unreadPropStyle != null, we manually go set the
// non-interpolating values (those that are a number, without a spring
// config)

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.12.2
(function() {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

//# sourceMappingURL=performance-now.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mapToZero = __webpack_require__(80);

var _mapToZero2 = _interopRequireDefault(_mapToZero);

var _stripStyle = __webpack_require__(50);

var _stripStyle2 = _interopRequireDefault(_stripStyle);

var _stepper3 = __webpack_require__(81);

var _stepper4 = _interopRequireDefault(_stepper3);

var _performanceNow = __webpack_require__(82);

var _performanceNow2 = _interopRequireDefault(_performanceNow);

var _raf = __webpack_require__(83);

var _raf2 = _interopRequireDefault(_raf);

var _shouldStopAnimation = __webpack_require__(84);

var _shouldStopAnimation2 = _interopRequireDefault(_shouldStopAnimation);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(5);

var _propTypes2 = _interopRequireDefault(_propTypes);

var msPerFrame = 1000 / 60;

function shouldStopAnimationAll(currentStyles, styles, currentVelocities) {
  for (var i = 0; i < currentStyles.length; i++) {
    if (!_shouldStopAnimation2['default'](currentStyles[i], styles[i], currentVelocities[i])) {
      return false;
    }
  }
  return true;
}

var StaggeredMotion = (function (_React$Component) {
  _inherits(StaggeredMotion, _React$Component);

  _createClass(StaggeredMotion, null, [{
    key: 'propTypes',
    value: {
      // TOOD: warn against putting a config in here
      defaultStyles: _propTypes2['default'].arrayOf(_propTypes2['default'].objectOf(_propTypes2['default'].number)),
      styles: _propTypes2['default'].func.isRequired,
      children: _propTypes2['default'].func.isRequired
    },
    enumerable: true
  }]);

  function StaggeredMotion(props) {
    var _this = this;

    _classCallCheck(this, StaggeredMotion);

    _React$Component.call(this, props);
    this.animationID = null;
    this.prevTime = 0;
    this.accumulatedTime = 0;
    this.unreadPropStyles = null;

    this.clearUnreadPropStyle = function (unreadPropStyles) {
      var _state = _this.state;
      var currentStyles = _state.currentStyles;
      var currentVelocities = _state.currentVelocities;
      var lastIdealStyles = _state.lastIdealStyles;
      var lastIdealVelocities = _state.lastIdealVelocities;

      var someDirty = false;
      for (var i = 0; i < unreadPropStyles.length; i++) {
        var unreadPropStyle = unreadPropStyles[i];
        var dirty = false;

        for (var key in unreadPropStyle) {
          if (!Object.prototype.hasOwnProperty.call(unreadPropStyle, key)) {
            continue;
          }

          var styleValue = unreadPropStyle[key];
          if (typeof styleValue === 'number') {
            if (!dirty) {
              dirty = true;
              someDirty = true;
              currentStyles[i] = _extends({}, currentStyles[i]);
              currentVelocities[i] = _extends({}, currentVelocities[i]);
              lastIdealStyles[i] = _extends({}, lastIdealStyles[i]);
              lastIdealVelocities[i] = _extends({}, lastIdealVelocities[i]);
            }
            currentStyles[i][key] = styleValue;
            currentVelocities[i][key] = 0;
            lastIdealStyles[i][key] = styleValue;
            lastIdealVelocities[i][key] = 0;
          }
        }
      }

      if (someDirty) {
        _this.setState({ currentStyles: currentStyles, currentVelocities: currentVelocities, lastIdealStyles: lastIdealStyles, lastIdealVelocities: lastIdealVelocities });
      }
    };

    this.startAnimationIfNecessary = function () {
      // TODO: when config is {a: 10} and dest is {a: 10} do we raf once and
      // call cb? No, otherwise accidental parent rerender causes cb trigger
      _this.animationID = _raf2['default'](function (timestamp) {
        var destStyles = _this.props.styles(_this.state.lastIdealStyles);

        // check if we need to animate in the first place
        if (shouldStopAnimationAll(_this.state.currentStyles, destStyles, _this.state.currentVelocities)) {
          // no need to cancel animationID here; shouldn't have any in flight
          _this.animationID = null;
          _this.accumulatedTime = 0;
          return;
        }

        var currentTime = timestamp || _performanceNow2['default']();
        var timeDelta = currentTime - _this.prevTime;
        _this.prevTime = currentTime;
        _this.accumulatedTime = _this.accumulatedTime + timeDelta;
        // more than 10 frames? prolly switched browser tab. Restart
        if (_this.accumulatedTime > msPerFrame * 10) {
          _this.accumulatedTime = 0;
        }

        if (_this.accumulatedTime === 0) {
          // no need to cancel animationID here; shouldn't have any in flight
          _this.animationID = null;
          _this.startAnimationIfNecessary();
          return;
        }

        var currentFrameCompletion = (_this.accumulatedTime - Math.floor(_this.accumulatedTime / msPerFrame) * msPerFrame) / msPerFrame;
        var framesToCatchUp = Math.floor(_this.accumulatedTime / msPerFrame);

        var newLastIdealStyles = [];
        var newLastIdealVelocities = [];
        var newCurrentStyles = [];
        var newCurrentVelocities = [];

        for (var i = 0; i < destStyles.length; i++) {
          var destStyle = destStyles[i];
          var newCurrentStyle = {};
          var newCurrentVelocity = {};
          var newLastIdealStyle = {};
          var newLastIdealVelocity = {};

          for (var key in destStyle) {
            if (!Object.prototype.hasOwnProperty.call(destStyle, key)) {
              continue;
            }

            var styleValue = destStyle[key];
            if (typeof styleValue === 'number') {
              newCurrentStyle[key] = styleValue;
              newCurrentVelocity[key] = 0;
              newLastIdealStyle[key] = styleValue;
              newLastIdealVelocity[key] = 0;
            } else {
              var newLastIdealStyleValue = _this.state.lastIdealStyles[i][key];
              var newLastIdealVelocityValue = _this.state.lastIdealVelocities[i][key];
              for (var j = 0; j < framesToCatchUp; j++) {
                var _stepper = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);

                newLastIdealStyleValue = _stepper[0];
                newLastIdealVelocityValue = _stepper[1];
              }

              var _stepper2 = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);

              var nextIdealX = _stepper2[0];
              var nextIdealV = _stepper2[1];

              newCurrentStyle[key] = newLastIdealStyleValue + (nextIdealX - newLastIdealStyleValue) * currentFrameCompletion;
              newCurrentVelocity[key] = newLastIdealVelocityValue + (nextIdealV - newLastIdealVelocityValue) * currentFrameCompletion;
              newLastIdealStyle[key] = newLastIdealStyleValue;
              newLastIdealVelocity[key] = newLastIdealVelocityValue;
            }
          }

          newCurrentStyles[i] = newCurrentStyle;
          newCurrentVelocities[i] = newCurrentVelocity;
          newLastIdealStyles[i] = newLastIdealStyle;
          newLastIdealVelocities[i] = newLastIdealVelocity;
        }

        _this.animationID = null;
        // the amount we're looped over above
        _this.accumulatedTime -= framesToCatchUp * msPerFrame;

        _this.setState({
          currentStyles: newCurrentStyles,
          currentVelocities: newCurrentVelocities,
          lastIdealStyles: newLastIdealStyles,
          lastIdealVelocities: newLastIdealVelocities
        });

        _this.unreadPropStyles = null;

        _this.startAnimationIfNecessary();
      });
    };

    this.state = this.defaultState();
  }

  StaggeredMotion.prototype.defaultState = function defaultState() {
    var _props = this.props;
    var defaultStyles = _props.defaultStyles;
    var styles = _props.styles;

    var currentStyles = defaultStyles || styles().map(_stripStyle2['default']);
    var currentVelocities = currentStyles.map(function (currentStyle) {
      return _mapToZero2['default'](currentStyle);
    });
    return {
      currentStyles: currentStyles,
      currentVelocities: currentVelocities,
      lastIdealStyles: currentStyles,
      lastIdealVelocities: currentVelocities
    };
  };

  StaggeredMotion.prototype.componentDidMount = function componentDidMount() {
    this.prevTime = _performanceNow2['default']();
    this.startAnimationIfNecessary();
  };

  StaggeredMotion.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    if (this.unreadPropStyles != null) {
      // previous props haven't had the chance to be set yet; set them here
      this.clearUnreadPropStyle(this.unreadPropStyles);
    }

    this.unreadPropStyles = props.styles(this.state.lastIdealStyles);
    if (this.animationID == null) {
      this.prevTime = _performanceNow2['default']();
      this.startAnimationIfNecessary();
    }
  };

  StaggeredMotion.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.animationID != null) {
      _raf2['default'].cancel(this.animationID);
      this.animationID = null;
    }
  };

  StaggeredMotion.prototype.render = function render() {
    var renderedChildren = this.props.children(this.state.currentStyles);
    return renderedChildren && _react2['default'].Children.only(renderedChildren);
  };

  return StaggeredMotion;
})(_react2['default'].Component);

exports['default'] = StaggeredMotion;
module.exports = exports['default'];

// it's possible that currentStyle's value is stale: if props is immediately
// changed from 0 to 400 to spring(0) again, the async currentStyle is still
// at 0 (didn't have time to tick and interpolate even once). If we naively
// compare currentStyle with destVal it'll be 0 === 0 (no animation, stop).
// In reality currentStyle should be 400

// after checking for unreadPropStyles != null, we manually go set the
// non-interpolating values (those that are a number, without a spring
// config)

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mapToZero = __webpack_require__(80);

var _mapToZero2 = _interopRequireDefault(_mapToZero);

var _stripStyle = __webpack_require__(50);

var _stripStyle2 = _interopRequireDefault(_stripStyle);

var _stepper3 = __webpack_require__(81);

var _stepper4 = _interopRequireDefault(_stepper3);

var _mergeDiff = __webpack_require__(280);

var _mergeDiff2 = _interopRequireDefault(_mergeDiff);

var _performanceNow = __webpack_require__(82);

var _performanceNow2 = _interopRequireDefault(_performanceNow);

var _raf = __webpack_require__(83);

var _raf2 = _interopRequireDefault(_raf);

var _shouldStopAnimation = __webpack_require__(84);

var _shouldStopAnimation2 = _interopRequireDefault(_shouldStopAnimation);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(5);

var _propTypes2 = _interopRequireDefault(_propTypes);

var msPerFrame = 1000 / 60;

// the children function & (potential) styles function asks as param an
// Array<TransitionPlainStyle>, where each TransitionPlainStyle is of the format
// {key: string, data?: any, style: PlainStyle}. However, the way we keep
// internal states doesn't contain such a data structure (check the state and
// TransitionMotionState). So when children function and others ask for such
// data we need to generate them on the fly by combining mergedPropsStyles and
// currentStyles/lastIdealStyles
function rehydrateStyles(mergedPropsStyles, unreadPropStyles, plainStyles) {
  // Copy the value to a `const` so that Flow understands that the const won't
  // change and will be non-nullable in the callback below.
  var cUnreadPropStyles = unreadPropStyles;
  if (cUnreadPropStyles == null) {
    return mergedPropsStyles.map(function (mergedPropsStyle, i) {
      return {
        key: mergedPropsStyle.key,
        data: mergedPropsStyle.data,
        style: plainStyles[i]
      };
    });
  }
  return mergedPropsStyles.map(function (mergedPropsStyle, i) {
    for (var j = 0; j < cUnreadPropStyles.length; j++) {
      if (cUnreadPropStyles[j].key === mergedPropsStyle.key) {
        return {
          key: cUnreadPropStyles[j].key,
          data: cUnreadPropStyles[j].data,
          style: plainStyles[i]
        };
      }
    }
    return { key: mergedPropsStyle.key, data: mergedPropsStyle.data, style: plainStyles[i] };
  });
}

function shouldStopAnimationAll(currentStyles, destStyles, currentVelocities, mergedPropsStyles) {
  if (mergedPropsStyles.length !== destStyles.length) {
    return false;
  }

  for (var i = 0; i < mergedPropsStyles.length; i++) {
    if (mergedPropsStyles[i].key !== destStyles[i].key) {
      return false;
    }
  }

  // we have the invariant that mergedPropsStyles and
  // currentStyles/currentVelocities/last* are synced in terms of cells, see
  // mergeAndSync comment for more info
  for (var i = 0; i < mergedPropsStyles.length; i++) {
    if (!_shouldStopAnimation2['default'](currentStyles[i], destStyles[i].style, currentVelocities[i])) {
      return false;
    }
  }

  return true;
}

// core key merging logic

// things to do: say previously merged style is {a, b}, dest style (prop) is {b,
// c}, previous current (interpolating) style is {a, b}
// **invariant**: current[i] corresponds to merged[i] in terms of key

// steps:
// turn merged style into {a?, b, c}
//    add c, value of c is destStyles.c
//    maybe remove a, aka call willLeave(a), then merged is either {b, c} or {a, b, c}
// turn current (interpolating) style from {a, b} into {a?, b, c}
//    maybe remove a
//    certainly add c, value of c is willEnter(c)
// loop over merged and construct new current
// dest doesn't change, that's owner's
function mergeAndSync(willEnter, willLeave, didLeave, oldMergedPropsStyles, destStyles, oldCurrentStyles, oldCurrentVelocities, oldLastIdealStyles, oldLastIdealVelocities) {
  var newMergedPropsStyles = _mergeDiff2['default'](oldMergedPropsStyles, destStyles, function (oldIndex, oldMergedPropsStyle) {
    var leavingStyle = willLeave(oldMergedPropsStyle);
    if (leavingStyle == null) {
      didLeave({ key: oldMergedPropsStyle.key, data: oldMergedPropsStyle.data });
      return null;
    }
    if (_shouldStopAnimation2['default'](oldCurrentStyles[oldIndex], leavingStyle, oldCurrentVelocities[oldIndex])) {
      didLeave({ key: oldMergedPropsStyle.key, data: oldMergedPropsStyle.data });
      return null;
    }
    return { key: oldMergedPropsStyle.key, data: oldMergedPropsStyle.data, style: leavingStyle };
  });

  var newCurrentStyles = [];
  var newCurrentVelocities = [];
  var newLastIdealStyles = [];
  var newLastIdealVelocities = [];
  for (var i = 0; i < newMergedPropsStyles.length; i++) {
    var newMergedPropsStyleCell = newMergedPropsStyles[i];
    var foundOldIndex = null;
    for (var j = 0; j < oldMergedPropsStyles.length; j++) {
      if (oldMergedPropsStyles[j].key === newMergedPropsStyleCell.key) {
        foundOldIndex = j;
        break;
      }
    }
    // TODO: key search code
    if (foundOldIndex == null) {
      var plainStyle = willEnter(newMergedPropsStyleCell);
      newCurrentStyles[i] = plainStyle;
      newLastIdealStyles[i] = plainStyle;

      var velocity = _mapToZero2['default'](newMergedPropsStyleCell.style);
      newCurrentVelocities[i] = velocity;
      newLastIdealVelocities[i] = velocity;
    } else {
      newCurrentStyles[i] = oldCurrentStyles[foundOldIndex];
      newLastIdealStyles[i] = oldLastIdealStyles[foundOldIndex];
      newCurrentVelocities[i] = oldCurrentVelocities[foundOldIndex];
      newLastIdealVelocities[i] = oldLastIdealVelocities[foundOldIndex];
    }
  }

  return [newMergedPropsStyles, newCurrentStyles, newCurrentVelocities, newLastIdealStyles, newLastIdealVelocities];
}

var TransitionMotion = (function (_React$Component) {
  _inherits(TransitionMotion, _React$Component);

  _createClass(TransitionMotion, null, [{
    key: 'propTypes',
    value: {
      defaultStyles: _propTypes2['default'].arrayOf(_propTypes2['default'].shape({
        key: _propTypes2['default'].string.isRequired,
        data: _propTypes2['default'].any,
        style: _propTypes2['default'].objectOf(_propTypes2['default'].number).isRequired
      })),
      styles: _propTypes2['default'].oneOfType([_propTypes2['default'].func, _propTypes2['default'].arrayOf(_propTypes2['default'].shape({
        key: _propTypes2['default'].string.isRequired,
        data: _propTypes2['default'].any,
        style: _propTypes2['default'].objectOf(_propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].object])).isRequired
      }))]).isRequired,
      children: _propTypes2['default'].func.isRequired,
      willEnter: _propTypes2['default'].func,
      willLeave: _propTypes2['default'].func,
      didLeave: _propTypes2['default'].func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      willEnter: function willEnter(styleThatEntered) {
        return _stripStyle2['default'](styleThatEntered.style);
      },
      // recall: returning null makes the current unmounting TransitionStyle
      // disappear immediately
      willLeave: function willLeave() {
        return null;
      },
      didLeave: function didLeave() {}
    },
    enumerable: true
  }]);

  function TransitionMotion(props) {
    var _this = this;

    _classCallCheck(this, TransitionMotion);

    _React$Component.call(this, props);
    this.unmounting = false;
    this.animationID = null;
    this.prevTime = 0;
    this.accumulatedTime = 0;
    this.unreadPropStyles = null;

    this.clearUnreadPropStyle = function (unreadPropStyles) {
      var _mergeAndSync = mergeAndSync(_this.props.willEnter, _this.props.willLeave, _this.props.didLeave, _this.state.mergedPropsStyles, unreadPropStyles, _this.state.currentStyles, _this.state.currentVelocities, _this.state.lastIdealStyles, _this.state.lastIdealVelocities);

      var mergedPropsStyles = _mergeAndSync[0];
      var currentStyles = _mergeAndSync[1];
      var currentVelocities = _mergeAndSync[2];
      var lastIdealStyles = _mergeAndSync[3];
      var lastIdealVelocities = _mergeAndSync[4];

      for (var i = 0; i < unreadPropStyles.length; i++) {
        var unreadPropStyle = unreadPropStyles[i].style;
        var dirty = false;

        for (var key in unreadPropStyle) {
          if (!Object.prototype.hasOwnProperty.call(unreadPropStyle, key)) {
            continue;
          }

          var styleValue = unreadPropStyle[key];
          if (typeof styleValue === 'number') {
            if (!dirty) {
              dirty = true;
              currentStyles[i] = _extends({}, currentStyles[i]);
              currentVelocities[i] = _extends({}, currentVelocities[i]);
              lastIdealStyles[i] = _extends({}, lastIdealStyles[i]);
              lastIdealVelocities[i] = _extends({}, lastIdealVelocities[i]);
              mergedPropsStyles[i] = {
                key: mergedPropsStyles[i].key,
                data: mergedPropsStyles[i].data,
                style: _extends({}, mergedPropsStyles[i].style)
              };
            }
            currentStyles[i][key] = styleValue;
            currentVelocities[i][key] = 0;
            lastIdealStyles[i][key] = styleValue;
            lastIdealVelocities[i][key] = 0;
            mergedPropsStyles[i].style[key] = styleValue;
          }
        }
      }

      // unlike the other 2 components, we can't detect staleness and optionally
      // opt out of setState here. each style object's data might contain new
      // stuff we're not/cannot compare
      _this.setState({
        currentStyles: currentStyles,
        currentVelocities: currentVelocities,
        mergedPropsStyles: mergedPropsStyles,
        lastIdealStyles: lastIdealStyles,
        lastIdealVelocities: lastIdealVelocities
      });
    };

    this.startAnimationIfNecessary = function () {
      if (_this.unmounting) {
        return;
      }

      // TODO: when config is {a: 10} and dest is {a: 10} do we raf once and
      // call cb? No, otherwise accidental parent rerender causes cb trigger
      _this.animationID = _raf2['default'](function (timestamp) {
        // https://github.com/chenglou/react-motion/pull/420
        // > if execution passes the conditional if (this.unmounting), then
        // executes async defaultRaf and after that component unmounts and after
        // that the callback of defaultRaf is called, then setState will be called
        // on unmounted component.
        if (_this.unmounting) {
          return;
        }

        var propStyles = _this.props.styles;
        var destStyles = typeof propStyles === 'function' ? propStyles(rehydrateStyles(_this.state.mergedPropsStyles, _this.unreadPropStyles, _this.state.lastIdealStyles)) : propStyles;

        // check if we need to animate in the first place
        if (shouldStopAnimationAll(_this.state.currentStyles, destStyles, _this.state.currentVelocities, _this.state.mergedPropsStyles)) {
          // no need to cancel animationID here; shouldn't have any in flight
          _this.animationID = null;
          _this.accumulatedTime = 0;
          return;
        }

        var currentTime = timestamp || _performanceNow2['default']();
        var timeDelta = currentTime - _this.prevTime;
        _this.prevTime = currentTime;
        _this.accumulatedTime = _this.accumulatedTime + timeDelta;
        // more than 10 frames? prolly switched browser tab. Restart
        if (_this.accumulatedTime > msPerFrame * 10) {
          _this.accumulatedTime = 0;
        }

        if (_this.accumulatedTime === 0) {
          // no need to cancel animationID here; shouldn't have any in flight
          _this.animationID = null;
          _this.startAnimationIfNecessary();
          return;
        }

        var currentFrameCompletion = (_this.accumulatedTime - Math.floor(_this.accumulatedTime / msPerFrame) * msPerFrame) / msPerFrame;
        var framesToCatchUp = Math.floor(_this.accumulatedTime / msPerFrame);

        var _mergeAndSync2 = mergeAndSync(_this.props.willEnter, _this.props.willLeave, _this.props.didLeave, _this.state.mergedPropsStyles, destStyles, _this.state.currentStyles, _this.state.currentVelocities, _this.state.lastIdealStyles, _this.state.lastIdealVelocities);

        var newMergedPropsStyles = _mergeAndSync2[0];
        var newCurrentStyles = _mergeAndSync2[1];
        var newCurrentVelocities = _mergeAndSync2[2];
        var newLastIdealStyles = _mergeAndSync2[3];
        var newLastIdealVelocities = _mergeAndSync2[4];

        for (var i = 0; i < newMergedPropsStyles.length; i++) {
          var newMergedPropsStyle = newMergedPropsStyles[i].style;
          var newCurrentStyle = {};
          var newCurrentVelocity = {};
          var newLastIdealStyle = {};
          var newLastIdealVelocity = {};

          for (var key in newMergedPropsStyle) {
            if (!Object.prototype.hasOwnProperty.call(newMergedPropsStyle, key)) {
              continue;
            }

            var styleValue = newMergedPropsStyle[key];
            if (typeof styleValue === 'number') {
              newCurrentStyle[key] = styleValue;
              newCurrentVelocity[key] = 0;
              newLastIdealStyle[key] = styleValue;
              newLastIdealVelocity[key] = 0;
            } else {
              var newLastIdealStyleValue = newLastIdealStyles[i][key];
              var newLastIdealVelocityValue = newLastIdealVelocities[i][key];
              for (var j = 0; j < framesToCatchUp; j++) {
                var _stepper = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);

                newLastIdealStyleValue = _stepper[0];
                newLastIdealVelocityValue = _stepper[1];
              }

              var _stepper2 = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);

              var nextIdealX = _stepper2[0];
              var nextIdealV = _stepper2[1];

              newCurrentStyle[key] = newLastIdealStyleValue + (nextIdealX - newLastIdealStyleValue) * currentFrameCompletion;
              newCurrentVelocity[key] = newLastIdealVelocityValue + (nextIdealV - newLastIdealVelocityValue) * currentFrameCompletion;
              newLastIdealStyle[key] = newLastIdealStyleValue;
              newLastIdealVelocity[key] = newLastIdealVelocityValue;
            }
          }

          newLastIdealStyles[i] = newLastIdealStyle;
          newLastIdealVelocities[i] = newLastIdealVelocity;
          newCurrentStyles[i] = newCurrentStyle;
          newCurrentVelocities[i] = newCurrentVelocity;
        }

        _this.animationID = null;
        // the amount we're looped over above
        _this.accumulatedTime -= framesToCatchUp * msPerFrame;

        _this.setState({
          currentStyles: newCurrentStyles,
          currentVelocities: newCurrentVelocities,
          lastIdealStyles: newLastIdealStyles,
          lastIdealVelocities: newLastIdealVelocities,
          mergedPropsStyles: newMergedPropsStyles
        });

        _this.unreadPropStyles = null;

        _this.startAnimationIfNecessary();
      });
    };

    this.state = this.defaultState();
  }

  TransitionMotion.prototype.defaultState = function defaultState() {
    var _props = this.props;
    var defaultStyles = _props.defaultStyles;
    var styles = _props.styles;
    var willEnter = _props.willEnter;
    var willLeave = _props.willLeave;
    var didLeave = _props.didLeave;

    var destStyles = typeof styles === 'function' ? styles(defaultStyles) : styles;

    // this is special. for the first time around, we don't have a comparison
    // between last (no last) and current merged props. we'll compute last so:
    // say default is {a, b} and styles (dest style) is {b, c}, we'll
    // fabricate last as {a, b}
    var oldMergedPropsStyles = undefined;
    if (defaultStyles == null) {
      oldMergedPropsStyles = destStyles;
    } else {
      oldMergedPropsStyles = defaultStyles.map(function (defaultStyleCell) {
        // TODO: key search code
        for (var i = 0; i < destStyles.length; i++) {
          if (destStyles[i].key === defaultStyleCell.key) {
            return destStyles[i];
          }
        }
        return defaultStyleCell;
      });
    }
    var oldCurrentStyles = defaultStyles == null ? destStyles.map(function (s) {
      return _stripStyle2['default'](s.style);
    }) : defaultStyles.map(function (s) {
      return _stripStyle2['default'](s.style);
    });
    var oldCurrentVelocities = defaultStyles == null ? destStyles.map(function (s) {
      return _mapToZero2['default'](s.style);
    }) : defaultStyles.map(function (s) {
      return _mapToZero2['default'](s.style);
    });

    var _mergeAndSync3 = mergeAndSync(
    // Because this is an old-style createReactClass component, Flow doesn't
    // understand that the willEnter and willLeave props have default values
    // and will always be present.
    willEnter, willLeave, didLeave, oldMergedPropsStyles, destStyles, oldCurrentStyles, oldCurrentVelocities, oldCurrentStyles, // oldLastIdealStyles really
    oldCurrentVelocities);

    var mergedPropsStyles = _mergeAndSync3[0];
    var currentStyles = _mergeAndSync3[1];
    var currentVelocities = _mergeAndSync3[2];
    var lastIdealStyles = _mergeAndSync3[3];
    var lastIdealVelocities = _mergeAndSync3[4];
    // oldLastIdealVelocities really

    return {
      currentStyles: currentStyles,
      currentVelocities: currentVelocities,
      lastIdealStyles: lastIdealStyles,
      lastIdealVelocities: lastIdealVelocities,
      mergedPropsStyles: mergedPropsStyles
    };
  };

  // after checking for unreadPropStyles != null, we manually go set the
  // non-interpolating values (those that are a number, without a spring
  // config)

  TransitionMotion.prototype.componentDidMount = function componentDidMount() {
    this.prevTime = _performanceNow2['default']();
    this.startAnimationIfNecessary();
  };

  TransitionMotion.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    if (this.unreadPropStyles) {
      // previous props haven't had the chance to be set yet; set them here
      this.clearUnreadPropStyle(this.unreadPropStyles);
    }

    var styles = props.styles;
    if (typeof styles === 'function') {
      this.unreadPropStyles = styles(rehydrateStyles(this.state.mergedPropsStyles, this.unreadPropStyles, this.state.lastIdealStyles));
    } else {
      this.unreadPropStyles = styles;
    }

    if (this.animationID == null) {
      this.prevTime = _performanceNow2['default']();
      this.startAnimationIfNecessary();
    }
  };

  TransitionMotion.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unmounting = true;
    if (this.animationID != null) {
      _raf2['default'].cancel(this.animationID);
      this.animationID = null;
    }
  };

  TransitionMotion.prototype.render = function render() {
    var hydratedStyles = rehydrateStyles(this.state.mergedPropsStyles, this.unreadPropStyles, this.state.currentStyles);
    var renderedChildren = this.props.children(hydratedStyles);
    return renderedChildren && _react2['default'].Children.only(renderedChildren);
  };

  return TransitionMotion;
})(_react2['default'].Component);

exports['default'] = TransitionMotion;
module.exports = exports['default'];

// list of styles, each containing interpolating values. Part of what's passed
// to children function. Notice that this is
// Array<ActualInterpolatingStyleObject>, without the wrapper that is {key: ...,
// data: ... style: ActualInterpolatingStyleObject}. Only mergedPropsStyles
// contains the key & data info (so that we only have a single source of truth
// for these, and to save space). Check the comment for `rehydrateStyles` to
// see how we regenerate the entirety of what's passed to children function

// the array that keeps track of currently rendered stuff! Including stuff
// that you've unmounted but that's still animating. This is where it lives

// it's possible that currentStyle's value is stale: if props is immediately
// changed from 0 to 400 to spring(0) again, the async currentStyle is still
// at 0 (didn't have time to tick and interpolate even once). If we naively
// compare currentStyle with destVal it'll be 0 === 0 (no animation, stop).
// In reality currentStyle should be 400

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// core keys merging algorithm. If previous render's keys are [a, b], and the
// next render's [c, b, d], what's the final merged keys and ordering?

// - c and a must both be before b
// - b before d
// - ordering between a and c ambiguous

// this reduces to merging two partially ordered lists (e.g. lists where not
// every item has a definite ordering, like comparing a and c above). For the
// ambiguous ordering we deterministically choose to place the next render's
// item after the previous'; so c after a

// this is called a topological sorting. Except the existing algorithms don't
// work well with js bc of the amount of allocation, and isn't optimized for our
// current use-case bc the runtime is linear in terms of edges (see wiki for
// meaning), which is huge when two lists have many common elements


exports.__esModule = true;
exports['default'] = mergeDiff;

function mergeDiff(prev, next, onRemove) {
  // bookkeeping for easier access of a key's index below. This is 2 allocations +
  // potentially triggering chrome hash map mode for objs (so it might be faster

  var prevKeyIndex = {};
  for (var i = 0; i < prev.length; i++) {
    prevKeyIndex[prev[i].key] = i;
  }
  var nextKeyIndex = {};
  for (var i = 0; i < next.length; i++) {
    nextKeyIndex[next[i].key] = i;
  }

  // first, an overly elaborate way of merging prev and next, eliminating
  // duplicates (in terms of keys). If there's dupe, keep the item in next).
  // This way of writing it saves allocations
  var ret = [];
  for (var i = 0; i < next.length; i++) {
    ret[i] = next[i];
  }
  for (var i = 0; i < prev.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(nextKeyIndex, prev[i].key)) {
      // this is called my TM's `mergeAndSync`, which calls willLeave. We don't
      // merge in keys that the user desires to kill
      var fill = onRemove(i, prev[i]);
      if (fill != null) {
        ret.push(fill);
      }
    }
  }

  // now all the items all present. Core sorting logic to have the right order
  return ret.sort(function (a, b) {
    var nextOrderA = nextKeyIndex[a.key];
    var nextOrderB = nextKeyIndex[b.key];
    var prevOrderA = prevKeyIndex[a.key];
    var prevOrderB = prevKeyIndex[b.key];

    if (nextOrderA != null && nextOrderB != null) {
      // both keys in next
      return nextKeyIndex[a.key] - nextKeyIndex[b.key];
    } else if (prevOrderA != null && prevOrderB != null) {
      // both keys in prev
      return prevKeyIndex[a.key] - prevKeyIndex[b.key];
    } else if (nextOrderA != null) {
      // key a in next, key b in prev

      // how to determine the order between a and b? We find a "pivot" (term
      // abuse), a key present in both prev and next, that is sandwiched between
      // a and b. In the context of our above example, if we're comparing a and
      // d, b's (the only) pivot
      for (var i = 0; i < next.length; i++) {
        var pivot = next[i].key;
        if (!Object.prototype.hasOwnProperty.call(prevKeyIndex, pivot)) {
          continue;
        }

        if (nextOrderA < nextKeyIndex[pivot] && prevOrderB > prevKeyIndex[pivot]) {
          return -1;
        } else if (nextOrderA > nextKeyIndex[pivot] && prevOrderB < prevKeyIndex[pivot]) {
          return 1;
        }
      }
      // pluggable. default to: next bigger than prev
      return 1;
    }
    // prevOrderA, nextOrderB
    for (var i = 0; i < next.length; i++) {
      var pivot = next[i].key;
      if (!Object.prototype.hasOwnProperty.call(prevKeyIndex, pivot)) {
        continue;
      }
      if (nextOrderB < nextKeyIndex[pivot] && prevOrderA > prevKeyIndex[pivot]) {
        return 1;
      } else if (nextOrderB > nextKeyIndex[pivot] && prevOrderA < prevKeyIndex[pivot]) {
        return -1;
      }
    }
    // pluggable. default to: next bigger than prev
    return -1;
  });
}

module.exports = exports['default'];
// to loop through and find a key's index each time), but I no longer care

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = spring;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _presets = __webpack_require__(135);

var _presets2 = _interopRequireDefault(_presets);

var defaultConfig = _extends({}, _presets2['default'].noWobble, {
  precision: 0.01
});

function spring(val, config) {
  return _extends({}, defaultConfig, config, { val: val });
}

module.exports = exports['default'];

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;
exports['default'] = reorderKeys;

var hasWarned = false;

function reorderKeys() {
  if (process.env.NODE_ENV === 'development') {
    if (!hasWarned) {
      hasWarned = true;
      console.error('`reorderKeys` has been removed, since it is no longer needed for TransitionMotion\'s new styles array API.');
    }
  }
}

module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dragHandle = __webpack_require__(284);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_dragHandle).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(9);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = __webpack_require__(13);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(16);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _DragHandle$contextTy;

var _react = __webpack_require__(0);

var _propTypes = __webpack_require__(5);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _memoizeOne = __webpack_require__(3);

var _memoizeOne2 = _interopRequireDefault(_memoizeOne);

var _contextKeys = __webpack_require__(20);

var _shouldAllowDraggingFromTarget = __webpack_require__(285);

var _shouldAllowDraggingFromTarget2 = _interopRequireDefault(_shouldAllowDraggingFromTarget);

var _createMouseSensor = __webpack_require__(286);

var _createMouseSensor2 = _interopRequireDefault(_createMouseSensor);

var _createKeyboardSensor = __webpack_require__(288);

var _createKeyboardSensor2 = _interopRequireDefault(_createKeyboardSensor);

var _createTouchSensor = __webpack_require__(289);

var _createTouchSensor2 = _interopRequireDefault(_createTouchSensor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFalse = function getFalse() {
  return false;
};

var DragHandle = function (_Component) {
  (0, _inherits3.default)(DragHandle, _Component);

  function DragHandle(props, context) {
    (0, _classCallCheck3.default)(this, DragHandle);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DragHandle.__proto__ || (0, _getPrototypeOf2.default)(DragHandle)).call(this, props, context));

    _this.onKeyDown = function (event) {
      if (_this.mouseSensor.isCapturing()) {
        return;
      }

      _this.keyboardSensor.onKeyDown(event, _this.props);
    };

    _this.onMouseDown = function (event) {
      if (_this.keyboardSensor.isCapturing() || _this.mouseSensor.isCapturing()) {
        return;
      }

      _this.mouseSensor.onMouseDown(event);
    };

    _this.onTouchStart = function (event) {
      if (_this.mouseSensor.isCapturing() || _this.keyboardSensor.isCapturing()) {
        console.error('mouse or keyboard already listening when attempting to touch drag');
        return;
      }

      _this.touchSensor.onTouchStart(event);
    };

    _this.onTouchMove = function (event) {
      _this.touchSensor.onTouchMove(event);
    };

    _this.onClick = function (event) {
      _this.mouseSensor.onClick(event);
      _this.touchSensor.onClick(event);
    };

    _this.canStartCapturing = function (event) {
      if (_this.isAnySensorCapturing()) {
        return false;
      }

      if (!_this.canLift(_this.props.draggableId)) {
        return false;
      }

      return (0, _shouldAllowDraggingFromTarget2.default)(event, _this.props);
    };

    _this.isAnySensorDragging = function () {
      return _this.sensors.some(function (sensor) {
        return sensor.isDragging();
      });
    };

    _this.isAnySensorCapturing = function () {
      return _this.sensors.some(function (sensor) {
        return sensor.isCapturing();
      });
    };

    _this.getProvided = (0, _memoizeOne2.default)(function (isEnabled, isDragging) {
      if (!isEnabled) {
        return null;
      }

      var provided = {
        onMouseDown: _this.onMouseDown,
        onKeyDown: _this.onKeyDown,
        onTouchStart: _this.onTouchStart,
        onTouchMove: _this.onTouchMove,
        onClick: _this.onClick,
        tabIndex: 0,
        'aria-grabbed': isDragging,
        'data-react-beautiful-dnd-drag-handle': _this.styleContext,
        draggable: false,
        onDragStart: getFalse,
        onDrop: getFalse
      };

      return provided;
    });


    var args = {
      callbacks: _this.props.callbacks,
      getDraggableRef: _this.props.getDraggableRef,
      canStartCapturing: _this.canStartCapturing
    };

    _this.mouseSensor = (0, _createMouseSensor2.default)(args);
    _this.keyboardSensor = (0, _createKeyboardSensor2.default)(args);
    _this.touchSensor = (0, _createTouchSensor2.default)(args);
    _this.sensors = [_this.mouseSensor, _this.keyboardSensor, _this.touchSensor];
    _this.styleContext = context[_contextKeys.styleContextKey];

    _this.canLift = context[_contextKeys.canLiftContextKey];
    return _this;
  }

  (0, _createClass3.default)(DragHandle, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this2 = this;

      this.sensors.forEach(function (sensor) {
        var wasCapturing = sensor.isCapturing();
        var wasDragging = sensor.isDragging();

        if (wasCapturing) {
          sensor.kill();
        }

        if (wasDragging) {
          _this2.props.callbacks.onCancel();
        }
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var isCapturing = this.isAnySensorCapturing();

      if (!isCapturing) {
        return;
      }

      var isDragStopping = this.props.isDragging && !nextProps.isDragging;

      if (isDragStopping) {
        this.sensors.forEach(function (sensor) {
          if (sensor.isCapturing()) {
            sensor.kill();
          }
        });
        return;
      }

      if (!nextProps.isEnabled) {
        this.sensors.forEach(function (sensor) {
          if (sensor.isCapturing()) {
            var wasDragging = sensor.isDragging();

            sensor.kill();

            if (wasDragging) {
              _this3.props.callbacks.onCancel();
            }
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          isEnabled = _props.isEnabled;


      return children(this.getProvided(isEnabled, this.isAnySensorDragging()));
    }
  }]);
  return DragHandle;
}(_react.Component);

DragHandle.contextTypes = (_DragHandle$contextTy = {}, (0, _defineProperty3.default)(_DragHandle$contextTy, _contextKeys.styleContextKey, _propTypes2.default.string.isRequired), (0, _defineProperty3.default)(_DragHandle$contextTy, _contextKeys.canLiftContextKey, _propTypes2.default.func.isRequired), _DragHandle$contextTy);
exports.default = DragHandle;

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var interactiveTagNames = exports.interactiveTagNames = ['input', 'button', 'textarea', 'select', 'option', 'optgroup', 'video', 'audio'];

var isContentEditable = function isContentEditable(parent, current) {
  if (current == null) {
    return false;
  }

  var attribute = current.getAttribute('contenteditable');
  if (attribute === 'true' || attribute === '') {
    return true;
  }

  if (current === parent) {
    return false;
  }

  return isContentEditable(parent, current.parentElement);
};

exports.default = function (event, props) {
  if (props.canDragInteractiveElements) {
    return true;
  }

  var target = event.target,
      currentTarget = event.currentTarget;

  if (!(target instanceof HTMLElement) || !(currentTarget instanceof HTMLElement)) {
    return true;
  }

  var isTargetInteractive = interactiveTagNames.indexOf(target.tagName.toLowerCase()) !== -1;

  if (isTargetInteractive) {
    return false;
  }

  return !isContentEditable(currentTarget, target);
};

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(18);

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = __webpack_require__(24);

var _extends3 = _interopRequireDefault(_extends2);

var _stopEvent = __webpack_require__(51);

var _stopEvent2 = _interopRequireDefault(_stopEvent);

var _createScheduler = __webpack_require__(85);

var _createScheduler2 = _interopRequireDefault(_createScheduler);

var _isSloppyClickThresholdExceeded = __webpack_require__(287);

var _isSloppyClickThresholdExceeded2 = _interopRequireDefault(_isSloppyClickThresholdExceeded);

var _getWindowFromRef = __webpack_require__(86);

var _getWindowFromRef2 = _interopRequireDefault(_getWindowFromRef);

var _keyCodes = __webpack_require__(87);

var keyCodes = _interopRequireWildcard(_keyCodes);

var _blockStandardKeyEvents = __webpack_require__(136);

var _blockStandardKeyEvents2 = _interopRequireDefault(_blockStandardKeyEvents);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var primaryButton = 0;
var noop = function noop() {};

exports.default = function (_ref) {
  var callbacks = _ref.callbacks,
      getDraggableRef = _ref.getDraggableRef,
      canStartCapturing = _ref.canStartCapturing;

  var state = {
    isDragging: false,
    pending: null,
    preventClick: false
  };
  var setState = function setState(partial) {
    var newState = (0, _extends3.default)({}, state, partial);
    state = newState;
  };
  var isDragging = function isDragging() {
    return state.isDragging;
  };
  var isCapturing = function isCapturing() {
    return Boolean(state.pending || state.isDragging);
  };
  var schedule = (0, _createScheduler2.default)(callbacks, isDragging);

  var startDragging = function startDragging() {
    var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

    setState({
      pending: null,
      isDragging: true,
      preventClick: true
    });
    fn();
  };
  var stopDragging = function stopDragging() {
    var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

    unbindWindowEvents();
    setState({
      isDragging: false,
      pending: null
    });
    fn();
  };
  var startPendingDrag = function startPendingDrag(point) {
    setState({ pending: point, isDragging: false });
    bindWindowEvents();
  };
  var stopPendingDrag = function stopPendingDrag() {
    setState({
      preventClick: false
    });
    stopDragging();
  };

  var kill = function kill() {
    var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

    if (state.pending) {
      stopPendingDrag();
      return;
    }
    stopDragging(fn);
  };

  var cancel = function cancel() {
    kill(callbacks.onCancel);
  };

  var windowBindings = {
    mousemove: function mousemove(event) {
      var button = event.button,
          clientX = event.clientX,
          clientY = event.clientY;

      if (button !== primaryButton) {
        return;
      }

      var point = {
        x: clientX,
        y: clientY
      };

      if (state.isDragging) {
        schedule.move(point);
        return;
      }

      if (!state.pending) {
        console.error('invalid state');
        return;
      }

      if (!(0, _isSloppyClickThresholdExceeded2.default)(state.pending, point)) {
        return;
      }

      startDragging(function () {
        return callbacks.onLift({ client: point, isScrollAllowed: true });
      });
    },
    mouseup: function mouseup() {
      if (state.pending) {
        stopPendingDrag();
        return;
      }

      stopDragging(callbacks.onDrop);
    },
    mousedown: function mousedown() {
      stopDragging(callbacks.onCancel);
    },
    keydown: function keydown(event) {
      if (event.keyCode === keyCodes.escape) {
        (0, _stopEvent2.default)(event);
        cancel();
        return;
      }

      (0, _blockStandardKeyEvents2.default)(event);
    },
    resize: cancel,
    scroll: function scroll() {
      if (state.pending) {
        stopPendingDrag();
        return;
      }
      schedule.windowScrollMove();
    },

    webkitmouseforcechanged: function webkitmouseforcechanged(event) {
      if (event.webkitForce == null || MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN == null) {
        console.error('handling a mouse force changed event when it is not supported');
        return;
      }

      var forcePressThreshold = MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN;
      var isForcePressing = event.webkitForce >= forcePressThreshold;

      if (isForcePressing) {
        cancel();
      }
    }
  };

  var eventKeys = (0, _keys2.default)(windowBindings);

  var bindWindowEvents = function bindWindowEvents() {
    var win = (0, _getWindowFromRef2.default)(getDraggableRef());

    eventKeys.forEach(function (eventKey) {
      if (eventKey === 'scroll') {
        win.addEventListener(eventKey, windowBindings.scroll, { passive: true });
        return;
      }

      win.addEventListener(eventKey, windowBindings[eventKey]);
    });
  };

  var unbindWindowEvents = function unbindWindowEvents() {
    var win = (0, _getWindowFromRef2.default)(getDraggableRef());

    eventKeys.forEach(function (eventKey) {
      return win.removeEventListener(eventKey, windowBindings[eventKey]);
    });
  };

  var onMouseDown = function onMouseDown(event) {
    if (!canStartCapturing(event)) {
      return;
    }

    if (isCapturing()) {
      console.error('should not be able to perform a mouse down while a drag or pending drag is occurring');
      cancel();
      return;
    }

    var button = event.button,
        clientX = event.clientX,
        clientY = event.clientY;

    if (button !== primaryButton) {
      return;
    }

    (0, _stopEvent2.default)(event);
    var point = {
      x: clientX,
      y: clientY
    };

    startPendingDrag(point);
  };

  var onClick = function onClick(event) {
    if (!state.preventClick) {
      return;
    }

    setState({
      preventClick: false
    });
    (0, _stopEvent2.default)(event);
  };

  var sensor = {
    onMouseDown: onMouseDown,
    onClick: onClick,
    kill: kill,
    isCapturing: isCapturing,
    isDragging: isDragging
  };

  return sensor;
};

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var sloppyClickThreshold = exports.sloppyClickThreshold = 5;

exports.default = function (original, current) {
  return Math.abs(current.x - original.x) >= sloppyClickThreshold || Math.abs(current.y - original.y) >= sloppyClickThreshold;
};

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(18);

var _keys2 = _interopRequireDefault(_keys);

var _stopEvent = __webpack_require__(51);

var _stopEvent2 = _interopRequireDefault(_stopEvent);

var _createScheduler = __webpack_require__(85);

var _createScheduler2 = _interopRequireDefault(_createScheduler);

var _blockStandardKeyEvents = __webpack_require__(136);

var _blockStandardKeyEvents2 = _interopRequireDefault(_blockStandardKeyEvents);

var _keyCodes = __webpack_require__(87);

var keyCodes = _interopRequireWildcard(_keyCodes);

var _getWindowFromRef = __webpack_require__(86);

var _getWindowFromRef2 = _interopRequireDefault(_getWindowFromRef);

var _getCenterPosition = __webpack_require__(137);

var _getCenterPosition2 = _interopRequireDefault(_getCenterPosition);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noop = function noop() {};

exports.default = function (_ref) {
  var callbacks = _ref.callbacks,
      getDraggableRef = _ref.getDraggableRef,
      canStartCapturing = _ref.canStartCapturing;

  var state = {
    isDragging: false
  };
  var setState = function setState(newState) {
    state = newState;
  };
  var startDragging = function startDragging() {
    var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

    setState({
      isDragging: true
    });
    bindWindowEvents();
    fn();
  };
  var stopDragging = function stopDragging() {
    var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

    unbindWindowEvents();
    setState({
      isDragging: false
    });
    fn();
  };
  var kill = function kill() {
    return stopDragging();
  };
  var cancel = function cancel() {
    stopDragging(callbacks.onCancel);
  };
  var isDragging = function isDragging() {
    return state.isDragging;
  };
  var schedule = (0, _createScheduler2.default)(callbacks, isDragging);

  var onKeyDown = function onKeyDown(event, props) {
    var direction = props.direction;

    if (!isDragging()) {
      if (!canStartCapturing(event)) {
        return;
      }

      if (event.keyCode !== keyCodes.space) {
        return;
      }

      (0, _stopEvent2.default)(event);

      var ref = getDraggableRef();

      if (!ref) {
        console.error('cannot start a keyboard drag without a draggable ref');
        return;
      }

      var center = (0, _getCenterPosition2.default)(ref);

      startDragging(function () {
        return callbacks.onLift({ client: center, isScrollAllowed: false });
      });
      return;
    }

    if (event.keyCode === keyCodes.escape) {
      (0, _stopEvent2.default)(event);
      cancel();
      return;
    }

    if (event.keyCode === keyCodes.space) {
      (0, _stopEvent2.default)(event);
      stopDragging(callbacks.onDrop);
      return;
    }

    if (!direction) {
      console.error('Cannot handle keyboard movement event if direction is not provided');
      (0, _stopEvent2.default)(event);
      cancel();
      return;
    }

    var executeBasedOnDirection = function executeBasedOnDirection(fns) {
      if (direction === 'vertical') {
        fns.vertical();
        return;
      }
      fns.horizontal();
    };

    if (event.keyCode === keyCodes.arrowDown) {
      (0, _stopEvent2.default)(event);
      executeBasedOnDirection({
        vertical: schedule.moveForward,
        horizontal: schedule.crossAxisMoveForward
      });
      return;
    }

    if (event.keyCode === keyCodes.arrowUp) {
      (0, _stopEvent2.default)(event);
      executeBasedOnDirection({
        vertical: schedule.moveBackward,
        horizontal: schedule.crossAxisMoveBackward
      });
      return;
    }

    if (event.keyCode === keyCodes.arrowRight) {
      (0, _stopEvent2.default)(event);
      executeBasedOnDirection({
        vertical: schedule.crossAxisMoveForward,
        horizontal: schedule.moveForward
      });
      return;
    }

    if (event.keyCode === keyCodes.arrowLeft) {
      (0, _stopEvent2.default)(event);
      executeBasedOnDirection({
        vertical: schedule.crossAxisMoveBackward,
        horizontal: schedule.moveBackward
      });
    }

    (0, _blockStandardKeyEvents2.default)(event);
  };

  var windowBindings = {
    mousedown: cancel,
    resize: cancel,

    scroll: cancel
  };

  var eventKeys = (0, _keys2.default)(windowBindings);

  var bindWindowEvents = function bindWindowEvents() {
    var win = (0, _getWindowFromRef2.default)(getDraggableRef());

    eventKeys.forEach(function (eventKey) {
      win.addEventListener(eventKey, windowBindings[eventKey]);
    });
  };

  var unbindWindowEvents = function unbindWindowEvents() {
    var win = (0, _getWindowFromRef2.default)(getDraggableRef());

    eventKeys.forEach(function (eventKey) {
      win.removeEventListener(eventKey, windowBindings[eventKey]);
    });
  };

  var sensor = {
    onKeyDown: onKeyDown,
    kill: kill,
    isDragging: isDragging,

    isCapturing: isDragging
  };

  return sensor;
};

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forcePressThreshold = exports.timeForLongPress = undefined;

var _keys = __webpack_require__(18);

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = __webpack_require__(24);

var _extends3 = _interopRequireDefault(_extends2);

var _stopEvent = __webpack_require__(51);

var _stopEvent2 = _interopRequireDefault(_stopEvent);

var _createScheduler = __webpack_require__(85);

var _createScheduler2 = _interopRequireDefault(_createScheduler);

var _getWindowFromRef = __webpack_require__(86);

var _getWindowFromRef2 = _interopRequireDefault(_getWindowFromRef);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timeForLongPress = exports.timeForLongPress = 150;
var forcePressThreshold = exports.forcePressThreshold = 0.15;

var noop = function noop() {};

var initial = {
  isDragging: false,
  pending: null,
  hasMoved: false,
  preventClick: false,
  longPressTimerId: null
};

exports.default = function (_ref) {
  var callbacks = _ref.callbacks,
      getDraggableRef = _ref.getDraggableRef,
      canStartCapturing = _ref.canStartCapturing;

  var state = initial;

  var setState = function setState(partial) {
    state = (0, _extends3.default)({}, state, partial);
  };
  var isDragging = function isDragging() {
    return state.isDragging;
  };
  var isCapturing = function isCapturing() {
    return Boolean(state.pending || state.isDragging || state.longPressTimerId);
  };
  var schedule = (0, _createScheduler2.default)(callbacks, isDragging);

  var startDragging = function startDragging() {
    var pending = state.pending;

    if (!pending) {
      console.error('cannot start a touch drag without a pending position');
      kill();
      return;
    }

    setState({
      isDragging: true,

      hasMoved: false,

      pending: null,
      longPressTimerId: null
    });

    callbacks.onLift({
      client: pending,

      isScrollAllowed: false
    });
  };
  var stopDragging = function stopDragging() {
    var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

    unbindWindowEvents();
    setState((0, _extends3.default)({}, initial, {
      preventClick: true
    }));
    fn();
  };

  var startPendingDrag = function startPendingDrag(event) {
    var touch = event.touches[0];
    var clientX = touch.clientX,
        clientY = touch.clientY;

    var point = {
      x: clientX,
      y: clientY
    };

    var longPressTimerId = setTimeout(startDragging, timeForLongPress);

    setState({
      longPressTimerId: longPressTimerId,
      pending: point,
      isDragging: false,
      hasMoved: false
    });
    bindWindowEvents();
  };

  var stopPendingDrag = function stopPendingDrag() {
    clearTimeout(state.longPressTimerId);
    unbindWindowEvents();

    setState(initial);
  };

  var kill = function kill() {
    var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

    if (state.pending) {
      stopPendingDrag();
      return;
    }
    stopDragging(fn);
  };

  var cancel = function cancel() {
    kill(callbacks.onCancel);
  };

  var windowBindings = {
    touchmove: function touchmove(event) {
      if (state.pending) {
        stopPendingDrag();
        return;
      }

      if (!state.hasMoved) {
        setState({
          hasMoved: true
        });
      }

      (0, _stopEvent2.default)(event);

      var _event$touches$ = event.touches[0],
          clientX = _event$touches$.clientX,
          clientY = _event$touches$.clientY;


      var point = {
        x: clientX,
        y: clientY
      };

      schedule.move(point);
    },
    touchend: function touchend(event) {
      if (state.pending) {
        stopPendingDrag();

        return;
      }

      stopDragging(callbacks.onDrop);
      (0, _stopEvent2.default)(event);
    },
    touchcancel: cancel,
    touchstart: function touchstart() {
      if (isDragging()) {
        console.error('touch start fired while already dragging');
        cancel();
      }
    },

    orientationchange: cancel,

    resize: cancel,

    scroll: cancel,

    contextmenu: _stopEvent2.default,

    keydown: cancel,

    touchforcechange: function touchforcechange(event) {
      if (state.hasMoved) {
        return;
      }

      var touch = event.touches[0];

      if (touch.force >= forcePressThreshold) {
        cancel();
      }
    }
  };

  var eventKeys = (0, _keys2.default)(windowBindings);

  var bindWindowEvents = function bindWindowEvents() {
    var win = (0, _getWindowFromRef2.default)(getDraggableRef());

    eventKeys.forEach(function (eventKey) {
      var fn = windowBindings[eventKey];

      if (eventKey === 'touchmove') {
        win.addEventListener(eventKey, fn, { passive: false });
        return;
      }

      win.addEventListener(eventKey, fn);
    });
  };

  var unbindWindowEvents = function unbindWindowEvents() {
    var win = (0, _getWindowFromRef2.default)(getDraggableRef());

    eventKeys.forEach(function (eventKey) {
      return win.removeEventListener(eventKey, windowBindings[eventKey]);
    });
  };

  var onTouchStart = function onTouchStart(event) {
    if (!canStartCapturing(event)) {
      return;
    }

    if (isCapturing()) {
      console.error('should not be able to perform a touch start while a drag or pending drag is occurring');
      cancel();
      return;
    }

    event.stopPropagation();

    startPendingDrag(event);
  };

  var onTouchMove = function onTouchMove() {
    if (state.pending) {
      stopPendingDrag();
    }
  };

  var onClick = function onClick(event) {
    if (!state.preventClick) {
      return;
    }

    (0, _stopEvent2.default)(event);
    setState(initial);
  };

  var sensor = {
    onTouchStart: onTouchStart,
    onTouchMove: onTouchMove,
    onClick: onClick,
    kill: kill,
    isCapturing: isCapturing,
    isDragging: isDragging
  };

  return sensor;
};

/***/ }),
/* 290 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/


class FinsembleMenuSectionLabel extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			"div",
			{ className: "menu-section-label" },
			this.props.children
		);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FinsembleMenuSectionLabel;


/***/ }),
/* 291 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FinsembleMenu_FinsembleMenu__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FinsembleMenuItem_FinsembleMenuItem__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FinsembleMenuSection_FinsembleMenuSection__ = __webpack_require__(103);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/





class FinsembleOverflowMenu extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
	constructor(props) {
		// Build a store for overflow
		super(props);
		var self = this;
		self.state = {
			buttons: []
		};
		this.onStateChange = props.onStateChange || function noop() {};
		this.buttonChangeListener = this.buttonChangeListener.bind(this);
		this.clickChannelListener = this.clickChannelListener.bind(this);
		this.pinListListener = this.pinListListener.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
		this.onClick = this.onClick.bind(this);
	}
	/**
  * A message has been sent from the toolbar section that spawned the menu. This happens when the pins that need to be rendered in the list are updated (add/remove/reorder(possibly)).
  * @param {*} err
  * @param {*} response
  */
	buttonChangeListener(err, response) {
		if (response.value) {
			this.setState({ buttons: response.value }, self.onStateChange);
		}
	}
	/**
  * Happens when we have a new toolbar takes ownership of the menu. The 'clickChannel' is the place where we send click events and pin reorders to.
  * @param {*} err
  * @param {*} response
  */
	clickChannelListener(err, response) {
		if (response.value) {
			this.setState({ clickChannel: response.value }, self.onStateChange);
		}
	}
	/**
  * Listens in the toolbar store for changes to pins.
  * We use this to calculate the offset when reordering the overflow menu.
  * @param {*} err
  * @param {*} response
  */
	pinListListener(err, response) {
		if (response.value) {
			this.setState({ pins: response.value }, self.onStateChange);
		}
	}

	/**
  * Fired when the user finishes draggin an item in the overflow menu
  * @param {*} changeEvent
  */
	onDragEnd(changeEvent) {
		//Happens when the user drops outside of the dom, or doesn't move the item
		if (!changeEvent.destination) return;
		//This block handles local state. We reorder locally, then calculate the offset for the main list of pins. After that, we broadcast it so back to the toolbarSection that spawned the overflow menu. It dispatches the change to all toolbars.
		let buttons = this.state.buttons;
		let newButtons = JSON.parse(JSON.stringify(buttons));
		let target = newButtons[changeEvent.source.index];
		let offset = this.state.pins.length - this.state.buttons.length;

		newButtons.splice(changeEvent.source.index, 1);
		newButtons.splice(changeEvent.destination.index, 0, target);
		//Remove empty buttons (just in case)
		//Reset the indices.
		newButtons = newButtons.filter(btn => btn).map((btn, i) => {
			btn.index = i + offset;
			btn.item.index = i + offset;
			return btn;
		});
		//Change the offset so that when the toolbar receives the changeEvent, it doesn't try swapping the first or second pin (index 0 or 1).
		changeEvent.source.index += offset;
		changeEvent.destination.index += offset;

		//Set state locally so that the list doesn't jitter.
		this.setState({ buttons: newButtons });
		//Sends a message to the toolbar section; it dispatches an event on the toolbar store so that all toolbars update.
		FSBL.Clients.RouterClient.transmit(this.state.clickChannel, { changeEvent: changeEvent });
	}
	// This onClick applies to the FinsembleMenuItemLabel inside the FinsembleMenuItem.
	onClick(e, buttonIndex) {
		//The props of the MenuItem itself are passed to the Label as menuItemProps.
		FSBL.Clients.RouterClient.transmit(this.state.clickChannel, { index: buttonIndex });
	}

	componentWillMount() {
		var self = this;
		FSBL.Clients.DistributedStoreClient.createStore({ store: this.props.overflowMenuStore, global: true }, function (err, store) {
			self.setState({ store: store });
			store.getValue('buttons', function (err, response) {});
			store.addListener({ field: 'pins' }, self.pinListListener);
			store.addListener({ field: 'buttons' }, self.buttonChangeListener);
			store.addListener({ field: 'clickChannel' }, self.clickChannelListener);
		});
	}

	componentDidUpdate() {
		FSBL.Clients.WindowClient.fitToDOM();
	}

	componentWillUnmount() {
		this.state.store.removeListener({ field: 'buttons' }, this.buttonChangeListener);
		this.state.store.removeListener({ field: 'clickChannel' }, this.clickChannelListener);
	}

	render() {
		if (!this.state.buttons || !this.state.buttons.length) return null;
		var self = this;

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			__WEBPACK_IMPORTED_MODULE_1__FinsembleMenu_FinsembleMenu__["a" /* default */],
			this.props,
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				__WEBPACK_IMPORTED_MODULE_3__FinsembleMenuSection_FinsembleMenuSection__["a" /* default */],
				_extends({ onDragEnd: this.onDragEnd }, this.props, { className: 'menu-primary' }),
				this.state.buttons.map(button => {
					return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__FinsembleMenuItem_FinsembleMenuItem__["a" /* default */], _extends({ clickChannel: self.state.clickChannel }, button.item, { key: button.index, clickIndex: button.index, onClick: e => self.onClick(e, button.index) }));
				})
			)
		);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FinsembleOverflowMenu;


/***/ }),
/* 292 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FinsembleDnDContext_FinsembleDnDContext__ = __webpack_require__(89);
/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/

/**
 * FinsembleToolbar
 * This is a container for toolbar sections
 */


const TOOLBAR_BASE_CLASS = 'finsemble-toolbar';

class FinsembleToolbar extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
	constructor(props) {
		console.log('RENDERING SOON');

		super(props);
		this.props = props;
		this.onDragEnd = this.props.onDragEnd ? this.props.onDragEnd : () => {};
		this.onDragStart = this.props.onDragStart ? this.props.onDragStart : () => {};
	}

	render() {
		let classes = this.props.className || '';
		classes += ` ${TOOLBAR_BASE_CLASS}`;

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			__WEBPACK_IMPORTED_MODULE_1__FinsembleDnDContext_FinsembleDnDContext__["a" /* default */],
			{ onDragEnd: this.onDragEnd, onDragStart: this.onDragStart },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: classes },
				this.props.children
			)
		);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FinsembleToolbar;


/***/ }),
/* 293 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FinsembleDraggable_FinsembleDraggable__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FinsembleDroppable_FinsembleDroppable__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FinsembleButton_FinsembleButton__ = __webpack_require__(25);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/

/**
 * The FinsembleToolbarSection control shows bunch of toolbar buttons or other custom React components. It optionally handles overflow if the contents do not fit.
 *
 * How overflow render works:
 *  Initial Load: Render everything -> componentDidUpdate() fires -> calculate overflow -> If needed rerender
 *  On Update: (toolbarStateChanged) -> set minOverflowIndex to something big so component rerenders -> componentDidUpdate() fires -> calculate overflow -> If needed rerender
 *
 * How overflow is handled
 *  The Overflow handling component will receive a list of buttons that overflowed.
 *  It needs to render those buttons and when clicked, transmit the index of the clicked item back to the toolbar on the clickChannel
 *
 */





const SECTION_BASE_CLASS = 'finsemble-toolbar-section';
const DEFAULT_MINIMUM_OVERFLOW = 10000000;
// Put the thing into the DOM!
class FinsembleToolbarSection extends __WEBPACK_IMPORTED_MODULE_2_react___default.a.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			overflow: [],
			pins: [],
			clickChannel: this.props.clickChannel || FSBL.Clients.WindowClient.windowName + '-overflow-clickChannel'
		};

		this.reorderPins = this.reorderPins.bind(this);
		this.processPins = this.processPins.bind(this);
		this.handleResize = this.handleResize.bind(this);
		this.onDragStart = this.onDragStart.bind(this);
		this.onDrag = this.onDrag.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
		this.groupMaskShown = this.groupMaskShown.bind(this);
		this.groupMaskHidden = this.groupMaskHidden.bind(this);
		this.configCache = {};
		finsembleWindow.getBounds((err, bounds) => {
			this.windowBounds = bounds;
		});
	}

	/**
  *
  * Processes pin changes on the global toolbar store. This happens when a pin is added or removed to any toolbar. It also happens when a pin is reordered from the toolbar or the overflow menu.
  *
  * @param {*} err
  * @param {*} data
  */
	processPins(err, data) {
		if (!data.value) {
			return;
		}
		//Pins are saved to storage and rendered as an array. When we persist to the distributed store, we convert the pins to an object because right now we cannot save arrays properly.
		function pinsToArray(obj) {
			let arr = [];
			for (let i in obj) {
				let pin = obj[i];
				if (!pin) continue;
				if (typeof pin.index === 'undefined') {
					pin.index = Object.keys(obj).length;
				}
				arr[pin.index] = pin;
			}
			return arr.filter(el => el !== null);
		}
		function pinsToObj(arr) {
			let obj = {};
			arr.forEach((el, i) => {
				if (el) {
					let key = el.label;
					obj[key] = el;
					obj[key].index = i;
				}
			});
			return obj;
		}
		let storedPins = this.state.pins,
		    incomingPins = data.value,
		    pinsChanged = false;
		//If we get an object, convert it to an array.
		if (!Array.isArray(data.value)) {
			incomingPins = pinsToArray(data.value);
		}
		//Just lets us know if any of them have changed.
		let orderChanged = incomingPins.some((pin, index) => {
			let storedPin = storedPins[index],
			    incomingPin = incomingPins[index];
			if (storedPin && incomingPin) {
				return storedPins[index].label !== incomingPins[index].label;
			}
			return true;
		});

		//Either a pin was added or removed.
		if (incomingPins.length !== storedPins.length) {
			pinsChanged = true;
		} else if (orderChanged) {
			pinsChanged = true;
		}
		// If pins have changed, rerender
		if (pinsChanged || this.initialLoad) {
			let pinObj = pinsToObj(incomingPins);
			this.setState({ pins: incomingPins, minOverflowIndex: 1000000 });
			FSBL.Clients.StorageClient.save({ topic: 'finsemble', key: 'toolbarPins', value: incomingPins });
			this.state.pinStore.setValue({ field: 'pins', value: pinObj });
			this.initialLoad = false;
		}
	}

	/**
  * Spawn a menu
  *
  */
	spawnMenu(menu) {
		let windowName = menu.menuType + (menu.label ? menu.label : menu.tooltip);
		const COMPONENT_UPDATE_CHANNEL = `${windowName}.ComponentsToRender`;
		FSBL.Clients.LauncherClient.showWindow({
			windowName: windowName,
			componentType: menu.menuType
		}, { spawnIfNotFound: true }, function (err, response) {
			FSBL.Clients.RouterClient.publish(COMPONENT_UPDATE_CHANNEL, menu.customData);
		});
	}

	/**
  * When the window resizes, we set the overflow index huge so we recalculate the overflow.
  * @param {*} e
  */
	handleResize(e) {
		this.setState({ minOverflowIndex: DEFAULT_MINIMUM_OVERFLOW, overflow: [] });
	}

	/**
     * Trigger a click on the proper item. index + 1 because overflow menu launching component is added.
     *
     * @param {number} index
     * @memberof FinsembleToolbarSection
     */
	triggerClick(index, element) {
		function getToolbarButton(el) {
			if (el.children) {
				for (let i = 0; i < el.children.length; i++) {
					let child = el.children[i];
					if (child.children[0].className.includes('finsemble-toolbar-button')) {
						return child.children[0];
					} else {
						return getToolbarButton(child);
					}
				}
			}
			return null;
		}
		if (!element) element = this.element.children[index + 1];
		let toolbarButton = getToolbarButton(element);
		if (toolbarButton) {
			toolbarButton.click();
		} else {
			console.warn(`Could not find button to click for index: ${index}`);
		}
	}

	/**
     * Do we have an overflow? Assumes 40 as the size of the overflow component -> TODO: make this dynamic.
     *
     * @returns
     * @memberof FinsembleToolbarSection
     */
	hasOverflow() {
		var e = this.element;
		if (e === null || e.offsetWidth === 0) return false;
		return e.offsetWidth < e.scrollWidth - 40;
	}

	/**
     * This is used on clicking the overflow component. It adds the communication channel for clicks and the overflowing items to the overflowMenuStore.
     * beforeClick (see FinsembleButton) is used because this needs to happen before the default click action.
     *
     * @param {any} e
     * @param {any} self
     * @memberof FinsembleToolbarSection
     */
	saveButtonsToOverflowStore(e, self) {
		self.state.overflowStore.setValue({ field: 'clickChannel', value: self.state.clickChannel });
		function makeButtonsSafeForRouter(overflow) {
			return overflow.map(el => {
				delete el.item.children;
				return el;
			});
		}
		let buttons = makeButtonsSafeForRouter(self.state.overflow);
		//Before we set the buttons, set the pins in the overflow store. This way, if the user tries to
		//reorder their list of buttons, they can calculate the offset and send back a proper changeEvent.
		//By default, the 1st index will be 0 in the overflow menu, but that pin may be 10th in the list of pins. This block
		//allows reordering in the overflow menu to work properly.
		self.state.overflowStore.setValue({ field: 'pins', value: self.state.pins }, () => {
			self.state.overflowStore.setValue({
				field: 'buttons',
				value: buttons
			});
		});
	}

	/**
  * When the overflow menu or toolbar section reorders items, we send an event off to the global toolbar store, which reorders the pins. Then it sets the value on the global store, which we receive, and rerender.
  * @param {*} changeEvent
  */
	reorderPins(changeEvent) {
		this.state.pinStore.Dispatcher.dispatch({ actionType: 'reorderPins', changeEvent: changeEvent });
	}

	/**
     * Here if we have overflow, force a rerender by setting the state. state.overflow = overflowing items. state.minOverflowIndex = where overflow starts, i.e. hide items starting there
     *
     * @returns
     * @memberof FinsembleToolbarSection
     */
	componentDidUpdate() {
		if (!this.props.handleOverflow) return;
		var self = this;
		function getComponentProps(cmp) {
			//if the component has children, we want the properties of the child..if not, we want the component's properties. the overflow menu needs those.
			//@todo, do this better. give the cmp a unique id that we can grab from props or props.children...just traverse the tree until we find it.
			if (cmp.props.children) {
				return cmp.props.children.props;
			}
			return cmp.props;
		}
		if (self.hasOverflow()) {
			var e = self.element;
			var right = e.offsetLeft + e.offsetWidth - 40;
			var overflow = [];
			var minOverflowIndex = DEFAULT_MINIMUM_OVERFLOW;
			for (var i = 0; i < e.children.length; i++) {
				var item = e.children[i];
				if (minOverflowIndex === DEFAULT_MINIMUM_OVERFLOW && item.offsetLeft + item.offsetWidth > right) {
					minOverflowIndex = i;
				}
				if (i >= minOverflowIndex) {
					overflow.push({ item: getComponentProps(self.children[i]), index: i });
				}
			}

			if (overflow.length === self.state.overflow.length && self.state.minOverflowIndex === minOverflowIndex) return;

			self.setState({
				overflow: overflow,
				minOverflowIndex: overflow[0] ? overflow[0].index : minOverflowIndex
			});
		}
	}

	mouseInWindow(mp) {
		if (mp.x >= this.windowBounds.left && mp.x <= this.windowBounds.right && mp.y >= this.windowBounds.top && mp.y <= this.windowBounds.bottom) {
			console.log('mouse is in window');
			return true;
		}
		console.log('mouse is in not window');
		return false;
	}

	startMouseTracking(component) {
		finsembleWindow.getBounds((err, bounds) => {
			this.windowBounds = bounds;
		});
		FSBL.System.getMousePosition((err, mp) => {
			mp.height = this.configCache[component].height;
			mp.width = this.configCache[component].width;
			if (this.dragging) {
				let mouseInWindow = this.mouseInWindow(mp);
				if (!this.dragScrimVisible && !this.groupMaskVisible && !mouseInWindow) {
					this.props.dragScrim.show();
					this.dragScrimVisible = true;
				} else if (this.dragScrimVisible && (this.groupMaskVisible || mouseInWindow)) {
					this.props.dragScrim.hide();
					this.dragScrimVisible = false;
				}
				if (this.dragScrimVisible) {
					this.props.dragScrim.setBounds(mp);
				}

				setTimeout(() => {
					this.startMouseTracking(component);
				}, 10);
			} else {
				this.props.dragScrim.hide();
				this.dragScrimVisible = false;
				if (this.props.groupMask) {
					this.props.groupMask.removeEventListener('shown', this.groupMaskShown);
					this.props.groupMask.removeEventListener('hidden', this.groupMaskHidden);
				}
			}
		});
	}

	groupMaskShown() {
		this.groupMaskVisible = true;
	}

	groupMaskHidden() {
		this.groupMaskVisible = false;
	}

	onDragStart(e, pin) {
		if (this.dragging) return; //prevent bad situations from unspawned windows
		this.dragging = true;
		if (pin.type == 'componentLauncher' && FSBL.Clients.WindowClient.startTilingOrTabbing) {
			this.draggedGuid = Date.now() + '_' + Math.random();
			this.tiling = { state: 'started', pin: pin };
			console.log('start tiling on drag start');
			let data = Object.assign({ waitForIdentifier: true, componentType: pin.component, guid: this.draggedGuid }, pin);
			FSBL.Clients.WindowClient.startTilingOrTabbing({ waitForIdentifier: true, componentType: pin.component });
			e.dataTransfer.setData('text/plain', JSON.stringify(data));
		} else {
			e.dataTransfer.setData('text/plain', JSON.stringify(pin));
		}

		console.log('dragstart', pin);
	}

	onDragOver(e, pin) {
		/*if (this.tiling && this.tiling.state != "paused") {
  	console.log("pause tiling on drag over");
  	FSBL.Clients.WindowClient.cancelTilingOrTabbing();
  	this.tiling.state = "paused";
  }*/
		e.preventDefault();
	}

	onMouseLeave(e) {
		/*if (this.tiling && this.tiling.state == "paused") {
  	console.log("start tiling on mouse leave");
  	if (FSBL.Clients.WindowClient.startTilingOrTabbing) FSBL.Clients.WindowClient.startTilingOrTabbing({ waitForIdentifier: true, componentType: this.tiling.pin.component });
  	this.tiling.state = "started";
  }*/
	}

	onDrag(e, pin) {
		//console.log('drag', pin, e.screenX, e.screenY );
	}

	onDragEnd(e, pin) {
		//If no drop happened, then we need to spawn component if required
		if (this.dragging) {
			if (pin.type == 'componentLauncher' && this.tiling) {
				let spawnParams = Object.assign({}, pin.params);
				spawnParams.top = e.screenY;
				spawnParams.left = e.screenX;
				spawnParams.position = 'virtual';
				if (!spawnParams.options) spawnParams.options = {};
				spawnParams.options.autoShow = false;
				delete spawnParams.monitor;
				FSBL.Clients.LauncherClient.spawn(pin.component, spawnParams, (err, response) => {
					if (FSBL.Clients.WindowClient.sendIdentifierForTilingOrTabbing) FSBL.Clients.WindowClient.sendIdentifierForTilingOrTabbing({ windowIdentifier: response.windowIdentifier });
					console.log('send identifier for tiling/tabbing');
					FSBL.Clients.RouterClient.publish('Finsemble.' + this.draggedGuid, response.windowIdentifier);
					this.dragging = false;
				});
				console.log('stop tiling on drag end');
				if (FSBL.Clients.WindowClient.stopTilingOrTabbing) FSBL.Clients.WindowClient.stopTilingOrTabbing();
				this.tiling = null;
			}
		}
		console.log('dragend', pin);
	}

	onDrop(e, pin) {
		if (pin.type == 'componentLauncher' && this.tiling) {
			this.tiling = null;
			console.log('cancel tiling on drop');
			if (FSBL.Clients.WindowClient.cancelTilingOrTabbing) FSBL.Clients.WindowClient.cancelTilingOrTabbing();
		}
		let sourcePinData = JSON.parse(e.dataTransfer.getData('text/plain'));
		let pins = [];
		for (var i = 0; i < this.state.pins.length; i++) {
			pins[i] = this.state.pins[i];
		}

		// remove pin
		let sourcePin = pins.splice(sourcePinData.index, 1)[0];
		console.log('drop', pin, sourcePin);

		// reinsert in proper position
		pins.splice(pin.index, 0, sourcePin);

		// reset all the indexes after reorder
		for (var i = 0; i < pins.length; i++) {
			pins[i].index = i;
		}

		this.processPins(null, { value: pins });
		//this.pinStore.setValue({ field: 'pins', value: pins });

		this.dragging = false;
	}

	/**
  * A convenience function to keep the render function semi-readable.
  * This iterates through each pin and figures out what kind of component it is. If the section is arrangeable, it renders finsembleDraggables.
  */
	renderpins() {
		if (!this.state.pins) {
			return [];
		}
		var components = [];
		for (let i = 0; i < this.state.pins.length; i++) {
			let pin = this.state.pins[i];
			if (!pin) continue;
			let Component = this.props.pinnableItems[pin.type];
			let cmp;

			switch (pin.type) {
				case 'componentLauncher':
					cmp = __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(Component, _extends({ key: i, iconClasses: 'pinned-icon', buttonType: ['AppLauncher', 'Toolbar'] }, pin));
					break;
				default:
					cmp = __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(Component, _extends({ key: i }, pin));
					break;
			}

			if (this.props.arrangeable) {
				components.push(
				//Wrap the component with a FinsembleDraggable.
				__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
					'div',
					{
						draggable: true,
						onDragStart: e => {
							this.onDragStart(e, pin);
						},
						onDrag: e => {
							this.onDrag(e, pin);
						},
						onDragEnd: e => {
							this.onDragEnd(e, pin);
						},
						onDrop: e => {
							this.onDrop(e, pin);
						},
						onDragOver: e => {
							this.onDragOver(e, pin);
						},
						className: 'fullHeightFlex',
						index: i },
					cmp
				));
			} else {
				components.push(cmp);
			}
		}
		return components;
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
		var self = this;
		if (this.props.handleOverflow) {
			// overflow handling
			if (this.props.overflowMenuComponent) {
				this.state.overflowMenuComponent = this.props.overflowMenu;
				this.state.overflowMenuProps = this.props.overflowMenuProps;
			} else {
				this.state.overflowMenuComponent = __WEBPACK_IMPORTED_MODULE_3__FinsembleButton_FinsembleButton__["a" /* default */];
				this.state.overflowMenuProps = {
					buttonType: ['Toolbar', 'MenuLauncher'],
					menuType: 'Overflow Menu',
					title: 'Overflow',
					fontIcon: 'ff-caret-down',
					preSpawn: true
				};
			}

			var overflowMenuStoreName = this.props.overflowMenuStoreName || 'OverflowMenuStore';

			// create/get a store for checking if overflowmenu has been spawned. If not, spawn
			FSBL.Clients.DistributedStoreClient.createStore({ global: true, store: overflowMenuStoreName }, function (err, store) {
				self.setState({ overflowStore: store });
			});

			// listener for overflow clicks
			FSBL.Clients.RouterClient.addListener(this.state.clickChannel, function (err, response) {
				//Triggered if the user reordered the overflow items.
				if (response.data.changeEvent) {
					self.reorderPins(response.data.changeEvent);
				} else {
					//Triggered if the user tries to launch an item.
					self.triggerClick(response.data.index);
				}
			});
		}

		if (this.props.handlePins) {
			FSBL.Clients.DistributedStoreClient.getStore({ global: true, store: 'Finsemble-Toolbar-Store' }, function (err, store) {
				// Load pins from storage
				self.setState({ pinStore: store });
				FSBL.Clients.StorageClient.get({ topic: 'finsemble', key: 'toolbarPins' }, function (err, pins) {
					store.setValue({ field: 'pins', value: pins });
					self.initialLoad = true;
				});
				store.addListener({ field: 'pins' }, self.processPins);
			});
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
		self.state.pinStore.removeListener({ field: 'pins' }, self.processPins);
	}

	/**
  * Render method. It's very complicated.
  * If there's an overflow component, we calculate which items in the section should be rendered, and which should be shuttled off to the overflowMenu.
  * This code is very tied to the center-section in a toolbar that allows for pinned components, workspaces, and groups of components. We will eventually abstract that a bit.
  */
	render() {
		let classes = this.props.className || '';
		classes += ` ${SECTION_BASE_CLASS}`;

		this.children = this.props.handlePins ? this.renderpins() : this.props.children;
		var OverflowComponent = this.state.overflowMenuComponent;
		var self = this;
		//section doesn't get rendered when it's so narrow that the first item would be clipped.
		if (self.state.minOverflowIndex === 0) return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('span', null);

		var section = __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
			'div',
			{ className: classes, ref: e => {
					this.element = e;
				}, onMouseLeave: e => this.onMouseLeave(e) },
			Array.isArray(this.children) && this.children.map((item, index) => {
				if (!isNaN(self.state.minOverflowIndex) && index >= self.state.minOverflowIndex) {
					var comps = [];
					// render the overflow component
					if (index == self.state.minOverflowIndex) {
						comps.push(__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(OverflowComponent, _extends({ beforeClick: function (e) {
								self.saveButtonsToOverflowStore(e, self);
							} }, self.state.overflowMenuProps, { key: 'overflow' + index })));
					}
					// render the rest of the components hidden
					comps.push(__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
						'div',
						{ style: { display: 'none' } },
						item
					));
					if (self.element && !self.element.className.includes('overflow')) self.element.className += ' overflow';
					return comps;
				} else {
					if (self.element && self.element.className.includes('overflow')) self.element.className = self.element.className.replace('overflow', '');
					return item;
				}
			})
		);
		//If we can arrange the items, we need to wrap it in a droppable.
		//@todo eventually we may allow vertical toolbars. When that happens this direction will need to be dynamic.
		/*if (this.props.arrangeable) {
  	return (<FinsembleDroppable classes={classes} direction="horizontal" droppableId="droppable">
  		{section}
  	</FinsembleDroppable>);
  } else {
  	return section;
  }*/

		return section;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FinsembleToolbarSection;


/***/ }),
/* 294 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/


const BUTTON_BASE_CLASS = 'divider';

/**
 * Toolbar separator is a vertical separator to be used between toolbar items.
 */
class FinsembleToolbarSeparator extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let classes = this.props.className || '';
		classes += ` ${BUTTON_BASE_CLASS}`;
		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			_extends({}, this.props, { className: classes }),
			this.props.children
		);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FinsembleToolbarSeparator;


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map