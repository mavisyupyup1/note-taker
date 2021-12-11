const fs = require('fs');
const path = require('path');

function readNotes(){
  const data  = fs.readFileSync('../db/db.json')
  return JSON.parse(data)
}
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify({notesArray }, null, 2)
    );
    return note;
  }

  function validateNote(note) {
    if (!note.title|| typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    return true;
  }

  module.exports ={
    readNotes,
      createNewNote,
      validateNote
  };
  