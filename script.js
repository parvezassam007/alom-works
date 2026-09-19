let itemCount = 0;


// =========================================
// PAGE LOAD
// =========================================

document.addEventListener("DOMContentLoaded", function () {

  setTodayDate();

  const items = document.getElementById("items");

  if (items && items.children.length === 0) {
    addItem();
  }

  calculateTotal();

});


// =========================================
// TODAY'S DATE
// =========================================

function setTodayDate() {

  const dateInput =
    document.getElementById("date");

  if (!dateInput) return;

  const today = new Date();

  const yyyy =
    today.getFullYear();

  const mm =
    String(today.getMonth() + 1)
      .padStart(2, "0");

  const dd =
    String(today.getDate())
      .padStart(2, "0");

  dateInput.value =
    `${yyyy}-${mm}-${dd}`;
}


// =========================================
// ADD ITEM
// =========================================

function addItem() {

  const items =
    document.getElementById("items");

  if (!items) return;

  itemCount++;

  const item =
    document.createElement("div");

  item.className = "item";

  item.innerHTML = `
    <div class="item-grid">

      <div>
        <label>Work / Item</label>

        <input
          type="text"
          class="item-name"
          placeholder="Example: Fan installation">
      </div>

      <div>
        <label>Qty</label>

        <input
          type="number"
          class="item-qty"
          value="1"
          min="0"
          oninput="calculateTotal()">
      </div>

      <div>
        <label>Rate (₹)</label>

        <input
          type="number"
          class="item-rate"
          value="0"
          min="0"
          oninput="calculateTotal()">
      </div>

      <button
        type="button"
        class="remove-btn no-print"
        onclick="removeItem(this)">
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


// =========================================
// REMOVE ITEM
// =========================================

function removeItem(button) {

  const item =
    button.closest(".item");

  if (item) {
    item.remove();
  }

  calculateTotal();
}


// =========================================
// CALCULATE TOTAL
// =========================================

function calculateTotal() {

  let subtotal = 0;

  const items =
    document.querySelectorAll(".item");


  items.forEach(function (item) {

    const qtyInput =
      item.querySelector(".item-qty");

    const rateInput =
      item.querySelector(".item-rate");

    const amountElement =
      item.querySelector(".item-amount");


    const qty =
      parseFloat(qtyInput?.value) || 0;

    const rate =
      parseFloat(rateInput?.value) || 0;


    const amount =
      qty * rate;


    if (amountElement) {

      amountElement.textContent =
        amount.toFixed(2);

    }


    subtotal += amount;

  });


  const discount =
    parseFloat(
      document.getElementById("discount")?.value
    ) || 0;


  const paid =
    parseFloat(
      document.getElementById("paid")?.value
    ) || 0;


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


// =========================================
// SAVE INVOICE
// =========================================

function saveInvoice() {

  const invoice = {

    invoiceNo:
      document
        .getElementById("invoiceNo")
        ?.value
        .trim() || "",


    date:
      document
        .getElementById("date")
        ?.value || "",


    customerName:
      document
        .getElementById("customerName")
        ?.value
        .trim() || "",


    customerPhone:
      document
        .getElementById("customerPhone")
        ?.value
        .trim() || "",


    customerAddress:
      document
        .getElementById("customerAddress")
        ?.value
        .trim() || "",


    discount:
      document
        .getElementById("discount")
        ?.value || "0",


    paid:
      document
        .getElementById("paid")
        ?.value || "0",


    paymentStatus:
      document
        .getElementById("paymentStatus")
        ?.value || "Pending",


    notes:
      document
        .getElementById("notes")
        ?.value
        .trim() || "",


    total:
      document
        .getElementById("total")
        ?.textContent || "0.00",


    due:
      document
        .getElementById("due")
        ?.textContent || "0.00",


    items: []

  };


  document
    .querySelectorAll(".item")
    .forEach(function (item) {

      invoice.items.push({

        name:
          item
            .querySelector(".item-name")
            ?.value
            .trim() || "",


        qty:
          item
            .querySelector(".item-qty")
            ?.value || "0",


        rate:
          item
            .querySelector(".item-rate")
            ?.value || "0",


        amount:
          item
            .querySelector(".item-amount")
            ?.textContent || "0.00"

      });

    });


  localStorage.setItem(
    "parbezWorksInvoice",
    JSON.stringify(invoice)
  );


  alert(
    "Invoice saved successfully!"
  );

}


// =========================================
// DOWNLOAD BILL JPG
// =========================================

async function downloadBillJPG() {

  const bill =
    document.getElementById("billArea");


  if (!bill) {

    alert(
      "Bill area nahi mila."
    );

    return;
  }


  if (
    typeof html2canvas ===
    "undefined"
  ) {

    alert(
      "JPG feature load nahi hua. Internet ON karke page reload karo."
    );

    return;
  }


  const invoiceNo =
    document
      .getElementById("invoiceNo")
      ?.value
      .trim() || "PW-BILL";


  bill.classList.add(
    "export-mode"
  );


  await new Promise(
    function (resolve) {

      setTimeout(
        resolve,
        300
      );

    }
  );


  try {

    const canvas =
      await html2canvas(
        bill,
        {

          scale: 2,

          useCORS: true,

          allowTaint: false,

          backgroundColor:
            "#ffffff",

          scrollX: 0,

          scrollY:
            -window.scrollY

        }
      );


    const image =
      canvas.toDataURL(
        "image/jpeg",
        0.95
      );


    const link =
      document.createElement("a");


    link.href = image;


    link.download =
      `${invoiceNo}-Bill.jpg`;


    document.body.appendChild(
      link
    );


    link.click();


    document.body.removeChild(
      link
    );


  } catch (error) {

    console.error(
      "JPG Error:",
      error
    );


    alert(
      "Bill JPG banane mein problem hui."
    );


  } finally {

    bill.classList.remove(
      "export-mode"
    );

  }

}


// =========================================
// WHATSAPP
// =========================================

function sendWhatsApp() {

  const phone =
    document
      .getElementById("customerPhone")
      ?.value
      .trim() || "";


  const name =
    document
      .getElementById("customerName")
      ?.value
      .trim() || "Customer";


  const invoiceNo =
    document
      .getElementById("invoiceNo")
      ?.value
      .trim() || "N/A";


  const invoiceDate =
    document
      .getElementById("date")
      ?.value || "";


  const total =
    document
      .getElementById("total")
      ?.textContent || "0.00";


  const paid =
    document
      .getElementById("paid")
      ?.value || "0";


  const due =
    document
      .getElementById("due")
      ?.textContent || "0.00";


  const address =
    document
      .getElementById("customerAddress")
      ?.value
      .trim() || "";


  const paymentStatus =
    document
      .getElementById("paymentStatus")
      ?.value || "Pending";


  const notes =
    document
      .getElementById("notes")
      ?.value
      .trim() || "";


  // =========================================
  // DATE FORMAT
  // =========================================

  let formattedDate = "N/A";


  if (invoiceDate) {

    const parts =
      invoiceDate.split("-");


    if (parts.length === 3) {

      formattedDate =
        `${parts[2]}-${parts[1]}-${parts[0]}`;

    }

  }


  // =========================================
  // ITEMS
  // =========================================

  let itemText = "";


  document
    .querySelectorAll(".item")
    .forEach(function (item, index) {


      const itemName =
        item
          .querySelector(".item-name")
          ?.value
          .trim() || "Item";


      const qty =
        item
          .querySelector(".item-qty")
          ?.value || "0";


      const rate =
        item
          .querySelector(".item-rate")
          ?.value || "0";


      const amount =
        item
          .querySelector(".item-amount")
          ?.textContent || "0.00";


      itemText +=
`${index + 1}. ${itemName}
Qty: ${qty} | Rate: ₹${rate} | Amount: ₹${amount}

`;

    });


  // =========================================
  // WHATSAPP MESSAGE
  // =========================================

  let message =
`PARBEZ WORKS

Invoice No: ${invoiceNo}
Date: ${formattedDate}

Customer: ${name}`;


  if (address) {

    message +=
`
Address: ${address}`;

  }


  message +=
`

WORK / ITEMS

${itemText}
Total: ₹${total}
Paid: ₹${paid}
Due: ₹${due}

Payment Status: ${paymentStatus}`;


  if (notes) {

    message +=
`

Note: ${notes}`;

  }


  message +=
`

Electrical • False Ceiling • Plumbing

Thank you for choosing PARBEZ WORKS!`;


  // =========================================
  // PHONE NUMBER
  // =========================================

  let cleanPhone =
    phone.replace(/\D/g, "");


  // If user entered +91 number
  if (
    cleanPhone.startsWith("91") &&
    cleanPhone.length === 12
  ) {

    // Already correct
    cleanPhone = cleanPhone;

  }

  // Normal 10 digit Indian number
  else if (
    cleanPhone.length === 10
  ) {

    cleanPhone =
      "91" + cleanPhone;

  }

  else {

    alert(
      "Customer ka 10 digit WhatsApp number enter karein."
    );

    return;

  }


  // =========================================
  // OPEN DIRECT CUSTOMER CHAT
  // =========================================

  const encodedMessage =
    encodeURIComponent(
      message
    );


  const url =
    `https://wa.me/${cleanPhone}?text=${encodedMessage}`;


  window.open(
    url,
    "_blank"
  );

}


// =========================================
// CLEAR INVOICE
// =========================================

function clearInvoice() {

  const confirmClear =
    confirm(
      "Kya aap poora invoice clear karna chahte hain?"
    );


  if (!confirmClear) {
    return;
  }


  document
    .getElementById("invoiceNo")
    .value = "";


  document
    .getElementById("customerName")
    .value = "";


  document
    .getElementById("customerPhone")
    .value = "";


  document
    .getElementById("customerAddress")
    .value = "";


  document
    .getElementById("discount")
    .value = "0";


  document
    .getElementById("paid")
    .value = "0";


  document
    .getElementById("paymentStatus")
    .value = "Pending";


  document
    .getElementById("notes")
    .value = "";


  // Reset date to today

  setTodayDate();


  // Clear items

  const items =
    document.getElementById("items");


  if (items) {

    items.innerHTML = "";

  }


  itemCount = 0;


  // Add first item again

  addItem();


  calculateTotal();


  // Remove saved invoice

  localStorage.removeItem(
    "parbezWorksInvoice"
  );

}
