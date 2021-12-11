const router = require('express').Router();
const fs = require('fs')
const {createNewNote, validateNote } = require('../../lib/db');
// Helper method for generating unique ids
const uuid = require('../../helpers/uuid');
const notesData = require('../../db/db.json')
//get /api/notes --read db.json file and return all saved notes
router.get('/notes', function(req, res) {
  console.log("getting notes");
  fs.readFile(`db/db.json`,'utf-8', (err,data)=>{
  if(err) throw err;
  let notes = JSON.parse(data)
  console.log(data)
  res.json(notes)
})
});
// post /api/notes -- receive  a new note,save on the request body,add it to db.json and then return the new note to the client
router.post('/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = uuid();

  if (!validateNote(req.body)) {
    res.status(400).send('The note is not properly formatted.');
  } else {
    const note = createNewNote(req.body, notesData);
    res.json(notesData);
  }
});

module.exports = router;
