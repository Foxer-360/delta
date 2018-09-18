import { IContent } from '../../@types';
export interface IAddData {
    parent: string;
    position?: number;
    name: string;
    data: {};
}
/**
 * Add new component into content at given position
 *
 * @param {IContent} content
 * @param {IAddData} data which specify shape of new component
 * @return {IContent}
 */
export declare const add: (content: IContent, data: IAddData) => IContent;
