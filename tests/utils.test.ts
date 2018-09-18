import { IPosLooseObject } from '@source/@types';
import { addObjectInArray, moveObjectInArray } from '@source/utils';

// Array can be empty
test('Empty array to sort', () => {
  expect(moveObjectInArray([], 0, 0)).toEqual([]);
});

// Invalid position arguments
test('Invalid position arguments', () => {
  const input = [
    { id: '#1', position: 0 },
  ] as IPosLooseObject[];

  expect(moveObjectInArray(input, 3, 2)).toEqual(input);
  expect(moveObjectInArray(input, 0, 2)).toEqual(input);
  expect(moveObjectInArray(input, 2, 0)).toEqual(input);
});

// Move only one object
test('Move only one object', () => {
  const input = [
    { id: '#1', position: 0 },
  ] as IPosLooseObject[];

  expect(moveObjectInArray(input, 0, 0)).toEqual(input);
});

// Scenario with more components
test('Scenario with more components', () => {
  const input = [
    { id: '#1', position: 0 },
    { id: '#2', position: 1 },
    { id: '#3', position: 2 },
    { id: '#4', position: 3 },
  ] as IPosLooseObject[];

  const resOne = [
    { id: '#4', position: 0 },
    { id: '#1', position: 1 },
    { id: '#2', position: 2 },
    { id: '#3', position: 3 },
  ] as IPosLooseObject[];

  const resTwo = [
    { id: '#2', position: 0 },
    { id: '#3', position: 1 },
    { id: '#4', position: 2 },
    { id: '#1', position: 3 },
  ] as IPosLooseObject[];

  const resThree = [
    { id: '#1', position: 0 },
    { id: '#3', position: 1 },
    { id: '#2', position: 2 },
    { id: '#4', position: 3 },
  ] as IPosLooseObject[];

  expect(moveObjectInArray(input, 3, 0)).toEqual(resOne);
  expect(moveObjectInArray(input, 0, 3)).toEqual(resTwo);
  expect(moveObjectInArray(input, 1, 2)).toEqual(resThree);
  expect(moveObjectInArray(input, 2, 1)).toEqual(resThree);
});

// Add object into empty array
test('Add object into empty array', () => {
  const obj = {
    id: '#1',
    position: -1,
  } as IPosLooseObject;

  const res = [
    { id: '#1', position: 0},
  ] as IPosLooseObject[];

  expect(addObjectInArray([], obj)).toEqual(res);
  expect(addObjectInArray([], obj, 0)).toEqual(res);
  expect(addObjectInArray([], obj, -3)).toEqual(res);
  expect(addObjectInArray([], obj, 4)).toEqual(res);
});

// Add object into array with only one element
test('Add object into array with only one element', () => {
  const arr = [
    { id: '#1', position: 0 },
  ] as IPosLooseObject[];

  const obj = { id: '#2', position: -1 };

  const resOne = [
    { id: '#1', position: 0 },
    { id: '#2', position: 1 },
  ];

  const resTwo = [
    { id: '#2', position: 0 },
    { id: '#1', position: 1 },
  ];

  expect(addObjectInArray(arr, obj)).toEqual(resOne);
  expect(addObjectInArray(arr, obj, 0)).toEqual(resTwo);
});

// Add object into array with many elements
test('Add object into array with many elements', () => {
  const arr = [
    { id: '#1', position: 0 },
    { id: '#2', position: 1 },
    { id: '#3', position: 2 },
  ] as IPosLooseObject[];

  const obj = { id: '#4', position: -1 };

  const resOne = [
    { id: '#1', position: 0 },
    { id: '#2', position: 1 },
    { id: '#3', position: 2 },
    { id: '#4', position: 3 },
  ];

  const resTwo = [
    { id: '#1', position: 0 },
    { id: '#2', position: 1 },
    { id: '#4', position: 2 },
    { id: '#3', position: 3 },
  ];

  const resThree = [
    { id: '#1', position: 0 },
    { id: '#4', position: 1 },
    { id: '#2', position: 2 },
    { id: '#3', position: 3 },
  ];

  const resFour = [
    { id: '#4', position: 0 },
    { id: '#1', position: 1 },
    { id: '#2', position: 2 },
    { id: '#3', position: 3 },
  ];

  expect(addObjectInArray(arr, obj, 3)).toEqual(resOne);
  expect(addObjectInArray(arr, obj, 2)).toEqual(resTwo);
  expect(addObjectInArray(arr, obj, 1)).toEqual(resThree);
  expect(addObjectInArray(arr, obj, 0)).toEqual(resFour);

  expect(addObjectInArray(arr, obj, -1)).toEqual(resOne);
  expect(addObjectInArray(arr, obj, -2)).toEqual(resTwo);
  expect(addObjectInArray(arr, obj, -3)).toEqual(resThree);
  expect(addObjectInArray(arr, obj, -4)).toEqual(resFour);

  expect(addObjectInArray(arr, obj, 6)).toEqual(resOne);
  expect(addObjectInArray(arr, obj, -6)).toEqual(resFour);
});
