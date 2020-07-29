/**
 * mermaid.js | https://theme-next.js.org/docs/tag-plugins/mermaid
 */

'use strict';

module.exports = function(args, content) {
  return `<pre class="mermaid" style="text-align: center;">
${args.join(' ')}
${content}
</pre>`;
};
