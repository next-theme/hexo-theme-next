'use strict';

require('chai').should();
const Hexo = require('hexo');
const hexo = new Hexo();

const link = '<div class="group-picture-column"><a href="https://theme-next.js.org/"><img src="/images/sample.png"></a></div>';
const image = '<div class="group-picture-column"><img src="/images/sample.png"></div>';

describe('group-pictures', () => {
  const groupPicture = require('../../scripts/tags/group-pictures')(hexo);

  before(() => hexo.init().then(() => hexo.loadPlugin(require.resolve('hexo-renderer-marked'))));

  it('layout 3-3', () => {
    groupPicture(['3-3'], `
![](/images/sample.png)
![](/images/sample.png)
![](/images/sample.png)`).should.eql(`<div class="group-picture"><div class="group-picture-row">${image}${image}${image}</div></div>`);
  });

  it('layout 5-2', () => {
    groupPicture(['5-2'], `
![](/images/sample.png)
![](/images/sample.png)
![](/images/sample.png)
![](/images/sample.png)
![](/images/sample.png)`).should.eql(`<div class="group-picture"><div class="group-picture-row">${image}${image}</div><div class="group-picture-row">${image}</div><div class="group-picture-row">${image}${image}</div></div>`);
  });

  it('remove text', () => {
    groupPicture(['3-3'], `
![](/images/sample.png)
Text
![](/images/sample.png)
Text
![](/images/sample.png)`).should.eql(`<div class="group-picture"><div class="group-picture-row">${image}${image}${image}</div></div>`);
  });

  it('set hyperlinks', () => {
    groupPicture(['4-3'], `
![](/images/sample.png)
[![](/images/sample.png)](https://theme-next.js.org/)
[![](/images/sample.png)](https://theme-next.js.org/)
![](/images/sample.png)`).should.eql(`<div class="group-picture"><div class="group-picture-row">${image}${link}</div><div class="group-picture-row">${link}${image}</div></div>`);
  });

  it('set hyperlinks 2', () => {
    groupPicture(['3-3'], `
![](/images/sample.png)
[![](/images/sample.png)](https://theme-next.js.org/)
![](/images/sample.png)`).should.eql(`<div class="group-picture"><div class="group-picture-row">${image}${link}${image}</div></div>`);
  });

  it('no layout', () => {
    groupPicture(['NaN-NaN'], `
![](/images/sample.png)
![](/images/sample.png)
![](/images/sample.png)
![](/images/sample.png)
![](/images/sample.png)`).should.eql(`<div class="group-picture"><div class="group-picture-row">${image}${image}${image}</div><div class="group-picture-row">${image}${image}</div></div>`);
  });
});
