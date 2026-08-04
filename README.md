# HSE TRACS — ATNM HSE Training and Compliance System

**Al Tasnim Enterprises (ATNM) · PDO ODC Contract · Oman**

A live HSE training compliance dashboard built against PDO standards SP-1157 v4.1 and SP-2000 V5. Pulls real-time data from SAP training records via Google Sheets and scores every employee against their role-specific course requirements.

---

## Live Dashboard

🔗 **[Open TRACS Dashboard](https://paulmanjooran.github.io/ATNM-HSE-TRACS/TRACS_Dashboard_v2.html)**

> Open in Chrome while logged into your @altasnim.com Google account. Click **Load Live Data** to connect.

---

## What it does

- Reads ~23,000 SAP training records live from Google Sheets
- Maps 789 employees across 63 ODC clusters to 44 defined roles
- Scores each employee against required courses per role
- Flags GAP / EXPIRED / EXPIRING / COMPLIANT status per employee
- Two dashboards in one — HSE Training compliance + PDO FTW medical compliance

---

## Governing Standards

| Standard | Description |
|---|---|
| PDO SP-1157 v4.1 | HSE Training — OPAL Unified Courses, 44 roles × 43 courses |
| PDO SP-2000 V5 | Road Safety — Fit to Work medical, defensive driving |
| ATNM-HSE-TRM-001 | Internal training matrix reference |

---

## Dashboard sections

### HSE Training Dashboard
- KPI cards — total employees, avg compliance %, gaps, expired, expiring
- Compliance % by ODC cluster
- Top 10 gap courses across workforce
- Employee compliance register — filterable by cluster, role, status
- Audit flags aligned to SP-1157 v4.1

### PDO FTW Dashboard
- FTW medical compliance — valid, missing, expired, expiring
- FTW compliance by cluster and by role
- Employee FTW register with days-remaining column
- Audit flags aligned to SP-2000 V5

---

## File structure

```
ATNM-HSE-TRACS/
├── README.md                      — this file
├── TRACS_Dashboard_v2.html        — live dashboard (open in Chrome)
├── TRACS_WebApp_v4.gs             — Google Apps Script API backend
└── archive/
    ├── TRACS_WebApp_v1.gs
    ├── TRACS_WebApp_v2.gs
    └── TRACS_WebApp_v3.gs
```

---

## Architecture

```
Google Sheets (SAP Data)
        ↓
Apps Script Web App (JSONP API)
        ↓
TRACS_Dashboard_v2.html (Chrome)
        ↓
Live compliance results
```

---

## Data source

**Google Sheet:** TRACS-TRAINING RECORDS AND COMPLIANCE SYSTEM
- `HSE Training & FTW SAP Data` — raw SAP export (~23,000 records)
- `SAP VS Matrix Designation ` — SAP designation to matrix role mapping
- `HSE Training Matrix` — 44-role × 43-course compliance matrix

---

## Access

The dashboard is accessible to all **@altasnim.com** Google Workspace users.  
Open the live link above in Chrome — no login prompt, no installation required.

---

## Built by

**Paul Manjooran** — HSE Manager, Al Tasnim Enterprises  
PDO ODC Contract · Oman · 2025  
Standards: PDO SP-1157 v4.1 · SP-2000 V5 · ISO 45001
