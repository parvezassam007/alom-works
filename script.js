:root {
--primary-blue: #003b8f;
--secondary-blue: #0066d6;
--bright-blue: #1683ff;
--light-blue: #eaf2ff;
--soft-blue: #f5f9ff;
--dark-text: #172033;
--muted-text: #64748b;
--white: #ffffff;
--border: #cfe0ff;
--green: #0b8f55;
--red: #e53935;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  }

body {
font-family: "Poppins", Arial, sans-serif;
background: var(--light-blue);
color: var(--dark-text);
line-height: 1.6;
}

/* ================================
MAIN WEBSITE
================================ */

#billArea {
max-width: 1100px;
margin: 20px auto;
background: var(--white);
min-height: 100vh;
border-radius: 18px;
overflow: hidden;
box-shadow: 0 10px 35px rgba(30, 64, 175, 0.15);
}

/* ================================
HEADER
================================ */

.main-header {
background: linear-gradient(
135deg,
var(--primary-blue),
var(--secondary-blue),
var(--bright-blue)
);
color: white;
padding: 28px 25px;
}

.header-content {
display: flex;
justify-content: space-between;
align-items: center;
gap: 20px;
}

.logo {
display: flex;
align-items: center;
gap: 12px;
}

.logo i {
font-size: 32px;
color: #facc15;
}

.logo h1 {
font-size: 30px;
letter-spacing: 1px;
line-height: 1.2;
}

.logo p {
margin-top: 5px;
font-size: 14px;
opacity: 0.95;
}

.print-btn {
background: white;
color: var(--secondary-blue);
border: none;
padding: 12px 18px;
border-radius: 9px;
font-weight: 700;
cursor: pointer;
}

.print-btn:hover {
transform: translateY(-2px);
}

/* ================================
SERVICES
================================ */

.services-section {
padding: 42px 25px;
background: linear-gradient(
180deg,
#f8fbff,
#eaf2ff
);
}

.services-container {
max-width: 1050px;
margin: auto;
}

.services-title {
text-align: center;
color: var(--primary-blue);
font-size: 28px;
font-weight: 700;
}

.services-subtitle {
text-align: center;
color: var(--muted-text);
font-size: 14px;
margin-top: 5px;
margin-bottom: 28px;
}

.services-grid {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 22px;
}

/* SERVICE CARD */

.service-card {
background: white;
border-radius: 15px;
overflow: hidden;
border: 1px solid var(--border);
box-shadow: 0 5px 18px rgba(0, 76, 153, 0.09);
transition: 0.3s ease;
}

.service-card:hover {
transform: translateY(-6px);
box-shadow: 0 15px 30px rgba(0, 76, 153, 0.18);
border-color: var(--bright-blue);
}

/* SERVICE IMAGE */

.service-image {
width: 100%;
height: 200px;
overflow: hidden;
background: #dbeafe;
}

.service-image img {
width: 100%;
height: 100%;
object-fit: cover;
display: block;
transition: transform 0.4s ease;
}

.service-card:hover .service-image img {
transform: scale(1.07);
}

/* SERVICE CONTENT */

.service-content {
padding: 18px;
}

.service-content h3 {
color: var(--primary-blue);
font-size: 19px;
margin-bottom: 7px;
}

.service-content p {
color: #475569;
font-size: 13px;
line-height: 1.6;
}

/* ================================
BILLING MAIN
================================ */

main {
padding: 25px;
background: white;
}

.card {
background: white;
border: 1px solid var(--border);
border-left: 5px solid var(--secondary-blue);
border-radius: 14px;
padding: 20px;
margin-bottom: 18px;
box-shadow: 0 4px 15px rgba(0, 76, 153, 0.07);
}

.card h2 {
margin-bottom: 15px;
color: var(--secondary-blue);
font-size: 20px;
}

/* ================================
INPUTS
================================ */

label {
display: block;
margin: 12px 0 6px;
font-size: 14px;
font-weight: 600;
color: #28476b;
}

input,
textarea,
select {
width: 100%;
padding: 12px;
border: 2px solid #d5e5ff;
border-radius: 8px;
background: #f8fbff;
color: var(--dark-text);
font-family: inherit;
font-size: 14px;
outline: none;
}

input:focus,
textarea:focus,
select:focus {
border-color: var(--bright-blue);
background: white;
box-shadow: 0 0 0 3px rgba(22, 131, 255, 0.12);
}

textarea {
min-height: 80px;
resize: vertical;
}

/* ================================
INVOICE GRID
================================ */

.grid {
display: grid;
grid-template-columns: 1fr 1fr;
gap: 15px;
}

/* ================================
ITEM SECTION
================================ */

.section-title {
display: flex;
justify-content: space-between;
align-items: center;
gap: 10px;
}

.add-btn {
background: linear-gradient(
135deg,
var(--secondary-blue),
var(--bright-blue)
);
color: white;
border: none;
padding: 11px 17px;
border-radius: 8px;
font-weight: 700;
cursor: pointer;
}

.add-btn:hover {
transform: translateY(-2px);
}

/* ================================
ITEM ROW
================================ */

.item {
background: var(--soft-blue);
border: 2px solid var(--border);
padding: 15px;
border-radius: 11px;
margin-bottom: 12px;
}

.item-grid {
display: grid;
grid-template-columns: 2fr 1fr 1fr auto;
gap: 10px;
align-items: end;
}

/* ================================
TABLE
================================ */

.table-responsive {
width: 100%;
overflow-x: auto;
}

.items-table {
width: 100%;
border-collapse: collapse;
min-width: 650px;
}

.items-table th {
background: var(--light-blue);
color: var(--primary-blue);
padding: 11px;
text-align: left;
font-size: 13px;
}

.items-table td {
padding: 9px;
border-bottom: 1px solid var(--border);
}

.items-table input {
padding: 8px;
}

/* ================================
REMOVE BUTTON
================================ */

.btn-remove {
background: #fee2e2;
color: var(--red);
border: none;
padding: 8px 11px;
border-radius: 6px;
cursor: pointer;
}

.btn-remove:hover {
background: #fecaca;
}

/* ================================
TOTALS
================================ */

.totals {
background: linear-gradient(
135deg,
#eef6ff,
#ffffff
);
}

.totals > div {
display: flex;
justify-content: space-between;
align-items: center;
gap: 20px;
padding: 9px 5px;
}

.totals strong {
color: var(--secondary-blue);
}

.totals input {
max-width: 180px;
background: white;
}

.grand {
margin-top: 8px;
padding: 15px 5px !important;
border-top: 2px solid var(--bright-blue);
border-bottom: 2px solid var(--bright-blue);
font-size: 20px;
}

.grand strong {
color: var(--secondary-blue);
font-size: 24px;
}

.due {
color: var(--red);
font-size: 17px;
}

.due strong {
color: var(--red);
}

/* ================================
ACTION BUTTONS
================================ */

.actions {
display: flex;
gap: 10px;
flex-wrap: wrap;
margin: 22px 0;
justify-content: center;
}

.actions button {
border: none;
padding: 13px 18px;
border-radius: 9px;
color: white;
cursor: pointer;
font-weight: 700;
font-size: 14px;
transition: 0.2s;
}

.actions button:hover {
transform: translateY(-2px);
opacity: 0.92;
}

.save-btn {
background: var(--secondary-blue);
}

.jpg-btn {
background: var(--primary-blue);
}

.whatsapp-btn {
background: var(--green);
}

.clear-btn {
background: var(--red);
}

/* ================================
FOOTER
================================ */

footer {
text-align: center;
padding: 25px;
background: linear-gradient(
135deg,
#002b6b,
var(--primary-blue)
);
color: white;
}

footer h3 {
font-size: 19px;
margin-bottom: 5px;
}

footer p {
font-size: 13px;
margin: 4px;
opacity: 0.9;
}

/* ================================
JPG / PRINT
================================ */

.no-print {
/* hidden during print/JPG by JavaScript */
}

@media print {

body {
background: white;
}

#billArea {
max-width: none;
margin: 0;
border-radius: 0;
box-shadow: none;
}

.no-print {
display: none !important;
}

.services-section {
display: none;
}

.card {
box-shadow: none;
break-inside: avoid;
}
}

/* ================================
MOBILE
================================ */

@media (max-width: 700px) {

body {
background: var(--light-blue);
}

#billArea {
margin: 0;
border-radius: 0;
}

.main-header {
padding: 22px 15px;
}

.header-content {
flex-direction: column;
align-items: stretch;
text-align: center;
}

.logo {
justify-content: center;
}

.logo h1 {
font-size: 25px;
}

.logo i {
font-size: 27px;
}

.print-btn {
width: 100%;
}

.services-section {
padding: 30px 13px;
}

.services-title {
font-size: 24px;
}

.services-grid {
grid-template-columns: 1fr;
gap: 18px;
}

.service-image {
height: 210px;
}

main {
padding: 13px;
}

.card {
padding: 16px;
}

.grid {
grid-template-columns: 1fr;
}

.section-title {
flex-direction: column;
align-items: stretch;
}

.add-btn {
width: 100%;
}

.totals > div {
flex-wrap: wrap;
}

.totals input {
max-width: 100%;
}

.actions {
flex-direction: column;
}

.actions button {
width: 100%;
}

footer {
padding: 20px 10px;
}
  }
