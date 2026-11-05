const path = require("path");
const express = require("express");
const { engine } = require("express-handlebars");
const config = require("./config");

const app = express();
const PORT = process.env.PORT || 3000;

// --- Handlebars ---
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    helpers: {
      formatoPrecio: (valor) =>
        new Intl.NumberFormat("es-CL", {
          style: "currency",
          currency: "CLP",
          maximumFractionDigits: 0
        }).format(valor),
      whatsappLink: (numero, mensaje) =>
        `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`,
      eq: (a, b) => a === b,
      // Concatena cualquier cantidad de strings pasados como argumentos.
      // Uso: {{concat "Hola " nombre "!"}}
      concat: (...args) => args.slice(0, -1).join("")
    }
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// --- Archivos estáticos ---
app.use(express.static(path.join(__dirname, "public")));

// --- Ruta principal (todo vive en una sola página) ---
app.get("/", (req, res) => {
  res.render("home", {
    negocio: config.negocio,
    productos: config.productos,
    proceso: config.proceso,
    galeria: config.galeria,
    anio: new Date().getFullYear()
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
