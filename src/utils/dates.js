/* eslint-disable import/prefer-default-export */

const calculateDifference = (fromDate, dateFormatSubstring) => {
  const today = new Date();
  const d = new Date(fromDate.substring(0, dateFormatSubstring));
  return (Math.floor((today - d) / (1000 * 60 * 60 * 24)));
};

export { calculateDifference };
