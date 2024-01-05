const { Router } = require('express')
const { upload } = require('../functions')
const uploadRoutes = Router()

// Manejador de la ruta que utiliza Multer para cargar archivos
uploadRoutes.post('/', upload.single('archivo'), (req, res) => {
  res.status(200).json({ message: 'Archivo recibido correctamente' })
})
module.exports = uploadRoutes
