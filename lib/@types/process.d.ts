import { IContent } from './@types';
import { IOperation } from './delta';
/**
 * Simple function which get operation and content and just call correspond function
 * from operations to change content by this operation
 *
 * @param {IOperation} operation which will be performed
 * @param {IContent} content
 * @return {IContent}
 */
declare const process: (operation: IOperation, content: IContent | null) => IContent;
export { process, };
