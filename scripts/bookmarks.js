'use strict';
/* global store api $*/

const bookmarks = (function(){

  
  function handleExpansionClicked(){
    $('#viewBookmarks').on('click', 'header', function(event) {
      event.preventDefault();
      let id = $('header').attr('identity');
      console.log(id);
      let item = store.list.id;
      item.expanded = true;
      render();
    });
  }

  function handleDeleteClicked(){
    $('#viewBookmarks').on('click', '#delete', function(event) {
      event.preventDefault();
      let id = '???';
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
    $('#addFormDiv').on('submit', '#inputForm', function(event){
      event.preventDefault();
      $('#infoLine').html('Your bookmarks:');
      const newEntry = {
        title: $('#newSiteName').val(),
        url: $('#newSiteUrl').val(),
        rating: $('input[type=radio][name=stars]:checked').val(),
        desc: $('#newSiteNotes').val()
      };
      api.createNewBookmark(newEntry)
        .then(response => {
          store.addBookmark(response);
          this.reset();
          store.adding = false;
          displayAddingForm();    
          render();
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  function handleAdderClicked(){
    $('#addFormDiv').on('click', '#addNewBookmarkA', function(){
      store.adding = true;
      displayAddingForm();
    });
  }

  function handleAdderUnclicked(){
    $('#addFormDiv').on('click', '.addingHead', function(){
      store.adding = false;
      displayAddingForm();
    });
  }

  function buildAddingFormHtml(){
    if(store.adding){
      return `<div id='addNewBookmarkB'>
      <header class='addingHead'><h2><span id='addingTitle' class='italicspan'>Add a new bookmark </span><span class='arrowpointers'>&#9652;</span></h2></header>
      <div id='viewFormExpanded'>
       <form id='inputForm'>
        <p class='formRow'>
        <label for='newSiteName' class='vertAlignBottom labeler'>Site Name: </label>
        <input type='text' id='newSiteName' class='vertAlignBottom' name='newSiteName' placeholder='Name of website' required />
        </p>
        <p class='formRow'>
        <label for='newSiteUrl' class='vertAlignBottom labeler'>Site Link: &nbsp;&nbsp;</label>
        <input type='text' id='newSiteUrl' class='vertAlignBottom' name='newSiteUrl' placeholder='ex: https://...' required />
        </p>
        <p class='vertAlignBottom labeler formRow'>Rating: 
          <input type='radio' id='option1' value='1' name='stars' />
          <label for='option1' class='vertAlignBottom'>1</label>
          <input type='radio' id='option2' value='2' name='stars' />
          <label for='option2' class='vertAlignBottom'>2</label>
          <input type='radio' id='option3' value='3' name='stars' />
          <label for='option3' class='vertAlignBottom'>3</label>
          <input type='radio' id='option4' value='4' name='stars' />
          <label for='option4' class='vertAlignBottom'>4</label>
          <input type='radio' id='option5' value='5' name='stars' />
          <label for='option5' class='vertAlignBottom'>5</label>
        </p>
        <p class='formRow'>
        <label for='newSiteNotes' class='labeler'>My Notes: </label>
        <textarea rows="4" maxlength='240' id='newSiteNotes' name='newSiteNotes' placeholder='write your notes about this site here'></textarea><br/>
        </p>
        <button type='submit'>Save</button>
       </form>
      </div>
    </div>`;
    } else {
      return `<div id='addNewBookmarkA'>
      <header class='addingHead'><h2><span id='addingTitle' class='italicspan'>Click to add a new bookmark </span><span class='arrowpointers'> &#9662;</span></h2></header>   
    </div>`;
    }
  }

  function displayAddingForm(){
    let display = buildAddingFormHtml();
    $('#addFormDiv').html(display);
  }

  //generate HTML for individual bookmark display
  function buildBookmarkHtml(bookmark){
  
    let ratingDisplay = '';
    for(let i=1; i<=bookmark.rating; i++){ratingDisplay += decodeURI('&#9733;%0A');}
    
    let pointdown = decodeURI('&#9662;%0A');
    let pointup = decodeURI('&#9652;%0A');

    if(bookmark.expanded) {
      return `<div class='singleBookmark'>
      <header class='boxHeader' identity='${bookmark.id}'><h3>${bookmark.title}<span class='stars'>${ratingDisplay}</span>
      <span class='arrowpointers'>${pointup}</span></h3></header>
        <div class='viewBookmarkExpanded'>
          <span class='vertAlignBottom labeler'>Visit Site: </span>
          <a href='${bookmark.url}' class='siteUrl vertAlignBottom' target='_blank'>${bookmark.url}</a><br/>
          <p><span  class='vertAlignBottom labeler'>My Notes: </span>${bookmark.desc}</p><br/>
          <button class='delete'>Delete</button>
        </div>
      </div>`;
    } else {
      return `<div class='singleBookmark'>
      <header class='boxHeader' identity='${bookmark.id}'><h3>${bookmark.title}<span class='stars'>${ratingDisplay}</span>
      <span class='arrowpointers'>${pointdown}</span></h3></header>
      </div>`;
    }
  }

  function handleFilterResults(){
    $('#filter').on('change', function(event){
      event.preventDefault();
      let filteredValue = $(this).val();
      console.log(filteredValue);
      render(filteredValue);
    });
  }

  function render(filteredValue = 1) {
    if(store.list.length === 0) {
      $('#infoLine').html('You currently have no bookmarks.');
    } else {
      let bookmarks = store.list;
      let filteredItems = bookmarks.filter(bmk => bmk.rating >= filteredValue);
      let htmlString = filteredItems.map((item) => buildBookmarkHtml(item));
      let fullList = htmlString.join('');
      $('#viewBookmarks').html(fullList);
    }
  }

  return {
    displayAddingForm,
    render,
    handleNewBookmarkSubmit,
    handleExpansionClicked,
    handleDeleteClicked,
    handleAdderClicked,
    handleAdderUnclicked,
    handleFilterResults
  };

}());  