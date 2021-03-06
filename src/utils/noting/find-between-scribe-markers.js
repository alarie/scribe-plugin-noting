var isVFocus = require('../vfocus/is-vfocus');
var isScribeMarker = require('./is-scribe-marker');
var isNotScribeMarker = require('./is-not-scribe-marker');
var errorHandle = require('../error-handle');

module.exports = function findBetweenScribeMarkers(focus) {

  if (!isVFocus(focus)) {
    errorHandle('Only a valid VFocus can be passed to findBetweenScribeMarkers, you passed: %s', focus);
  }

  //find the first scribe marker within a given focus
  var startFocus = focus.find(isScribeMarker);

  //if no scribe marker is found return a new array
  if (!startFocus) {
    return [];
  }

  //return all nodes upto the next scribe marker
  return startFocus.next().takeWhile(isNotScribeMarker);

};
