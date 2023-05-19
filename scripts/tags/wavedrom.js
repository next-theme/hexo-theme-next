/**
 * wavedrom.js | https://theme-next.js.org/docs/tag-plugins/wavedrom
 */

'use strict';

module.exports = function(args, content) {
  return `<script type="WaveDrom">
${content}
</script>`;
};
