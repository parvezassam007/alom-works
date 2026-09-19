function sendWhatsApp() {

  const phone =
    document.getElementById("customerPhone").value.trim();

  const name =
    document.getElementById("customerName").value.trim() || "Customer";

  const address =
    document.getElementById("customerAddress").value.trim() || "N/A";

  const invoiceNo =
    document.getElementById("invoiceNo").value.trim() || "N/A";

  const date =
    document.getElementById("date").value || "N/A";

  const subtotal =
    document.getElementById("subtotal").textContent;

  const discount =
    document.getElementById("discount").value || "0";

  const paid =
    document.getElementById("paid").value || "0";

  const total =
    document.getElementById("total").textContent;

  const due =
    document.getElementById("due").textContent;

  const status =
    document.getElementById("paymentStatus").value || "Pending";

  const notes =
    document.getElementById("notes").value.trim() || "No notes";



  // ============================
  // ITEMS
  // ============================

  let itemText = "";

  document.querySelectorAll(".item").forEach(function(item, index) {

    const itemName =
      item.querySelector(".item-name").value.trim()
      || "Work Item";

    const qty =
      item.querySelector(".item-qty").value || "0";

    const rate =
      item.querySelector(".item-rate").value || "0";

    const amount =
      item.querySelector(".item-amount").textContent;

    itemText +=
      `${index + 1}. ${itemName}\n` +
      `   Qty: ${qty} × ₹${rate} = ₹${amount}\n`;

  });



  // ============================
  // WHATSAPP MESSAGE
  // ============================

  const message =
`*PARBEZ WORKS*

🧾 *INVOICE*

Invoice No: ${invoiceNo}
Date: ${date}

👤 *Customer Details*
Name: ${name}
Phone: ${phone || "N/A"}
Address: ${address}

🔧 *WORK / ITEMS*
${itemText}
━━━━━━━━━━━━━━

Subtotal: ₹${subtotal}
Discount: ₹${discount}
*TOTAL: ₹${total}*

Paid: ₹${paid}
*DUE: ₹${due}*

Payment Status: ${status}

📝 *NOTE*
${notes}

━━━━━━━━━━━━━━

Electrical • False Ceiling • Plumbing

Thank you for choosing *PARBEZ WORKS*!`;



  // ============================
  // PHONE NUMBER
  // ============================

  let cleanPhone =
    phone.replace(/\D/g, "");


  // India number
  if (cleanPhone.length === 10) {
    cleanPhone = "91" + cleanPhone;
  }


  // ============================
  // OPEN WHATSAPP
  // ============================

  if (cleanPhone.length >= 12) {

    const whatsappURL =
      `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    window.location.href = whatsappURL;

  } else {

    const whatsappURL =
      `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.location.href = whatsappURL;

  }

}
