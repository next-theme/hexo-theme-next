/* global CONFIG */

if (!window.NexT) window.NexT = {};

window.CONFIG = new Proxy({
  prefix: 'next-config-',
  parse(configText) {
    const jsonString = new DOMParser().parseFromString(configText, 'text/html').documentElement.textContent;
    return JSON.parse(jsonString || '{}');
  },
  variables: {
    latest: [],
    update(name) {
      const targetEle = document.getElementById(`${CONFIG.prefix}${name}`);
      if (!targetEle) return;
      this[name] = CONFIG.parse(targetEle.text);
      this.latest.push(name);
    }
  }
}, {
  get(target, propKey) {
    if (propKey in target) return target[propKey];

    if (!target.variables.latest.includes(propKey)) target.variables.update(propKey);
    return target.variables[propKey];
  }
});

Object.assign(CONFIG, CONFIG.parse(document.getElementById(`${CONFIG.prefix}main`).text));

document.addEventListener('pjax:success', () => {
  CONFIG.variables.latest.length = 0;
});
