const app = require('./app')
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`)
})