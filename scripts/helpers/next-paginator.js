/* global hexo */

'use strict';

hexo.extend.helper.register('next_paginator', function() {
  const prev = this.__('accessibility.prev_page');
  const next = this.__('accessibility.next_page');
  let paginator = this.paginator({
    prev_text: '<i class="fa fa-angle-left"></i>',
    next_text: '<i class="fa fa-angle-right"></i>',
    mid_size : 1,
    escape   : false
  });
  paginator = paginator
    .replace('rel="prev"', `rel="prev" title="${prev}" aria-label="${prev}"`)
    .replace('rel="next"', `rel="next" title="${next}" aria-label="${next}"`);
  return paginator;
});
