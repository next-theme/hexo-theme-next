declare global {
  interface StaticConfig {
    hostname: string;
    root: string;
    images: string;
    scheme: 'Muse' | 'Mist' | 'Pisces' | 'Gemini';
    darkmode: boolean;
    version: string;
    exturl: boolean;
    sidebar: boolean;
    hljswrap: boolean;
    codeblock: {
      theme: {
        light: string;
        dark: string;
      };
      prism: {
        light: string;
        dark: string;
      };
      copy_button: {
        enable: boolean;
        style: 'default' | 'flat' | 'mac';
      };
      fold: {
        enable: boolean;
        height: number;
      };
      language: boolean;
    };
    bookmark: {
      enable: boolean;
      color: string;
      save: 'auto' | 'manual';
    };
    mediumzoom: boolean;
    lazyload: boolean;
    pangu: boolean;
    comments: {
      style: 'tabs' | 'buttons';
      active: 'disqus' | 'disqusjs' | 'livere' | 'gitalk' | 'utterances' | 'isso';
      storage: boolean;
      lazyload: boolean;
      nav: {
        disqus?: {
          text: string;
          order: number;
        };
        gitalk?: {
          order: number;
        };
      };
    };
    stickytabs: boolean;
    motion: {
      enable: boolean;
      async: boolean;
      duration: number;
      transition: {
        menu_item: string;
        post_block: string;
        post_header: string;
        post_body: string;
        coll_header: string;
        sidebar: string;
      }
    };
    prism: boolean;
    i18n: {
      placeholder: string;
      empty: string;
      hits_time: string;
      hits: string;
    },
    algolia?: {
      appID: string;
      apiKey: string;
      indexName: string;
      hits: {
        per_page: number;
      };
    };
    path?: string;
    localsearch?: {
      enable: true;
      top_n_per_article: number;
      unescape: boolean;
      preload: boolean;
    };
  }
  interface GlobalConfig extends StaticConfig {
    page: {
      sidebar: string;
      isHome: boolean;
      isPost: boolean;
      lang: string;
      comments: string;
      permalink: string;
      path: string;
      title: string;
    };
    calendar?: {
      calendar_id: string;
      api_key: string;
      orderBy: string;
      showLocation: boolean;
      offsetMax: number;
      offsetMin: number;
      showDeleted: boolean;
      singleEvents: boolean;
      maxResults: number;
    };
    quicklink?: {
      enable: true;
      home: boolean;
      archive: boolean;
      delay: boolean;
      timeout: number;
      priority: boolean;
      url: string;
      ignores?: string;
    };
    google_analytics?: {
      tracking_id: string;
      only_pageview: boolean;
      measure_protocol_api_secret: string;
    };
    /** @deprecated */
    growingio_analytics?: string;
    matomo?: {
      enable: true;
      server_url: string;
      site_id: string;
    };
    chatra?: {
      enable: true;
      async: boolean;
      id: string;
      embed?: string;
    };
    changyan?: {
      appid: string;
      appkey: string;
    };
    disqus?: {
      enable: true;
      shortname: string;
      count: boolean;
    };
    disqusjs?: {
      enable: true;
      api: string;
      apikey: string;
      shortname?: string;
    };
    gitalk?: {
      enable: true;
      github_id?: string;
      repo?: string;
      client_id?: string;
      client_secret?: string;
      admin_user?: string;
      distraction_free_mode: boolean;
      proxy: string;
      language?: string;
      body?: string;
    };
    isso?: string;
    utterances?: {
      enable: true;
      repo: string;
      issue_term: 'pathname' | 'url' | 'title' | 'og:title';
      theme: 'github-light' | 'github-dark' | 'preferred-color-scheme' | 'github-dark-orange' | 'icy-dark' | 'dark-blue' | 'photon-dark' | 'boxy-light';
    };
    enableMath?: boolean;
    katex?: {
      copy_tex_js: string;
    };
    mathjax?: {
      enable: true;
      tags: 'none' | 'ams' | 'all';
      display_overflow: 'overflow' | 'scroll' | 'scale' | 'truncate' | 'linebreak';
      js: string;
      font_path: string;
    };
    firestore?: {
      enable: true;
      collection: string;
      projectId: string;
    };
    /** @deprecated */
    leancloud_visitors?: {
      security: boolean;
      app_id: string;
      app_key: string;
      server_url: string;
    };
    mermaid?: {
      enable: true;
      theme: {
        light: 'default' | 'dark' | 'forest' | 'neutral';
        dark: 'default' | 'dark' | 'forest' | 'neutral';
      },
      js: string;
    };
    pdf?: {
      object_url: string;
      url: string;
    };
    wavedrom?: {
      enable: true;
      js: string;
    };
    wavedrom_skin?: {
      enable: true;
      js: string;
    };
  }
  interface NexT { }
  const CONFIG: GlobalConfig;
  interface Window {
    NexT: NexT;
    CONFIG: typeof CONFIG;
  }
}
export { };