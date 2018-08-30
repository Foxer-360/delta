import { ContentObject, IComponent, IContainer, IContent } from './content';
import { ILooseObject, IPosLooseObject } from './general';
/**
 * Operetain type is a list of allowed (supported) types of operations which
 * delta language can contains
 */
declare type OperationType = 'init' | 'container:add' | 'container:remove' | 'container:move' | 'container:update' | 'component:add' | 'component:move' | 'component:remove' | 'component:update';
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
declare type DeltaLanguage = IOperation[];
export { DeltaLanguage, IOperation, OperationType, ILooseObject, IPosLooseObject, ContentObject, IComponent, IContainer, IContent, };
