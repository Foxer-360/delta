/**
 * This is common type called LooseObject. It's simple definition of object
 * with properties of some type (include any)
 */
interface ILooseObject<T = any> {
  [key: string]: T;
}

/**
 * This is similar object to LooseObject, but has defined position attribute
 * in it. Position is of type number.
 */
type IPosLooseObject<T = any> = ILooseObject<T> & { position: number };

export {
  ILooseObject,
  IPosLooseObject,
};
