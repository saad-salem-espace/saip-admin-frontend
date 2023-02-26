const search = (array, attribute, value) => (
  array.find((item) => item[attribute] === value)
);

// eslint-disable-next-line import/prefer-default-export
export { search };
