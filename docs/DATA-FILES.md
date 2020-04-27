<h1 align="center">Configuration Files</h1>

How to configure Hexo and NexT? The traditional approach is to store some options in site's `/_config.yml` and other options in theme's `/themes/next/_config.yml`. This approach is applicable, but it is not smooth to update NexT theme from pulling or downloading new releases. It is quite often running into conflict status when updating NexT theme via `git pull`, or need to merge configurations manually when upgrading to new releases. For the new version of Hexo, the theme can be installed through npm; it is also difficult to directly modify the theme configuration file in `node_modules`.

In order to resolve this issue, Hexo provides the following solutions. Please choose only one of them and resume next steps.

## `theme_config`

With this way, all your configurations locate in main Hexo config file (`/_config.yml`), you don't need to touch `/themes/next/_config.yml` or create any new files. But you must preserve double spaces indents within `theme_config` option.

If there are any new options in new releases, you just need to copy those options from `/themes/next/_config.yml`, paste into `/_config.yml` and set their values to whatever you want.

### Usage

Copy needed NexT theme options from theme's `/themes/next/_config.yml` into `/_config.yml`, then\
1. Move all this settings to the right with two spaces (in Visual Studio Code: select all strings, <kbd>CTRL</kbd> + <kbd>]</kbd>).\
2. Add `theme_config:` parameter above all this settings.

## `_config.[name].yml`

With this way, all your configurations locate in config file `/_config.[name].yml`. Replace `[name]` with the value of `theme` option in Hexo config file (`/_config.yml`), e.g. `next`.

If there are any new options in new releases, you just need to copy those options from `/themes/next/_config.yml`, paste into this config file and set their values to whatever you want.

### Usage

1. Please ensure you are using Hexo 4.3 (or above).
2. Create a config file in site's root directory, e.g. `_config.next.yml`.
3. Copy needed NexT theme options from theme's `/themes/next/_config.yml` into this config file.

## `next.yml`

Older versions of NexT theme also provide another configuration method, which is to place the theme configuration in the `/source/_data/next.yml` file. This method is deprecated, please use `_config.[name].yml` instead. If the `/source/_data/next.yml` file exists, move it to the Hexo root directory and rename it to `_config.next.yml`.

## Useful links

* [Hexo Configuration](https://hexo.io/docs/configuration.html)
* [Hexo Pull #757](https://github.com/hexojs/hexo/pull/757)
* [Hexo Pull #4120](https://github.com/hexojs/hexo/pull/4120)
