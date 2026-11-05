# Cuadros de Graduación — sitio de una página

Sitio web de una sola página (single page, con scroll) para vender cuadros de
graduación en 3 formatos: **A4**, **25x35 cm** y **A3**. Construido con
Node + Express + Handlebars + Bootstrap 5. No tiene carrito de compras: cada
producto tiene un botón **"Ver más detalles"** (abre un modal) y un botón
**"Contactar por WhatsApp"** (abre un chat de WhatsApp con el mensaje
pre-cargado).

## Requisitos

- Node.js 18 o superior

## Instalación y ejecución

```bash
npm install
npm start
```

Luego abre **http://localhost:3000** en tu navegador.

Para desarrollo con recarga automática (requiere `nodemon`, ya incluido como
`devDependency`):

```bash
npm run dev
```

## Qué editar primero

### 1. `config.js`
Todo el contenido del sitio vive en este archivo:

- **`negocio`**: nombre, eslogan, número de WhatsApp (formato
  `56912345678`, sin "+" ni espacios), Instagram, correo, ciudad y horario.
- **`productos`**: los 3 formatos (A4, 25x35, A3) con precio, descripciones,
  materiales y tiempo de entrega. Puedes agregar o quitar formatos: la
  página se genera automáticamente según lo que pongas aquí.
- **`proceso`**: los 4 pasos de "Cómo funciona".

### 2. Imágenes (`public/images/`)
Actualmente hay 3 ilustraciones de ejemplo (`frame-a4.svg`,
`frame-25x35.svg`, `frame-a3.svg`) que marcan el lugar de cada foto.
Reemplázalas por fotos reales de tus cuadros (recomendado: `.jpg` o `.webp`,
proporción vertical similar a 4:5) y actualiza la propiedad `imagen` de cada
producto en `config.js` si cambias el nombre del archivo.

### 3. Galería (`config.js` + `public/images/`)
La sección **Galería** muestra trabajos ya entregados en una grilla tipo
collage. Cada foto se agranda en un lightbox al hacer click, con su título,
formato y un botón de WhatsApp con mensaje pre-cargado ("Quiero uno así").

Para editarla, modifica el arreglo `galeria` en `config.js`:

- `imagen`: ruta del archivo en `public/images/`.
- `titulo`: texto que aparece sobre la foto y en el lightbox (ej. carrera o nombre del cliente).
- `formato`: formato del cuadro (A4 / 25x35 / A3).
- `destacado: true`: hace que esa foto ocupe un espacio más grande en la
  grilla — úsalo en 1 o 2 fotos que quieras resaltar.

Puedes agregar tantas fotos como quieras (no hay límite), simplemente
agrega más objetos al arreglo. Reemplaza los 6 SVG de ejemplo
(`galeria-1.svg` a `galeria-6.svg`) por fotos reales de tus cuadros
entregados.

**Proporción de las fotos:** todas las imágenes de la galería se muestran
en proporción **3:4** (ancho:alto), recortándose automáticamente si la foto
original tiene otra proporción (gracias a `object-fit: cover`). Para que se
vean lo mejor posible, sube fotos ya cercanas a esa proporción — por
ejemplo 900 x 1200 px o cualquier tamaño con esa misma relación. La foto
marcada con `destacado: true` no cambia de tamaño, pero se distingue con un
borde dorado y una etiqueta "Destacado".

**Navegación y zoom en el lightbox:** al abrir una foto de la galería,
aparecen dos flechas (izquierda/derecha) para pasar a la foto anterior o
siguiente sin cerrar el lightbox — también funciona con las flechas del
teclado. Haciendo click sobre la foto ampliada, esta hace un poco de zoom
(y otro click la vuelve a su tamaño normal).

## Estructura del proyecto

```
cuadros-graduacion/
├── app.js                     # Servidor Express
├── config.js                  # Todo el contenido editable del sitio
├── package.json
├── public/
│   ├── css/style.css          # Estilos (paleta, tipografía, componentes)
│   ├── js/main.js             # Comportamiento del menú móvil
│   └── images/                # Fotos de los cuadros
└── views/
    ├── layouts/main.handlebars
    ├── home.handlebars        # Ensambla la página de una sola vista
    └── partials/
        ├── navbar.handlebars      # Menú con scroll a cada sección
        ├── hero.handlebars        # Portada
        ├── productos.handlebars   # Cards + modales "Ver más detalles"
        ├── proceso.handlebars     # Pasos numerados
        ├── galeria.handlebars     # Galería de trabajos + lightbox
        ├── contacto.handlebars    # Sección de contacto
        └── footer.handlebars      # Pie de página + botón flotante WhatsApp
```

## Navegación con scroll

El menú superior usa anclas (`#inicio`, `#productos`, `#proceso`,
`#contacto`) con `scroll-behavior: smooth` y Bootstrap Scrollspy, por lo que
al hacer click se desplaza suavemente por la misma página y el enlace activo
se resalta en dorado según la sección visible.

## Botón de compartir en cada oferta

Cada tarjeta de producto (y su modal de detalle) tiene un botón circular de
**compartir** (ícono, esquina superior derecha de la foto):

- **En celulares** (la mayoría de navegadores móviles modernos): abre el
  panel nativo para compartir del sistema operativo, que ya incluye
  WhatsApp, Instagram, Mensajes, correo, etc. — el usuario elige dónde
  enviarlo.
- **En computadores** (navegadores sin Web Share API): se abre un menú con
  dos opciones:
  - **"Compartir por WhatsApp"**: abre `web.whatsapp.com`/WhatsApp con el
    mensaje ya escrito, para que el usuario elija a quién enviárselo.
  - **"Copiar enlace para Instagram"**: copia el texto + enlace al
    portapapeles (Instagram no permite pre-llenar mensajes desde la web),
    para que el usuario lo pegue en su historia o DM.

No requiere ninguna configuración adicional: usa el nombre del negocio
definido en `config.js` y el nombre/formato de cada producto automáticamente.

## Botón de WhatsApp

Todos los botones de contacto usan el helper `whatsappLink`, que arma un
enlace `https://wa.me/<numero>?text=<mensaje>` con el número definido en
`config.js`. Cada botón de producto incluye automáticamente el nombre y
formato del cuadro en el mensaje pre-cargado.

## Despliegue

Este proyecto sirve tal cual en cualquier hosting que soporte Node.js
(Render, Railway, un VPS, etc.). Solo asegúrate de definir la variable de
entorno `PORT` si tu hosting lo requiere; por defecto usa el puerto 3000.
