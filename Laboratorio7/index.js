let log = console.log;
const fs = require('fs');
const path = require('path');

/*
//fs es el modulo que contiene las funciones para manipular el sistema de archivos
const fs = require("fs");

//creamos un nuevo archivo con la clase writeFileSync
fs.writeFileSync("archivo.txt", "Hola Mundo",);

//ASync sort
const arreglo = [50000, 5, 3, 8, 1, 2];

for (let item of arreglo) {
    setTimeout(() => {
        log(item);
    }, item);//Lo que tarda en imprimirse es el valor del item, por lo que se imprimen en orden de menor a mayor
}
*/
const http = require('http');
const server = http.createServer((req, res) => {
  log(req.url);

  if (req.url === '/devcard') {
    res.setHeader('Content-Type', 'text/html');
    const html = fs.readFileSync(path.resolve(__dirname, "./indexEvents.html"), "utf-8");
    res.write(html);
    res.end();
    return;
  }

  res.setHeader("content-type", "text/html");
  res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>HTML</title>
        </head>
        <body>
        <h1>hola mundo desde node</h1>
        <javascript>
             //Mi código Javascript
             console.log("Hello");
        </javascript>
        </body>
        </html>
    `);
  res.end();
});

server.listen(6430, () => {
  log("Mi servidor está vivo corriendo en el puerto 6430");
});