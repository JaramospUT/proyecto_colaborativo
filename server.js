require("dotenv").config();

const express = require("express");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Archivo JSON
const archivo = path.join(__dirname, "mensajes.json");

// Crear el archivo si no existe
if (!fs.existsSync(archivo)) {
  fs.writeFileSync(archivo, "[]");
}

<<<<<<< endrik
// Configuración de Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "13344@utl.edu.mx",
    pass: "miyo dvpc gcbp sbdj",
  },
});

// Ruta para guardar mensajes
app.post("/guardar", async (req, res) => {
  try {
    const { nombre, correo, mensaje, tipo } = req.body;

    const nuevoMensaje = {
      nombre,
      correo,
      tipo,
      mensaje,
      fecha: new Date().toLocaleString("es-MX"),
    };

    // Leer mensajes
    let mensajes = [];

    try {
      mensajes = JSON.parse(fs.readFileSync(archivo, "utf8"));
    } catch {
      mensajes = [];
    }

    // Agregar mensaje
    mensajes.push(nuevoMensaje);

    // Guardar
    fs.writeFileSync(archivo, JSON.stringify(mensajes, null, 2));

    // Solo enviar correos cuando sea una reservación
    if (tipo === "reservacion") {
      // Correo al cliente
      await transporter.sendMail({
        from: '"Café Aroma & Co." <13344@utl.edu.mx>',

        to: correo,

        subject: "Confirmación de reservación",

        html: `
                    <h2>¡Hola ${nombre}!</h2>

                    <p>Gracias por reservar en <b>Café Aroma & Co.</b>.</p>

                    <p>Tu solicitud ha sido recibida correctamente.</p>

                    <p>En breve nos pondremos en contacto contigo para confirmar la fecha y la hora.</p>

                    <hr>

                    <p><b>Mensaje enviado:</b></p>

                    <p>${mensaje}</p>

                    <br>

                    <p>Gracias por tu preferencia.</p>

                    <h3>Café Aroma & Co.</h3>
                `,
      });

      // Correo al administrador
      await transporter.sendMail({
        from: '"Sistema Web" <13344@utl.edu.mx>',

        to: "13344@utl.edu.mx",

        subject: "Nueva reservación recibida",

        html: `
                    <h2>Nueva reservación</h2>

                    <p><b>Nombre:</b> ${nombre}</p>

                    <p><b>Correo:</b> ${correo}</p>

                    <p><b>Mensaje:</b></p>
=======
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
>>>>>>> master

                    <p>${mensaje}</p>

                    <hr>

                    <p><b>Fecha:</b> ${new Date().toLocaleString("es-MX")}</p>
                `,
      });
    }

    res.json({
      success: true,
      mensaje: "Información guardada correctamente.",
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
<<<<<<< endrik
  console.log("---------------------------------------");
  console.log(`Servidor iniciado en:`);
  console.log(`http://localhost:${PORT}`);
  console.log("---------------------------------------");
=======
  console.log(`Servidor ejecutándose en http://localhost:3000/api/mensajes `);
>>>>>>> master
});
