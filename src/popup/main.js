function getCurrentTabUrl (callback) {
  
  let queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    let tab = tabs[0];
    let url = tab.url;
    callback(url);
  });
  
}

function getFormAction () {
  
  const clientLang = window.navigator.userLanguage || window.navigator.language,
        formAction = {
          'en': 'https://digital-success.1and1.com/perform-check',
          'de': 'https://digital-success.1und1.de/perform-check'
        };
  
  if (formAction[clientLang] !== undefined) {
    return formAction[clientLang];
  }
  
  /* fallback is action for us market */
  
  return formAction['en'];
  
}

window.onload = (function() {
  
  return function() {
    
    getCurrentTabUrl(url => {
      url = url || '';
      console.log(url);
      const protocol = (url).split(':')[0] || '';
      const supportedProtocol = protocol.indexOf('http') === 0;
      if (supportedProtocol && url.length > 0) {
        document.getElementById('url').value = url;
        document.getElementsByClassName('loading')[0].classList.add('hidden');
        document.getElementById('website-checker-form').action = getFormAction();
        document.getElementById('website-checker-form').submit();
      } else {
        window.close();
      }
    });
    
  }
  
}());
