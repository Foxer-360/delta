import { IContainer, IContent } from '@source/@types';
import { sam } from '@source/utils';

export interface IUpdateData {
  id: string;
}

export const update = (content: IContent, data: IUpdateData): IContent => {
  const mutation = (object: IContainer) => {
    // Nothing to update now
    return object;
  };

  const res = sam(content, data.id, mutation);
  return res;
};
