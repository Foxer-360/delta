"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = void 0;

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

/**
 * Update component object in content of some container. This method is not
 * used to lock component or change position or something else. This method
 * can olny change data attribute in component object.
 *
 * @param {IContent} content
 * @param {IUpdateData} data
 * @param {IContent}
 */
var update = function update(content, data) {
  var mutation = function mutation(object) {
    return __assign({}, object, {
      data: __assign({}, data.data)
    });
  };

  var res = (0, _utils.sam)(content, data.id, mutation);
  return res;
};

exports.update = update;