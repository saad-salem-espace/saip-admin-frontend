import { t } from 'i18next';
import { DateObject } from 'react-multi-date-picker';
import { search } from './arrays';
import { isMultipleValue, parseSingleQuery } from './searchQuery/encoder';

const operators = ['and', 'or', 'not'].map((operator) => ({
  operator: operator.toUpperCase(),
  displayName: t(`search:operators.${operator}`),
}));

const parseQuery = (fields, isQuery) => {
  let finalQuery = '';

  fields.forEach((value, index) => {
    finalQuery += parseSingleQuery(value, index, isQuery);
  });
  return finalQuery;
};

const reformatDecoder = (identifiers, queryResult) => {
  if (queryResult.length) {
    let id = 1;
    const preparedSearchFields = [{}];
    return queryResult.reduce((acc, curr) => {
      const lastCriteria = acc.slice(-1)?.[0];
      if (lastCriteria.data && lastCriteria.condition) {
        acc.push({ operator: curr.operator.toUpperCase() });
      } else {
        lastCriteria.id = id;
        lastCriteria.identifier = search(identifiers, 'identiferStrId', curr.identifier);
        lastCriteria.condition = search(lastCriteria.identifier.identifierOptions, 'optionParserName', curr.condition);
        let { criteria } = curr;
        if (lastCriteria.identifier.identifierType === 'Date') {
          criteria = criteria.split(',').map((date) => new DateObject(date));
          criteria = criteria.length > 1 ? criteria : criteria[0];
        } else {
          criteria = isMultipleValue(curr.condition) ? criteria.replaceAll(',', ' ') : criteria;
          criteria = criteria.trim();
        }
        lastCriteria.data = criteria;
      }
      id += 1;
      return acc;
    }, preparedSearchFields);
  }
  return [];
};

export { operators, parseQuery, reformatDecoder };
