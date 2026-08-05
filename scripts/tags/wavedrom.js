/**
 * wavedrom.js | https://theme-next.js.org/docs/tag-plugins/wavedrom
 */

'use strict';

module.exports = function(args, /** @type {string} */ content) {
  return `<div class="wavedrom"><script type="WaveDrom">
${content}
</script></div>`;
};
