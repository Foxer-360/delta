import { IContent, ILooseObject } from '../../@types';
export interface IUpdateData {
    id: string;
    data: ILooseObject;
}
/**
 * Update component object in content of some container. This method is not
 * used to lock component or change position or something else. This method
 * can olny change data attribute in component object.
 *
 * @param {IContent} content
 * @param {IUpdateData} data
 * @param {IContent}
 */
export declare const update: (content: IContent, data: IUpdateData) => IContent;
