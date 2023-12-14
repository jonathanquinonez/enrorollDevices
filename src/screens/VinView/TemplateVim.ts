const TemplateVim =  
`<html>
<head>
  <meta
    name="viewport"
    content="user-scalable=no, initial-scale=1, width=device-width, viewport-fit=cover"
  />
</head>
<body>
  <div id="vim-widget" style="height: 100% width: 100%"></div>
  <script>
    function sendMessage(message){
      window.ReactNativeWebView.postMessage(JSON.stringify(message))
    }
    window.addEventListener(
      'message',
      (event) => {
        if (event.origin !== 'https://js.getvim.com/production/sdk.js') return;
         sendMessage({ type: 'vim_message', payload: event.data });
      },
      false,
    );

    document.addEventListener('init_vim', function (ev) {

      sendMessage({ type: 'vim_ok_12' , ev});
      const isCordova = window.cordova ? true : false;

      window.Vim(ev.detail.api_key, {
       env: ev.detail.environment,
       supportedWidgets: ['PROVIDER-DISCOVERY']
     }).then(async (vim) => {
       const widget = vim.widgets['PROVIDER-DISCOVERY']?.wrappedElement;
         if (isCordova) vim.widgets['PROVIDER-DISCOVERY']?.rootElement.classList.add('cordova');
       if (widget) widget.subscribe('onClosed',  () => sendMessage({ type: 'vim_close' }));
       
       try {
         vim.showProviderDiscoveryDialog({
           ...(ev.detail.memberToken ? { memberToken: ev.detail.memberToken } : {}), 
           user: { locale: ev.detail.lang }
         });
         sendMessage({ type: 'vim_ok' })
         return;
       }
       catch (err) { sendMessage({ type: err }) }
     }).catch((err) => {
       sendMessage({ type: err })
       return Promise.reject(err);
     })

    });

    var script = document.createElement('script');
    script.src = "https://js.getvim.com/web/v1.6/sdk.js"
    document.head.append(script);
    script.onload = function() {
      sendMessage({ type: 'vim_script_loaded' })
    };

  </script>
</body>
</html>`

export default TemplateVim


