import { ContentObject, IContainer, IContent } from '@source/@types';
import { findParentId, moveObjectInArray, sam } from '@source/utils';

export interface IMoveData {
  id: string;
  position: number;
}

/**
 * Move container in content of another container. Automatically recalculate
 * positions in objects and sort array to keep data consistent
 * @param {IContent} content
 * @param {IMoveData} data which specify id of container which we want to move
 *                         and position
 * @return {IContent}
 */
export const move = (content: IContent, data: IMoveData): IContent => {
  // First find parent id
  const parentId = findParentId(content, data.id);

  // If parent ID doesn't exists, then this doesn't exists or has no parent
  // and there is nothing to move
  if (!parentId) {
    return content;
  }

  const mutation = (parent: IContainer) => {
    // Find current position of container
    let current = -1;
    parent.content.forEach((child: ContentObject) => {
      if (child.id === data.id) {
        current = child.position; // Same as index in array, otherwise content is invalid
      }
    });

    if (current < 0) {
      // Nothing to change, child was not found or has invalid properties
      return null;
    }

    const moved = moveObjectInArray(parent.content, current, data.position);

    return {
      ...parent,
      content: moved,
    };
  };

  const res = sam(content, parentId, mutation);
  return res;
};
