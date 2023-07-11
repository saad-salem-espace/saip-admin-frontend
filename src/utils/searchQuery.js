/* eslint-disable prefer-destructuring */
import { DateObject } from 'react-multi-date-picker';
import { search } from './arrays';
import { isMultipleValue } from './search-query/encoder';
import { insert } from './strings';

const identifierName = (idenifier, crrLang) => (
  crrLang === 'ar' ? idenifier.identiferNameAr : idenifier.identiferName
);

const optionName = (option, crrLang) => (
  crrLang === 'ar' ? option.optionNameAr : option.optionName
);

const parseQuery = (fields, imageName) => {
  const queryObjsArr = [];

  fields.forEach((value) => {
    queryObjsArr.push({
      identifier: value.identifier.identiferStrId,
      condition: value.condition.optionParserName,
      data: ((typeof value.data === 'string' || value.data instanceof String) ? value.data.trim() : value.data),
      operator: value.operator,
    });
  });

  if (imageName) {
    queryObjsArr.push({
      identifier: 'image',
      condition: ': ',
      data: imageName,
      operator: queryObjsArr.length > 0 ? 'OR' : '',
    });
  }
  return queryObjsArr;
};

const getIfIsDate = (data) => {
  let dates;
  if (new DateObject(data.replace('"', '').split(',')[0]).isValid) {
    dates = data.replace('"', '').split(',').map((date) => new DateObject(date));
  }
  return dates?.length <= 1 ? dates[0] : dates;
};

const convertQueryArrToObjsArr = (qArr, searchIdentifiersData) => {
  const qObjsArr = [];
  let counter = 1;
  qArr.forEach((qObj) => {
    if (qObj.identifier !== 'image') {
      const selectedIdentifier = searchIdentifiersData.find(
        (i) => i.identiferStrId === qObj.identifier,
      );
      qObjsArr.push({
        identifier: selectedIdentifier,
        condition: selectedIdentifier.identifierOptions.find(
          (i) => i.optionParserName === qObj.condition,
        ),
        data: selectedIdentifier.identifierType === 'Date' ? getIfIsDate(qObj.data) : qObj.data,
        operator: qObj.operator,
        id: counter,
      });
    } else {
      qObjsArr.push(qObj);
    }
    counter += 1;
  });
  return qObjsArr;
};

const convertQueryStrToArr = (qStr, selectedIdentifiers) => {
  let i = 0;
  let qObjsIdx = 0;
  let qObjsPrevIdx = 0;
  let increment = 1;
  let qStartIdx = 2;
  let qLastIdx = -1;
  const qObjs = [];

  if (qStr) {
    const qStrArr = qStr.match(/("[^."]* ")|(\S*)/g).filter((str) => str !== '').filter((str) => str !== '' && str !== '"');
    const strIds = [];
    selectedIdentifiers?.data?.map((idenifier) => {
      strIds.push(idenifier.identiferStrId);
      return strIds;
    });
    while (i < qStrArr.length) {
      if (strIds?.includes(qStrArr[i]) || i === 0) {
        qObjs[qObjsIdx] = {
          identifier: qStrArr[i],
          condition: qStrArr[i + 1],
        };
        if (i === 0) {
          qObjs[qObjsIdx].operator = '';
        } else {
          qLastIdx = i - 2;
          qObjs[qObjsIdx].operator = qStrArr[i - 1];
        }
        qObjsIdx += 1;

        increment = 2;
      }

      if (i === qStrArr.length - 1) {
        qLastIdx = qStrArr.length - 1;
      }
      if (qLastIdx >= qStartIdx) {
        qObjs[qObjsPrevIdx].data = qStrArr.slice(qStartIdx, qLastIdx + 1).join(' ');
        const qObjsLength = qObjs[qObjsPrevIdx].data.length;
        if (qObjs[qObjsPrevIdx].data.charAt(0) === '"'
           && qObjs[qObjsPrevIdx].data.charAt(qObjsLength - 1) === '"') {
          qObjs[qObjsPrevIdx].data = qObjs[qObjsPrevIdx].data.substr(1, qObjsLength - 2);
        }

        qObjsPrevIdx += 1;
        qStartIdx = i + 2;
      }
      i += increment;
      increment = 1;
    }
  }
  return qObjs;
};
const convertQueryArrToStr = (qObjsArr) => {
  let qStr = '';
  qObjsArr?.forEach((obj) => {
    let data = obj.data;
    if (data instanceof DateObject || data?.[0] instanceof DateObject) {
      if (Array.isArray(data)) {
        data = data.map((date) => date.format('YYYY-MM-DD'));
      } else {
        data = data.format('YYYY-MM-DD');
      }
    }
    qStr = `${qStr} ${obj.operator} ${obj.identifier} ${obj.condition} "${data}"`;
  });
  return qStr.trim();
};
const convertQueryObjsArrToTransMemo = (qObjsArr, selectedIdentifiers, t, crrLang) => {
  let qStr = '';
  qObjsArr?.forEach((qObj) => {
    if (qObj.identifier !== 'image') {
      qStr = `${qStr} ${qObj.operator && t(`operators.${qObj.operator.toLowerCase()}`)} ${identifierName(qObj.identifier, crrLang)}: ${optionName(qObj.condition, crrLang)}: "${qObj.data}"`;
    } else {
      qStr = `${qStr} ${qObj.operator && t(`operators.${qObj.operator.toLowerCase()}`)} ${t(`identifiers.${qObj.identifier}`)}: "${qObj.data}"`;
    }
  });
  return qStr.trim();
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

const specialCharsValidation = (data) => {
  const invalidChars = '()&[]{}^|<>+=\\';

  for (let i = 0; i < data.length; i += 1) {
    if (invalidChars.includes(data[i])) return 0;
  }

  return 1;
};

export {
  identifierName,
  optionName,
  parseQuery,
  reformatDecoder,
  flattenCriteria,
  teldaRegex,
  noTeldaRegex,
  convertQueryArrToObjsArr,
  defaultConditions,
  convertQueryStrToArr,
  specialCharsValidation,
  convertQueryArrToStr,
  convertQueryObjsArrToTransMemo,
};
