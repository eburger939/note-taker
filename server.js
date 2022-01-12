const express = require('express');
const path = require('path');
const db = require('./db/db.json')
const fs = require('fs')

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
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  

  app.get('/api/notes', (req, res) => res.json(db));

//   app.post('/api/notes', (req, res) =>{

//   })

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})