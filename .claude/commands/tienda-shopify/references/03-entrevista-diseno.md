# Fase 3 — Entrevista de diseño

Objetivo: reunir todo lo necesario para diseñar SU tienda, no "una tienda".
El resultado de esta fase es un mini-brief escrito en `ESTADO.md` que guía
toda la construcción.

## Principio: cero sesgo

No tienes un estilo por defecto ni una estructura favorita. Cada tienda debe
nacer de lo que el usuario aporte. Señales de que estás sesgando: todas tus
tiendas tienen hero con imagen de fondo + texto a la izquierda; todas usan la
misma paleta blanco/negro elegante; todas tienen las mismas 8 secciones en el
mismo orden. Varía composición, ritmo visual, densidad y tono según el
producto y las referencias.

## Qué pedir al usuario

Pide las tres cosas a la vez (que las arrastre al chat):

1. **Fotos de su producto** — cuantas más mejor. Pregunta si tiene alguna con
   fondo transparente o fondo limpio (abren más opciones de composición).
2. **Referencias de estilo** — capturas de webs/tiendas/anuncios que le gusten,
   o simplemente nombres de marcas cuyo estilo admire.
3. **El texto que ya tenga** — nombre de la marca, eslogan, precios,
   opiniones de clientes si las tiene. Si no tiene textos, tú los redactas
   (dile que son provisionales y editables).
4. **Una descripción del producto con sus palabras** — qué es, de qué está
   hecho, qué lo hace especial, medidas, qué incluye. Aunque sea desordenada:
   es oro tanto para redactar los copies como para generar fotos con IA
   (fase 3b), porque contiene lo que no se ve en las fotos.

Preguntas de la entrevista (hazlas conversacionales, no como formulario; 4-6
preguntas máximo, agrupadas):

- ¿Qué vendes y a quién? ¿Qué problema le resuelve?
- ¿Qué sensación quieres que dé la web? (lujo, cercanía, tecnología, natural,
  divertida...)
- ¿Colores de marca? ¿Logo? (si tiene logo, que lo pase)
- ¿Hay algo que NO quieras? (a veces es lo más informativo)
- ¿Idioma(s) de la tienda?
- ¿Un solo producto estrella o catálogo?

## Analiza las imágenes de verdad

Cuando pase las referencias, extrae de ellas decisiones concretas: paleta
exacta, tipografía (con serifa / sin serifa / display), densidad (aire vs.
compacto), tratamiento de fotos (recortadas, con fondo, polaroid, full-bleed),
bordes (rectos vs. redondeados), sombras (planas vs. elevadas). Escríbelo en
el brief. "Estilo minimalista" no es un brief; "fondo crema #F6F1EA, titulares
serif grandes, fotos full-bleed con esquinas 24px, botones píldora negros" sí.

## Menú de composiciones (para proponer, no para limitar)

Propón una estructura de landing eligiendo y adaptando de este menú según
producto y referencias. NO uses siempre las mismas; combina, inventa
variantes, y justifica brevemente cada elección al usuario:

**Aperturas (hero):**
- Imagen full-bleed con texto superpuesto (clásico)
- Producto recortado (PNG transparente) flotando a un lado + texto al otro
- Vídeo de fondo con claim corto (sección con ajuste de vídeo)
- Carrusel/slideshow de imágenes con textos por slide
- Split 50/50: mitad color de marca con tipografía gigante, mitad foto
- Editorial: titular enorme arriba, foto panorámica debajo

**Cuerpo:**
- Comparador antes/después con deslizador
- Cifras/estadísticas animadas
- Pasos de uso (1-2-3) con imágenes o visual interactivo
- Grid de beneficios con iconos
- Bandas alternas imagen/texto (zigzag)
- Carrusel de reseñas (auto-scroll o estático)
- Galería de usos/contextos
- FAQ desplegable
- Tabla comparativa vs. alternativas
- Banda de prensa/logos ("visto en")
- Sección de ingredientes/materiales/especificaciones

**Cierres:**
- CTA grande a pantalla con fondo de color/foto
- Producto + precio + botón de compra directo
- Newsletter solo si el usuario lo quiere (no por defecto)

Para cada sección elegida, decide también su variante de composición (texto
centrado vs. lateral, fondo claro vs. oscuro, con/sin animación de entrada).

## Propuesta y validación

Presenta al usuario un plan corto y visualizable:

> "Con tu estilo X te propongo esta portada: 1) ... 2) ... 3) ... ¿Cambiamos,
> quitamos o añadimos algo antes de que me ponga a construir?"

No construyas hasta el OK. Pero tampoco lo alargues: una ronda de feedback
suele bastar, el usuario podrá pedir cambios viendo el resultado real después.

## ¿Fotos malas? Ofrece generarlas con IA

Si las fotos que pasa el usuario son material de proveedor (textos
promocionales encima, infografías con medidas, collages, fondos
inconsistentes) o simplemente flojas, ofrécele generar fotos profesionales
con IA a partir de las suyas. El flujo completo (alta en OpenAI, clave,
costes, prompts y el script `generar-foto.mjs`) está en
`references/08-fotos-ia.md` — léelo antes de ofrecerlo para dar bien los
detalles de coste (~2-3 € en créditos).

## Preparar las imágenes

- Copia las imágenes del usuario a `assets/` del proyecto con nombres ASCII
  en minúsculas y descriptivos del SLOT, no del contenido: `hero-fondo.jpg`,
  `producto-flotante.png`, `uso-1.jpg`... (en Shopify los assets van planos,
  sin subcarpetas).
- Si una imagen pesa >2-3 MB avisa de que la web cargará lenta; si tienes
  herramientas disponibles, redimensiona a ~2000px de ancho máximo.
- Las imágenes en `assets/` son los valores por defecto de cada sección; el
  usuario podrá sustituirlas después desde el editor de Shopify (fase 4
  explica el patrón image_picker + fallback).

## Cierre de la fase

1. Escribe el brief completo en `ESTADO.md` (paleta, tipografía, tono,
   estructura acordada, idioma).
2. Pasa a `references/04-secciones-personalizadas.md`.
