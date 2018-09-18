import { IContent } from '../../@types';
export interface IMoveData {
    id: string;
    position: number;
}
/**
 * Move given component in content of container.
 *
 * @param {IContent} content
 * @param {IMoveData} data
 * @return {IContent}
 */
export declare const move: (content: IContent, data: IMoveData) => IContent;
