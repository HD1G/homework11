const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  //constructor to use IDs
  constructor() {
    this.lastId = 0;
  }
//fixed db.json paths 
  read() {
    return readFileAsync("db/db.json", "utf8");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  // parse the JSON string and turn into an object
      // add them to a list
      // return that list (array)
  getNotes() {
    return this.read().then(notes => {
      let parsedNotes;

      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }

  // use the note argument
    // create a new note object with your required fields (text, title, id)
    // write that object to the json file
  addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("'title' and 'text' cannot be blank");
    }

    // Increment to create new ID
    const newNote = { title, text, id: ++this.lastId };

    return this.getNotes()
      .then(notes => [...notes, newNote])
      .then(updatedNotes => this.write(updatedNotes))
      .then(() => newNote);
  }

   // get all notes
    // remove the note with the given id
    // and return a list of notes that does NOT have that id (in essence the filtered list)
  removeNote(id) {
    return this.getNotes()
      .then(notes => notes.filter(note => note.id !== parseInt(id)))
      .then(filteredNotes => this.write(filteredNotes));
  }
}

module.exports = new Store();