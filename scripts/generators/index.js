/* global hexo */

'use strict';

hexo.extend.generator.register('webmanifest_generator', () => require('./lib/webmanifest')(hexo));
