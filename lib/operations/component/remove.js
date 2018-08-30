"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = void 0;

var _utils = require("../../utils");

/**
 * Remove component from content of some container
 *
 * @param {IContent} content
 * @param {IRemoveData} data
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