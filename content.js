//content.js

// Outputs to console


// https://robots.thoughtbot.com/how-to-make-a-chrome-extension

// The content script has access to the current page, but is limited in the APIs
// it can access. For example it cannot listen to clicks on the browser. This is
// what the background script is for.
// Don't need to do document.ready because chrome loads extensions
// after the DOM has loaded by default.

var listStorage = {};

// Listen for messages from background.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    // if( request.action === "clicked_browser_action" ) {
    //   // Retrieve Storage items - http://bit.ly/2iCwMVL
    //   chrome.storage.local.get(null, function(result) {
    //
    //
    //   });
    // };

    if (request.action === "save_text") {
      console.log(request.url, window.getSelection().toString());
      listStorage[new Date().toString()] = {"text": window.getSelection().toString(),
                                            "url" : request.url,
                                            "hostname" : window.location.hostname
                                          };
      chrome.storage.local.set(listStorage, function() {
        console.log("Data Saved");
      })
      // Save to local storage
      chrome.runtime.sendMessage({"action": "save_text",
                                  "data": {
                                    "text": window.getSelection().toString(),
                                    "url" : request.url,
                                    "hostname" : window.location.hostname
                                  }
                                });
    };
  }
);
