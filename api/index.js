const server = require('./src/app')
const { conn } = require('./src/db')

const PORT = 3000

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log('¡Servidor en funcionamiento!')
  })
})
