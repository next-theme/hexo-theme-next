'use strict';

require('chai').should();

describe('center-quote', () => {
  const Hexo = require('hexo');
  const hexo = new Hexo(__dirname);
  const centerQuote = require('../../scripts/tags/center-quote')(hexo);

  before(() => hexo.init().then(() => hexo.loadPlugin(require.resolve('hexo-renderer-marked'))));

  it('markdown content', () => {
    centerQuote([], 'Test **Bold** *Italic*').should.eql(`<blockquote class="blockquote-center">
<p>Test <strong>Bold</strong> <em>Italic</em></p>

</blockquote>`);
  });
});
