{
  if (!window.NexT) window.NexT = {};

  const prefix = 'next-config-';

  const parse = (text) => {
    const jsonString = new DOMParser().parseFromString(text, 'text/html').documentElement.textContent;
    return JSON.parse(jsonString || '{}');
  };

  const staticConfig = {};
  let variableConfig = {};

  const update = (name) => {
    const targetEle = document.getElementById(`${prefix}${name}`);
    if (!targetEle) return;
    const parsedConfig = parse(targetEle.text);
    if (name === 'main') {
      Object.assign(staticConfig, parsedConfig);
    } else {
      variableConfig[name] = parsedConfig;
    }
  };

  update('main');

  window.CONFIG = new Proxy({}, {
    get(overrideConfig, propKey) {
      if (propKey in overrideConfig) return overrideConfig[propKey];

      if (propKey in staticConfig) {
        return staticConfig[propKey];
      }

      if (!(propKey in variableConfig)) update(propKey);
      return variableConfig[propKey];
    }
  });

  document.addEventListener('pjax:success', () => {
    variableConfig = {};
  });
}
