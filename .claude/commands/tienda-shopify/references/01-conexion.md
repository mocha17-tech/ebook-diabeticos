# Fase 1 — Conectar con la tienda Shopify del usuario

Objetivo: que Shopify CLI tenga una sesión iniciada con la cuenta del usuario
y sepamos el dominio interno de su tienda (`algo.myshopify.com`).

## Antes de nada: ¿tiene tienda?

Pregunta si ya creó su tienda en Shopify. Es lo ÚNICO que no puedes hacer tú
(requiere registrarse con su correo y elegir plan).

Si NO tiene tienda, guíale así:
> 1. Entra en shopify.com y pulsa "Empezar prueba gratis".
> 2. Sigue los pasos con tu correo. Cuando te pregunte qué quieres vender,
>    responde lo que sea — se puede cambiar todo después.
> 3. Cuando veas el panel de tu tienda (un menú lateral con "Pedidos",
>    "Productos"...), dime "listo".

No necesita configurar nada más del panel: ni productos ni pagos hacen falta
para construir el diseño (sí avisa de que para VENDER de verdad tendrá que
añadir su producto y método de cobro en el panel, ofrécete a guiarle al final).

## Conseguir el dominio interno

Necesitas el dominio `*.myshopify.com`. Pídeselo así:

> "Necesito la dirección interna de tu tienda. En el panel de Shopify, mira la
> barra de direcciones del navegador: verás algo como
> `admin.shopify.com/store/NOMBRE`. Dime ese NOMBRE, o pega la dirección
> entera y yo lo saco."

De `admin.shopify.com/store/cebgq0-sc` el dominio es `cebgq0-sc.myshopify.com`.
Acepta cualquier formato que te dé (con https, sin él, solo el nombre...) y
normalízalo tú. Guárdalo en `ESTADO.md`.

## Iniciar sesión

El login se dispara automáticamente con el primer comando que hable con la
tienda. Usa este, desde la carpeta del proyecto (o cualquier carpeta si aún no
existe el proyecto — en ese caso añade `--path` luego):

```
shopify theme list --store NOMBRE.myshopify.com
```

Comportamiento esperado: el comando imprime una URL y/o abre el navegador para
autorizar. Avisa ANTES de lanzarlo:

> "Ahora voy a conectar con tu tienda. Se te abrirá el navegador para que
> inicies sesión en Shopify: 1) entra con tu cuenta, 2) pulsa el botón de
> autorizar/conectar, 3) vuelve aquí. Yo espero."

Detalles operativos importantes:
- El comando se queda esperando mientras el usuario hace el login: ejecútalo
  con un timeout generoso (3-5 minutos) o en segundo plano vigilando la
  salida. No lo mates a los 30 segundos.
- Si el navegador no se abre solo, la salida del comando incluye la URL —
  pásasela al usuario para que la abra él ("copia esto en tu navegador").
- Éxito = el comando termina imprimiendo la tabla de temas de la tienda
  (aunque solo tenga el tema por defecto). Esa tabla además te sirve después.
- La sesión queda guardada: en futuras sesiones normalmente NO hay que volver
  a hacer login. El diagnóstico de la fase 0 lo confirma.

## Errores comunes

| Síntoma | Causa probable | Solución |
|---|---|---|
| "Store not found" o 404 | Dominio mal escrito | Revisa el nombre; pide al usuario que pegue la URL completa del panel y extráelo tú |
| El navegador hace login pero el comando falla con permisos | La cuenta que usó no es la dueña/staff de esa tienda | Pregunta si tiene varias cuentas de Shopify; que repita el login con la correcta (`shopify auth logout` primero) |
| Bucle: pide login una y otra vez | Sesión corrupta | `shopify auth logout` y reintenta |
| "This store requires a password" al ver la tienda | Normal en tiendas nuevas: la tienda pública está protegida | No es un error del login. La contraseña de visualización está en el panel: Tienda online → Preferencias → Protección con contraseña. Dásela al usuario para que pueda VER su propia web, o dile cómo quitarla cuando lance |
| Errores de red al autenticar | Proxy/VPN/antivirus | Que apague la VPN un momento; reintenta |

## Cierre de la fase

1. Confirma que `shopify theme list --store ...` devuelve la tabla de temas.
2. Mensaje: "✅ Conectado con tu tienda."
3. Apunta en `ESTADO.md`: dominio de la tienda y fecha del login OK.
4. Pasa a `references/02-proyecto-tema.md`.
