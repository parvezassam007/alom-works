/* =========================================
   PARBEZ WORKS BILLING SYSTEM
========================================= */

let itemCount = 0;


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener("DOMContentLoaded", function () {

  // Today's date
  const dateInput = document.getElementById("date");

  if (dateInput) {

    const today = new Date();

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  // First item
  const items = document.getElementById("items");

  if (items && items.children.length === 0) {
    addItem();
  }

  calculateTotal();
});


/* =========================================
   ADD ITEM
========================================= */

function addItem() {

  itemCount++;

  const items = document.getElementById("items");

  if (!items) {
    alert("Items section nahi mila.");
    return;
  }

  const item = document.createElement("div");

  item.className = "item";

  item.innerHTML = `
    <div class="item-grid">

      <div>
        <label>Work / Item</label>

        <input
          type="text"
          class="item-name"
          placeholder="Example: Fan installation"
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

      <button
        type="button"
        class="remove-btn no-print"
        onclick="removeItem(this)"
      >
        ✕
      </button>

    </div>

    <div style="text-align:right;margin-top:10px;">
      Amount:
      <strong>
        ₹<span class="item-amount">0.00</span>
      </strong>
    </div>
  `;

  items.appendChild(item);

  calculateTotal();
}


/* =========================================
   REMOVE ITEM
========================================= */

function removeItem(button) {

  const item = button.closest(".item");

  if (item) {
    item.remove();
  }

  // Agar sab items delete ho gaye
  const items = document.getElementById("items");

  if (items && items.children.length === 0) {
    addItem();
  }

  calculateTotal();
}


/* =========================================
   CALCULATE TOTAL
========================================= */

function calculateTotal() {

  let subtotal = 0;

  const items = document.querySelectorAll(".item");

  items.forEach(function (item) {

    const qtyElement = item.querySelector(".item-qty");
    const rateElement = item.querySelector(".item-rate");
    const amountElement = item.querySelector(".item-amount");

    const qty =
      parseFloat(qtyElement?.value) || 0;

    const rate =
      parseFloat(rateElement?.value) || 0;

    const amount = qty * rate;

    if (amountElement) {
      amountElement.textContent =
        amount.toFixed(2);
    }

    subtotal += amount;
  });


  const discountElement =
    document.getElementById("discount");

  const paidElement =
    document.getElementById("paid");

  const discount =
    parseFloat(discountElement?.value) || 0;

  const paid =
    parseFloat(paidElement?.value) || 0;


  const total =
    Math.max(0, subtotal - discount);

  const due =
    Math.max(0, total - paid);


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


/* =========================================
   SAVE INVOICE
========================================= */

function saveInvoice() {

  const invoiceNo =
    document.getElementById("invoiceNo")?.value.trim() || "";

  const date =
    document.getElementById("date")?.value || "";

  const customerName =
    document.getElementById("customerName")?.value.trim() || "";

  const customerPhone =
    document.getElementById("customerPhone")?.value.trim() || "";

  const customerAddress =
    document.getElementById("customerAddress")?.value.trim() || "";

  const discount =
    document.getElementById("discount")?.value || "0";

  const paid =
    document.getElementById("paid")?.value || "0";

  const paymentStatus =
    document.getElementById("paymentStatus")?.value || "Pending";

  const notes =
    document.getElementById("notes")?.value.trim() || "";

  const total =
    document.getElementById("total")?.textContent || "0.00";

  const due =
    document.getElementById("due")?.textContent || "0.00";


  if (!customerName) {

    alert("Kripya Customer ka naam likhein.");

    document.getElementById("customerName")?.focus();

    return;
  }


  const invoiceItems = [];


  document.querySelectorAll(".item")
    .forEach(function (item) {

      invoiceItems.push({

        name:
          item.querySelector(".item-name")?.value || "",

        qty:
          item.querySelector(".item-qty")?.value || "0",

        rate:
          item.querySelector(".item-rate")?.value || "0",

        amount:
          item.querySelector(".item-amount")?.textContent || "0.00"

      });

    });


  const invoice = {

    invoiceNo,
    date,

    customerName,
    customerPhone,
    customerAddress,

    discount,
    paid,
    paymentStatus,
    notes,

    total,
    due,

    items: invoiceItems
  };


  localStorage.setItem(
    "parbezWorksInvoice",
    JSON.stringify(invoice)
  );


  alert("Invoice successfully save ho gaya.");
}


/* =========================================
   DOWNLOAD BILL AS JPG
========================================= */

async function downloadBillJPG() {

  const bill =
    document.getElementById("billArea");


  if (!bill) {

    alert("Bill area nahi mila.");

    return;
  }


  if (!window.html2canvas) {

    alert(
      "JPG feature load nahi hua. Internet ON karke page reload karo."
    );

    return;
  }


  const invoiceNo =
    document.getElementById("invoiceNo")?.value.trim()
    || "PW-BILL";


  const safeInvoiceNo =
    invoiceNo.replace(
      /[^a-zA-Z0-9-_]/g,
      "_"
    );


  // Export mode
  bill.classList.add("export-mode");


  await new Promise(function (resolve) {
    setTimeout(resolve, 300);
  });


  try {

    const canvas =
      await html2canvas(bill, {

        scale: 2,

        useCORS: true,

        allowTaint: false,

        backgroundColor: "#ffffff",

        scrollX: 0,

        scrollY: -window.scrollY,

        windowWidth: bill.scrollWidth,

        windowHeight: bill.scrollHeight

      });


    const image =
      canvas.toDataURL(
        "image/jpeg",
        0.95
      );


    const link =
      document.createElement("a");


    link.href = image;

    link.download =
      `${safeInvoiceNo}-Bill.jpg`;


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


  } catch (error) {

    console.error(
      "JPG Error:",
      error
    );

    alert(
      "Bill JPG banane mein problem hui. Page reload karke dobara try karo."
    );

  } finally {

    bill.classList.remove("export-mode");
  }
}


/* =========================================
   WHATSAPP
   DIRECT CUSTOMER NUMBER
========================================= */

function sendWhatsApp() {

  const phoneInput =
    document.getElementById("customerPhone");

  const nameInput =
    document.getElementById("customerName");

  const invoiceInput =
    document.getElementById("invoiceNo");

  const totalInput =
    document.getElementById("total");

  const dueInput =
    document.getElementById("due");


  if (!phoneInput) {

    alert("Customer Phone field nahi mila.");

    return;
  }


  let phone =
    phoneInput.value.trim();


  const name =
    nameInput?.value.trim() || "Customer";


  const invoiceNo =
    invoiceInput?.value.trim() || "N/A";


  const total =
    totalInput?.textContent || "0.00";


  const due =
    dueInput?.textContent || "0.00";


  // Sirf numbers rakho
  let cleanPhone =
    phone.replace(/\D/g, "");


  /*
     Indian number handling

     10 digit:
     9876543210
     ↓
     919876543210

     +91:
     +919876543210
     ↓
     919876543210
  */


  if (cleanPhone.length === 10) {

    cleanPhone =
      "91" + cleanPhone;

  }

  else if (
    cleanPhone.length === 12 &&
    cleanPhone.startsWith("91")
  ) {

    // Already correct
  }

  else {

    alert(
      "Customer ka valid 10 digit Indian mobile number enter karo."
    );

    phoneInput.focus();

    return;
  }


  // WhatsApp message
  const message =
`PARBEZ WORKS

Invoice: ${invoiceNo}
Customer: ${name}

Total: ₹${total}
Due: ₹${due}

Electrical • False Ceiling • Plumbing

Thank you for choosing PARBEZ WORKS!`;


  const encodedMessage =
    encodeURIComponent(message);


  /*
     IMPORTANT:
     Backtick (`) use kiya gaya hai.
     Isse customer number URL mein properly jayega.
  */

  const url =
    `https://wa.me/${cleanPhone}?text=${encodedMessage}`;


  /*
     Direct WhatsApp customer chat
  */

  window.location.href = url;
}


/* =========================================
   CLEAR INVOICE
========================================= */

function clearInvoice() {

  const confirmClear =
    confirm(
      "Kya aap poora invoice clear karna chahte hain?"
    );


  if (!confirmClear) {
    return;
  }


  // Invoice
  const invoiceNo =
    document.getElementById("invoiceNo");

  if (invoiceNo) {
    invoiceNo.value = "";
  }


  // Customer
  const customerName =
    document.getElementById("customerName");

  if (customerName) {
    customerName.value = "";
  }


  const customerPhone =
    document.getElementById("customerPhone");

  if (customerPhone) {
    customerPhone.value = "";
  }


  const customerAddress =
    document.getElementById("customerAddress");

  if (customerAddress) {
    customerAddress.value = "";
  }


  // Discount
  const discount =
    document.getElementById("discount");

  if (discount) {
    discount.value = "0";
  }


  // Paid
  const paid =
    document.getElementById("paid");

  if (paid) {
    paid.value = "0";
  }


  // Payment Status
  const paymentStatus =
    document.getElementById("paymentStatus");

  if (paymentStatus) {
    paymentStatus.value = "Pending";
  }


  // Notes
  const notes =
    document.getElementById("notes");

  if (notes) {
    notes.value = "";
  }


  // Today's date
  const dateInput =
    document.getElementById("date");

  if (dateInput) {

    const today =
      new Date();

    const yyyy =
      today.getFullYear();

    const mm =
      String(
        today.getMonth() + 1
      ).padStart(2, "0");

    const dd =
      String(
        today.getDate()
      ).padStart(2, "0");

    dateInput.value =
      `${yyyy}-${mm}-${dd}`;
  }


  // Items reset
  const items =
    document.getElementById("items");

  if (items) {

    items.innerHTML = "";

    itemCount = 0;

    addItem();
  }


  // Saved invoice delete
  localStorage.removeItem(
    "parbezWorksInvoice"
  );


  calculateTotal();
    }
