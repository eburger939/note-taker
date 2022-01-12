const express = require('express');
const path = require('path');
let db = require('./db/db.json')
const fs = require('fs');
const uuid = require('uuid');


const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });

///////////////////////////////////////////////


  app.get('/api/notes', (req, res) => {
  db = JSON.parse(fs.readFileSync('./db/db.json')) || []
  res.json(db);
})

  app.post('/api/notes', (req, res) => {
    let newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text 
    }
    db.push(newNote)
    
    fs.writeFileSync(('./db/db.json', JSON.stringify(db), function(err) {
        if (err) {
          console.log(err) 
        }
    } )) 
    res.json(db)
  })


app.delete('/api/notes/:id', (req, res) => {
    let eraseNote = req.params.id
    let newList = db.filter(note => note.id != eraseNote)
    db = newList
    res.json(db)
})


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})