"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/just-debounce-it";
exports.ids = ["vendor-chunks/just-debounce-it"];
exports.modules = {

/***/ "(ssr)/./node_modules/just-debounce-it/index.mjs":
/*!*************************************************!*\
  !*** ./node_modules/just-debounce-it/index.mjs ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ functionDebounce)\n/* harmony export */ });\nvar functionDebounce = debounce;\n\nfunction debounce(fn, wait, callFirst) {\n  var timeout = null;\n  var debouncedFn = null;\n\n  var clear = function() {\n    if (timeout) {\n      clearTimeout(timeout);\n\n      debouncedFn = null;\n      timeout = null;\n    }\n  };\n\n  var flush = function() {\n    var call = debouncedFn;\n    clear();\n\n    if (call) {\n      call();\n    }\n  };\n\n  var debounceWrapper = function() {\n    if (!wait) {\n      return fn.apply(this, arguments);\n    }\n\n    var context = this;\n    var args = arguments;\n    var callNow = callFirst && !timeout;\n    clear();\n\n    debouncedFn = function() {\n      fn.apply(context, args);\n    };\n\n    timeout = setTimeout(function() {\n      timeout = null;\n\n      if (!callNow) {\n        var call = debouncedFn;\n        debouncedFn = null;\n\n        return call();\n      }\n    }, wait);\n\n    if (callNow) {\n      return debouncedFn();\n    }\n  };\n\n  debounceWrapper.cancel = clear;\n  debounceWrapper.flush = flush;\n\n  return debounceWrapper;\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvanVzdC1kZWJvdW5jZS1pdC9pbmRleC5tanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRXFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2ctbmV4dC1zY3JvbGx0cmlnZ2VyLy4vbm9kZV9tb2R1bGVzL2p1c3QtZGVib3VuY2UtaXQvaW5kZXgubWpzPzhjOTAiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGZ1bmN0aW9uRGVib3VuY2UgPSBkZWJvdW5jZTtcblxuZnVuY3Rpb24gZGVib3VuY2UoZm4sIHdhaXQsIGNhbGxGaXJzdCkge1xuICB2YXIgdGltZW91dCA9IG51bGw7XG4gIHZhciBkZWJvdW5jZWRGbiA9IG51bGw7XG5cbiAgdmFyIGNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuICAgICAgZGVib3VuY2VkRm4gPSBudWxsO1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIHZhciBmbHVzaCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjYWxsID0gZGVib3VuY2VkRm47XG4gICAgY2xlYXIoKTtcblxuICAgIGlmIChjYWxsKSB7XG4gICAgICBjYWxsKCk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBkZWJvdW5jZVdyYXBwZXIgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXdhaXQpIHtcbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICB2YXIgY2FsbE5vdyA9IGNhbGxGaXJzdCAmJiAhdGltZW91dDtcbiAgICBjbGVhcigpO1xuXG4gICAgZGVib3VuY2VkRm4gPSBmdW5jdGlvbigpIHtcbiAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIH07XG5cbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHRpbWVvdXQgPSBudWxsO1xuXG4gICAgICBpZiAoIWNhbGxOb3cpIHtcbiAgICAgICAgdmFyIGNhbGwgPSBkZWJvdW5jZWRGbjtcbiAgICAgICAgZGVib3VuY2VkRm4gPSBudWxsO1xuXG4gICAgICAgIHJldHVybiBjYWxsKCk7XG4gICAgICB9XG4gICAgfSwgd2FpdCk7XG5cbiAgICBpZiAoY2FsbE5vdykge1xuICAgICAgcmV0dXJuIGRlYm91bmNlZEZuKCk7XG4gICAgfVxuICB9O1xuXG4gIGRlYm91bmNlV3JhcHBlci5jYW5jZWwgPSBjbGVhcjtcbiAgZGVib3VuY2VXcmFwcGVyLmZsdXNoID0gZmx1c2g7XG5cbiAgcmV0dXJuIGRlYm91bmNlV3JhcHBlcjtcbn1cblxuZXhwb3J0IHtmdW5jdGlvbkRlYm91bmNlIGFzIGRlZmF1bHR9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/just-debounce-it/index.mjs\n");

/***/ })

};
;