import { IContent } from '../../@types';
export interface IUpdateData {
    id: string;
}
export declare const update: (content: IContent, data: IUpdateData) => IContent;
