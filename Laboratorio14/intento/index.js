require('dotenv').config();

const express     = require('express');
const path        = require('path');
const gameRoutes  = require('./routes/game.routes.js');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/games', gameRoutes);

app.listen(3232, () => {
    console.log('Servidor en http://localhost:3232');
});