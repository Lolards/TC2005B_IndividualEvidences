const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 6767;
const log = console.log;

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const controller = require('./index.controller');
app.post('/upload_file', controller.upload_file);
app.get('/get_private_file/:file', controller.get_private_file);


app.listen(port, () => {
    // server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
});
