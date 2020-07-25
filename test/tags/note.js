'use strict';

require('chai').should();
const Hexo = require('hexo');
const hexo = new Hexo();

const markdown = 'Test **Bold** *Italic*';
const result = '<p>Test <strong>Bold</strong> <em>Italic</em></p>';
const summary = 'This is a summary'.split(' ');

describe('note', () => {
  const postNote = require('../../scripts/tags/note')(hexo);

  before(() => hexo.init().then(() => hexo.loadPlugin(require.resolve('hexo-renderer-marked'))));

  it('only text', () => {
    postNote([], markdown).should.eql(`<div class="note ">${result}
</div>`);
  });

  it('classes and text', () => {
    postNote(['primary'], markdown).should.eql(`<div class="note primary">${result}
</div>`);
  });

  it('classes, no-icon and text', () => {
    postNote(['primary', 'no-icon'], markdown).should.eql(`<div class="note primary no-icon">${result}
</div>`);
  });

  it('summary and text', () => {
    postNote(summary, markdown).should.eql(`<details class="note "><summary><p>This is a summary</p>
</summary>
${result}

</details>`);
  });

  it('classes, summary and text', () => {
    postNote(['primary'].concat(summary), markdown).should.eql(`<details class="note primary"><summary><p>This is a summary</p>
</summary>
${result}

</details>`);
  });

  it('classes, no-icon, summary and text', () => {
    postNote(['primary', 'no-icon'].concat(summary), markdown).should.eql(`<details class="note primary no-icon"><summary><p>This is a summary</p>
</summary>
${result}

</details>`);
  });
});
