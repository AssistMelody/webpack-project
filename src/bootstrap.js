window.midascontext = {
  env: { bootstrapJsUrl: process.env.domain + '/aplus/mkt-aplus.js?v=' + BUILD_TIME },
};

(function () {
  loadScript(midascontext.env.bootstrapJsUrl);
  function loadScript(url) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
})();
