# 🐾 Página de Recaudación para la Cirugía de Princesa 🐱💖

Página web con estética **Old Web / Y2K Girlie** (inspirada en Web Design Museum, Geocities y los inicios de los 2000s), completamente moderna, intuitiva y responsive (adaptada al 100% para celulares y computadores).

---

## 🛵 Cálculo de Tarifas de Entrega (DiDi & Uber Flash)
**Punto de Origen de los despachos:** `Sector Chagualo / UdeA, Medellín`  
*(Sector Chagualo / SIU / Ciudad Universitaria UdeA)*

Basado en las tarifas habituales de moto en Medellín (banderazo de $4.500 - $5.500 + $1.000 - $1.400 por km):

| Zona de Entrega | Barrios / Sectores | Distancia | Tarifa DiDi / Uber Flash |
| :--- | :--- | :--- | :--- |
| **Puntos Gratuitos ($0)** | Universidad de Antioquia (UdeA) / Universidad Nacional (UNAL) / Hospital Alma Máter / Hospital UPB | Puntos fijos | **GRATIS ($0 COP)** |
| **Zona 1 (Cercana)** | Centro, Chagualo, Prado, Sevilla, Aranjuez, Robledo bajo (Fac. Agrarias), Boston | 2 a 4 km | **$6.500 COP** |
| **Zona 2 (Media)** | Laureles, Estadio, Belén, Floresta, Conquistadores, San Joaquín, Robledo medio | 5 a 8 km | **$9.500 COP** |
| **Zona 3 (Sur/Norte)** | El Poblado (Manila, Provenza, Castropol), Envigado casco urbano, Bello (Cabañas) | 8 a 13 km | **$13.500 COP** |
| **Zona 4 (Extremos)** | Sabaneta, Itagüí sur, Caldas, Copacabana, San Antonio de Prado | 14 a 22 km | **$17.500 COP** |
| **Tarifa Plana Estándar** | Promedio sugerido para envíos en moto en Medellín casco urbano | Urbana general | **$9.000 COP** |
| **Nacional** | Resto de Colombia (Interrapidísimo / Coordinadora con guía) | Fuera de Medellín | **$15.000 COP** |

El comprador selecciona su zona en el carrito y el sistema suma automáticamente el envío al total a transferir por Nequi.

---

## 🔒 Privacidad y Almacenamiento con Google Sheets

Al alojar la web públicamente en GitHub Pages, **la privacidad de los clientes es absoluta**:
1. **Sin paneles vulnerables en GitHub:** La web no tiene ningún modal o ventana de base de datos que personas curiosas puedan ver o inspeccionar en el código de GitHub.
2. **Conexión directa a tu Google Sheets privado:** Cada pedido confirmado se envía automáticamente a una hoja de cálculo en **tu Google Drive personal**.
3. **Comprobante para el Cliente:** Al confirmar, el comprador puede descargar su recibo digital (`Recibo_PRINCESA-XXXX.txt`) y se le abre WhatsApp con el mensaje estructurado para adjuntar el comprobante de pago Nequi.

---

## ☁️ Conexión con Google Sheets (Pedidos y Muro Comunitario en Vivo)

1. Abre tu hoja de cálculo de Google Sheets donde recibes los pedidos.
2. En el menú superior ve a: **Extensiones -> Apps Script**.
3. Pega el contenido completo actualizado de [`google-apps-script.js`](file:///home/sara/Documents/Proyectos/princesa-page/google-apps-script.js).
4. (Opcional): Selecciona `setupSheet` y haz clic en **Ejecutar** (▶️) para configurar automáticamente las dos pestañas con estilo retro rosado:
   - `Pedidos Princesa`: Todos los pedidos con selector de estado y desglose.
   - `Muro de Apoyo`: Los mensajes comunitarios que los visitantes dejan en vivo.
5. Haz clic en **Implementar (Deploy) -> Administrar implementaciones**:
   - Haz clic en el ícono del **Lápiz (Editar)**.
   - En *Versión*, elige **Nueva versión**.
   - Haz clic en **Implementar**.
6. ¡Listo! Cualquier mensaje que alguien firme en la página web aparecerá al instante en tu pestaña *Muro de Apoyo* y se sincronizará automáticamente para todos los visitantes del mundo. Además, si deseas moderar o eliminar algún mensaje, solo tienes que borrar la fila correspondiente en Google Sheets.

---

## 🚀 Cómo Probarla Localmente en tu Computador

```bash
cd /home/sara/Documents/Proyectos/princesa-page
python3 -m http.server 8000
```
Y abre en tu navegador: `http://localhost:8000`

---

## 🐱 Dato Curioso: Princesa Carolyn (BoJack Horseman)
- La web incluye una sección con ilustración original de **Princess Carolyn**, explicando que el nombre de pila oficial de la gatita es Princesa Carolyn en homenaje al personaje de Netflix y a la regla felina de que *"los gatos siempre aterrizan sobre sus cuatro patas"*.

*¡Muchos éxitos en la recaudación para Princesa! 🐾💖*
