import { ContentObject, IComponent, IContainer, IContent } from './content';
import { ILooseObject, IPosLooseObject } from './general';

/**
 * Operetain type is a list of allowed (supported) types of operations which
 * delta language can contains
 */
type OperationType = 'init' | 'container:add' | 'container:remove' | 'container:move' | 'container:update' |
  'component:add' | 'component:move' | 'component:remove' | 'component:update';

/**
 * Define operation in delta language. Delta language is only sorted sequence
 * of these operations (characters)
 */
interface IOperation {
  type: OperationType;
  data: ILooseObject<any>;
}

/**
 * Definition of Delta language type. It is simply array of operations
 * (IOperation)
 */
type DeltaLanguage = IOperation[];

export {
  DeltaLanguage,
  IOperation,
  OperationType,

  // Export definitions from general
  ILooseObject,
  IPosLooseObject,

  // Export definitions from content
  ContentObject,
  IComponent,
  IContainer,
  IContent,
};
