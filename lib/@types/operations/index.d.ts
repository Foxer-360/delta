import { IContent, ILooseObject, OperationType } from '../@types';
import * as component from './component';
import * as container from './container';
/**
 * Definition of Operation Types
 */
declare const Types: ILooseObject<OperationType>;
/**
 * Init operation, this operation will create a new content container
 *
 * @return {IContent} empty content container
 */
declare const init: () => IContent;
export { init, component, container, Types, };
