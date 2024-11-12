// configiramos el servidor express, las rutas, middlewares y configuraciones globales de la applicación
// Elementos comunes que necesita la aplicación para utilizar funciones de las librerias
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const validarToken = require('./utils/token');
//Crear instancia de express que en adelante sera nuestra aplicación
const app = express();

//Configuración del renderizador
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', '.hbs');
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'general',
    layoutsDir: path.join(__dirname, '/views/layout'),
    partialsDir: path.join(__dirname, '/views/partials'),
    helpers: require('./utils/helpers')
}));

//Configuraciones de la aplicación
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // para que sea publico lo que hay en public
app.use(cookieParser());
app.use(morgan('dev'));

//middleware para validar que exista o no el token con los datos del usuario
//app.use(validarToken);

//Rutas a utilizar
app.use(require("./routes/general.js")); // debemos modificar aquí creo....
app.use(require("./routes/login.js"));
app.use(require("./routes/admin.js"));

//Exportar la app configurada
module.exports = app;