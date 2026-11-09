import base64
import os

base_dir = "/home/sara/Documents/Proyectos/princesa-page"

def img_to_b64(rel_path):
    full_path = os.path.join(base_dir, rel_path)
    if not os.path.exists(full_path):
        return ""
    ext = os.path.splitext(full_path)[1].lower()
    mime = "image/jpeg" if ext in [".jpg", ".jpeg"] else "image/png" if ext == ".png" else "image/svg+xml"
    with open(full_path, "rb") as f:
        return f"data:{mime};base64," + base64.b64encode(f.read()).decode("utf-8")

cat_img = img_to_b64("assets/img/gata/princesa-principal.jpg")
qr_web = img_to_b64("assets/img/qr/qr-web-princesa.png")
qr_nequi = img_to_b64("assets/img/badges/nequi-qr.jpg")

cremosos_p1 = [
    ("Brownie", "3 leches, bizcocho húmedo de chocolate y arequipe", "cremoso-brownie.jpg", "$12.500"),
    ("Milo", "3 leches tradicional y generoso topping de Milo crujiente", "cremoso-milo.jpg", "$12.500"),
    ("Quipitos", "3 leches con chispas efervescentes de Quipitos", "cremoso-quipitos.jpg", "$12.500"),
    ("Arequipe & Queso", "Combinación tradicional de queso campesino y arequipe", "cremoso-arequipe-queso.jpg", "$12.500"),
    ("Oreo", "3 leches con abundante galleta Oreo triturada", "cremoso-oreo.jpg", "$12.500"),
    ("Maracuyá", "Mermelada artesanal 100% pulpa natural de fruta", "cremoso-maracuya.jpg", "$12.500"),
]

cremosos_p2 = [
    ("Fresa Natural", "Mermelada artesanal de fresas frescas seleccionadas", "cremoso-fresa.jpg", "$12.500"),
    ("Mora Silvestre", "Mermelada 100% natural de mora con dulce equilibrado", "cremoso-mora.jpg", "$12.500"),
    ("Durazno", "3 leches con trozos seleccionados de duraznos en almíbar", "cremoso-durazno.jpg", "$12.500"),
    ("Café Moca", "Equilibrio de suave café colombiano y chocolate rallado", "cremoso-cafe.jpg", "$12.500"),
    ("Tres Leches", "Bizcocho tradicional húmedo cubierto de chantilly suave", "cremoso-tres-leches.jpg", "$12.500"),
    ("Leche Klim", "3 leches con capa generosa de deliciosa Leche Klim", "cremoso-leche-klim.jpg", "$12.500"),
]

zero_azucar = [
    ("Fresa con Choco Zero", "Endulzado con Stevia, base integral, fresas y ganache sin azúcar", "zero-fresa-chocolate.jpg", "$14.500"),
    ("Frutos Secos Zero", "Endulzado con Stevia, galleta integral, almendras, nueces y maní", "zero-frutos-secos.jpg", "$14.500"),
    ("Queso & Arequipe Zero", "Arequipe artesanal sin azúcar añadida y queso fresco", "zero-queso-arequipe.jpg", "$14.500"),
]

cheesecakes = [
    ("Frutos Rojos", "Queso crema premium, galleta crocante y coulis de frutos rojos", "cheesecake-frutos-rojos.jpg", "$13.500"),
    ("Crema de Baileys", "Queso crema, notas aromáticas de Baileys, café y chocolate", "cheesecake-baileys.jpg", "$13.500"),
    ("Tiramisú de Milo", "Bizcocho embebido en café, suave crema de queso y Milo", "cheesecake-tiramisu-milo.jpg", "$13.500"),
    ("Queso & Bocadillo", "Cheesecake clásico horneado con dulce de guayaba artesanal", "cheesecake-queso-bocadillo.jpg", "$13.500"),
    ("Arequipe Tradicional", "Queso crema suave con abundante y cremoso arequipe", "cheesecake-arequipe.jpg", "$13.500"),
    ("Limón Sultana", "Zumo de limón fresco, toque cítrico balanceado y galleta Sultana", "cheesecake-limon.jpg", "$13.500"),
]

familiares = [
    ("Familiar Cremoso Milo (9 Porc.)", "Bandeja familiar para 9 personas con abundante Milo", "familiar-milo.jpg", "$38.000"),
    ("Familiar Brownie & Arequipe (9 Porc.)", "Bandeja familiar con bizcocho de brownie y dulce arequipe", "familiar-brownie.jpg", "$38.000"),
    ("Cheesecake Familiar Baileys (12 Porc.)", "Bandeja de cheesecake para 12 personas con crema de Baileys", "cheesecake-fam-baileys.jpg", "$42.000"),
    ("Megafamiliar Brownie & Arequipe (15 Porc.)", "Bandeja gigante de 15 porciones para celebraciones", "mega-brownie.jpg", "$58.000"),
]

def render_cards(items, cols=3, img_h=120):
    html = f'<div class="grid cols-{cols}">'
    for name, desc, img_name, price in items:
        b64 = img_to_b64(f"assets/img/postres/{img_name}")
        html += f'''
        <div class="card">
          <div class="card-img-wrap" style="height: {img_h}px;">
            <img src="{b64}" alt="{name}" class="card-img">
            <span class="card-price">{price}</span>
          </div>
          <div class="card-content">
            <div class="card-title">{name}</div>
            <div class="card-desc">{desc}</div>
          </div>
        </div>'''
    html += '</div>'
    return html

html_doc = f'''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<style>
  @page {{
    size: letter portrait;
    margin: 6mm 7mm 6mm 7mm;
  }}
  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}
  body {{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #331133;
    background: #ffffff;
    font-size: 10px;
    line-height: 1.25;
  }}
  .page {{
    page-break-after: always;
    break-after: page;
    box-sizing: border-box;
    padding-bottom: 2px;
  }}
  .page:last-child {{
    page-break-after: avoid;
    break-after: avoid;
  }}
  
  /* Top Banner Header */
  .header {{
    background: linear-gradient(135deg, #ffeef6 0%, #ffd6eb 100%);
    border: 2px solid #ff77a9;
    border-radius: 10px;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 2px 4px rgba(255, 119, 169, 0.2);
    margin-bottom: 7px;
  }}
  .header-avatar {{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2.5px solid #ff007f;
    object-fit: cover;
    box-shadow: 0 2px 4px rgba(0,0,0,0.15);
    flex-shrink: 0;
  }}
  .header-info {{
    flex-grow: 1;
  }}
  .header-badge {{
    display: inline-block;
    background: #ff007f;
    color: #fff;
    font-size: 8px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 2px 7px;
    border-radius: 8px;
    margin-bottom: 2px;
  }}
  .header-title {{
    font-size: 15px;
    font-weight: 900;
    color: #700040;
    line-height: 1.15;
  }}
  .header-sub {{
    font-size: 9px;
    color: #551144;
    margin-top: 2px;
  }}
  .header-qr-box {{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex-shrink: 0;
    background: #fff;
    border: 1.5px solid #ff77a9;
    padding: 3px 5px;
    border-radius: 8px;
  }}
  .header-qr-box img {{
    width: 46px;
    height: 46px;
  }}
  .header-qr-lbl {{
    font-size: 6.5px;
    font-weight: bold;
    color: #700040;
    margin-top: 1px;
  }}

  /* Mini Header for subsequent pages */
  .mini-header {{
    background: #fff2f8;
    border: 1.5px solid #ffb6c1;
    border-radius: 8px;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }}
  .mini-header-title {{
    font-size: 10.5px;
    font-weight: 800;
    color: #700040;
    display: flex;
    align-items: center;
    gap: 6px;
  }}
  .mini-header-sub {{
    font-size: 8.5px;
    color: #662255;
    font-weight: 600;
  }}

  /* Notice Box Delivery */
  .delivery-box {{
    background: #fffbe6;
    border: 1.5px dashed #faad14;
    border-radius: 8px;
    padding: 7px 10px;
    margin-bottom: 7px;
    font-size: 8.5px;
    line-height: 1.35;
    color: #4a2800;
  }}
  .delivery-date {{
    font-size: 10.5px;
    font-weight: 900;
    color: #d4380d;
    margin-bottom: 2px;
    display: flex;
    align-items: center;
    gap: 4px;
  }}

  /* Section Title */
  .section-title {{
    background: linear-gradient(90deg, #ff77a9, #ff9ec4);
    color: #fff;
    font-weight: 900;
    font-size: 11px;
    padding: 4px 10px;
    border-radius: 6px;
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }}
  .section-tag {{
    font-size: 8px;
    background: rgba(255,255,255,0.3);
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: bold;
  }}

  /* Grid & Cards */
  .grid {{
    display: grid;
    gap: 7px;
  }}
  .cols-3 {{
    grid-template-columns: repeat(3, 1fr);
  }}
  .cols-2 {{
    grid-template-columns: repeat(2, 1fr);
  }}

  .card {{
    background: #fff;
    border: 1.5px solid #ffccd9;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    display: flex;
    flex-direction: column;
  }}
  .card-img-wrap {{
    width: 100%;
    position: relative;
    overflow: hidden;
    background: #fdf5f8;
  }}
  .card-img {{
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }}
  .card-price {{
    position: absolute;
    bottom: 4px;
    right: 4px;
    background: rgba(112, 0, 64, 0.92);
    color: #fff;
    font-weight: 900;
    font-size: 9px;
    padding: 2px 6px;
    border-radius: 5px;
    border: 1px solid rgba(255,255,255,0.6);
  }}
  .card-content {{
    padding: 5px 7px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
  }}
  .card-title {{
    font-weight: 800;
    font-size: 10.5px;
    color: #700040;
    margin-bottom: 1px;
    line-height: 1.15;
  }}
  .card-desc {{
    font-size: 8px;
    color: #664455;
    line-height: 1.25;
  }}

  /* Footer */
  .footer {{
    background: #fff0f6;
    border: 1.5px solid #ffb6c1;
    border-radius: 6px;
    padding: 4px 10px;
    font-size: 8px;
    color: #662255;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  }}

  /* Page 4 order guide */
  .order-guide {{
    background: #fcf4ff;
    border: 1.5px solid #d3adf7;
    border-radius: 10px;
    padding: 10px 14px;
    margin-top: 8px;
    display: flex;
    gap: 14px;
    align-items: center;
  }}
  .order-steps {{
    flex-grow: 1;
  }}
  .order-title {{
    font-size: 11.5px;
    font-weight: 900;
    color: #531dab;
    margin-bottom: 5px;
  }}
  .order-step-item {{
    font-size: 8.5px;
    margin-bottom: 3px;
    color: #391085;
    line-height: 1.3;
  }}
  .order-step-item strong {{
    color: #722ed1;
  }}
  .order-qr-col {{
    display: flex;
    gap: 10px;
    flex-shrink: 0;
  }}
  .qr-badge-card {{
    background: #fff;
    border: 1.5px solid #d3adf7;
    border-radius: 6px;
    padding: 5px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
  }}
  .qr-badge-card img {{
    width: 60px;
    height: 60px;
  }}
  .qr-badge-txt {{
    font-size: 7px;
    font-weight: bold;
    color: #531dab;
    margin-top: 2px;
  }}
</style>
</head>
<body>

<!-- ================= PAGE 1 ================= -->
<div class="page">
  <div class="header">
    <img src="{cat_img}" class="header-avatar" alt="Princesa">
    <div class="header-info">
      <span class="header-badge">🐱 Ayuda Médica • Hospital Veterinario UdeA</span>
      <h1 class="header-title">POSTRECITOS CASEROS CON CAUSA 🐾💖</h1>
      <p class="header-sub">
        Recaudación de fondos para la cirugía de cistotomía y recuperación de Princesa.<br>
        <strong>100% artesanales, sin conservantes y elaborados con ingredientes de primera calidad.</strong>
      </p>
    </div>
    <div class="header-qr-box">
      <img src="{qr_web}" alt="QR Web">
      <span class="header-qr-lbl">PÁGINA WEB</span>
    </div>
  </div>

  <div class="delivery-box">
    <div class="delivery-date">
      <span>📅</span>
      <span>FECHA DE ENTREGA: Semana del lunes 30 de noviembre al viernes 4 de diciembre de 2026</span>
    </div>
    <div>
      📦 <strong>Productos 100% bajo pedido previo.</strong> Frescos y empacados con amor.<br>
      📍 <strong>Puntos de Entrega GRATIS en Medellín:</strong> Porterías Sede Principal UdeA, Campus UNAL (Volador / Minas), Hospital Alma Máter (antigua IPS) y Clínica Universitaria UPB.<br>
      🛵 <em>Domicilios en Medellín y área metropolitana a cargo del comprador (DiDi / Uber Flash).</em>
    </div>
  </div>

  <div class="section-title">
    <span>1. POSTRES CREMOSOS PERSONALES (8 ONZAS) — $12.500 COP C/U</span>
    <span class="section-tag">PARTE 1 • CLÁSICOS FAVORITOS</span>
  </div>

  {render_cards(cremosos_p1, cols=3, img_h=130)}

  <div class="footer">
    <span>🐾 WhatsApp Sara: <strong>300 608 7608</strong> • Nequi: <strong>300 608 7608</strong></span>
    <span>Página 1 de 4 • Web interactiva: <strong>mayafloyd.github.io/princesa-donaciones/</strong></span>
  </div>
</div>

<!-- ================= PAGE 2 ================= -->
<div class="page">
  <div class="mini-header">
    <div class="mini-header-title">
      <img src="{cat_img}" style="width:22px; height:22px; border-radius:50%; object-fit:cover; border:1.5px solid #ff007f;">
      <span>Postrecitos Caseros por la Cirugía de Princesa 🐾</span>
    </div>
    <div class="mini-header-sub">
      📅 Entrega: Lun 30 Nov - Vie 4 Dic 2026 • WhatsApp: <strong>300 608 7608</strong>
    </div>
  </div>

  <div class="section-title">
    <span>1. POSTRES CREMOSOS PERSONALES (8 ONZAS) — $12.500 COP C/U (CONT.)</span>
    <span class="section-tag">PARTE 2 • FRUTALES & ESPECIALES</span>
  </div>

  {render_cards(cremosos_p2, cols=3, img_h=120)}

  <div class="section-title" style="margin-top: 8px; background: linear-gradient(90deg, #389e0d, #52c41a);">
    <span>2. LÍNEA ZERO AZÚCAR PERSONAL (8 ONZAS) — $14.500 COP C/U</span>
    <span class="section-tag">ENDULZADO CON STEVIA • 100% ARTESANAL</span>
  </div>

  {render_cards(zero_azucar, cols=3, img_h=120)}

  <div class="footer">
    <span>🐾 Elaborados frescos bajo pedido • Puntos de entrega gratis en UdeA, UNAL, Alma Máter y UPB</span>
    <span>Página 2 de 4 • Web: <strong>mayafloyd.github.io/princesa-donaciones/</strong></span>
  </div>
</div>

<!-- ================= PAGE 3 ================= -->
<div class="page">
  <div class="mini-header">
    <div class="mini-header-title">
      <img src="{cat_img}" style="width:22px; height:22px; border-radius:50%; object-fit:cover; border:1.5px solid #ff007f;">
      <span>Postrecitos Caseros por la Cirugía de Princesa 🐾</span>
    </div>
    <div class="mini-header-sub">
      📅 Entrega: Lun 30 Nov - Vie 4 Dic 2026 • Nequi: <strong>300 608 7608</strong>
    </div>
  </div>

  <div class="section-title" style="background: linear-gradient(90deg, #c41d7f, #eb2f96);">
    <span>3. CHEESECAKES PERSONALES (8 ONZAS) — $13.500 COP C/U</span>
    <span class="section-tag">QUESO CREMA PREMIUM • BASE CROCANTE DE GALLETA</span>
  </div>

  {render_cards(cheesecakes, cols=3, img_h=145)}

  <div style="margin-top: 10px; background: #fff0f6; border: 1.5px dashed #eb2f96; border-radius: 8px; padding: 8px 12px; text-align: center; color: #700040;">
    <strong style="font-size: 10px;">🧀 ¿Por qué nuestros cheesecakes son tan deliciosos?</strong>
    <p style="font-size: 8.5px; margin-top: 2px; line-height: 1.35; color: #551144;">
      Utilizamos queso crema de alta calidad, galleta triturada a mano y mermeladas 100% artesanales sin colorantes artificiales. ¡La textura perfecta para consentir tu paladar y apoyar una causa que salva vidas!
    </p>
  </div>

  <div class="footer">
    <span>🐾 Cada compra suma directamente a las facturas y medicamentos de Princesa</span>
    <span>Página 3 de 4 • Web: <strong>mayafloyd.github.io/princesa-donaciones/</strong></span>
  </div>
</div>

<!-- ================= PAGE 4 ================= -->
<div class="page">
  <div class="mini-header">
    <div class="mini-header-title">
      <img src="{cat_img}" style="width:22px; height:22px; border-radius:50%; object-fit:cover; border:1.5px solid #ff007f;">
      <span>Postrecitos Caseros por la Cirugía de Princesa 🐾</span>
    </div>
    <div class="mini-header-sub">
      📅 Entrega: Lun 30 Nov - Vie 4 Dic 2026 • WhatsApp: <strong>300 608 7608</strong>
    </div>
  </div>

  <div class="section-title" style="background: linear-gradient(90deg, #722ed1, #9254de);">
    <span>4. FORMATOS FAMILIARES & MEGAS (PARA COMPARTIR)</span>
    <span class="section-tag">9, 12 Y 15 PORCIONES • IDEAL REUNIONES</span>
  </div>

  {render_cards(familiares, cols=2, img_h=130)}

  <div class="order-guide">
    <div class="order-steps">
      <div class="order-title">¿CÓMO HACER TU PEDIDO Y APOYAR A PRINCESA? 🐾🧁</div>
      <div class="order-step-item">
        <strong>1. Elige tus postres:</strong> Revisa los sabores y formatos de este catálogo o en la web interactiva.
      </div>
      <div class="order-step-item">
        <strong>2. Escribe por WhatsApp a Sara Acevedo:</strong> Envía tu pedido al número <strong>300 608 7608</strong> indicando tus sabores y tu punto de entrega elegido (UdeA, UNAL, Alma Máter, UPB o dirección de domicilio).
      </div>
      <div class="order-step-item">
        <strong>3. Transfiere a Nequi:</strong> Envía tu aporte / pago a la cuenta Nequi <strong>300 608 7608</strong> y adjunta el comprobante por WhatsApp.
      </div>
      <div class="order-step-item">
        <strong>4. Fecha de Entrega:</strong> Los postres se entregarán en la <strong>semana del lunes 30 de noviembre al viernes 4 de diciembre de 2026</strong>.
      </div>
    </div>

    <div class="order-qr-col">
      <div class="qr-badge-card">
        <img src="{qr_web}" alt="QR Web">
        <span class="qr-badge-txt">PÁGINA WEB<br>INTERACTIVA</span>
      </div>
      <div class="qr-badge-card">
        <img src="{qr_nequi}" alt="QR Nequi">
        <span class="qr-badge-txt">NEQUI DIRECTO<br>300 608 7608</span>
      </div>
    </div>
  </div>

  <div style="margin-top: 8px; background: #f6ffed; border: 1.5px solid #b7eb8f; border-radius: 8px; padding: 7px 10px; text-align: center; color: #135200; font-size: 8.5px; line-height: 1.35;">
    💖 <strong>¡Un mensaje de agradecimiento de Princesa y Sara!</strong><br>
    Princesa ya superó con éxito su cirugía en el Hospital Veterinario UdeA y se encuentra recuperándose en casa. Gracias a cada persona que compra un postre o realiza una donación, podemos solventar los costos veterinarios, exámenes y medicamentos especiales. ¡Gracias de todo corazón por tu generosidad y apoyo! 🐾✨
  </div>

  <div class="footer">
    <span>🐾 Sara Acevedo • Nequi & WhatsApp: <strong>300 608 7608</strong> • Medellín, Colombia</span>
    <span>Página 4 de 4 • Web: <strong>mayafloyd.github.io/princesa-donaciones/</strong></span>
  </div>
</div>

</body>
</html>
'''

with open("/tmp/menu_template.html", "w", encoding="utf-8") as f:
    f.write(html_doc)

print("Generated /tmp/menu_template.html successfully!")
