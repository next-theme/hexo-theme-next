/**
 * group-pictures.js | https://theme-next.js.org/docs/tag-plugins/group-pictures
 */

'use strict';

const LAYOUTS = {
  2: {
    1: [1, 1],
    2: [2]
  },
  3: {
    1: [3],
    2: [1, 2],
    3: [2, 1]
  },
  4: {
    1: [1, 2, 1],
    2: [1, 3],
    3: [2, 2],
    4: [3, 1]
  },
  5: {
    1: [1, 2, 2],
    2: [2, 1, 2],
    3: [2, 3],
    4: [3, 2]
  },
  6: {
    1: [1, 2, 3],
    2: [1, 3, 2],
    3: [2, 1, 3],
    4: [2, 2, 2],
    5: [3, 3]
  },
  7: {
    1: [1, 2, 2, 2],
    2: [1, 3, 3],
    3: [2, 2, 3],
    4: [2, 3, 2],
    5: [3, 2, 2]
  },
  8: {
    1: [1, 2, 2, 3],
    2: [1, 2, 3, 2],
    3: [1, 3, 2, 2],
    4: [2, 2, 2, 2],
    5: [2, 3, 3],
    6: [3, 2, 3],
    7: [3, 3, 2]
  },
  9: {
    1: [1, 2, 3, 3],
    2: [1, 3, 2, 3],
    3: [2, 2, 2, 3],
    4: [2, 2, 3, 2],
    5: [2, 3, 2, 2],
    6: [3, 2, 2, 2],
    7: [3, 3, 3]
  },
  10: {
    1: [1, 3, 3, 3],
    2: [2, 2, 3, 3],
    3: [2, 3, 2, 3],
    4: [2, 3, 3, 2],
    5: [3, 2, 2, 3],
    6: [3, 2, 3, 2],
    7: [3, 3, 2, 2]
  }
};

function groupBy(group, data) {
  const r = [];
  for (const count of group) {
    r.push(data.slice(0, count));
    data = data.slice(count);
  }
  return r;
}

const templates = {

  dispatch: function(pictures, group, layout) {
    const rule = LAYOUTS[group] ? LAYOUTS[group][layout] : null;
    return rule ? this.getHTML(groupBy(rule, pictures)) : this.defaults(pictures);
  },

  /**
   * Defaults Layout
   *
   * □ □ □
   * □ □ □
   * ...
   *
   * @param pictures
   */
  defaults: function(pictures) {
    const ROW_SIZE = 3;
    const rows = pictures.length / ROW_SIZE;
    const pictureArr = [];

    for (let i = 0; i < rows; i++) {
      pictureArr.push(pictures.slice(i * ROW_SIZE, (i + 1) * ROW_SIZE));
    }

    return this.getHTML(pictureArr);
  },

  getHTML: function(rows) {
    return rows.map(row => {
      return `<div class="group-picture-row">${this.getColumnHTML(row)}</div>`;
    }).join('');
  },

  getColumnHTML: function(pictures) {
    return pictures.map(picture => {
      return `<div class="group-picture-column">${picture}</div>`;
    }).join('');
  }
};

module.exports = ctx => function(args, content) {
  args = args[0].split('-');
  const group = parseInt(args[0], 10);
  const layout = parseInt(args[1], 10);

  content = ctx.render.renderSync({ text: content, engine: 'markdown' });

  const pictures = content.match(/(<a[^>]*>((?!<\/a)(.|\n))+<\/a>)|(<img[^>]+>)/g);

  return `<div class="group-picture">${templates.dispatch(pictures, group, layout)}</div>`;
};
