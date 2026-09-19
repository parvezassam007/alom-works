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
  const dateInput = document.getElementById("date");

  if (!dateInput) return;

  const today = new Date();

  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  dateInput.value = `${yyyy}-${mm}-${dd}`;
}


// =========================================
// ADD ITEM
// =========================================

function addItem() {
  const items = document.getElementById("items");

  if (!items) return;

  itemCount++;

  const item = document.createElement("div");

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
          step="any"
          oninput="calculateTotal()">
      </div>

      <div>
        <label>Rate (₹)</label>

        <input
          type="number"
          class="item-rate"
          value="0"
          min="0"
          step="any"
          oninput="calculateTotal()">
      </div>

      <button
        type="button"
        class="remove-btn no-print"
        onclick="removeItem(this)">
        ✕
      </button>

    </div>

    <div class="item-amount-row">
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
  const item = button.closest(".item");

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

  document.querySelectorAll(".item").forEach(function (item) {
    const qty =
      parseFloat(
        item.querySelector(".item-qty")?.value
      ) || 0;

    const rate =
      parseFloat(
        item.querySelector(".item-rate")?.value
      ) || 0;

    const amount = qty * rate;

    const amountElement =
      item.querySelector(".item-amount");

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
  calculateTotal();

  const invoice = {
    invoiceNo:
      document.getElementById("invoiceNo")?.value.trim() || "",

    date:
      document.getElementById("date")?.value || "",

    customerName:
      document.getElementById("customerName")?.value.trim() || "",

    customerPhone:
      document.getElementById("customerPhone")?.value.trim() || "",

    customerAddress:
      document.getElementById("customerAddress")?.value.trim() || "",

    discount:
      document.getElementById("discount")?.value || "0",

    paid:
      document.getElementById("paid")?.value || "0",

    paymentStatus:
      document.getElementById("paymentStatus")?.value || "Pending",

    notes:
      document.getElementById("notes")?.value.trim() || "",

    subtotal:
      document.getElementById("subtotal")?.textContent || "0.00",

    total:
      document.getElementById("total")?.textContent || "0.00",

    due:
      document.getElementById("due")?.textContent || "0.00",

    items: []
  };


  document.querySelectorAll(".item").forEach(function (item) {
    invoice.items.push({
      name:
        item.querySelector(".item-name")?.value.trim() || "",

      qty:
        item.querySelector(".item-qty")?.value || "0",

      rate:
        item.querySelector(".item-rate")?.value || "0",

      amount:
        item.querySelector(".item-amount")?.textContent || "0.00"
    });
  });


  localStorage.setItem(
    "parbezWorksInvoice",
    JSON.stringify(invoice)
  );


  alert("Invoice saved successfully!");
}


// =========================================
// DOWNLOAD BILL PNG
// =========================================

async function downloadBillJPG() {
  const bill =
    document.getElementById("billArea");

  if (!bill) {
    alert("Bill area nahi mila.");
    return;
  }


  if (typeof html2canvas === "undefined") {
    alert(
      "PNG feature load nahi hua. Internet ON karke page reload karo."
    );
    return;
  }


  calculateTotal();


  const invoiceNo =
    document
      .getElementById("invoiceNo")
      ?.value.trim() || "PW-BILL";


  // Export CSS mode
  bill.classList.add("export-mode");


  // Browser ko CSS apply karne ka time
  await new Promise(function (resolve) {
    requestAnimationFrame(function () {
      requestAnimationFrame(resolve);
    });
  });


  try {
    const canvas =
      await html2canvas(
        bill,
        {
          scale: 3,

          useCORS: true,

          allowTaint: false,

          backgroundColor: "#ffffff",

          logging: false,

          imageTimeout: 15000,

          scrollX: 0,

          scrollY: 0,

          windowWidth:
            Math.max(
              document.documentElement.scrollWidth,
              bill.scrollWidth
            ),

          windowHeight:
            Math.max(
              document.documentElement.scrollHeight,
              bill.scrollHeight
            )
        }
      );


    // PNG image
    const image =
      canvas.toDataURL(
        "image/png"
      );


    const link =
      document.createElement("a");


    link.href = image;

    link.download =
      `${invoiceNo}-Bill.png`;


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


  } catch (error) {
    console.error(
      "PNG Error:",
      error
    );

    alert(
      "Bill PNG banane mein problem hui."
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
  calculateTotal();


  // =========================================
  // CUSTOMER DETAILS
  // =========================================

  const phone =
    document
      .getElementById("customerPhone")
      ?.value.trim() || "";


  const name =
    document
      .getElementById("customerName")
      ?.value.trim() || "Customer";


  const invoiceNo =
    document
      .getElementById("invoiceNo")
      ?.value.trim() || "N/A";


  const invoiceDate =
    document
      .getElementById("date")
      ?.value || "";


  const address =
    document
      .getElementById("customerAddress")
      ?.value.trim() || "";


  // =========================================
  // BILL DETAILS
  // =========================================

  const subtotal =
    document
      .getElementById("subtotal")
      ?.textContent || "0.00";


  const discount =
    document
      .getElementById("discount")
      ?.value || "0";


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


  const paymentStatus =
    document
      .getElementById("paymentStatus")
      ?.value || "Pending";


  const notes =
    document
      .getElementById("notes")
      ?.value.trim() || "";


  // =========================================
  // DATE DD-MM-YYYY
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
          ?.value.trim() || "Item";


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
Qty: ${qty}
Rate: ₹${rate}
Amount: ₹${amount}

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

${itemText || "No items added."}

Subtotal: ₹${subtotal}
Discount: ₹${discount}
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


  // +91 98765 43210
  if (
    cleanPhone.startsWith("91") &&
    cleanPhone.length === 12
  ) {
    // Already correct
  }


  // 9876543210
  else if (
    cleanPhone.length === 10
  ) {
    cleanPhone =
      "91" + cleanPhone;
  }


  // Invalid number
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
    encodeURIComponent(message);


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


  const invoiceNo =
    document.getElementById("invoiceNo");

  const customerName =
    document.getElementById("customerName");

  const customerPhone =
    document.getElementById("customerPhone");

  const customerAddress =
    document.getElementById("customerAddress");

  const discount =
    document.getElementById("discount");

  const paid =
    document.getElementById("paid");

  const paymentStatus =
    document.getElementById("paymentStatus");

  const notes =
    document.getElementById("notes");


  if (invoiceNo) {
    invoiceNo.value = "";
  }

  if (customerName) {
    customerName.value = "";
  }

  if (customerPhone) {
    customerPhone.value = "";
  }

  if (customerAddress) {
    customerAddress.value = "";
  }

  if (discount) {
    discount.value = "0";
  }

  if (paid) {
    paid.value = "0";
  }

  if (paymentStatus) {
    paymentStatus.value = "Pending";
  }

  if (notes) {
    notes.value = "";
  }


  // Today's date
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
