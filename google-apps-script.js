/**
 * SCRIPT PARA GOOGLE APPS SCRIPT (CONEXIÓN WEB -> GOOGLE SHEETS & EMAIL)
 * 🐾 Recaudación Cirugía Princesa
 * 
 * Funcionalidades:
 * 1. Muro de Apoyo Comunitario en Vivo:
 *    - doGet(): Consulta los mensajes comunitarios de la pestaña "Muro de Apoyo"
 *      y los envía a la página web en tiempo real en formato JSON.
 *    - doPost({ type: "guestbook" }): Recibe y guarda los mensajes de los visitantes
 *      directamente en la hoja "Muro de Apoyo".
 * 2. Gestión de Pedidos de la Tienda de Postres:
 *    - Guarda los pedidos automáticamente en la pestaña "Pedidos Princesa".
 *    - ENVÍA UN CORREO ELECTRÓNICO AUTOMÁTICO A SARA con el resumen del pedido,
 *      el total a cobrar, y un botón para abrir el WhatsApp del comprador con 1 clic.
 *    - Formato visual rosado retro con SELECTOR DESPLEGABLE de estado (Pendiente, Pagado, Despachado).
 */

// =========================================================================
// 1. CONSULTA DE MENSAJES DEL MURO COMUNITARIO (doGet)
// =========================================================================
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Muro de Apoyo") || ss.getSheetByName("Muro");
    var messages = [];

    if (sheet && sheet.getLastRow() > 1) {
      var numRows = sheet.getLastRow() - 1;
      var rows = sheet.getRange(2, 1, numRows, 4).getValues();

      // Recorremos de la más reciente a la más antigua para mostrar los últimos mensajes arriba
      for (var i = rows.length - 1; i >= 0; i--) {
        var r = rows[i];
        var fechaVal = r[0];
        var fechaStr = fechaVal instanceof Date
          ? Utilities.formatDate(fechaVal, "America/Bogota", "dd MMM yyyy")
          : String(fechaVal || "");
        var nombreStr = String(r[1] || "").trim();
        var stickerStr = String(r[2] || "🐾").trim();
        var msgStr = String(r[3] || "").trim();

        if (nombreStr && msgStr) {
          messages.push({
            date: fechaStr,
            name: nombreStr,
            sticker: stickerStr,
            msg: msgStr
          });
        }
      }
    }

    var output = JSON.stringify({ status: "success", messages: messages });
    
    // Soporte JSONP por si el navegador lo requiere
    var callback = e && e.parameter && e.parameter.callback;
    if (callback) {
      return ContentService.createTextOutput(callback + "(" + output + ")")
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }

    return ContentService.createTextOutput(output)
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    var errOutput = JSON.stringify({ 
      status: "error", 
      error: err.toString(), 
      messages: [] 
    });
    return ContentService.createTextOutput(errOutput).setMimeType(ContentService.MimeType.JSON);
  }
}

// =========================================================================
// 2. RECEPCIÓN DE DATOS DESDE LA WEB (doPost)
// =========================================================================
function doPost(e) {
  try {
    var contents = e.postData && e.postData.contents ? e.postData.contents : "{}";
    var data = JSON.parse(contents);

    // CASO A: Mensaje para el Muro de Apoyo Comunitario
    if (data.type === "guestbook") {
      return guardarMensajeMuro(data);
    }

    // CASO B: Pedido de la Tienda de Postres / Merch
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Pedidos Princesa") || ss.getSheetByName("Pedidos") || ss.getSheets()[0];

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

// =========================================================================
// 3. GUARDAR MENSAJE EN EL MURO DE APOYO
// =========================================================================
function guardarMensajeMuro(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Muro de Apoyo");
  
  // Si no existe la pestaña, la crea con sus encabezados automáticamente
  if (!sheet) {
    sheet = ss.insertSheet("Muro de Apoyo");
    var headers = ["FECHA", "NOMBRE / APODO", "STICKER", "MENSAJE DE APOYO"];
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setValues([headers]);
    headerRange.setFontWeight("bold");
    headerRange.setFontSize(10);
    headerRange.setBackground("#ffd6ec");
    headerRange.setFontColor("#590d34");
    headerRange.setHorizontalAlignment("center");
    headerRange.setVerticalAlignment("middle");
    sheet.setRowHeight(1, 35);
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 140);
    sheet.setColumnWidth(2, 180);
    sheet.setColumnWidth(3, 90);
    sheet.setColumnWidth(4, 500);
    sheet.getRange("D2:D").setWrap(true);
  }

  var fecha = data.date || Utilities.formatDate(new Date(), "America/Bogota", "dd MMM yyyy");
  var nombre = String(data.name || "Amigo/a de Princesa").trim().substring(0, 80);
  var sticker = String(data.sticker || "🐾").trim().substring(0, 10);
  var mensaje = String(data.msg || "").trim().substring(0, 600);

  if (mensaje) {
    sheet.appendRow([fecha, nombre, sticker, mensaje]);
  }

  return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// =========================================================================
// 4. FUNCIÓN DE ENVÍO DE EMAIL A SARA
// =========================================================================
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
// 5. ORGANIZADOR AUTOMÁTICO (Encabezados + Selector Desplegable + Formato)
// =========================================================================
function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Configurar pestaña de Pedidos
  var sheetPedidos = ss.getSheetByName("Pedidos Princesa") || ss.getActiveSheet();
  sheetPedidos.setName("Pedidos Princesa");

  if (sheetPedidos.getRange(1, 1).getValue().toString().indexOf("#") !== -1) {
    sheetPedidos.insertRowBefore(1);
  }

  var headersPedidos = [
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

  var headerRange = sheetPedidos.getRange(1, 1, 1, headersPedidos.length);
  headerRange.setValues([headersPedidos]);
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(10);
  headerRange.setBackground("#ffd6ec");
  headerRange.setFontColor("#590d34");
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheetPedidos.setRowHeight(1, 38);
  sheetPedidos.setFrozenRows(1);

  sheetPedidos.getRange("I2:I").setNumberFormat("$#,##0");
  sheetPedidos.getRange("K2:L").setNumberFormat("$#,##0");
  sheetPedidos.getRange("G2:G").setWrap(true);
  sheetPedidos.getRange("J2:J").setWrap(true);
  sheetPedidos.getRange("A2:B").setHorizontalAlignment("center");
  sheetPedidos.getRange("D2:D").setHorizontalAlignment("center");

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
  sheetPedidos.getRange("N2:N1000").setDataValidation(rule);

  sheetPedidos.setColumnWidth(1, 150);
  sheetPedidos.setColumnWidth(2, 160);
  sheetPedidos.setColumnWidth(3, 190);
  sheetPedidos.setColumnWidth(4, 130);
  sheetPedidos.setColumnWidth(5, 110);
  sheetPedidos.setColumnWidth(6, 140);
  sheetPedidos.setColumnWidth(7, 230);
  sheetPedidos.setColumnWidth(8, 200);
  sheetPedidos.setColumnWidth(9, 110);
  sheetPedidos.setColumnWidth(10, 280);
  sheetPedidos.setColumnWidth(11, 110);
  sheetPedidos.setColumnWidth(12, 130);
  sheetPedidos.setColumnWidth(13, 180);
  sheetPedidos.setColumnWidth(14, 230);

  // 2. Configurar pestaña del Muro de Apoyo Comunitario
  var sheetMuro = ss.getSheetByName("Muro de Apoyo");
  if (!sheetMuro) {
    sheetMuro = ss.insertSheet("Muro de Apoyo");
  }
  var headersMuro = ["FECHA", "NOMBRE / APODO", "STICKER", "MENSAJE DE APOYO"];
  var rangeMuro = sheetMuro.getRange(1, 1, 1, headersMuro.length);
  rangeMuro.setValues([headersMuro]);
  rangeMuro.setFontWeight("bold");
  rangeMuro.setFontSize(10);
  rangeMuro.setBackground("#ffd6ec");
  rangeMuro.setFontColor("#590d34");
  rangeMuro.setHorizontalAlignment("center");
  rangeMuro.setVerticalAlignment("middle");
  sheetMuro.setRowHeight(1, 35);
  sheetMuro.setFrozenRows(1);
  sheetMuro.setColumnWidth(1, 140);
  sheetMuro.setColumnWidth(2, 180);
  sheetMuro.setColumnWidth(3, 90);
  sheetMuro.setColumnWidth(4, 500);
  sheetMuro.getRange("D2:D").setWrap(true);
}
