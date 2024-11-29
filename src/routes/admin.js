// Agregar notas
const { Router } = require('express');
const validarToken = require('../utils/token');
const router = Router();

router.get("/ver", validarToken, async (req, res) => {
    try {
        const token = req.cookies.token; // Obtener el token de las cookies
        const respuestaServidor = await fetch('http://localhost:3000/api/list', { 
            method: 'get', 
            headers: { 
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json' 
            } 
        }); // Realizar una solicitud GET a la API con el token de autenticación
        
        if (!respuestaServidor.ok) throw new Error('Error al acceder a la ruta protegida'); // Verificar si la respuesta es exitosa

        const data = await respuestaServidor.json(); // Parsear la respuesta JSON
        console.log('Datos recibidos:', data);
        
        res.render('lista', { lista: data, usuario: res.locals.usuario, mostrarHeader: true }); // Renderizar la vista con los datos obtenidos y el header visible
    } catch (error) {
        console.error('Error:', error);
        res.render('lista', { mensaje: error.message, usuario: res.locals.usuario, mostrarHeader: true }); // Mostrar el mensaje de error
    }
});

router.get("/registrar", validarToken, (req, res) => {
    res.render('registro', { mostrarHeader: true }); // Renderizar la vista de registro con el header visible
});

router.post("/registrar", validarToken, async (req, res) => {
    const { nombre, password } = req.body; // Obtener el nombre y password del cuerpo de la solicitud
    
    try {
        const token = req.cookies.token; // Obtener el token de las cookies
        const respuestaServidor = await fetch('http://localhost:3000/api/add', { 
            method: 'POST', 
            headers: { 
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json' 
            }, 
            body: JSON.stringify({ nombre, password }) 
        }); // Enviar la solicitud POST con los datos y token de autenticación
        
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