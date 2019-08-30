'use strict';
/* global bookmarks api store $*/


function main() {
  bookmarks.displayAddingForm();
  api.getBookmarks().then(bookmarkData => {
    bookmarkData.forEach(item => store.addBookmark(item));
    bookmarks.render();
  });
  bookmarks.handleAdderClicked();
  bookmarks.handleAdderUnclicked();

//  bookmarks.handleDeleteClicked();
  bookmarks.handleExpansionClicked();
  bookmarks.handleNewBookmarkSubmit();
  bookmarks.handleFilterResults();
}

$(main);

