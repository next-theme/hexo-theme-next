'use strict';

require('chai').should();

const result = `<div class="link-grid"><div class="link-grid-container">
<div class="link-grid-image" style="background-image: url(/images/sample.png);"></div>
<p>Theme NexT</p><p>Stay Simple. Stay NexT.</p>
<a href="https://theme-next.js.org/"></a>
</div><div class="link-grid-container">
<div class="link-grid-image" style="background-image: url(/images/sample.png);"></div>
<p>Theme NexT</p><p>Stay Simple. Stay NexT.</p>
<a href="https://theme-next.js.org/"></a>
</div></div>`;

describe('link-grid', () => {
  const linkGrid = require('../../scripts/tags/link-grid');

  it('default', () => {
    linkGrid([], `
Theme NexT | https://theme-next.js.org/ | Stay Simple. Stay NexT. | /images/sample.png
Theme NexT | https://theme-next.js.org/ | Stay Simple. Stay NexT. | /images/sample.png`).should.eql(result);
  });

  it('comment', () => {
    linkGrid([], `
Theme NexT | https://theme-next.js.org/ | Stay Simple. Stay NexT. | /images/sample.png
Theme NexT | https://theme-next.js.org/ | Stay Simple. Stay NexT. | /images/sample.png
% Theme NexT | https://theme-next.js.org/ | Stay Simple. Stay NexT. | /images/sample.png`).should.eql(result);
  });

  it('default image', () => {
    linkGrid(['/images/sample.png'], `
Theme NexT | https://theme-next.js.org/ | Stay Simple. Stay NexT. |
Theme NexT | https://theme-next.js.org/ | Stay Simple. Stay NexT. |`).should.eql(result);
  });

  it('custom delimiter', () => {
    linkGrid(['/images/sample.png', ','], `
Theme NexT , https://theme-next.js.org/ , Stay Simple. Stay NexT. , /images/sample.png
Theme NexT , https://theme-next.js.org/ , Stay Simple. Stay NexT. , /images/sample.png`).should.eql(result);
  });

  it('custom delimiter and comment', () => {
    linkGrid(['/images/sample.png', ',', '#'], `
Theme NexT , https://theme-next.js.org/ , Stay Simple. Stay NexT. , /images/sample.png
Theme NexT , https://theme-next.js.org/ , Stay Simple. Stay NexT. , /images/sample.png
# Theme NexT , https://theme-next.js.org/ , Stay Simple. Stay NexT. , /images/sample.png`).should.eql(result);
  });
});
