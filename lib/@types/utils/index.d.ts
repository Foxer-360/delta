import { IContent, IPosLooseObject } from '../@types';
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
export declare const sam: (root: any, search: string, mutation: any) => any;
/**
 * Simple function which returns ID of parent element for given ID of child
 * element
 *
 * @param {IContent} content
 * @param {string} id
 * @return {string | null}
 */
export declare const findParentId: (content: IContent, id: string) => string | null;
/**
 * Recalculate and sort array of objects with position attribute. This
 * function moves one element from current position to next position.
 *
 * @param {IPosLooseObject[]} arr
 * @param {number} current position of object
 * @param {number} next new position of object
 * @return {IPosLooseObject[]}
 */
export declare const moveObjectInArray: (arr: IPosLooseObject<any>[], current: number, next: number) => IPosLooseObject<any>[];
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
export declare const addObjectInArray: (arr: IPosLooseObject<any>[], object: IPosLooseObject<any>, position?: number | undefined) => IPosLooseObject<any>[];
export { idUtils as id, };
