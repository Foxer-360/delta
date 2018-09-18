import { IComponent, IContent } from '@source/@types';
import { sam } from '@source/utils';

export interface IRemoveData {
  id: string; // ID of component which we want to remove from container
}

/**
 * Remove component from content of some container
 *
 * @param {IContent} content
 * @param {IRemoveData} data
 * @return {IContent}
 */
export const remove = (content: IContent, data: IRemoveData): IContent => {
  const mutation = (object: IComponent) => {
    return undefined;
  };

  const res = sam(content, data.id, mutation);
  return res;
};
