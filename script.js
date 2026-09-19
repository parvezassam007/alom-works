// PARBEZ WORKS BILLING SYSTEM

let itemCount = 0;

// Wait until the HTML page is fully loaded
document.addEventListener("DOMContentLoaded", function () {

  // Set today's date
  const dateInput = document.getElementById("date");

  if (dateInput) {
    dateInput.valueAsDate = new Date();
  }

  // Add first item
  addItem();

  calculateTotal();
});


// ==============================
// ADD ITEM
// ==============================

function addItem() {

  itemCount++;

  const itemsContainer = document.getElementById("items");

  if (!itemsContainer) {
    alert("Error: Items section not found.");
    return;
  }

  const item = document.createElement("div");

  item.className = "item";
  item.id = "item-" + itemCount;

  item.innerHTML = `
    <div class="item-grid">

      <div>
        <label>Work / Item</label>
        <input
          type="text"
          class="item-name"
          placeholder="e.g. Electrical Point"
        >
      </div>

      <div>
        <label>Qty</label>
        <input
          type="number"
          class="item-qty"
          value="1"
          min="0"
        >
      </div>

      <div>
        <label>Rate (₹)</label>
        <input
          type="number"
          class="item-rate"
          value="0"
          min="0"
        >
      </div>

    </div>

    <button
      type="button"
      class="remove-btn"
      onclick="removeItem(${itemCount})"
    >
      Remove
    </button>
  `;

  itemsContainer.appendChild(item);

  // Calculate when quantity/rate changes
  const qty = item.querySelector(".item-qty");
  const rate = item.querySelector(".item-rate");

  qty.addEventListener("input", calculateTotal);
  rate.addEventListener("input", calculateTotal);

  calculateTotal();
}


// ==============================
// REMOVE ITEM
// ==============================

function removeItem(id) {

  const item = document.getElementById("item-" + id);

  if (item) {
    item.remove();
    calculateTotal();
  }
}


// ==============================
// CALCULATE TOTAL
// ==============================

function calculateTotal() {

  let subtotal = 0;

  const items = document.querySelectorAll(".item");

  items.forEach(function (item) {

    const qtyInput = item.querySelector(".item-qty");
    const rateInput = item.querySelector(".item-rate");

    const qty = parseFloat(qtyInput.value) || 0;
    const rate = parseFloat(rateInput.value) || 0;

    subtotal += qty * rate;
  });


  const discountInput = document.getElementById("discount");
  const paidInput = document.getElementById("paid");

  const discount =
    parseFloat(discountInput?.value) || 0;

  const paid =
    parseFloat(paidInput?.value) || 0;


  const total = Math.max(0, subtotal - discount);

  const due = Math.max(0, total - paid);


  const subtotalElement =
    document.getElementById("subtotal");

  const totalElement =
    document.getElementById("total");

  const dueElement =
    document.getElementById("due");


  if (subtotalElement) {
    subtotalElement.textContent =
      subtotal.toFixed(2);
  }

  if (totalElement) {
    totalElement.textContent =
      total.toFixed(2);
  }

  if (dueElement) {
    dueElement.textContent =
      due.toFixed(2);
  }
}


// ==============================
// GET INVOICE DATA
// ==============================

function getInvoiceData() {

  const items = [];

  document.querySelectorAll(".item").forEach(function (item) {

    const name =
      item.querySelector(".item-name").value.trim();

    const qty =
      parseFloat(
        item.querySelector(".item-qty").value
      ) || 0;

    const rate =
      parseFloat(
        item.querySelector(".item-rate").value
      ) || 0;


    items.push({
      name: name,
      qty: qty,
      rate: rate,
      amount: qty * rate
    });

  });


  return {

    invoiceNo:
      document.getElementById("invoiceNo")?.value || "",

    date:
      document.getElementById("date")?.value || "",

    customerName:
      document.getElementById("customerName")?.value || "",

    customerPhone:
      document.getElementById("customerPhone")?.value || "",

    customerAddress:
      document.getElementById("customerAddress")?.value || "",

    items: items,

    subtotal:
      parseFloat(
        document.getElementById("subtotal")?.textContent
      ) || 0,

    discount:
      parseFloat(
        document.getElementById("discount")?.value
      ) || 0,

    total:
      parseFloat(
        document.getElementById("total")?.textContent
      ) || 0,

    paid:
      parseFloat(
        document.getElementById("paid")?.value
      ) || 0,

    due:
      parseFloat(
        document.getElementById("due")?.textContent
      ) || 0,

    paymentStatus:
      document.getElementById("paymentStatus")?.value ||
      "Pending",

    notes:
      document.getElementById("notes")?.value || ""
  };
}


// ==============================
// SAVE INVOICE
// ==============================

function saveInvoice() {

  const invoice = getInvoiceData();

  let invoices =
    JSON.parse(
      localStorage.getItem("parbezWorksInvoices")
    ) || [];


  invoices.push(invoice);


  localStorage.setItem(
    "parbezWorksInvoices",
    JSON.stringify(invoices)
  );


  alert("Invoice saved successfully! ✅");
}


// ==============================
// WHATSAPP
// ==============================

function sendWhatsApp() {

  const invoice = getInvoiceData();

  const phone =
    invoice.customerPhone.replace(/\D/g, "");


  if (!phone) {

    alert(
      "Please enter customer's phone number."
    );

    return;
  }


  let message =
    "PARBEZ WORKS\n\n";


  message +=
    "Invoice: " +
    (invoice.invoiceNo || "N/A") +
    "\n";


  message +=
    "Date: " +
    (invoice.date || "N/A") +
    "\n\n";


  message +=
    "Customer: " +
    (invoice.customerName || "N/A") +
    "\n";


  message +=
    "Address: " +
    (invoice.customerAddress || "N/A") +
    "\n\n";


  message +=
    "WORK DETAILS\n";


  invoice.items.forEach(function (item) {

    message +=
      (item.name || "Item") +
      " - " +
      item.qty +
      " × ₹" +
      item.rate +
      " = ₹" +
      item.amount +
      "\n";

  });


  message +=
    "\nSubtotal: ₹" +
    invoice.subtotal.toFixed(2);


  message +=
    "\nDiscount: ₹" +
    invoice.discount.toFixed(2);


  message +=
    "\nTotal: ₹" +
    invoice.total.toFixed(2);


  message +=
    "\nPaid: ₹" +
    invoice.paid.toFixed(2);


  message +=
    "\nDue: ₹" +
    invoice.due.toFixed(2);


  message +=
    "\nStatus: " +
    invoice.paymentStatus;


  if (invoice.notes) {

    message +=
      "\n\nNote: " +
      invoice.notes;
  }


  const whatsappURL =
    "https://wa.me/" +
    phone +
    "?text=" +
    encodeURIComponent(message);


  window.open(
    whatsappURL,
    "_blank"
  );
}


// ==============================
// CLEAR INVOICE
// ==============================

function clearInvoice() {

  const confirmClear =
    confirm(
      "Are you sure you want to clear this invoice?"
    );


  if (!confirmClear) {
    return;
  }


  const fields = [
    "invoiceNo",
    "customerName",
    "customerPhone",
    "customerAddress",
    "discount",
    "paid",
    "notes"
  ];


  fields.forEach(function (id) {

    const element =
      document.getElementById(id);

    if (element) {
      element.value = "";
    }

  });


  document.getElementById("discount").value = 0;

  document.getElementById("paid").value = 0;


  const status =
    document.getElementById("paymentStatus");

  if (status) {
    status.value = "Pending";
  }


  document.getElementById("items").innerHTML = "";

  itemCount = 0;

  addItem();


  const date =
    document.getElementById("date");

  if (date) {
    date.valueAsDate = new Date();
  }


  calculateTotal();
}
