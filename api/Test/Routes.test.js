const request = require('supertest')
const { conn } = require('../src/db')
const app = require('../src/app')
const { describe, expect, it, afterAll, beforeAll } = require('@jest/globals')
// const fs = require('fs')

describe('Rutas', () => {
  beforeAll(async () => {
    await conn.sync({ force: true })
  })
  it('Debe subir un archivo a la ruta "/upload" ', async () => {
    const response = await request(app)
      .post('/uploads') // Ajusta la ruta según tu configuración
      .attach('archivo', './src/uploads/image.jpg') // Ajusta la ruta del archivo que deseas subir

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', 'Archivo recibido correctamente')
  })
  it('Devuelve un error si el archivo no es una imagen" ', async () => {
    const response = await request(app)
      .post('/uploads') // Ajusta la ruta según tu configuración
      .attach('archivo', './src/uploads/readme.txt') // Ajusta la ruta del archivo que deseas subir

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('debe ser un archivo de imagen válido')
  })
  it('Devuelve un error si el archivo es mayor a 100KB', async () => {
    const response = await request(app)
      .post('/uploads')
      .attach('archivo', './src/uploads/typescript.jpg')

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('la imagen no puede superar los 100KB')
  })
  it('Devuelve todos los archivos /download', async () => {
    const response = await request(app).get('/download')

    // Verifica que la respuesta sea un array
    expect(Array.isArray(response.body)).toBe(true)

    // Verifica que cada elemento en el array sea un objeto
    response.body.forEach(file => {
      expect(typeof file).toBe('object')
    })
  })
  /* it('El archivo index.js existe', () => {
      const indexPath = 'index.js' // Asegúrate de ajustar la ruta según la ubicación de tu archivo index.js
      expect(fs.existsSync(indexPath)).toBeTruthy()
    }) */
  afterAll(async () => {
    conn.close()
  })
})
