'use strict';
/* global cuid */
// eslint-disable-next-line no-unused-vars

const store = (function() {

  let adding = false;

  const list = [
      {
      id: 1,
      title: 'Bookmark1',
      rating: 5,
      url: 'www.xyz.com',
      description: 'stuff and more stuff and blah, blah',
      expanded: false,
      editing: false
    }
   ];

    function createId(bookmark) {
    bookmark['id'] = cuid();
  };

  function findById(id) {
  //
  };
    
  function filterByRating(rating) {
  //
  };
    
  return {
    list:[],
    adding,

    createId,
    findById,
    // filterByRating,
  };


}());

/*
  function createExpandedView(bookmark) {
    bookmark['expandedView'] = false;
  };
  function toggleExpandedView(bookmark) {
    return bookmark.expandedView = !bookmark.expandedView;
  };

  */
