// background.js

// The background script does not have access to the current page but does have
// access to chrome.* APIs to for example listen for clicks.

// Called when the user clicks on the browser action.


// ***** USER ACTIONS - when user clicks or presses something ***** //
// chrome.browserAction.onClicked.addListener(function(tab) {
//   // Send a message to the active tab
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     var activeTab = tabs[0];
//     chrome.tabs.sendMessage(activeTab.id, {"action": "clicked_browser_action"});
//   });
// });
// When a hotkey is pressed, send the command to content.js
chrome.commands.onCommand.addListener(function(command){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"action": command,
                                            "url": activeTab.url});
  });
});


// ***** Browser Actions - messages sent from browser ***** //

// Listen for a message from content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "open_new_tab" ) {
      chrome.tabs.create({"data":request.url});
    };

    // if (request.action === "save_text") {
    //
    // }
  }
);
