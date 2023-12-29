const {sequelize, Files} = require('../src/db')
const { describe, it, expect, beforeAll } = require('@jest/globals')
describe('DataBase', () => {
    beforeAll(async () => {
        await sequelize.authenticate()
    })
    it('probar conexion a la base de datos', () => {
        expect(sequelize.authenticate()).resolves.not.toThrow()
    })
    it('verificar que "Files.js" tenga las props necesarisas', () => {
        const attributes = Files.rawAttributes
        expect(attributes).toHaveProperty('name')
        expect(attributes).toHaveProperty('id')
        expect(attributes).toHaveProperty('type')
        expect(attributes).toHaveProperty('size')
    })
    it('verificar en "Files.js" que los tipos de datos sean los correctos', () => {
        // Files es el modelo que lo importo desde la conexion con DB
        // el metodo rawAttributes me devuelve datos como los campos del modelo, el tipo de dato, etc.
        const attributes = Files.rawAttributes
        // si attributes tiene la prop id y el type.key verifica el tipo de dato
        expect(attributes.id.type.key).toBe('INTEGER');
        expect(attributes.name.type.key).toBe('STRING');
        expect(attributes.type.type.key).toBe('STRING');
        expect(attributes.size.type.key).toBe('INTEGER');
    })
    afterAll(async () => {
        await sequelize.close()
    })
})