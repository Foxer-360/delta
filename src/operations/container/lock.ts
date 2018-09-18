import { IContainer, IContent } from '@source/@types';
import { sam } from '@source/utils';

export interface ILockData {
  id: string; // ID of component
  lock: boolean; // state of lock
}

export const lock = (content: IContent, data: ILockData) => {
  const mutation = (object: IContainer) => {
    return {
      ...object,
      lock: data.lock,
    };
  };

  const res = sam(content, data.id, mutation);
  return res
};
