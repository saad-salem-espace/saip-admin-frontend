const dateFormatSubstring = 10;
const calculateDifference = (fromDate) => {
  const today = new Date();
  const d = new Date(fromDate.substring(0, dateFormatSubstring));
  return (Math.floor((today - d) / (1000 * 60 * 60 * 24)));
};

const formatLongDate = (date) => {
  const d = new Date(date);
  return `${d.toDateString().replace(/^\S+\s/, '')} , ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};
export { calculateDifference, formatLongDate, dateFormatSubstring };
