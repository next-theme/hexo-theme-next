# Internationalization (i18n)

[![Crowdin](https://badges.crowdin.net/hexo-theme-next/localized.svg)](https://crowdin.com/project/hexo-theme-next)

You can use internationalization to present your site in different languages. The default language is set by modifying the `language` setting in Hexo `_config.yml`. You can also set multiple languages and modify the order of default languages.

```yml
language: en
```

```yml
language:
  - zh-CN
  - en
```

## Override Default Translations

If you would like to customize the default translation, you do not need to modify the translation files in the `languages` directory. You can override all translations using [Data Files](https://hexo.io/docs/data-files).

1. Creat a `languages.yml` in `source/_data`.
2. Insert following codes: (be careful about the two-space indent)

    ```yml
    # language
    zh-CN:
      # items
      post:
        copyright:
          # the translation you perfer
          author: 本文博主
    en:
      menu:
        schedule: Calendar
    ```

## Improve Translations

The files in the `language` directory are automatically generated, you do not need to modify them directly. Please submit translations via [Crowdin](https://crowdin.com/project/hexo-theme-next) if you would like to add or improve translation for NexT theme.
