const fs = require('fs')
const util = require('util')


const readDB= util.promisify(fs.readFile)

const writeNewDB = (jsonFile, parsedNote) => {
    fs.writeFile(jsonFile, JSON.stringify(parsedNote), (err) => 
     err ? console.log(err) : console.log('Information logged')
    )
};

const readDBAppend = (titleText, jsonFile) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) =>{
        if (err) {
          console.log(err)
        } else {
          const parsedNote = JSON.parse(data)
          parsedNote.push(titleText)
          writeNewDB(jsonFile, parsedNote)   
        }
    });
};



module.exports ={ readDB, readDBAppend, writeNewDB };