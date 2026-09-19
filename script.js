let itemCount = 0;

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

// First item automatically
addItem();
});

// ==============================
// ADD ITEM
// ==============================

function addItem() {

itemCount++;

const items = document.getElementById("items");

const item = document.createElement("div");

item.className = "item";

item.innerHTML = `
<div class="item-grid">

  <div>
    <label>Work / Item</label>
    <input
      class="item-name"
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
  <strong>₹<span class="item-amount">0.00</span></strong>
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

const items = document.querySelectorAll(".item");

items.forEach(function (item) {

const qty =
  parseFloat(item.querySelector(".item-qty").value) || 0;

const rate =
  parseFloat(item.querySelector(".item-rate").value) || 0;

const amount = qty * rate;

item.querySelector(".item-amount").textContent =
  amount.toFixed(2);

subtotal += amount;

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

// ==============================
// SAVE INVOICE
// ==============================

function saveInvoice() {

const invoice = {

invoiceNo:
  document.getElementById("invoiceNo").value,

date:
  document.getElementById("date").value,

customerName:
  document.getElementById("customerName").value,

customerPhone:
  document.getElementById("customerPhone").value,

customerAddress:
  document.getElementById("customerAddress").value,

discount:
  document.getElementById("discount").value,

paid:
  document.getElementById("paid").value,

paymentStatus:
  document.getElementById("paymentStatus").value,

notes:
  document.getElementById("notes").value,

total:
  document.getElementById("total").textContent,

due:
  document.getElementById("due").textContent,

items: []

};

document.querySelectorAll(".item").forEach(function (item) {

invoice.items.push({

  name:
    item.querySelector(".item-name").value,

  qty:
    item.querySelector(".item-qty").value,

  rate:
    item.querySelector(".item-rate").value,

  amount:
    item.querySelector(".item-amount").textContent

});

});

localStorage.setItem(
"parbezWorksInvoice",
JSON.stringify(invoice)
);

alert("Invoice saved successfully!");
}

// ==============================
// DOWNLOAD BILL AS JPG
// ==============================

async function downloadBillJPG() {

const bill = document.getElementById("billArea");

if (!window.html2canvas) {
alert("JPG feature load nahi hua. Internet ON karke page reload karo.");
return;
}

const oldTitle = document.title;

const invoiceNo =
document.getElementById("invoiceNo").value.trim() || "PW-BILL";

// Buttons temporarily hide
bill.classList.add("export-mode");

// Wait for rendering
await new Promise(resolve => setTimeout(resolve, 300));

try {

const canvas = await html2canvas(bill, {

  scale: 2,

  useCORS: true,

  backgroundColor: "#ffffff",

  scrollX: 0,

  scrollY: -window.scrollY,

  windowWidth: bill.scrollWidth,

  windowHeight: bill.scrollHeight

});


const image = canvas.toDataURL(
  "image/jpeg",
  0.95
);


const link = document.createElement("a");

link.href = image;

link.download = `${invoiceNo}-Bill.jpg`;

document.body.appendChild(link);

link.click();

document.body.removeChild(link);

} catch (error) {

console.error(error);

alert("Bill JPG banane mein problem hui.");

} finally {

bill.classList.remove("export-mode");

document.title = oldTitle;

}
}

// ==============================
// WHATSAPP
// ==============================

function sendWhatsApp() {

const phone =
document.getElementById("customerPhone").value.trim();

const name =
document.getElementById("customerName").value.trim();

const invoiceNo =
document.getElementById("invoiceNo").value.trim();

const total =
document.getElementById("total").textContent;

const due =
document.getElementById("due").textContent;

let message =
`PARBEZ WORKS

Invoice: ${invoiceNo || "N/A"}
Customer: ${name || "N/A"}

Total: ₹${total}
Due: ₹${due}

Electrical • False Ceiling • Plumbing`;

let cleanPhone = phone.replace(/\D/g, "");

if (cleanPhone.length === 10) {
cleanPhone = "91" + cleanPhone;
}

const url =
"https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}";

window.open(url, "_blank");
}

// ==============================
// CLEAR
// ==============================

function clearInvoice() {

const confirmClear =
confirm("Kya aap poora invoice clear karna chahte hain?");

if (!confirmClear) return;

document.getElementById("invoiceNo").value = "";
document.getElementById("customerName").value = "";
document.getElementById("customerPhone").value = "";
document.getElementById("customerAddress").value = "";
document.getElementById("discount").value = "0";
document.getElementById("paid").value = "0";
document.getElementById("paymentStatus").value = "Pending";
document.getElementById("notes").value = "";

document.getElementById("items").innerHTML = "";

addItem();

calculateTotal();
}
