let itemCount = 0;

document.addEventListener("DOMContentLoaded", function () {

// ==============================
// TODAY'S DATE
// ==============================

const dateInput = document.getElementById("date");

if (dateInput) {

const today = new Date();

const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");

dateInput.value = `${yyyy}-${mm}-${dd}`;

}

// First item automatically
const items = document.getElementById("items");

if (items && items.children.length === 0) {
addItem();
}

calculateTotal();
});

// ==============================
// ADD ITEM
// ==============================

function addItem() {

itemCount++;

const items = document.getElementById("items");

if (!items) return;

const item = document.createElement("div");

item.className = "item";

item.innerHTML = `

<div class="item-grid">

  <div>
    <label>Work / Item</label>

    <input
      class="item-name"
      type="text"
      placeholder="Example: Fan installation"
    >
  </div>


  <div>
    <label>Qty</label>

    <input
      class="item-qty"
      type="number"
      value="1"
      min="0"
      oninput="calculateTotal()"
    >
  </div>


  <div>
    <label>Rate (₹)</label>

    <input
      class="item-rate"
      type="number"
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

// ==============================
// REMOVE ITEM
// ==============================

function removeItem(button) {

const item = button.closest(".item");

if (item) {
item.remove();
}

calculateTotal();
}

// ==============================
// CALCULATE TOTAL
// ==============================

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

const discountInput =
document.getElementById("discount");

const paidInput =
document.getElementById("paid");

const discount =
parseFloat(discountInput?.value) || 0;

const paid =
parseFloat(paidInput?.value) || 0;

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

// ==============================
// SAVE INVOICE
// ==============================

function saveInvoice() {

const invoice = {

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

discount:
  document.getElementById("discount")?.value || "0",

paid:
  document.getElementById("paid")?.value || "0",

paymentStatus:
  document.getElementById("paymentStatus")?.value || "Pending",

notes:
  document.getElementById("notes")?.value || "",

total:
  document.getElementById("total")?.textContent || "0.00",

due:
  document.getElementById("due")?.textContent || "0.00",

items: []

};

document
.querySelectorAll(".item")
.forEach(function (item) {

  invoice.items.push({

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

localStorage.setItem(
"parbezWorksInvoice",
JSON.stringify(invoice)
);

alert("Invoice saved successfully!");

}

// ==============================
// DOWNLOAD BILL JPG
// ==============================

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
document
.getElementById("invoiceNo")
?.value
.trim() || "PW-BILL";

// Hide buttons
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
  `${invoiceNo}-Bill.jpg`;


document.body.appendChild(link);

link.click();

document.body.removeChild(link);

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

// ==============================
// WHATSAPP DIRECT CUSTOMER NUMBER
// ==============================

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

const total =
document
.getElementById("total")
?.textContent || "0.00";

const due =
document
.getElementById("due")
?.textContent || "0.00";

// Remove spaces, +, -, brackets etc.
let cleanPhone =
phone.replace(/\D/g, "");

// Indian 10 digit number
if (cleanPhone.length === 10) {

cleanPhone =
  "91" + cleanPhone;

}

// Already +91 / 91
else if (
cleanPhone.startsWith("91") &&
cleanPhone.length === 12
) {

// Keep as it is

}

else {

alert(
  "Customer Phone mein valid 10-digit Indian mobile number enter karo."
);

return;

}

const message =
`PARBEZ WORKS

Invoice: ${invoiceNo}
Customer: ${name}

Total: ₹${total}
Due: ₹${due}

Electrical • False Ceiling • Plumbing

Thank you for choosing PARBEZ WORKS!`;

// IMPORTANT:
// Backticks (`) use kiye gaye hain.

const url =
"https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}";

// Direct WhatsApp link
window.location.href = url;

}

// ==============================
// CLEAR INVOICE
// ==============================

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

// Reset date
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

// Reset items
const items =
document.getElementById("items");

if (items) {

items.innerHTML = "";

itemCount = 0;

addItem();

}

// Delete saved invoice
localStorage.removeItem(
"parbezWorksInvoice"
);

calculateTotal();

  }
