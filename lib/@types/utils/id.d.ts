/**
 * Generate initial ID, which is simple zero.
 *
 * @return {string}
 */
export declare const init: () => string;
/**
 * Generate next ID depends on given ID
 *
 * @param {string} id
 * @return {string}
 */
export declare const next: (id: string) => string;
/**
 * Generate prev ID depends on given ID
 *
 * @param {string} id
 * @return {string}
 */
export declare const prev: (id: string) => string;
