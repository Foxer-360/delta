"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.container = exports.component = exports.Types = exports.init = void 0;

var _utils = require("../utils");

var component = _interopRequireWildcard(require("./component"));

exports.component = component;

var container = _interopRequireWildcard(require("./container"));

exports.container = container;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * Definition of Operation Types
 */
var Types = {
  componentAdd: 'component:add',
  componentMove: 'component:move',
  componentRemove: 'component:remove',
  componentUpdate: 'component:update',
  containerAdd: 'container:add',
  containerMove: 'container:move',
  containerRemove: 'container:remove',
  containerUpdate: 'container:update',
  init: 'init'
};
/**
 * Init operation, this operation will create a new content container
 *
 * @return {IContent} empty content container
 */

exports.Types = Types;

var init = function init() {
  return {
    content: [],
    id: 'root',
    idBuffer: _utils.id.init(),
    lastCommit: 'undefined'
  };
};

exports.init = init;