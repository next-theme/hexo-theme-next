'use strict';

require('chai').should();

describe('mermaid', () => {
  const mermaid = require('../../scripts/tags/mermaid');
  const result = `A[Christmas] -->|Get money| B(Go shopping)
B --> C{Let me thinksssss<br>ssssssssssssssssssssss<br>sssssssssssssssssssssssssss}
C -->|One| D[Laptop]
C -->|Two| E[iPhone]
C -->|Three| F[Car]`;

  it('default', () => {
    mermaid(['graph', 'TD'], result).should.eql(`<pre class="mermaid" style="text-align: center;">
graph TD
${result}
</pre>`);
  });
});
