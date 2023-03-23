import { t } from 'i18next';
import { DateObject } from 'react-multi-date-picker';
import { search } from './arrays';
import { isMultipleValue, parseSingleQuery } from './searchQuery/encoder';
import { insert } from './strings';

const operators = ['and', 'or', 'not'].map((operator) => ({
  operator: operator.toUpperCase(),
  displayName: t(`search:operators.${operator}`),
}));

const parseQuery = (fields, isQuery) => {
  let finalQuery = '';

  fields.forEach((value, index) => {
    if (!finalQuery) {
      finalQuery += parseSingleQuery({ ...value, operator: '' }, index, isQuery);
    } else {
      finalQuery += parseSingleQuery(value, index, isQuery);
    }
  });
  return finalQuery.trim();
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
        if (lastCriteria.identifier.isLkp) {
          criteria = criteria.split(',');
        } else if (lastCriteria.identifier.identifierType === 'Date') {
          criteria = criteria.split(',').map((date) => new DateObject(date));
          criteria = criteria.length > 1 ? criteria : criteria[0];
        } else {
          if (isMultipleValue(curr.condition)) {
            [...criteria.matchAll(/[^,]+( +)+[^,]+/g)].forEach((match) => {
              const startIndex = match.index;
              criteria = insert(criteria, '"', [startIndex, startIndex + match[0].length]);
            });
            criteria = criteria.replaceAll(',', ' ');
          }
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

const flattenCriteria = (queryFields) => queryFields.map(
  (queryField, idx) => {
    if (idx > 0 && queryFields[idx - 1].operator === 'not') {
      return [];
    }
    return queryField.criteria ? queryField.criteria.split(',') : [];
  }
  ,
).flat(1000);

export {
  operators, parseQuery, reformatDecoder, flattenCriteria,
};
