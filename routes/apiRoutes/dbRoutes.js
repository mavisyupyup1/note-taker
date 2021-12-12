const router = require('express').Router();
const fs = require('fs');

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
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    let newNote = req.body;
    let uniqueId = (notes.length).toString()
    newNote.id =uniqueId;
    console.log(newNote)
    notes.push(newNote)
    fs.writeFileSync("db/db.json",JSON.stringify(notes),"utf-8",(err,data)=>{
      if(err)throw err;
      console.log("New note successfully added")
    })
    res.json(notes);
})
});
// delete api/notes/:id --should receive a query parameter containing the uuid to delete the note. to do so, read db.json, find the note with the id, filter and then rewrite the notes that's not with the id in db.json
router.delete("/notes/:id", function(req,res){
  console.log('here in delete function')
  fs.readFile('db/db.json','utf-8',(err,data)=>{
    if (err) throw err;
    let notes = JSON.parse(data);
    let notesId = req.params.id;
    let newNotesId =0;
    notes = notes.filter(currNote =>{
      return currNote.id != notesId;
    })
    for (currNote of notes) {
      currNote.id = newNotesId.toString()
      newNotesId++;
    }
    fs.writeFileSync('db/db.json',JSON.stringify(notes),'utf-8',(err,date)=>{
      if (err) throw err;
      console.log("note deleted successfully!")
    })
    res.json(notes);
  })
});

module.exports = router;
