//rutas para el inicio de sesión 
const { Router } = require('express');
const valarToken = require('../utils/token');
const router = Router();

// Ruta para la vista de login
router.get("/login", valarToken, (req, res) => {
  if (res.locals.usuario.nombre !== '') {
    console.log("Usuario ya autenticado, redirecciona a inicio");
    res.redirect('/panel'); // Redirige a panel si el usuario ya está autenticado
  } else {
    res.render('login', { mensaje: "Iniciar sesión", mostrarHeader: false }); // No mostrar header en login
  }
});

// Ruta POST para manejar el inicio de sesión
router.post("/login", async (req, res) => {
  const { usuario, pass } = req.body;
  try {
      const response = await fetch('http://localhost:3000/api/auth', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ usuario, pass })
      });
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error de autenticación');
      }
      const data = await response.json();
      res.redirect('/panel'); // Redirige al panel después de autenticarse

  } catch (err) {
      console.error('Error al iniciar sesión:', err);
      res.render('login', { mensaje: "Error de servor", mostrarHeader: false }); // No mostrar header en caso de error
  }
});

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  res.redirect('/');
});

module.exports = router;