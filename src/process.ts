import { IContent } from '@source/@types';
import { component, container, init, Types } from '@source/operations'
import { IOperation } from '@source/delta';

/**
 * Simple function which get operation and content and just call correspond function
 * from operations to change content by this operation
 *
 * @param {IOperation} operation which will be performed
 * @param {IContent} content
 * @return {IContent}
 */
const process = (operation: IOperation, content: IContent | null): IContent => {
  const { type } = operation;

  if (!content && type !== 'init') {
    throw new Error('If content is null, then operation must be init');
  }

  switch (type) {
    // General operations
    case Types.init:
      content = init();
      break;

    case 'add':
      // Which type of element
      if (operation.payload.type === 'component') {
        content = component.add(content as IContent, operation.payload.data as component.IAddData);
      } else {
        content = container.add(content as IContent, operation.payload.data as container.IAddData);
      }
      break;
    case 'remove':
      // Doesn't matter if its container or component....
      content = container.remove(content as IContent, { id: operation.payload.id } as container.IRemoveData);
      break;
    case 'move':
      // Doesn't matter if its container or component...
      content = container.move(content as IContent, { id: operation.payload.id, position: operation.payload.data.position } as container.IMoveData);
      break;
    case 'edit':
      content = component.update(content as IContent, { id: operation.payload.id, data: { ...operation.payload.data }} as component.IUpdateData);
      break;
    case 'lock':
    case 'unlock':
      content = container.lock(content as IContent, { id: operation.payload.id, lock: (type === 'lock') ? true : false } as container.ILockData);
      break;

    default:
      content = content as IContent;
      break;
  }

  if (!content) {
    content = init();
  }
  content.lastCommit = operation.commit;
  return content;
};

export {
  process,
};
