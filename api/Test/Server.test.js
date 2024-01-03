const { expect, it, describe, afterAll, beforeAll } = require('@jest/globals')
const request = require('supertest')
const app = require('../src/app')

const { conn } = require('../src/db')

describe('Server', () => {
  beforeAll(async () => {
    await conn.sync({ force: true })
  })
  it('Deberia retornar con status 200 en la ruta /', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200)
  })
  it('El servidor se levanta correctamente', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
    expect(response.text).toBe('¡Servidor en funcionamiento!') // Ajusta según tu respuesta de bienvenida
  })
  afterAll(async () => {
    conn.close()
  })
})
