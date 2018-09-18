import { IContent } from '@source/@types';
import { findParentId } from '@source/utils';

test('Root has no parent', () => {
  const content = {
    content: [],
    id: 'root',
    idBuffer: '#0',
  } as IContent;

  expect(findParentId(content, 'root')).toBeNull();
});

test('Simple example with deep 1', () => {
  const content = {
    content: [
      {
        content: [],
        id: '#0',
        position: 0,
        type: 'container',
      }
    ],
    id: 'root',
    idBuffer: '#1',
  } as IContent;

  expect(findParentId(content, '#0')).toBe('root');
});

test('Example with deep 1 and more objects in it', () => {
  const content = {
    content: [
      { content: [], id: '#0', position: 0, type: 'container' },
      { content: [], id: '#1', position: 1, type: 'container' },
      { content: [], id: '#2', position: 2, type: 'container' },
      { content: [], id: '#3', position: 3, type: 'container' },
    ],
    id: 'root',
    idBuffer: '#4',
  } as IContent;

  expect(findParentId(content, '#2')).toBe('root');
});

test('Example with simple deep 4', () => {
  const content = {
    content: [
      {
        content: [
          {
            content: [
              {
                content: [
                  { content: [], id: '#3', position: 0, type: 'container' },
                ],
                id: '#2',
                position: 0,
                type: 'container',
              },
            ],
            id: '#1',
            position: 0,
            type: 'container',
          },
        ],
        id: '#0',
        position: 0,
        type: 'container',
      }
    ],
    id: 'root',
    idBuffer: '#4',
  } as IContent;

  expect(findParentId(content, '#3')).toBe('#2');
});
