'use strict';
// eslint-disable-next-line no-unused-vars
const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/ljelias';

  const doApiFetch = function(...args) {
    let error;
    return fetch(...args)
      .then(response => {
        if(!response.ok) {
          error = response.statusText;
          //post error message in message <p id='infoLine'>
        } 
        else if(response.ok) {
          return response.json();
        }
      })
      .then(responseJson => {
        if(error) {
          error = responseJson.message;
          // post error message in <p id='infoLine'>
        }
        else {
          return responseJson;
        }
      })
      .catch(error);
  };

  const getBookmarks = function() {
    return doApiFetch(BASE_URL + '/bookmarks');
  };

  const createNewBookmark = function(bookmarkInfoObject) {
    const newBookmark = JSON.stringify({ bookmarkInfoObject });
    return doApiFetch(BASE_URL + '/bookmarks', 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: newBookmark
      });
  };

/*  const updateBookmark = function(id, updatedData) {
      return doApiFetch(BASE_URL + '/bookmarks/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
    };
*/

  const deleteBookmark = function(id) {
    return doApiFetch(BASE_URL + '/bookmarks/' + id, { method: 'DELETE' });
  };

  return {
    getBookmarks,
    createNewBookmark,
    //updateBookmark,
    deleteBookmark,
  };
}());