document.addEventListener("DOMContentLoaded", () => {
  const menuColapsable = document.getElementById("menuNav");
  const enlacesNav = menuColapsable
    ? menuColapsable.querySelectorAll(".nav-link, .btn-cta-nav")
    : [];

  // Cierra el menú móvil al hacer click en un enlace de navegación.
  enlacesNav.forEach((enlace) => {
    enlace.addEventListener("click", () => {
      if (menuColapsable.classList.contains("show")) {
        const bsCollapse =
          bootstrap.Collapse.getInstance(menuColapsable) ||
          new bootstrap.Collapse(menuColapsable);
        bsCollapse.hide();
      }
    });
  });

  // --- Lightbox de la galería (con flechas de navegación y zoom) ---
  const modalGaleria = document.getElementById("lightbox-galeria");
  if (modalGaleria) {
    const numeroWhatsapp = modalGaleria.dataset.whatsapp;
    const imgLightbox = document.getElementById("lightbox-imagen");
    const tituloLightbox = document.getElementById("lightbox-titulo");
    const formatoLightbox = document.getElementById("lightbox-formato");
    const enlaceWhatsapp = document.getElementById("lightbox-whatsapp");
    const flechaIzq = modalGaleria.querySelector(".lightbox-flecha-izq");
    const flechaDer = modalGaleria.querySelector(".lightbox-flecha-der");
    const bsModalGaleria = new bootstrap.Modal(modalGaleria);

    // Arreglo con los datos de cada foto, en el mismo orden que aparecen
    // en la grilla, para poder pasar a la siguiente/anterior.
    const piezas = Array.from(document.querySelectorAll(".pieza-galeria"));
    const fotos = piezas.map((pieza) => ({
      imagen: pieza.dataset.imagen,
      titulo: pieza.dataset.titulo,
      formato: pieza.dataset.formato
    }));

    let indiceActual = 0;

    function mostrarFoto(indice) {
      // Módulo "seguro" para que el índice siempre quede dentro del rango,
      // dando la vuelta al llegar al final o al principio.
      indiceActual = (indice + fotos.length) % fotos.length;
      const foto = fotos[indiceActual];

      imgLightbox.classList.remove("zoom");
      imgLightbox.src = foto.imagen;
      imgLightbox.alt = foto.titulo;
      tituloLightbox.textContent = foto.titulo;
      formatoLightbox.textContent = foto.formato;

      const mensaje = `Hola, vi el trabajo "${foto.titulo}" en la galería y quiero cotizar uno similar`;
      enlaceWhatsapp.href = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(
        mensaje
      )}`;
    }

    piezas.forEach((pieza, indice) => {
      pieza.addEventListener("click", () => {
        mostrarFoto(indice);
        bsModalGaleria.show();
      });
    });

    if (flechaIzq) {
      flechaIzq.addEventListener("click", () => mostrarFoto(indiceActual - 1));
    }
    if (flechaDer) {
      flechaDer.addEventListener("click", () => mostrarFoto(indiceActual + 1));
    }

    // Navegar con las flechas del teclado mientras el lightbox está abierto.
    document.addEventListener("keydown", (evento) => {
      if (!modalGaleria.classList.contains("show")) return;
      if (evento.key === "ArrowRight") mostrarFoto(indiceActual + 1);
      if (evento.key === "ArrowLeft") mostrarFoto(indiceActual - 1);
    });

    // Click sobre la foto: acercar / alejar un poco.
    imgLightbox.addEventListener("click", () => {
      imgLightbox.classList.toggle("zoom");
    });

    // Al cerrar el modal, siempre volvemos a dejar la foto sin zoom.
    modalGaleria.addEventListener("hidden.bs.modal", () => {
      imgLightbox.classList.remove("zoom");
    });
  }

  // --- Botones de compartir en cada oferta ---
  const nombreNegocio = document.body.dataset.negocio || "";
  const enlaceSitio = window.location.href.split("#")[0] + "#productos";
  const soportaShareNativo = typeof navigator.share === "function";

  const construirTexto = (titulo, medida) =>
    `Mira este ${titulo} (${medida}) de ${nombreNegocio}`;

  // Si el navegador soporta el share nativo (la mayoría de los celulares),
  // el botón abre directamente el panel del sistema (incluye WhatsApp,
  // Instagram, Mensajes, etc.) en vez del menú desplegable de respaldo.
  if (soportaShareNativo) {
    document.querySelectorAll(".boton-compartir").forEach((boton) => {
      boton.removeAttribute("data-bs-toggle");
      boton.setAttribute("aria-haspopup", "false");
      boton.addEventListener("click", () => {
        const { titulo, medida } = boton.dataset;
        navigator
          .share({
            title: `${nombreNegocio} - ${titulo}`,
            text: construirTexto(titulo, medida),
            url: enlaceSitio
          })
          .catch(() => {
            /* el usuario cerró el panel de compartir, no hacemos nada */
          });
      });
    });
  }

  // Menú de respaldo (navegadores de escritorio sin Web Share API).
  document.querySelectorAll(".item-compartir-whatsapp").forEach((enlace) => {
    enlace.addEventListener("click", (evento) => {
      evento.preventDefault();
      const { titulo, medida } = enlace.dataset;
      const mensaje = `${construirTexto(titulo, medida)}: ${enlaceSitio}`;
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(mensaje)}`,
        "_blank",
        "noopener"
      );
    });
  });

  document.querySelectorAll(".item-copiar-enlace").forEach((boton) => {
    boton.addEventListener("click", async () => {
      const { titulo, medida } = boton.dataset;
      const textoCompleto = `${construirTexto(titulo, medida)}: ${enlaceSitio}`;
      const textoOriginal = boton.textContent;
      try {
        await navigator.clipboard.writeText(textoCompleto);
        boton.textContent = "¡Enlace copiado! Pégalo en tu historia";
      } catch (error) {
        boton.textContent = "No se pudo copiar el enlace";
      }
      setTimeout(() => {
        boton.textContent = textoOriginal;
      }, 2200);
    });
  });
});
