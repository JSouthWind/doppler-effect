/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _PutToHtml = __webpack_require__(1);

	var _PutToHtml2 = _interopRequireDefault(_PutToHtml);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var putToHtml = new _PutToHtml2.default();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Doppler = __webpack_require__(2);

	var _Doppler2 = _interopRequireDefault(_Doppler);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PutToHtml = function () {
	  function PutToHtml() {
	    _classCallCheck(this, PutToHtml);

	    this.input = document.getElementById('input');
	    this.slider = document.getElementById('slider');
	    this.overlay = document.getElementById('overlay');

	    //choose the right function interval
	    this.moveInterval = -150;
	    this.minInput = -100;
	    this.maxInput = 100;
	    this.opacityMax = 0.6;

	    this.doppler = new _Doppler2.default(this.moveInterval, this.minInput, this.maxInput, this.opacityMax);
	    this.setMaxMinControls();
	    //connect input to slider
	    this.doppler.inputToSlider(0);

	    this.events();
	  }

	  _createClass(PutToHtml, [{
	    key: 'events',
	    value: function events() {
	      this.input.oninput = this.setSlider.bind(this);
	      this.slider.oninput = this.setInput.bind(this);
	    }
	  }, {
	    key: 'setSlider',
	    value: function setSlider() {
	      var obj = this.doppler.inputToSlider(this.limitInput(this.input.value));
	      this.overlay.style.opacity = obj.opacity.num;
	      this.overlay.className = obj.opacity.color;
	      this.slider.value = obj.pos;
	    }
	  }, {
	    key: 'setInput',
	    value: function setInput() {
	      var obj = this.doppler.sliderToInput(this.slider.value);
	      this.overlay.style.opacity = obj.opacity.num;
	      this.overlay.className = obj.opacity.color;
	      this.input.value = obj.val;
	    }
	  }, {
	    key: 'setMaxMinControls',
	    value: function setMaxMinControls() {
	      this.slider.setAttribute('min', this.minInput);
	      this.slider.setAttribute('max', this.maxInput);
	      this.input.setAttribute('min', this.minInput);
	      this.input.setAttribute('max', this.maxInput);
	    }

	    //limit input

	  }, {
	    key: 'limitInput',
	    value: function limitInput(val) {
	      if (val > 100) {
	        val = 100;
	      } else if (val < -100) val = -100;
	      this.input.value = val;
	      return val;
	    }
	  }]);

	  return PutToHtml;
	}();

	exports.default = PutToHtml;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Doppler = function () {
	  function Doppler(moveInterval, minInput, maxInput, opacity) {
	    _classCallCheck(this, Doppler);

	    this.moveInterval = moveInterval;
	    this.minInput = minInput;
	    this.maxInput = maxInput;
	    this.minPos = minInput + moveInterval;
	    this.maxPos = maxInput + moveInterval;
	    this.minLog = Math.log(-this.minPos);
	    this.maxLog = Math.log(-this.maxPos);
	    this.opacityMin = 0;
	    this.opacityMax = opacity;
	  }

	  _createClass(Doppler, [{
	    key: 'sliderToInput',
	    value: function sliderToInput(pos) {
	      var posLog = Math.log(-this.moveInterval - pos),
	          inputVal = this.scaleAtoB(posLog, this.minLog, this.maxLog, this.minInput, this.maxInput);
	      return { val: Math.round(inputVal * 10) / 10,
	        opacity: this.changeColor(inputVal) };
	    }
	  }, {
	    key: 'inputToSlider',
	    value: function inputToSlider(val) {
	      var posLog = this.scaleAtoB(val, this.minInput, this.maxInput, this.minLog, this.maxLog);
	      var pos = -Math.exp(posLog) - this.moveInterval;
	      return { pos: pos, opacity: this.changeColor(val) };
	    }
	  }, {
	    key: 'changeColor',
	    value: function changeColor(num) {
	      return { color: num > 0 ? 'red' : 'blue',
	        num: this.scaleAtoB(Math.abs(num), 0, this.maxInput, 0, this.opacityMax) };
	    }

	    //scale one interval to another

	  }, {
	    key: 'scaleAtoB',
	    value: function scaleAtoB(x, minA, maxA, minB, maxB) {
	      var scale = (maxB - minB) / (maxA - minA);
	      return (x - minA) * scale + minB;
	    }
	  }]);

	  return Doppler;
	}();

	exports.default = Doppler;

/***/ })
/******/ ]);