const HTMLSensely=  `<html>
<head>
  <meta
    name="viewport"
    content="user-scalable=no, initial-scale=1, width=device-width, viewport-fit=cover"
  />
  
</head>
<body>
  <div id="sensely-widget" style="height: 100% width: 100%"></div>
  <style>
  #sensely-widget__widget-wrapper {
    height: 90vh;
    max-width: 375px;
    width: 90vw;
    position: absolute;
    right: 5%;
    top: 5%;
    bottom: 5%;
    background-color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    z-index: 10;
    flex-direction: column;
    overflow-y: overlay;
 }
  #sensely-widget__widget-wrapper #sensely-custom_header {
    position: relative;
    height: 50px;
    z-index: 2;
    display: flex;
    justify-content: left;
 }
  #sensely-widget__widget-wrapper #sensely-custom_header .bg-container {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    align-self: flex-start;
 }
  #sensely-widget__widget-wrapper #sensely-custom_header .bg-container .profile-pic {
    height: 30px;
    width: 30px;
    margin-left: 20px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
 }
  #sensely-widget__widget-wrapper #sensely-custom_header .bg-container .sensely-custom-title {
    color: white;
    font-size: 1.4rem;
    position: absolute;
    left: 15px;
    font-weight: normal;
 }
  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) {
      font-weight: bold;
   }
 }
  #sensely-widget__widget-wrapper #sensely-custom_header .bg-container .sensely-custom-controls {
    padding-right: 20px;
    width: 40px;
    display: flex;
    justify-content: space-between;
 }
  #sensely-widget__widget-wrapper #sensely-custom_header .bg-container .sensely-custom-controls .sensely-header-icon-container {
    cursor: pointer;
 }
  #sensely-widget__widget-wrapper #sensely-custom_header .sensely-custom-header-bg {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
 }
  #sensely-widget__widget-wrapper .sensely-content_filled {
    display: flex;
    order: 1;
    flex-direction: column;
 }
  @keyframes changePosition {
    0% {
      justify-content: center;
   }
    50% {
      justify-content: normal;
   }
 }
  #sensely-widget__widget-wrapper .sensely-chat-loader {
    order: 2;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: normal;
    align-self: center;
    flex-direction: column;
    animation-name: changePosition;
    animation-duration: 1s;
 }
  </style>
  <script>
    function sendMessage(message){
      window.ReactNativeWebView.postMessage(JSON.stringify(message))
    }

    window.addEventListener(
      'message',
      (event) => {
        if (event.origin !== 'https://assets.sense.ly') return;
         sendMessage({ type: 'sensely_message', payload: event.data });
      },
      false,
    );

    document.addEventListener('init_sensely', function (ev) {
      SenselyWidget.init(ev.detail)
        .then(() => sendMessage({ type: 'sensely_ok' }))
        .catch((error) =>
        sendMessage({ type: 'sensely_error', payload: error }),
        );
    });

    var script = document.createElement('script');
    script.src = "https://websdk.sense.ly/3.11/sensely.umd.js"
    document.head.append(script);
    script.onload = function() {
      sendMessage({ type: 'sensely_script_loaded' })
    };

  </script>
 
</body>
</html>`

export default HTMLSensely