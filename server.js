require("dotenv").config();

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Leer JSON
app.use(express.json());

// Como index.html está en la raíz
app.use(express.static(__dirname));

const archivo = path.join(__dirname, "mensajes.json");

// Crear el archivo si no existe
if (!fs.existsSync(archivo)) {
  fs.writeFileSync(archivo, "[]");
}

//ENDPOINT GET
app.get("/api/mensajes", (req, res) =>{
  //se ura fs.readFile para cumplir con el requisito de lectura asincrona
  fs.readFile(archivo, "utf8",(err, datos) =>{
    if (err){
      console.error("Error al leer el archivo:", err);
      return res.status(500).json({ success: false, error:"No se pudieron leer los mensajes"});
    }
    try{
      const mensajes = JSON.parse(datos);
      res.status(200).json(mensajes);
    } catch (parseError){
      console.error("Errir al parsear el JSON:", parseError);
      res.status(500).json({ success: false, error:"Formato de archivo invalido"});
    }
  });
});


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
  console.log(`Servidor ejecutándose en http://localhost:3000/api/mensajes `);
});
