// ============================================================
//  CONFIGURACION DEL NEGOCIO
//  Edita estos datos con los reales de tu emprendimiento.
// ============================================================
module.exports = {
  negocio: {
    nombre: "TuGraciaPrint",
    eslogan: "Tu logro, enmarcado para siempre",
    descripcion:
      "Cuadros conmemorativos de graduación, hechos a mano, en los formatos A4, 25x35 cm y A3.",
    // Numero de WhatsApp en formato internacional, SIN + ni espacios ni guiones.
    // Ejemplo Chile: 56 9 1234 5678  ->  "56912345678"
    whatsapp: "56928481332",
    instagram: "https://instagram.com/tugraciaprint",
    correo: "tugraciaprint@gmail.com",
    ciudad: "Temuco, Chile",
    horario: "Lunes a Sábado, 10:00 - 19:00 hrs"
  },

  // Productos / formatos disponibles.
  // "imagen" apunta a /public/images/ - reemplaza esos archivos por fotos reales.
  productos: [
    {
      id: "a4",
      nombre: "Formato A4",
      medida: "21 x 29,7 cm",
      precio: 9000,
      imagen: "/images/frame-a4.svg",
      descripcionCorta: "Ideal para escritorio o repisa.",
      descripcionLarga:
        "Cuadro conmemorativo tamaño A4, marco de madera color a elección, mica protectora y mat interior. Incluye espacio para foto de grado, nombre, carrera e institución. Tiempo de producción: 3 a 5 días hábiles.",
      materiales: ["Marco de madera", "Mica anti-reflejo", "Mat interior color hueso"],
      tiempoEntrega: "3 a 5 días hábiles"
    },
    {
      id: "25x35",
      nombre: "Formato 25x35",
      medida: "25 x 35 cm",
      precio: 10000,
      imagen: "/images/frame-25x35.svg",
      descripcionCorta: "El tamaño más elegido para colgar en la pared.",
      descripcionLarga:
        "Cuadro conmemorativo de 25x35 cm, pensado para lucir en la pared del living o del escritorio. Marco de madera reforzado, mica anti-reflejo y diseño personalizado con foto, nombre, carrera e institución. Tiempo de producción: 4 a 6 días hábiles.",
      materiales: ["Marco de madera reforzado", "Mica anti-reflejo", "Mat interior a elección"],
      tiempoEntrega: "4 a 6 días hábiles"
    },
    {
      id: "a3",
      nombre: "Formato A3",
      medida: "29,7 x 42 cm",
      precio: 12000,
      imagen: "/images/frame-a3.svg",
      descripcionCorta: "Nuestro formato más grande, para un recuerdo protagonista.",
      descripcionLarga:
        "Cuadro conmemorativo tamaño A3, el más grande de nuestra línea. Marco de madera premium, mica anti-reflejo y montaje con mat de doble capa. Perfecto como regalo principal para el egresado. Tiempo de producción: 5 a 7 días hábiles.",
      materiales: ["Marco de madera premium", "Mica anti-reflejo", "Mat de doble capa"],
      tiempoEntrega: "5 a 7 días hábiles"
    }
  ],

  // Pasos del proceso, en orden (esto sí es una secuencia real).
  proceso: [
    {
      numero: "01",
      titulo: "Nos escribes",
      texto: "Nos cuentas el formato que quieres, que diseño eliges y agendamos un dia para realizar la sesión de fotos"
    },
    {
      numero: "02",
      titulo: "Tomamos las fotos",
      texto: "Realizamos la sesión de fotos, Hacemos la elección de las mejores fotos , les editamos el color y si es necesario hacemos retoques digitales "
    },
    {
      numero: "03",
      titulo: "Enmarcamos",
      texto: "Preparamos la propuesta del diseño,  ya con la foto individual y grupal agregadas. Imprimimos la foto y enmarcamos."
    },
    {
      numero: "04",
      titulo: "Entregamos",
      texto: "Coordinamos retiro o despacho, listo para regalar o colgar."
    }
  ],

  // Galería de trabajos ya entregados.
  // "imagen" apunta a /public/images/ - reemplaza estos archivos por fotos reales de tus cuadros.
  // "destacado": true hace que la foto ocupe un espacio más grande en la grilla (úsalo con 1 o 2 fotos).
  galeria: [
    {
      id: "trabajo-1",
      imagen: "/images/galeria-1.jpg",
      titulo: "Graduación Enfermería",
      formato: "25 x 35 cm",
      destacado: true
    },
    {
      id: "trabajo-2",
      imagen: "/images/galeria-2.jpg",
      titulo: "Graduación Ingeniería Civil",
      formato: "A3",
      destacado: false
    },
    {
      id: "trabajo-3",
      imagen: "/images/galeria-3.jpg",
      titulo: "Graduación Derecho",
      formato: "A4",
      destacado: false
    },
    {
      id: "trabajo-4",
      imagen: "/images/galeria-4.png",
      titulo: "Graduación Educación Parvularia",
      formato: "25 x 35 cm",
      destacado: false
    },
    {
      id: "trabajo-5",
      imagen: "/images/galeria-5.png",
      titulo: "Magíster en Psicología",
      formato: "A3",
      destacado: false
    },
    {
      id: "trabajo-6",
      imagen: "/images/galeria-6.png",
      titulo: "Graduación Técnico en Enfermería",
      formato: "A4",
      destacado: false
    }
  ]
};
