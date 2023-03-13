const commonIdentifierCategoriesHandler = {
  singleValue(data) {
    return Array.isArray(data) ? data[0].trim() : data.trim();
  },
  multiValue(data) {
    let result = data;
    if (!Array.isArray(data)) {
      result = result.split(/ (?=(?:[^"]*"[^"]*")*[^"]*$)/).map((substr) => substr.replace(/"/g, ''));
    }
    return result.filter(Boolean).map((str) => str.trim()).join(',');
  },
  rangeValue(data) {
    if (Array.isArray(data) && data.length >= 2) {
      return data.slice(0, 2).filter(Boolean).map((str) => str.trim()).join(',');
    }
    return '';
  },
};

const identifierCategories = {
  singleValue: {
    is: {},
    hasExactly: {},
    before: {},
    after: {},
  },
  multiValue: {
    hasAll: {},
    hasAny: {},
  },
  rangeValue: {
    between: {},
  },
};

const isSingleValue = (checkName) => !!identifierCategories.singleValue[checkName];
const isMultipleValue = (checkName) => !!identifierCategories.multiValue[checkName];
const isRangeValue = (checkName) => !!identifierCategories.rangeValue[checkName];

const identifierOperationHandlers = (identifierOperation, data) => {
  let result = '';
  Object.entries(identifierCategories).forEach(([key, operations]) => {
    if (Object.keys(operations).includes(identifierOperation)) {
      result = (
        operations[identifierOperation].handle ?? commonIdentifierCategoriesHandler[key]
      )(data);
    }
  });
  return result;
};

const getTextFromField = (searchField) => {
  let preHandledData = searchField.data;

  if (!preHandledData) return '';

  if (searchField.identifier?.identifierType === 'Date') {
    if (Array.isArray(preHandledData)) {
      preHandledData = preHandledData.map((date) => date.format('YYYY-MM-DD'));
    } else {
      preHandledData = preHandledData.format('YYYY-MM-DD');
    }
  }
  return identifierOperationHandlers(searchField.condition?.optionParserName, preHandledData) || '';
};

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
    searchQuery += searchField.condition.optionParserName;
  } else if (searchField.condition && !isQuery) {
    searchQuery += (searchField.condition.optionName);
    searchQuery += ':';
  }

  searchQuery += ` "${getTextFromField(searchField)}"`;

  return searchQuery;
};

export {
  isSingleValue, isRangeValue, isMultipleValue, identifierCategories, parseSingleQuery,
};
