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

// isJquery();

// Listen for messages from background.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Message Recieved");

    // if( request.action === "clicked_browser_action" ) {
    //   // Retrieve Storage items - http://bit.ly/2iCwMVL
    //   chrome.storage.local.get(null, function(result) {
    //
    //
    //   });
    // };

    if (request.action === "save_text") {
      listStorage[new Date().toString()] = {"text": window.getSelection().toString(),
                                            "url" : request.url,
                                            "hostname" : window.location.hostname
                                          };

      chrome.storage.local.set(listStorage, function() {
        // console.log("Data Saved");

          // Show add or minus
          var buttonSetup = function() {
            var container = document.createElement('div');
            var operators = document.createElement('div');
            var plus = document.createElement('btn');
            var minus = document.createElement('btn');

            container.appendChild(operators);
            operators.appendChild(plus);
            operators.appendChild(minus);

            plus.innerHTML = "+";
            minus.innerHTML = "-"

            container.id = "hilite_container";

            // Randomly select background colour
            var colour = colours[Math.floor(Math.random() * colours.length)];

            // Style buttons
            Object.assign(container.style, { zIndex:"100000",
                                             position: "fixed",
                                             top: "10px",
                                             right: "10px",
                                             animation: "fadeOut 2s forwards",
                                             opacity: "1"
                                           }
                                         );

           Object.assign(plus.style,    { backgroundColor:colour,
                                          borderRadius: "25%",
                                          marginLeft: "10px",
                                          padding: "5px 10px"
                                        }
                                      );

          Object.assign(minus.style,    { backgroundColor:colour,
                                          borderRadius: "25%",
                                          marginLeft: "10px",
                                          padding: "5px 10px"
                                       }
                                     );
          console.log("container: ", container);
          document.getElementsByTagName('body')[0].appendChild(container);


        };

        var old = document.getElementById("hilite_container");
        if (old !== null ) {
          old.remove();
          buttonSetup();
          var exTimeout = setInterval(function(){
            document.getElementById("hilite_container").style.opacity = "0"
          }, 3000);
        } else {
          buttonSetup();
          console.log(document.getElementById("hilite_container"))
        };


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

      // Save to local storage
      chrome.runtime.sendMessage({"action": "save_text",
                                  "data": {
                                    "text": window.getSelection().toString(),
                                    "url" : request.url,
                                    "hostname" : window.location.hostname
                                  }
                                });
                                console.log("Sending Message");
    };
  }
);
