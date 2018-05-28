//console.log('Starting notes.js')

const fs = require('fs');
const chalk = require('chalk');
var fetchNotes = () => {
        try{
                var notesString = fs.readFileSync('notes-data.json')
                return JSON.parse(notesString);
        }catch(e){
                return [];
        }
};
var saveNotes = (notes) => {
        fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};




//console.log(module);
var addNote = (title,body) => {
        var notes = fetchNotes();
        var note = {
                title,
                body
        };
  
        var duplicateNotes = notes.filter((note) => note.title === title);
        if(duplicateNotes.length === 0){
                notes.push(note);
                saveNotes(notes);
                return note;
                
        }
       
};
var getAll = () =>{
       return fetchNotes();
}
var getNote = (title) => {
       var notes = fetchNotes();
       var filNotes = notes.filter((note) => note.title === title);
       return filNotes[0];     
};
var removeNote = (title) => {
       var notes = fetchNotes();
       var filNotes = notes.filter((note) => note.title!==title);
       saveNotes(filNotes);

       return notes.length !== filNotes.length;
};
var logNote = (note) => {
        console.log('__');
        console.log(chalk.red(`Title: ${note.title}`));
        console.log(chalk.red(`Body: ${note.body}`));
    };
module.exports = {
        addNote: addNote,
        getAll: getAll,
        getNote,
        removeNote,
        logNote
}


/*module.exports.addNote = (title,body) => {
        console.log('addnote');
        console.log(title,body);
        return 'Notes';
};
module.exports.age = 25;
*/