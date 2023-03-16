import { DateObject } from 'react-multi-date-picker';

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
      return [data[0], data[data.length - 1]].filter(Boolean).map((str) => str.trim()).join(',');
    }
    return '';
  },
};

const optionCategories = {
  singleValue: {
    is: {},
    hasExactly: {},
    before: {},
    after: {},
  },
  multiValue: {
    hasAll: {
      type: 'array',
    },
    hasAny: {
      type: 'array',
    },
  },
  rangeValue: {
    between: {
      type: 'array',
      conditions: {
        min: 2,
      },
    },
  },
};

// Write special handling for identifier Name categories
const identifierNameCategories = {
  Text: {
    type: String,
  },
  Date: {
    type: DateObject,
  },
  Number: {
    type: Number,
  },
};

const isSingleValue = (checkName) => !!optionCategories.singleValue[checkName];
const isMultipleValue = (checkName) => !!optionCategories.multiValue[checkName];
const isRangeValue = (checkName) => !!optionCategories.rangeValue[checkName];

const selectOption = (option) => {
  let type = null;
  let selectedOption = null;
  Object.entries(optionCategories).forEach(([key, operations]) => {
    if (Object.keys(operations).includes(option)) {
      type = key;
      selectedOption = operations[option];
    }
  });
  return type && selectedOption ? { type, selectedOption } : null;
};

const identifierOperationHandlers = (identifierOperation, data) => {
  let result = '';
  const selectedOption = selectOption(identifierOperation);
  if (selectedOption) {
    result = (
      selectedOption.selectedOption.handle ?? commonIdentifierCategoriesHandler[selectedOption.type]
    )(data);
  }
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
  isSingleValue, isRangeValue, isMultipleValue, optionCategories,
  identifierNameCategories, selectOption, parseSingleQuery,
};
