const multer = require('multer')
const path = require('path')

// Configurar el almacenamiento y filtrar por tipo de archivo
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../Test/download'),
  filename: (req, file, cb) => {
    // Define el nombre del archivo en el servidor
    cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  // Filtrar por tipo de archivo permitido (en este caso, solo imágenes)
  const typeFilter = /jpeg|jpg|gif/
  const array = file.originalname.split('.')
  const isValid = array[1]
  if (typeFilter.test(isValid)) {
    cb(null, true) // Aceptar el archivo
  } else {
    cb(new Error('Tipo de archivo no permitido'), false) // Rechazar el archivo
  }
}

// Configurar Multer con el almacenamiento y el filtro de archivos
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 102400 } // Limite de tamaño en bytes (100 KB)
})

module.exports = {
  upload,
  fileFilter,
  storage
}
