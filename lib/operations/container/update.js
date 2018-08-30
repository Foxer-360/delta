"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = void 0;

var _utils = require("../../utils");

var update = function update(content, data) {
  var mutation = function mutation(object) {
    // Nothing to update now
    return object;
  };

  var res = (0, _utils.sam)(content, data.id, mutation);
  return res;
};

exports.update = update;