// para arrancar la app en el puerto 8080 es donde tenemos el servidor
// .listen para que el servidor comience a escuchar las solicitudes
const app = require("./app");

//Ejecutar la app configurada
async function main() {
    const port = 8080;
    await app.listen(port);
    console.log("Servidor funcionando en el puerto "+port);
}

main();