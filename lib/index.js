"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Delta", {
  enumerable: true,
  get: function get() {
    return _delta.Delta;
  }
});
exports.getObjectFromContent = exports.builder = void 0;

var _process = require("./process");

var _delta = require("./delta");

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
 * Builder function. This function accepts delta language and build a content
 * from this language. This function also can accepts as optional parameter
 * some content and than this builder starts build language on this content.
 * But if some 'character' in language is init operation, than previous state
 * of content will be erased
 *
 * @param {DeltaLanguage} lang
 * @param {IContent} content?
 * @return {IContent}
 * @throws {Error}
 */
var builder = function builder(delta, content) {
  // Export language from delta
  var lang = delta.export(); // If content is no provided, than first character in language must be
  // 'init'. Otherwise it's invalid language

  if (!content) {
    var firstOp = lang.shift();

    if (!firstOp || firstOp.type !== 'init') {
      throw new Error('Invalid delta language');
    }

    content = (0, _process.process)(firstOp, null);
  } // Get index of last commit


  var index = -1;
  lang.forEach(function (e, i) {
    if (!content) return;

    if (e.commit === content.lastCommit) {
      index = i;
    }
  });

  for (var i = index + 1; i < lang.length; i++) {
    var op = lang[i];

    if (!op) {
      throw new Error('Undefined operation');
    }

    content = (0, _process.process)(op, content);
  } // Go operation by operation to get content
  // while (lang.length) {
  //   const op = lang.shift();
  //   if (!op) {
  //     throw new Error('Undefined operation');
  //   }
  //   content = process(op, content);
  // }


  return content;
};

exports.builder = builder;

var getObjectFromContent = function getObjectFromContent(content, id) {
  var res = null;

  var recursive = function recursive(c) {
    var arr = c.content;
    arr.forEach(function (e) {
      if (e.id === id) {
        res = __assign({}, e);
      }

      if (e.type === 'container') {
        recursive(e);
      }
    });
  };

  recursive(content);
  return res;
};

exports.getObjectFromContent = getObjectFromContent;