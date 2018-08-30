import { IContent, ILooseObject, OperationType } from '@source/@types';
import { id } from '@source/utils';
import * as component from './component';
import * as container from './container';

/**
 * Definition of Operation Types
 */
const Types = {
  componentAdd: 'component:add',
  componentMove: 'component:move',
  componentRemove: 'component:remove',
  componentUpdate: 'component:update',
  containerAdd: 'container:add',
  containerMove: 'container:move',
  containerRemove: 'container:remove',
  containerUpdate: 'container:update',
  init: 'init',
} as ILooseObject<OperationType>;

/**
 * Init operation, this operation will create a new content container
 *
 * @return {IContent} empty content container
 */
const init = (): IContent => {
  return {
    content: [],
    id: 'root',
    idBuffer: id.init(),
    lastCommit: 'undefined',
  };
};

export {
  init,
  component,
  container,
  Types,
}
