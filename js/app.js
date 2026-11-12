/**
 * PRINCESA'S RESCUE QUEST - APP JAVASCRIPT
 * Sistema Completo: Carrito, Calculadora de Envíos desde Sector UdeA / Chagualo,
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
  goalAmount: 2006884,
  currentCollected: 700000,

  // Sector de origen para despachos DiDi / Uber Flash:
  originAddress: "Sector Chagualo / UdeA, Medellín",

  // URL DE TU APLICACIÓN WEB DE GOOGLE APPS SCRIPT:
  // Al crear tu Google Apps Script, pega aquí la URL generada:
  // Ej: "https://script.google.com/macros/s/AKfycbx.../exec"
  // ¡Todos los pedidos llegarán a tu Google Sheet privado al instante!
  cloudWebhookUrl: "https://script.google.com/macros/s/AKfycbzKBbcuBwc3rmBd282iaSGcbPAPZgvz6uYQ2YjV9XkwedN--sWQ-PX3t2RacuYuvRY/exec"
};

// ==========================================
// TABLA DE TARIFAS DE ENTREGA (DiDi / Uber Flash)
// ==========================================
const SHIPPING_ZONES = [
  {
    id: "pickup-unal",
    name: "📍 Universidad Nacional (UNAL): Sede Volador / Minas",
    price: 0,
    desc: "Gratis • Entrega en mano en campus UNAL"
  },
  {
    id: "pickup-udea",
    name: "📍 Universidad de Antioquia (UdeA): Porterías de la Sede Principal",
    price: 0,
    desc: "Gratis • Entrega en las porterías de la Sede Principal UdeA"
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
    id: "didi-cercana",
    name: "🛵 Zona 1 ($6.500 COP): Centro / Chagualo / Prado / Boston / Aranjuez / Robledo bajo",
    price: 6500,
    desc: "DiDi / Uber Flash Moto (2 a 4 km desde Sector UdeA)"
  },
  {
    id: "didi-media",
    name: "🛵 Zona 2 ($9.500 COP): Laureles / Estadio / Belén / Floresta / Conquistadores",
    price: 9500,
    desc: "DiDi / Uber Flash Moto (5 a 8 km desde Sector UdeA)"
  },
  {
    id: "didi-sur-norte",
    name: "🛵 Zona 3 ($13.500 COP): El Poblado / Envigado / Bello",
    price: 13500,
    desc: "DiDi / Uber Flash Moto (8 a 13 km desde Sector UdeA)"
  },
  {
    id: "didi-extremos",
    name: "🛵 Zona 4 ($17.500 COP): Sabaneta / Itagüí sur / Caldas / Copacabana",
    price: 17500,
    desc: "DiDi / Uber Flash Moto (14 a 22 km desde Sector UdeA)"
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
    this.purrBuffer = null;
    this.activePurrSource = null;
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
      gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  playChime() {
    if (!this.enabled) return;
    try {
      this.init();
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0.18, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.008, now + i * 0.06 + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.23);
      });
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
      gain.gain.setValueAtTime(0.16, this.ctx.currentTime);
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
      // Reproducir directamente la grabación real y limpia de ronroneo ("brrrrrr")
      if (!this.purrAudio) {
        this.purrAudio = new Audio('assets/audio/purr.wav?v=6');
      }
      this.purrAudio.currentTime = 0;
      this.purrAudio.volume = 1.0;
      const playPromise = this.purrAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } catch (e) {}
  }
}

const retroSound = new RetroAudio();

// ==========================================
// TOAST DE NOTIFICACIÓN RETRO
// ==========================================
function showToast(message, playCoinSound = true) {
  let toast = document.getElementById('retroToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'retroToast';
    toast.className = 'retro-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = message;
  toast.classList.add('show');
  if (playCoinSound) {
    retroSound.playCoin();
  }

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
  // Limpiamos los valores antiguos de prueba (4288 y 162)
  localStorage.removeItem('princesa_visit_count');
  localStorage.removeItem('princesa_purr_count');

  let visits = parseInt(localStorage.getItem('princesa_visit_count_v2') || '0', 10);
  visits += 1;
  localStorage.setItem('princesa_visit_count_v2', visits);
  updateOdometerDisplay(visits);

  const purrs = parseInt(localStorage.getItem('princesa_purr_count_v2') || '0', 10);
  updatePurrCountDisplay(purrs);
}

function updatePurrCountDisplay(count) {
  const heroCountEl = document.getElementById('heroPurrCountVal');
  const bottomCountEl = document.getElementById('bottomPurrCountVal');
  if (heroCountEl) heroCountEl.textContent = count;
  if (bottomCountEl) bottomCountEl.textContent = count;
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
  let count = parseInt(localStorage.getItem('princesa_purr_count_v2') || '0', 10);
  count += 1;
  localStorage.setItem('princesa_purr_count_v2', count);

  updatePurrCountDisplay(count);
  showToast(`🐾 Prrrrr~ ¡Princesa ronronea feliz con tus mimos! (${count}) 💕`, false);
}

// ==========================================
// ÁLBUM MISTERIOSO DE PRINCESA (MOSTRAR / OCULTAR)
// ==========================================
function toggleMysteryGallery() {
  const gate = document.getElementById('mysteryAlbumGate');
  const content = document.getElementById('mysteryAlbumContent');
  if (!gate || !content) return;

  const isHidden = content.style.display === 'none' || content.style.display === '';
  if (isHidden) {
    gate.style.display = 'none';
    content.style.display = 'block';
    retroSound.playChime();
  } else {
    content.style.display = 'none';
    gate.style.display = 'flex';
    retroSound.playPop();
  }
}

function openMysteryGallery() {
  const gate = document.getElementById('mysteryAlbumGate');
  const content = document.getElementById('mysteryAlbumContent');
  if (gate && content && (content.style.display === 'none' || content.style.display === '')) {
    gate.style.display = 'none';
    content.style.display = 'block';
    retroSound.playChime();
  }
}

function initFundThermometer() {
  const goal = CONFIG.goalAmount || 2006884;
  const collected = CONFIG.currentCollected || 0;
  const missing = Math.max(0, goal - collected);
  const pct = Math.min(100, Math.round((collected / goal) * 100));

  const badge = document.getElementById('fundPercentBadge');
  const colVal = document.getElementById('fundCollectedVal');
  const goalVal = document.getElementById('fundGoalVal');
  const misVal = document.getElementById('fundMissingVal');
  const fill = document.getElementById('verticalThermoFill');
  const pctTxt = document.getElementById('verticalThermoPct');

  if (badge) badge.textContent = `● ${pct}% RECAUDADO ($${formatCOP(collected)} COP)`;
  if (colVal) colVal.textContent = `$${formatCOP(collected)} COP`;
  if (goalVal) goalVal.textContent = `$${formatCOP(goal)}`;
  if (misVal) misVal.textContent = `$${formatCOP(missing)}`;
  if (fill) fill.style.height = `${pct}%`;
  if (pctTxt) pctTxt.textContent = `${pct}%`;
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
  selectedShippingName: "📍 Universidad de Antioquia (UdeA): Porterías de la Sede Principal - GRATIS",

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
    localStorage.setItem('princesa_cart', JSON.stringify(this.items));
  },

  load() {
    try {
      const data = localStorage.getItem('princesa_cart') || sessionStorage.getItem('princesa_cart');
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
    if (shippingDisplay) {
      if (this.selectedShippingName && this.selectedShippingName.includes('Otras zonas')) {
        shippingDisplay.textContent = 'Lo que cueste el domicilio';
      } else if (this.selectedShippingPrice === 0) {
        shippingDisplay.textContent = 'GRATIS';
      } else {
        shippingDisplay.textContent = `~$${formatCOP(this.selectedShippingPrice)} COP (aprox.)`;
      }
    }
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
// MURO DE APOYO / GUESTBOOK COMUNITARIO
// ==========================================
const initialGuestbookMessages = [
  {
    name: "Caro & Misi",
    sticker: "🐱",
    msg: "¡Princesa hermosa! Toda la manada te manda mucho amor y ronroneos. ¡Esa cirugía va a salir perfecta! 💖",
    date: "10 nov 2026"
  },
  {
    name: "Valentina R.",
    sticker: "🩺",
    msg: "Mucho ánimo Sara, eres una excelente mamá gatuna. ¡Pronto Princesa estará como nueva y sin ningún dolor! 🐾",
    date: "11 nov 2026"
  },
  {
    name: "Juan David & Familia",
    sticker: "🧁",
    msg: "Apoyando con postrecitos deliciosos. ¡Toda la mejor energía del mundo para su pronta recuperación! ⭐",
    date: "11 nov 2026"
  }
];

let guestbookMessages = [];

async function fetchCommunityMessages() {
  if (!CONFIG.cloudWebhookUrl || CONFIG.cloudWebhookUrl.trim() === '') {
    return;
  }

  const statusEl = document.getElementById('guestbookStatus');
  if (statusEl) {
    statusEl.innerHTML = '<span>🔄 Conectando con el muro comunitario...</span>';
  }

  try {
    const response = await fetch(CONFIG.cloudWebhookUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.status === 'success' && Array.isArray(data.messages)) {
        if (data.messages.length > 0) {
          guestbookMessages = data.messages;
          localStorage.setItem('princesa_guestbook_cloud', JSON.stringify(data.messages));
          renderGuestbook(guestbookMessages);
          if (statusEl) {
            statusEl.innerHTML = `<span>● Muro comunitario en vivo • ${guestbookMessages.length} mensajitos 💌</span>`;
          }
          return;
        }
      }
    }
  } catch (err) {
    console.warn('Nota: Usando mensajes locales/cacheados para el muro:', err);
  }

  if (statusEl) {
    statusEl.innerHTML = `<span>● Muro comunitario en vivo • ${guestbookMessages.length} mensajitos 💌</span>`;
  }
}

function initGuestbook() {
  // 1. Cargar caché previo o mensajes de inicio
  const cached = localStorage.getItem('princesa_guestbook_cloud') || localStorage.getItem('princesa_guestbook_v2');
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      guestbookMessages = (Array.isArray(parsed) && parsed.length > 0) ? parsed : initialGuestbookMessages;
    } catch (e) {
      guestbookMessages = initialGuestbookMessages;
    }
  } else {
    guestbookMessages = initialGuestbookMessages;
  }

  renderGuestbook(guestbookMessages);

  // 2. Sincronizar en vivo con Google Sheets en la nube
  fetchCommunityMessages();

  // 3. Manejo de nuevos mensajes
  const form = document.getElementById('guestbookForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('gbName');
      const stickerInput = document.getElementById('gbSticker');
      const msgInput = document.getElementById('gbMsg');
      const submitBtn = form.querySelector('button[type="submit"]');

      const name = nameInput.value.trim();
      const sticker = stickerInput.value;
      const msg = msgInput.value.trim();

      if (!name || !msg) {
        showToast('Por favor escribe tu nombre y mensaje 💕');
        return;
      }

      const fechaActual = new Date().toLocaleDateString('es-CO', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      const newEntry = { name, sticker, msg, date: fechaActual };

      // Actualización optimista inmediata en pantalla
      guestbookMessages.unshift(newEntry);
      localStorage.setItem('princesa_guestbook_cloud', JSON.stringify(guestbookMessages));
      renderGuestbook(guestbookMessages);

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>⏳ Publicando en el muro...</span>';
      }

      retroSound.playChime();
      showToast('💌 ¡Mensaje publicado para toda la comunidad! Muchas gracias 💕');
      form.reset();

      // Envío en segundo plano al webhook comunitario (Google Sheets)
      if (CONFIG.cloudWebhookUrl && CONFIG.cloudWebhookUrl.trim() !== '') {
        try {
          await fetch(CONFIG.cloudWebhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'guestbook',
              name: name,
              sticker: sticker,
              msg: msg,
              date: fechaActual
            })
          });
        } catch (postErr) {
          console.warn('Error al enviar mensaje a Google Sheets:', postErr);
        }
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>💌 Firmar en el Muro</span>';
      }

      const statusEl = document.getElementById('guestbookStatus');
      if (statusEl) {
        statusEl.innerHTML = `<span>● Muro comunitario en vivo • ${guestbookMessages.length} mensajitos 💌</span>`;
      }
    });
  }
}

function renderGuestbook(messages) {
  const wall = document.getElementById('guestbookWall');
  if (!wall) return;

  if (!messages || messages.length === 0) {
    wall.innerHTML = `
      <div class="guestbook-empty" style="grid-column: 1 / -1; text-align: center; padding: 24px 16px; background: #fff9fc; border: 2px dashed #f3a6cf; border-radius: 10px; color: #7b4f6d; font-size: 0.92rem;">
        🐾 Aún no hay mensajes firmados. ¡Sé la primera persona en dejarle un mensajito de aliento a Princesa! 💌
      </div>
    `;
    return;
  }

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
// CATÁLOGO INTERACTIVO DE POSTRES CREMOSOS Y CHEESECAKES
// ==========================================
const DESSERT_CATALOG_DATA = {
  cremoso: {
    "Brownie": { slug: "cremoso-brownie", desc: "Postre a base de 3 leches y galleta con topping de bizcocho de chocolate y arequipe. ¡Sin conservantes!" },
    "Milo": { slug: "cremoso-milo", desc: "Postre a base de 3 leches y galleta con abundante topping de Milo." },
    "Quipitos": { slug: "cremoso-quipitos", desc: "Postre a base de 3 leches con galletas y divertido topping explosivo de Quipitos Pops." },
    "Arequipe y Queso": { slug: "cremoso-arequipe-queso", desc: "Postre a base de 3 leches y galleta con topping de queso rallado y arequipe original." },
    "Oreo": { slug: "cremoso-oreo", desc: "Postre a base de 3 leches y galleta con topping de galleta Oreo triturada." },
    "Maracuyá": { slug: "cremoso-maracuya", desc: "Postre a base de 3 leches y galleta con topping de mermelada de maracuyá 100% natural." },
    "Fresa": { slug: "cremoso-fresa", desc: "Postre a base de 3 leches y galleta con topping de mermelada de fresa 100% natural." },
    "Mora": { slug: "cremoso-mora", desc: "Postre a base de 3 leches y galleta con topping de mermelada de mora 100% natural." },
    "Durazno": { slug: "cremoso-durazno", desc: "Postre a base de 3 leches y galleta con topping de duraznos en almíbar." },
    "Café": { slug: "cremoso-cafe", desc: "Postre a base de 3 leches con galleta, toque de café y topping de chocolate rallado." },
    "Tres Leches": { slug: "cremoso-tres-leches", desc: "Postre de bizcocho humedecido en 3 leches con topping de chantilly y chocolatina rallada." },
    "Leche Klim": { slug: "cremoso-leche-klim", desc: "Postre a base de 3 leches y galleta con generoso topping de Leche Klim." },
    "Coco": { slug: "cremoso-coco", desc: "Postre a base de 3 leches, coco deshidratado y galleta con topping de uvas pasas." }
  },
  cheesecake: {
    "Frutos Rojos": { slug: "cheesecake-frutos-rojos", desc: "Cheesecake de queso crema, crema de leche y lechera con base de galleta con mantequilla y topping de frutos rojos." },
    "Crema de Baileys": { slug: "cheesecake-baileys", desc: "Cheesecake de queso crema, crema de leche, lechera, whisky y café con base de galleta y chocolate rallado." },
    "Queso y Bocadillo": { slug: "cheesecake-queso-bocadillo", desc: "Cheesecake de queso crema, crema de leche y lechera con base de galleta y topping de queso rallado y bocadillo." },
    "Tiramisú de Milo": { slug: "cheesecake-tiramisu-milo", desc: "Cheesecake de queso crema, crema de leche, lechera y café con base de bizcocho en café y topping de Milo." },
    "Arequipe": { slug: "cheesecake-arequipe", desc: "Cheesecake de queso crema, crema de leche y lechera con base de galleta con mantequilla y topping de arequipe." },
    "Limón": { slug: "cheesecake-limon", desc: "Cheesecake de queso crema, crema de leche, lechera y zumo de limón con base de galleta y topping de galleta Sultana." }
  },
  zero: {
    "Fresa con Chocolate Zero": { slug: "zero-fresa-chocolate", desc: "Postre Zero Azúcar endulzado con Stevia y galleta integral con fresas picadas y chocolate." },
    "Frutos Secos Zero": { slug: "zero-frutos-secos", desc: "Postre Zero Azúcar endulzado con Stevia y galleta integral con mezcla de frutos secos." },
    "Queso con Arequipe Zero": { slug: "zero-queso-arequipe", desc: "Postre Zero Azúcar con queso rallado y arequipe artesanal endulzado con Stevia." },
    "Fresa Picada Zero": { slug: "zero-fresa", desc: "Postre Zero Azúcar endulzado con Stevia y galleta integral con fresas frescas picadas." },
    "Durazno en Trozos Zero": { slug: "zero-durazno", desc: "Postre Zero Azúcar endulzado con Stevia y galleta integral con durazno en trozos." }
  },
  familiar: {
    "Milo": { slug: "familiar-milo", desc: "Bandeja de 9 porciones (incluye caja) de 3 leches con Milo. Combinable con Quipitos, Oreo, Brownie o Queso." },
    "Brownie": { slug: "familiar-brownie", desc: "Bandeja de 9 porciones (incluye caja) de Brownie y Arequipe. Combinable con Queso, Durazno, Maracuyá, Fresa, Mora o Klim." },
    "Arequipe y Queso": { slug: "familiar-arequipe-queso", desc: "Bandeja de 9 porciones (incluye caja) de Queso y Arequipe. Combinable con cualquier sabor tradicional." },
    "Quipitos": { slug: "familiar-quipitos", desc: "Bandeja de 9 porciones (incluye caja) con Quipitos Pops. Combinable con Queso Arequipe o Brownie Arequipe." },
    "Oreo": { slug: "familiar-oreo", desc: "Bandeja de 9 porciones (incluye caja) de Oreo triturada. Combinable con Queso, Brownie, Quipitos, Milo o Klim." },
    "Maracuyá": { slug: "familiar-maracuya", desc: "Bandeja de 9 porciones (incluye caja) de Maracuyá 100% natural. Combinable con Queso Arequipe o Brownie." },
    "Fresa": { slug: "familiar-fresa", desc: "Bandeja de 9 porciones (incluye caja) de Fresa 100% natural. Combinable con Durazno, Queso, Brownie u Oreo." },
    "Durazno": { slug: "familiar-durazno", desc: "Bandeja de 9 porciones (incluye caja) de Duraznos en almíbar. Combinable con Fresa, Queso o Brownie." },
    "Café": { slug: "familiar-cafe", desc: "Bandeja de 9 porciones (incluye caja) de Café y chocolate. Combinable con Queso, Brownie, Quipitos, Milo o Klim." },
    "Tres Leches": { slug: "familiar-tres-leches", desc: "Bandeja de 9 porciones (incluye caja) de bizcocho Tres Leches con chantilly y chocolatina rallada." },
    "Coco": { slug: "familiar-coco", desc: "Bandeja de 9 porciones (incluye caja) de 3 leches, coco deshidratado y uvas pasas." },
    "Frutos Secos Zero": { slug: "familiar-zero-frutos-secos", desc: "Bandeja Familiar 9 porciones Zero Azúcar (endulzado con Stevia y galleta integral) con frutos secos." },
    "Fresa Zero": { slug: "familiar-zero-fresa", desc: "Bandeja Familiar 9 porciones Zero Azúcar (endulzado con Stevia y galleta integral) con fresas picadas." },
    "Durazno Zero": { slug: "familiar-zero-durazno", desc: "Bandeja Familiar 9 porciones Zero Azúcar (endulzado con Stevia y galleta integral) con durazno en trozos." }
  },
  "cheesecake-fam": {
    "Crema de Baileys": { slug: "cheesecake-fam-baileys", desc: "Cheesecake Familiar (8 a 16 porciones, incluye caja) de queso crema, whisky Baileys, café y chocolate." },
    "Frutos Rojos": { slug: "cheesecake-frutos-rojos", desc: "Cheesecake Familiar (8 a 16 porciones, incluye caja) con reducción artesanal de frutos rojos." },
    "Queso y Bocadillo": { slug: "cheesecake-fam-queso-bocadillo", desc: "Cheesecake Familiar (8 a 16 porciones, incluye caja) con topping de queso rallado y bocadillo." },
    "Tiramisú de Milo": { slug: "cheesecake-fam-tiramisu-milo", desc: "Cheesecake Familiar (8 a 16 porciones, incluye caja) con base de bizcocho en café y topping de Milo." },
    "Arequipe": { slug: "cheesecake-fam-arequipe", desc: "Cheesecake Familiar (8 a 16 porciones, incluye caja) con cubierta generosa de arequipe." },
    "Limón": { slug: "cheesecake-fam-limon", desc: "Cheesecake Familiar (8 a 16 porciones, incluye caja) con zumo de limón natural y galleta Sultana." }
  },
  mega: {
    "Brownie": { slug: "mega-brownie", desc: "Megafamiliar de 15 porciones (incluye caja) con bizcocho de chocolate y arequipe. ¡Combinable mitad y mitad!" },
    "Milo": { slug: "mega-milo", desc: "Megafamiliar de 15 porciones (incluye caja) de 3 leches con Milo (el Milo llega aparte para espolvorear fresco)." },
    "Arequipe y Queso": { slug: "mega-arequipe-queso", desc: "Megafamiliar de 15 porciones (incluye caja) con queso rallado y arequipe. ¡Combinable con tu sabor favorito!" },
    "Quipitos": { slug: "mega-quipitos", desc: "Megafamiliar de 15 porciones (incluye caja) con Quipitos Pops. Combinable con Queso Arequipe o Brownie." },
    "Oreo": { slug: "mega-oreo", desc: "Megafamiliar de 15 porciones (incluye caja) con galleta Oreo triturada. ¡Combinable mitad y mitad!" },
    "Maracuyá": { slug: "mega-maracuya", desc: "Megafamiliar de 15 porciones (incluye caja) con mermelada de maracuyá 100% natural." },
    "Fresa": { slug: "mega-fresa", desc: "Megafamiliar de 15 porciones (incluye caja) con mermelada de fresa 100% natural." },
    "Mora": { slug: "mega-mora", desc: "Megafamiliar de 15 porciones (incluye caja) con mermelada de mora 100% natural." },
    "Durazno": { slug: "mega-durazno", desc: "Megafamiliar de 15 porciones (incluye caja) con duraznos en almíbar." },
    "Coco": { slug: "mega-coco", desc: "Megafamiliar de 15 porciones (incluye caja) con coco deshidratado y uvas pasas." },
    "Fresa Zero": { slug: "mega-zero-fresa", desc: "Megafamiliar de 15 porciones Zero Azúcar (Stevia y galleta integral) con fresas picadas." },
    "Durazno Zero": { slug: "mega-zero-durazno", desc: "Megafamiliar de 15 porciones Zero Azúcar (Stevia y galleta integral) con durazno en trozos." }
  }
};

function onDessertFlavorChange(categoryKey, flavorName) {
  const cat = DESSERT_CATALOG_DATA[categoryKey];
  if (!cat || !cat[flavorName]) return;
  const info = cat[flavorName];
  const imgEl = document.getElementById(`img-dessert-${categoryKey}`);
  const descEl = document.getElementById(`desc-dessert-${categoryKey}`);
  if (imgEl) {
    imgEl.src = `assets/img/postres/${info.slug}.jpg`;
    imgEl.alt = `${flavorName}`;
  }
  if (descEl) {
    descEl.textContent = info.desc;
  }
  retroSound.playPop();
}

function openDessertCardPreview(categoryKey) {
  const selectMap = {
    "cremoso": "opt-cremoso",
    "cheesecake": "opt-cheesecake",
    "zero": "opt-zero",
    "familiar": "opt-familiar-1",
    "cheesecake-fam": "opt-cheesecake-fam",
    "mega": "opt-mega-1"
  };
  const selectEl = document.getElementById(selectMap[categoryKey]);
  const flavorName = selectEl ? selectEl.value : "";
  const cat = DESSERT_CATALOG_DATA[categoryKey];
  if (cat && cat[flavorName]) {
    const info = cat[flavorName];
    openDocLightbox(`assets/img/postres/${info.slug}-card.jpg`, `${flavorName} — ${info.desc}`);
  }
}

function addCombinedDessertToCart(productId, productName, price, select1Id, select2Id) {
  const s1 = document.getElementById(select1Id);
  const s2 = document.getElementById(select2Id);
  const mainFlavor = s1 ? s1.value : "";
  const secondFlavor = s2 ? s2.value : "Un solo sabor";
  const variantLabel = (secondFlavor && secondFlavor !== "Un solo sabor")
    ? `${mainFlavor} + ${secondFlavor}`
    : `${mainFlavor} (Completo)`;
  cart.addItem(productId, productName, price, variantLabel);
}

// ==========================================
// TOOLTIPS INTERACTIVOS: DATO CURIOSO FELINO (BOJACK)
// Portalizado en document.body para no recortarse nunca con ningún div
// ==========================================
let curiosityPortal = null;
let activeCuriosityCard = null;
let curiosityHideTimer = null;

function ensureCuriosityPortal() {
  if (!curiosityPortal) {
    curiosityPortal = document.createElement('div');
    curiosityPortal.className = 'floating-curiosity-portal';
    document.body.appendChild(curiosityPortal);

    curiosityPortal.addEventListener('mouseenter', () => {
      clearTimeout(curiosityHideTimer);
    });
    curiosityPortal.addEventListener('mouseleave', () => {
      hideCuriosityPortal();
    });
    curiosityPortal.addEventListener('click', (e) => {
      if (e.target.closest('.cat-tooltip-close')) {
        hideCuriosityPortal(true);
      }
    });
  }
  return curiosityPortal;
}

function showCuriosityPortalForCard(card) {
  const inlineTip = card.querySelector('.cat-curiosity-tooltip');
  if (!inlineTip) return;
  clearTimeout(curiosityHideTimer);
  activeCuriosityCard = card;

  const portal = ensureCuriosityPortal();
  portal.innerHTML = inlineTip.innerHTML;
  portal.classList.add('visible');

  positionCuriosityPortal(card);
}

function positionCuriosityPortal(card) {
  if (!curiosityPortal || !card) return;
  const rect = card.getBoundingClientRect();
  const tipWidth = curiosityPortal.offsetWidth || 305;
  const tipHeight = curiosityPortal.offsetHeight || 160;

  let left = rect.left + (rect.width / 2) - (tipWidth / 2);
  left = Math.max(12, Math.min(left, window.innerWidth - tipWidth - 12));

  // Mostrar encima si cabe en la ventana; si no cabe arriba, mostrar debajo
  let top = rect.top - tipHeight - 10;
  if (top < 12) {
    top = Math.min(window.innerHeight - tipHeight - 12, rect.bottom + 10);
  }

  curiosityPortal.style.left = `${Math.round(left)}px`;
  curiosityPortal.style.top = `${Math.round(top)}px`;
}

function hideCuriosityPortal(immediate = false) {
  clearTimeout(curiosityHideTimer);
  const doHide = () => {
    if (curiosityPortal) curiosityPortal.classList.remove('visible');
    if (activeCuriosityCard) activeCuriosityCard.classList.remove('active-tip');
    activeCuriosityCard = null;
  };
  if (immediate) {
    doHide();
  } else {
    curiosityHideTimer = setTimeout(doHide, 120);
  }
}

function initCatCuriosityTooltips() {
  ensureCuriosityPortal();

  document.querySelectorAll('.has-cat-curiosity').forEach(card => {
    card.addEventListener('mouseenter', () => {
      showCuriosityPortalForCard(card);
    });
    card.addEventListener('mouseleave', () => {
      hideCuriosityPortal(false);
    });
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeCuriosityCard === card && curiosityPortal.classList.contains('visible')) {
        hideCuriosityPortal(true);
      } else {
        card.classList.add('active-tip');
        showCuriosityPortalForCard(card);
      }
    });
  });

  window.addEventListener('scroll', () => {
    if (activeCuriosityCard && curiosityPortal && curiosityPortal.classList.contains('visible')) {
      positionCuriosityPortal(activeCuriosityCard);
    }
  }, { passive: true });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-cat-curiosity') && !e.target.closest('.floating-curiosity-portal')) {
      hideCuriosityPortal(true);
    }
  });
}

// ==========================================
// MEJORAS DE UX PARA MÓVIL (ACORDEONES Y REDUCCIÓN DE CARGA VISUAL)
// ==========================================
function initMobileUX() {
  // 1. Botón desplegable para la escalera de hitos (25% a 100%) en móvil
  const milestonesList = document.querySelector('.vertical-milestones-list');
  if (milestonesList && !document.getElementById('btnToggleMobileMilestones')) {
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.id = 'btnToggleMobileMilestones';
    toggleBtn.className = 'btn-mobile-milestones-toggle';
    toggleBtn.innerHTML = '📊 Ver escalera de metas (25% a 100%) ▾';
    toggleBtn.addEventListener('click', () => {
      const expanded = milestonesList.classList.toggle('mobile-expanded');
      toggleBtn.innerHTML = expanded
        ? '📊 Ocultar escalera de metas ▴'
        : '📊 Ver escalera de metas (25% a 100%) ▾';
      retroSound.playPop();
    });
    milestonesList.appendChild(toggleBtn);
  }

  // 2. Permitir minimizar/expandir cualquier ventana tocando el botón "_" o la barra de título en móvil
  document.querySelectorAll('.retro-window').forEach(win => {
    if (win.id === 'inicio' || win.id === 'mysteryAlbumContent') return;
    const header = win.querySelector('.retro-window-header');
    const minBtn = win.querySelector('.retro-win-btn.min');

    const toggleWindow = () => {
      win.classList.toggle('window-collapsed');
      retroSound.playPop();
    };

    if (minBtn) {
      minBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWindow();
      });
    }

    if (header) {
      header.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !e.target.closest('.retro-win-btn')) {
          toggleWindow();
        }
      });
    }
  });

  // 3. Si el usuario toca un enlace de navegación rápida, asegurar que esa ventana se despliegue
  document.querySelectorAll('.retro-tab-link, .hero-cta-group a').forEach(link => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target && target.classList.contains('window-collapsed')) {
          target.classList.remove('window-collapsed');
        }
      }
    });
  });
}

// ==========================================
// INICIALIZACIÓN GLOBAL
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initFundThermometer();
  initVisitorCounter();
  initSparkleCursor();
  initGuestbook();
  initCatCuriosityTooltips();
  initMobileUX();
  cart.load();

  if (window.location.hash === '#galeria') {
    setTimeout(() => {
      openMysteryGallery();
      const gal = document.getElementById('galeria');
      if (gal) gal.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  }

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
