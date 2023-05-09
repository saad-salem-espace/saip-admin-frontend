/* eslint-disable */
import { t } from 'i18next';
import { DateObject } from 'react-multi-date-picker';
import { search } from './arrays';
import { isMultipleValue } from './search-query/encoder';
import { insert } from './strings';

const operators = ['and', 'or', 'not'].map((operator) => ({
  operator: operator.toUpperCase(),
  displayName: t(`search:operators.${operator}`),
}));

const parseQuery = (fields, imageName, isQuery) => {
  let queryObjsArr = [];
  fields.forEach((value) => {
    queryObjsArr.push({
       "identifier": value.identifier.identiferStrId,
       "condition": value.condition.optionParserName,
       "data": value.data,
       "operator": value.operator,
    });
  });

  if (!isQuery && imageName) {
    queryObjsArr.push({
      "identifier": "image",
      "condition": ": ",
      "data": imageName,
      "operator": "OR",
    });
  }
  return queryObjsArr;
};

const reformatArrDecoder = (queryObjsArr, searchIdentifiersData) => {
  let values = [];
  queryObjsArr.forEach((qObj) => {
    if(qObj.identifier === "image"){
       //TODO
    } else {
      const selectedIdentifier =  searchIdentifiersData.find((i) => i.identiferStrId === qObj.identifier);
      values.push({
          "identifier": selectedIdentifier,
          "condition": selectedIdentifier.identifierOptions.find((i) => i.optionParserName === qObj.condition),
          "data": qObj.data,
          "operator": qObj.operator,
      });
    }
  });
  return values;
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

const defaultConditions = new Map();
defaultConditions.set('Text', 'hasExactly');
defaultConditions.set('Date', 'is');
defaultConditions.set('Number', 'is');
defaultConditions.set('LKP', 'hasAny');

const teldaRegex = /^[^*?!~]+?~?\d*$/;
const noTeldaRegex = /^[^~]+$/;

export {
  operators,
  parseQuery,
  reformatDecoder,
  flattenCriteria,
  teldaRegex,
  noTeldaRegex,
  reformatArrDecoder,
  defaultConditions,
};
