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