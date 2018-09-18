import { IContent } from '../../@types';
export interface IRemoveData {
    id: string;
}
/**
 * Remove operation for container.
 *
 * @param {IContent} content
 * @return {IContent}
 */
export declare const remove: (content: IContent, data: IRemoveData) => IContent;
