"use strict";

// Requiring a JSON file automatically parses it and returns the data. These
// are just example tweets to make it less tedious to style the app initially.

// The tweets property inside this database will consist of an array of objects, 
// each of which will consist of three properties: 
//            a 'user' property which is itself an object consisting of 'name', 'avatars' and 'handle' key value pairs;
//            a 'content' property which is itself an object consisting of a 'text' key value pair;
//            a 'created_at' key value pair;

const db = {
  tweets: require("../data-files/initial-tweets")
}

module.exports = db;

