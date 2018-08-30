/**
 * Generate initial ID, which is simple zero.
 *
 * @return {string}
 */
export const init = () => {
  return '#0';
};

/**
 * Generate next ID depends on given ID
 *
 * @param {string} id
 * @return {string}
 */
export const next = (id: string) => {
  const num = Number(id.replace('#', ''));
  if (isNaN(num)) {
    throw new Error('Invalid ID');
  }

  return `#${num + 1}`;
};

/**
 * Generate prev ID depends on given ID
 *
 * @param {string} id
 * @return {string}
 */
export const prev = (id: string) => {
  const num = Number(id.replace('#', ''));
  if (isNaN(num)) {
    throw new Error('Invalid ID');
  }
  if (num < 0) {
    throw new Error('There is no previous ID');
  }

  return `#${num - 1}`;
};
