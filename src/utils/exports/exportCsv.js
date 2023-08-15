import { getProperties } from 'utils/objects';
import exportAttributes from './exportAttributes.json';

function convertToCSV(data, fields) {
  const header = fields.join(',');
  const rows = data.map((row) => fields.map((field) => (row[field] !== undefined ? `"${row[field]}"` : '""')).join(','));
  return [header, ...rows].join('\n');
}

const exportCsv = (workstream, data, workstreamLocale) => {
  const output = data.map((item) => getProperties(item, exportAttributes[workstream]));
  const csv = convertToCSV(output, Object.keys(exportAttributes[workstream]));
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${workstreamLocale}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default exportCsv;
