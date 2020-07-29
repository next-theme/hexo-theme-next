/* global hexo */

'use strict';

const postButton = require('./button')(hexo);

hexo.extend.tag.register('button', postButton);
hexo.extend.tag.register('btn', postButton);

const caniUse = require('./caniuse')(hexo);

hexo.extend.tag.register('caniuse', caniUse);
hexo.extend.tag.register('can', caniUse);

const centerQuote = require('./center-quote')(hexo);

hexo.extend.tag.register('centerquote', centerQuote, true);
hexo.extend.tag.register('cq', centerQuote, true);

const groupPicture = require('./group-pictures')(hexo);

hexo.extend.tag.register('grouppicture', groupPicture, true);
hexo.extend.tag.register('gp', groupPicture, true);

const postLabel = require('./label')(hexo);

hexo.extend.tag.register('label', postLabel);

const linkGrid = require('./link-grid');

hexo.extend.tag.register('linkgrid', linkGrid, true);
hexo.extend.tag.register('lg', linkGrid, true);

const mermaid = require('./mermaid');

hexo.extend.tag.register('mermaid', mermaid, true);

const postNote = require('./note')(hexo);

hexo.extend.tag.register('note', postNote, true);
hexo.extend.tag.register('subnote', postNote, true);

const pdf = require('./pdf')(hexo);

hexo.extend.tag.register('pdf', pdf);

const postTabs = require('./tabs')(hexo);

hexo.extend.tag.register('tabs', postTabs, true);
hexo.extend.tag.register('subtabs', postTabs, true);
hexo.extend.tag.register('subsubtabs', postTabs, true);

const postVideo = require('./video');

hexo.extend.tag.register('video', postVideo);
