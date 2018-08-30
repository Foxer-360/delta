import { ILooseObject } from '.';

/**
 * Container object of content. This is just layout thing and it's handy for
 * creating layouts with fixed headers, etc
 */
interface IContainer {
  id: string;
  content: ContentObject[];
  position: number;
  type: 'container',
  lock: boolean;
}

/**
 * Component object of content. This is object of some real component, which
 * has no other content in it. This component is a leave in the tree of
 * content.
 */
interface IComponent {
  id: string;
  position: number;
  data: ILooseObject<any>;
  type: 'component';
  plugins: string[];
  name: string;
  lock: boolean;
}

/**
 * Define general object of content. It's just all types together.
 */
type ContentObject = IContainer | IComponent;

/**
 * Define general content object, which is result of delta language.
 */
interface IContent {
  id: 'root';
  content: ContentObject[];
  idBuffer: string;
  lastCommit: string;
}

export {
  ContentObject,
  IComponent,
  IContainer,
  IContent,
};
