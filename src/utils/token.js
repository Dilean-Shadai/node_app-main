const validarToken = (req, res, next) => { 
    const token = req.cookies.token;  // Obtenemos el token de las cookies

    if (!token) {  // Si no hay token
        res.locals.usuario = { rol: null, nombre: '' };  // Definimos un usuario sin rol ni nombre
        return next();  // Llamamos a next() para continuar con la ejecución
    }

    jwt.verify(token, secretKey, (err, decoded) => {  // Verificamos el token usando la clave secreta
        if (err) {  // Si hay un error con el token
            res.locals.usuario = { rol: null, nombre: '' };  // Definimos un usuario sin rol ni nombre
            console.log("token inactivo");  // Mostramos que el token está inactivo
            return next();  // Llamamos a next() para continuar con la ejecución
        }

        res.locals.usuario = decoded;  // Si el token es válido, asignamos los datos decodificados al usuario
        console.log("token activo");  // Mostramos que el token está activo
        next();  // Llamamos a next() para continuar con la ejecución
    });
};

module.exports = validarToken;  // Exportamos la función para usarla en otras partes del proyecto
