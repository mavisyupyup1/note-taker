const router = require('express').Router();
const { createNewNote, validateNote } = require('../../lib/db');
const { db } = require('../../db/db.json');
const notesData = require('../../db/db.json')
router.get('/notes', (req, res) => {
  res.json(notesData);
});

router.post('/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notesData.length.toString();

  if (!validateNote(req.body)) {
    res.status(400).send('The note is not properly formatted.');
  } else {
    const note = createNewNote(req.body, notesData);
    res.json(notesData);
  }
});

module.exports = router;
