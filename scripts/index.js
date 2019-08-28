'use strict';
/* global cuid */



function handleAdderClicked() {
  $('#addingHead').on('click', function() {
    let addDiv = document.getElementById('viewFormExpanded');

    if (addDiv.style.display === "none") {
      addDiv.style.display = "block";
      $('#addingTitle').text('Add a new bookmark');
    } else {
      addDiv.style.display = "none";
      $('#addingTitle').text('Click here to add a new bookmark');
    }  
  });
}

function handleExpansionClicked() {
  $('.boxHeader').on('click', function() {
    let exDiv = this.nextElementSibling;

    if (exDiv.style.display === "none") {
      exDiv.style.display = "block";
    } else {
      exDiv.style.display = "none";
    }  
  });
}


function main() {
  handleAdderClicked();
  handleExpansionClicked();
  bookmarks.handleNewBookmarkSubmit();
}

$(main);

