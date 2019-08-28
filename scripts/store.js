'use strict';
/* global  */
// eslint-disable-next-line no-unused-vars

//this is for manipulating the data
const store = (function() {

  let adding = false;

  const list = [];

  function addBookmark(bookmark) {
    const _bookmark = Object.assign(bookmark, {
      expanded: false
    });
    this.list.push(_bookmark);
  }

  function findById(id) {
    return this.list.find(bmk => bmk.id === id);
  }
   
  function toggleBookmarkExpand(id) {
    const bookmark = this.findById(id);
    bookmark.expanded = !bookmark.expanded;
  }

  function deleteBookmark(id) {
    
  }
/*
  function updateBookmark(id, updatedData) {
    const bookmark = this.findById(id);
    Object.assign(bookmark, updatedData);
  }  */
    

  return {
    list,
    adding,
    addBookmark,
    toggleBookmarkExpand,
    findById,
    //updateBookmark
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
