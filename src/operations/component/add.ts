import { ContentObject, IComponent, IContainer, IContent } from '@source/@types';
import { addObjectInArray, id, sam } from '@source/utils';

export interface IAddData {
  parent: string; // ID of parent container
  position?: number;
  name: string;
  data: {};
}

/**
 * Add new component into content at given position
 *
 * @param {IContent} content
 * @param {IAddData} data which specify shape of new component
 * @return {IContent}
 */
export const add = (content: IContent, data: IAddData): IContent => {
  const newId = content.idBuffer;
  const newComponent = {
    name: data.name,
    data: data.data,
    id: newId,
    type: 'component',
    lock: false,
  } as IComponent;

  const mutation = (o: IContainer): IContainer => {
    return {
      ...o,
      content: addObjectInArray(o.content, newComponent, data.position) as ContentObject[],
    };
  };

  if (!data.parent) {
    data.parent = 'root';
  }
  const res = sam(content, data.parent, mutation);
  return {
    ...res,
    idBuffer: id.next(newId)
  };
};
