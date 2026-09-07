/**
 * AVECGAZELLE — Workplace Effectiveness Diagnostic
 * Results-logging backend (Google Apps Script, bound to a Google Sheet)
 *
 * SETUP: see README-results-sheet.md for step-by-step instructions.
 * This file only needs to be pasted into the Apps Script editor — nothing
 * runs locally, nothing needs Node, npm, or a server of your own.
 */

const SHEET_NAME = 'Results';
const HEADERS = [
  'Timestamp', 'Name', 'Email', 'Overall Score', 'Level', 'Critical Flag',
  'Communication %', 'Cognitive & Decision %', 'Self-Management %',
  'Interpersonal %', 'Adaptability & Growth %', 'Precision & Detail %',
  'Professional Conduct %', 'Digital & Remote Readiness %'
];

function doPost(e) {
  try {
    const sheet = getOrCreateSheet_();
    const data = JSON.parse(e.postData.contents);
    const c = data.clusters || {};

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.overall != null ? data.overall : '',
      data.level || '',
      data.criticalFlag || '',
      c.COMM != null ? c.COMM : '',
      c.COG  != null ? c.COG  : '',
      c.SELF != null ? c.SELF : '',
      c.INTER!= null ? c.INTER: '',
      c.ADAPT!= null ? c.ADAPT: '',
      c.PREC != null ? c.PREC : '',
      c.COND != null ? c.COND : '',
      c.DIGI != null ? c.DIGI : ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Optional: run this once manually from the Apps Script editor
 *  to confirm the sheet/header row is created before you go live. */
function setupCheck() {
  getOrCreateSheet_();
}
