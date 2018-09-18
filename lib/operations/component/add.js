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
 * Add new component into content at given position
 *
 * @param {IContent} content
 * @param {IAddData} data which specify shape of new component
 * @return {IContent}
 */
var add = function add(content, data) {
  var newId = content.idBuffer;
  var newComponent = {
    name: data.name,
    data: data.data,
    id: newId,
    type: 'component',
    lock: false
  };

  var mutation = function mutation(o) {
    return __assign({}, o, {
      content: (0, _utils.addObjectInArray)(o.content, newComponent, data.position)
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