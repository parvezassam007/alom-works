* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --blue: #2563eb;
  --dark: #0f172a;
  --text: #1e293b;
  --muted: #64748b;
  --bg: #f1f5f9;
  --white: #ffffff;
  --green: #16a34a;
  --red: #dc2626;
  --purple: #7c3aed;
  --orange: #f97316;
}

body {
  font-family:
    Inter,
    Arial,
    sans-serif;

  background: var(--bg);

  color: var(--text);

  min-height: 100vh;
}


/* =========================
   TOP BAR
========================= */

.topbar {
  background:
    linear-gradient(
      135deg,
      #0f172a,
      #1d4ed8
    );

  color: white;

  padding: 18px 16px;

  display: flex;

  justify-content: space-between;

  align-items: center;

  position: sticky;

  top: 0;

  z-index: 10;

  box-shadow:
    0 4px 18px rgba(0,0,0,.15);
}


.brand {
  display: flex;

  align-items: center;

  gap: 12px;
}


.logo {
  width: 48px;

  height: 48px;

  border-radius: 14px;

  background: white;

  color: var(--blue);

  display: flex;

  justify-content: center;

  align-items: center;

  font-size: 18px;

  font-weight: 900;

  box-shadow:
    0 4px 12px rgba(0,0,0,.2);
}


.brand h1 {
  font-size: 21px;

  letter-spacing: .3px;
}


.brand p {
  font-size: 11px;

  opacity: .8;

  margin-top: 2px;
}


.print-btn {
  width: 42px;

  height: 42px;

  border: none;

  border-radius: 12px;

  background:
    rgba(255,255,255,.15);

  color: white;

  font-size: 19px;

  cursor: pointer;
}


/* =========================
   MAIN
========================= */

main {
  max-width: 850px;

  margin: auto;

  padding: 18px 14px 35px;
}


/* =========================
   WELCOME
========================= */

.welcome {
  background:
    linear-gradient(
      135deg,
      #2563eb,
      #4f46e5
    );

  color: white;

  border-radius: 22px;

  padding: 24px;

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 18px;

  box-shadow:
    0 12px 30px rgba(37,99,235,.22);
}


.small-title {
  font-size: 10px;

  font-weight: 800;

  letter-spacing: 1.4px;

  opacity: .8;

  margin-bottom: 7px;
}


.welcome h2 {
  font-size: 24px;

  margin-bottom: 5px;
}


.welcome-text {
  font-size: 13px;

  opacity: .85;
}


.welcome-icon {
  font-size: 45px;

  background:
    rgba(255,255,255,.14);

  width: 70px;

  height: 70px;

  border-radius: 20px;

  display: flex;

  justify-content: center;

  align-items: center;
}


/* =========================
   CARD
========================= */

.card {
  background: white;

  border-radius: 18px;

  padding: 20px;

  margin-bottom: 16px;

  box-shadow:
    0 5px 20px rgba(15,23,42,.06);
}


.section-heading {
  display: flex;

  align-items: center;

  gap: 12px;

  margin-bottom: 18px;
}


.heading-icon {
  width: 42px;

  height: 42px;

  border-radius: 12px;

  background: #eff6ff;

  display: flex;

  justify-content: center;

  align-items: center;

  font-size: 20px;
}


.section-heading h2 {
  font-size: 17px;
}


.section-heading p {
  font-size: 12px;

  color: var(--muted);

  margin-top: 2px;
}


.grid {
  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 14px;
}


/* =========================
   INPUT
========================= */

.input-group {
  margin-bottom: 13px;
}


label {
  display: block;

  font-size: 12px;

  font-weight: 800;

  color: #475569;

  margin-bottom: 6px;
}


input,
textarea,
select {
  width: 100%;

  border: 1px solid #e2e8f0;

  background: #f8fafc;

  color: var(--text);

  border-radius: 11px;

  padding: 12px;

  font-size: 14px;

  outline: none;

  transition: .2s;
}


input:focus,
textarea:focus,
select:focus {
  background: white;

  border-color:
    var(--blue);

  box-shadow:
    0 0 0 3px
    rgba(37,99,235,.1);
}


textarea {
  min-height: 85px;

  resize: vertical;
}


/* =========================
   ITEMS
========================= */

.item-heading {
  justify-content: space-between;
}


.section-left {
  display: flex;

  align-items: center;

  gap: 12px;
}


.add-btn {
  background:
    var(--green);

  color: white;

  border: none;

  padding: 10px 15px;

  border-radius: 10px;

  font-weight: 800;

  cursor: pointer;

  box-shadow:
    0 5px 12px
    rgba(22,163,74,.2);
}


.item {
  background: #f8fafc;

  border: 1px solid #e2e8f0;

  border-radius: 14px;

  padding: 14px;

  margin-bottom: 12px;

  animation:
    slideIn .25s ease;
}


@keyframes slideIn {

  from {
    opacity: 0;

    transform:
      translateY(8px);
  }

  to {
    opacity: 1;

    transform:
      translateY(0);
  }

}


.item-grid {
  display: grid;

  grid-template-columns:
    2fr 1fr 1fr;

  gap: 10px;
}


.remove-btn {
  margin-top: 10px;

  border: none;

  background: #fee2e2;

  color: var(--red);

  padding: 7px 11px;

  border-radius: 8px;

  font-size: 12px;

  font-weight: 800;
}


/* =========================
   SUMMARY
========================= */

.summary-card {
  background:
    linear-gradient(
      145deg,
      #0f172a,
      #1e293b
    );

  color: white;

  border-radius: 20px;

  padding: 20px;

  margin-bottom: 16px;

  box-shadow:
    0 12px 25px
    rgba(15,23,42,.18);
}


.summary-title {
  display: flex;

  align-items: center;

  gap: 9px;

  margin-bottom: 17px;
}


.summary-title h2 {
  font-size: 17px;
}


.summary-row,
.discount-row,
.total-row,
.paid-row {
  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 9px 0;
}


.summary-row span,
.discount-row span,
.paid-row span {
  color: #cbd5e1;

  font-size: 13px;
}


.discount-row input,
.paid-row input {
  width: 130px;

  background:
    rgba(255,255,255,.1);

  border:
    1px solid
    rgba(255,255,255,.15);

  color: white;

  text-align: right;
}


.total-row {
  border-top:
    1px solid
    rgba(255,255,255,.12);

  border-bottom:
    1px solid
    rgba(255,255,255,.12);

  margin-top: 5px;

  padding: 15px 0;
}


.total-row span {
  font-size: 15px;

  font-weight: 800;
}


.total-row strong {
  color: #60a5fa;

  font-size: 23px;
}


.due-row {
  background:
    rgba(249,115,22,.12);

  border:
    1px solid
    rgba(249,115,22,.25);

  border-radius: 12px;

  padding: 13px;

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-top: 10px;
}


.due-row span {
  display: block;

  font-weight: 800;
}


.due-row small {
  color: #94a3b8;

  font-size: 10px;
}


.due-row strong {
  color: #fb923c;

  font-size: 20px;
}


/* =========================
   ACTIONS
========================= */

.action-area {
  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 11px;

  margin: 5px 0 25px;
}


.action-area button {
  border: none;

  padding: 15px;

  border-radius: 13px;

  color: white;

  font-size: 13px;

  font-weight: 800;

  cursor: pointer;

  display: flex;

  justify-content: center;

  align-items: center;

  gap: 8px;

  transition: .2s;
}


.action-area button:active {
  transform:
    scale(.97);
}


.primary-action {
  background:
    linear-gradient(
      135deg,
      #7c3aed,
      #6366f1
    );
}


.whatsapp-action {
  background:
    linear-gradient(
      135deg,
      #16a34a,
      #22c55e
    );
}


.save-action {
  background:
    linear-gradient(
      135deg,
      #2563eb,
      #3b82f6
    );
}


.clear-action {
  background:
    #ef4444;
}


/* =========================
   FOOTER
========================= */

footer {
  text-align: center;

  background: #0f172a;

  color: #cbd5e1;

  padding: 30px 15px;
}


.footer-logo {
  width: 42px;

  height: 42px;

  margin:
    0 auto 8px;

  background:
    #2563eb;

  color: white;

  border-radius: 12px;

  display: flex;

  justify-content: center;

  align-items: center;

  font-weight: 900;
}


footer strong {
  color: white;

  font-size: 15px;
}


footer p {
  font-size: 11px;

  margin: 5px 0 12px;
}


footer small {
  font-size: 10px;

  color: #64748b;
}


/* =========================
   MOBILE
========================= */

@media (max-width: 600px) {

  .grid,
  .item-grid {
    grid-template-columns:
      1fr;
  }


  .welcome {
    padding: 20px;
  }


  .welcome h2 {
    font-size: 21px;
  }


  .welcome-icon {
    width: 58px;

    height: 58px;

    font-size: 32px;
  }


  .card {
    padding: 16px;
  }


  .action-area {
    grid-template-columns:
      1fr 1fr;
  }

}


@media (max-width: 380px) {

  .action-area {
    grid-template-columns:
      1fr;
  }

}


/* =========================
   PRINT
========================= */

@media print {

  body {
    background: white;
  }


  .topbar {
    position: static;

    background: white;

    color: black;

    box-shadow: none;
  }


  .print-btn,
  .welcome,
  .action-area,
  footer,
  .add-btn,
  .remove-btn {
    display: none !important;
  }


  main {
    max-width: 100%;

    padding: 0;
  }


  .card,
  .summary-card {
    box-shadow: none;

    break-inside: avoid;
  }

}
