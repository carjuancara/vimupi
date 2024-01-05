const { Router } = require('express')
const fs = require('fs')
const path = require('path')
const downloadRoutes = Router()

// ruta para descargar todas las imagenes en formato binario
downloadRoutes.get('/', (req, res) => {
  const directoryPath = path.resolve(__dirname, '../../Test/download')
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

module.exports = downloadRoutes
