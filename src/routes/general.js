const { Router } = require('express');
const validarToken = require('../utils/token');
const router = Router();

router.get("/", (req, res) => {
    res.render('login', { mensaje: "Iniciar sesión", mostrarHeader: false }); // Header oculto
});

router.get("/panel", (req, res) => {
    res.render('panel', { mensaje: "Menu principal", mostrarHeader: false }); // Header oculto
});

router.get("/panel/agregar-cita", (req, res) => {
    res.render('agregar-cita', { mensaje: "Agregar nueva cita", mostrarHeader: true }); // Header visible
});

router.get("/panel/pacientes", (req, res) => {
    res.render('pacientes', { mensaje: "Ver Lista Pacientes", mostrarHeader: true }); // Header visible
});

router.get("/panel/usuarios", (req, res) => {
    res.render('usuarios', { mensaje: "Agregar usuarios", mostrarHeader: true }); // Header visible
});

module.exports = router;