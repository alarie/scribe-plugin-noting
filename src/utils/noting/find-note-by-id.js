var flatten = require('lodash.flatten');
var isVFocus = require('../vfocus/is-vfocus');
var hasNoteId = require('./has-note-id');
var findAllNotes = require('./find-all-notes');
var errorHandle = require('../error-handle');
var config = require('../../config');

// Find a note based on its ID. Will not always give the same result as `findEntireNote` ,
// since that'll recognize that a note is adjacent to another one. But when a note
// covers several paragraphs we can't be sure findEntireNote
// will give us the right result (see comment for findEntireNote).
//
// TODO: Redo findEntireNote to be based on findNote and IDs? Could perhaps
// find adjacent notes with the help of focus.prev() and focus.next().
module.exports = function findNoteById(focus, noteId, tagName = config.get('defaultTagName')) {

  if (!isVFocus(focus)) {
    errorHandle('Only a valid VFocus can be passed to findNoteById, you passed: ', focus);
  }


  var allNoteSegments = flatten(findAllNotes(focus, tagName));
  return allNoteSegments.filter((segment)=> hasNoteId(segment.vNode, noteId));

};
