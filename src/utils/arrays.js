const search = (array, attribute, value) => (
  array.find((item) => item[attribute] === value)
);

const exclude = (inputArray, excludedArray) => (
  inputArray.filter((arrayElement) => !excludedArray.includes(arrayElement))
);

export { search, exclude };
