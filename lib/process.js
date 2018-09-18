"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.process = void 0;

var _operations = require("./operations");

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
 * Simple function which get operation and content and just call correspond function
 * from operations to change content by this operation
 *
 * @param {IOperation} operation which will be performed
 * @param {IContent} content
 * @return {IContent}
 */
var process = function process(operation, content) {
  var type = operation.type;

  if (!content && type !== 'init') {
    throw new Error('If content is null, then operation must be init');
  }

  switch (type) {
    // General operations
    case _operations.Types.init:
      content = (0, _operations.init)();
      break;

    case 'add':
      // Which type of element
      if (operation.payload.type === 'component') {
        content = _operations.component.add(content, operation.payload.data);
      } else {
        content = _operations.container.add(content, operation.payload.data);
      }

      break;

    case 'remove':
      // Doesn't matter if its container or component....
      content = _operations.container.remove(content, {
        id: operation.payload.id
      });
      break;

    case 'move':
      // Doesn't matter if its container or component...
      content = _operations.container.move(content, {
        id: operation.payload.id,
        position: operation.payload.data.position
      });
      break;

    case 'edit':
      content = _operations.component.update(content, {
        id: operation.payload.id,
        data: __assign({}, operation.payload.data)
      });
      break;

    case 'lock':
    case 'unlock':
      content = _operations.container.lock(content, {
        id: operation.payload.id,
        lock: type === 'lock' ? true : false
      });
      break;

    default:
      content = content;
      break;
  }

  if (!content) {
    content = (0, _operations.init)();
  }

  content.lastCommit = operation.commit;
  return content;
};

exports.process = process;