import { camelize } from './strings';

// the if conditions for the condition are temporary as options are not full in database.
// isQuery = false in case of parsing a memo. true in case of query.
const parseSingleQuery = (searchField, index, isQuery) => {
  let searchQuery = '';

  if (!searchField.identifier) return searchQuery;

  if (index) {
    searchQuery += ' ';
    searchQuery += (searchField.operator);
    searchQuery += ' ';
  }

  if (isQuery) {
    searchQuery += (searchField.identifier.identiferStrId);
    searchQuery += ' ';
  } else {
    searchQuery += (searchField.identifier.identiferName);
    searchQuery += ': ';
  }

  if (searchField.condition && isQuery) {
    searchQuery += camelize(searchField.condition.optionName);
  } else if (searchField.condition && !isQuery) {
    searchQuery += (searchField.condition.optionName);
    searchQuery += ':';
  }

  searchQuery += ' "';

  if (searchField.condition && searchField.condition.optionName === 'Has Any' && searchField.identifier.identifierType !== 'Date') searchQuery += (searchField.data.trim().replace(/\s+/g, ','));// replace spaces with a comma
  else if (searchField.identifier.identifierType === 'Date' && searchField.data) searchQuery += (searchField.data.format('YYYY-MM-DD'));
  else searchQuery += (searchField.data.trim().replace(/\s+/g, ' '));// replace one more spaces with one space (remove extra middle spaces)
  searchQuery += '"';

  return searchQuery;
};

/* eslint-disable-next-line import/prefer-default-export */
export { parseSingleQuery };
