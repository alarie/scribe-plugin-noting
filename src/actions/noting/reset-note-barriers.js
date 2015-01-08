var isVFocus = require('../../utils/vfocus/is-vfocus');
var isVText = require('../../utils/vfocus/is-vtext');
var findAllNotes = require('../../utils/noting/find-all-notes');
var createNoteBarrier = require('../../utils/create-note-barrier');
var isNotWithinNote = require('../../utils/noting/is-not-within-note');
var isNotEmpty = require('../../utils/vfocus/is-not-empty');
var errorHandle = require('../../utils/error-handle');

module.exports = function resetNoteBarriers(focus) {

  if (!isVFocus(focus)) {
    errorHandle('Only a valid VFocus element can be passed to resetNoteBarriers, you passed: ', focus);
  }

  //remove any note barriers that exist
  focus.filter(isVText).forEach(focus => {
    focus.vNode.text = focus.vNode.text.replace(/\u200B/g, '');
  });

  //add new note barriers
  findAllNotes(focus).forEach(noteSegments => {
    //first note
    noteSegments[0].next().insertBefore(createNoteBarrier());
    //last note
    var lastNote = noteSegments.slice(-1)[0].find(isNotWithinNote);
    //find the first non-empty text node after the note
    var adjacentTextNode = lastNote && lastNote.find(isNotEmpty);

    if(adjacentTextNode){
      adjacentTextNode.vNode.text = '\u200B' + adjacentTextNode.vNode.text;
    }
  });


 };
