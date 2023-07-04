import { get } from 'wild-wild-path';

function getProperties(obj, propertyNames) {
  return Object.entries(propertyNames).reduce((acc, [propertyName, propertyPath]) => {
    const value = get(obj, propertyPath);
    if (Array.isArray(value)) {
      acc[propertyName] = value.join(' ');
    } else {
      acc[propertyName] = value;
    }
    return acc;
  }, {});
}

// eslint-disable-next-line import/prefer-default-export
export { getProperties };
