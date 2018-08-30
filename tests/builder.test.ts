import { builder } from '@source/.';
import { DeltaLanguage, IContent } from '@source/@types';

// Try invalid language error
test('Invalid language', () => {
  const lang = [] as DeltaLanguage;
  const res = {
    content: [],
    id: 'root',
    idBuffer: '#0',
  } as IContent;

  expect(() => {
    builder(lang)
  }).toThrow('Invalid delta language');
});

// Create just empty content
test('Create empty content', () => {
  const lang = [
    { type: 'init' },
  ] as DeltaLanguage;
  const res = {
    content: [],
    id: 'root',
    idBuffer: '#0',
  };

  expect(builder(lang)).toMatchObject(res);
});

// Add new container into empty content
test('Add new container', () => {
  const lang = [
    { type: 'init' },
    { type: 'container:add', data: { position: 0, parent: 'root' } },
  ] as DeltaLanguage;

  const res = {
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

  expect(builder(lang)).toMatchObject(res);
});

// Remove container from content
test('Remove container', () => {
  const lang = [
    { type: 'container:remove', data: { id: '#0' } },
  ] as DeltaLanguage;

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

  const res = {
    content: [],
    id: 'root',
    idBuffer: '#1',
  } as IContent;

  expect(builder(lang, content)).toMatchObject(res);
});

// Move container
test('Move container', () => {
  const lang = [
    { type: 'container:move', data: { id: '#0', position: 1 } },
  ] as DeltaLanguage;

  const content = {
    content: [
      { id: '#0', position: 0, type: 'container', content: [] },
      { id: '#1', position: 1, type: 'container', content: [] },
      { id: '#2', position: 2, type: 'component', data: {} },
    ],
    id: 'root',
    idBuffer: '#3',
  } as IContent;

  const res = {
    content: [
      { id: '#1', position: 0, type: 'container', content: [] },
      { id: '#0', position: 1, type: 'container', content: [] },
      { id: '#2', position: 2, type: 'component', data: {} },
    ],
    id: 'root',
    idBuffer: '#3',
  } as IContent;

  expect(builder(lang, content)).toMatchObject(res);
});

// Update container
test('Update container', () => {
  const lang = [
    { type: 'container:update', data: { id: '#0' } },
  ] as DeltaLanguage;

  const content = {
    content: [
      { id: '#0', position: 0, type: 'container', content: [] },
    ],
    id: 'root',
    idBuffer: '#1',
  } as IContent;

  expect(builder(lang, content)).toEqual(content);
});

// Add new component in root
test('Add new component in root', () => {
  const lang = [
    { type: 'component:add', data: { parent: 'root' } },
  ] as DeltaLanguage;

  const content = {
    content: [],
    id: 'root',
    idBuffer: '#0',
  } as IContent;

  const res = {
    content: [
      { id: '#0', type: 'component', position: 0, data: {} },
    ],
    id: 'root',
    idBuffer: '#1',
  } as IContent;

  expect(builder(lang, content)).toEqual(res);
});

// Add new component in root with some content
test('Add new component in root with some content', () => {
  const lang = (pos: number) => ([
    { type: 'component:add', data: { parent: 'root', position: pos } },
  ]) as DeltaLanguage;

  const content = {
    content: [
      { id: '#0', type: 'component', position: 0, data: {} },
      { id: '#1', type: 'container', position: 1, content: [] },
      { id: '#2', type: 'component', position: 2, data: {} },
    ],
    id: 'root',
    idBuffer: '#3',
  } as IContent;

  const resOne = {
    content: [
      { id: '#3', type: 'component', position: 0, data: {} },
      { id: '#0', type: 'component', position: 1, data: {} },
      { id: '#1', type: 'container', position: 2, content: [] },
      { id: '#2', type: 'component', position: 3, data: {} },
    ],
    id: 'root',
    idBuffer: '#4',
  } as IContent;

  const resTwo = {
    content: [
      { id: '#0', type: 'component', position: 0, data: {} },
      { id: '#3', type: 'component', position: 1, data: {} },
      { id: '#1', type: 'container', position: 2, content: [] },
      { id: '#2', type: 'component', position: 3, data: {} },
    ],
    id: 'root',
    idBuffer: '#4',
  } as IContent;

  const resThree = {
    content: [
      { id: '#0', type: 'component', position: 0, data: {} },
      { id: '#1', type: 'container', position: 1, content: [] },
      { id: '#3', type: 'component', position: 2, data: {} },
      { id: '#2', type: 'component', position: 3, data: {} },
    ],
    id: 'root',
    idBuffer: '#4',
  } as IContent;

  const resFour = {
    content: [
      { id: '#0', type: 'component', position: 0, data: {} },
      { id: '#1', type: 'container', position: 1, content: [] },
      { id: '#2', type: 'component', position: 2, data: {} },
      { id: '#3', type: 'component', position: 3, data: {} },
    ],
    id: 'root',
    idBuffer: '#4',
  } as IContent;

  expect(builder(lang(0), content)).toEqual(resOne);
  expect(builder(lang(1), content)).toEqual(resTwo);
  expect(builder(lang(2), content)).toEqual(resThree);
  expect(builder(lang(3), content)).toEqual(resFour);

  expect(builder(lang(-6), content)).toEqual(resOne);
  expect(builder(lang(6), content)).toEqual(resFour);
  expect(builder(lang(-1), content)).toEqual(resFour);
});

// Add new component deep with some content
test('Add new component deep with some content', () => {
  const lang = [
    { type: 'component:add', data: { parent: '#2', position: 0 } },
  ] as DeltaLanguage;

  const content = {
    content: [
      { content: [
        { content: [
          { content: [
            { data: {}, id: '#3', position: 0, type: 'component' },
          ], id: '#2', position: 0, type: 'container' },
        ], id: '#1', position: 0, type: 'container' },
      ], id: '#0', position: 0, type: 'container' },
    ],
    id: 'root',
    idBuffer: '#4',
  } as IContent;

  const res = {
    content: [
      { content: [
        { content: [
          { content: [
            { data: {}, id: '#4', position: 0, type: 'component' },
            { data: {}, id: '#3', position: 1, type: 'component' },
          ], id: '#2', position: 0, type: 'container' },
        ], id: '#1', position: 0, type: 'container' },
      ], id: '#0', position: 0, type: 'container' },
    ],
    id: 'root',
    idBuffer: '#5',
  } as IContent;

  expect(builder(lang, content)).toEqual(res);
});

// Move component in root with other objects
test('Move component in root with other objects', () => {
  const lang = (pos: number) => ([
    { type: 'component:move', data: { id: '#1', position: pos } },
  ]) as DeltaLanguage;

  const content = {
    content: [
      { content: [], id: '#0', position: 0, type: 'container' },
      { data: {}, id: '#1', position: 1, type: 'component' },
      { data: {}, id: '#2', position: 2, type: 'component' },
    ],
    id: 'root',
    idBuffer: '#3',
  } as IContent;

  const resOne = {
    content: [
      { content: [], id: '#0', position: 0, type: 'container' },
      { data: {}, id: '#1', position: 1, type: 'component' },
      { data: {}, id: '#2', position: 2, type: 'component' },
    ],
    id: 'root',
    idBuffer: '#3',
  } as IContent;

  const resTwo = {
    content: [
      { data: {}, id: '#1', position: 0, type: 'component' },
      { content: [], id: '#0', position: 1, type: 'container' },
      { data: {}, id: '#2', position: 2, type: 'component' },
    ],
    id: 'root',
    idBuffer: '#3',
  } as IContent;

  const resThree = {
    content: [
      { content: [], id: '#0', position: 0, type: 'container' },
      { data: {}, id: '#2', position: 1, type: 'component' },
      { data: {}, id: '#1', position: 2, type: 'component' },
    ],
    id: 'root',
    idBuffer: '#3',
  } as IContent;

  expect(builder(lang(1), content)).toEqual(resOne);
  expect(builder(lang(0), content)).toEqual(resTwo);
  expect(builder(lang(2), content)).toEqual(resThree);
});

// Remove component in deep tree
test('Remove component in deep tree', () => {
  const lang = [
    { type: 'component:remove', data: { id: '#3'} },
  ] as DeltaLanguage;

  const content = {
    content: [
      { content: [
          { content: [
              { content: [
                  { data: {}, id: '#3', position: 0, type: 'component' },
                ], id: '#2', position: 0, type: 'container' },
            ], id: '#1', position: 0, type: 'container' },
        ], id: '#0', position: 0, type: 'container' },
    ],
    id: 'root',
    idBuffer: '#4',
  } as IContent;

  const res = {
    content: [
      { content: [
          { content: [
              { content: [], id: '#2', position: 0, type: 'container' },
            ], id: '#1', position: 0, type: 'container' },
        ], id: '#0', position: 0, type: 'container' },
    ],
    id: 'root',
    idBuffer: '#4',
  } as IContent;

  expect(builder(lang, content)).toEqual(res);
});

// Update component data
test('Update component data', () => {
  const lang = [
    { type: 'component:update', data: { id: '#1', data: { name: 'Delta', surname: 'Language' } } },
  ] as DeltaLanguage;

  const content = {
    content: [
      { content: [], id: '#0', position: 0, type: 'container' },
      { data: { name: '', surname: '' }, id: '#1', position: 1, type: 'component' },
      { content: [], id: '#2', position: 2, type: 'container' },
    ],
    id: 'root',
    idBuffer: '#3',
  } as IContent;

  const res = {
    content: [
      { content: [], id: '#0', position: 0, type: 'container' },
      { data: { name: 'Delta', surname: 'Language' }, id: '#1', position: 1, type: 'component' },
      { content: [], id: '#2', position: 2, type: 'container' },
    ],
    id: 'root',
    idBuffer: '#3',
  } as IContent;

  expect(builder(lang, content)).toEqual(res);
});
