/**
 * SCRIPT PARA GOOGLE APPS SCRIPT (CONEXIÓN WEB -> GOOGLE SHEETS & EMAIL)
 * 🐾 Recaudación Cirugía Princesa
 * 
 * Funcionalidades:
 * 1. Guarda los pedidos automáticamente en tu Google Sheet privado.
 * 2. ENVÍA UN CORREO ELECTRÓNICO AUTOMÁTICO A SARA con el resumen del pedido,
 *    el total a cobrar, y un botón para abrir el WhatsApp del comprador con 1 clic.
 * 3. Formato visual rosado retro con SELECTOR DESPLEGABLE de estado (Pendiente, Pagado, Despachado).
 */

// ==========================================
// 1. RECEPCIÓN DE PEDIDOS DESDE LA WEB
// ==========================================
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Formatear los productos en una lista legible para la hoja
    var productosTexto = (data.items || []).map(function(item) {
      var variante = item.variant ? " (" + item.variant + ")" : "";
      return item.qty + "x " + item.name + variante + " - $" + Number(item.price * item.qty).toLocaleString('es-CO');
    }).join("\n");

    // Agregar la fila con todos los datos del cliente
    sheet.appendRow([
      data.code,                                            // A: Código de pedido (ej: #PRINCESA-8421)
      data.date,                                            // B: Fecha y hora
      data.customer.name,                                   // C: Nombre del cliente
      data.customer.phone,                                  // D: Celular / WhatsApp
      data.customer.city,                                   // E: Ciudad
      data.customer.neighborhood || "No especificado",      // F: Barrio
      data.customer.address,                                // G: Dirección completa
      data.shipping.zone,                                   // H: Zona de envío
      Number(data.shipping.cost) || 0,                      // I: Costo del envío
      productosTexto,                                       // J: Lista de productos
      Number(data.subtotal) || 0,                           // K: Subtotal
      Number(data.total) || 0,                              // L: Total con envío
      data.customer.notes || "Ninguna",                     // M: Notas
      "🟡 Pendiente Comprobante Nequi"                      // N: Estado inicial
    ]);

    // ENVIAR NOTIFICACIÓN AUTOMÁTICA POR EMAIL A SARA
    try {
      enviarNotificacionEmail(data);
    } catch (mailErr) {
      Logger.log("Error al enviar email: " + mailErr);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", code: data.code }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ==========================================
// 2. FUNCIÓN DE ENVÍO DE EMAIL A SARA
// ==========================================
function enviarNotificacionEmail(data) {
  var emailDestino = Session.getEffectiveUser().getEmail() || "saacevedom@unal.edu.co";
  var sheetUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  var telefonoLimpio = String(data.customer.phone || "").replace(/\D/g, "");
  var linkWhatsApp = telefonoLimpio ? "https://wa.me/57" + telefonoLimpio : "#";
  
  var htmlProductos = (data.items || []).map(function(item) {
    var variante = item.variant ? " (" + item.variant + ")" : "";
    var totalItem = Number(item.price * item.qty).toLocaleString('es-CO');
    return "<li style='margin-bottom: 6px;'><strong>" + item.qty + "x</strong> " + item.name + "<span style='color: #777;'>" + variante + "</span> — <strong>$" + totalItem + " COP</strong></li>";
  }).join("");

  var htmlBody = "" +
    "<div style='font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; background: #fff5fa; border: 2px solid #ff77a9; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(216,27,96,0.15);'>" +
      "<div style='background: linear-gradient(135deg, #d81b60 0%, #880e4f 100%); color: #ffffff; padding: 22px; text-align: center;'>" +
        "<h1 style='margin: 0; font-size: 22px;'>🐾 ¡Nuevo Pedido para Princesa! 🐱💖</h1>" +
        "<p style='margin: 8px 0 0 0; font-size: 14px; opacity: 0.95;'>Código: <strong>" + data.code + "</strong> • " + data.date + "</p>" +
      "</div>" +
      "<div style='padding: 24px; color: #333333;'>" +
        "<div style='background: #ffffff; border-radius: 8px; padding: 16px; border: 1px solid #ffd1eb; margin-bottom: 16px;'>" +
          "<h2 style='margin-top: 0; color: #880e4f; font-size: 16px; border-bottom: 2px dashed #ffd1eb; padding-bottom: 8px;'>👤 Datos del Comprador</h2>" +
          "<p style='margin: 6px 0;'><strong>Nombre:</strong> " + data.customer.name + "</p>" +
          "<p style='margin: 6px 0;'><strong>Teléfono / WhatsApp:</strong> <a href='" + linkWhatsApp + "' target='_blank' style='color: #00a896; font-weight: bold; text-decoration: underline;'>+" + data.customer.phone + " 💬 (Clic para chatear)</a></p>" +
          "<p style='margin: 6px 0;'><strong>Ciudad:</strong> " + data.customer.city + " (" + (data.customer.neighborhood || "No especificado") + ")</p>" +
          "<p style='margin: 6px 0;'><strong>Dirección de entrega:</strong> " + data.customer.address + "</p>" +
          "<p style='margin: 6px 0;'><strong>Zona DiDi/Uber:</strong> " + data.shipping.zone + "</p>" +
          (data.customer.notes && data.customer.notes !== "Ninguna" ? "<p style='margin: 8px 0; background: #fff9db; padding: 8px; border-radius: 4px; border-left: 3px solid #f59f00;'><strong>Notas:</strong> " + data.customer.notes + "</p>" : "") +
        "</div>" +
        "<div style='background: #ffffff; border-radius: 8px; padding: 16px; border: 1px solid #ffd1eb; margin-bottom: 16px;'>" +
          "<h2 style='margin-top: 0; color: #880e4f; font-size: 16px; border-bottom: 2px dashed #ffd1eb; padding-bottom: 8px;'>🛍️ Productos Encargados</h2>" +
          "<ul style='padding-left: 20px; margin: 10px 0; line-height: 1.5;'>" + htmlProductos + "</ul>" +
          "<hr style='border: 0; border-top: 1px dashed #ffd1eb; margin: 12px 0;'>" +
          "<p style='margin: 4px 0;'><strong>Subtotal productos:</strong> $" + Number(data.subtotal || 0).toLocaleString('es-CO') + " COP</p>" +
          "<p style='margin: 4px 0;'><strong>Costo de envío:</strong> $" + Number(data.shipping.cost || 0).toLocaleString('es-CO') + " COP</p>" +
          "<p style='margin: 10px 0 0 0; font-size: 18px; color: #d81b60;'><strong>TOTAL A COBRAR EN NEQUI: $" + Number(data.total || 0).toLocaleString('es-CO') + " COP</strong></p>" +
        "</div>" +
        "<div style='text-align: center; margin: 24px 0 10px 0;'>" +
          "<a href='" + sheetUrl + "' target='_blank' style='background: #d81b60; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; box-shadow: 0 4px 10px rgba(216,27,96,0.3);'>📊 Ver en Google Sheets</a>" +
        "</div>" +
        "<p style='font-size: 12px; color: #888; text-align: center; margin-top: 16px;'>Recuerda verificar el comprobante de Nequi antes de despachar el pedido. 🐾</p>" +
      "</div>" +
    "</div>";

  MailApp.sendEmail({
    to: emailDestino,
    subject: "🐾 ¡Nuevo Pedido Princesa! " + data.code + " - " + data.customer.name + " ($" + Number(data.total || 0).toLocaleString('es-CO') + ")",
    htmlBody: htmlBody
  });
}

// =========================================================================
// 3. ORGANIZADOR AUTOMÁTICO (Encabezados + Selector Desplegable + Formato)
// =========================================================================
function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Si en la fila 1 ya cayó algún pedido sin títulos, insertamos una fila arriba
  if (sheet.getRange(1, 1).getValue().toString().indexOf("#") !== -1) {
    sheet.insertRowBefore(1);
  }
  
  var headers = [
    "CÓDIGO PEDIDO", 
    "FECHA Y HORA", 
    "NOMBRE CLIENTE", 
    "WHATSAPP / TEL", 
    "CIUDAD", 
    "BARRIO / SECTOR", 
    "DIRECCIÓN EXACTA", 
    "ZONA DE ENTREGA", 
    "COSTO ENVÍO", 
    "PRODUCTOS SOLICITADOS", 
    "SUBTOTAL", 
    "TOTAL A COBRAR", 
    "NOTAS CLIENTE", 
    "ESTADO PEDIDO (Clic aquí)"
  ];

  // Insertar títulos en la Fila 1
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(10);
  headerRange.setBackground("#ffd6ec"); // Rosita Y2K
  headerRange.setFontColor("#590d34"); // Vino tinto contraste
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 38);
  sheet.setFrozenRows(1); // Fila fija al hacer scroll

  // Formato de moneda colombiana en Envíos, Subtotal y Total (Columnas I, K, L)
  sheet.getRange("I2:I").setNumberFormat("$#,##0");
  sheet.getRange("K2:L").setNumberFormat("$#,##0");

  // Ajuste automático de saltos de línea para que los productos no se corten
  sheet.getRange("G2:G").setWrap(true);
  sheet.getRange("J2:J").setWrap(true);

  // Centrado estético en códigos y fechas
  sheet.getRange("A2:B").setHorizontalAlignment("center");
  sheet.getRange("D2:D").setHorizontalAlignment("center");

  // ========================================================
  // SELECTOR DESPLEGABLE (DROPDOWN) PARA ESTADO DEL PEDIDO
  // ========================================================
  var estados = [
    "🟡 Pendiente Comprobante Nequi",
    "🟢 Pago Confirmado",
    "🛵 En camino / Despachado",
    "✅ Entregado",
    "❌ Cancelado"
  ];
  
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(estados, true)
    .setAllowInvalid(false)
    .build();
    
  // Aplica el menú desplegable a toda la columna N (desde la fila 2 en adelante)
  sheet.getRange("N2:N1000").setDataValidation(rule);

  // Anchos perfectos de columnas para que todo se lea sin tener que estirar a mano
  sheet.setColumnWidth(1, 150); // Código
  sheet.setColumnWidth(2, 160); // Fecha
  sheet.setColumnWidth(3, 190); // Nombre
  sheet.setColumnWidth(4, 130); // Teléfono
  sheet.setColumnWidth(5, 110); // Ciudad
  sheet.setColumnWidth(6, 140); // Barrio
  sheet.setColumnWidth(7, 230); // Dirección
  sheet.setColumnWidth(8, 200); // Zona
  sheet.setColumnWidth(9, 110); // Costo envío
  sheet.setColumnWidth(10, 280); // Productos
  sheet.setColumnWidth(11, 110); // Subtotal
  sheet.setColumnWidth(12, 130); // Total
  sheet.setColumnWidth(13, 180); // Notas
  sheet.setColumnWidth(14, 230); // Selector Dropdown
}
