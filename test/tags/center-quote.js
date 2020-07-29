'use strict';

require('chai').should();
const Hexo = require('hexo');
const hexo = new Hexo();

const content = 'Test **Bold** *Italic*';
const result = '<p>Test <strong>Bold</strong> <em>Italic</em></p>';

describe('center-quote', () => {
  const centerQuote = require('../../scripts/tags/center-quote')(hexo);

  before(() => hexo.init().then(() => hexo.loadPlugin(require.resolve('hexo-renderer-marked'))));

  it('markdown content', () => {
    centerQuote([], content).should.eql(`<blockquote class="blockquote-center">
${result}

</blockquote>`);
  });
});
