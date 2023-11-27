const db = require('./db/db.json')
const fs = require('fs').promises;
const express = require('express');
const app = express();
const PORT = 3002;

const getNextId = (arr) => {
  let id
  for (let i = 0; i < arr.length; i++) {
    id = arr[arr.length - 1].id
    id += 1
  }
  return id
}

const appendNewNote = async () => {
  await fs.writeFile('./db/db.json', JSON.stringify(db))
}

app.use(express.static('public'));
app.use(express.json());

app.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/public/notes.html')
})

app.get('/api/notes', (req, res) => {
  appendNewNote()
  res.json(db)
})

app.post('/api/notes', async (req, res) => {
  const { title, text } = await req.body
  let id = getNextId(db) || 0

  const noteData = { id, title, text }
  db.push(noteData)
  res.json(db)
})

app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`)
})