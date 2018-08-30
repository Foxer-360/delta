import { ContentObject, IContainer, IContent, IComponent } from '@source/@types';
import { process } from '@source/process';
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
const builder = (delta: Delta, content?: IContent): IContent => {
  // Export language from delta
  const lang = delta.export();

  // If content is no provided, than first character in language must be
  // 'init'. Otherwise it's invalid language
  if (!content) {
    const firstOp = lang.shift();
    if (!firstOp || firstOp.type !== 'init') {
      throw new Error('Invalid delta language');
    }

    content = process(firstOp, null);
  }

  // Get index of last commit
  let index = -1;
  lang.forEach((e: IOperation, i: number) => {
    if (!content) return;
    if (e.commit === content.lastCommit) {
      index = i;
    }
  });

  for (let i = index + 1; i < lang.length; i++) {
    const op = lang[i];
    if (!op) {
      throw new Error('Undefined operation');
    }

    content = process(op, content);
  }

  // Go operation by operation to get content
  // while (lang.length) {
  //   const op = lang.shift();
  //   if (!op) {
  //     throw new Error('Undefined operation');
  //   }

  //   content = process(op, content);
  // }

 return content;
};

const getObjectFromContent = (content: IContent, id: string): ContentObject | null => {
  let res = null;

  const recursive = (c: IContainer | IContent) => {
    const arr = c.content;
    arr.forEach((e: ContentObject) => {
      if (e.id === id) {
        res = { ...e };
      }
      if (e.type === 'container') {
        recursive(e);
      }
    });
  };

  recursive(content);

  return res;
};

export {
  builder,
  Delta,
  getObjectFromContent,
  IContent,
  IComponent,
  IOperation,
};
