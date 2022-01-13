const app = require('express').Router()
const { readDB, readDBAppend, writeNewDB } = require('../helper/fsUtils')
const uuid = require('../helper/uuid');
let db = require('../db/db.json')


app.get('/', (req, res) => {
    console.info(`${req.method} request received`)
    readDB('./db/db.json').then((data) => res.json(JSON.parse(data)))
  })
  
  app.post('/', (req, res) => {
      const { title, text } = req.body
    if (req.body) {
        let newNote = {
          id: uuid(),
          title,
          text,
      } 
       readDBAppend(newNote, './db/db.json');
        res.json('Note added'); 
    } else {
        res.error('Problem occurred')
    }
});
  
  
  

  app.delete('/:id', (req, res) => {
    let eraseNote = req.params.id
    let newList = db.filter(note => note.id != eraseNote)
    console.log(newList)
    writeNewDB('./db/db.json', newList)
    res.json('note deleted')
});


  module.exports = app
