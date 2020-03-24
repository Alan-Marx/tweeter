"use strict";

// userHelper will be the generateRandomUser function.
const userHelper    = require("../lib/util/user-helper")

// express.Router() can be used to create route handlers.
const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

// The DataHelpers argument which this function will take will consist of an object with the
// saveTweet and getTweets methods.

// If there is a GET request to the home page "/", and there is not an error when sorting the tweets from newest to oldest,
// then the client will receive all the whole 'tweets' array of objects in JSON.

  tweetsRoutes.get("/", function(req, res) {

    DataHelpers.getTweets(
      (err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  }

  );

// If there is a POST request to the home page "/" this function will check to see if a user object has been included
// in the body of the request. If there is, then the user object will be the value for the user variable. If not, the 
// generateRandomUser function will be called and a new user object will be assigned to the user variable. In either case, a new tweet
// object will be created and passed to the saveTweet function which will add the new object to the database.

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  return tweetsRoutes;

}
