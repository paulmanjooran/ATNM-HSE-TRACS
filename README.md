<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>HSE TRACS — ATNM HSE Training and Compliance System</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f0f2f5;color:#1a1a2e;display:flex;height:100vh;overflow:hidden}

/* ─── SIDEBAR ─────────────────────────────── */
#sidebar{width:220px;min-width:220px;background:#0d1b2a;display:flex;flex-direction:column;height:100vh;overflow-y:auto}
.sb-brand{padding:20px 16px 16px;border-bottom:1px solid rgba(255,255,255,.08)}
.sb-brand .sb-tag{font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#4db8a0;margin-bottom:4px}
.sb-brand .sb-title{font-size:13px;font-weight:700;color:#fff;line-height:1.35}

.sb-section{padding:20px 12px 6px;font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.3)}
.sb-nav-item{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:8px;margin:2px 8px;cursor:pointer;transition:background .15s;color:rgba(255,255,255,.6);font-size:12px;font-weight:500;text-decoration:none}
.sb-nav-item svg{flex-shrink:0;opacity:.7}
.sb-nav-item:hover{background:rgba(255,255,255,.07);color:rgba(255,255,255,.9)}
.sb-nav-item.active{background:rgba(15,123,108,.35);color:#4db8a0}
.sb-nav-item.active svg{opacity:1}

.sb-status{margin-top:auto;padding:14px;border-top:1px solid rgba(255,255,255,.08)}
.sb-status .sb-dot{width:7px;height:7px;border-radius:50%;background:#6b7280;display:inline-block;margin-right:6px;transition:background .3s}
.sb-status .sb-dot.live{background:#22c55e;box-shadow:0 0 6px #22c55e88}
.sb-status .sb-label{font-size:10px;color:rgba(255,255,255,.4)}
.sb-status .sb-time{font-size:9px;color:rgba(255,255,255,.25);margin-top:3px;display:block}

.sb-load-btn{width:100%;margin-top:10px;padding:8px;background:#0f7b6c;color:#fff;border:none;border-radius:7px;font-size:11px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:opacity .2s}
.sb-load-btn:hover{opacity:.9}
.sb-load-btn:disabled{opacity:.5;cursor:not-allowed}

/* ─── MAIN ─────────────────────────────────── */
#main{flex:1;overflow-y:auto;padding:1.5rem}

/* pages */
.page{display:none}
.page.active{display:block}

/* ─── COMMON COMPONENTS ─────────────────────── */
.page-header{margin-bottom:1.25rem}
.page-header h1{font-size:18px;font-weight:700;color:#0d1b2a;margin-bottom:2px}
.page-header p{font-size:12px;color:#6b7280}

.kpis{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:1.25rem}
.kpi{background:#fff;border-radius:10px;padding:14px 16px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.kpi .lbl{font-size:11px;color:#6b7280;margin-bottom:6px;font-weight:500}
.kpi .val{font-size:24px;font-weight:700}

.charts{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.25rem}
.card{background:#fff;border-radius:12px;padding:1.25rem;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.card h3{font-size:12px;font-weight:600;color:#0d1b2a;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid #f0f0f0}

.register{background:#fff;border-radius:12px;padding:1.25rem;box-shadow:0 1px 3px rgba(0,0,0,.06);margin-bottom:1.25rem}
.filters{display:flex;align-items:center;gap:8px;margin-bottom:14px;flex-wrap:wrap}
.filters h3{font-size:12px;font-weight:600;color:#0d1b2a;margin-right:auto}
input[type=text],select{font-size:12px;padding:7px 10px;border-radius:7px;border:1px solid #e0e0e0;background:#fafafa;color:#1a1a2e;outline:none}
input[type=text]:focus,select:focus{border-color:#0f7b6c}
input[type=text]{width:200px}

table{width:100%;border-collapse:collapse;font-size:12px;table-layout:fixed}
thead tr{border-bottom:2px solid #f0f0f0}
th{text-align:left;padding:8px 10px;color:#6b7280;font-weight:600;font-size:10px;text-transform:uppercase;letter-spacing:.04em}
tbody tr{border-bottom:1px solid #f7f7f7;transition:background .1s}
tbody tr:hover{background:#fafafa}
td{padding:8px 10px;vertical-align:middle}
.tfooter{font-size:11px;color:#9ca3af;margin-top:8px;text-align:right}

.audit-panel{background:#fff;border-radius:12px;padding:1.25rem;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.audit-panel h3{font-size:12px;font-weight:600;color:#0d1b2a;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #f0f0f0}
.flag{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-radius:8px;margin-bottom:7px;font-size:12px}
.flag-H{background:#fce8e8}
.flag-M{background:#fef3e2}
.flag-I{background:#e8f0fe}
.flag-lbl{font-size:9px;font-weight:700;min-width:32px;padding-top:2px}
.flag-H .flag-lbl{color:#a32d2d}
.flag-M .flag-lbl{color:#ba7517}
.flag-I .flag-lbl{color:#185fa5}

/* pills & badges */
.pill{font-family:monospace;font-size:10px;font-weight:600;padding:2px 6px;border-radius:3px;margin:1px;display:inline-block}
.p-gap{background:#fce8e8;color:#8b1a1a}
.p-exp{background:#fef3e2;color:#7a4a00}
.p-warn{background:#e8f0fe;color:#1a3a7a}
.badge{font-size:10px;font-weight:600;padding:3px 9px;border-radius:12px;white-space:nowrap}
.b-GAP{background:#fce8e8;color:#8b1a1a}
.b-EXPIRED{background:#fef3e2;color:#7a4a00}
.b-EXPIRING{background:#e8f0fe;color:#1a3a7a}
.b-COMPLIANT{background:#eaf7f0;color:#0a4d2e}
.b-MISSING{background:#fce8e8;color:#8b1a1a}
.b-VALID{background:#eaf7f0;color:#0a4d2e}

.bar-wrap{display:flex;align-items:center;gap:6px}
.bar-track{flex:1;height:6px;background:#f0f0f0;border-radius:3px;overflow:hidden}
.bar-fill{height:100%;border-radius:3px}
.bar-pct{font-size:11px;font-weight:600;min-width:32px;text-align:right;color:#333}

.empty{text-align:center;padding:3rem;color:#9ca3af;font-size:13px}
.err-box{text-align:center;padding:2.5rem}
.err-box strong{color:#a32d2d;font-size:14px}
.err-box p{font-size:12px;color:#6b7280;margin:8px 0}
.err-steps{font-size:12px;background:#f9f9f9;border:1px solid #eee;border-radius:8px;padding:14px;text-align:left;display:inline-block;line-height:2;margin-top:8px}

/* FTW specific */
.ftw-expiry-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:1.25rem}
.ftw-summary{background:#fff;border-radius:10px;padding:14px;box-shadow:0 1px 3px rgba(0,0,0,.06);text-align:center}
.ftw-summary .fs-val{font-size:28px;font-weight:700;margin-bottom:4px}
.ftw-summary .fs-lbl{font-size:11px;color:#6b7280}

@media(max-width:1100px){.kpis{grid-template-columns:repeat(3,1fr)}.charts{grid-template-columns:1fr}}
@media(max-width:768px){#sidebar{width:64px}.sb-brand .sb-title,.sb-section,.sb-nav-item span,.sb-status .sb-label,.sb-status .sb-time,.sb-load-btn span{display:none}.kpis{grid-template-columns:repeat(2,1fr)}}
</style>
</head>
<body>

<!-- ═══════════════════ SIDEBAR ═══════════════════ -->
<nav id="sidebar">
  <div class="sb-brand">
    <div class="sb-tag">ATNM · PDO ODC</div>
    <div class="sb-title">HSE TRACS<br>Training &amp; Compliance</div>
  </div>

  <div class="sb-section">Dashboards</div>

  <a class="sb-nav-item active" id="nav-hse" onclick="switchPage('hse')">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
    <span>HSE Training Dashboard</span>
  </a>

  <a class="sb-nav-item" id="nav-ftw" onclick="switchPage('ftw')">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
    <span>PDO FTW Dashboard</span>
  </a>

  <div class="sb-status">
    <div style="display:flex;align-items:center;margin-bottom:6px">
      <span class="sb-dot" id="sb-dot"></span>
      <span class="sb-label" id="sb-label">Not connected</span>
    </div>
    <span class="sb-time" id="sb-time"></span>
    <button class="sb-load-btn" id="btnLoad" onclick="loadData()">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
      <span>Load Live Data</span>
    </button>
  </div>
</nav>

<!-- ═══════════════════ MAIN AREA ═══════════════════ -->
<main id="main">

  <!-- ── PAGE 1: HSE TRAINING DASHBOARD ── -->
  <div class="page active" id="page-hse">
    <div class="page-header">
      <h1>HSE Training Dashboard</h1>
      <p>SP-1157 v4.1 · 44-role matrix · FTW compulsory all roles</p>
    </div>

    <div class="kpis">
      <div class="kpi"><div class="lbl">Total employees</div><div class="val" id="h-k0" style="color:#185fa5">—</div></div>
      <div class="kpi"><div class="lbl">Avg compliance</div><div class="val" id="h-k1" style="color:#0f7b6c">—</div></div>
      <div class="kpi"><div class="lbl">Training gaps</div><div class="val" id="h-k2" style="color:#a32d2d">—</div></div>
      <div class="kpi"><div class="lbl">Expired courses</div><div class="val" id="h-k3" style="color:#ba7517">—</div></div>
      <div class="kpi"><div class="lbl">Expiring &lt;60 days</div><div class="val" id="h-k4" style="color:#6366f1">—</div></div>
    </div>

    <div class="charts">
      <div class="card"><h3>Compliance by cluster</h3><div id="h-cluster">— awaiting data</div></div>
      <div class="card"><h3>Top gap courses</h3><div id="h-courses">— awaiting data</div></div>
    </div>

    <div class="register">
      <div class="filters">
        <h3>Employee compliance register</h3>
        <input type="text" id="h-srch" placeholder="Search name / ID / cluster…" oninput="hRenderTable()">
        <select id="h-fCl" onchange="hRenderTable()"><option value="">All clusters</option></select>
        <select id="h-fSt" onchange="hRenderTable()">
          <option value="">All statuses</option>
          <option value="GAP">Gap</option>
          <option value="EXPIRED">Expired</option>
          <option value="EXPIRING">Expiring</option>
          <option value="COMPLIANT">Compliant</option>
        </select>
        <select id="h-fRl" onchange="hRenderTable()"><option value="">All roles</option></select>
      </div>
      <div style="overflow-x:auto">
        <table>
          <thead><tr>
            <th style="width:140px">Name</th>
            <th style="width:65px">ID</th>
            <th style="width:130px">Role</th>
            <th style="width:115px">Cluster</th>
            <th style="width:75px;text-align:center">Comp%</th>
            <th>Issues</th>
            <th style="width:82px;text-align:center">Status</th>
          </tr></thead>
          <tbody id="h-tbody"><tr><td colspan="7" class="empty">Press "Load Live Data" to connect</td></tr></tbody>
        </table>
      </div>
      <div class="tfooter" id="h-tfoot"></div>
    </div>

    <div class="audit-panel">
      <h3>Audit flags — SP-1157 v4.1</h3>
      <div id="h-flags">— awaiting data</div>
    </div>
  </div>

  <!-- ── PAGE 2: PDO FTW DASHBOARD ── -->
  <div class="page" id="page-ftw">
    <div class="page-header">
      <h1>PDO FTW Dashboard</h1>
      <p>Fit to Work medical compliance · SP-2000 V5 · All 44 roles mandatory</p>
    </div>

    <div class="kpis">
      <div class="kpi"><div class="lbl">Total workforce</div><div class="val" id="f-k0" style="color:#185fa5">—</div></div>
      <div class="kpi"><div class="lbl">FTW valid</div><div class="val" id="f-k1" style="color:#0f7b6c">—</div></div>
      <div class="kpi"><div class="lbl">FTW missing</div><div class="val" id="f-k2" style="color:#a32d2d">—</div></div>
      <div class="kpi"><div class="lbl">FTW expired</div><div class="val" id="f-k3" style="color:#ba7517">—</div></div>
      <div class="kpi"><div class="lbl">Expiring &lt;60 days</div><div class="val" id="f-k4" style="color:#6366f1">—</div></div>
    </div>

    <div class="charts">
      <div class="card"><h3>FTW compliance by cluster</h3><div id="f-cluster">— awaiting data</div></div>
      <div class="card"><h3>FTW compliance by role</h3><div id="f-role">— awaiting data</div></div>
    </div>

    <div class="register">
      <div class="filters">
        <h3>FTW employee register</h3>
        <input type="text" id="f-srch" placeholder="Search name / ID / cluster…" oninput="fRenderTable()">
        <select id="f-fCl" onchange="fRenderTable()"><option value="">All clusters</option></select>
        <select id="f-fSt" onchange="fRenderTable()">
          <option value="">All statuses</option>
          <option value="MISSING">Missing</option>
          <option value="EXPIRED">Expired</option>
          <option value="EXPIRING">Expiring</option>
          <option value="VALID">Valid</option>
        </select>
        <select id="f-fRl" onchange="fRenderTable()"><option value="">All roles</option></select>
      </div>
      <div style="overflow-x:auto">
        <table>
          <thead><tr>
            <th style="width:150px">Name</th>
            <th style="width:65px">ID</th>
            <th style="width:140px">Role</th>
            <th style="width:120px">Cluster</th>
            <th style="width:105px">FTW Expiry</th>
            <th style="width:110px;text-align:center">Days remaining</th>
            <th style="width:85px;text-align:center">Status</th>
          </tr></thead>
          <tbody id="f-tbody"><tr><td colspan="7" class="empty">Press "Load Live Data" to connect</td></tr></tbody>
        </table>
      </div>
      <div class="tfooter" id="f-tfoot"></div>
    </div>

    <div class="audit-panel">
      <h3>FTW audit flags — SP-2000 V5</h3>
      <div id="f-flags">— awaiting data</div>
    </div>
  </div>

</main>

<script>
const API = 'https://script.google.com/a/macros/altasnim.com/s/AKfycbw2x1BEStJzvsFZwtPXDEAQ1YXj2qJuSUChKYML2gV_4SZzD0dZzbbJzrT39dn9f52l/exec';

// ── COURSE NAME MAP ─────────────────────────────────────────────
const CM = {
  'ORT':'ORT','ORT (No Expiry)':'ORT','PDO Gate pass':'ORT',
  'HSE Induction':'HSEI',
  'H2S Awareness & Escape':'H2S','H2SR':'H2S',
  'FTW Medical Data':'FTW',
  'SCBA':'SCBA',
  'AHAF':'AHAF','AHAR':'AHAF','FIRST AID (AHA)':'AHAF','Basic First Aid CPR-AED':'AHAF',
  'Environmental Awareness':'EA',
  'Authorised Gas tester':'AGT','AGTR':'AGT',
  'HSE Tools & Skills':'HII',
  'Dealing with hazds and risks':'HRA',
  'PTW Final Assessment':'PTW-H','PTW Technical Assessment':'PTW-H','Permit to Work Holders':'PTW-H','PTWHR':'PTW-H',
  'PTW Internal Assessment':'PTW-S','Permit to Work Signatories':'PTW-S','PTWSR':'PTW-S',
  'HSELFS':'HSELFS','HSELFSR':'HSELFS','Safety Leadership for  sup':'HSELFS',
  'Safety Leadership for Mgr':'HSELM',
  'Chem Haz Awareness for MGT':'CHM','Chem Hazard Awareness':'CHM',
  'NORM Awareness':'NORMM','NORM for Supervisors':'NORMM',
  'DD1 - Light Vehcle (black top)':'DD01/LV',
  'DD2 - Heavy Vehcle (black top)':'DD02/HV',
  'DD3 - Graded Roads':'DD03/GR',
  'DD4 - Tanker Driver':'DD04/TN',
  'DD5 - Bus Driver':'DD05/BUS',
  'DD6- Defensive driving':'DD06/RT',
  'Safe Journey Management':'SJM','SJMR':'SJM',
  'Fork Lift Operator':'FLOP',
  'SLC (Hiab) Operator':'HIAB','HIABR':'HIAB',
  'MCO-Mobile Crane Operator':'MCOP','MCOPR':'MCOP',
  'Moble Eltng wkg Pltfm/Bkt truk':'MEWP',
  'OTCO':'OTCO',
  'Side Boom Tractor Operator':'RNB','NTI HSE Trng Riggers & Bankmen':'RNB','RNBR':'RNB',
  'Appointed_Person (AP)':'AP',
  'Lifting_Equipment_Controller (':'LS/SLOT','SLOT':'LS/SLOT','SLOTR':'LS/SLOT',
  'Scaffolding CITB Part A':'CISRS-L1',
  'Basic Food Hygiene & HACCP L-1':'HACCP','HACCP-L-2':'HACCP','HACCP-L-3':'HACCP','HACCP-L-3-Intermediate':'HACCP',
  'LMV (Large Vehicle Marshaller)':'VMN',
  'Incident Investigation':'INC','Hazard hunt training':'HH'
};

// ── ROLE MATRIX ─────────────────────────────────────────────────
const RM = {
  'Executive Director':['ORT','HSEI','H2S','FTW','DD01/LV','DD06/RT'],
  'Contract Manager':['ORT','HSEI','H2S','FTW','EA','HSELFS','DD01/LV','DD06/RT'],
  'Construction Manager':['ORT','HSEI','H2S','FTW','EA','HII','HSELFS','DD01/LV','DD06/RT'],
  'HSE Manager':['ORT','HSEI','H2S','FTW','EA','HII','PTW-S','HSELFS','CHM','DD01/LV','DD06/RT','SJM','HRA'],
  'QA Manager':['ORT','HSEI','H2S','FTW','EA','HSELFS','DD01/LV','DD06/RT'],
  'Cluster Manager':['ORT','HSEI','H2S','FTW','EA','HSELFS','DD01/LV','DD06/RT'],
  'ICV Manager':['ORT','HSEI','H2S','FTW','EA','HSELFS','DD01/LV','DD06/RT'],
  'Industrial Hygienist':['ORT','HSEI','H2S','FTW','EA','HII','HSELFS','CHM','DD01/LV','DD06/RT','HRA'],
  'HSE Advisor':['ORT','HSEI','H2S','FTW','EA','HII','HSELFS','CHM','DD01/LV','DD06/RT','SJM','HRA'],
  'Project Engineer':['ORT','HSEI','H2S','FTW','EA','HSELFS','DD01/LV','DD06/RT'],
  'Planning Engineer':['ORT','HSEI','H2S','FTW','HSELFS','DD01/LV','DD06/RT'],
  'Site Manager':['ORT','HSEI','H2S','FTW','EA','HII','PTW-S','HSELFS','DD01/LV','DD06/RT','SJM','HRA'],
  'Works Coordinator':['ORT','HSEI','H2S','FTW','HSELFS','DD01/LV','DD06/RT'],
  'Plant Engineer/LS':['ORT','HSEI','H2S','FTW','HSELFS','DD01/LV','DD06/RT','AP'],
  'Journey Manager':['ORT','HSEI','H2S','FTW','HSELFS','DD01/LV','DD03/GR','DD06/RT','SJM'],
  'QA/QC':['ORT','HSEI','H2S','FTW','DD01/LV','DD06/RT'],
  'PTW Authoriser':['ORT','HSEI','H2S','FTW','SCBA','EA','HII','PTW-H','PTW-S','HSELFS','DD01/LV','DD06/RT','HRA','AP'],
  'PTW Issuer':['ORT','HSEI','H2S','FTW','SCBA','PTW-H','HSELFS','DD01/LV','DD06/RT','HRA'],
  'Permit Applicant':['ORT','HSEI','H2S','FTW','SCBA','AGT','PTW-S','HSELFS','DD01/LV','DD06/RT','HRA'],
  'Permit Holder':['ORT','HSEI','H2S','FTW','SCBA','AGT','PTW-H','HSELFS','DD01/LV','DD06/RT','HRA'],
  'Foreman':['ORT','HSEI','H2S','FTW','PTW-H','HSELFS','DD01/LV','DD06/RT','HRA'],
  'Male Nurse':['ORT','HSEI','H2S','FTW','AHAF','DD01/LV','DD06/RT'],
  'Material Controller':['ORT','HSEI','H2S','FTW','DD01/LV','DD06/RT'],
  'Store in Charge':['ORT','HSEI','H2S','FTW','DD01/LV','DD06/RT'],
  'Office Staff':['ORT','HSEI','FTW'],
  'Camp Boss':['ORT','HSEI','H2S','FTW','DD01/LV','DD06/RT','HACCP'],
  'Catering Supervisor':['ORT','HSEI','H2S','FTW','DD01/LV','DD06/RT','HACCP'],
  'Food Handlers':['ORT','HSEI','FTW','HACCP'],
  'Worker':['ORT','HSEI','H2S','FTW'],
  'Operator (Plant)':['ORT','HSEI','H2S','FTW','DD01/LV','DD06/RT'],
  'Operator (Forklift)':['ORT','HSEI','H2S','FTW','DD06/RT','FLOP'],
  'Operator (HIAB)':['ORT','HSEI','H2S','FTW','DD01/LV','DD02/HV','DD06/RT','HIAB'],
  'Operator (Crane)':['ORT','HSEI','H2S','FTW','DD01/LV','DD02/HV','DD06/RT','MCOP'],
  'Operator (MEWP)':['ORT','HSEI','H2S','FTW','DD06/RT','MEWP'],
  'Operator (SOTC)':['ORT','HSEI','H2S','FTW','DD06/RT','OTCO'],
  'Operator (Side Boom)':['ORT','HSEI','H2S','FTW','DD02/HV','DD06/RT','RNB'],
  'AP (Appointed Person)':['ORT','HSEI','H2S','FTW','EA','HSELFS','DD01/LV','DD06/RT','HRA','AP'],
  'Lifting Supervisor':['ORT','HSEI','H2S','FTW','PTW-H','HSELFS','DD01/LV','DD06/RT','HRA','LS/SLOT'],
  'LEC':['ORT','HSEI','H2S','FTW','DD01/LV','DD06/RT','HRA'],
  'Rigger':['ORT','HSEI','H2S','FTW','DD01/LV','DD06/RT','RNB'],
  'Scaffold Erector':['ORT','HSEI','H2S','FTW','DD06/RT','CISRS-L1'],
  'Scaffold Inspector':['ORT','HSEI','H2S','FTW','DD06/RT','CISRS-L1'],
  'Driver (LDD)':['ORT','HSEI','H2S','FTW','DD01/LV','DD06/RT','VMN'],
  'Driver (HDD)':['ORT','HSEI','H2S','FTW','DD02/HV','DD06/RT','VMN']
};

// ── DESIGNATION MAP ─────────────────────────────────────────────
const DM = {
  'QA/QC Engineer - Civil':'QA/QC','QA/QC Engineer - Electrom':'QA/QC','QCI - Welding':'QA/QC','QCI - Civil':'QA/QC','QCI - Civil Structures':'QA/QC','QCI - Materials':'QA/QC','QC Inspector - Electrical':'QA/QC','QCI - Coating':'QA/QC','QCI - E&I':'QA/QC','QCI - Electrical & Instru':'QA/QC','QCI - GRE':'QA/QC','QCI - PE Lining':'QA/QC','Jr QCI - Materials':'QA/QC','Jr QCI - PE Lining':'QA/QC',
  'Site Engineer - Mechanical':'Permit Applicant','Site Engineer - Civil':'Permit Applicant','Site Engineer - Mechanica':'Permit Applicant','Site Engineer - Electrica':'Permit Applicant','Site Engineer - Chemical':'Permit Applicant','Site Engineer - GRE - Mec':'Permit Applicant','Site Engineer - Permit -':'Permit Applicant','Jr Engineer - Site (Civil':'Permit Applicant','Jr Engineer - Site (Elect':'Permit Applicant','Jr Engineer - Site (Mecha':'Permit Applicant','Sr Engineer - Site (Hydro':'Permit Applicant',
  'Permit Applicant - Civil':'Permit Applicant','Permit Applicant - Mechan':'Permit Applicant','Permit Applicant - Electr':'Permit Applicant','Permit Applicant - Instru':'Permit Applicant','Supervisor - Permit - Civ':'Permit Applicant','Supervisor - Permit - Ele':'Permit Applicant','Supervisor - Permit - Ins':'Permit Applicant','Supervisor - Permit - Mec':'Permit Applicant',
  'Permit Holder - Civil':'Permit Holder','Permit Holder - Mechanica':'Permit Holder','Permit Holder - Electrica':'Permit Holder','Permit Holder - Instrumen':'Permit Holder','Permit Holder - Painting':'Permit Holder','Permit Holder Jr - Civil':'Permit Holder','Permit Holder Jr - Electr':'Permit Holder','Permit Holder Jr - Mechan':'Permit Holder','Permit Holder Sr - Civil':'Permit Holder','Permit Holder Sr - Electr':'Permit Holder','Permit Holder Sr - Instru':'Permit Holder','Permit Holder Sr - Mechan':'Permit Holder','Permit Holder (Civil)':'Permit Holder',
  'PTW - Issuer':'PTW Issuer','PTW Authorizer':'PTW Authoriser',
  'Driver - Heavy Duty':'Driver (HDD)','Driver - Heavy Duty (A)':'Driver (HDD)','Driver - Heavy Duty (ATE)':'Driver (HDD)','Driver - Heavy Duty (O&G)':'Driver (HDD)','Driver Material - Heavy D':'Driver (HDD)','Driver Material - Extra H':'Driver (HDD)','Worker - Heavy Vehicle':'Driver (HDD)','Driver - HD (With License':'Driver (HDD)','Driver Manpower - Heavy D':'Driver (HDD)',
  'Driver - Light Duty':'Driver (LDD)','Driver - Light Duty (A)':'Driver (LDD)','Driver - LD (ATE)':'Driver (LDD)','Driver Manpower - Light D':'Driver (LDD)',
  'Operator - ForkLift (O&G)':'Operator (Forklift)',
  'Operator - Crane':'Operator (Crane)','Operator - Mobile Crane':'Operator (Crane)','Operator - Mobile Crane (':'Operator (Crane)',
  'Operator - 3&4CX 10TR':'Operator (Plant)','Operator - 3&4CX, 10TR':'Operator (Plant)','Operator - 3&4CX, 10TR (A':'Operator (Plant)','Operator - 3&4CX, 10TR (O':'Operator (Plant)','Operator - Bulldozer':'Operator (Plant)','Operator - Bulldozer (O&G':'Operator (Plant)','Operator - Excavator':'Operator (Plant)','Operator - Excavator (O&G':'Operator (Plant)','Operator - Grader':'Operator (Plant)','Operator - Grader (O&G)':'Operator (Plant)','Operator - Major Equipmen':'Operator (Plant)','Operator - TL, 3&4CX, 10T':'Operator (Plant)','Operator Plant(D/L)':'Operator (Plant)','Operator - Showel':'Operator (Plant)','Operator - Showel (A)':'Operator (Plant)','Operator - Showel (O&G)':'Operator (Plant)','Operator-Major Earth movi':'Operator (Plant)','Operator-Major Eqp (Licen':'Operator (Plant)','JCB OPERATOR':'Operator (Plant)','Operator JCB':'Operator (Plant)',
  'Stores Engineer - General':'Store in Charge','Supervisor - Stores':'Store in Charge','Storekeeper':'Store in Charge','Storekeeper (O&G)':'Store in Charge','Storekeeper Jr':'Store in Charge','Storekeeper Jr (O&G)':'Store in Charge','Store Keeper':'Store in Charge','Jr Engineer - Stores (Gen':'Store in Charge','Sr Engineer - Stores (Mec':'Store in Charge','Stores Specialist - Gener':'Store in Charge',
  'Admin & IM Executive':'Office Staff','IM Executive':'Office Staff','Logistics Controller':'Office Staff','Security Guard (O&G)':'Office Staff','Security Guard':'Office Staff','Security Executive':'Office Staff','Admin Executive':'Office Staff','Admin Lead':'Office Staff','Admin Manager':'Office Staff','Office Assistant':'Office Staff','Office Assistant Jr':'Office Staff','Office Assistant Sr':'Office Staff','Office Boy Jr':'Office Staff','Time Admin':'Office Staff','Time Keeper':'Office Staff','Executive Assistant':'Office Staff','Document Controller':'Office Staff','Cost Assistant':'Office Staff','Jr Engineer - Cost':'Office Staff','HR Officer':'Office Staff','Public Relation Officer':'Office Staff','Public Relation Officer S':'Office Staff','IT Technical Services Exe':'Office Staff','IM & Document Control Exe':'Office Staff','IM Engineer':'Office Staff','CSC Executive':'Office Staff','Executive - Business Proc':'Office Staff','Executive - Procurement':'Office Staff','Facilities Technical Exec':'Office Staff','PEL Admin Officer':'Office Staff','PEL Executive':'Office Staff','PEL Lead':'Office Staff',
  'Land Surveyor':'Project Engineer','Quantity Surveyor':'Project Engineer','Sr Quantity Surveyor':'Project Engineer','Jr Quantity Surveyor':'Project Engineer','Quantity Surveyor Executi':'Project Engineer','Officer - Land Survey':'Project Engineer','Officer - Drafting (Civil':'Project Engineer','Worker - Survey':'Project Engineer','Sr Executive - Quantity S':'Project Engineer','Jr Executive - Quantity S':'Project Engineer',
  'HSE Advisor':'HSE Advisor','H.S.E Advisor':'HSE Advisor','HSE Officer':'HSE Advisor','HSE Lead':'HSE Advisor','Health & Safety Advisor (':'HSE Advisor','HSE Advisor (A)':'HSE Advisor',
  'HSE Manager':'HSE Manager','Nurse':'Male Nurse',
  'Foreman':'Foreman','Foreman - Civil':'Foreman','Foreman Trade - Mechanica':'Foreman','Foreman - Transport':'Foreman','Foreman - Automotive Work':'Foreman',
  'Rigger':'Rigger','Rigger Jr':'Rigger','Rigger Sr':'Rigger','Rigger (A)':'Rigger','Rigger Jr (A)':'Rigger','Banksman':'Rigger','Banksman (A)':'Rigger','Banksman Jr':'Rigger','Worker - Banksman':'Rigger',
  'Scaffolder':'Scaffold Erector','Lifting Equipment Control':'Lifting Supervisor',
  'Worker':'Worker','Worker - Store':'Worker','Worker - Security':'Worker','Facility Attendant':'Worker','Attendant':'Worker',
  'Camp Boss':'Camp Boss','Catering Supervisor':'Catering Supervisor','Charge Hand Sr - Catering':'Catering Supervisor',
  'Cook':'Food Handlers','Cook - Chief':'Food Handlers','Cook - Vegetarian':'Food Handlers','Cook Jr - Non Vegetarian':'Food Handlers','Cook Jr - Vegetarian':'Food Handlers','Catering Attendant':'Food Handlers','Catering Helper':'Food Handlers','Catering Executive':'Food Handlers',
  'Sr Engineer - Projects (M':'Project Engineer','Engineer - Projects (Mech':'Project Engineer','Engineer (Planning)':'Planning Engineer','Jr Engineer - Planning':'Planning Engineer','Planning Engineer - Elect':'Planning Engineer',
  'Construction Manager - Ci':'Construction Manager','Construction Manager - Oi':'Construction Manager','Manager - Site (Electrica':'Site Manager','Deputy Manager - Site (Me':'Site Manager','Engineer - Plant & Equipm':'Plant Engineer/LS','Material Coordinator':'Material Controller','Training Supervisor':'Works Coordinator','Project Construction Coor':'Works Coordinator','Engineering Manager':'Construction Manager','General Manager - Corpora':'Contract Manager','Project Manager - Oil & G':'Contract Manager','Procurement Manager':'Contract Manager'
};

// ── STATE ────────────────────────────────────────────────────────
let hEmp = [];  // HSE processed employees
let fEmp = [];  // FTW processed employees

// ── NAVIGATION ──────────────────────────────────────────────────
function switchPage(p) {
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.sb-nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById('page-' + p).classList.add('active');
  document.getElementById('nav-' + p).classList.add('active');
}

// ── HELPERS ─────────────────────────────────────────────────────
const mc = n => CM[n.trim()] || n.trim();

function mr(d, srvMap) {
  if (DM[d]) return DM[d];
  for (const k of Object.keys(DM)) {
    if (d.startsWith(k.substring(0, 16))) return DM[k];
  }
  if (srvMap && srvMap[d]) return srvMap[d];
  return null;
}

function cs(e) {
  if (!e) return 'MISSING';
  const d = (new Date(e) - new Date()) / 864e5;
  return d < 0 ? 'EXPIRED' : d < 60 ? 'EXPIRING' : 'OK';
}

function daysLeft(e) {
  if (!e) return null;
  return Math.round((new Date(e) - new Date()) / 864e5);
}

function clShort(c) { return (c || '').split('PDO-').pop() || c || ''; }

function bar(p) {
  const c = p >= 90 ? '#0f7b6c' : p >= 70 ? '#ba7517' : '#a32d2d';
  return `<div class="bar-wrap"><div class="bar-track"><div class="bar-fill" style="width:${p}%;background:${c}"></div></div><span class="bar-pct">${p}%</span></div>`;
}

// ── PROCESS DATA ─────────────────────────────────────────────────
function processAll(rows, srvMap) {
  const map = {};
  for (const r of rows) {
    if (!r.name && !r.atnmId) continue;
    const k = (r.atnmId || '') + '||' + (r.name || '');
    if (!map[k]) {
      const role = mr(r.designation, srvMap);
      map[k] = { k, name: r.name, atnmId: r.atnmId, desig: r.designation, role, cluster: r.cluster, courses: {} };
    }
    const code = mc(r.course);
    if (!map[k].courses[code] || (r.expiryDate && r.expiryDate > map[k].courses[code])) {
      map[k].courses[code] = r.expiryDate;
    }
  }

  const hOut = [], fOut = [];

  for (const e of Object.values(map)) {
    // ─ HSE processing ─
    if (e.role) {
      const req = RM[e.role];
      if (req) {
        const gaps = [], exp = [], warn = [], ok = [];
        for (const c of req) {
          const s = cs(e.courses[c]);
          if (s === 'MISSING') gaps.push(c);
          else if (s === 'EXPIRED') exp.push(c);
          else if (s === 'EXPIRING') warn.push(c);
          else ok.push(c);
        }
        const issues = gaps.length + exp.length;
        const pct = Math.round(((req.length - issues) / req.length) * 100);
        const st = gaps.length ? 'GAP' : exp.length ? 'EXPIRED' : warn.length ? 'EXPIRING' : 'COMPLIANT';
        hOut.push({ ...e, gaps, exp, warn, ok, pct, st, total: req.length });
      }
    }

    // ─ FTW processing ─ (all employees regardless of role match)
    const ftwExp = e.courses['FTW'] || null;
    const ftwStatus = cs(ftwExp);
    const ftwSt = ftwStatus === 'MISSING' ? 'MISSING' : ftwStatus === 'EXPIRED' ? 'EXPIRED' : ftwStatus === 'EXPIRING' ? 'EXPIRING' : 'VALID';
    const days = daysLeft(ftwExp);
    fOut.push({ ...e, ftwExp, ftwSt, days });
  }

  return { hOut, fOut };
}

// ── HSE RENDER ───────────────────────────────────────────────────
function hRenderKPIs(emp) {
  const tot = emp.length, avg = tot ? Math.round(emp.reduce((s, x) => s + x.pct, 0) / tot) : 0;
  [tot, avg + '%', emp.filter(x => x.st === 'GAP').length, emp.filter(x => x.st === 'EXPIRED').length, emp.filter(x => x.st === 'EXPIRING').length]
    .forEach((v, i) => document.getElementById('h-k' + i).textContent = v);
}

function hRenderCluster(emp) {
  const m = {};
  for (const e of emp) {
    const cl = clShort(e.cluster);
    if (!m[cl]) m[cl] = { t: 0, ok: 0 };
    m[cl].t++;
    if (e.st === 'COMPLIANT') m[cl].ok++;
  }
  document.getElementById('h-cluster').innerHTML = Object.entries(m)
    .sort((a, b) => (b[1].ok / b[1].t) - (a[1].ok / a[1].t))
    .map(([cl, v]) => {
      const p = Math.round((v.ok / v.t) * 100);
      const c = p >= 90 ? '#0f7b6c' : p >= 70 ? '#ba7517' : '#a32d2d';
      return `<div style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;font-size:11px;color:#6b7280;margin-bottom:3px">
          <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:200px" title="${cl}">${cl}</span>
          <span style="font-weight:600;color:#333">${p}% <span style="font-weight:400">(${v.ok}/${v.t})</span></span>
        </div>
        <div style="height:6px;background:#f0f0f0;border-radius:3px;overflow:hidden">
          <div style="height:100%;width:${p}%;background:${c};border-radius:3px"></div>
        </div></div>`;
    }).join('') || 'No data';
}

function hRenderCourses(emp) {
  const gc = {};
  for (const e of emp) for (const c of [...e.gaps, ...e.exp]) gc[c] = (gc[c] || 0) + 1;
  const s = Object.entries(gc).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const mx = s[0]?.[1] || 1;
  document.getElementById('h-courses').innerHTML = s.map(([c, n]) =>
    `<div style="margin-bottom:9px">
      <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
        <span style="font-family:monospace;color:#6b7280">${c}</span>
        <span style="font-weight:600;color:#a32d2d">${n}</span>
      </div>
      <div style="height:5px;background:#f0f0f0;border-radius:3px;overflow:hidden">
        <div style="height:100%;width:${Math.round((n / mx) * 100)}%;background:#a32d2d;border-radius:3px"></div>
      </div></div>`
  ).join('') || '<span style="color:#0f7b6c">No gaps detected</span>';
}

function hRenderTable() {
  const q = document.getElementById('h-srch').value.toLowerCase();
  const fc = document.getElementById('h-fCl').value, fs = document.getElementById('h-fSt').value, fr = document.getElementById('h-fRl').value;
  const f = hEmp.filter(e => {
    if (q && !e.name.toLowerCase().includes(q) && !e.atnmId.includes(q) && !(e.cluster || '').toLowerCase().includes(q)) return false;
    if (fc && !e.cluster.includes(fc)) return false;
    if (fs && e.st !== fs) return false;
    if (fr && e.role !== fr) return false;
    return true;
  }).sort((a, b) => a.pct - b.pct);
  const pg = f.slice(0, 300);
  document.getElementById('h-tbody').innerHTML = pg.map(e => {
    const issues = [
      ...e.gaps.map(c => `<span class="pill p-gap">${c}</span>`),
      ...e.exp.map(c => `<span class="pill p-exp">${c}</span>`),
      ...e.warn.map(c => `<span class="pill p-warn">${c}</span>`)
    ].join('') || `<span style="font-size:10px;color:#0f7b6c;font-weight:500">All current</span>`;
    return `<tr>
      <td style="font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${e.name}">${e.name}</td>
      <td style="font-family:monospace;font-size:10px;color:#888">${e.atnmId}</td>
      <td style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#555" title="${e.role}">${e.role}</td>
      <td style="font-size:10px;color:#888;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${clShort(e.cluster)}</td>
      <td>${bar(e.pct)}</td>
      <td style="line-height:2">${issues}</td>
      <td style="text-align:center"><span class="badge b-${e.st}">${{ GAP: 'Gap', EXPIRED: 'Expired', EXPIRING: 'Expiring', COMPLIANT: 'Compliant' }[e.st]}</span></td>
    </tr>`;
  }).join('') || '<tr><td colspan="7" class="empty">No results</td></tr>';
  document.getElementById('h-tfoot').textContent = `Showing ${pg.length} of ${f.length} employees`;
}

function hRenderFlags(emp) {
  const fl = [
    { l: 'H', n: emp.filter(e => e.gaps.includes('PTW-H') || e.gaps.includes('PTW-S') || e.exp.includes('PTW-H') || e.exp.includes('PTW-S')).length, m: 'PTW holders with missing or expired PTW certification — direct PDO audit finding' },
    { l: 'H', n: emp.filter(e => ['Driver (LDD)', 'Driver (HDD)'].includes(e.role) && (e.gaps.includes('FTW') || e.exp.includes('FTW'))).length, m: 'Professional drivers — FTW medical missing or expired (SP-2000 V5 mandatory)' },
    { l: 'H', n: emp.filter(e => e.gaps.includes('DD06/RT') || e.exp.includes('DD06/RT')).length, m: 'Employees missing or expired DD06/RT defensive driving' },
    { l: 'M', n: emp.filter(e => e.gaps.includes('H2S') || e.exp.includes('H2S')).length, m: 'H2S-exposed roles with missing or expired H2S certification' },
    { l: 'M', n: emp.filter(e => e.gaps.includes('HSELFS') || e.exp.includes('HSELFS')).length, m: 'Supervisory staff missing HSELFS leadership course' },
    { l: 'M', n: emp.filter(e => e.gaps.includes('ORT')).length, m: 'Employees missing ORT — pre-mobilisation requirement not met' },
    { l: 'I', n: emp.filter(e => e.st === 'EXPIRING').length, m: 'Employees with courses expiring within 60 days — schedule renewals now' },
  ].filter(x => x.n > 0);
  const bg = { H: '#fce8e8', M: '#fef3e2', I: '#e8f0fe' };
  const tx = { H: '#a32d2d', M: '#ba7517', I: '#185fa5' };
  const lb = { H: 'HIGH', M: 'MED', I: 'INFO' };
  document.getElementById('h-flags').innerHTML = fl.map(x =>
    `<div class="flag flag-${x.l}"><span class="flag-lbl">${lb[x.l]}</span><span><strong>${x.n}</strong> ${x.m}</span></div>`
  ).join('') || '<span style="color:#0f7b6c">No critical flags detected</span>';
}

function hPopulateFilters(emp) {
  const cls = [...new Set(emp.map(e => e.cluster).filter(Boolean))].sort();
  const rls = [...new Set(emp.map(e => e.role).filter(Boolean))].sort();
  document.getElementById('h-fCl').innerHTML = '<option value="">All clusters</option>' + cls.map(c => `<option value="${c}">${clShort(c)}</option>`).join('');
  document.getElementById('h-fRl').innerHTML = '<option value="">All roles</option>' + rls.map(r => `<option value="${r}">${r}</option>`).join('');
}

// ── FTW RENDER ────────────────────────────────────────────────────
function fRenderKPIs(emp) {
  const tot = emp.length;
  const valid = emp.filter(e => e.ftwSt === 'VALID').length;
  const missing = emp.filter(e => e.ftwSt === 'MISSING').length;
  const expired = emp.filter(e => e.ftwSt === 'EXPIRED').length;
  const expiring = emp.filter(e => e.ftwSt === 'EXPIRING').length;
  [tot, valid, missing, expired, expiring].forEach((v, i) => document.getElementById('f-k' + i).textContent = v);
}

function fRenderCluster(emp) {
  const m = {};
  for (const e of emp) {
    const cl = clShort(e.cluster);
    if (!m[cl]) m[cl] = { t: 0, ok: 0 };
    m[cl].t++;
    if (e.ftwSt === 'VALID') m[cl].ok++;
  }
  document.getElementById('f-cluster').innerHTML = Object.entries(m)
    .sort((a, b) => (b[1].ok / b[1].t) - (a[1].ok / a[1].t))
    .map(([cl, v]) => {
      const p = Math.round((v.ok / v.t) * 100);
      const c = p >= 90 ? '#0f7b6c' : p >= 70 ? '#ba7517' : '#a32d2d';
      return `<div style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;font-size:11px;color:#6b7280;margin-bottom:3px">
          <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:200px" title="${cl}">${cl}</span>
          <span style="font-weight:600;color:#333">${p}% <span style="font-weight:400">(${v.ok}/${v.t})</span></span>
        </div>
        <div style="height:6px;background:#f0f0f0;border-radius:3px;overflow:hidden">
          <div style="height:100%;width:${p}%;background:${c};border-radius:3px"></div>
        </div></div>`;
    }).join('') || 'No data';
}

function fRenderRole(emp) {
  const m = {};
  for (const e of emp) {
    const r = e.role || 'Unknown';
    if (!m[r]) m[r] = { t: 0, ok: 0 };
    m[r].t++;
    if (e.ftwSt === 'VALID') m[r].ok++;
  }
  const sorted = Object.entries(m).sort((a, b) => (a[1].ok / a[1].t) - (b[1].ok / b[1].t)).slice(0, 12);
  const mx = sorted[0] ? sorted[0][1].t : 1;
  document.getElementById('f-role').innerHTML = sorted.map(([r, v]) => {
    const p = Math.round((v.ok / v.t) * 100);
    const c = p >= 90 ? '#0f7b6c' : p >= 70 ? '#ba7517' : '#a32d2d';
    return `<div style="margin-bottom:9px">
      <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
        <span style="color:#6b7280;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:180px">${r}</span>
        <span style="font-weight:600;color:#333">${p}%</span>
      </div>
      <div style="height:5px;background:#f0f0f0;border-radius:3px;overflow:hidden">
        <div style="height:100%;width:${p}%;background:${c};border-radius:3px"></div>
      </div></div>`;
  }).join('') || 'No data';
}

function fRenderTable() {
  const q = document.getElementById('f-srch').value.toLowerCase();
  const fc = document.getElementById('f-fCl').value, fs = document.getElementById('f-fSt').value, fr = document.getElementById('f-fRl').value;
  const order = { MISSING: 0, EXPIRED: 1, EXPIRING: 2, VALID: 3 };
  const f = fEmp.filter(e => {
    if (q && !e.name.toLowerCase().includes(q) && !e.atnmId.includes(q) && !(e.cluster || '').toLowerCase().includes(q)) return false;
    if (fc && !e.cluster.includes(fc)) return false;
    if (fs && e.ftwSt !== fs) return false;
    if (fr && e.role !== fr) return false;
    return true;
  }).sort((a, b) => (order[a.ftwSt] || 0) - (order[b.ftwSt] || 0));
  const pg = f.slice(0, 300);

  const stLabel = { MISSING: 'Missing', EXPIRED: 'Expired', EXPIRING: 'Expiring', VALID: 'Valid' };
  const stBadge = { MISSING: 'b-MISSING', EXPIRED: 'b-EXPIRED', EXPIRING: 'b-EXPIRING', VALID: 'b-VALID' };

  document.getElementById('f-tbody').innerHTML = pg.map(e => {
    const d = e.days;
    let daysHtml = '—';
    if (d !== null) {
      const col = d < 0 ? '#a32d2d' : d < 60 ? '#ba7517' : '#0f7b6c';
      daysHtml = `<span style="font-weight:600;color:${col}">${d < 0 ? 'Expired ' + Math.abs(d) + 'd ago' : d + ' days'}</span>`;
    }
    return `<tr>
      <td style="font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${e.name}">${e.name}</td>
      <td style="font-family:monospace;font-size:10px;color:#888">${e.atnmId}</td>
      <td style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#555">${e.role || '<em style="color:#ccc">unmapped</em>'}</td>
      <td style="font-size:10px;color:#888;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${clShort(e.cluster)}</td>
      <td style="font-size:11px;font-family:monospace;color:#555">${e.ftwExp || '—'}</td>
      <td style="text-align:center">${daysHtml}</td>
      <td style="text-align:center"><span class="badge ${stBadge[e.ftwSt]}">${stLabel[e.ftwSt]}</span></td>
    </tr>`;
  }).join('') || '<tr><td colspan="7" class="empty">No results</td></tr>';
  document.getElementById('f-tfoot').textContent = `Showing ${pg.length} of ${f.length} employees`;
}

function fRenderFlags(emp) {
  const drivers = emp.filter(e => e.role && (e.role.includes('Driver')));
  const fl = [
    { l: 'H', n: emp.filter(e => e.ftwSt === 'MISSING').length, m: 'Employees with no FTW medical record at all — must be resolved before site access' },
    { l: 'H', n: emp.filter(e => e.ftwSt === 'EXPIRED').length, m: 'Employees with expired FTW medical — not cleared for continued site presence' },
    { l: 'H', n: drivers.filter(e => e.ftwSt !== 'VALID').length, m: 'Professional drivers (LDD/HDD) without valid FTW — SP-2000 V5 non-compliance' },
    { l: 'M', n: emp.filter(e => e.ftwSt === 'EXPIRING').length, m: 'Employees with FTW expiring within 60 days — arrange medical renewals now' },
    { l: 'M', n: emp.filter(e => e.days !== null && e.days > 0 && e.days < 30).length, m: 'Employees with FTW expiring in under 30 days — urgent renewal required' },
    { l: 'I', n: emp.filter(e => !e.role).length, m: 'Employees with unmapped designations — role matrix cannot be applied, review designation mapping' },
  ].filter(x => x.n > 0);
  const bg = { H: '#fce8e8', M: '#fef3e2', I: '#e8f0fe' };
  const tx = { H: '#a32d2d', M: '#ba7517', I: '#185fa5' };
  const lb = { H: 'HIGH', M: 'MED', I: 'INFO' };
  document.getElementById('f-flags').innerHTML = fl.map(x =>
    `<div class="flag flag-${x.l}"><span class="flag-lbl">${lb[x.l]}</span><span><strong>${x.n}</strong> ${x.m}</span></div>`
  ).join('') || '<span style="color:#0f7b6c">No FTW flags detected</span>';
}

function fPopulateFilters(emp) {
  const cls = [...new Set(emp.map(e => e.cluster).filter(Boolean))].sort();
  const rls = [...new Set(emp.map(e => e.role).filter(Boolean))].sort();
  document.getElementById('f-fCl').innerHTML = '<option value="">All clusters</option>' + cls.map(c => `<option value="${c}">${clShort(c)}</option>`).join('');
  document.getElementById('f-fRl').innerHTML = '<option value="">All roles</option>' + rls.map(r => `<option value="${r}">${r}</option>`).join('');
}

// ── LOAD DATA ────────────────────────────────────────────────────
async function loadData() {
  const btn = document.getElementById('btnLoad');
  const dot = document.getElementById('sb-dot');
  const lbl = document.getElementById('sb-label');
  const tim = document.getElementById('sb-time');
  btn.disabled = true;
  lbl.textContent = 'Connecting…';
  dot.className = 'sb-dot';

  try {
    const data = await new Promise((resolve, reject) => {
      const id = 'tracsCB_' + Date.now();
      const s = document.createElement('script');
      let done = false;
      const t = setTimeout(() => {
        if (!done) { done = true; s.remove(); try { delete window[id]; } catch (e) { } reject(new Error('Timeout — server took too long')); }
      }, 45000);
      window[id] = d => { if (!done) { done = true; clearTimeout(t); s.remove(); try { delete window[id]; } catch (e) { } resolve(d); } };
      s.onerror = () => { if (!done) { done = true; clearTimeout(t); s.remove(); try { delete window[id]; } catch (e) { } reject(new Error('Script blocked — check "Who has access = Anyone" in deployment')); } };
      s.src = API + '?callback=' + id + '&nocache=' + Date.now();
      document.head.appendChild(s);
    });

    if (!data.success) throw new Error(data.error || 'API returned error');

    // Update sidebar status
    dot.className = 'sb-dot live';
    lbl.textContent = Number(data.totalRecords).toLocaleString() + ' records';
    tim.textContent = data.generatedAt;

    // Process data once, feed both dashboards
    const { hOut, fOut } = processAll(data.sapData, data.designationMap);
    hEmp = hOut;
    fEmp = fOut;

    // Render HSE dashboard
    hRenderKPIs(hEmp);
    hRenderCluster(hEmp);
    hRenderCourses(hEmp);
    hPopulateFilters(hEmp);
    hRenderTable();
    hRenderFlags(hEmp);

    // Render FTW dashboard
    fRenderKPIs(fEmp);
    fRenderCluster(fEmp);
    fRenderRole(fEmp);
    fPopulateFilters(fEmp);
    fRenderTable();
    fRenderFlags(fEmp);

  } catch (err) {
    dot.className = 'sb-dot';
    lbl.textContent = 'Error';
    tim.textContent = err.message;
    const errHtml = `<tr><td colspan="7"><div class="err-box">
      <strong>Connection failed</strong>
      <p>${err.message}</p>
      <div class="err-steps">1. Apps Script → Deploy → Manage deployments<br>2. Edit → Who has access = <strong>Anyone</strong><br>3. Deploy new version → reload and retry</div>
    </div></td></tr>`;
    document.getElementById('h-tbody').innerHTML = errHtml;
    document.getElementById('f-tbody').innerHTML = errHtml;
  } finally {
    btn.disabled = false;
  }
}
</script>
</body>
</html>
