import { IContent } from '../../@types';
export interface IMoveData {
    id: string;
    position: number;
}
/**
 * Move container in content of another container. Automatically recalculate
 * positions in objects and sort array to keep data consistent
 * @param {IContent} content
 * @param {IMoveData} data which specify id of container which we want to move
 *                         and position
 * @return {IContent}
 */
export declare const move: (content: IContent, data: IMoveData) => IContent;
