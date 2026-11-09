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
qr_pdf = img_to_b64("assets/img/qr/qr-menu-pdf.png")

cheesecake_frutos = img_to_b64("assets/img/postres/cheesecake-frutos-rojos.jpg")
cremoso_milo = img_to_b64("assets/img/postres/cremoso-milo.jpg")
cremoso_brownie = img_to_b64("assets/img/postres/cremoso-brownie.jpg")
cheesecake_baileys = img_to_b64("assets/img/postres/cheesecake-baileys.jpg")

# =========================================================================
# 1. MODERN STORY FLYER (1080 x 1920) - CLEAN, ELEGANT, HUGE PHOTOS
# =========================================================================
story_html = f'''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}
  body {{
    width: 1080px;
    height: 1920px;
    background: #fbf7f4;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #26191f;
    overflow: hidden;
    position: relative;
    padding: 50px 52px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }}

  /* Soft warm background gradients */
  .bg-ambient-top {{
    position: absolute;
    top: -120px;
    right: -100px;
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(255, 226, 234, 0.8) 0%, rgba(251, 247, 244, 0) 70%);
    z-index: 0;
  }}
  .bg-ambient-bottom {{
    position: absolute;
    bottom: -150px;
    left: -120px;
    width: 750px;
    height: 750px;
    background: radial-gradient(circle, rgba(255, 237, 219, 0.7) 0%, rgba(251, 247, 244, 0) 70%);
    z-index: 0;
  }}

  .wrapper {{
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }}

  /* HEADER */
  .header {{
    text-align: center;
  }}
  .tag-badge {{
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #ffffff;
    border: 1.5px solid #f0ccd5;
    color: #c02652;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    padding: 9px 24px;
    border-radius: 30px;
    box-shadow: 0 4px 14px rgba(192, 38, 82, 0.08);
    margin-bottom: 16px;
  }}
  .hero-title {{
    font-family: 'Outfit', sans-serif;
    font-size: 60px;
    font-weight: 900;
    color: #24141c;
    line-height: 1.08;
    letter-spacing: -1px;
  }}
  .hero-title .highlight {{
    color: #c02652;
  }}
  .hero-sub {{
    font-size: 21px;
    color: #5c424e;
    margin-top: 10px;
    line-height: 1.35;
    max-width: 860px;
    margin-left: auto;
    margin-right: auto;
  }}

  /* DUAL HERO CARDS (HUGE & CRISP) */
  .duo-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
    margin: 16px 0;
  }}

  .hero-box {{
    background: #ffffff;
    border-radius: 32px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(38, 25, 31, 0.07);
    border: 1.5px solid #fae6ec;
    display: flex;
    flex-direction: column;
  }}

  .hero-img-wrap {{
    height: 420px;
    position: relative;
    overflow: hidden;
    background: #fbf0f3;
  }}

  .hero-img {{
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }}

  .floating-pill {{
    position: absolute;
    top: 20px;
    left: 20px;
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(10px);
    color: #24141c;
    font-size: 15px;
    font-weight: 800;
    padding: 8px 18px;
    border-radius: 20px;
    box-shadow: 0 4px 14px rgba(0,0,0,0.12);
    display: flex;
    align-items: center;
    gap: 8px;
  }}

  .hero-box-footer {{
    padding: 22px 24px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }}

  .box-title {{
    font-family: 'Outfit', sans-serif;
    font-size: 26px;
    font-weight: 800;
    color: #24141c;
    line-height: 1.15;
  }}

  .box-text {{
    font-size: 15.5px;
    color: #6e4f5d;
    margin-top: 6px;
    line-height: 1.35;
  }}

  /* VARIETY PREVIEW STRIP */
  .variety-strip {{
    display: flex;
    gap: 16px;
    justify-content: space-between;
  }}
  .variety-item {{
    background: #ffffff;
    border: 1.5px solid #f2dae1;
    border-radius: 20px;
    padding: 10px 18px;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 14px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.03);
  }}
  .variety-thumb {{
    width: 58px;
    height: 58px;
    border-radius: 14px;
    object-fit: cover;
    flex-shrink: 0;
  }}
  .variety-info {{
    line-height: 1.25;
  }}
  .variety-name {{
    font-size: 16px;
    font-weight: 800;
    color: #24141c;
  }}
  .variety-price {{
    font-size: 13.5px;
    font-weight: 700;
    color: #c02652;
    margin-top: 2px;
  }}

  /* DELIVERY BANNER */
  .delivery-card {{
    background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
    border: 2px solid #fed7aa;
    border-radius: 28px;
    padding: 24px 30px;
    box-shadow: 0 12px 30px rgba(234, 88, 12, 0.08);
    display: flex;
    align-items: center;
    gap: 24px;
  }}
  .delivery-badge-icon {{
    width: 76px;
    height: 76px;
    border-radius: 22px;
    background: #ea580c;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 38px;
    flex-shrink: 0;
    box-shadow: 0 8px 20px rgba(234, 88, 12, 0.28);
  }}
  .delivery-content {{
    flex-grow: 1;
  }}
  .delivery-label {{
    font-size: 14px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #c2410c;
    margin-bottom: 4px;
  }}
  .delivery-main-date {{
    font-family: 'Outfit', sans-serif;
    font-size: 29px;
    font-weight: 900;
    color: #9a3412;
    line-height: 1.15;
  }}
  .delivery-locations {{
    font-size: 16px;
    color: #7c2d12;
    margin-top: 6px;
    line-height: 1.35;
  }}
  .delivery-locations strong {{
    color: #431407;
  }}

  /* BOTTOM CARD WITH 2 QR CODES */
  .bottom-card {{
    background: #ffffff;
    border-radius: 32px;
    padding: 26px 32px;
    box-shadow: 0 20px 45px rgba(38, 25, 31, 0.08);
    border: 1.5px solid #fae6ec;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 32px;
  }}

  .order-details {{
    flex-grow: 1;
  }}
  .order-title-small {{
    font-size: 13.5px;
    font-weight: 800;
    text-transform: uppercase;
    color: #c02652;
    letter-spacing: 0.6px;
    margin-bottom: 4px;
  }}
  .order-title-big {{
    font-family: 'Outfit', sans-serif;
    font-size: 32px;
    font-weight: 800;
    color: #24141c;
    line-height: 1.15;
  }}
  .contact-buttons {{
    display: flex;
    gap: 14px;
    margin-top: 14px;
  }}
  .contact-pill {{
    background: #fbf2f5;
    border: 1.5px solid #f5cfdb;
    border-radius: 18px;
    padding: 10px 18px;
    display: flex;
    align-items: center;
    gap: 12px;
  }}
  .contact-pill-icon {{
    font-size: 24px;
  }}
  .contact-pill-label {{
    font-size: 11.5px;
    text-transform: uppercase;
    color: #884d5f;
    font-weight: 700;
  }}
  .contact-pill-val {{
    font-size: 19px;
    font-weight: 800;
    color: #24141c;
  }}

  /* QR CODES DUAL */
  .qr-dual {{
    display: flex;
    gap: 22px;
    flex-shrink: 0;
  }}
  .qr-item {{
    background: #ffffff;
    border: 1.5px solid #ebd0d8;
    border-radius: 24px;
    padding: 14px 16px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 6px 20px rgba(0,0,0,0.04);
  }}
  .qr-img {{
    width: 145px;
    height: 145px;
    display: block;
    border-radius: 10px;
  }}
  .qr-name {{
    font-size: 14px;
    font-weight: 800;
    color: #24141c;
    margin-top: 10px;
  }}
  .qr-sub {{
    font-size: 11px;
    color: #884d5f;
    margin-top: 2px;
  }}
</style>
</head>
<body>

<div class="bg-ambient-top"></div>
<div class="bg-ambient-bottom"></div>

<div class="wrapper">

  <!-- TOP HEADER -->
  <div class="header">
    <div class="tag-badge">
      <span>🐾</span>
      <span>Campaña Solidaria • Hospital Veterinario UdeA</span>
    </div>
    <h1 class="hero-title">¡Postrecitos Caseros <span class="highlight">por Princesa</span>!</h1>
    <p class="hero-sub">
      Disfruta postres 100% artesanales y ayúdanos a recaudar los fondos para su cirugía de cistotomía y recuperación.
    </p>
  </div>

  <!-- DUAL HERO CARDS: PRINCESA & CHEESECAKE HUGE -->
  <div class="duo-grid">
    <!-- Card Princesa -->
    <div class="hero-box">
      <div class="hero-img-wrap">
        <img src="{cat_img}" class="hero-img" alt="Princesa">
        <div class="floating-pill">
          <span>🐱👑</span>
          <span>Princesa</span>
        </div>
      </div>
      <div class="hero-box-footer">
        <div class="box-title">Nuestra Princesa 🐾💖</div>
        <div class="box-text">Operada con éxito en la Clínica UdeA. Cada postrecito ayuda a pagar sus controles y medicinas.</div>
      </div>
    </div>

    <!-- Card Featured Dessert -->
    <div class="hero-box">
      <div class="hero-img-wrap">
        <img src="{cheesecake_frutos}" class="hero-img" alt="Cheesecake Frutos Rojos">
        <div class="floating-pill" style="background:#c02652; color:#fff;">
          <span>⭐</span>
          <span>Personal 8 oz • $13.500</span>
        </div>
      </div>
      <div class="hero-box-footer">
        <div class="box-title">Cheesecake Frutos Rojos</div>
        <div class="box-text">Queso crema premium, base crocante de galleta y coulis artesanal de frutos rojos seleccionados.</div>
      </div>
    </div>
  </div>

  <!-- VARIETY STRIP -->
  <div class="variety-strip">
    <div class="variety-item">
      <img src="{cremoso_milo}" class="variety-thumb" alt="Cremoso Milo">
      <div class="variety-info">
        <div class="variety-name">Cremoso Milo</div>
        <div class="variety-price">$12.500 COP</div>
      </div>
    </div>

    <div class="variety-item">
      <img src="{cremoso_brownie}" class="variety-thumb" alt="Brownie Arequipe">
      <div class="variety-info">
        <div class="variety-name">Brownie & Arequipe</div>
        <div class="variety-price">$12.500 COP</div>
      </div>
    </div>

    <div class="variety-item">
      <img src="{cheesecake_baileys}" class="variety-thumb" alt="Cheesecake Baileys">
      <div class="variety-info">
        <div class="variety-name">Crema Baileys</div>
        <div class="variety-price">$13.500 COP</div>
      </div>
    </div>
  </div>

  <!-- DELIVERY DATE BANNER (HIGHLIGHTED AS REQUESTED) -->
  <div class="delivery-card">
    <div class="delivery-badge-icon">📅</div>
    <div class="delivery-content">
      <div class="delivery-label">Fecha de Entrega Confirmada • Productos Bajo Pedido</div>
      <div class="delivery-main-date">Semana del Lunes 30 de Noviembre al Viernes 4 de Diciembre</div>
      <div class="delivery-locations">
        📍 <strong>Puntos de Entrega GRATIS en Medellín:</strong> Porterías Sede Principal <strong>UdeA</strong>, Campus <strong>UNAL</strong> (Volador / Minas), Hospital <strong>Alma Máter</strong> y Clínica <strong>UPB</strong>.
      </div>
    </div>
  </div>

  <!-- BOTTOM CARD: ORDER + 2 QR CODES -->
  <div class="bottom-card">
    <div class="order-details">
      <div class="order-title-small">✨ Haz tu pedido con amor</div>
      <div class="order-title-big">Endulza tu día y apoya a Princesa</div>
      <div class="contact-buttons">
        <div class="contact-pill">
          <span class="contact-pill-icon">💬</span>
          <div>
            <div class="contact-pill-label">WhatsApp Sara</div>
            <div class="contact-pill-val">300 608 7608</div>
          </div>
        </div>
        <div class="contact-pill">
          <span class="contact-pill-icon">💜</span>
          <div>
            <div class="contact-pill-label">Nequi</div>
            <div class="contact-pill-val">300 608 7608</div>
          </div>
        </div>
      </div>
    </div>

    <div class="qr-dual">
      <div class="qr-item">
        <img src="{qr_web}" class="qr-img" alt="QR Web">
        <div class="qr-name">🌐 Ver Página Web</div>
        <div class="qr-sub">Historia y pedido online</div>
      </div>

      <div class="qr-item">
        <img src="{qr_pdf}" class="qr-img" alt="QR PDF">
        <div class="qr-name">📄 Menú en PDF</div>
        <div class="qr-sub">Carta con fotos grandes</div>
      </div>
    </div>
  </div>

</div>

</body>
</html>
'''

# =========================================================================
# 2. MODERN FEED FLYER (1080 x 1350) - INSTAGRAM FEED / WHATSAPP CHAT
# =========================================================================
feed_html = f'''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}
  body {{
    width: 1080px;
    height: 1350px;
    background: #fbf7f4;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #26191f;
    overflow: hidden;
    position: relative;
    padding: 36px 42px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }}

  .wrapper {{
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }}

  /* HEADER */
  .header {{
    text-align: center;
  }}
  .tag-badge {{
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #ffffff;
    border: 1.5px solid #f0ccd5;
    color: #c02652;
    font-size: 13.5px;
    font-weight: 800;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    padding: 6px 18px;
    border-radius: 30px;
    box-shadow: 0 4px 14px rgba(192, 38, 82, 0.08);
    margin-bottom: 8px;
  }}
  .hero-title {{
    font-family: 'Outfit', sans-serif;
    font-size: 46px;
    font-weight: 900;
    color: #24141c;
    line-height: 1.08;
    letter-spacing: -0.5px;
  }}
  .hero-title .highlight {{
    color: #c02652;
  }}
  .hero-sub {{
    font-size: 17px;
    color: #5c424e;
    margin-top: 6px;
    line-height: 1.3;
  }}

  /* DUAL HERO CARDS */
  .duo-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin: 10px 0;
  }}

  .hero-box {{
    background: #ffffff;
    border-radius: 26px;
    overflow: hidden;
    box-shadow: 0 16px 36px rgba(38, 25, 31, 0.07);
    border: 1.5px solid #fae6ec;
    display: flex;
    flex-direction: column;
  }}

  .hero-img-wrap {{
    height: 310px;
    position: relative;
    overflow: hidden;
    background: #fbf0f3;
  }}

  .hero-img {{
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }}

  .floating-pill {{
    position: absolute;
    top: 14px;
    left: 14px;
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(10px);
    color: #24141c;
    font-size: 13.5px;
    font-weight: 800;
    padding: 6px 14px;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  }}

  .hero-box-footer {{
    padding: 16px 20px;
    background: #ffffff;
  }}

  .box-title {{
    font-family: 'Outfit', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: #24141c;
    line-height: 1.15;
  }}

  .box-text {{
    font-size: 13.5px;
    color: #6e4f5d;
    margin-top: 4px;
    line-height: 1.3;
  }}

  /* DELIVERY BANNER */
  .delivery-card {{
    background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
    border: 2px solid #fed7aa;
    border-radius: 22px;
    padding: 16px 22px;
    box-shadow: 0 10px 24px rgba(234, 88, 12, 0.08);
    display: flex;
    align-items: center;
    gap: 18px;
  }}
  .delivery-badge-icon {{
    width: 62px;
    height: 62px;
    border-radius: 18px;
    background: #ea580c;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    flex-shrink: 0;
    box-shadow: 0 6px 16px rgba(234, 88, 12, 0.28);
  }}
  .delivery-content {{
    flex-grow: 1;
  }}
  .delivery-label {{
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    color: #c2410c;
    margin-bottom: 2px;
  }}
  .delivery-main-date {{
    font-family: 'Outfit', sans-serif;
    font-size: 24px;
    font-weight: 900;
    color: #9a3412;
    line-height: 1.15;
  }}
  .delivery-locations {{
    font-size: 13.5px;
    color: #7c2d12;
    margin-top: 4px;
    line-height: 1.3;
  }}

  /* BOTTOM CARD WITH 2 QR CODES */
  .bottom-card {{
    background: #ffffff;
    border-radius: 26px;
    padding: 18px 24px;
    box-shadow: 0 16px 36px rgba(38, 25, 31, 0.08);
    border: 1.5px solid #fae6ec;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 22px;
  }}

  .order-details {{
    flex-grow: 1;
  }}
  .order-title-big {{
    font-family: 'Outfit', sans-serif;
    font-size: 25px;
    font-weight: 800;
    color: #24141c;
    line-height: 1.15;
  }}
  .contact-buttons {{
    display: flex;
    gap: 12px;
    margin-top: 10px;
  }}
  .contact-pill {{
    background: #fbf2f5;
    border: 1.5px solid #f5cfdb;
    border-radius: 14px;
    padding: 8px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }}
  .contact-pill-icon {{
    font-size: 20px;
  }}
  .contact-pill-label {{
    font-size: 10.5px;
    text-transform: uppercase;
    color: #884d5f;
    font-weight: 700;
  }}
  .contact-pill-val {{
    font-size: 16px;
    font-weight: 800;
    color: #24141c;
  }}

  /* QR CODES DUAL */
  .qr-dual {{
    display: flex;
    gap: 16px;
    flex-shrink: 0;
  }}
  .qr-item {{
    background: #ffffff;
    border: 1.5px solid #ebd0d8;
    border-radius: 18px;
    padding: 10px 12px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }}
  .qr-img {{
    width: 105px;
    height: 105px;
    display: block;
    border-radius: 8px;
  }}
  .qr-name {{
    font-size: 12px;
    font-weight: 800;
    color: #24141c;
    margin-top: 6px;
  }}
  .qr-sub {{
    font-size: 9.5px;
    color: #884d5f;
  }}
</style>
</head>
<body>

<div class="wrapper">

  <!-- TOP HEADER -->
  <div class="header">
    <div class="tag-badge">
      <span>🐾</span>
      <span>Campaña Solidaria • Hospital Veterinario UdeA</span>
    </div>
    <h1 class="hero-title">¡Postrecitos Caseros <span class="highlight">por Princesa</span>!</h1>
    <p class="hero-sub">
      Disfruta postres artesanales y ayúdanos a cubrir los costos de su cirugía y recuperación.
    </p>
  </div>

  <!-- DUAL HERO CARDS: PRINCESA & CHEESECAKE HUGE -->
  <div class="duo-grid">
    <div class="hero-box">
      <div class="hero-img-wrap">
        <img src="{cat_img}" class="hero-img" alt="Princesa">
        <div class="floating-pill">
          <span>🐱👑 Princesa</span>
        </div>
      </div>
      <div class="hero-box-footer">
        <div class="box-title">Nuestra Princesa 🐾💖</div>
        <div class="box-text">Operada con éxito. Cada postre ayuda a pagar sus controles y medicinas.</div>
      </div>
    </div>

    <div class="hero-box">
      <div class="hero-img-wrap">
        <img src="{cheesecake_frutos}" class="hero-img" alt="Cheesecake Frutos Rojos">
        <div class="floating-pill" style="background:#c02652; color:#fff;">
          <span>⭐ Desde $12.500</span>
        </div>
      </div>
      <div class="hero-box-footer">
        <div class="box-title">Cheesecake Frutos Rojos</div>
        <div class="box-text">Queso crema premium, galleta crocante y coulis artesanal de frutos rojos.</div>
      </div>
    </div>
  </div>

  <!-- DELIVERY DATE BANNER -->
  <div class="delivery-card">
    <div class="delivery-badge-icon">📅</div>
    <div class="delivery-content">
      <div class="delivery-label">Fecha de Entrega • Productos Bajo Pedido</div>
      <div class="delivery-main-date">Semana del Lunes 30 de Noviembre al Viernes 4 de Diciembre</div>
      <div class="delivery-locations">
        📍 <strong>Entregas GRATIS:</strong> Porterías UdeA, Campus UNAL, Hospital Alma Máter y Clínica UPB.
      </div>
    </div>
  </div>

  <!-- BOTTOM CARD: ORDER + 2 QR CODES -->
  <div class="bottom-card">
    <div class="order-details">
      <div class="order-title-big">Endulza tu día y apoya a Princesa</div>
      <div class="contact-buttons">
        <div class="contact-pill">
          <span class="contact-pill-icon">💬</span>
          <div>
            <div class="contact-pill-label">WhatsApp Sara</div>
            <div class="contact-pill-val">300 608 7608</div>
          </div>
        </div>
        <div class="contact-pill">
          <span class="contact-pill-icon">💜</span>
          <div>
            <div class="contact-pill-label">Nequi</div>
            <div class="contact-pill-val">300 608 7608</div>
          </div>
        </div>
      </div>
    </div>

    <div class="qr-dual">
      <div class="qr-item">
        <img src="{qr_web}" class="qr-img" alt="QR Web">
        <div class="qr-name">🌐 Página Web</div>
        <div class="qr-sub">Historia y pedidos</div>
      </div>

      <div class="qr-item">
        <img src="{qr_pdf}" class="qr-img" alt="QR PDF">
        <div class="qr-name">📄 Menú en PDF</div>
        <div class="qr-sub">Fotos grandes</div>
      </div>
    </div>
  </div>

</div>

</body>
</html>
'''

with open("/tmp/new_promo_story.html", "w", encoding="utf-8") as f:
    f.write(story_html)

with open("/tmp/new_promo_feed.html", "w", encoding="utf-8") as f:
    f.write(feed_html)

print("Generated HTML for both modern flyers successfully!")
