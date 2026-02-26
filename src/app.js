require('dotenv').config();
const { configDotenv } = require('dotenv');
const express = require('express');
const cors = require('cors');
const { CLIENT_RENEG_LIMIT } = require('tls');
const morgan = requiere('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { version } = require('os');
const specs = swaggerJssDoc({
    definition: {
        openpi: "3.0.0",
        info: {
             title: "MARKETPLACE API", version: "1.0.0"},
        },
        apis: ["./routes/*.js"],
    });
const app = express();
const brcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));


const PORT = process.env.PORT || 3000;
app.listen(PORT,() =>{
    console.log('Servidor encendido y escucando en el puerto ' + PORT);
})