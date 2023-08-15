import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { getProperties } from 'utils/objects';
import moment from 'moment';
import exportLogo from 'assets/images/export_logo.png';
import { capitalCase } from 'change-case';
import { imageUrlToBase64 } from 'utils/attachments';
import exportAttributes from './exportAttributes.json';

/**
 * Autofit columns by width
 *
 * @param worksheet {ExcelJS.Worksheet}
 * @param minimalWidth
 */
const autoWidth = (worksheet, minimalWidth = 10) => {
  worksheet.columns.forEach((column) => {
    let maxColumnLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      maxColumnLength = Math.max(
        maxColumnLength,
        minimalWidth,
        cell.value ? cell.value.toString().length : 0,
      );
    });
    // eslint-disable-next-line no-param-reassign
    column.width = maxColumnLength + 2;
  });
};

const generateWorkbook = (workstream) => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'SAIP';
  workbook.category = workstream.workstreamName;
  return workbook;
};

const prepareOverview = async (workbook, workstream, resultsLength) => {
  const enWorkstream = capitalCase(workstream);

  const overViewWorksheet = workbook.addWorksheet('Overview', { views: [{ showGridLines: false }] });
  const logoImg = workbook.addImage({ base64: await imageUrlToBase64(exportLogo), extension: 'png' });
  overViewWorksheet.addImage(logoImg, {
    tl: { col: 0, row: 0 },
    ext: { width: 454.272, height: 153.216 },
  });

  overViewWorksheet.getRow(9).values = [`${resultsLength} results found for ${enWorkstream}`];
  overViewWorksheet.getRow(11).values = ['Open the "Results" sheet (select tab below) to view the results.'];
  overViewWorksheet.getRow(13).values = [`Exported on: ${moment().format('LLLL')}`];
  overViewWorksheet.getRow(15).values = [{
    text: `Link: ${window.location.origin}`,
    hyperlink: window.location.origin,
    tooltip: window.location.origin,
  }];

  overViewWorksheet.mergeCells('A1:Z7');
  overViewWorksheet.getCell('A1').fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '00A49B' },
  };

  // Merging cells
  overViewWorksheet.mergeCells('A9:Z9');
  overViewWorksheet.mergeCells('A11:Z11');
  overViewWorksheet.mergeCells('A13:Z13');
  overViewWorksheet.mergeCells('A15:Z15');
};

const prepareResults = (workbook, workstream, data) => {
  const resultsWorksheet = workbook.addWorksheet('Results', { views: [{ showGridLines: false }] });
  const table = resultsWorksheet.addTable({
    name: `${workstream} Table`,
    ref: 'A1',
    headerRow: true,
    totalsRow: false,
    style: {
      theme: 'TableStyleMedium6',
      showRowStripes: true,
    },
    columns: Object.keys(exportAttributes[workstream]).map((colName) => (
      { name: colName, filterButton: true }
    )),
    rows: data.map((item) => Object.values(getProperties(item, exportAttributes[workstream]))),
  });

  for (let i = 0; i <= data.length; i += 1) {
    resultsWorksheet.getRow(i + 1).eachCell((cell) => {
      // eslint-disable-next-line no-param-reassign
      cell.font = { name: 'Arial' };
      // eslint-disable-next-line no-param-reassign
      cell.border = {
        top: { style: 'thin', color: { argb: 'AAAAAA' } },
        left: { style: 'thin', color: { argb: 'AAAAAA' } },
        bottom: { style: 'thin', color: { argb: 'AAAAAA' } },
        right: { style: 'thin', color: { argb: 'AAAAAA' } },
      };
    });
  }

  resultsWorksheet.getRow(resultsWorksheet.getCell(table.ref).row)
    .eachCell((cell) => {
      // eslint-disable-next-line no-param-reassign
      cell.font = { name: 'Arial', color: { argb: 'FFFFFF' }, bold: true };
      // eslint-disable-next-line no-param-reassign
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00A49B' } };
    });

  autoWidth(resultsWorksheet);
};

const exportXlsx = async (workstream, data, workstreamLocale) => {
  const workbook = generateWorkbook(workstream);

  await prepareOverview(workbook, workstream, data.length);
  prepareResults(workbook, workstream, data);

  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(
      new Blob([buffer], { type: 'application/octet-stream' }),
      `${workstreamLocale}.xlsx`,
    );
  });
};

export default exportXlsx;
