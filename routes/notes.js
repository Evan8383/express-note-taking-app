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

router.route('/:id')
    .delete(async (req, res) => {
        const noteId = req.params.id
        const [results] = await db.query('DELETE FROM notes WHERE noteID=?', noteId);
        res.json(results)
    })

    .put(async (req, res) => {
        const noteId = req.params.id
        const { title: noteTitle, text: noteText } = req.body
        const [results] = await db.query(
            'UPDATE notes SET ? WHERE noteID=?',
            [{ noteTitle, noteText }, noteId]
        );
        res.json(results)
    })

module.exports = router