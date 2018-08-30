import { IContent, IPosLooseObject } from '@source/@types';
import * as idUtils from './id';

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
export const sam = (root: any, search: string, mutation: any) => {
  if (!mutation) {
    return root;
  }

  if (root.id === search) {
    const res = mutation(root);

    // No changes
    if (res === null) {
      return root;
    }

    // Undefined means, that this will be removed
    if (res === undefined) {
      return undefined;
    }

    // Otherwise return mutated object
    return res;
  }

  // Nothing to change
  if (!Array.isArray(root.content) || root.content.length < 1) {
    return root;
  }

  const res = {
    ...root,
    content: root.content.map((o: any) => {
      return sam(o, search, mutation);
    }).filter(filterUndefinedValues),
  };

  // root.content = root.content.map((o: any) => {
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
const filterUndefinedValues = (value: any): boolean => {
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
export const findParentId = (content: IContent, id: string): string | null => {
  // If child id is root, then there is no parent
  if (id === 'root') {
    return null;
  }

  // Define recursive finder
  const finder = (root: any): string | null => {
    // Not found
    if (!Array.isArray(root.content) || root.content.length < 1) {
      return null;
    }

    // Go over all elements in content
    for (const child of root.content) {
      // If element's id is what we find, return id of root
      if (child.id === id) {
        return root.id;
      }

      // Else deep search
      const res = finder(child);
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
const sortPosLooseObjects = (a: IPosLooseObject, b: IPosLooseObject): number => {
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
export const moveObjectInArray = (arr: IPosLooseObject[], current: number, next: number): IPosLooseObject[] => {
  // Check arguments validity
  if (current === next) {
    return arr;
  }
  if (current > arr.length || current < 0) {
    return arr;
  }
  if (next > arr.length || next < 0) {
    return arr;
  }

  // Map new positions
  const mapFce = (o: IPosLooseObject, i: number) => {
    // Moving component
    if (i === current) {
      // o.position = next;
      return {
        ...o,
        position: next,
      };
    }

    let pos = o.position;
    if (current < o.position && o.position <= next) {
      pos--;
    }
    if (next <= o.position && o.position < current) {
      pos++;
    }

    // o.position = pos;
    return {
      ...o,
      position: pos,
    };
  };

  const res = arr.map(mapFce).sort(sortPosLooseObjects);
  return res;
}

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
export const addObjectInArray = (arr: IPosLooseObject[], object: IPosLooseObject, position?: number): IPosLooseObject[] => {
  // If array is empty, just put object into array
  if (arr.length < 1) {
    return [
      {
        ...object,
        position: 0,
      },
    ];
  }

  // Prepare real position of object in array. If position is not set, than it
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
  }

  // Define map function which corrects positions of other components
  const mapFce = (pos: number) => (o: IPosLooseObject, i: number) => {
    // Calculate correct position of component
    return {
      ...o,
      position: (o.position >= pos) ? o.position + 1 : o.position,
    };
  };

  // Push into array
  const res = [ ...arr.map(mapFce(position)), { ...object, position } ].sort(sortPosLooseObjects);
  return res;
};

export {
  idUtils as id,
};
