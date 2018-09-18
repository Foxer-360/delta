import { IComponent, IContent, ILooseObject } from '@source/@types';
import { sam } from '@source/utils';

export interface IUpdateData {
  id: string; // ID of component which we want to update
  data: ILooseObject;
}

/**
 * Update component object in content of some container. This method is not
 * used to lock component or change position or something else. This method
 * can olny change data attribute in component object.
 *
 * @param {IContent} content
 * @param {IUpdateData} data
 * @param {IContent}
 */
export const update = (content: IContent, data: IUpdateData): IContent => {
 const mutation = (object: IComponent) => {
   return {
     ...object,
     data: {
       ...data.data
     }
   }
 };

 const res = sam(content, data.id, mutation);
  return res;
};
