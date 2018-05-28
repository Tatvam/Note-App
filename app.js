//console.log("Starting app");
const chalk = require('chalk');
const fs = require('fs'); 
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');
const titleOptions = {
    describe:'Title of note', 
    demand: true,
    alias: 't'
};
const bodyOptions = {
    describe:'Body of note',
    demand: true,
    alias: 'b'
};
const argv = yargs
    .command('add','Add a new note',{
        title : titleOptions,
        body :  bodyOptions
    })
    .command('list','List of all Notes')
    .command('read','Read a Note',{
        title : titleOptions
    })
    .command('remove','Remove Note',{
        title: titleOptions
    })
    .help()
    .argv;
//console.log(yargs.argv);
//console.log(process.argv);
var command = argv._[0];

if(command === "add"){
    var note = notes.addNote(argv.title,argv.body);
    if(note){
        console.log(chalk.underline('Note created'));
        notes.logNote(note);
    }
    else{
        console.log(chalk.red('Note title taken'));
    }

}else if(command === 'list'){
    var allNotes = notes.getAll();
    console.log(chalk.underline(`Printing ${allNotes.length} note(s)`));
    allNotes.forEach((note) => notes.logNote(note));
}else if(command === 'read'){
    var note = notes.getNote(argv.title);
    if(note){
        console.log(chalk.underline('Note found'));
        notes.logNote(note);
       }
       else{
               console.log(chalk.red('Note not found'));
       }
}else if(command === 'remove'){
    var noteRemoved =notes.removeNote(argv.title);
    var message =  noteRemoved ? 'Note was Removed' : 'Note not found';
    console.log(chalk.blue(message));
}else{
    console.log(chalk.red('Command not recognized'));
}

