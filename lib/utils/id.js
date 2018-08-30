"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prev = exports.next = exports.init = void 0;

/**
 * Generate initial ID, which is simple zero.
 *
 * @return {string}
 */
var init = function init() {
  return '#0';
};
/**
 * Generate next ID depends on given ID
 *
 * @param {string} id
 * @return {string}
 */


exports.init = init;

var next = function next(id) {
  var num = Number(id.replace('#', ''));

  if (isNaN(num)) {
    throw new Error('Invalid ID');
  }

  return "#" + (num + 1);
};
/**
 * Generate prev ID depends on given ID
 *
 * @param {string} id
 * @return {string}
 */


exports.next = next;

var prev = function prev(id) {
  var num = Number(id.replace('#', ''));

  if (isNaN(num)) {
    throw new Error('Invalid ID');
  }

  if (num < 0) {
    throw new Error('There is no previous ID');
  }

  return "#" + (num - 1);
};

exports.prev = prev;