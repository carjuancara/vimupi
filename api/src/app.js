const express = require('express')
const fs = require('fs')
const path = require('path')
const { upload } = require('./functions')
const server = express()

// Manejador de la ruta que utiliza Multer para cargar archivos
server.post('/upload', upload.single('archivo'), (req, res) => {
  res.status(200).json({ message: 'Archivo recibido correctamente' })
})

server.get('/download', (req, res) => {
  const directoryPath = path.resolve(__dirname, '../Test/download')
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

  // Si el flujo de respuesta aún no se ha cerrado, lo ciérro antes de pasar al siguiente middleware
  if (!res.headersSent) {
    res.status(500).json({ error: 'Internal Server Error' })
  }

  next(err)
})

module.exports = server
