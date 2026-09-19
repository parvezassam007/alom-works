// Parbez Works Billing System

let itemCount = 0;

// Set today's date
document.getElementById("date").valueAsDate = new Date();

// Add first item automatically
addItem();

function addItem() {
  itemCount++;

  const items = document.getElementById("items");

  const item = document.createElement("div");
  item.className = "item";
  item.id = `item-${itemCount}`;

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
          oninput="calculateTotal()"
        >
      </div>

      <div>
        <label>Rate (₹)</label>
        <input
          type="number"
          class="item-rate"
          value="0"
          min="0"
          oninput="calculateTotal()"
        >
      </div>

    </div>

    <button
      class="remove-btn"
      onclick="removeItem(${itemCount})"
    >
      Remove
    </button>
  `;

  items.appendChild(item);
  calculateTotal();
}

function removeItem(id) {
  const item = document.getElementById(`item-${id}`);

  if (item) {
    item.remove();
    calculateTotal();
  }
}

function calculateTotal() {
  let subtotal = 0;

  const items = document.querySelectorAll(".item");

  items.forEach(item => {
    const qty =
      parseFloat(item.querySelector(".item-qty").value) || 0;

    const rate =
      parseFloat(item.querySelector(".item-rate").value) || 0;

    subtotal += qty * rate;
  });

  const discount =
    parseFloat(document.getElementById("discount").value) || 0;

  const paid =
    parseFloat(document.getElementById("paid").value) || 0;

  const total = Math.max(0, subtotal - discount);
  const due = Math.max(0, total - paid);

  document.getElementById("subtotal").textContent =
    subtotal.toFixed(2);

  document.getElementById("total").textContent =
    total.toFixed(2);

  document.getElementById("due").textContent =
    due.toFixed(2);
}

function getInvoiceData() {
  const items = [];

  document.querySelectorAll(".item").forEach(item => {
    const name =
      item.querySelector(".item-name").value.trim();

    const qty =
      parseFloat(item.querySelector(".item-qty").value) || 0;

    const rate =
      parseFloat(item.querySelector(".item-rate").value) || 0;

    if (name || qty || rate) {
      items.push({
        name: name,
        qty: qty,
        rate: rate,
        amount: qty * rate
      });
    }
  });

  return {
    invoiceNo: document.getElementById("invoiceNo").value,
    date: document.getElementById("date").value,
    customerName: document.getElementById("customerName").value,
    customerPhone: document.getElementById("customerPhone").value,
    customerAddress:
      document.getElementById("customerAddress").value,

    items: items,

    subtotal:
      parseFloat(document.getElementById("subtotal").textContent) || 0,

    discount:
      parseFloat(document.getElementById("discount").value) || 0,

    total:
      parseFloat(document.getElementById("total").textContent) || 0,

    paid:
      parseFloat(document.getElementById("paid").value) || 0,

    due:
      parseFloat(document.getElementById("due").textContent) || 0,

    paymentStatus:
      document.getElementById("paymentStatus").value,

    notes:
      document.getElementById("notes").value
  };
}

function saveInvoice() {
  const invoice = getInvoiceData();

  let invoices =
    JSON.parse(localStorage.getItem("parbezWorksInvoices")) || [];

  invoices.push(invoice);

  localStorage.setItem(
    "parbezWorksInvoices",
    JSON.stringify(invoices)
  );

  alert("Invoice saved successfully! ✅");
}

function sendWhatsApp() {
  const invoice = getInvoiceData();

  const customerPhone =
    invoice.customerPhone.replace(/\D/g, "");

  if (!customerPhone) {
    alert("Please enter customer's phone number.");
    return;
  }

  let message = `PARBEZ WORKS\n\n`;

  message += `Invoice: ${invoice.invoiceNo || "N/A"}\n`;
  message += `Date: ${invoice.date || "N/A"}\n\n`;

  message += `Customer: ${invoice.customerName || "N/A"}\n`;
  message += `Address: ${invoice.customerAddress || "N/A"}\n\n`;

  message += `WORK DETAILS\n`;

  invoice.items.forEach(item => {
    message +=
      `${item.name || "Item"} - ${item.qty} × ₹${item.rate} = ₹${item.amount}\n`;
  });

  message += `\nSubtotal: ₹${invoice.subtotal.toFixed(2)}\n`;
  message += `Discount: ₹${invoice.discount.toFixed(2)}\n`;
  message += `Total: ₹${invoice.total.toFixed(2)}\n`;
  message += `Paid: ₹${invoice.paid.toFixed(2)}\n`;
  message += `Due: ₹${invoice.due.toFixed(2)}\n`;
  message += `Status: ${invoice.paymentStatus}\n`;

  if (invoice.notes) {
    message += `\nNote: ${invoice.notes}`;
  }

  const whatsappURL =
    `https://wa.me/${customerPhone}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank");
}

function clearInvoice() {
  const confirmClear =
    confirm("Are you sure you want to clear this invoice?");

  if (!confirmClear) {
    return;
  }

  document.getElementById("invoiceNo").value = "";
  document.getElementById("customerName").value = "";
  document.getElementById("customerPhone").value = "";
  document.getElementById("customerAddress").value = "";
  document.getElementById("discount").value = 0;
  document.getElementById("paid").value = 0;
  document.getElementById("paymentStatus").value = "Pending";
  document.getElementById("notes").value = "";

  document.getElementById("items").innerHTML = "";

  itemCount = 0;
  addItem();

  document.getElementById("date").valueAsDate = new Date();

  calculateTotal();
}
