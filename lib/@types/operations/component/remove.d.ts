import { IContent } from '../../@types';
export interface IRemoveData {
    id: string;
}
/**
 * Remove component from content of some container
 *
 * @param {IContent} content
 * @param {IRemoveData} data
 * @return {IContent}
 */
export declare const remove: (content: IContent, data: IRemoveData) => IContent;
