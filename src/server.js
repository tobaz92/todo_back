const { app } = require('./app')

const PORT = process.env.API_PORT || 3000

app.listen(PORT, () => {
  console.log(`TODO BACK listening on port ${PORT}!`)
})
