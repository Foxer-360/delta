"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.id = exports.addObjectInArray = exports.moveObjectInArray = exports.findParentId = exports.sam = void 0;

var idUtils = _interopRequireWildcard(require("./id"));

exports.id = idUtils;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
 * This is very useful function. SAM means Search and Mutate. This method
 * takes object from params and recursively search for element which you
 * specify in params and run mutation specified in params on this searched
 * element. Mutation must returns new object or null or undefined. This method
 * doesn't change any other element in deep tree of given object, so returned
 * object is the same object as given, but mutated part is a new object.
 *
 * @param {object} root object which will be searched in
 * @param {string} search id of element which we want to search
 * @param {fce} mutation function which returns mutated object
 * @return {object}
 */
var sam = function sam(root, search, mutation) {
  if (!mutation) {
    return root;
  }

  if (root.id === search) {
    var res_1 = mutation(root); // No changes

    if (res_1 === null) {
      return root;
    } // Undefined means, that this will be removed


    if (res_1 === undefined) {
      return undefined;
    } // Otherwise return mutated object


    return res_1;
  } // Nothing to change


  if (!Array.isArray(root.content) || root.content.length < 1) {
    return root;
  }

  var res = __assign({}, root, {
    content: root.content.map(function (o) {
      return sam(o, search, mutation);
    }).filter(filterUndefinedValues)
  }); // root.content = root.content.map((o: any) => {
  //   return sam(o, search, mutation);
  // }).filter(filterUndefinedValues);
  // return root;


  return res;
};
/**
 * Filter function which filter undefined values in array.
 *
 * @param {any} value from array which will be checked if is undefined
 * @return {boolean}
 */


exports.sam = sam;

var filterUndefinedValues = function filterUndefinedValues(value) {
  if (value === undefined) {
    return false;
  }

  return true;
};
/**
 * Simple function which returns ID of parent element for given ID of child
 * element
 *
 * @param {IContent} content
 * @param {string} id
 * @return {string | null}
 */


var findParentId = function findParentId(content, id) {
  // If child id is root, then there is no parent
  if (id === 'root') {
    return null;
  } // Define recursive finder


  var finder = function finder(root) {
    // Not found
    if (!Array.isArray(root.content) || root.content.length < 1) {
      return null;
    } // Go over all elements in content


    for (var _i = 0, _a = root.content; _i < _a.length; _i++) {
      var child = _a[_i]; // If element's id is what we find, return id of root

      if (child.id === id) {
        return root.id;
      } // Else deep search


      var res = finder(child);

      if (res) {
        return res;
      }
    }

    return null;
  };

  return finder(content);
};
/**
 * Helper function which is used in Array.sort() to sort IPosLooseObject
 * object ascendent
 *
 * @param {IPosLooseObject} a
 * @param {IPosLooseObject} b
 * @return {number}
 */


exports.findParentId = findParentId;

var sortPosLooseObjects = function sortPosLooseObjects(a, b) {
  return a.position - b.position;
};
/**
 * Recalculate and sort array of objects with position attribute. This
 * function moves one element from current position to next position.
 *
 * @param {IPosLooseObject[]} arr
 * @param {number} current position of object
 * @param {number} next new position of object
 * @return {IPosLooseObject[]}
 */


var moveObjectInArray = function moveObjectInArray(arr, current, next) {
  var mapPositionFix = function mapPositionFix(item, index) {
    return __assign({}, item, {
      position: index
    });
  }; // Check arguments validity


  if (current === next) {
    return arr.map(mapPositionFix);
  }

  if (current > arr.length || current < 0) {
    return arr.map(mapPositionFix);
  }

  if (next > arr.length || next < 0) {
    return arr.map(mapPositionFix);
  } // Map new positions


  var mapFce = function mapFce(o, i) {
    // Moving component
    if (o.position === current) {
      // o.position = next;
      if (next > current) {
        return __assign({}, o, {
          position: next - 1
        });
      }

      return __assign({}, o, {
        position: next
      });
    }

    var pos = o.position;

    if (current < o.position && o.position < next) {
      pos--;
    }

    if (next <= o.position && o.position < current) {
      pos++;
    } // o.position = pos;


    return __assign({}, o, {
      position: pos
    });
  }; // tslint:disable-next-line:no-console


  console.log('%c[Delta]%c Before final sort', 'font-weight: bold; color: SaddleBrown', 'color: SaddleBrown', arr.slice());
  var res = arr.map(mapFce).sort(sortPosLooseObjects).map(mapPositionFix); // tslint:disable-next-line:no-console

  console.log('%c[Delta]%c After final sort', 'font-weight: bold; color: SaddleBrown', 'color: SaddleBrown', res.slice());
  return res;
};
/**
 * Add new object into array at given position and recalculate positions of
 * others object in this array to keep this array consistent. If position is
 * not give, than this object will be inserted in the end of array. Also
 * position attribute in object which will be inserted will be set to
 * positition where this object was inserted. Like if you didn't specify
 * position, then object will has position attribute set to position of last
 * element in array which will be this object.
 *
 * @param {IPosLooseObject[]} arr
 * @param {IPosLoooseObject} object which will be inserted into arr
 * @param {number} position
 * @return {IPosLooseObject[]}
 */


exports.moveObjectInArray = moveObjectInArray;

var addObjectInArray = function addObjectInArray(arr, object, position) {
  // If array is empty, just put object into array
  if (arr.length < 1) {
    return [__assign({}, object, {
      position: 0
    })];
  } // Prepare real position of object in array. If position is not set, than it
  // will be the end of array. If position is over length of array, than
  // position will be end of the array and if position is negative, than it
  // will be caunted from end of array and if this will results in position
  // before start, than object will be inserted at start of array


  if (position === null || position === undefined) {
    position = arr.length;
  } else {
    // Negative
    if (position < 0) {
      position = arr.length + position + 1;

      if (position < 0) {
        position = 0;
      }
    } else {
      // Just check overflow
      if (position > arr.length) {
        position = arr.length;
      }
    }
  } // Define map function which corrects positions of other components


  var mapFce = function mapFce(pos) {
    return function (o, i) {
      // Calculate correct position of component
      return __assign({}, o, {
        position: o.position >= pos ? o.position + 1 : o.position
      });
    };
  }; // Push into array


  var res = arr.map(mapFce(position)).concat([__assign({}, object, {
    position: position
  })]).sort(sortPosLooseObjects);
  return res;
};

exports.addObjectInArray = addObjectInArray;