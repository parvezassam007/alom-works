// ==========================================
// PARBEZ WORKS
// MODERN BILLING SYSTEM
// ==========================================

let itemCount = 0;


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const date =
      document.getElementById("date");

    if (date) {
      date.valueAsDate =
        new Date();
    }

    addItem();

    calculateTotal();

  }
);


// ==========================================
// ADD ITEM
// ==========================================

function addItem() {

  itemCount++;

  const container =
    document.getElementById("items");

  if (!container) {
    return;
  }


  const item =
    document.createElement("div");

  item.className = "item";

  item.id =
    "item-" + itemCount;


  item.innerHTML = `

    <div class="item-grid">

      <div class="input-group">

        <label>Work / Item</label>

        <input
          type="text"
          class="item-name"
          placeholder="Electrical Point"
        >

      </div>


      <div class="input-group">

        <label>Qty</label>

        <input
          type="number"
          class="item-qty"
          value="1"
          min="0"
        >

      </div>


      <div class="input-group">

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
      ✕ Remove Item
    </button>

  `;


  container.appendChild(item);


  item.querySelector(
    ".item-qty"
  ).addEventListener(
    "input",
    calculateTotal
  );


  item.querySelector(
    ".item-rate"
  ).addEventListener(
    "input",
    calculateTotal
  );


  calculateTotal();

}


// ==========================================
// REMOVE ITEM
// ==========================================

function removeItem(id) {

  const item =
    document.getElementById(
      "item-" + id
    );


  if (item) {

    item.remove();

    calculateTotal();

  }

}


// ==========================================
// CALCULATE
// ==========================================

function calculateTotal() {

  let subtotal = 0;


  document
    .querySelectorAll(".item")
    .forEach(
      function (item) {

        const qty =
          parseFloat(
            item.querySelector(
              ".item-qty"
            ).value
          ) || 0;


        const rate =
          parseFloat(
            item.querySelector(
              ".item-rate"
            ).value
          ) || 0;


        subtotal +=
          qty * rate;

      }
    );


  const discount =
    parseFloat(
      document.getElementById(
        "discount"
      )?.value
    ) || 0;


  const paid =
    parseFloat(
      document.getElementById(
        "paid"
      )?.value
    ) || 0;


  const total =
    Math.max(
      0,
      subtotal - discount
    );


  const due =
    Math.max(
      0,
      total - paid
    );


  document.getElementById(
    "subtotal"
  ).textContent =
    subtotal.toFixed(2);


  document.getElementById(
    "total"
  ).textContent =
    total.toFixed(2);


  document.getElementById(
    "due"
  ).textContent =
    due.toFixed(2);

}


// ==========================================
// DISCOUNT / PAID EVENTS
// ==========================================

document.addEventListener(
  "input",
  function (event) {

    if (
      event.target.id ===
      "discount" ||

      event.target.id ===
      "paid"
    ) {

      calculateTotal();

    }

  }
);


// ==========================================
// GET DATA
// ==========================================

function getInvoiceData() {

  const items = [];


  document
    .querySelectorAll(".item")
    .forEach(
      function (item) {

        const name =
          item.querySelector(
            ".item-name"
          ).value.trim();


        const qty =
          parseFloat(
            item.querySelector(
              ".item-qty"
            ).value
          ) || 0;


        const rate =
          parseFloat(
            item.querySelector(
              ".item-rate"
            ).value
          ) || 0;


        items.push({

          name: name,

          qty: qty,

          rate: rate,

          amount:
            qty * rate

        });

      }
    );


  return {

    invoiceNo:
      document.getElementById(
        "invoiceNo"
      ).value,

    date:
      document.getElementById(
        "date"
      ).value,

    customerName:
      document.getElementById(
        "customerName"
      ).value,

    customerPhone:
      document.getElementById(
        "customerPhone"
      ).value,

    customerAddress:
      document.getElementById(
        "customerAddress"
      ).value,

    items: items,

    subtotal:
      parseFloat(
        document.getElementById(
          "subtotal"
        ).textContent
      ) || 0,

    discount:
      parseFloat(
        document.getElementById(
          "discount"
        ).value
      ) || 0,

    total:
      parseFloat(
        document.getElementById(
          "total"
        ).textContent
      ) || 0,

    paid:
      parseFloat(
        document.getElementById(
          "paid"
        ).value
      ) || 0,

    due:
      parseFloat(
        document.getElementById(
          "due"
        ).textContent
      ) || 0,

    paymentStatus:
      document.getElementById(
        "paymentStatus"
      ).value,

    notes:
      document.getElementById(
        "notes"
      ).value

  };

}


// ==========================================
// SAVE
// ==========================================

function saveInvoice() {

  const invoice =
    getInvoiceData();


  let invoices =
    JSON.parse(
      localStorage.getItem(
        "parbezWorksInvoices"
      )
    ) || [];


  invoices.push(invoice);


  localStorage.setItem(
    "parbezWorksInvoices",
    JSON.stringify(
      invoices
    )
  );


  alert(
    "Invoice saved successfully! ✅"
  );

}


// ==========================================
// WHATSAPP
// ==========================================

function sendWhatsApp() {

  const invoice =
    getInvoiceData();


  const phone =
    invoice.customerPhone
      .replace(
        /\D/g,
        ""
      );


  if (!phone) {

    alert(
      "Enter customer phone number first."
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


  invoice.items.forEach(
    function (item) {

      message +=
        (item.name || "Item") +
        " - " +
        item.qty +
        " × ₹" +
        item.rate +
        " = ₹" +
        item.amount +
        "\n";

    }
  );


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


  const url =
    "https://wa.me/" +
    phone +
    "?text=" +
    encodeURIComponent(
      message
    );


  window.open(
    url,
    "_blank"
  );

}


// ==========================================
// DOWNLOAD BILL IMAGE
// ==========================================

function downloadBillImage() {

  const invoice =
    getInvoiceData();


  if (!invoice.customerName) {

    alert(
      "Enter customer name first."
    );

    return;

  }


  if (
    typeof html2canvas ===
    "undefined"
  ) {

    alert(
      "Image library could not load. Check internet and refresh."
    );

    return;

  }


  const bill =
    document.createElement(
      "div"
    );


  bill.style.width =
    "700px";

  bill.style.padding =
    "35px";

  bill.style.background =
    "#ffffff";

  bill.style.color =
    "#0f172a";

  bill.style.fontFamily =
    "Arial, sans-serif";

  bill.style.position =
    "fixed";

  bill.style.left =
    "-10000px";

  bill.style.top =
    "0";


  let rows = "";


  invoice.items.forEach(
    function (item) {

      rows += `

        <tr>

          <td style="
            padding:10px;
            border:1px solid #ddd;
          ">
            ${item.name || "Item"}
          </td>

          <td style="
            padding:10px;
            border:1px solid #ddd;
            text-align:center;
          ">
            ${item.qty}
          </td>

          <td style="
            padding:10px;
            border:1px solid #ddd;
            text-align:right;
          ">
            ₹${item.rate.toFixed(2)}
          </td>

          <td style="
            padding:10px;
            border:1px solid #ddd;
            text-align:right;
          ">
            ₹${item.amount.toFixed(2)}
          </td>

        </tr>

      `;

    }
  );


  bill.innerHTML = `

    <div style="
      background:#0f172a;
      color:white;
      padding:22px;
      border-radius:12px;
      text-align:center;
    ">

      <h1 style="
        margin:0;
        font-size:30px;
      ">
        PARBEZ WORKS
      </h1>

      <p style="
        margin:5px 0 0;
      ">
        Electrical • False Ceiling • Plumbing
      </p>

    </div>


    <div style="
      padding:20px 0;
    ">

      <p>
        <b>Invoice:</b>
        ${invoice.invoiceNo || "N/A"}
      </p>

      <p>
        <b>Date:</b>
        ${invoice.date || "N/A"}
      </p>

      <p>
        <b>Customer:</b>
        ${invoice.customerName}
      </p>

      <p>
        <b>Phone:</b>
        ${invoice.customerPhone || "N/A"}
      </p>

      <p>
        <b>Address:</b>
        ${invoice.customerAddress || "N/A"}
      </p>

    </div>


    <table style="
      width:100%;
      border-collapse:collapse;
    ">

      <thead>

        <tr style="
          background:#eff6ff;
        ">

          <th style="
            padding:10px;
            border:1px solid #ddd;
            text-align:left;
          ">
            Work
          </th>

          <th style="
            padding:10px;
            border:1px solid #ddd;
          ">
            Qty
          </th>

          <th style="
            padding:10px;
            border:1px solid #ddd;
          ">
            Rate
          </th>

          <th style="
            padding:10px;
            border:1px solid #ddd;
          ">
            Amount
          </th>

        </tr>

      </thead>

      <tbody>
        ${rows}
      </tbody>

    </table>


    <div style="
      text-align:right;
      margin-top:22px;
    ">

      <p>
        Subtotal:
        <b>₹${invoice.subtotal.toFixed(2)}</b>
      </p>

      <p>
        Discount:
        <b>₹${invoice.discount.toFixed(2)}</b>
      </p>

      <h2 style="
        color:#2563eb;
      ">
        Total:
        ₹${invoice.total.toFixed(2)}
      </h2>

      <p>
        Paid:
        <b>₹${invoice.paid.toFixed(2)}</b>
      </p>

      <h2 style="
        color:#ea580c;
      ">
        Due:
        ₹${invoice.due.toFixed(2)}
      </h2>

    </div>


    <div style="
      margin-top:25px;
      padding-top:15px;
      border-top:1px solid #ddd;
    ">

      <p>
        <b>Payment Status:</b>
        ${invoice.paymentStatus}
      </p>

      ${
        invoice.notes
          ? `
            <p style="margin-top:8px;">
              <b>Note:</b>
              ${invoice.notes}
            </p>
          `
          : ""
      }

    </div>


    <p style="
      text-align:center;
      margin-top:30px;
      color:#64748b;
    ">
      Thank you for choosing Parbez Works
    </p>

  `;


  document.body.appendChild(
    bill
  );


  html2canvas(
    bill,
    {
      scale: 2,
      backgroundColor: "#ffffff"
    }
  )
  .then(
    function (canvas) {

      const link =
        document.createElement(
          "a"
        );


      link.download =
        "Parbez-Works-" +
        (
          invoice.invoiceNo ||
          "Bill"
        ) +
        ".png";


      link.href =
        canvas.toDataURL(
          "image/png"
        );


      link.click();


      bill.remove();

    }
  )
  .catch(
    function (error) {

      console.error(error);

      bill.remove();

      alert(
        "Could not create bill image."
      );

    }
  );

}


// ==========================================
// CLEAR
// ==========================================

function clearInvoice() {

  if (
    !confirm(
      "Clear this invoice?"
    )
  ) {

    return;

  }


  document.getElementById(
    "invoiceNo"
  ).value = "";


  document.getElementById(
    "customerName"
  ).value = "";


  document.getElementById(
    "customerPhone"
  ).value = "";


  document.getElementById(
    "customerAddress"
  ).value = "";


  document.getElementById(
    "discount"
  ).value = 0;


  document.getElementById(
    "paid"
  ).value = 0;


  document.getElementById(
    "paymentStatus"
  ).value =
    "Pending";


  document.getElementById(
    "notes"
  ).value = "";


  document.getElementById(
    "items"
  ).innerHTML = "";


  itemCount = 0;


  addItem();


  document.getElementById(
    "date"
  ).valueAsDate =
    new Date();


  calculateTotal();

    }
