"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = void 0;

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
 * Add operation for container objects. This is forward direction
 * implementation which add container in shape specified in data into content
 * and returns new content object
 *
 * @param {IContent} content on it operation will be performed
 * @param {{}} data which define how newly added container will look like
 * @return {IContent} new content
 */
var add = function add(content, data) {
  var newId = content.idBuffer;
  var newContainer = {
    content: [],
    id: newId,
    type: 'container',
    lock: false,
    position: data.position
  };

  var mutation = function mutation(parent) {
    return __assign({}, parent, {
      content: (0, _utils.addObjectInArray)(parent.content, newContainer, data.position)
    });
  };

  if (!data.parent) {
    data.parent = 'root';
  }

  var res = (0, _utils.sam)(content, data.parent, mutation);
  return __assign({}, res, {
    idBuffer: _utils.id.next(newId)
  });
};

exports.add = add;