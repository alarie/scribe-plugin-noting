var isVFocus = require('../../utils/vfocus/is-vfocus');
var getNoteDataAttributes = require('../../utils/get-note-data-attrs');
var createVirtualScribeMarker = require('../../utils/create-virtual-scribe-marker');
var wrapInNote = require('./wrap-in-note');
var findScribeMarkers = require('../../utils/noting/find-scribe-markers');
var findEntireNote = require('../../utils/noting/find-entire-note');
var resetNoteSegmentClasses = require('./reset-note-segment-classes');
var errorHandle = require('../../utils/error-handle');
var config = require('../../config');

// We need a zero width space character to make the note selectable.
var zeroWidthSpace = '\u200B';

module.exports = function createNoteAtCaret(focus, tagName = config.get('defaultTagName')) {

  if (!isVFocus(focus)) {
    errorHandle('Only a valid VFocus can be passed to createNoteAtCaret, you passed: %s', focus);
  }

  // To make sure the caret is placed within the note we place a scribe
  // maker within it.
  // Chrome is picky about needing the space to be before the marker
  // (otherwise the caret won't be placed within the note).
  var note = wrapInNote([zeroWidthSpace, createVirtualScribeMarker()], getNoteDataAttributes(), tagName);

  var marker = findScribeMarkers(focus)[0];
  if (!marker) {
    errorHandle('No scribe marker found within selection: %s', focus);
  }

  //inject the note
  marker.replace(note);

  //get any adjoining note segments
  var noteSegments = findEntireNote(marker, tagName);
  resetNoteSegmentClasses(noteSegments, tagName);

  return focus;

};
