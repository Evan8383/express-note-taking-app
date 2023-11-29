const router = require('express').Router();
const db = require('../db/db.json')
const fs = require('fs').promises;

const getNextId = (arr) => {
  let id
  for (let i = 0; i < arr.length; i++) {
    id = arr[arr.length - 1].id
    id += 1
  }
  return id
}

const updateNotes = async () => {
  await fs.writeFile('./db/db.json', JSON.stringify(db, null, 2))
}

router.route('/')
  .get(async (req, res) => {
    await updateNotes()
    res.json(db)
  })

  .post(async (req, res) => {
    const { title, text } = await req.body
    let id = getNextId(db) || 1
    const noteData = { id, title, text }

    db.push(noteData)
    res.send('Note added')
  })

router.delete('/:id', (req, res) => {
  db.forEach((note, index) => {
    if (note.id == req.params.id) {
      db.splice(index, 1)
    }
  })
  res.send('Note removed')
})

module.exports = router