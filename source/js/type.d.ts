// config.js
declare global {
  interface StaticConfig {
    hostname: string;
    root: string;
    images: string;
    scheme: "Muse" | "Mist" | "Pisces" | "Gemini";
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
        style: "default" | "flat" | "mac";
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
      save: "auto" | "manual";
    };
    mediumzoom: boolean;
    lazyload: boolean;
    pangu: boolean;
    comments: {
      style: "tabs" | "buttons";
      active: "disqus" | "disqusjs" | "livere" | "gitalk" | "utterances" | "isso";
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
      enable: boolean;
      top_n_per_article: number;
      unescape: boolean;
      preload: boolean;
    };
  }
  interface PageConfig {
    sidebar: string;
    isHome: boolean;
    isPost: boolean;
    lang: string;
    comments: string;
    permalink: string;
    path: string;
    title: string;
  }
  interface GlobalConfig extends StaticConfig {
    page: PageConfig;
  }
  interface NexT { }
  const CONFIG: GlobalConfig;
  interface Window {
    NexT: NexT;
    CONFIG: typeof CONFIG;
  }
}

// pjax.js
import _Pjax from "@next-theme/pjax";
declare global {
  class Pjax extends _Pjax {
    executeScripts(elements: NodeListOf<HTMLScriptElement>): void;
  }
  interface Window {
    Pjax: typeof Pjax;
    pjax: Pjax;
  }
}