'use strict';

require('chai').should();
const Hexo = require('hexo');
const hexo = new Hexo();

describe('caniuse', () => {
  const caniUse = require('../../scripts/tags/caniuse')(hexo);

  it('only feature', () => {
    caniUse(['loading-lazy-attr']).should.eql('<iframe data-feature="loading-lazy-attr" src="https://caniuse.bitsofco.de/embed/index.html?feat=loading-lazy-attr&periods=current&accessible-colours=false" frameborder="0" width="100%" height="400px"></iframe>');
  });

  it('feature and periods', () => {
    caniUse('fetch @ future_3,future_2,future_1'.split(' ')).should.eql('<iframe data-feature="fetch" src="https://caniuse.bitsofco.de/embed/index.html?feat=fetch&periods=future_3,future_2,future_1&accessible-colours=false" frameborder="0" width="100%" height="400px"></iframe>');
  });
});
