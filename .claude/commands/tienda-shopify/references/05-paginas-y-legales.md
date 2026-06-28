# Fase 5 — Página de producto, header, footer y páginas legales

## Página de producto — receta completa (LÉELA ENTERA, es donde más se falla)

La página de producto suele salir incompleta o rota si se improvisa. Sigue
esta receta de principio a fin y pásale el checklist final antes de darla por
terminada.

### Cómo funciona técnicamente (para que no des palos de ciego)

- La página de producto NO se edita "por la API": es un **template JSON del
  tema** (`templates/product.json`) que lista secciones, igual que la portada
  con `index.json`. Todo lo que subimos con `shopify theme push` aplica
  también aquí.
- Los datos del producto (título, precio, fotos de catálogo, variantes,
  stock) viven en el panel de Shopify y llegan al template a través del
  objeto Liquid `product`. **Tú construyes el escaparate; los datos los pone
  el panel.** Por eso el paso 0 es asegurar que el producto existe.

### Paso 0 — El producto debe existir en el panel

Pregunta si ya creó su producto. Si no:

> 1. Panel → Productos → "Añadir producto".
> 2. Ponle título, alguna foto, precio, y arriba a la derecha cambia el
>    estado a "Activo". Guarda.
> 3. Dime "listo".

Tú no puedes crear productos desde las herramientas del tema. Sin producto,
la página no se puede ni previsualizar con datos reales.

### Paso 1 — La sección `mt-producto.liquid`

Una sección propia, full editable, con TODOS estos bloques funcionales:

1. **Galería**: imagen principal + miniaturas clicables
   (`product.media`/`product.images`; JS mínimo para intercambiar la
   principal). Usa las fotos del producto del panel, no image_pickers — así
   la galería sigue al catálogo. (Las fotos generadas con IA de la fase 3b se
   suben al producto desde el panel o se usan en las secciones narrativas.)
2. **Columna de compra**: título (`{{ product.title }}`), precio SIEMPRE
   dinámico (`{{ product.selected_or_first_available_variant.price | money }}`,
   con precio tachado si hay `compare_at_price`), y el formulario:

   ```liquid
   {% form 'product', product %}
     <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
     <button type="submit" name="add" {% if product.selected_or_first_available_variant.available == false %}disabled{% endif %}>
       {{ section.settings.boton_texto }}
     </button>
   {% endform %}
   ```

3. **Variantes**: si `product.has_only_default_variant` es false, renderiza un
   selector por opción (`product.options_with_values`) y un pequeño JS que, al
   cambiar, localice la variante (`product.variants` serializado a JSON en un
   `<script type="application/json">`), actualice el `input[name=id]`, el
   precio y el estado agotado. Si solo hay variante única, no muestres
   selector. Prueba mentalmente ambos caminos: este if/else es el fallo nº 1.
4. **Confianza**: fila de garantías editable (envío, devoluciones, pago
   seguro) con iconos SVG inline.
5. **Descripción rica editable**: además de `{{ product.description }}` como
   respaldo, campos de schema para intro, cuadrícula de características
   (título+texto), pasos de uso y "qué incluye" (textarea un-ítem-por-línea
   con `split`). Redáctalos tú desde la descripción que dio el usuario en la
   entrevista.
6. **Reutiliza secciones narrativas** de la landing (reseñas, FAQ,
   comparador...) añadiéndolas al template del producto — refuerzan la venta
   sin código nuevo.

### Paso 2 — El template

Crea `templates/product.mt.json` (alternativo — más seguro que tocar
`product.json`, porque el producto de ejemplo de Dawn sigue funcionando):

```json
{
  "sections": {
    "principal": { "type": "mt-producto", "settings": {} },
    "resenas":   { "type": "mt-resenas",  "settings": {} }
  },
  "order": ["principal", "resenas"]
}
```

### Paso 3 — Asignar el template al producto (lo hace el usuario, 3 clics)

Tras subir el tema (fase 6):

> 1. Panel → Productos → tu producto.
> 2. En la columna derecha, abajo, busca "Plantilla de tema" y elige "mt".
> 3. Guarda.

OJO: el desplegable muestra plantillas del **tema publicado**. Si vuestro tema
de trabajo aún no está publicado, el usuario no verá "mt" — en ese caso
salta este paso y comprueba la página con el enlace de previsualización
añadiendo `?preview_theme_id=<ID>` a la URL del producto; la asignación se
hace al publicar.

### Checklist final de la página de producto

- [ ] El precio viene del producto real (cambia en el panel → cambia en la web)
- [ ] "Añadir al carrito" añade de verdad (pruébalo en la previsualización) y
      el carrito de Dawn se abre/actualiza
- [ ] Con variantes: cambiarlas actualiza precio, id y estado agotado
- [ ] Sin variantes: no aparece ningún selector vacío
- [ ] Producto agotado: botón deshabilitado con texto claro
- [ ] La galería funciona con 1 foto y con 8
- [ ] Todos los textos/tamaños/espaciados editables desde el editor
- [ ] Se ve bien en móvil (la columna de compra cae debajo de la galería)

## Header (cabecera)

Personaliza `sections/header.liquid` de Dawn con cuidado (es la excepción a
"no tocar Dawn"):

- **Logo por sección**: Dawn solo usa el logo global del tema. Añade al schema
  del header un `image_picker` (id `logo`) y un `range` (id `logo_width`), y
  en el render usa
  `assign active_logo = section.settings.logo | default: settings.logo` en
  TODAS las ramas donde Dawn pinta el logo (hay más de una según
  `logo_position`).
- Traduce al idioma del usuario cualquier texto visible que añadas.
- El menú de navegación se gestiona desde el panel (Contenido → Menús). Si los
  enlaces del menú salen en inglés o incompletos, dile al usuario en 2 pasos
  dónde editarlos, o crea tú las páginas y dile solo qué marcar.

## Footer (pie de página)

El footer de Dawn (bloques + menús + traducciones) es confuso para no
técnicos y tiende a quedar en inglés. Funciona mejor reescribirlo como
sección propia simple dentro de `sections/footer.liquid`:

- Columna de marca: logo (image_picker + range de ancho), tagline (textarea),
  iconos de redes (los de configuración del tema, `settings.social_*`).
- Columna de navegación: 4-6 pares de ajustes texto+url (`nav_link_N_label` /
  `nav_link_N_url`). RECUERDA: los `url` sin default (trampa nº 1 de la fase
  4); renderiza con `| default: '#'`.
- Columna "sobre la marca": título + textarea.
- Barra inferior: iconos de pago (`shop.enabled_payment_types`), copyright
  dinámico (`{{ 'now' | date: '%Y' }}`), y los enlaces legales apuntando a
  `/policies/...` (ver abajo).
- Mantén los selectores de país/idioma de Dawn como opcionales (checkbox,
  default false).
- Nada de bloque de newsletter salvo que el usuario lo pida.

## Páginas legales

En la UE (y como buena práctica general) la tienda necesita: privacidad,
términos del servicio, devoluciones, envíos, cookies y aviso legal.

**Las cuatro primeras son nativas de Shopify** y tienen URLs automáticas:

- `/policies/privacy-policy`
- `/policies/terms-of-service`
- `/policies/refund-policy`
- `/policies/shipping-policy`

Se rellenan en el panel: Configuración → Políticas. Shopify trae plantillas
("Crear a partir de plantilla"). Instrucción para el usuario:

> 1. En tu panel de Shopify: Configuración (abajo a la izquierda) → Políticas.
> 2. En cada política, pulsa "Crear a partir de plantilla" y revisa que los
>    datos de tu empresa estén bien.
> 3. Guarda. Los enlaces del pie de tu web ya apuntan ahí.

**Cookies y aviso legal** no son nativas: créalas como páginas (panel →
Contenido/Páginas) o, mejor, redacta tú el contenido base (adaptado a su
negocio: nombre, NIF si te lo da, correo de contacto) y dáselo para pegar.
Enlázalas desde el footer cuando existan (mientras tanto `#`).

Avisa siempre: "estos textos legales son una base, no asesoría legal — revísalos
o pásalos a tu gestor antes de lanzar en serio."

## Favicon y detalles de marca del navegador

No lo dejes para el final: el favicon es lo que hace que la pestaña del
navegador "parezca una empresa de verdad".

- **Método robusto (100% por nuestra cuenta):** genera/usa un cuadrado del
  logo o monograma de la marca (si hace falta, créalo con la fase 3b en
  `1024x1024`, fondo del color de marca), guárdalo como
  `assets/mt-favicon.png` (512×512 o menos) y añádelo en el `<head>` de
  `layout/theme.liquid`, ANTES del favicon condicional de Dawn:

  ```liquid
  <link rel="icon" type="image/png" href="{{ 'mt-favicon.png' | asset_url }}">
  ```

  (Dawn solo pinta su `<link rel="icon">` si `settings.favicon` existe, así
  que el tuyo no choca; si el usuario sube luego uno en Configuración del
  tema, el suyo gana — perfecto.)
- **Título y descripción de la pestaña/Google**: el título de la home sale
  del nombre de la tienda + eslogan (panel → Configuración → aplicará
  `shop.name`). Si el brief trae un eslogan, dile al usuario en 2 pasos dónde
  ponerlo (Panel → Tienda online → Preferencias → "Título de la página de
  inicio" y meta descripción) o, mejor, redáctaselos tú y que los pegue.

## Títulos y copies del producto (catálogo)

El título y la descripción que viven EN EL PANEL (los que salen en el
carrito, en Google y en el buscador interno) no se editan desde los archivos
del tema. Pero el usuario tampoco tiene que redactarlos: **escríbelos tú** a
partir de la entrevista (título vendedor + descripción clara con beneficios)
y pásaselos listos para pegar:

> "Te he preparado el título y la descripción de tu producto. Cópialos así:
> 1) Panel → Productos → tu producto. 2) Pega el título arriba y la
> descripción en el cuadro grande. 3) Guarda."

Todos los demás copies (los de la landing y la página de producto visual)
son tuyos vía secciones y templates — redáctalos siempre tú, con el tono del
brief, y deja cada uno editable (contrato de la fase 4).

## Otras páginas

- **Contacto**: Dawn trae `contact-form`; basta crear la página en el panel
  con la plantilla de contacto, o construir una sección propia si el diseño lo
  pide.
- **Sobre nosotros**: sección(es) propias + página con template alternativo
  `templates/page.sobre.json`, mismo patrón que producto.

## Cierre de la fase

Actualiza `ESTADO.md` (páginas creadas, qué falta del lado del panel) y pasa a
la fase 6 para publicar todo.
