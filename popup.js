

// This file creates the popup and populates with the list

listStorage = {}
// Document onload
document.addEventListener("DOMContentLoaded", function(event) {
  function loadContent() {
    chrome.storage.local.get(null, function(result) {
      listStorage = result;
      var table = document.getElementById('content').getElementsByTagName('tbody')[0];

      for(var key in result) {
         // Create new row after last row
        var newRow = table.insertRow(table.rows.length);

        var timeCell = newRow.insertCell(0);      // eg: 28/11/2016
        var hostNameCell = newRow.insertCell(1);  // eg: stackoverflow.com
        var textCell = newRow.insertCell(2);
        var deleteBtnCell = newRow.insertCell(3);

        // Create the text for each cell
        var text = result[key].text;
        var date = new Date(key);
        var dateString = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
        var websiteName = result[key].hostname;

        // Set the text of each cell
        timeCell.innerHTML = dateString;
        hostNameCell.innerHTML = "<a href="+websiteName+">" + websiteName+"</a>"
        textCell.innerHTML = "<a href=" + result[key].url + ">" +
                                (result[key].text).substring(0, 30) +
                                "</a>"
        deleteBtnCell.innerHTML = "x";

      };

    })
  };

  function deleteRow(row) {
    console.log(row);
    // var deleteRow = row.parentNode.parentNode;
    // deleteRow.parentNode.removeChild(deleteRow);
  };

  document.getElementById('viewAll').addEventListener('click', function() {
    var indexpage = "https://hiliteapp.herokuapp.com/"
    chrome.tabs.create({url: "https://hiliteapp.herokuapp.com/" });
  });
  // document.getElementById('content').getElementsByTagName('td').addEventListener('click', deleteRow(this));


});
