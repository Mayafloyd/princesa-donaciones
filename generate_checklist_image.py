#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw, ImageFont

def create_checklist():
    W, H = 1080, 2080
    img = Image.new("RGB", (W, H), color=(255, 238, 246))
    draw = ImageDraw.Draw(img)

    # Cargar fuentes
    font_bold_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
    font_reg_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

    f_win_title = ImageFont.truetype(font_bold_path, 32)
    f_main_title = ImageFont.truetype(font_bold_path, 40)
    f_subtitle = ImageFont.truetype(font_bold_path, 26)
    f_badge = ImageFont.truetype(font_bold_path, 22)
    f_sec_title = ImageFont.truetype(font_bold_path, 30)
    f_item_title = ImageFont.truetype(font_bold_path, 26)
    f_item_desc = ImageFont.truetype(font_reg_path, 21)
    f_footer = ImageFont.truetype(font_bold_path, 24)

    # Fondo con degradado sutil
    for y in range(H):
        ratio = y / H
        r = int(255 - ratio * 15)
        g = int(238 - ratio * 20)
        b = int(246 + ratio * 8)
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    # Sombra de la ventana
    card_x0, card_y0 = 45, 45
    card_x1, card_y1 = W - 45, H - 45
    draw.rounded_rectangle([card_x0 + 10, card_y0 + 12, card_x1 + 10, card_y1 + 12], radius=28, fill=(216, 27, 96, 60))

    # Tarjeta blanca principal
    draw.rounded_rectangle([card_x0, card_y0, card_x1, card_y1], radius=28, fill=(255, 255, 255), outline=(255, 119, 169), width=4)

    # Barra superior estilo Windows 98 / Retro
    header_h = 75
    draw.rounded_rectangle([card_x0, card_y0, card_x1, card_y0 + header_h + 15], radius=24, fill=(216, 27, 96))
    draw.rectangle([card_x0, card_y0 + header_h, card_x1, card_y0 + header_h + 15], fill=(216, 27, 96)) # cuadrar base
    draw.text((card_x0 + 30, card_y0 + 20), "PRINCESA_QUEST_CHECKLIST.EXE", fill=(255, 255, 255), font=f_win_title)

    # Botones retro
    dot_r = 10
    dot_y = card_y0 + 38
    draw.ellipse([card_x1 - 95 - dot_r, dot_y - dot_r, card_x1 - 95 + dot_r, dot_y + dot_r], fill=(255, 235, 59), outline=(255, 255, 255), width=2)
    draw.ellipse([card_x1 - 60 - dot_r, dot_y - dot_r, card_x1 - 60 + dot_r, dot_y + dot_r], fill=(0, 230, 118), outline=(255, 255, 255), width=2)
    draw.ellipse([card_x1 - 25 - dot_r, dot_y - dot_r, card_x1 - 25 + dot_r, dot_y + dot_r], fill=(255, 82, 82), outline=(255, 255, 255), width=2)

    cur_y = card_y0 + header_h + 35

    # Banner de Bienvenida
    banner_x0 = card_x0 + 30
    banner_x1 = card_x1 - 30
    banner_h = 160
    draw.rounded_rectangle([banner_x0, cur_y, banner_x1, cur_y + banner_h], radius=20, fill=(255, 245, 250), outline=(255, 119, 169), width=3)
    
    # Texto Banner
    title_text = "Material Pendiente para la Web Princesa"
    sub_text = "Checklist de archivos para dejar la tiendita 100% verificada"
    url_text = "mayafloyd.github.io/princesa-donaciones"

    draw.text((W // 2, cur_y + 25), title_text, fill=(136, 14, 79), font=f_main_title, anchor="mt")
    draw.text((W // 2, cur_y + 80), sub_text, fill=(99, 51, 77), font=f_subtitle, anchor="mt")
    
    # Pill URL
    url_w = 480
    url_h = 36
    url_y = cur_y + 115
    draw.rounded_rectangle([(W - url_w) // 2, url_y, (W + url_w) // 2, url_y + url_h], radius=18, fill=(136, 14, 79))
    draw.text((W // 2, url_y + 6), url_text, fill=(255, 255, 255), font=f_badge, anchor="mt")

    cur_y += banner_h + 30

    # SECCIONES
    sections = [
        {
            "title": "1. Documentos Médicos (UdeA) • Confianza",
            "items": [
                ("Ecografía del Cálculo y Úlcera (PDF o Foto)", "Muestra la ecografía oficial donde se identificó el cálculo vesical."),
                ("Historia Clínica / Orden de Cirugía UdeA", "Formato membretado de la Clínica Veterinaria de la UdeA."),
                ("Cotización / Presupuesto de Cirugía ($2.900.000)", "Comprobante de quirófano, anestesia inhalatoria y hospitalización."),
                ("Fecha programada de la cirugía", "Para informar la fecha límite a los donantes.")
            ]
        },
        {
            "title": "2. Merch & Ilustraciones (100% Arte Humano)",
            "items": [
                ("Diseño de Stickers Holográficos", "Foto o arte final del pack de stickers de Princesa."),
                ("Fotos o Mockups de Camisetas + Tallas", "Foto del estampado y confirmación de tallas (S, M, L, XL)."),
                ("Fotos o Mockups de Mugs & Tote Bags", "Diseño real aplicado a las tazas y bolsas de tela."),
                ("Vista Previa Calendario 2027", "Portada y 1 mes de muestra del calendario de memes."),
                ("Nombre o Instagram de tu amiga artista", "Para darle el crédito y enlazar su portafolio en la web.")
            ]
        },
        {
            "title": "3. Postrecitos & Datos de Pago",
            "items": [
                ("Fotos reales de los postres caseros", "Brownies, galletitas o cupcakes empacados y listos."),
                ("Días de horneado y entregas", "Ej: 'Horneados los jueves, entregas viernes y sábados'."),
                ("Código QR oficial de Nequi (App Nequi)", "Para escanear directamente desde la pantalla de cualquier PC."),
                ("Foto de Princesa en la clínica o con carnet", "Para la sección clínica y generar mayor cercanía.")
            ]
        }
    ]

    for sec in sections:
        sec_x0 = card_x0 + 30
        sec_x1 = card_x1 - 30
        
        # Calcular altura de sección
        items_h = len(sec["items"]) * 82
        sec_h = 60 + items_h + 15

        # Caja de sección
        draw.rounded_rectangle([sec_x0, cur_y, sec_x1, cur_y + sec_h], radius=18, fill=(250, 244, 248), outline=(255, 209, 235), width=2)
        
        # Título de sección
        draw.text((sec_x0 + 20, cur_y + 16), sec["title"], fill=(136, 14, 79), font=f_sec_title)
        draw.line([(sec_x0 + 20, cur_y + 54), (sec_x1 - 20, cur_y + 54)], fill=(255, 209, 235), width=2)

        item_y = cur_y + 68
        for title, desc in sec["items"]:
            # Casilla de verificación
            cb_w, cb_h = 30, 30
            draw.rounded_rectangle([sec_x0 + 24, item_y + 4, sec_x0 + 24 + cb_w, item_y + 4 + cb_h], radius=7, fill=(255, 255, 255), outline=(255, 119, 169), width=3)
            
            # Textos del item
            draw.text((sec_x0 + 72, item_y), title, fill=(74, 21, 75), font=f_item_title)
            draw.text((sec_x0 + 72, item_y + 32), desc, fill=(109, 76, 93), font=f_item_desc)
            
            item_y += 82

        cur_y += sec_h + 24

    # Footer note
    footer_x0 = card_x0 + 30
    footer_x1 = card_x1 - 30
    footer_h = 75
    draw.rounded_rectangle([footer_x0, cur_y, footer_x1, cur_y + footer_h], radius=18, fill=(216, 27, 96))
    footer_msg = "No hay prisa: tu web ya está activa. ¡A medida que tengas cada archivo, me lo pasas! 🐾"
    draw.text((W // 2, cur_y + 24), footer_msg, fill=(255, 255, 255), font=f_footer, anchor="mt")

    # Guardar en proyectos y en Pictures
    out_proj = "/home/sara/Documents/Proyectos/princesa-page/checklist-princesa.png"
    out_pics = "/home/sara/Pictures/checklist-princesa.png"
    
    img.save(out_proj, "PNG", quality=95)
    img.save(out_pics, "PNG", quality=95)
    print("Guardado en:", out_proj)
    print("Guardado en:", out_pics)

if __name__ == "__main__":
    create_checklist()
