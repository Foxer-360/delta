import { ContentObject, IContainer, IContent } from '@source/@types';
import { findParentId, moveObjectInArray, sam } from '@source/utils';

export interface IMoveData {
  id: string; // ID of component which we want to move to new position
  position: number; // New position of given component
}

/**
 * Move given component in content of container.
 *
 * @param {IContent} content
 * @param {IMoveData} data
 * @return {IContent}
 */
export const move = (content: IContent, data: IMoveData): IContent => {
  // First find parent id
  const parentId = findParentId(content, data.id);

  // If parent ID doesn't exist, than component also doesn't exist or content
  // is inconsistent
  if (!parentId) {
    return content;
  }

  const mutation = (parent: IContainer) => {
    // Find current position of given component
    let current = -1;
    parent.content.forEach((child: ContentObject) => {
      if (child.id === data.id) {
        current = child.position;
      }
    });

    if (current < 0) {
      // Nothing to change, child doesn't exists
      return null;
    }

    const moved = moveObjectInArray(parent.content, current, data.position);

    return {
      ...parent,
      content: moved,
    }
  };

  const res = sam(content, parentId, mutation);
  return res;
};
