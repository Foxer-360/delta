import { IContent } from '../../@types';
export interface ILockData {
    id: string;
    lock: boolean;
}
export declare const lock: (content: IContent, data: ILockData) => any;
