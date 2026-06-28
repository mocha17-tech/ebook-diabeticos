# Estado del proyecto — Dulce Balance

- Tienda: fxzm4y-yj.myshopify.com
- Carpeta: /home/user/ebook-diabeticos/tienda/
- Tema base: Dawn (descargado 2026-06-28)
- Entorno: Node 22.22.2, Shopify CLI 4.3.0 — OK
- Última publicación: (pendiente)

## Fases completadas

- [x] 0 Entorno
- [x] 1 Conexión (token generado, pendiente push desde compu local)
- [x] 2 Proyecto (Dawn descargado)
- [x] 3 Diseño (entrevista completada)
- [x] 4 Construcción (todas las secciones creadas)
- [ ] 5 Páginas (header/footer/producto/legales — pendiente)
- [ ] 6 Publicación (pendiente push desde compu local de Cecilia)

## Brief de diseño

- **Paleta**: Sage/verde salvia #8FAFA8 (fondo hero y secciones alternas), Verde bosque #3D5A2A (títulos, botones), Crema #F5F0E5 (fondos claros, textos sobre verde)
- **Tipografía**: Playfair Display italic (títulos), DM Sans (cuerpo)
- **Estilo**: Botánico acuarela, cálido, premium wellness — NO clínico
- **Tono**: Cercano, esperanzador, empoderador — "podés comer rico y cuidarte"
- **Idioma**: Español (Argentina)
- **Producto**: eBook PDF digital "50 Postres Saludables para Diabéticos"
- **Diferenciador clave**: Avalado por la SAD (Sociedad Argentina de Diabetes)
- **Público**: Personas con diabetes + toda la familia

## Secciones creadas (prefijo db-)

- [x] `sections/db-hero.liquid` — Hero pantalla completa con mockup libro + badge SAD
- [x] `sections/db-confianza.liquid` — Banda verde con cifras animadas y sello SAD
- [x] `sections/db-para-quien.liquid` — Split imagen/texto: para quién es el ebook
- [x] `sections/db-beneficios.liquid` — Grid 3 columnas de beneficios con iconos
- [x] `sections/db-contenido.liquid` — Preview de 4 recetas (tarjetas con foto/emoji)
- [x] `sections/db-mockups.liquid` — Mockup en dispositivos (celular, tablet, Kindle)
- [x] `sections/db-resenas.liquid` — Grilla de 3 testimonios
- [x] `sections/db-faq.liquid` — Acordeón de 6 preguntas frecuentes
- [x] `sections/db-cta-final.liquid` — CTA final con precio y botón de compra

## Assets creados

- [x] `assets/db-styles.css` — CSS global con tokens de diseño + todos los estilos
- [x] `assets/db-scripts.js` — JS: reveal scroll, FAQ acordeón, count-up animado

## Imágenes pendientes de subir (Cecilia las sube desde el editor de Shopify)

- Mockup libro sobre mesa (imagen principal del hero)
- Mockup en dispositivos (para sección db-mockups)
- Foto "mujer leyendo" (para sección db-para-quien)
- Fotos de recetas individuales (para tarjetas en db-contenido)
- Ilustraciones botánicas (decoración hero — opcional, el CSS las oculta si no existen)

## Para publicar (instrucciones para Cecilia)

Desde tu computadora, con Shopify CLI instalado:

```bash
cd ruta/a/esta/carpeta/tienda
shopify theme push --store fxzm4y-yj.myshopify.com --unpublished --theme "Dulce Balance (Claude)"
```

Después subís las imágenes desde el editor visual de Shopify.
