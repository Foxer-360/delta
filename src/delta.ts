import { v4 as uuid } from 'uuid';
import { ILooseObject } from '@source/@types/general';

type OperationType = 'init' | 'add' | 'move' | 'remove' | 'edit' | 'lock' | 'unlock';

export interface IOperation {
  commit: string;
  order: number;
  type: OperationType;
  payload: ICommitPayload;
}

interface ICommitPayload {
  id?: string; // If it's necessary to specify which element
  type?: string; // Element type. If creating, than it's necessary to specify if component/container
  data: ILooseObject; // Data object specific for given operation and element in content
  templateId?: string; // ID of used template of data for component. If not defined, no template is used
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
  state: 'same' | 'ahead' | 'behind' | 'incorrect'; // ahead means, that delta which call diff has more operations
}

/**
 * Delta language object. This object is used to handle whole language
 * sequence. To make some local changes before they are accepted. This object
 * helps you to do all you need with delta language and keeps data consistent.
 */
export class Delta {

  // tslint:disable-next-line:variable-name
  private _length = 0 as number;

  // tslint:disable-next-line:variable-name
  private _commited: ICommit[];

  constructor() {
    // Nothing to do now
    this._commited = Array();
  }

  /**
   * Simple getter for length propery, which cannot be change from outside of
   * class
   *
   * @return {number}
   */
  public get length(): number {
    return this._length;
  }

  /**
   * Commit some operations into buffer (local changes). Commits will be
   * stored here until push is called
   *
   * @param {OperationType} type
   * @return {string} id of this commit
   */
  public commit(type: OperationType, payload: ICommitPayload): string {
    const id = uuid();

    this._commited.push({
      commit: id,
      type,
      payload,
    } as ICommit);

    return id;
  }

  /**
   * This function add commits into buffer. But here we assume already builded
   * commits, for example sended from client to server.
   *
   * @param {ICommit[]} data
   * @return {void}
   */
  public forceCommit(data: ICommit[]): void {
    this._commited.splice(-1, 0, ...data);
  }

  /**
   * Import function just gets array of operations and copy them into this
   * object
   *
   * @param {IOperation[]} data
   * @return {void}
   */
  public import(data: IOperation[]): void {
    this.erase();
    for (const op of data) {
      this[this._length] = { ...op };
      this._length++;
    }
  }

  /**
   * Export function is just alias for standard values function
   *
   * @return {IOperation[]}
   */
  public export(): IOperation[] {
    return this.values();
  }

  /**
   * Simple method which returns all operations in array.
   *
   * @return {IOperation[]}
   */
  public values(): IOperation[] {
    const res = [] as IOperation[];

    for (let i = 0; i < this._length; i++) {
      res.push(this[i]);
    }

    return res;
  }

  /**
   * Push function gets all commits and create a final operations from them
   * and add it into sequence
   *
   * @return {void}
   */
  public push(): void {
    for (const c of this._commited) {
      // Add into this object as if this object is array
      this[this._length] = {
        ...c,
        order: this._length,
      } as IOperation;
      this._length++;
    }

    // Clear commited array
    this.revert();
  }

  /**
   * Simple function to revert commits in buffer. Parameter num specify how
   * many commits from the end of buffer (from the newest commit) will be
   * reverted. If parameter num is not specified, than revert all commits.
   *
   * @param {number} num of commits which will be reverted
   * @return {number} number of successfuly reverted commits
   */
  public revert(num?: number): number {
    const len = this._commited.length;
    if (!num) {
      // Remove all commits
      this._commited = Array();
      return len;
    }

    let count = 0;
    for (let i = 0; i < num; i++) {
      const p = this._commited.pop();
      if (!p) {
        // Commits are empty, just break cycle and let fce to return value
        break;
      }

      count++;
    }
    return count;
  }

  /**
   * This function prepare data for server. It's generate and object with
   * information about changes in this delta language
   *
   * @return {IPullData}
   */
  public pull(): IPullData {
    let last = this[this._length - 1];
    if ( !last ) {
      last = null;
    } else {
      last = { commit: last.commit, order: last.order };
    }

    const res = {
      commits: [ ...this._commited ],
      last,
    };

    return res;
  }

  /**
   * Check differences between state of this delta language and pulled data
   * from another delta language
   *
   * @param {IPullData} data
   * @return {IDiffState}
   */
  public diff(data: IPullData): IDiffState {
    // For now, just check if this delta has some changes
    if (!data.last) {
      if (this._length < 1) {
        // No changes
        return {
          state: 'same',
          updates: [],
        } as IDiffState;
      } else {
        // All changes
        return {
          state: 'ahead',
          updates: this.export(),
        } as IDiffState;
      }
    }

    const res = {
      state: 'incorrect',
      updates: [],
    } as IDiffState;

    const last = this[this._length - 1] as IOperation;
    if (!last) {
      return res;
    }
    const dlast = data.last as { commit: string; order: number };

    if (last.order < dlast.order) {
      // other delta has something more
      res.state = 'behind';
    } else if (last.order > dlast.order) {
      // we have something more
      res.updates = this.operationsFromOrder(dlast.order);
      res.state = 'ahead';
    } else {
      // Check if it's correct
      if (last.commit === dlast.commit) {
        // No changes
        res.state = 'same';
      }
    }

    return res;
  }

  /**
   * Update data
   *
   * @param {IOperation[]} data
   * @return {void}
   */
  public update(data: IOperation[]): void {
    for (const o of data) {
      this[this._length] = { ...o };
      this._length++;
    }
  }

  /**
   * Simple function just to erase all data stored
   *
   * @return {void}
   */
  private erase(): void {
    for (let i = this._length - 1; i >= 0; i--) {
      delete this[i];
    }
    this._length = 0;
  }

  /**
   * Get operations from some order
   *
   * @param {number} order;
   * @return {IOperation[]}
   */
  private operationsFromOrder(order: number): IOperation[] {
    const res = [] as IOperation[];
    for (let i = 0; i < this._length; i++) {
      if (this[i].order > order) {
        res.push(this[i]);
      }
    }

    return res;
  }

}
