import { ILooseObject } from './@types/general';
declare type OperationType = 'init' | 'add' | 'move' | 'remove' | 'edit' | 'lock' | 'unlock';
export interface IOperation {
    commit: string;
    order: number;
    type: OperationType;
    payload: ICommitPayload;
}
interface ICommitPayload {
    id?: string;
    type?: string;
    data: ILooseObject;
    templateId?: string;
}
interface ICommit {
    commit: string;
    type: OperationType;
    payload: ICommitPayload;
}
interface IPullData {
    commits: ICommit[];
    last: {
        commit: string;
        order: number;
    } | null;
}
interface IDiffState {
    updates: IOperation[];
    state: 'same' | 'ahead' | 'behind' | 'incorrect';
}
/**
 * Delta language object. This object is used to handle whole language
 * sequence. To make some local changes before they are accepted. This object
 * helps you to do all you need with delta language and keeps data consistent.
 */
export declare class Delta {
    private _length;
    private _commited;
    constructor();
    /**
     * Simple getter for length propery, which cannot be change from outside of
     * class
     *
     * @return {number}
     */
    readonly length: number;
    /**
     * Commit some operations into buffer (local changes). Commits will be
     * stored here until push is called
     *
     * @param {OperationType} type
     * @return {string} id of this commit
     */
    commit(type: OperationType, payload: ICommitPayload): string;
    /**
     * This function add commits into buffer. But here we assume already builded
     * commits, for example sended from client to server.
     *
     * @param {ICommit[]} data
     * @return {void}
     */
    forceCommit(data: ICommit[]): void;
    /**
     * Import function just gets array of operations and copy them into this
     * object
     *
     * @param {IOperation[]} data
     * @return {void}
     */
    import(data: IOperation[]): void;
    /**
     * Export function is just alias for standard values function
     *
     * @return {IOperation[]}
     */
    export(): IOperation[];
    /**
     * Simple method which returns all operations in array.
     *
     * @return {IOperation[]}
     */
    values(): IOperation[];
    /**
     * Push function gets all commits and create a final operations from them
     * and add it into sequence
     *
     * @return {void}
     */
    push(): void;
    /**
     * Simple function to revert commits in buffer. Parameter num specify how
     * many commits from the end of buffer (from the newest commit) will be
     * reverted. If parameter num is not specified, than revert all commits.
     *
     * @param {number} num of commits which will be reverted
     * @return {number} number of successfuly reverted commits
     */
    revert(num?: number): number;
    /**
     * This function prepare data for server. It's generate and object with
     * information about changes in this delta language
     *
     * @return {IPullData}
     */
    pull(): IPullData;
    /**
     * Check differences between state of this delta language and pulled data
     * from another delta language
     *
     * @param {IPullData} data
     * @return {IDiffState}
     */
    diff(data: IPullData): IDiffState;
    /**
     * Update data
     *
     * @param {IOperation[]} data
     * @return {void}
     */
    update(data: IOperation[]): void;
    /**
     * Simple function just to erase all data stored
     *
     * @return {void}
     */
    private erase;
    /**
     * Get operations from some order
     *
     * @param {number} order;
     * @return {IOperation[]}
     */
    private operationsFromOrder;
}
export {};
