// TRACS API - Web App Script v4
// ATNM HSE Training Records & Compliance System
// Deploy: Execute as Me | Who has access: Anyone

const SHEET_ID = '13IaSNS36zX3Nq9og7rr4ZdXEzw6fIvtkoJK2Dvvc1ho';

function doGet(e) {
  const callback = (e && e.parameter && e.parameter.callback)
    ? e.parameter.callback
    : 'tracsCB';
  return buildResponse(callback);
}

function buildResponse(callback) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);

    // ── Sheet 1: SAP Training Data ──────────────────────────────
    const sapSheet = ss.getSheetByName('HSE Training & FTW SAP Data');
    if (!sapSheet) throw new Error('Sheet "HSE Training & FTW SAP Data" not found');
    const sapRaw = sapSheet.getDataRange().getValues();
    const sapData = [];

    for (let i = 1; i < sapRaw.length; i++) {
      const row = sapRaw[i];
      // skip blank rows
      if (!row[1] && !row[3] && !row[4]) continue;
      // col L (index 11) = Employee Status
      const status = String(row[11] || '').trim();
      if (status === 'Withdrawn') continue;
      // col K (index 10) = Obsolete flag
      const obsolete = String(row[10] || '').trim().toUpperCase();
      if (obsolete === 'Y') continue;

      sapData.push({
        si:          String(row[1]  || '').trim(),
        course:      String(row[2]  || '').trim(),   // col C: Description
        atnmId:      String(row[3]  || '').trim(),   // col D: ATNM#
        name:        String(row[4]  || '').trim(),   // col E: Name
        designation: String(row[5]  || '').trim(),   // col F: Designation
        trainingDate: _fmtDate(row[6]),              // col G: Training Date
        expiryDate:   _fmtDate(row[7]),              // col H: Expiry Date
        validity:    row[8],                         // col I: Validity
        cluster:     String(row[9]  || '').trim(),   // col J: ODC Cluster
        obsolete:    obsolete,
        status:      status
      });
    }

    // ── Sheet 2: Designation Mapping ───────────────────────────
    const mapSheet = ss.getSheetByName('SAP VS Matrix Designation ');
    if (!mapSheet) throw new Error('Sheet "SAP VS Matrix Designation " not found');
    const mapRaw = mapSheet.getDataRange().getValues();
    const designationMap = {};
    // headers on row 3 (index 2), data from row 4 (index 3)
    for (let i = 3; i < mapRaw.length; i++) {
      const sapDesig   = String(mapRaw[i][2] || '').trim(); // col C
      const matrixRole = String(mapRaw[i][3] || '').trim(); // col D
      if (sapDesig && matrixRole) designationMap[sapDesig] = matrixRole;
    }

    const result = {
      success:      true,
      generatedAt:  Utilities.formatDate(new Date(), 'Asia/Muscat', 'yyyy-MM-dd HH:mm'),
      totalRecords: sapData.length,
      sapData:      sapData,
      designationMap: designationMap
    };

    return ContentService
      .createTextOutput(callback + '(' + JSON.stringify(result) + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);

  } catch (err) {
    const errResult = { success: false, error: err.toString() };
    return ContentService
      .createTextOutput(callback + '(' + JSON.stringify(errResult) + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
}

function _fmtDate(val) {
  if (!val) return '';
  if (val instanceof Date) {
    return Utilities.formatDate(val, 'Asia/Muscat', 'yyyy-MM-dd');
  }
  const s = String(val).trim();
  // already ISO
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.substring(0, 10);
  // DD/MM/YYYY
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m) return m[3] + '-' + m[2].padStart(2,'0') + '-' + m[1].padStart(2,'0');
  return s.substring(0, 10);
}
