const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Leer JSON
app.use(express.json());

// Como index.html está en la raíz
app.use(express.static(__dirname));

const archivo = path.join(__dirname, "mensajes.json");

// Crear el archivo si no existe
if (!fs.existsSync(archivo)) {
  fs.writeFileSync(archivo, "[]");
}

app.post("/guardar", (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  const nuevoMensaje = {
    nombre,
    correo,
    mensaje,
    fecha: new Date().toLocaleString("es-MX"),
  };

  let mensajes = JSON.parse(fs.readFileSync(archivo));

  mensajes.push(nuevoMensaje);

  fs.writeFileSync(archivo, JSON.stringify(mensajes, null, 2));

  res.json({
    success: true,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
