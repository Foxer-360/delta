import { IContainer, IContent, IComponent } from './@types';
import { Delta, IOperation } from './delta';
/**
 * Builder function. This function accepts delta language and build a content
 * from this language. This function also can accepts as optional parameter
 * some content and than this builder starts build language on this content.
 * But if some 'character' in language is init operation, than previous state
 * of content will be erased
 *
 * @param {DeltaLanguage} lang
 * @param {IContent} content?
 * @return {IContent}
 * @throws {Error}
 */
declare const builder: (delta: Delta, content?: IContent | undefined) => IContent;
declare const getObjectFromContent: (content: IContent, id: string) => IContainer | IComponent | null;
export { builder, Delta, getObjectFromContent, IContent, IComponent, IOperation, };
