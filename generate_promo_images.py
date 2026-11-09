import base64
import os
import subprocess

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
qr_pdf = img_to_b64("assets/img/qr/qr-menu-pdf.png")

cheesecake_frutos = img_to_b64("assets/img/postres/cheesecake-frutos-rojos.jpg")
cremoso_milo = img_to_b64("assets/img/postres/cremoso-milo.jpg")
cremoso_brownie = img_to_b64("assets/img/postres/cremoso-brownie.jpg")
cremoso_maracuya = img_to_b64("assets/img/postres/cremoso-maracuya.jpg")
cheesecake_baileys = img_to_b64("assets/img/postres/cheesecake-baileys.jpg")

# ==========================================
# 1. VERTICAL STORY FLYER (1080 x 1920)
# ==========================================
story_html = f'''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<style>
  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}
  body {{
    width: 1080px;
    height: 1920px;
    background: linear-gradient(180deg, #fff2f8 0%, #ffe4f0 40%, #ffd0e5 100%);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #331133;
    overflow: hidden;
    position: relative;
    padding: 38px 42px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }}

  /* Background decorative shapes */
  .bg-circle-1 {{
    position: absolute;
    top: -80px;
    right: -80px;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,119,169,0.3) 0%, rgba(255,255,255,0) 70%);
    z-index: 0;
  }}
  .bg-circle-2 {{
    position: absolute;
    bottom: 200px;
    left: -100px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,0,127,0.18) 0%, rgba(255,255,255,0) 70%);
    z-index: 0;
  }}

  .content-wrap {{
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }}

  /* Top Hero Header */
  .header-card {{
    background: rgba(255, 255, 255, 0.94);
    border: 3px solid #ff77a9;
    border-radius: 26px;
    padding: 24px 28px;
    box-shadow: 0 10px 25px rgba(255, 0, 128, 0.12);
    display: flex;
    align-items: center;
    gap: 24px;
  }}
  .cat-avatar-wrap {{
    position: relative;
    flex-shrink: 0;
  }}
  .cat-avatar {{
    width: 140px;
    height: 140px;
    border-radius: 50%;
    border: 4px solid #ff007f;
    object-fit: cover;
    box-shadow: 0 6px 16px rgba(112, 0, 64, 0.25);
  }}
  .cat-badge-float {{
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    background: #ff007f;
    color: #fff;
    font-size: 14px;
    font-weight: 900;
    padding: 4px 12px;
    border-radius: 14px;
    white-space: nowrap;
    border: 2px solid #fff;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  }}
  .header-text {{
    flex-grow: 1;
  }}
  .badge-tag {{
    display: inline-block;
    background: #700040;
    color: #ffeef6;
    font-size: 13px;
    font-weight: 800;
    padding: 5px 14px;
    border-radius: 20px;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }}
  .main-title {{
    font-size: 34px;
    font-weight: 900;
    color: #700040;
    line-height: 1.12;
  }}
  .main-subtitle {{
    font-size: 16.5px;
    color: #551144;
    margin-top: 6px;
    line-height: 1.35;
  }}
  .main-subtitle strong {{
    color: #c41d7f;
  }}

  /* Hero Dessert Showcase */
  .dessert-showcase {{
    background: #ffffff;
    border: 3.5px solid #ff007f;
    border-radius: 28px;
    padding: 24px 28px;
    box-shadow: 0 12px 30px rgba(136, 14, 79, 0.15);
  }}
  .showcase-header {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
    border-bottom: 2px dashed #ffb6c1;
    padding-bottom: 12px;
  }}
  .showcase-tag {{
    font-size: 21px;
    font-weight: 900;
    color: #880e4f;
    display: flex;
    align-items: center;
    gap: 8px;
  }}
  .showcase-price-pill {{
    background: linear-gradient(135deg, #ff007f, #c41d7f);
    color: #ffffff;
    font-size: 17px;
    font-weight: 900;
    padding: 6px 18px;
    border-radius: 20px;
    box-shadow: 0 3px 8px rgba(196, 29, 127, 0.3);
  }}

  /* Dual Featured Grid */
  .hero-postres-grid {{
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 20px;
  }}
  .hero-card-large {{
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    height: 310px;
    border: 3px solid #ffccd9;
    box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  }}
  .hero-card-large img {{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }}
  .hero-card-badge {{
    position: absolute;
    top: 14px;
    left: 14px;
    background: rgba(112, 0, 64, 0.92);
    color: #fff;
    font-size: 15px;
    font-weight: 900;
    padding: 6px 14px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.4);
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  }}
  .hero-card-desc-overlay {{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(0deg, rgba(74, 21, 75, 0.94) 0%, rgba(74, 21, 75, 0) 100%);
    padding: 24px 16px 12px 16px;
    color: #ffffff;
    font-size: 14px;
    line-height: 1.25;
  }}

  /* Mini Bestsellers Column */
  .mini-samples-col {{
    display: flex;
    flex-direction: column;
    gap: 12px;
    justify-content: space-between;
  }}
  .mini-dessert-item {{
    display: flex;
    align-items: center;
    gap: 12px;
    background: #fff5fa;
    border: 2px solid #ffd6eb;
    border-radius: 16px;
    padding: 8px 12px;
  }}
  .mini-dessert-img {{
    width: 74px;
    height: 74px;
    border-radius: 12px;
    object-fit: cover;
    border: 2px solid #ff77a9;
    flex-shrink: 0;
  }}
  .mini-dessert-title {{
    font-size: 15px;
    font-weight: 800;
    color: #700040;
    line-height: 1.2;
  }}
  .mini-dessert-desc {{
    font-size: 12px;
    color: #663355;
    margin-top: 2px;
    line-height: 1.2;
  }}

  /* Delivery Date Banner (HIGHLIGHTED AS REQUESTED) */
  .delivery-highlight-box {{
    background: linear-gradient(135deg, #fff8e6 0%, #fff1b8 100%);
    border: 3.5px dashed #d46b08;
    border-radius: 24px;
    padding: 20px 24px;
    box-shadow: 0 8px 20px rgba(212, 107, 8, 0.15);
    text-align: center;
  }}
  .delivery-badge-pill {{
    display: inline-block;
    background: #d4380d;
    color: #ffffff;
    font-size: 15px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 6px 18px;
    border-radius: 14px;
    margin-bottom: 8px;
  }}
  .delivery-headline {{
    font-size: 28px;
    font-weight: 900;
    color: #ad2102;
    line-height: 1.15;
    margin-bottom: 8px;
  }}
  .delivery-spots {{
    font-size: 15px;
    color: #592400;
    line-height: 1.4;
  }}
  .delivery-spots strong {{
    color: #871400;
  }}

  /* QR Section Dual */
  .qr-section {{
    background: rgba(255, 255, 255, 0.95);
    border: 3px solid #b37feb;
    border-radius: 26px;
    padding: 22px 24px;
    box-shadow: 0 8px 24px rgba(114, 46, 209, 0.12);
  }}
  .qr-section-title {{
    font-size: 20px;
    font-weight: 900;
    color: #531dab;
    text-align: center;
    margin-bottom: 16px;
  }}
  .qr-dual-row {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }}
  .qr-card {{
    background: #fbf5ff;
    border: 2px solid #d3adf7;
    border-radius: 18px;
    padding: 16px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }}
  .qr-card-img {{
    width: 175px;
    height: 175px;
    background: #fff;
    padding: 8px;
    border-radius: 14px;
    border: 2px solid #b37feb;
    box-shadow: 0 4px 12px rgba(83, 29, 171, 0.15);
  }}
  .qr-card-title {{
    font-size: 16px;
    font-weight: 900;
    color: #391085;
    margin-top: 10px;
  }}
  .qr-card-sub {{
    font-size: 12.5px;
    color: #531dab;
    margin-top: 3px;
    line-height: 1.25;
  }}

  /* Contact & Nequi Footer */
  .contact-footer {{
    background: linear-gradient(135deg, #700040 0%, #4a002b 100%);
    color: #ffffff;
    border-radius: 22px;
    padding: 18px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 6px 18px rgba(74, 0, 43, 0.3);
  }}
  .contact-item {{
    display: flex;
    align-items: center;
    gap: 12px;
  }}
  .contact-icon-bubble {{
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    flex-shrink: 0;
  }}
  .contact-label {{
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #ffb6c1;
  }}
  .contact-val {{
    font-size: 20px;
    font-weight: 900;
    color: #ffffff;
  }}
  .love-tag {{
    font-size: 12px;
    color: #ffd6eb;
    text-align: right;
    line-height: 1.3;
  }}
</style>
</head>
<body>

<div class="bg-circle-1"></div>
<div class="bg-circle-2"></div>

<div class="content-wrap">

  <!-- TOP HEADER -->
  <div class="header-card">
    <div class="cat-avatar-wrap">
      <img src="{cat_img}" class="cat-avatar" alt="Princesa">
      <div class="cat-badge-float">Princesa 🐾</div>
    </div>
    <div class="header-text">
      <div class="badge-tag">🐾 Campaña Solidaria • Clínica UdeA</div>
      <h1 class="main-title">¡POSTRECITOS CASEROS CON CAUSA! 🍮✨</h1>
      <p class="main-subtitle">
        Apóyanos a cubrir la <strong>cirugía de cálculo vesical</strong> y recuperación de Princesa. ¡Endulza tu día y salva una vida!
      </p>
    </div>
  </div>

  <!-- SHOWCASE POSTRES -->
  <div class="dessert-showcase">
    <div class="showcase-header">
      <div class="showcase-tag">
        <span>🧁</span>
        <span>100% Artesanales • Más de 20 Sabores</span>
      </div>
      <div class="showcase-price-pill">Desde $12.500 COP</div>
    </div>

    <div class="hero-postres-grid">
      <!-- Large Hero Card -->
      <div class="hero-card-large">
        <img src="{cheesecake_frutos}" alt="Cheesecake Frutos Rojos">
        <div class="hero-card-badge">⭐ CHEESECAKE FRUTOS ROJOS</div>
        <div class="hero-card-desc-overlay">
          <strong>Queso crema premium</strong>, base crocante de galleta y coulis artesanal de frutos rojos naturales. ¡Una delicia inolvidable!
        </div>
      </div>

      <!-- Mini Bestsellers -->
      <div class="mini-samples-col">
        <div class="mini-dessert-item">
          <img src="{cremoso_milo}" class="mini-dessert-img" alt="Cremoso Milo">
          <div>
            <div class="mini-dessert-title">Cremoso Milo 8 oz</div>
            <div class="mini-dessert-desc">3 leches tradicional y abundante topping crocante de Milo. ($12.500)</div>
          </div>
        </div>

        <div class="mini-dessert-item">
          <img src="{cremoso_brownie}" class="mini-dessert-img" alt="Cremoso Brownie">
          <div>
            <div class="mini-dessert-title">Brownie & Arequipe</div>
            <div class="mini-dessert-desc">Bizcocho de brownie húmedo, 3 leches y dulce arequipe. ($12.500)</div>
          </div>
        </div>

        <div class="mini-dessert-item">
          <img src="{cheesecake_baileys}" class="mini-dessert-img" alt="Cheesecake Baileys">
          <div>
            <div class="mini-dessert-title">Cheesecake Baileys</div>
            <div class="mini-dessert-desc">Whisky crema, notas de café y virutas de chocolate. ($13.500)</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- DELIVERY DATE HIGHLIGHT -->
  <div class="delivery-highlight-box">
    <div class="delivery-badge-pill">📅 FECHA DE ENTREGA CONFIRMADA</div>
    <div class="delivery-headline">Semana del Lunes 30 de Noviembre<br>al Viernes 4 de Diciembre</div>
    <div class="delivery-spots">
      📦 <strong>Elaborados frescos 100% bajo pedido previo.</strong><br>
      📍 <strong>Puntos de Entrega GRATIS en Medellín:</strong> Porterías Sede Principal <strong>UdeA</strong>, Campus <strong>UNAL</strong> (Volador / Minas), Hospital <strong>Alma Máter</strong> y Clínica <strong>UPB</strong>.<br>
      🛵 <em>Domicilios disponibles en Medellín a cargo del comprador (DiDi / Uber Flash).</em>
    </div>
  </div>

  <!-- 2 QR CODES CLEARLY SEPARATED -->
  <div class="qr-section">
    <div class="qr-section-title">📱 ESCANEA PARA CONOCER MÁS Y ORDENAR</div>
    <div class="qr-dual-row">
      <!-- QR Web -->
      <div class="qr-card">
        <img src="{qr_web}" class="qr-card-img" alt="QR Web Princesa">
        <div class="qr-card-title">🌐 PÁGINA WEB OFICIAL</div>
        <div class="qr-card-sub">Conoce la historia, facturas médicas y haz tu pedido interactivo</div>
      </div>

      <!-- QR PDF -->
      <div class="qr-card">
        <img src="{qr_pdf}" class="qr-card-img" alt="QR Menu PDF">
        <div class="qr-card-title">📄 MENÚ COMPLETO EN PDF</div>
        <div class="qr-card-sub">Descarga el catálogo ilustrado con fotos grandes de todos los sabores</div>
      </div>
    </div>
  </div>

  <!-- CONTACT FOOTER -->
  <div class="contact-footer">
    <div class="contact-item">
      <div class="contact-icon-bubble">💬</div>
      <div>
        <div class="contact-label">Pedidos WhatsApp</div>
        <div class="contact-val">300 608 7608</div>
      </div>
    </div>

    <div class="contact-item">
      <div class="contact-icon-bubble">💜</div>
      <div>
        <div class="contact-label">Transferencias Nequi</div>
        <div class="contact-val">300 608 7608</div>
      </div>
    </div>

    <div class="love-tag">
      Sara Acevedo<br>
      <strong>¡Gracias por apoyar a Princesa! 🐾💖</strong>
    </div>
  </div>

</div>

</body>
</html>
'''

with open("/tmp/promo_story.html", "w", encoding="utf-8") as f:
    f.write(story_html)

print("Generated /tmp/promo_story.html")
