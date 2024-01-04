const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const server = express()

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

// Manejador de la ruta que utiliza Multer para cargar archivos
server.post('/upload', upload.single('archivo'), (req, res) => {
  console.log('Solicitud de carga de archivo recibida')
  console.log('Cuerpo de la solicitud:', req.body)
  console.log('Archivo:', req.file)
  // Lógica después de cargar el archivo
  res.status(200).json({ message: 'Archivo recibido correctamente' })
})

server.get('/download', (req, res) => {
  const directoryPath = path.resolve(__dirname, '../Test/download') // Reemplaza con la ruta de tu directorio
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error al leer el directorio:', err)
      return res.status(500).send('Error interno del servidor')
    }

    const fileList = files.map(file => {
      const filePath = path.join(directoryPath, file)
      const stat = fs.statSync(filePath)

      // Leer el contenido del archivo
      const fileContent = fs.readFileSync(filePath)

      return {
        filename: file,
        content: fileContent, // Cambiado de 'path' a 'content'
        size: stat.size
      }
    })
    res.json(fileList.length > 0 ? fileList : [])
  })
})

/* server.use((err, req, res) => {
  console.error('Error no manejado:', err)
  res.status(500).json({ error: 'Internal Server Error' })
}) */

server.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'La imagen no puede superar los 100KB' })
  } else if (err.message === 'Tipo de archivo no permitido') {
    return res.status(400).json({ error: 'Tipo de archivo no permitido' })
  } else if (err.code === 'ENOENT') {
    // Manejar el caso de que el archivo no existe
    return res.status(400).json({ error: 'El archivo no existe o no puede ser encontrado' })
  }

  console.error('Error no manejado:', err)

  // Si el flujo de respuesta aún no se ha cerrado, ciérralo antes de pasar al siguiente middleware
  if (!res.headersSent) {
    res.status(500).json({ error: 'Internal Server Error' })
  }

  next(err)
})

module.exports = server