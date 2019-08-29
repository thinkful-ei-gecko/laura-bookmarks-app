'use strict';
/* global $*/


function main() {
  bookmarks.render(),
  bookmarks.handleAdderClicked(),
  bookmarks.handleDeleteClicked(),
  bookmarks.handleExpansionClicked(),
  bookmarks.handleNewBookmarkSubmit()
}

$(main);

