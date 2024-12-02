
const { Router } = require('express');
const router = Router();

// Ruta para obtener la lista de usuarios
router.get("/usuarios", async (req, res) => {
  try {
    const respuestaServidor = await fetch('http://localhost:3000/api/usuarios', {  // Solicitar la lista de usuarios desde la API
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'  // Eliminar el token de los headers
      }
    });

    if (!respuestaServidor.ok) throw new Error('Error al acceder a la ruta protegida');  // Verificar si la respuesta es exitosa

    const data = await respuestaServidor.json();  // Parsear la respuesta JSON con la lista de usuarios
    console.log('Datos recibidos:', data);

    res.render('usuarios', { usuarios: data, usuario: res.locals.usuario, mostrarHeader: true });  // Pasar los usuarios a la vista usuarios.hbs
  } catch (error) {
    console.error('Error:', error);
    res.render('usuarios', { mensaje: error.message, usuario: res.locals.usuario, mostrarHeader: true });  // Mostrar mensaje de error si falla la obtención de usuarios
  }
});

// Ruta para mostrar la página de registro
router.get("/registrar", (req, res) => {
    res.render('registro', { mostrarHeader: true }); // Renderizar la vista de registro con el header visible
});

// Ruta para registrar un nuevo usuario
router.post("/registrar", async (req, res) => {
    const { nombre, password } = req.body; // Obtener el nombre y password del cuerpo de la solicitud
    
    try {
        const respuestaServidor = await fetch('http://localhost:3000/api/add', { 
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json'  // Eliminar el token de los headers
            }, 
            body: JSON.stringify({ nombre, password }) 
        }); // Enviar la solicitud POST con los datos

        if (!respuestaServidor.ok) throw new Error('Error al acceder a la ruta protegida'); // Verificar si la respuesta es exitosa

        const data = await respuestaServidor.json(); // Parsear la respuesta JSON
        console.log('Datos recibidos:', data);
        
        res.render('registro', { mensaje: data.mensaje, usuario: res.locals.usuario, mostrarHeader: true }); // Mostrar el mensaje de éxito
    } catch (error) {
        console.error('Error:', error);
        res.render('registro', { mensaje: error.message, mostrarHeader: true }); // Mostrar el mensaje de error
    }
});

module.exports = router;