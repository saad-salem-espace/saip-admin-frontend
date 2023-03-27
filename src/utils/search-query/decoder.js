// Each operator points to the weaker operator
const opStrength = {
  top: 'not',
  not: 'and',
  and: 'or',
  or: null,
};

const decodeQuery = (query, selectedOption = opStrength.top) => {
  if (!query) return [];
  if (!selectedOption) {
    const splitQuery = query.split(' ');
    const criteria = splitQuery.slice(2).join(' ');
    return [{
      identifier: splitQuery[0],
      condition: splitQuery[1],
      criteria: criteria.slice(1, criteria.length - 1),
    }];
  }
  const opDetector = `(".*?")?( ${selectedOption} )(\\w+ \\w+ ".+?")`;
  const opDetectorRegex = new RegExp(opDetector, 'gi');
  const matches = [...query.matchAll(opDetectorRegex), undefined];
  let startIndex = 0;
  const nextOp = opStrength[selectedOption];
  const sol = [];
  let subQuery;
  matches.forEach((value) => {
    if (value) {
      const firstGpLen = value?.[1]?.length ?? 0;
      subQuery = decodeQuery(query.slice(startIndex, value.index + firstGpLen), nextOp);
      sol.push(...subQuery, { operator: selectedOption });
      startIndex = value.index + firstGpLen + value[2].length;
    } else if (!value && query && query.length > startIndex) {
      subQuery = decodeQuery(query.slice(startIndex), nextOp);
      sol.push(...subQuery);
    }
  });
  return sol;
};

// eslint-disable-next-line import/prefer-default-export
export { decodeQuery };
