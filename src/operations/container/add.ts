import { IContainer, IContent, ContentObject } from '@source/@types';
import { addObjectInArray, id, sam } from '@source/utils';

export interface IAddData {
  position?: number; // if position is not defined, then put it at the end
  parent: string; // id of parent
}

/**
 * Add operation for container objects. This is forward direction
 * implementation which add container in shape specified in data into content
 * and returns new content object
 *
 * @param {IContent} content on it operation will be performed
 * @param {{}} data which define how newly added container will look like
 * @return {IContent} new content
 */
export const add = (content: IContent, data: IAddData) => {
  const newId = content.idBuffer;
  const newContainer = {
    content: [],
    id: newId,
    type: 'container',
    lock: false,
    position: data.position,
  } as IContainer;

  const mutation = (parent: IContainer) => {
    return {
      ...parent,
      content: addObjectInArray(parent.content, newContainer, data.position) as ContentObject[],
    }
  };

  if (!data.parent) {
    data.parent = 'root';
  }
  const res = sam(content, data.parent, mutation);
  return {
    ...res,
    idBuffer: id.next(newId),
  };
};
