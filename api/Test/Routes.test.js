const request = require('supertest')
const { describe, expect, it } = require('@jest/globals')
const fs = require('fs') // Necesitas importar el módulo 'fs' para usar fs.existsSync
const path = require('path') // Necesitas importar el módulo 'path' para manejar rutas
const app = require('../src/app')
// const fsExtra = require('fs-extra')

describe('Pruebas de subida de archivos', () => {
  const performFileUploadTest = async (fileName, fileExtension) => {
    const response = await request(app)
      .post('/upload')
      .attach('archivo', path.resolve(__dirname, `files/${fileName}.${fileExtension}`))

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', 'Archivo recibido correctamente')

    // Verificar que el archivo realmente existe en la carpeta de destino
    const filePath = path.resolve(__dirname, `download/${fileName}.${fileExtension}`)
    expect(fs.existsSync(filePath)).toBeTruthy()

    // Limpiar el archivo después de la prueba
    // fs.unlinkSync(filePath)
  }

  it('Debe subir el archivo "image" a la ruta "/upload"', async () => {
    await performFileUploadTest('image', 'jpg')
  })

  it('Debe subir el archivo "image2" a la ruta "/upload"', async () => {
    await performFileUploadTest('image3', 'jpg')
  })
})

describe('Rutas', () => {
  it('El archivo index.js existe', () => {
    const indexPath = path.resolve(__dirname, '../index.js')
    expect(fs.existsSync(indexPath)).toBeTruthy()
  })

  it('Devuelve un error si el archivo no es una imagen', async () => {
    const response = await request(app)
      .post('/upload')
      .attach('archivo', path.resolve(__dirname, 'files/readme.txt'))

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Tipo de archivo no permitido')

    // Verificar que el archivo no se haya guardado en la carpeta de destino
    const filePath = path.resolve(__dirname, 'download/readme.txt')
    expect(fs.existsSync(filePath)).toBeFalsy()
  })

  it('Devuelve un error si el archivo es mayor a 100KB', async () => {
    const response = await request(app)
      .post('/upload')
      .attach('archivo', path.resolve(__dirname, 'files/typescript.jpeg'))

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('La imagen no puede superar los 100KB')
  })

  it('Devuelve todos los archivos /download', async () => {
    const response = await request(app).get('/download')

    // Verifica que la respuesta sea un array
    expect(Array.isArray(response.body)).toBe(true)

    // Verifica que cada elemento en el array sea un objeto
    response.body.forEach(file => {
      expect(typeof file).toBe('object')
      expect(file).toHaveProperty('filename')
      expect(file).toHaveProperty('size')
      expect(file).toHaveProperty('content')
    })
  })
})
