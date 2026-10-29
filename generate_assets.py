import os
from PIL import Image, ImageDraw, ImageFont

base_dir = "/home/sara/Documents/Proyectos/princesa-page/assets"

# Helper for creating SVG black cat illustrations
def create_black_cat_svg(path, caption="Michi", accessory="ribbon"):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffe4f2"/>
      <stop offset="100%" stop-color="#ffd1eb"/>
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#da70d6" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <!-- Background circle -->
  <circle cx="200" cy="200" r="185" fill="url(#bgGlow)" stroke="#ff94c2" stroke-width="6"/>
  <circle cx="200" cy="200" r="175" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="6 6"/>

  <!-- Sparkles -->
  <g fill="#ffd700">
    <path d="M 60 90 Q 70 90 70 80 Q 70 90 80 90 Q 70 90 70 100 Q 70 90 60 90 Z" />
    <path d="M 330 110 Q 340 110 340 100 Q 340 110 350 110 Q 340 110 340 120 Q 340 110 330 110 Z" />
    <path d="M 70 290 Q 80 290 80 280 Q 80 290 90 290 Q 80 290 80 300 Q 80 290 70 290 Z" />
    <path d="M 320 280 Q 330 280 330 270 Q 330 280 340 280 Q 330 280 330 290 Q 330 280 320 280 Z" />
  </g>

  <!-- Cat Group -->
  <g filter="url(#shadow)">
    <!-- Cat Ears -->
    <polygon points="120,180 150,70 185,160" fill="#1e1822" stroke="#ffb6c1" stroke-width="4"/>
    <polygon points="135,170 155,95 175,155" fill="#ff99bb"/>
    
    <polygon points="280,180 250,70 215,160" fill="#1e1822" stroke="#ffb6c1" stroke-width="4"/>
    <polygon points="265,170 245,95 225,155" fill="#ff99bb"/>

    <!-- Cat Body -->
    <ellipse cx="200" cy="290" rx="90" ry="75" fill="#1e1822"/>
    <!-- Cute pink paws -->
    <ellipse cx="160" cy="335" rx="28" ry="18" fill="#1e1822" stroke="#ff94c2" stroke-width="2"/>
    <circle cx="152" cy="335" r="5" fill="#ffb6c1"/>
    <circle cx="162" cy="333" r="5" fill="#ffb6c1"/>
    <circle cx="172" cy="336" r="4" fill="#ffb6c1"/>

    <ellipse cx="240" cy="335" rx="28" ry="18" fill="#1e1822" stroke="#ff94c2" stroke-width="2"/>
    <circle cx="230" cy="335" r="5" fill="#ffb6c1"/>
    <circle cx="240" cy="333" r="5" fill="#ffb6c1"/>
    <circle cx="250" cy="336" r="4" fill="#ffb6c1"/>

    <!-- Cat Head -->
    <ellipse cx="200" cy="190" rx="95" ry="85" fill="#1e1822"/>

    <!-- Cheek Fluffs -->
    <path d="M 105 195 Q 90 200 110 215 Q 95 225 120 235" fill="#1e1822"/>
    <path d="M 295 195 Q 310 200 290 215 Q 305 225 280 235" fill="#1e1822"/>

    <!-- Big Kawaii Eyes -->
    <ellipse cx="160" cy="180" rx="24" ry="28" fill="#ffea79"/>
    <ellipse cx="240" cy="180" rx="24" ry="28" fill="#ffea79"/>
    
    <!-- Pupils -->
    <ellipse cx="160" cy="180" rx="16" ry="24" fill="#16121a"/>
    <ellipse cx="240" cy="180" rx="16" ry="24" fill="#16121a"/>
    
    <!-- Big Eye Highlights -->
    <circle cx="152" cy="170" r="9" fill="#ffffff"/>
    <circle cx="168" cy="190" r="4" fill="#ffffff"/>
    <circle cx="232" cy="170" r="9" fill="#ffffff"/>
    <circle cx="248" cy="190" r="4" fill="#ffffff"/>

    <!-- Cute Pink Nose -->
    <polygon points="194,204 206,204 200,212" fill="#ff94c2"/>

    <!-- Mouth -->
    <path d="M 190 216 Q 200 222 200 214 Q 200 222 210 216" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>

    <!-- Whiskers -->
    <line x1="130" y1="205" x2="80" y2="198" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
    <line x1="125" y1="215" x2="75" y2="218" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
    <line x1="270" y1="205" x2="320" y2="198" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
    <line x1="275" y1="215" x2="325" y2="218" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>

    <!-- Cute Blush -->
    <ellipse cx="130" cy="210" rx="14" ry="8" fill="#ff69b4" opacity="0.6"/>
    <ellipse cx="270" cy="210" rx="14" ry="8" fill="#ff69b4" opacity="0.6"/>

    <!-- Accessory: Ribbon or Bandage -->
    <g transform="translate(200, 245)">
      <path d="M -25 -5 Q -40 -20 -25 -30 Q -10 -20 -15 -5 Z" fill="#ff4081"/>
      <path d="M 25 -5 Q 40 -20 25 -30 Q 10 -20 15 -5 Z" fill="#ff4081"/>
      <circle cx="0" cy="-15" r="9" fill="#ff80ab"/>
      <circle cx="0" cy="-15" r="5" fill="#ffffff"/>
      <!-- Small healing heart badge -->
      <path d="M 0 0 L -8 15 L 0 12 L 8 15 Z" fill="#ff4081"/>
    </g>
  </g>

  <!-- Bottom banner badge -->
  <rect x="70" y="340" width="260" height="34" rx="17" fill="#ffffff" stroke="#ff80ab" stroke-width="3"/>
  <text x="200" y="363" font-family="'Comic Sans MS', 'MS Sans Serif', cursive, sans-serif" font-size="16" font-weight="bold" fill="#d81b60" text-anchor="middle">
    ★ {caption} ★
  </text>
</svg>'''
    with open(path, 'w') as f:
        f.write(svg)

# Create variations of black cat graphics
create_black_cat_svg(f"{base_dir}/img/gata/princesa-hero.svg", "¡Salva a Princesa!", "ribbon")
create_black_cat_svg(f"{base_dir}/img/gata/princesa-meme1.svg", "Modo Panecito 🍞", "ribbon")
create_black_cat_svg(f"{base_dir}/img/gata/princesa-meme2.svg", "Void Con Ojitos 👀", "ribbon")
create_black_cat_svg(f"{base_dir}/img/gata/princesa-chibi.svg", "Michi Curada 💕", "ribbon")

# Create Merch mockups as SVGs
def create_merch_svg(path, title, item_type, color="#ff77a9"):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#fff9fb" rx="20"/>
  <rect x="10" y="10" width="380" height="380" fill="none" stroke="#ffb6c1" stroke-width="3" stroke-dasharray="8 6" rx="15"/>
  
  <!-- Merch representation -->
  <g transform="translate(200, 180)">
    {"<!-- T-shirt -->" if item_type == 'shirt' else ""}
    {"""
    <path d="M -80 -90 L -140 -30 L -100 10 L -70 -20 L -70 120 L 70 120 L 70 -20 L 100 10 L 140 -30 L 80 -90 Q 0 -60 -80 -90 Z" fill="#2d2833" stroke="#ffb6c1" stroke-width="3"/>
    <!-- Cat print on shirt -->
    <ellipse cx="0" cy="15" rx="35" ry="30" fill="#ffd1eb"/>
    <circle cx="-12" cy="12" r="6" fill="#2d2833"/>
    <circle cx="12" cy="12" r="6" fill="#2d2833"/>
    <polygon points="-25,-5 -15,-25 -5,-5" fill="#2d2833"/>
    <polygon points="5,-5 15,-25 25,-5" fill="#2d2833"/>
    <text x="0" y="35" font-family="sans-serif" font-size="8" font-weight="bold" fill="#d81b60" text-anchor="middle">PRINCESA</text>
    """ if item_type == 'shirt' else ""}

    {"""
    <!-- Mug -->
    <rect x="-65" y="-70" width="130" height="150" rx="20" fill="#ffffff" stroke="#ff80ab" stroke-width="5"/>
    <path d="M 65 -30 C 115 -30 115 50 65 50" fill="none" stroke="#ff80ab" stroke-width="14" stroke-linecap="round"/>
    <rect x="-50" y="-45" width="100" height="100" rx="12" fill="#ffd1eb"/>
    <circle cx="0" cy="5" r="28" fill="#1e1822"/>
    <polygon points="-18,-15 -10,-32 0,-15" fill="#1e1822"/>
    <polygon points="0,-15 10,-32 18,-15" fill="#1e1822"/>
    <ellipse cx="-8" cy="2" rx="4" ry="6" fill="#ffea79"/>
    <ellipse cx="8" cy="2" rx="4" ry="6" fill="#ffea79"/>
    <path d="M -30 -85 Q -25 -100 -30 -115" stroke="#ff80ab" stroke-width="3" fill="none" opacity="0.6"/>
    <path d="M 0 -85 Q 5 -100 0 -115" stroke="#ff80ab" stroke-width="3" fill="none" opacity="0.6"/>
    <path d="M 30 -85 Q 35 -100 30 -115" stroke="#ff80ab" stroke-width="3" fill="none" opacity="0.6"/>
    """ if item_type == 'mug' else ""}

    {"""
    <!-- Tote bag -->
    <path d="M -45 -120 Q 0 -150 45 -120 L 45 -40 L -45 -40 Z" fill="none" stroke="#d4a373" stroke-width="10"/>
    <rect x="-80" y="-40" width="160" height="170" rx="10" fill="#faedcd" stroke="#d4a373" stroke-width="4"/>
    <rect x="-55" y="-15" width="110" height="110" rx="8" fill="#ffffff" stroke="#ffb6c1" stroke-width="2"/>
    <circle cx="0" cy="40" r="32" fill="#1e1822"/>
    <polygon points="-22,18 -12,-2 0,18" fill="#1e1822"/>
    <polygon points="0,18 12,-2 22,18" fill="#1e1822"/>
    <circle cx="-10" cy="38" r="5" fill="#ffea79"/>
    <circle cx="10" cy="38" r="5" fill="#ffea79"/>
    <text x="0" y="80" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ff4081" text-anchor="middle">CAT MOM</text>
    """ if item_type == 'totebag' else ""}

    {"""
    <!-- Stickers -->
    <g transform="scale(1.2)">
      <polygon points="0,-45 15,-10 50,-10 20,10 32,45 0,22 -32,45 -20,10 -50,-10 -15,-10" fill="#ffd1eb" stroke="#ff4081" stroke-width="3"/>
      <circle cx="0" cy="2" r="26" fill="#1e1822"/>
      <polygon points="-16,-12 -8,-28 0,-12" fill="#1e1822"/>
      <polygon points="0,-12 8,-28 16,-12" fill="#1e1822"/>
      <circle cx="-8" cy="0" r="5" fill="#ffea79"/>
      <circle cx="8" cy="0" r="5" fill="#ffea79"/>
      <ellipse cx="-12" cy="10" rx="5" ry="3" fill="#ff4081"/>
      <ellipse cx="12" cy="10" rx="5" ry="3" fill="#ff4081"/>
      <text x="0" y="55" font-family="sans-serif" font-size="9" font-weight="bold" fill="#9c27b0" text-anchor="middle">HOLOGRÁFICO</text>
    </g>
    """ if item_type == 'stickers' else ""}
  </g>

  <!-- Tag / Ribbons -->
  <rect x="30" y="325" width="340" height="50" rx="25" fill="#ffd1eb" stroke="#ff80ab" stroke-width="2"/>
  <text x="200" y="356" font-family="'Comic Sans MS', cursive, sans-serif" font-size="18" font-weight="bold" fill="#c2185b" text-anchor="middle">
    ✨ {title} ✨
  </text>
</svg>'''
    with open(path, 'w') as f:
        f.write(svg)

create_merch_svg(f"{base_dir}/img/merch/camiseta.svg", "Camiseta Ilustrada", "shirt")
create_merch_svg(f"{base_dir}/img/merch/mug.svg", "Mug Cerámico Mágico", "mug")
create_merch_svg(f"{base_dir}/img/merch/totebag.svg", "Tote Bag Ecológica", "totebag")
create_merch_svg(f"{base_dir}/img/merch/stickers.svg", "Pack Stickers Glitter", "stickers")

# Create Desserts SVGs
def create_dessert_svg(path, name, kind):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#fff5f8" rx="20"/>
  <rect x="10" y="10" width="380" height="380" fill="none" stroke="#ffb6c1" stroke-width="3" stroke-dasharray="6 6" rx="15"/>
  <g transform="translate(200, 180)">
    {"""
    <!-- Brownie -->
    <rect x="-80" y="-40" width="160" height="80" rx="8" fill="#4a2511" stroke="#2d1508" stroke-width="4"/>
    <path d="M -80 -10 Q 0 -5 80 -10 L 80 40 L -80 40 Z" fill="#3b1d0d"/>
    <circle cx="-50" cy="-20" r="8" fill="#8d5b4c"/>
    <circle cx="10" cy="-15" r="12" fill="#8d5b4c"/>
    <circle cx="50" cy="-25" r="9" fill="#8d5b4c"/>
    <!-- Cute cat paw powdered sugar -->
    <ellipse cx="0" cy="5" rx="20" ry="15" fill="#ffffff" opacity="0.85"/>
    <circle cx="-16" cy="-10" r="6" fill="#ffffff" opacity="0.85"/>
    <circle cx="0" cy="-15" r="6" fill="#ffffff" opacity="0.85"/>
    <circle cx="16" cy="-10" r="6" fill="#ffffff" opacity="0.85"/>
    """ if kind == 'brownie' else ""}

    {"""
    <!-- Cookie Cat Paw -->
    <circle cx="0" cy="15" r="65" fill="#e6b87d" stroke="#c48a4c" stroke-width="4"/>
    <!-- Paw pads in chocolate -->
    <ellipse cx="0" cy="28" rx="28" ry="20" fill="#4a2511"/>
    <circle cx="-25" cy="-8" r="11" fill="#4a2511"/>
    <circle cx="0" cy="-18" r="12" fill="#4a2511"/>
    <circle cx="25" cy="-8" r="11" fill="#4a2511"/>
    <circle cx="-42" cy="12" r="4" fill="#6d391c"/>
    <circle cx="42" cy="22" r="5" fill="#6d391c"/>
    """ if kind == 'cookie' else ""}

    {"""
    <!-- Cupcake -->
    <polygon points="-50,70 -35,-10 35,-10 50,70" fill="#ffb6c1" stroke="#e91e63" stroke-width="3"/>
    <path d="M -50 -10 Q 0 -50 50 -10 Q 40 -60 0 -70 Q -40 -60 -50 -10 Z" fill="#ffe4f2" stroke="#e91e63" stroke-width="3"/>
    <circle cx="0" cy="-75" r="14" fill="#e91e63"/>
    <circle cx="-4" cy="-78" r="4" fill="#ffffff"/>
    <circle cx="-20" cy="-30" r="4" fill="#ffd700"/>
    <circle cx="15" cy="-35" r="4" fill="#00e5ff"/>
    <circle cx="-5" cy="-45" r="4" fill="#76ff03"/>
    <!-- Cat Ears on Frosting -->
    <polygon points="-30,-50 -20,-80 -10,-55" fill="#1e1822"/>
    <polygon points="10,-55 20,-80 30,-50" fill="#1e1822"/>
    """ if kind == 'cupcake' else ""}
  </g>
  <rect x="40" y="325" width="320" height="50" rx="25" fill="#fff0f5" stroke="#ff4081" stroke-width="2"/>
  <text x="200" y="356" font-family="'Comic Sans MS', cursive, sans-serif" font-size="18" font-weight="bold" fill="#ad1457" text-anchor="middle">
    🧁 {name} 🧁
  </text>
</svg>'''
    with open(path, 'w') as f:
        f.write(svg)

create_dessert_svg(f"{base_dir}/img/postres/brownie.svg", "Brownie Melcochudo", "brownie")
create_dessert_svg(f"{base_dir}/img/postres/cookie.svg", "Galleta Huellita", "cookie")
create_dessert_svg(f"{base_dir}/img/postres/cupcake.svg", "Cupcake Michi Rosa", "cupcake")

# Create Clinical documents / UdeA invoices mockups as crisp SVGs
def create_clinical_svg(path, title, subtitle, doc_number):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
  <rect width="600" height="800" fill="#ffffff" stroke="#ced4da" stroke-width="4"/>
  
  <!-- Header UdeA style -->
  <rect x="0" y="0" width="600" height="110" fill="#0a5c36"/>
  <text x="30" y="45" font-family="'Times New Roman', serif" font-size="22" font-weight="bold" fill="#ffffff">UNIVERSIDAD DE ANTIOQUIA</text>
  <text x="30" y="70" font-family="sans-serif" font-size="14" fill="#e8f5e9">FACULTAD DE CIENCIAS AGRARIAS</text>
  <text x="30" y="92" font-family="sans-serif" font-size="13" font-weight="bold" fill="#c8e6c9">HOSPITAL VETERINARIO - SEDE ROBLEDO / MEDELLÍN</text>
  
  <!-- Document Stamp / Watermark -->
  <g transform="translate(480, 55)">
    <circle cx="0" cy="0" r="38" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 2"/>
    <text x="0" y="-12" font-family="sans-serif" font-size="8" fill="#ffffff" text-anchor="middle">HOSPITAL CLÍNICO</text>
    <text x="0" y="3" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">UDEA</text>
    <text x="0" y="16" font-family="sans-serif" font-size="8" fill="#ffffff" text-anchor="middle">MEDELLÍN</text>
  </g>

  <!-- Document Meta -->
  <rect x="30" y="130" width="540" height="80" rx="6" fill="#f8f9fa" stroke="#e9ecef" stroke-width="2"/>
  <text x="50" y="155" font-family="sans-serif" font-size="13" font-weight="bold" fill="#212529">DOCUMENTO: <tspan fill="#0a5c36">{title}</tspan></text>
  <text x="50" y="175" font-family="sans-serif" font-size="12" fill="#495057">Nº Registro Clínico / Factura: {doc_number}</text>
  <text x="50" y="195" font-family="sans-serif" font-size="12" fill="#495057">Fecha de Emisión: Octubre 2026 | Medellín, Antioquia</text>

  <!-- Patient Box -->
  <rect x="30" y="230" width="540" height="110" rx="6" fill="#f1f8f4" stroke="#a3cfbb" stroke-width="2"/>
  <text x="50" y="255" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f5132">DATOS DE LA PACIENTE FELINA</text>
  <line x1="50" y1="262" x2="550" y2="262" stroke="#a3cfbb" stroke-width="1"/>
  <text x="50" y="285" font-family="sans-serif" font-size="13" fill="#212529">Nombre: <tspan font-weight="bold">Princesa</tspan> | Especie: <tspan font-weight="bold">Felino Doméstico</tspan></text>
  <text x="50" y="305" font-family="sans-serif" font-size="13" fill="#212529">Color: <tspan font-weight="bold">Negro Sólido</tspan> | Sexo: <tspan font-weight="bold">Hembra</tspan></text>
  <text x="50" y="325" font-family="sans-serif" font-size="13" fill="#212529">Propietaria / Acompañante: <tspan font-weight="bold">Sara</tspan></text>

  <!-- Detailed Clinical Section -->
  <text x="30" y="370" font-family="sans-serif" font-size="15" font-weight="bold" fill="#0a5c36">VALORACIÓN MÉDICA &amp; DETALLE PROCEDIMIENTO:</text>
  
  <rect x="30" y="385" width="540" height="230" rx="6" fill="#ffffff" stroke="#ced4da" stroke-width="1.5"/>
  
  <!-- Table Header -->
  <rect x="30" y="385" width="540" height="35" fill="#e9ecef"/>
  <text x="50" y="408" font-family="sans-serif" font-size="12" font-weight="bold" fill="#495057">DESCRIPCIÓN / SERVICIO VETERINARIO</text>
  <text x="470" y="408" font-family="sans-serif" font-size="12" font-weight="bold" fill="#495057">VALOR COP</text>
  
  <!-- Row 1 -->
  <text x="50" y="445" font-family="sans-serif" font-size="12" fill="#212529">1. Consulta Especializada + Valoración Pre-Quirúrgica</text>
  <text x="470" y="445" font-family="sans-serif" font-size="12" fill="#212529">$ 85.000</text>
  <line x1="45" y1="458" x2="555" y2="458" stroke="#e9ecef" stroke-width="1"/>

  <!-- Row 2 -->
  <text x="50" y="480" font-family="sans-serif" font-size="12" fill="#212529">2. Cuadro Hemático Completo + Perfil Bioquímico Pre-Anestésico</text>
  <text x="470" y="480" font-family="sans-serif" font-size="12" fill="#212529">$ 165.000</text>
  <line x1="45" y1="493" x2="555" y2="493" stroke="#e9ecef" stroke-width="1"/>

  <!-- Row 3 -->
  <text x="50" y="515" font-family="sans-serif" font-size="12" fill="#212529">3. Intervención Quirúrgica + Derechos de Quirófano UdeA</text>
  <text x="470" y="515" font-family="sans-serif" font-size="12" fill="#212529">$ 1.850.000</text>
  <line x1="45" y1="528" x2="555" y2="528" stroke="#e9ecef" stroke-width="1"/>

  <!-- Row 4 -->
  <text x="50" y="550" font-family="sans-serif" font-size="12" fill="#212529">4. Anestesia Inhalatoria General Monitorizada + Oxigenoterapia</text>
  <text x="470" y="550" font-family="sans-serif" font-size="12" fill="#212529">$ 380.000</text>
  <line x1="45" y1="563" x2="555" y2="563" stroke="#e9ecef" stroke-width="1"/>

  <!-- Row 5 -->
  <text x="50" y="585" font-family="sans-serif" font-size="12" fill="#212529">5. Hospitalización Post-Operatoria (48h) + Medicación UCI</text>
  <text x="470" y="585" font-family="sans-serif" font-size="12" fill="#212529">$ 420.000</text>

  <!-- Total Box -->
  <rect x="330" y="625" width="240" height="45" rx="4" fill="#d1e7dd" stroke="#0f5132" stroke-width="1.5"/>
  <text x="350" y="653" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f5132">TOTAL ESTIMADO:</text>
  <text x="480" y="653" font-family="sans-serif" font-size="15" font-weight="bold" fill="#0f5132">$ 2.900.000</text>

  <!-- Professional Signatures & Sello -->
  <g transform="translate(100, 715)">
    <line x1="-50" y1="0" x2="100" y2="0" stroke="#495057" stroke-width="1.5"/>
    <text x="25" y="16" font-family="sans-serif" font-size="11" font-weight="bold" fill="#212529" text-anchor="middle">Médico Veterinario Cirujano</text>
    <text x="25" y="30" font-family="sans-serif" font-size="10" fill="#6c757d" text-anchor="middle">M.P. 18249-COMVEZCOL</text>
    <text x="25" y="42" font-family="sans-serif" font-size="10" fill="#6c757d" text-anchor="middle">H.V. Universidad de Antioquia</text>
  </g>

  <!-- Seal -->
  <g transform="translate(440, 715)">
    <circle cx="0" cy="0" r="35" fill="none" stroke="#b02a37" stroke-width="2" opacity="0.85"/>
    <circle cx="0" cy="0" r="31" fill="none" stroke="#b02a37" stroke-width="1" stroke-dasharray="3 2" opacity="0.85"/>
    <text x="0" y="-8" font-family="sans-serif" font-size="8" font-weight="bold" fill="#b02a37" text-anchor="middle">SELLO OFICIAL</text>
    <text x="0" y="5" font-family="sans-serif" font-size="10" font-weight="bold" fill="#b02a37" text-anchor="middle">AUTORIZADO</text>
    <text x="0" y="18" font-family="sans-serif" font-size="7" fill="#b02a37" text-anchor="middle">CLÍNICA UdeA</text>
  </g>
</svg>'''
    with open(path, 'w') as f:
        f.write(svg)

create_clinical_svg(f"{base_dir}/img/clinica/diagnostico-udea.svg", "DIAGNÓSTICO MÉDICO QUIRÚRGICO", "Universidad de Antioquia", "HC-UDEA-2026-09418")
create_clinical_svg(f"{base_dir}/img/clinica/factura-presupuesto.svg", "ORDEN DE PROCEDIMIENTO &amp; FACTURACIÓN", "Universidad de Antioquia", "FAC-UDEA-481902")

# Create Calendar 2027 Mockup SVG
def create_calendar_svg(path):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <rect width="500" height="500" fill="#fff5fa" rx="25"/>
  <rect x="15" y="15" width="470" height="470" fill="none" stroke="#ff80ab" stroke-width="4" stroke-dasharray="10 5" rx="20"/>

  <!-- Calendar Wire Ring Binder -->
  <g fill="#90a4ae">
    <rect x="90" y="25" width="14" height="30" rx="7"/>
    <rect x="150" y="25" width="14" height="30" rx="7"/>
    <rect x="210" y="25" width="14" height="30" rx="7"/>
    <rect x="270" y="25" width="14" height="30" rx="7"/>
    <rect x="330" y="25" width="14" height="30" rx="7"/>
    <rect x="390" y="25" width="14" height="30" rx="7"/>
  </g>

  <!-- Calendar Page Top Banner -->
  <rect x="40" y="55" width="420" height="110" rx="12" fill="#ffd1eb" stroke="#ff4081" stroke-width="2"/>
  <text x="250" y="95" font-family="'Comic Sans MS', cursive, sans-serif" font-size="28" font-weight="bold" fill="#d81b60" text-anchor="middle">
    CALENDARIO 2027
  </text>
  <text x="250" y="125" font-family="'MS Sans Serif', sans-serif" font-size="16" font-weight="bold" fill="#880e4f" text-anchor="middle">
    ★ 12 MESES DE MEMES DE GATICOS ★
  </text>
  <text x="250" y="148" font-family="sans-serif" font-size="12" fill="#ad1457" text-anchor="middle">
    (Edición Especial Princesa &amp; Amigos)
  </text>

  <!-- Calendar Picture Box -->
  <rect x="60" y="180" width="380" height="190" rx="10" fill="#1e1822"/>
  
  <!-- Cat Face inside calendar -->
  <g transform="translate(250, 260)">
    <!-- Ears -->
    <polygon points="-50,-30 -30,-80 0,-40" fill="#1e1822" stroke="#ffb6c1" stroke-width="3"/>
    <polygon points="0,-40 30,-80 50,-30" fill="#1e1822" stroke="#ffb6c1" stroke-width="3"/>
    <!-- Head -->
    <ellipse cx="0" cy="0" rx="70" ry="55" fill="#1e1822"/>
    <!-- Yellow Eyes Meme -->
    <ellipse cx="-25" cy="-8" rx="18" ry="22" fill="#ffeb3b"/>
    <ellipse cx="25" cy="-8" rx="18" ry="22" fill="#ffeb3b"/>
    <circle cx="-25" cy="-8" r="8" fill="#000000"/>
    <circle cx="25" cy="-8" r="8" fill="#000000"/>
    <circle cx="-30" cy="-14" r="5" fill="#ffffff"/>
    <circle cx="20" cy="-14" r="5" fill="#ffffff"/>
    <!-- Pink Nose -->
    <polygon points="-5,14 5,14 0,20" fill="#ff4081"/>
    <!-- Derp text -->
    <text x="0" y="45" font-family="'Comic Sans MS', sans-serif" font-size="13" font-weight="bold" fill="#ff80ab" text-anchor="middle">
      "No sé qué hice pero te amo"
    </text>
  </g>

  <!-- Calendar Grid Preview -->
  <rect x="60" y="385" width="380" height="75" rx="8" fill="#ffffff" stroke="#ffb6c1" stroke-width="2"/>
  <text x="250" y="415" font-family="'MS Sans Serif', sans-serif" font-size="13" font-weight="bold" fill="#d81b60" text-anchor="middle">
    ENERO • FEBRERO • MARZO • ABRIL...
  </text>
  <text x="250" y="440" font-family="sans-serif" font-size="12" fill="#555555" text-anchor="middle">
    ✨ Preventa disponible - ¡Asegura el tuyo! ✨
  </text>
</svg>'''
    with open(path, 'w') as f:
        f.write(svg)

create_calendar_svg(f"{base_dir}/img/calendar/calendario-2027-preview.svg")

# Create Retro Badges (88x31 standard Y2K web badge style)
def create_retro_badge(path, text_top, text_bot, bg1, bg2, fg="#ffffff"):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="88" height="31" viewBox="0 0 88 31">
  <rect width="88" height="31" fill="{bg1}" stroke="#ffffff" stroke-width="1"/>
  <rect x="1" y="1" width="86" height="29" fill="none" stroke="#000000" stroke-width="1"/>
  <rect x="2" y="15" width="84" height="14" fill="{bg2}"/>
  <text x="44" y="11" font-family="'MS Sans Serif', 'Arial', sans-serif" font-size="9" font-weight="bold" fill="{fg}" text-anchor="middle">{text_top}</text>
  <text x="44" y="25" font-family="'MS Sans Serif', 'Arial', sans-serif" font-size="8" font-weight="bold" fill="#ffffff" text-anchor="middle">{text_bot}</text>
</svg>'''
    with open(path, 'w') as f:
        f.write(svg)

create_retro_badge(f"{base_dir}/img/badges/nequi-badge.svg", "NEQUI", "DONA AQUÍ", "#3a005c", "#ff007f")
create_retro_badge(f"{base_dir}/img/badges/cat-lover.svg", "CAT LOVER", "CERTIFIED", "#ff69b4", "#9c27b0")
create_retro_badge(f"{base_dir}/img/badges/html5.svg", "HTML5/CSS3", "VALID CUTE", "#00838f", "#00acc1")
create_retro_badge(f"{base_dir}/img/badges/under-con.svg", "EN PROCESO", "RECUPERACIÓN", "#f57c00", "#ffb300")
create_retro_badge(f"{base_dir}/img/badges/girl-power.svg", "GIRLIE WEB", "Y2K MAGIC", "#e91e63", "#f06292")

# Create Nequi QR Placeholder SVG
def create_nequi_qr_svg(path, phone="300 000 0000"):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 340" width="100%" height="100%">
  <rect width="300" height="340" rx="16" fill="#ffffff" stroke="#ff80ab" stroke-width="3"/>
  
  <!-- Nequi Top Banner -->
  <rect x="0" y="0" width="300" height="60" rx="16" fill="#20002c"/>
  <rect x="0" y="45" width="300" height="15" fill="#20002c"/>
  <text x="150" y="38" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ff007f" text-anchor="middle">NEQUI</text>

  <!-- Mock QR Grid pattern -->
  <g transform="translate(50, 75)">
    <!-- Border square -->
    <rect width="200" height="200" fill="#ffffff" stroke="#20002c" stroke-width="2"/>
    
    <!-- Corner Finder Patterns -->
    <!-- Top-Left -->
    <rect x="10" y="10" width="40" height="40" fill="#20002c"/>
    <rect x="18" y="18" width="24" height="24" fill="#ffffff"/>
    <rect x="23" y="23" width="14" height="14" fill="#ff007f"/>
    <!-- Top-Right -->
    <rect x="150" y="10" width="40" height="40" fill="#20002c"/>
    <rect x="158" y="18" width="24" height="24" fill="#ffffff"/>
    <rect x="163" y="23" width="14" height="14" fill="#ff007f"/>
    <!-- Bottom-Left -->
    <rect x="10" y="150" width="40" height="40" fill="#20002c"/>
    <rect x="18" y="158" width="24" height="24" fill="#ffffff"/>
    <rect x="23" y="163" width="14" height="14" fill="#ff007f"/>

    <!-- Data matrix simulated modules -->
    <g fill="#20002c">
      <rect x="60" y="20" width="10" height="10"/>
      <rect x="80" y="20" width="20" height="10"/>
      <rect x="110" y="20" width="10" height="20"/>
      <rect x="60" y="40" width="20" height="10"/>
      <rect x="90" y="40" width="10" height="10"/>
      <rect x="130" y="40" width="10" height="10"/>
      
      <rect x="20" y="60" width="10" height="30"/>
      <rect x="40" y="70" width="20" height="10"/>
      <rect x="70" y="60" width="10" height="10"/>
      <rect x="90" y="70" width="20" height="10"/>
      <rect x="120" y="60" width="30" height="10"/>
      <rect x="160" y="70" width="20" height="10"/>

      <rect x="20" y="100" width="30" height="10"/>
      <rect x="60" y="90" width="20" height="20"/>
      <rect x="120" y="90" width="20" height="10"/>
      <rect x="150" y="100" width="30" height="10"/>

      <rect x="60" y="130" width="20" height="10"/>
      <rect x="90" y="120" width="10" height="20"/>
      <rect x="110" y="140" width="30" height="10"/>
      <rect x="150" y="120" width="20" height="10"/>
      
      <rect x="60" y="160" width="10" height="20"/>
      <rect x="80" y="170" width="30" height="10"/>
      <rect x="120" y="160" width="20" height="20"/>
      <rect x="150" y="170" width="30" height="10"/>
    </g>

    <!-- Center Cat Icon in QR -->
    <circle cx="100" cy="100" r="22" fill="#ff007f"/>
    <circle cx="100" cy="100" r="18" fill="#ffffff"/>
    <ellipse cx="100" cy="100" rx="12" ry="10" fill="#20002c"/>
    <polygon points="90,92 94,84 98,92" fill="#20002c"/>
    <polygon points="102,92 106,84 110,92" fill="#20002c"/>
  </g>

  <!-- Number at bottom -->
  <rect x="30" y="290" width="240" height="36" rx="8" fill="#ffe4f2"/>
  <text x="150" y="314" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#20002c" text-anchor="middle">
    {phone}
  </text>
</svg>'''
    with open(path, 'w') as f:
        f.write(svg)

create_nequi_qr_svg(f"{base_dir}/img/badges/nequi-qr.svg")

print("All asset placeholders created successfully!")
