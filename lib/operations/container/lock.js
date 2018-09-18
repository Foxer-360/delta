"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lock = void 0;

var _utils = require("../../utils");

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var lock = function lock(content, data) {
  var mutation = function mutation(object) {
    return __assign({}, object, {
      lock: data.lock
    });
  };

  var res = (0, _utils.sam)(content, data.id, mutation);
  return res;
};

exports.lock = lock;