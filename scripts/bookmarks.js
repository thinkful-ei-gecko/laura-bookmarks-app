'use strict';

const bookmarks = (function() {

  function handleNewBookmarkSubmit() {
    //take in the data submitted in the form
    //call the function to add data to the store
    //call the function to POST the data
    //close the submit form
  }

  function handleDeleteClicked() {
    //on click of delete button
    //remove the item from the store
    //call the api function to DELETE
  }

  //generate HTML for bookmark entry display
  function buildSingleEntryHtml(bookmark) {
  
    let ratingDisplay = '';
    for(let i=1; i<=bookmark.rating; i++){ratingDisplay += '&nbsp;&#9733;';}
  
    let singleEntry = `<div><header class='boxHeader'><h3>${bookmark.title} <span class='stars'>${ratingDisplay}</span><span class='arrowpointers'> &#9662;</span></h3></header>
      <div class='viewBookmarkExpanded'>
        <span class='vertAlignBottom labeler'>Visit Site: </span>
        <a href='${bookmark.url}' class='siteUrl vertAlignBottom' target='_blank'>${bookmark.url}</a>
        <br/>
        <p><span class='vertAlignBottom labeler'>My Notes: </span>${bookmark.description}</p>
        <br/>
        <button class='edit'>Edit</button>
        <button class='delete'>Delete</button>
      </div></div>`;

    return singleEntry;
  }

  function render(arrayOfAllBookmarks) {
    let nextItem;

    arrayOfAllBookmarks.forEach(entry => {
      nextItem = buildSingleEntryHtml(entry);
      $('#viewBookmarks').append(nextItem);
    });
  }


return {
  render
};

}());  