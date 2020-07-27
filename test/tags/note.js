'use strict';

require('chai').should();
const Hexo = require('hexo');
const hexo = new Hexo();

const content = 'Test **Bold** *Italic*';
const result = '<p>Test <strong>Bold</strong> <em>Italic</em></p>';
const args = 'This is a *summary*'.split(' ');
const summary = '<summary><p>This is a <em>summary</em>';

describe('note', () => {
  const postNote = require('../../scripts/tags/note')(hexo);

  before(() => hexo.init().then(() => hexo.loadPlugin(require.resolve('hexo-renderer-marked'))));

  it('only text', () => {
    postNote([], content).should.eql(`<div class="note ">${result}
</div>`);
  });

  it('classes and text', () => {
    postNote(['primary'], content).should.eql(`<div class="note primary">${result}
</div>`);
  });

  it('classes, no-icon and text', () => {
    postNote(['primary', 'no-icon'], content).should.eql(`<div class="note primary no-icon">${result}
</div>`);
  });

  it('summary and text', () => {
    postNote(args, content).should.eql(`<details class="note ">${summary}</p>
</summary>
${result}

</details>`);
  });

  it('classes, summary and text', () => {
    postNote(['primary'].concat(args), content).should.eql(`<details class="note primary">${summary}</p>
</summary>
${result}

</details>`);
  });

  it('classes, no-icon, summary and text', () => {
    postNote(['primary', 'no-icon'].concat(args), content).should.eql(`<details class="note primary no-icon">${summary}</p>
</summary>
${result}

</details>`);
  });
});
