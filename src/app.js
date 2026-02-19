const { configDotenv } = require('dotenv');
const express = require('express');
const { CLIENT_RENEG_LIMIT } = require('tls');
const morgan = requiere('morgan');
require('dotenv').config();

const app = express();
// Middleware
app.use(morgan('dev'));
app.use(express.json());


const PORT = process.env.PORT || 3000;
app.listen(PORT,() =>{
    console.log('Servidor encendido y escucando en el puerto ' + PORT);
})