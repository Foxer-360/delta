import { IContent } from '../../@types';
export interface IAddData {
    position?: number;
    parent: string;
}
/**
 * Add operation for container objects. This is forward direction
 * implementation which add container in shape specified in data into content
 * and returns new content object
 *
 * @param {IContent} content on it operation will be performed
 * @param {{}} data which define how newly added container will look like
 * @return {IContent} new content
 */
export declare const add: (content: IContent, data: IAddData) => any;
