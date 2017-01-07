//content.js

// Outputs to console

// https://robots.thoughtbot.com/how-to-make-a-chrome-extension

// The content script has access to the current page, but is limited in the APIs
// it can access. For example it cannot listen to clicks on the browser. This is
// what the background script is for.
// Don't need to do document.ready because chrome loads extensions
// after the DOM has loaded by default.

var listStorage = {};
var colours = ["#ea0376", "#25afca", "#fae738"];
var user = "";

// Source - http://bit.ly/2iHtp2R
function getRandomToken() {
    // E.g. 8 * 32 = 256 bits token
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
    return hex;
}


// Check if user ID exists
chrome.storage.sync.get('userid', function(items) {
    var userid = items.userid;
    if (userid) {
        useToken(userid);
    } else {
        userid = getRandomToken();
        chrome.storage.sync.set({userid: userid}, function() {
            useToken(userid);
        });
    }
    function useToken(userid) {
      user = userid;
      localStorage.userid = userid;
      // TODO: Use user id for authentication or whatever you want.
    }
});
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
      var content_id = getRandomToken()
      // copied data
      content = {"_id":user,
                 "item_id" : content_id,
                 "text": window.getSelection().toString(),
                 "url" : request.url,
                 "hostname" : window.location.hostname
                 };

      listStorage[new Date().toString()] = content;

      // Send to database
      $.post('https://hiliteapp.herokuapp.com/post', content, function(data, status) {
        // TODO: show error message if couldn't send/save content
        // console.log("Data: " + data.message + "/nStatus: " + status);
      });

      // Save data to local storage
      chrome.storage.local.set(listStorage, function() {

          // Show add & minus buttons
        //   var buttonSetup = function() {
        //     var container = document.createElement('div');
        //     var operators = document.createElement('div');
        //     var plus = document.createElement('btn');
        //     var minus = document.createElement('btn');
        //
        //     container.appendChild(operators);
        //     operators.appendChild(plus);
        //     operators.appendChild(minus);
        //
        //     plus.innerHTML = "+";
        //     minus.innerHTML = "-"
        //
        //     container.id = "hilite_container";
        //
        //     // Randomly select background colour
        //     var colour = colours[Math.floor(Math.random() * colours.length)];
        //
        //     // Style buttons
        //     Object.assign(container.style, { zIndex:"100000",
        //                                      position: "fixed",
        //                                      top: "10px",
        //                                      right: "10px",
        //                                      animation: "fadeOut 2s forwards",
        //                                      opacity: "1"
        //                                    }
        //                                  );
        //
        //    Object.assign(plus.style,    { backgroundColor:colour,
        //                                   borderRadius: "25%",
        //                                   marginLeft: "10px",
        //                                   padding: "5px 10px"
        //                                 }
        //                               );
        //
        //   Object.assign(minus.style,    { backgroundColor:colour,
        //                                   borderRadius: "25%",
        //                                   marginLeft: "10px",
        //                                   padding: "5px 10px"
        //                                }
        //                              );
        //   document.getElementsByTagName('body')[0].appendChild(container);
        //
        //
        // };
        //
        // var old = document.getElementById("hilite_container");
        // if (old !== null ) {
        //   old.remove();
        //   buttonSetup();
        //   var exTimeout = setInterval(function(){
        //     document.getElementById("hilite_container").style.opacity = "0"
        //   }, 3000);
        // } else {
        //   buttonSetup();
        // };


        // if (typeof exTimeout !== "undefined") {
        //   clearInterval(exTimeout);
        // };
        //

        //
        // document.getElementById("hilite_container").onmouseover = function() {
        //   this.style.opacity = "100";
        //   clearInterval(exTimeout);
        //   var exTimeout = setInterval(function(){
        //     document.getElementById("hilite_container").style.opacity = "0"
        //   }, 3000);
        // };
        // console.log(exTimeout);
        //


          // // If so set opacity and new colour
          // document.getElementById("hilite_container").style.opacity = "100";
          // var colour = colours[Math.floor(Math.random() * colours.length)];
          // document.getElementById("hilite_container").style.backgroundColor = colour;

        // Fadeout unless mouseover



    });

      // // Save to local storage
      // chrome.runtime.sendMessage({"action": "save_text",
      //                             "data": {
      //                               "text": window.getSelection().toString(),
      //                               "url" : request.url,
      //                               "hostname" : window.location.hostname
      //                             }
      //                           });
    };
  }
);
