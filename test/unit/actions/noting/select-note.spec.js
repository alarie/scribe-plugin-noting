var path = require('path');
var chai = require('chai');
var expect = chai.expect;

var h = require('virtual-hyperscript');
var VText = require('vtree/vtext');
var VFocus = require(path.resolve(process.cwd(), 'src/vfocus'));

var selectNote = require(path.resolve(process.cwd(), 'src/actions/noting/select-note'));

describe('selectNote()', function() {

  it('should select note contents', function() {

    var tree = h('p', [
      h('gu-note', [
        new VText('This'),
        new VText('is'),
        new VText('some'),
        h('em.scribe-marker'),
        new VText('content'),
      ])
    ]);

    tree = new VFocus(tree);
    var noteSegment = tree.next().next();
    selectNote(noteSegment);

    expect(tree.next().vNode.children[0].tagName).to.equal('em');
    expect(tree.next().vNode.children.slice(-1)[0].tagName).to.equal('em');

  });
});
