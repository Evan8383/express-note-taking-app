const express = require('express');
const app = express();

const routes = require('./routes')

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(express.static('public'));
app.use('/api', routes)

app.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/public/notes.html')
})


module.exports = app;