"use strict";

// Simulates the kind of delay we see with network or filesystem operations.
// This function takes in a callback as its sole argument and then passes this callback into
// a setTimeout function that will execute the callback after a random amount of milliseconds
// has passed.
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`.
    // This will be an asynchronous function given the use of simulateDelay. The function will take in two
    // arguments, the first being a newTweet. The function will push a 'newTweet' object into the 'tweets' 
    // array of objects in the database. The second argument will be a callback which is called after the the
    // database has been updated and will be provided with the arguments 'null' and 'true'. The callback will be used to 
    // provide a return value signifying that the database update has been efected.

    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.tweets.push(newTweet);
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first. This will be an asynchronous function given the use of simulateDelay.
    // The function will take in a sole callback as an argument. 

    getTweets: function(callback) {
      simulateDelay(() => {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, db.tweets.sort(sortNewestFirst));
      });
    }

  };
}
