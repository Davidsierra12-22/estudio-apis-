const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Asegúrate de que esta carpeta exista
  },
  filename: function (req, file, cb) {
    // Ejemplo: 1709492000-mifoto.png
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage: storage });
const express = require('express'); 
const UsuarioController = require('../controllers/usuarioController'); 
const {  
  validacionCrearUsuario,  
  validacionParametroId  
} = require('../middlewares/validaciones'); 
 
const router = express.Router(); 
 
// POST /api/usuarios - Crear usuario 
router.post('/', validacionCrearUsuario, UsuarioController.crear); 
 
// GET /api/usuarios - Listar usuarios 
router.get('/', UsuarioController.listar); 
 
// GET /api/usuarios/:id - Obtener usuario por ID 
router.get('/:id', validacionParametroId, UsuarioController.obtener); 
 
module.exports = router;