// 1. IMPORTACIONES (Primero librerías de terceros)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // Corregido: era morgan, no requiere
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

// Librerías que usarás en tus rutas (opcional importarlas aquí o en sus rutas)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const axios = require('axios');
const multer = require('multer'); // ¡No olvides instalarlo: npm install multer!

// 2. CONFIGURACIÓN DE SWAGGER (Documentación)
const specs = swaggerJsDoc({
    definition: {
        openapi: "3.0.0", // Corregido: era openapi
        info: {
            title: "MARKETPLACE API",
            version: "1.0.0",
            description: "API para Marketplace Inteligente con IA"
        },
    },
    apis: ["./routes/*.js"],
});

// 3. INICIALIZACIÓN DE LA APP
const app = express();
const PORT = process.env.PORT || 3000;

// 4. MIDDLEWARES GLOBALES
app.use(cors());
app.use(morgan('dev')); // 'dev' es más limpio para trabajar localmente
app.use(express.json({ limit: '10mb' })); // Permite JSON y limita tamaño para evitar ataques
app.use(express.urlencoded({ extended: true }));

// 5. ARCHIVOS ESTÁTICOS Y DOCUMENTACIÓN
// Esto permite que las fotos en la carpeta /uploads sean visibles en el navegador
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// 6. RUTAS
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Marketplace Inteligente API',
        version: '1.0.0',
        documentacion: '/api-docs'
    });
});

// Aquí irán tus rutas de usuarios, productos, etc.
// app.use('/api/usuarios', require('./routes/usuarios'));

// 7. MANEJO DE ERRORES (Debe ir después de las rutas)

// Middleware para rutas no encontradas (404)
app.use('*', (req, res) => {
    res.status(404).json({
        error: true,
        mensaje: 'Endpoint no encontrado'
    });
});

// Manejo de errores global (Catch-all)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: true,
        mensaje: err.message || 'Error interno del servidor'
    });
});

// 8. ENCENDER EL SERVIDOR
app.listen(PORT, () => {
    console.log(`🚀 Servidor encendido en: http://localhost:${PORT}`);
    console.log(`📄 Documentación disponible en: http://localhost:${PORT}/api-docs`);
});