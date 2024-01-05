const express = require('express')

const uploadRoutes = require('./Routes/uploadRoutes')
const downloadRoutes = require('./Routes/downloadRoutes')
const server = express()

server.use('/upload', uploadRoutes)
server.use('/download', downloadRoutes)

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
