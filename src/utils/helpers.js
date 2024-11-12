const handlebars = require('handlebars');  // Importamos handlebars

handlebars.registerHelper('estaAutenticado', function(options) {  // Registramos el helper 'estaAutenticado'
    const usuario = options.data.root.usuario;  // Obtenemos el usuario del contexto

    if (usuario && usuario.nombre) {  // Si el usuario está autenticado (tiene un nombre)
        return typeof options.fn === 'function' ? options.fn(this) : '';  // Ejecutamos el bloque verdadero si el usuario tiene nombre
    }

    return typeof options.inverse === 'function' ? options.inverse(this) : '';  // Ejecutamos el bloque falso si no está autenticado
});

handlebars.registerHelper('esAdmin', function(rol, options) {  // Registramos el helper 'esAdmin'
    return rol === 1 ? options.fn(this) : options.inverse(this);  // Si el rol es 1 (admin), ejecutamos el bloque verdadero
});