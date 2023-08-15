const search = (array, attribute, value) => (
  array.find((item) => item[attribute] === value)
);

const exclude = (inputArray, excludedArray) => (
  inputArray.filter((arrayElement) => !excludedArray.includes(arrayElement))
);

const findFirstCommonElement = (array1, array2) => array1.find((item) => array2.includes(item));

export { search, exclude, findFirstCommonElement };
