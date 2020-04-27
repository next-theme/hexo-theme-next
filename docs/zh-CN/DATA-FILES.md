<h1 align="center">配置文件</h1>

如何配置 Hexo 和 NexT？传统的做法是存储部分配置在 Hexo 站点配置文件（`/_config.yml`），而另一部分在主题配置文件（`/themes/next/_config.yml`）。这一方式固然可用，但通过 `git pull` 或下载新的 release 版本来更新 NexT 主题的体验并不平滑。当用户使用 `git pull` 更新 NexT 主题时经常需要解决冲突问题，而在手动下载 release 版本时也经常需要手动合并配置。对于新版本的 Hexo，主题可以通过 npm 安装；直接修改 `node_modules` 中的主题配置文件同样是困难的。

为了解决这一问题，Hexo 提供了以下这些方案。请任选其一，然后继续后面的步骤。

## `theme_config` 方式

使用这一方式，你的全部配置都将置于 Hexo 站点配置文件（`/_config.yml`）中，并且不需要修改 `/themes/next/_config.yml`，或者创建什么其他的文件。但是所有用到的主题选项必须放置在 `theme_config` 后，并全部增加两个空格的缩进。

如果在新的 release 中新增了选项，那么你只需要从 `/themes/next/_config.yml` 中将它们复制到 `/_config.yml` 中并将它们的值设置为你想要的。

### 用法

从主题的 `/themes/next/_config.yml` 文件中复制你需要的 NexT 配置项到 `/_config.yml` 中，然后\
1. 所有这些配置项右移两个空格（在 Visual Studio Code 中：选中这些文字，<kbd>CTRL</kbd> + <kbd>]</kbd>）。\
2. 在这些参数最上方添加一行 `theme_config:`。

## `_config.[name].yml` 方式

使用这一方式，你的主题配置将置于配置文件 `/_config.[name].yml` 中。这里的 `[name]` 需要替换为 Hexo 站点配置文件（`/_config.yml`）中 `theme` 项的名字，例如 `next`。

如果在新的 release 中新增了选项，那么你只需要从 `/themes/next/_config.yml` 中将它们复制到此配置文件中并将它们的值设置为你想要的。

### 用法

1. 请确认你的 Hexo 版本为 4.3 或更高。
2. 根据你所使用的 NexT 主题的名字，在 Hexo 根目录下创建配置文件，例如 `_config.next.yml`。
3. 从主题的 `/themes/next/_config.yml` 文件中复制你需要的 NexT 配置项到此配置文件中。

## `next.yml` 方式

较旧版本的 NexT 主题还提供了另一种配置方法，那就是将主题配置放置在 `/source/_data/next.yml` 文件中。这一方法已经废弃，请使用 `_config.[name].yml` 方式替代。如果存在 `/source/_data/next.yml` 文件，请将其移动到 Hexo 根目录并重命名为 `_config.next.yml`。

## 相关链接

* [Hexo 配置](https://hexo.io/zh-cn/docs/configuration.html)
* [Hexo Pull #757](https://github.com/hexojs/hexo/pull/757)
* [Hexo Pull #4120](https://github.com/hexojs/hexo/pull/4120)
