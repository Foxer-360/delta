"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = void 0;

var _utils = require("../../utils");

/**
 * Remove operation for container.
 *
 * @param {IContent} content
 * @return {IContent}
 */
var remove = function remove(content, data) {
  var mutation = function mutation(object) {
    return undefined;
  };

  var res = (0, _utils.sam)(content, data.id, mutation);
  return res;
};

exports.remove = remove;