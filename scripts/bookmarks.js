'use strict';
/* global store api $*/

const bookmarks = (function() {

  function handleAdderClicked() {
    $('#addingHead').on('click', function() {
      let addDiv = document.getElementById('viewFormExpanded');
  
      if (addDiv.style.display === "none") {
        addDiv.style.display = "block";
        $('#addingTitle').text('Add a new bookmark');
      } else if (addDiv.style.display === "block") {
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
      } else if (exDiv.style.display === "block") {
        exDiv.style.display = "none";
      }  
    });
  }
  
  function handleDeleteClicked() {
    $('#viewBookarks').on('click', '#delete', function(event) {
      event.preventDefault();
//HOW?? const id = getIdFromElement(event.currentTarget);
      api.deleteBookmark(id)
        .then(() => {
          store.deleteBookmark(id);
          render();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  function handleNewBookmarkSubmit() {
    $('#inputForm').on('submit', function(event){
      event.preventDefault();
      $('#infoLine').html('');
      const newEntry = {
        title: $('#newSiteName').val(),
        url: $('#newSiteUrl').val(),
        rating: $('input[type=radio][name=stars]:checked').val(),
        desc: $('#newSiteNotes').val()
      };
      api.createNewBookmark(newEntry)
        .then(response => {
          store.addBookmark(response);
          render();
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  //generate HTML for bookmark entry display
  function buildSingleEntryHtml(bookmark) {
  
    let ratingDisplay = '';
    for(let i=1; i<=bookmark.rating; i++){ratingDisplay += decodeURI('&#9733;%0A');}
    
    let pointdown = decodeURI('&#9662;%0A');
    let pointup = decodeURI('&#9652;%0A');

    let singleEntry = `<div>
    <header class='boxHeader'><h3>${bookmark.title}<span class='stars'>${ratingDisplay}</span><span class='arrowpointers'>${pointdown}${pointup}</span></h3></header>
      <div class='viewBookmarkExpanded'>
        <span class='vertAlignBottom labeler'>Visit Site: </span>
        <a href='${bookmark.url}' class='siteUrl vertAlignBottom' target='_blank'>${bookmark.url}</a><br/>
        <p><span  class='vertAlignBottom labeler'>My Notes: </span>${bookmark.desc}</p><br/>
        <button class='delete'>Delete</button>
      </div>
    </div>`;

    return singleEntry;
  }

  function handleFilterResults(){
    $('#filterForm').on('click', function(event){
      event.preventDefault();
      let filteredList;
      if(this.val === 'all' || this.val === 1){filteredList = store.list}
      else if(this.val === 5){
        filteredList = 5;
      }
      else if(this.val === 4){
        filteredList = 4;
      }
      else if(this.val === 3){
        filteredList = 3;
      }
      else if(this.val === 2){
        filteredList = 2;
      }
    });
    render(filteredList);
  }

  function render() {
    let items = store.list;
    let htmlString = items.map((item) => buildSingleEntryHtml(item));
    let fullList = htmlString.join('');
    $('#viewBookmarks').html(fullList);
  }


  return {
    render,
    handleNewBookmarkSubmit,
    handleExpansionClicked,
    handleDeleteClicked,
    handleAdderClicked
  };

}());  