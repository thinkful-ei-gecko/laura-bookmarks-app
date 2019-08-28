'use strict';
/* global store api $*/

const bookmarks = (function() {

  function handleNewBookmarkSubmit() {
    $('#inputForm').on('submit', function(event){
      event.preventDefault();
      const newEntry = {
        title: $('#newSiteName').val(),
        url: $('#newSiteUrl').val(),
        rating: $('input[type=radio][name=stars]:checked').val(),
        description: $('#newSiteNotes').val()
      };
      api.createNewBookmark(newEntry)
        .then(response => {
          store.addBookmark(response);
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  function handleDeleteClicked() {
    $('#viewBookarks').on('click', '#delete', function() {
    //remove the item from the store

      api.deleteBookmark(id);
    });
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
    // <button class='edit'>Edit</button>
        <button id='delete'>Delete</button>
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
    render,
    handleNewBookmarkSubmit,

  };

}());  