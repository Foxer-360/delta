import { sam } from '@source/utils';

// Basic test
test('Simple test of SAM', () => {
  const obj = {};

  expect(sam(obj, 'one', null)).toMatchObject({});
});

test('Try to mutate something without content', () => {
  const obj = {
    id: 'root',
  };

  const mut = (o) => {
    return undefined;
  };

  expect(sam(obj, 'root', mut)).toBe(undefined);
});

test('Change ID', () => {
  const obj = {
    id: 'root',
  };

  const mut = (o) => {
    return {
      id: 'new-root'
    };
  };

  expect(sam(obj, 'root', mut)).toMatchObject({ id: 'new-root' });
});

// Remove object from array
test('Remove object from array', () => {
  const obj = {
    content: [
      { id: 'one' },
      { id: 'two' },
    ],
    id: 'root',
  };

  const mut = (o) => {
    return undefined;
  };

  const exp = {
    content: [
      { id: 'one' },
    ],
    id: 'root',
  };

  expect(sam(obj, 'two', mut)).toMatchObject(exp);
});

// Add object into array
test('Add object into array', () => {
  const obj = {
    content: [
      { id: 'one' }
    ],
    id: 'root',
  };

  const mut = (o) => {
    o.content = [ ...o.content, { id: 'added' } ];
    return o;
  };

  expect(sam(obj, 'root', mut)).toMatchObject({
    content: [
      { id: 'one' },
      { id: 'added' },
    ],
    id: 'root',
  });
});
