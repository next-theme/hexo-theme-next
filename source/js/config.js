if (!window.NexT) window.NexT = {};

(function() {
  const className = 'next-config';

  const staticConfig = {};
  let variableConfig = {};

  const parse = text => JSON.parse(text || '{}');

  const update = name => {
    const targetEle = document.querySelector(`.${className}[data-name="${name}"]`);
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
    get(overrideConfig, name) {
      let existing;
      if (name in staticConfig) {
        existing = staticConfig[name];
      } else {
        if (!(name in variableConfig)) update(name);
        existing = variableConfig[name];
      }

      // For unset override and mixable existing
      if (!(name in overrideConfig) && typeof existing === 'object') {
        // Get ready to mix.
        overrideConfig[name] = {};
      }

      if (name in overrideConfig) {
        const override = overrideConfig[name];

        // When mixable
        if (typeof override === 'object' && typeof existing === 'object') {
          // Mix, proxy changes to the override.
          return new Proxy({ ...existing, ...override }, {
            set(target, prop, value) {
              target[prop] = value;
              override[prop] = value;
              return true;
            }
          });
        }

        return override;
      }

      // Only when not mixable and override hasn't been set.
      return existing;
    }
  });

  document.addEventListener('pjax:success', () => {
    variableConfig = {};
  });
})();

document.addEventListener("page:loaded", function() {
    // 获取所有标题元素
    var headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

    // 遍历标题元素列表并为每个元素添加类名 "headerlink"
    for (var i = 0; i < headings.length; i++) {
      heading = headings[i];

      id_text = heading.textContent;
      id_text = id_text.replace(/\s/g, "-"); //把原文的空格替换成-. 暂时没有解决重名的问题.

      // 创建超链接元素
      var link = document.createElement("a");
      link.classList.add("headerlink");//在CSS中, 具有headerlink类的元素会生成anchor.
      link.href = "#" + id_text;//超链接指向的目的heading地址, 空格替换成-.
      link.title = heading.textContent;//这是鼠标悬停到超链接时的提示信息, 不需要替换空格
      link.setAttribute("aria-hidden", "true");

      // 将超链接添加到标题元素的里面
      heading.insertAdjacentElement("afterbegin", link);

      heading.id = id_text;//heading的空格替换成-.
    }
  }
);


