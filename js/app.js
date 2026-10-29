/**
 * PRINCESA'S RESCUE QUEST - APP JAVASCRIPT
 * Sistema Completo: Carrito, Calculadora de Envíos desde Torres de la Fuente (Cll 65 #55-30),
 * Base de Datos de Pedidos Permanente, Integración con Google Sheets / Webhook,
 * Panel de Gestión de Pedidos de Sara, Copiado Nequi, Web Audio y Muro de Apoyo.
 */

// ==========================================
// CONFIGURACIÓN PERSONALIZABLE DE SARA
// ==========================================
const CONFIG = {
  // Número real de WhatsApp de Sara (con 57 sin signos ni espacios)
  whatsappNumber: "573006087608",
  nequiNumber: "300 608 7608",
  nequiNumberClean: "3006087608",
  goalAmount: 2900000,
  currentCollected: 1450000,

  // Dirección de origen para despachos DiDi / Uber Flash:
  originAddress: "Torres de la Fuente, Calle 65 # 55-30, Medellín",

  // URL DE TU APLICACIÓN WEB DE GOOGLE APPS SCRIPT:
  // Al crear tu Google Apps Script, pega aquí la URL generada:
  // Ej: "https://script.google.com/macros/s/AKfycbx.../exec"
  // ¡Todos los pedidos llegarán a tu Google Sheet privado al instante!
  cloudWebhookUrl: "https://script.google.com/macros/s/AKfycby-sIZvaH8eG0VlnA5zmU-_sXPF1l0CIs_g7kDG9nEmc7WpFU0PAFP8XkxcCl8QasI/exec" 
};

// ==========================================
// TABLA DE TARIFAS DE ENTREGA (DiDi / Uber Flash)
// Origen: Torres de la Fuente, Calle 65 # 55-30 (Chagualo / SIU / UdeA)
// ==========================================
const SHIPPING_ZONES = [
  {
    id: "pickup-torres",
    name: "📍 Portería Torres de la Fuente (Cll 65 #55-30)",
    price: 0,
    desc: "Gratis • Coordinar hora de entrega con Sara"
  },
  {
    id: "pickup-unal",
    name: "📍 Universidad Nacional (UNAL Medellín - Sede Volador / Minas)",
    price: 0,
    desc: "Gratis • Entrega en mano en campus UNAL"
  },
  {
    id: "pickup-udea",
    name: "📍 Universidad de Antioquia (Ciudad Univ. Calle Barranquilla / Robledo)",
    price: 0,
    desc: "Gratis • Entrega en mano en campus UdeA"
  },
  {
    id: "pickup-almamater",
    name: "📍 Hospital Alma Máter de Antioquia (Antigua IPS Universitaria)",
    price: 0,
    desc: "Gratis • Entrega en portería / acceso hospital"
  },
  {
    id: "pickup-upb",
    name: "📍 Hospital UPB (Clínica Universitaria Bolivariana / Campus UPB)",
    price: 0,
    desc: "Gratis • Entrega en mano en sede UPB Laureles / Robledo"
  },
  {
    id: "pickup-metro",
    name: "📍 Estación Universidad del Metro de Medellín",
    price: 0,
    desc: "Gratis • Torniquetes / Punto de encuentro Metro"
  },
  {
    id: "didi-cercana",
    name: "🛵 Zona 1 ($6.500 COP): Centro / Chagualo / Prado / Boston / Aranjuez / Robledo bajo",
    price: 6500,
    desc: "DiDi / Uber Flash Moto (2 a 4 km desde Torres de la Fuente)"
  },
  {
    id: "didi-media",
    name: "🛵 Zona 2 ($9.500 COP): Laureles / Estadio / Belén / Floresta / Conquistadores",
    price: 9500,
    desc: "DiDi / Uber Flash Moto (5 a 8 km desde Torres de la Fuente)"
  },
  {
    id: "didi-sur-norte",
    name: "🛵 Zona 3 ($13.500 COP): El Poblado / Envigado / Bello",
    price: 13500,
    desc: "DiDi / Uber Flash Moto (8 a 13 km desde Torres de la Fuente)"
  },
  {
    id: "didi-extremos",
    name: "🛵 Zona 4 ($17.500 COP): Sabaneta / Itagüí sur / Caldas / Copacabana",
    price: 17500,
    desc: "DiDi / Uber Flash Moto (14 a 22 km desde Torres de la Fuente)"
  },
  {
    id: "nacional",
    name: "📦 Envío Nacional fuera de Medellín (Interrapidísimo: $15.000 COP)",
    price: 15000,
    desc: "Interrapidísimo / Coordinadora a cualquier ciudad de Colombia"
  }
];

// ==========================================
// SISTEMA DE AUDIO RETRO (Web Audio API)
// ==========================================
class RetroAudio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop() {
    if (!this.enabled) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  playCoin() {
    if (!this.enabled) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(987.77, this.ctx.currentTime);
      osc.frequency.setValueAtTime(1318.51, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch (e) {}
  }

  playPurr() {
    if (!this.enabled) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(80, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.15);
      osc.frequency.linearRampToValueAtTime(75, this.ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch (e) {}
  }
}

const retroSound = new RetroAudio();

// ==========================================
// TOAST DE NOTIFICACIÓN RETRO
// ==========================================
function showToast(message) {
  let toast = document.getElementById('retroToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'retroToast';
    toast.className = 'retro-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = message;
  toast.classList.add('show');
  retroSound.playCoin();
  
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3400);
}

// ==========================================
// COPIAR NÚMERO NEQUI
// ==========================================
function copyNequiNumber() {
  const num = CONFIG.nequiNumberClean;
  navigator.clipboard.writeText(num).then(() => {
    showToast(`✨ ¡Número Nequi copiado! (${num}) 💖 Abre Nequi y dona`);
  }).catch(() => {
    const input = document.createElement('input');
    input.value = num;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast(`✨ ¡Número copiado! (${num}) 💖`);
  });
}

// ==========================================
// CONTADOR DE VISITAS & RONRONEO
// ==========================================
function initVisitorCounter() {
  let visits = parseInt(localStorage.getItem('princesa_visit_count') || '4288', 10);
  visits += 1;
  localStorage.setItem('princesa_visit_count', visits);
  updateOdometerDisplay(visits);
}

function updateOdometerDisplay(number) {
  const container = document.getElementById('odometerDisplay');
  if (!container) return;
  const padded = String(number).padStart(6, '0');
  container.innerHTML = '';
  for (let char of padded) {
    const span = document.createElement('span');
    span.className = 'odometer-digit';
    span.textContent = char;
    container.appendChild(span);
  }
}

function triggerPurr() {
  retroSound.playPurr();
  let count = parseInt(localStorage.getItem('princesa_purr_count') || '162', 10);
  count += 1;
  localStorage.setItem('princesa_purr_count', count);
  
  const purrBtn = document.getElementById('btnPurr');
  if (purrBtn) {
    purrBtn.innerHTML = `😻 ¡Princesa ronronea feliz! (${count} cariños)`;
  }
  showToast(`🐾 ¡Princesa dice: Miau! Gracias por tu amor 💕`);
}

// ==========================================
// EFECTO SPARKLE CURSOR
// ==========================================
let sparklesActive = true;
function initSparkleCursor() {
  window.addEventListener('mousemove', (e) => {
    if (!sparklesActive) return;
    if (Math.random() > 0.4) return;
    
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-particle';
    sparkle.style.left = `${e.clientX + (Math.random() * 12 - 6)}px`;
    sparkle.style.top = `${e.clientY + (Math.random() * 12 - 6)}px`;
    
    const colors = ['#ff77a9', '#ffea79', '#d8b4e2', '#70e000', '#ffffff'];
    sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
  });
}

function toggleSparkles() {
  sparklesActive = !sparklesActive;
  const btn = document.getElementById('btnSparkleToggle');
  if (btn) {
    btn.textContent = sparklesActive ? '✨ Destellos: ON' : '✨ Destellos: OFF';
  }
  retroSound.playPop();
}

function toggleSound() {
  retroSound.enabled = !retroSound.enabled;
  const btn = document.getElementById('btnSoundToggle');
  if (btn) {
    btn.textContent = retroSound.enabled ? '🔊 Sonido: ON' : '🔇 Sonido: OFF';
  }
}

// ==========================================
// CARRITO DE COMPRAS CON COSTO DE ENVÍO
// ==========================================
const cart = {
  items: [],
  selectedShippingPrice: 0,
  selectedShippingName: "Recoger en Torres de la Fuente (Gratis)",

  addItem(id, name, price, variant = '') {
    const existingIndex = this.items.findIndex(i => i.id === id && i.variant === variant);
    if (existingIndex > -1) {
      this.items[existingIndex].qty += 1;
    } else {
      this.items.push({ id, name, price, variant, qty: 1 });
    }
    this.save();
    this.updateUI();
    showToast(`🛍️ ¡"${name}" agregado al carrito! 💕`);
    retroSound.playPop();
  },

  buyDirect(id, name, price, variant = '') {
    this.addItem(id, name, price, variant);
    openCartModal();
  },

  updateQty(index, delta) {
    if (this.items[index]) {
      this.items[index].qty += delta;
      if (this.items[index].qty <= 0) {
        this.items.splice(index, 1);
      }
      this.save();
      this.updateUI();
      retroSound.playPop();
    }
  },

  clear() {
    this.items = [];
    this.save();
    this.updateUI();
  },

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  },

  getTotal() {
    return this.getSubtotal() + this.selectedShippingPrice;
  },

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  },

  setShipping(price, name) {
    this.selectedShippingPrice = parseInt(price, 10) || 0;
    this.selectedShippingName = name || '';
    this.updateUI();
  },

  save() {
    sessionStorage.setItem('princesa_cart', JSON.stringify(this.items));
  },

  load() {
    try {
      const data = sessionStorage.getItem('princesa_cart');
      if (data) this.items = JSON.parse(data);
    } catch (e) {
      this.items = [];
    }
    this.updateUI();
  },

  updateUI() {
    const badge = document.getElementById('cartBadgeCount');
    const floatBtn = document.getElementById('floatingCartBtn');
    const count = this.getItemCount();
    const total = this.getTotal();
    const subtotal = this.getSubtotal();

    if (badge) badge.textContent = count;
    if (floatBtn) {
      if (count > 0) {
        floatBtn.style.display = 'flex';
        floatBtn.innerHTML = `🛒 Carrito (${count}) • $${formatCOP(total)}`;
      } else {
        floatBtn.style.display = 'none';
      }
    }

    const itemsList = document.getElementById('cartModalItems');
    const subtotalDisplay = document.getElementById('cartModalSubtotal');
    const shippingDisplay = document.getElementById('cartModalShippingCost');
    const totalDisplay = document.getElementById('cartModalTotal');

    if (itemsList) {
      if (this.items.length === 0) {
        itemsList.innerHTML = `
          <div style="text-align:center; padding: 25px; color:#888;">
            <p style="font-size: 2.2rem;">🐾</p>
            <p style="font-weight:bold; color:#4a154b;">Tu carrito está vacío</p>
            <p style="font-size:0.85rem; margin-top:4px;">Agrega camisetas, el calendario o postrecitos para apoyar la cirugía de Princesa.</p>
          </div>
        `;
      } else {
        itemsList.innerHTML = this.items.map((item, idx) => `
          <div class="cart-item-row">
            <div class="cart-item-info">
              <span class="cart-item-name">${item.name}</span>
              ${item.variant ? `<span class="cart-item-meta">Opción: ${item.variant}</span>` : ''}
              <span class="cart-item-meta">$${formatCOP(item.price)} c/u</span>
            </div>
            <div class="cart-item-actions">
              <button class="cart-qty-btn" onclick="cart.updateQty(${idx}, -1)">-</button>
              <span style="font-weight:bold; font-family:var(--font-pixel); min-width:18px; text-align:center;">${item.qty}</span>
              <button class="cart-qty-btn" onclick="cart.updateQty(${idx}, 1)">+</button>
              <span style="font-weight:bold; font-size:0.95rem; margin-left:6px; min-width:70px; text-align:right;">
                $${formatCOP(item.price * item.qty)}
              </span>
            </div>
          </div>
        `).join('');
      }
    }

    if (subtotalDisplay) subtotalDisplay.textContent = `$${formatCOP(subtotal)} COP`;
    if (shippingDisplay) shippingDisplay.textContent = this.selectedShippingPrice === 0 ? 'GRATIS' : `$${formatCOP(this.selectedShippingPrice)} COP`;
    if (totalDisplay) totalDisplay.textContent = `$${formatCOP(total)} COP`;
  }
};

function formatCOP(num) {
  return new Intl.NumberFormat('es-CO').format(num);
}

function onShippingSelectChange(selectElement) {
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const price = parseInt(selectedOption.getAttribute('data-price') || '0', 10);
  const name = selectedOption.text;
  cart.setShipping(price, name);
  retroSound.playPop();
}

function openCartModal() {
  const modal = document.getElementById('cartModal');
  const cartView = document.getElementById('cartFormView');
  const successView = document.getElementById('cartSuccessView');
  
  if (cartView) cartView.style.display = 'block';
  if (successView) successView.style.display = 'none';

  // Sincronizar de inmediato el cobro de envío según la selección
  const shippingSelect = document.getElementById('checkoutShippingZone');
  if (shippingSelect) {
    onShippingSelectChange(shippingSelect);
  }

  if (modal) {
    modal.classList.add('active');
    retroSound.playPop();
  }
}

function closeCartModal() {
  const modal = document.getElementById('cartModal');
  if (modal) modal.classList.remove('active');
}

// ==========================================
// REGISTRO DE PEDIDOS Y ALMACENAMIENTO PERMANENTE
// Los datos se guardan en el sistema ANTES de abrir WhatsApp
// para asegurar que NINGUNA dirección se pierda jamás.
// ==========================================
let currentActiveOrder = null;

async function processOrderCheckout() {
  if (cart.items.length === 0) {
    showToast('⚠️ Tu carrito está vacío. Agrega algún producto primero.');
    return;
  }

  const name = document.getElementById('checkoutName').value.trim();
  const phone = document.getElementById('checkoutPhone').value.trim();
  const city = document.getElementById('checkoutCity').value.trim();
  const neighborhood = document.getElementById('checkoutNeighborhood').value.trim();
  const address = document.getElementById('checkoutAddress').value.trim();
  const notes = document.getElementById('checkoutNotes').value.trim();
  const shippingSelect = document.getElementById('checkoutShippingZone');

  // Validaciones indispensables
  if (!name || !phone || !city || !address) {
    showToast('⚠️ Por favor completa tu Nombre, Celular, Ciudad y Dirección exacta de entrega.');
    return;
  }

  const shippingZoneText = shippingSelect ? shippingSelect.options[shippingSelect.selectedIndex].text : cart.selectedShippingName;
  const shippingCost = cart.selectedShippingPrice;

  // Generar ID único de pedido (Ej: #PRINCESA-8421)
  const orderCode = `#PRINCESA-${Math.floor(1000 + Math.random() * 9000)}`;
  const orderDate = new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' });

  // Estructura completa y formal del pedido
  const orderData = {
    code: orderCode,
    date: orderDate,
    customer: {
      name,
      phone,
      city,
      neighborhood: neighborhood || 'No especificado',
      address,
      notes: notes || 'Ninguna'
    },
    shipping: {
      zone: shippingZoneText,
      cost: shippingCost,
      origin: CONFIG.originAddress
    },
    items: [...cart.items],
    subtotal: cart.getSubtotal(),
    total: cart.getTotal(),
    status: 'Pendiente Comprobante'
  };

  // 1. Enviar a Google Sheets (si está configurada la URL)
  sendOrderToGoogleSheets(orderData);

  // 2. Guardar en memoria activa para comprobante y WhatsApp
  currentActiveOrder = orderData;
  saveLocalCustomerOrder(orderData);

  // 3. Mostrar pantalla de éxito con resumen y pasos de pago
  renderOrderSuccessScreen(orderData);
  retroSound.playCoin();
}

// Envío seguro a Google Sheets mediante Webhook (sin CORS preflight)
async function sendOrderToGoogleSheets(orderData) {
  if (!CONFIG.cloudWebhookUrl || CONFIG.cloudWebhookUrl.trim() === '') {
    console.log('Google Sheets no configurado aún en CONFIG.cloudWebhookUrl');
    return;
  }

  try {
    showToast('☁️ Registrando pedido en tu Google Sheets...');
    await fetch(CONFIG.cloudWebhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(orderData)
    });
    console.log('Pedido enviado a Google Sheets exitosamente');
  } catch (err) {
    console.warn('Nota sobre sincronización con Google Sheets:', err);
  }
}

function renderOrderSuccessScreen(order) {
  const formView = document.getElementById('cartFormView');
  const successView = document.getElementById('cartSuccessView');

  if (formView) formView.style.display = 'none';
  if (successView) {
    successView.style.display = 'block';
    
    document.getElementById('successOrderCode').textContent = order.code;
    document.getElementById('successOrderTotal').textContent = `$${formatCOP(order.total)} COP`;
    document.getElementById('successClientName').textContent = order.customer.name;
    document.getElementById('successClientAddress').textContent = `${order.customer.address} (${order.customer.neighborhood}), ${order.customer.city}`;
    document.getElementById('successShippingZone').textContent = `${order.shipping.zone}`;
  }
}

// Abrir WhatsApp con el pedido 100% redactado (Sara solo recibe el comprobante + todos los datos juntos)
function sendOrderProofToWhatsApp() {
  if (!currentActiveOrder) return;

  const order = currentActiveOrder;
  let msg = `🐱 *¡HOLA SARA! PEDIDO REGISTRADO: ${order.code}* 🐾💖\n\n`;
  msg += `📸 *Te adjunto por aquí el pantallazo del pago por Nequi.*\n\n`;
  msg += `📋 *DATOS DE ENTREGA REGISTRADOS Y GUARDADOS:*\n`;
  msg += `• *Código de Pedido:* ${order.code}\n`;
  msg += `• *Nombre:* ${order.customer.name}\n`;
  msg += `• *Celular/WhatsApp:* ${order.customer.phone}\n`;
  msg += `• *Dirección:* ${order.customer.address}\n`;
  msg += `• *Barrio/Sector:* ${order.customer.neighborhood}\n`;
  msg += `• *Ciudad:* ${order.customer.city}\n`;
  msg += `• *Método de Envío:* ${order.shipping.zone} ($${formatCOP(order.shipping.cost)})\n`;
  if (order.customer.notes && order.customer.notes !== 'Ninguna') {
    msg += `• *Notas:* ${order.customer.notes}\n`;
  }

  msg += `\n🛍️ *PRODUCTOS DEL PEDIDO:*\n`;
  order.items.forEach(item => {
    msg += `• ${item.qty}x ${item.name} ${item.variant ? `(${item.variant})` : ''} - $${formatCOP(item.price * item.qty)}\n`;
  });

  msg += `\n💵 *Subtotal productos:* $${formatCOP(order.subtotal)} COP\n`;
  msg += `🛵 *Costo de entrega:* $${formatCOP(order.shipping.cost)} COP\n`;
  msg += `💰 *TOTAL TRANSFERIDO POR NEQUI:* $${formatCOP(order.total)} COP\n`;
  msg += `\n✨ Todos los datos ya quedaron guardados en tu sistema. ¡Mucho amor para la recuperación de Princesa! 🐾💕`;

  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');

  cart.clear();
}

// Descargar comprobante digital del pedido en archivo de texto
function downloadOrderReceipt(order = currentActiveOrder) {
  if (!order) return;
  
  let text = `====================================================\n`;
  text += `   COMPROBANTE DE PEDIDO SOLIDARIO - CIRUGÍA PRINCESA\n`;
  text += `====================================================\n\n`;
  text += `CÓDIGO DE PEDIDO: ${order.code}\n`;
  text += `FECHA: ${order.date}\n`;
  text += `ESTADO: ${order.status}\n\n`;
  text += `DATOS DEL CLIENTE:\n`;
  text += `- Nombre: ${order.customer.name}\n`;
  text += `- Teléfono: ${order.customer.phone}\n`;
  text += `- Dirección: ${order.customer.address}\n`;
  text += `- Barrio: ${order.customer.neighborhood}\n`;
  text += `- Ciudad: ${order.customer.city}\n`;
  text += `- Notas: ${order.customer.notes}\n\n`;
  text += `DESPACHO DESDE: ${order.shipping.origin}\n`;
  text += `MÉTODO / ZONA: ${order.shipping.zone}\n`;
  text += `COSTO DE ENVÍO: $${formatCOP(order.shipping.cost)} COP\n\n`;
  text += `PRODUCTOS:\n`;
  order.items.forEach(i => {
    text += `• ${i.qty}x ${i.name} ${i.variant ? `(${i.variant})` : ''} - $${formatCOP(i.price * i.qty)} COP\n`;
  });
  text += `\nSUBTOTAL: $${formatCOP(order.subtotal)} COP\n`;
  text += `TOTAL FINAL: $${formatCOP(order.total)} COP\n\n`;
  text += `DATOS DE TRANSFERENCIA NEQUI:\n`;
  text += `Número Nequi: ${CONFIG.nequiNumber} (Sara)\n`;
  text += `====================================================\n`;

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `Recibo_${order.code.replace('#', '')}.txt`;
  link.click();
  showToast('📄 Comprobante descargado en tu dispositivo.');
}

// Guardar copia local en el navegador del cliente para que pueda recuperar su recibo
function saveLocalCustomerOrder(order) {
  try {
    let orders = getSavedOrders();
    orders.unshift(order);
    localStorage.setItem('princesa_registered_orders', JSON.stringify(orders.slice(0, 10)));
  } catch (e) {
    console.warn('Almacenamiento local no disponible:', e);
  }
}

function getSavedOrders() {
  try {
    const raw = localStorage.getItem('princesa_registered_orders');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

// WhatsApp Directo para Donación Libre Nequi
function sendDonationProofWhatsApp() {
  const msg = `🐱 *¡Hola Sara! Acabo de hacer una donación voluntaria a Nequi para la cirugía de Princesa* 🐾💖\n\nAdjunto por aquí mi comprobante. ¡Espero de corazón que todo salga excelente en su operación en la Clínica UdeA!`;
  window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ==========================================
// CONTROL DE SUB-PESTAÑAS CLÍNICAS UdeA
// ==========================================
function switchClinicSubtab(tabId, btnElement) {
  const panes = document.querySelectorAll('.clinic-subtab-pane');
  panes.forEach(pane => pane.classList.remove('active'));

  const buttons = document.querySelectorAll('.clinic-subtab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  const targetPane = document.getElementById(tabId);
  if (targetPane) targetPane.classList.add('active');

  if (btnElement) btnElement.classList.add('active');
  retroSound.playPop();
}

// ==========================================
// LIGHTBOX PARA FACTURAS & DIAGNÓSTICO UdeA
// ==========================================
function openDocLightbox(src, title, caption) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const titleEl = document.getElementById('lightboxTitle');
  const captionEl = document.getElementById('lightboxCaption');

  if (modal && img) {
    img.src = src;
    if (titleEl) titleEl.textContent = title;
    if (captionEl) captionEl.textContent = caption;
    modal.classList.add('active');
    retroSound.playPop();
  }
}

function closeDocLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (modal) modal.classList.remove('active');
}

// ==========================================
// MURO DE APOYO / GUESTBOOK
// ==========================================
const initialGuestbookMessages = [
  {
    name: "Valentina M.",
    sticker: "💖",
    msg: "¡Fuerza Princesa hermosa! Compré una camiseta y el calendario. Vas a salir súper sana de esa cirugía.",
    date: "28 Oct 2026"
  },
  {
    name: "Camilo & Michi Luna",
    sticker: "🐾",
    msg: "Te mandamos un súper aporte por Nequi. Los michis negros son los seres más mágicos del universo 🪄",
    date: "27 Oct 2026"
  },
  {
    name: "Dra. Sofía (Agrarias UdeA)",
    sticker: "🩺",
    msg: "El equipo médico del Hospital Veterinario UdeA es excelente, está en las mejores manos. ¡Ánimo Sara!",
    date: "26 Oct 2026"
  },
  {
    name: "Mariana R.",
    sticker: "🧁",
    msg: "Los brownies están deliciosos y el diseño de la gatita quedó precioso. ¡Mucho amor para Princesa!",
    date: "25 Oct 2026"
  }
];

function initGuestbook() {
  let saved = localStorage.getItem('princesa_guestbook');
  let messages = saved ? JSON.parse(saved) : initialGuestbookMessages;
  renderGuestbook(messages);

  const form = document.getElementById('guestbookForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('gbName').value.trim();
      const sticker = document.getElementById('gbSticker').value;
      const msg = document.getElementById('gbMsg').value.trim();

      if (!name || !msg) {
        showToast('Por favor escribe tu nombre y mensaje 💕');
        return;
      }

      messages.unshift({ name, sticker, msg, date: "Hoy" });
      localStorage.setItem('princesa_guestbook', JSON.stringify(messages));
      renderGuestbook(messages);

      form.reset();
      showToast('💌 ¡Mensaje publicado en el muro de Princesa! Gracias');
    });
  }
}

function renderGuestbook(messages) {
  const wall = document.getElementById('guestbookWall');
  if (!wall) return;

  wall.innerHTML = messages.map(item => `
    <div class="guestbook-card">
      <div class="guestbook-header">
        <span>${item.sticker} ${item.name}</span>
        <span class="guestbook-date">${item.date}</span>
      </div>
      <div class="guestbook-message">${item.msg}</div>
    </div>
  `).join('');
}

// ==========================================
// TOOLTIPS INTERACTIVOS: DATO CURIOSO FELINO (BOJACK)
// ==========================================
function initCatCuriosityTooltips() {
  document.querySelectorAll('.has-cat-curiosity').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.cat-tooltip-close')) {
        e.stopPropagation();
        card.classList.remove('active-tip');
        return;
      }
      // Alternar en pantallas táctiles (móviles)
      const wasActive = card.classList.contains('active-tip');
      document.querySelectorAll('.has-cat-curiosity').forEach(c => c.classList.remove('active-tip'));
      if (!wasActive) {
        card.classList.add('active-tip');
      }
    });
  });

  // Cerrar al tocar fuera
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-cat-curiosity')) {
      document.querySelectorAll('.has-cat-curiosity').forEach(c => c.classList.remove('active-tip'));
    }
  });
}

// ==========================================
// INICIALIZACIÓN GLOBAL
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initVisitorCounter();
  initSparkleCursor();
  initGuestbook();
  initCatCuriosityTooltips();
  cart.load();

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartModal();
      closeDocLightbox();
    }
  });

  const modals = document.querySelectorAll('.modal-overlay');
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });
});
