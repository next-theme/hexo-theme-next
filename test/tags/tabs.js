'use strict';

require('chai').should();
const Hexo = require('hexo');
const hexo = new Hexo();

const content = 'Test **Bold** *Italic*';
const result = '<p>Test <strong>Bold</strong> <em>Italic</em></p>';
const container = '<div class="tabs" id="name"><ul class="nav-tabs">';

describe('tabs', () => {
  const postTabs = require('../../scripts/tags/tabs')(hexo);

  before(() => hexo.init().then(() => hexo.loadPlugin(require.resolve('hexo-renderer-marked'))));

  it('empty', () => {
    postTabs(['name']).should.eql(`${container}</ul><div class="tab-content"></div></div>`);
  });

  it('default', () => {
    postTabs(['name'],
      `<!-- tab -->
${content}
<!-- endtab -->

<!-- tab -->
${content}
<!-- endtab -->`).should.eql(`${container}<li class="tab active"><a href="#name-1">name 1</a></li><li class="tab"><a href="#name-2">name 2</a></li></ul><div class="tab-content"><div class="tab-pane active" id="name-1">${result}</div><div class="tab-pane" id="name-2">${result}</div></div></div>`);
  });

  it('selected index', () => {
    postTabs('name, 2'.split(' '),
      `<!-- tab -->
${content}
<!-- endtab -->

<!-- tab -->
${content}
<!-- endtab -->`).should.eql(`${container}<li class="tab"><a href="#name-1">name 1</a></li><li class="tab active"><a href="#name-2">name 2</a></li></ul><div class="tab-content"><div class="tab-pane" id="name-1">${result}</div><div class="tab-pane active" id="name-2">${result}</div></div></div>`);
  });

  it('no tab selected', () => {
    postTabs('name, -1'.split(' '),
      `<!-- tab -->
${content}
<!-- endtab -->

<!-- tab -->
${content}
<!-- endtab -->`).should.eql(`${container}<li class="tab"><a href="#name-1">name 1</a></li><li class="tab"><a href="#name-2">name 2</a></li></ul><div class="tab-content"><div class="tab-pane" id="name-1">${result}</div><div class="tab-pane" id="name-2">${result}</div></div></div>`);
  });

  it('label', () => {
    postTabs('name'.split(' '),
      `<!-- tab Tab 1 -->
${content}
<!-- endtab -->

<!-- tab Tab 2 -->
${content}
<!-- endtab -->`).should.eql(`${container}<li class="tab active"><a href="#name-1">Tab 1</a></li><li class="tab"><a href="#name-2">Tab 2</a></li></ul><div class="tab-content"><div class="tab-pane active" id="name-1">${result}</div><div class="tab-pane" id="name-2">${result}</div></div></div>`);
  });

  it('icon (Font Awesome 4)', () => {
    postTabs('name'.split(' '),
      `<!-- tab @home -->
${content}
<!-- endtab -->

<!-- tab @home -->
${content}
<!-- endtab -->`).should.eql(`${container}<li class="tab active"><a href="#name-1"><i class="fa fa-home"></i></a></li><li class="tab"><a href="#name-2"><i class="fa fa-home"></i></a></li></ul><div class="tab-content"><div class="tab-pane active" id="name-1">${result}</div><div class="tab-pane" id="name-2">${result}</div></div></div>`);
  });

  it('icon', () => {
    postTabs('name'.split(' '),
      `<!-- tab @fab fa-fort-awesome -->
${content}
<!-- endtab -->

<!-- tab @fab fa-fort-awesome -->
${content}
<!-- endtab -->`).should.eql(`${container}<li class="tab active"><a href="#name-1"><i class="fab fa-fort-awesome"></i></a></li><li class="tab"><a href="#name-2"><i class="fab fa-fort-awesome"></i></a></li></ul><div class="tab-content"><div class="tab-pane active" id="name-1">${result}</div><div class="tab-pane" id="name-2">${result}</div></div></div>`);
  });

  it('label and icon', () => {
    postTabs('name, -1'.split(' '),
      `<!-- tab Tab 1@home -->
${content}
<!-- endtab -->

<!-- tab Tab 1@home -->
${content}
<!-- endtab -->`).should.eql(`${container}<li class="tab"><a href="#name-1"><i class="fa fa-home"></i>Tab 1</a></li><li class="tab"><a href="#name-2"><i class="fa fa-home"></i>Tab 1</a></li></ul><div class="tab-content"><div class="tab-pane" id="name-1">${result}</div><div class="tab-pane" id="name-2">${result}</div></div></div>`);
  });
});
