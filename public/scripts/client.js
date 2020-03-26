/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // createTweetElement will take in a tweet object and return an
 // article element containing the entire HTML structure of the tweet

 // Recall that you can use jQuery to construct new elements using 
 // the $ function, like so: const $tweet = $("<article>").addClass("tweet");

$(function() {

  $("form").submit(function(event) {
    event.preventDefault();
    let formData = $(this).serialize();
    $.post('/tweets/', formData, function (data, status) {
      console.log(`Data: ${data}. Status: ${status}`);
    })
  })



  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense, donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = (tweetDatabase) => {
    for (const tweet of tweetDatabase) {
      const $tweet = createTweetElement(tweet);
      $('#tweet-container').append($tweet);
    }
  };
  
  const createTweetElement = (tweetObject) => {
    const markup = `
    <header> 
      <div class="username top">
        <img src="${tweetObject.user.avatars}" alt="">
        <div class="name">${tweetObject.user.name}</div>
      </div>
      <div class="handle top">${tweetObject.user.handle}</div>
    </header>
    <output>${tweetObject.content.text}</output>
    <footer>
      <div class="date-created bottom">${(Math.floor((Date.now() - tweetObject.created_at) / 1000 / 60 / 60 / 24))} days ago</div>
      <div class="icons bottom">
        <div><i class="fas fa-flag"></i></div>
        <div><i class="fas fa-exchange-alt"></i></div>
        <div><i class="fas fa-heart"></i></div>
      </div>
    </footer>
    ` 
    const $tweet = $("<article>").append(markup);
    return $tweet;
  };
  
  renderTweets(data);





});
 