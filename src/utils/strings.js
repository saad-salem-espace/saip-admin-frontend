/**
 * This algorithm targets trimming strings without generating partial string
 *
 * @example
 * let input = "There are lots of ways to do it, but a regular expression \
 * is a useful one line method";
 * trimStringRelativeToSubtext(input, "there", 10, 10); //'There are lots of ways to...'
 * trimStringRelativeToSubtext(input, "method", 10, 10); //'...a useful one line method'
 * trimStringRelativeToSubtext(input, "ways", 10, 10); //'...lots of ways to do it...'
 * trimStringRelativeToSubtext(input, "not found", 10, 10); // 'There are lots of ways...'
 *
 * @param {string} text - full text input
 * @param {string} subtext - the substring text to trim around
 * @param {number} charsBefore - number of characters before subtext
 * @param {number} charsAfter - number of characters after subtext
 * @returns {string} - trimmed string returned in case it exists otherwise full strings is returned
 */
const trimStringRelativeToSubtext = (text, subtext, charsBefore = 100, charsAfter = 100) => {
  const spaceTrimmedSubtext = subtext.trim();

  const wordRegex = new RegExp(spaceTrimmedSubtext, 'i');
  const wordPosition = text.match(wordRegex)?.index;

  if (wordPosition == null) {
    return trimStringRelativeToSubtext(text, text.substring(0, 3), charsBefore, charsAfter);
  }

  // Checks the position of the trimmed string
  // If in the subtext in the beginning add the remaining chars to the end of string
  // If in the subtext in the end add the remaining chars to the beginning of string
  // If in the middle just trim string equally before and after
  let regex;
  if (wordPosition < charsBefore) {
    const addedChars = charsBefore - wordPosition;
    regex = new RegExp(`.{0,${wordPosition}}${spaceTrimmedSubtext}.{0,${charsAfter + addedChars}}`, 'i');
  } else if (wordPosition + spaceTrimmedSubtext.length + charsAfter > text.length) {
    const addedChars = wordPosition + spaceTrimmedSubtext.length + charsAfter - text.length;
    regex = new RegExp(`.{0,${charsBefore + addedChars}}${spaceTrimmedSubtext}.{0,${charsAfter}}`, 'i');
  } else {
    regex = new RegExp(`.{0,${charsBefore}}${spaceTrimmedSubtext}.{0,${charsAfter}}`, 'i');
  }

  // Trimming string
  const trimmedSubtext = text.match(regex)?.[0];

  const firstSpaceTrimIdx = trimmedSubtext.indexOf(' ') + 1;
  const lastSpaceTrimIdx = trimmedSubtext.lastIndexOf(' ');
  const trimStart = text.startsWith(trimmedSubtext) ? 0 : firstSpaceTrimIdx;
  const trimEnd = text.endsWith(trimmedSubtext) ? trimmedSubtext.length : lastSpaceTrimIdx;
  const trimmedOutput = trimmedSubtext.substring(trimStart, trimEnd);

  // Add the `...` to start or end of string
  return `${text.startsWith(trimmedSubtext) ? '' : '...'}${trimmedOutput}${text.endsWith(trimmedSubtext) ? '' : '...'}`;
};

// Convert a normal sentence to camel case.
// Used to camel case conditions
const camelize = (str) => str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase())).replace(/\s+/g, '');

// Convert Date DD-MMM-YYYY to YY-MM-DD
// Example 01 March 2023 becomes 2023-03-01
const formatDate = (date) => {
  if (!date) return '';

  const dateData = date.split(' ');
  let newDate = '';
  const months = [
    ['January', '01'],
    ['February', '02'],
    ['March', '03'],
    ['April', '04'],
    ['May', '05'],
    ['June', '06'],
    ['July', '07'],
    ['August', '08'],
    ['September', '09'],
    ['October', '10'],
    ['November', '11'],
    ['December', '12'],
  ];

  const map = new Map(months);

  newDate += dateData[2];
  newDate += '-';
  newDate += map.get(dateData[1]);
  newDate += '-';
  newDate += dateData[0];

  return newDate;
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
    searchQuery += camelize(searchField.condition.optionName);
  } else if (searchField.condition && !isQuery) {
    searchQuery += (searchField.condition.optionName);
    searchQuery += ':';
  }

  searchQuery += ' "';

  if (searchField.condition && searchField.condition.optionName === 'Has Any') searchQuery += (searchField.data.trim().replace(/\s+/g, ','));// replace spaces with a comma
  else if (searchField.identifier.identifierType === 'Date') searchQuery += formatDate(searchField.data);
  else searchQuery += (searchField.data.trim().replace(/\s+/g, ' '));// replace one more spaces with one space (remove extra middle spaces)
  searchQuery += '"';

  return searchQuery;
};

// eslint-disable-next-line import/prefer-default-export
export {
  trimStringRelativeToSubtext, camelize, formatDate, parseSingleQuery,
};
