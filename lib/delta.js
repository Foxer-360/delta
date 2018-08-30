"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Delta = void 0;

var _uuid = require("uuid");

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
 * Delta language object. This object is used to handle whole language
 * sequence. To make some local changes before they are accepted. This object
 * helps you to do all you need with delta language and keeps data consistent.
 */
var Delta =
/** @class */
function () {
  function Delta() {
    // tslint:disable-next-line:variable-name
    this._length = 0; // Nothing to do now

    this._commited = Array();
  }

  Object.defineProperty(Delta.prototype, "length", {
    /**
     * Simple getter for length propery, which cannot be change from outside of
     * class
     *
     * @return {number}
     */
    get: function get() {
      return this._length;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Commit some operations into buffer (local changes). Commits will be
   * stored here until push is called
   *
   * @param {OperationType} type
   * @return {string} id of this commit
   */

  Delta.prototype.commit = function (type, payload) {
    var id = (0, _uuid.v4)();

    this._commited.push({
      commit: id,
      type: type,
      payload: payload
    });

    return id;
  };
  /**
   * This function add commits into buffer. But here we assume already builded
   * commits, for example sended from client to server.
   *
   * @param {ICommit[]} data
   * @return {void}
   */


  Delta.prototype.forceCommit = function (data) {
    var _a;

    (_a = this._commited).splice.apply(_a, [-1, 0].concat(data));
  };
  /**
   * Import function just gets array of operations and copy them into this
   * object
   *
   * @param {IOperation[]} data
   * @return {void}
   */


  Delta.prototype.import = function (data) {
    this.erase();

    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
      var op = data_1[_i];
      this[this._length] = __assign({}, op);
      this._length++;
    }
  };
  /**
   * Export function is just alias for standard values function
   *
   * @return {IOperation[]}
   */


  Delta.prototype.export = function () {
    return this.values();
  };
  /**
   * Simple method which returns all operations in array.
   *
   * @return {IOperation[]}
   */


  Delta.prototype.values = function () {
    var res = [];

    for (var i = 0; i < this._length; i++) {
      res.push(this[i]);
    }

    return res;
  };
  /**
   * Push function gets all commits and create a final operations from them
   * and add it into sequence
   *
   * @return {void}
   */


  Delta.prototype.push = function () {
    for (var _i = 0, _a = this._commited; _i < _a.length; _i++) {
      var c = _a[_i]; // Add into this object as if this object is array

      this[this._length] = __assign({}, c, {
        order: this._length
      });
      this._length++;
    } // Clear commited array


    this.revert();
  };
  /**
   * Simple function to revert commits in buffer. Parameter num specify how
   * many commits from the end of buffer (from the newest commit) will be
   * reverted. If parameter num is not specified, than revert all commits.
   *
   * @param {number} num of commits which will be reverted
   * @return {number} number of successfuly reverted commits
   */


  Delta.prototype.revert = function (num) {
    var len = this._commited.length;

    if (!num) {
      // Remove all commits
      this._commited = Array();
      return len;
    }

    var count = 0;

    for (var i = 0; i < num; i++) {
      var p = this._commited.pop();

      if (!p) {
        // Commits are empty, just break cycle and let fce to return value
        break;
      }

      count++;
    }

    return count;
  };
  /**
   * This function prepare data for server. It's generate and object with
   * information about changes in this delta language
   *
   * @return {IPullData}
   */


  Delta.prototype.pull = function () {
    var last = this[this._length - 1];

    if (!last) {
      last = null;
    } else {
      last = {
        commit: last.commit,
        order: last.order
      };
    }

    var res = {
      commits: this._commited.slice(),
      last: last
    };
    return res;
  };
  /**
   * Check differences between state of this delta language and pulled data
   * from another delta language
   *
   * @param {IPullData} data
   * @return {IDiffState}
   */


  Delta.prototype.diff = function (data) {
    // For now, just check if this delta has some changes
    if (!data.last) {
      if (this._length < 1) {
        // No changes
        return {
          state: 'same',
          updates: []
        };
      } else {
        // All changes
        return {
          state: 'ahead',
          updates: this.export()
        };
      }
    }

    var res = {
      state: 'incorrect',
      updates: []
    };
    var last = this[this._length - 1];

    if (!last) {
      return res;
    }

    var dlast = data.last;

    if (last.order < dlast.order) {
      // other delta has something more
      res.state = 'behind';
    } else if (last.order > dlast.order) {
      // we have something more
      res.updates = this.operationsFromOrder(dlast.order);
      res.state = 'ahead';
    } else {
      // Check if it's correct
      if (last.commit === dlast.commit) {
        // No changes
        res.state = 'same';
      }
    }

    return res;
  };
  /**
   * Update data
   *
   * @param {IOperation[]} data
   * @return {void}
   */


  Delta.prototype.update = function (data) {
    for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
      var o = data_2[_i];
      this[this._length] = __assign({}, o);
      this._length++;
    }
  };
  /**
   * Simple function just to erase all data stored
   *
   * @return {void}
   */


  Delta.prototype.erase = function () {
    for (var i = this._length - 1; i >= 0; i--) {
      delete this[i];
    }

    this._length = 0;
  };
  /**
   * Get operations from some order
   *
   * @param {number} order;
   * @return {IOperation[]}
   */


  Delta.prototype.operationsFromOrder = function (order) {
    var res = [];

    for (var i = 0; i < this._length; i++) {
      if (this[i].order > order) {
        res.push(this[i]);
      }
    }

    return res;
  };

  return Delta;
}();

exports.Delta = Delta;