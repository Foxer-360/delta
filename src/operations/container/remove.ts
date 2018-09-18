import { IContainer, IContent } from '@source/@types';
import { sam } from '@source/utils';

export interface IRemoveData {
  id: string;
}

/**
 * Remove operation for container.
 *
 * @param {IContent} content
 * @return {IContent}
 */
export const remove = (content: IContent, data: IRemoveData): IContent => {
  const mutation = (object: IContainer) => {
    return undefined;
  };

  const res = sam(content, data.id, mutation);
  return res;
};
