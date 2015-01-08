var _ = require('lodash');
var isVFocus = require('../vfocus/is-vfocus');
var isNoteSegment = require('./is-note-segment');
var findEntireNote = require('./find-entire-note');
var errorHandle = require('../error-handle');

module.exports = function findAllNotes(focus) {

  if (!isVFocus(focus)) {
    errorHandle('Only a valid VFocus can be passed to findAllNotes, you passed: ', focus);
  }

  // Returns an array of arrays of note segments
  return focus
    .filter(isNoteSegment)
    .map(findEntireNote)
    .reduce(function(uniqueNotes, note) {
      // First iteration: Add the note.
      if (uniqueNotes.length === 0) return uniqueNotes.concat([note]);

      // Subsequent iterations: Add the note if it hasn't already been added.
      return _.last(uniqueNotes)[0].vNode === note[0].vNode ? uniqueNotes : uniqueNotes.concat([note]);
    }, []);

};
