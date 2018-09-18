"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.move = void 0;

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
 * Move given component in content of container.
 *
 * @param {IContent} content
 * @param {IMoveData} data
 * @return {IContent}
 */
var move = function move(content, data) {
  // First find parent id
  var parentId = (0, _utils.findParentId)(content, data.id); // If parent ID doesn't exist, than component also doesn't exist or content
  // is inconsistent

  if (!parentId) {
    return content;
  }

  var mutation = function mutation(parent) {
    // Find current position of given component
    var current = -1;
    parent.content.forEach(function (child) {
      if (child.id === data.id) {
        current = child.position;
      }
    });

    if (current < 0) {
      // Nothing to change, child doesn't exists
      return null;
    }

    var moved = (0, _utils.moveObjectInArray)(parent.content, current, data.position);
    return __assign({}, parent, {
      content: moved
    });
  };

  var res = (0, _utils.sam)(content, parentId, mutation);
  return res;
};

exports.move = move;