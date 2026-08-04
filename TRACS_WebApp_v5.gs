// ============================================================
// TRACS API — Web App Script v5
// ATNM HSE Training Records & Compliance System
// PDO ODC Contract · Oman
// Standard: SP-1157 v4.1 · SP-2000 V5
//
// DEPLOY SETTINGS:
//   Execute as : Me
//   Who has access : Anyone
//
// CONFIRMED COLUMN MAP (0-indexed, from live SAP sheet):
//   Col A [0]  = Si#
//   Col B [1]  = Employee Number (ATNM ID)
//   Col C [2]  = Employee Name
//   Col D [3]  = ID Text = Course Name
//   Col E [4]  = ID = Course Code
//   Col F [5]  = Position Text = Designation
//   Col G [6]  = Position (SAP position ID)
//   Col H [7]  = ID Issue Date = Training Date
//   Col I [8]  = ID END Date = Expiry Date
//   Col J [9]  = Personnel Area = ODC Cluster
//   Col K [10] = PA Code
//   Col L [11] = OFlag (Y = skip record)
//   Col M [12] = Employee Status Text (Active / Inactive)
//   Col N [13] = Validity remaining in days
//
// FILTER RULES:
//   - OFlag = Y  → skip (obsolete record)
//   - Status = Inactive → skip
//   - Status = '' (blank) → skip
//   - Only 'Active' records are processed
//
// DATA SOURCE:
//   Sheet: TRACS-TRAINING RECORDS AND COMPLIANCE SYSTEM
//   Tab 1: HSE Training & FTW SAP Data
//   Tab 2: SAP VS Matrix Designation  (trailing space in name)
//          Headers row 3, Data from row 4
//          Col C = SAP Designation, Col D = Matrix Role
// ============================================================

const SHEET_ID = '13IaSNS36zX3Nq9og7rr4ZdXEzw6fIvtkoJK2Dvvc1ho';
const SAP_SHEET_NAME = 'HSE Training & FTW SAP Data';
const MAP_SHEET_NAME = 'SAP VS Matrix Designation '; // trailing space intentional

function doGet(e) {
  const callback = (e && e.parameter && e.parameter.callback)
    ? e.parameter.callback
    : 'tracsCB';
  return buildResponse(callback);
}

function buildResponse(callback) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);

    // ── 1. Load SAP Training Data ─────────────────────────────
    const sapSheet = ss.getSheetByName(SAP_SHEET_NAME);
    if (!sapSheet) throw new Error('Sheet not found: ' + SAP_SHEET_NAME);

    const lastRow = sapSheet.getLastRow();
    const lastCol = 14; // columns A–N
    const sapRaw = sapSheet.getRange(1, 1, lastRow, lastCol).getValues();

    const sapData = [];
    let skippedOFlag = 0;
    let skippedInactive = 0;
    let skippedBlank = 0;

    for (let i = 1; i < sapRaw.length; i++) {
      const row = sapRaw[i];

      // Skip fully empty rows
      if (!row[0] && !row[1] && !row[2]) continue;

      // Skip OFlag = Y (obsolete records)
      const oFlag = String(row[11] || '').trim().toUpperCase();
      if (oFlag === 'Y') { skippedOFlag++; continue; }

      // Skip non-Active employees
      const status = String(row[12] || '').trim();
      if (status === '') { skippedBlank++; continue; }
      if (status !== 'Active') { skippedInactive++; continue; }

      // Format dates safely
      const trainingDate = _fmtDate(row[7]);
      const expiryDate   = _fmtDate(row[8]);

      sapData.push({
        si:          String(row[0]  || '').trim(),
        atnmId:      String(row[1]  || '').trim(),   // Employee Number
        name:        String(row[2]  || '').trim(),   // Employee Name
        course:      String(row[3]  || '').trim(),   // Course Name (ID Text)
        courseCode:  String(row[4]  || '').trim(),   // Course Code (ID)
        designation: String(row[5]  || '').trim(),   // Position Text
        trainingDate: trainingDate,
        expiryDate:  expiryDate,
        cluster:     String(row[9]  || '').trim(),   // Personnel Area
        paCode:      String(row[10] || '').trim(),
        status:      status
      });
    }

    // ── 2. Load Designation Mapping ───────────────────────────
    const mapSheet = ss.getSheetByName(MAP_SHEET_NAME);
    if (!mapSheet) throw new Error('Sheet not found: "' + MAP_SHEET_NAME + '"');

    const mapLastRow = mapSheet.getLastRow();
    const mapRaw = mapSheet.getRange(1, 1, mapLastRow, 5).getValues();
    const designationMap = {};

    // Headers on row 3 (index 2), data from row 4 (index 3)
    for (let i = 3; i < mapRaw.length; i++) {
      const sapDesig   = String(mapRaw[i][2] || '').trim(); // Col C
      const matrixRole = String(mapRaw[i][3] || '').trim(); // Col D
      // Strip any warning prefix characters (e.g. ⚠)
      const cleanRole = matrixRole.replace(/^[⚠️\s]+/, '').trim();
      if (sapDesig && cleanRole && sapDesig !== 'SAP Designation') {
        designationMap[sapDesig] = cleanRole;
      }
    }

    // ── 3. Build response ────────────────────────────────────
    const result = {
      success:      true,
      generatedAt:  Utilities.formatDate(new Date(), 'Asia/Muscat', 'yyyy-MM-dd HH:mm'),
      totalRecords: sapData.length,
      stats: {
        totalRawRows:    lastRow - 1,
        skippedOFlag:    skippedOFlag,
        skippedInactive: skippedInactive,
        skippedBlank:    skippedBlank,
        activeRecords:   sapData.length,
        mappingsLoaded:  Object.keys(designationMap).length
      },
      sapData:        sapData,
      designationMap: designationMap
    };

    return ContentService
      .createTextOutput(callback + '(' + JSON.stringify(result) + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);

  } catch (err) {
    const errResult = {
      success: false,
      error:   err.toString(),
      hint:    'Check sheet names and deployment settings'
    };
    return ContentService
      .createTextOutput(callback + '(' + JSON.stringify(errResult) + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
}

// ── Date formatter ────────────────────────────────────────────
// Handles: Date objects, ISO strings, DD/MM/YYYY, blank/null
function _fmtDate(val) {
  if (!val) return '';
  if (val instanceof Date) {
    if (isNaN(val.getTime())) return ''; // invalid date
    return Utilities.formatDate(val, 'Asia/Muscat', 'yyyy-MM-dd');
  }
  const s = String(val).trim();
  if (!s || s === '0' || s === 'null') return '';
  // Already ISO format
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.substring(0, 10);
  // DD/MM/YYYY
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m) return m[3] + '-' + m[2].padStart(2,'0') + '-' + m[1].padStart(2,'0');
  // DD Mon YYYY (e.g. 31 May 2018)
  const months = {Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',
                  Jul:'07',Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12'};
  const m2 = s.match(/^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})/);
  if (m2 && months[m2[2]]) {
    return m2[3] + '-' + months[m2[2]] + '-' + m2[1].padStart(2,'0');
  }
  return '';
}

// ── Test function — run manually from editor to verify ───────
function testRead() {
  const ss = SpreadsheetApp.openById(SHEET_ID);

  // Test 1: Sheet names
  const sheets = ss.getSheets().map(s => s.getName());
  Logger.log('Sheets found: ' + JSON.stringify(sheets));

  // Test 2: SAP data
  const sapSheet = ss.getSheetByName(SAP_SHEET_NAME);
  if (!sapSheet) { Logger.log('ERROR: SAP sheet not found'); return; }
  const sapSample = sapSheet.getRange(1, 1, 5, 14).getValues();
  Logger.log('SAP headers: ' + JSON.stringify(sapSample[0]));
  Logger.log('SAP row 2: ' + JSON.stringify(sapSample[1]));
  Logger.log('SAP last row: ' + sapSheet.getLastRow());

  // Test 3: Designation map
  const mapSheet = ss.getSheetByName(MAP_SHEET_NAME);
  if (!mapSheet) { Logger.log('ERROR: Map sheet not found - check trailing space'); return; }
  const mapSample = mapSheet.getRange(1, 1, 8, 5).getValues();
  Logger.log('Map rows 1-8: ' + JSON.stringify(mapSample));

  // Test 4: Run full response and check stats
  const result = JSON.parse(
    buildResponse('test').getContent().replace(/^test\(/, '').replace(/\)$/, '')
  );
  Logger.log('SUCCESS: ' + result.success);
  Logger.log('Stats: ' + JSON.stringify(result.stats));
  Logger.log('Sample record: ' + JSON.stringify(result.sapData[0]));
  Logger.log('Mappings: ' + JSON.stringify(result.designationMap));
}
