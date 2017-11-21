(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("validation-rule-parser", [], factory);
	else if(typeof exports === 'object')
		exports["validation-rule-parser"] = factory();
	else
		root["validation-rule-parser"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RulesParser = function () {
    /**
     * 
     * @param {string} rulesStr 
     */
    function RulesParser(rulesStr) {
        _classCallCheck(this, RulesParser);

        this.rules = [];
        this.rulesStr = rulesStr;
        this.compiledRules = {};
        this.compileRules();
    }

    _createClass(RulesParser, [{
        key: 'compileRules',
        value: function compileRules() {
            if (this.rulesStr.length === 0) {
                return;
            }
            var rawRules = this.rulesStr.split('|');
            if (rawRules.length > 0) {
                this.parseRules(rawRules);
            }
        }

        /**
         * 
         * @param {array} rawRules 
         */

    }, {
        key: 'parseRules',
        value: function parseRules(rawRules) {
            var _this = this;

            rawRules.forEach(function (rowRule) {
                var rule = void 0;
                var rawParams = void 0;

                var _rowRule$split = rowRule.split(":");

                var _rowRule$split2 = _toArray(_rowRule$split);

                rule = _rowRule$split2[0];
                rawParams = _rowRule$split2.slice(1);


                if (!rawParams.length) {
                    _this.compiledRules[_this.normalize(rule)] = true;
                    return;
                }

                _this.parseParams(_this.normalize(rule), rawParams);
            });
        }

        /**
         * 
         * @param {string} rawParams 
         */

    }, {
        key: 'parseParams',
        value: function parseParams(rule, rawParams) {
            var _this2 = this;

            rawParams.forEach(function (rawParam) {
                if (rule === 'format') {
                    _this2.compiledRules[rule] = rawParam;
                } else if (rawParam.indexOf(';') === -1) {
                    var parsedParamsValues = _this2.parseParamValues(rule, rawParam);
                    if ((typeof parsedParamsValues === 'undefined' ? 'undefined' : _typeof(parsedParamsValues)) === 'object') {
                        var name = void 0;
                        var value = void 0;
                        name = parsedParamsValues.name;
                        value = parsedParamsValues.value;

                        _this2.compiledRules[rule] = _defineProperty({}, name, value);
                    } else {
                        _this2.compiledRules[rule] = parsedParamsValues;
                    };
                } else {
                    var _parsedParamsValues = {};
                    var _name = void 0;
                    var _value = void 0;

                    rawParam.split(';').forEach(function (rawParamValue) {
                        var _parseParamValues = _this2.parseParamValues(rule, rawParamValue);

                        _name = _parseParamValues.name;
                        _value = _parseParamValues.value;

                        _parsedParamsValues[_name] = _value;
                    });

                    _this2.compiledRules[rule] = _parsedParamsValues;
                }
            });
        }
    }, {
        key: 'parseParamValues',
        value: function parseParamValues(rule, rawParam) {
            if (rawParam.indexOf('=') === -1) {
                return this.normalize(rawParam);
            } else {
                var param = {};
                var name = void 0;
                var value = void 0;

                var _rawParam$split = rawParam.split('=');

                var _rawParam$split2 = _slicedToArray(_rawParam$split, 2);

                name = _rawParam$split2[0];
                value = _rawParam$split2[1];

                name = this.normalize(name);
                value = this.normalize(value);
                param.name = name;
                param.value = value;
                return param;
            }
        }
    }, {
        key: 'parseFormatValues',
        value: function parseFormatValues(rawParam) {
            if (rawParam.indexOf('=') === -1) {
                return this.normalize(rawParam);
            }
        }

        /**
         * 
         * @param {string} str 
         */

    }, {
        key: 'normalize',
        value: function normalize(str) {
            if (isFinite(str)) {
                return parseFloat(str);
            } else if (str === 'true' || str === 'false') {
                return str === 'true';
            } else if (typeof str === 'string') {
                return str.replace(/^\s+|\s+$/g, '');
            }
        }
    }, {
        key: 'getCompiled',
        value: function getCompiled() {
            return this.compiledRules;
        }
    }]);

    return RulesParser;
}();

module.exports = RulesParser;

/***/ })
/******/ ]);
});