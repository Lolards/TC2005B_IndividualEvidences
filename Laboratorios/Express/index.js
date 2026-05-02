const express = require('express');
const app = express();

// Middleware
app.use((req, res, next) => {
    console.log("Middleware");
    next();
});

app.get('/', (req, res, next) => {
    res.setHeader("Content-Type", "text/html");
    res.send("URL index /");
});

app.get('/unicorn', (req, res, next) => {
    res.setHeader("Content-Type", "text/html");
    res.send("UNICORNNNNNNNNNNNNNNNNNNNNNNNN");
});

app.use((req, res, next) => {
    console.log("Middleware 3");
    res.status(404);
    res.send("Not Found");
});

console.log("Before server starts");
console.log("Prueba de cambio con el watch");

app.listen(3333);