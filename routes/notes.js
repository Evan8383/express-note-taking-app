const router = require('express').Router();
const mysql = require('mysql2');
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'notes_db'
  },
  console.log('Connected to the notes database')
).promise();

// const getNextId = (arr) => {
//   let id
//   for (let i = 0; i < arr.length; i++) {
//     id = arr[arr.length - 1].id
//     id += 1
//   }
//   return id
// }

// const updateNotes = async () => {
//   await fs.writeFile('./db/db.json', JSON.stringify(db, null, 2))
// }

router.route('/')
  .get(async (req, res) => {
    const [results] = await db.query('SELECT * FROM notes')
    res.json(results);
  })

  .post(async (req, res) => {
    const { title, text } = await req.body;
    if (!(title && text)) {
      return res.status(400).send('Must provide text and name')
    }
    const [results] = await db.query(
      'INSERT INTO notes (noteTitle, noteText) VALUES (?, ?)',
      [title, text]
    )
    res.json(results)
  })

router.delete('/:id', async (req, res) => {
  const noteId = req.params.id
  const [results] = await db.query('DELETE FROM notes WHERE noteID=?', noteId);
  res.json(results)
})

router.put('/:id', async (req, res) =>{
  
})

module.exports = router