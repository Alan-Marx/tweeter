/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  $("form").submit(function(event) {
    event.preventDefault();
    $(".errors").slideUp(200);

    let tweetValue = this.querySelector('[name="text"]').value;
    let errorTriangles = '<i class="fas fa-exclamation-triangle">';

    // the setTimeouts ensure that the warning has time to slide up when a user moves from one error message to another. Without these,
    // the new warning message will be appended before the warning has slid up and then comes down again, which I believe makes the UI look
    // rather clumsy
    
    if (!tweetValue) {
      setTimeout(() => {
        $(".errors").empty().append(`${errorTriangles} Your tweet is empty!${errorTriangles}`).slideDown(300);
          return;
      }, 300);
    } else if (tweetValue.length > 140) {
      setTimeout(() => {
        $(".errors").empty().append(`${errorTriangles} Your tweet is over 140 characters!${errorTriangles}`).slideDown(300);
        return;
      }, 300);
    } else {
      let formData = $(this).serialize();
      $.post('/tweets/', formData, function (data, status) {
        console.log(`Data: ${data}. Status: ${status}`);  
        $('[name="text"]').val('');
        $('[name="counter').val(140);
        $.get("/tweets/", function(data) {
          let newTweet = data[data.length - 1];
          renderTweets(newTweet);
        })
      })
    } 
  })

  const renderTweets = (tweetDatabase) => {
    if (Array.isArray(tweetDatabase)) {
      for (const tweet of tweetDatabase) {
        const $tweet = createTweetElement(tweet);
        $('#tweet-container').prepend($tweet);
      }
    } else {
      const $tweet = createTweetElement(tweetDatabase);
        $('#tweet-container').prepend($tweet);
    }
  };
  
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = (tweetObject) => {
    const markup = `
    <header> 
      <div class="username top">
        <img src="${tweetObject.user.avatars}" alt="">
        <div class="name">${tweetObject.user.name}</div>
      </div>
      <div class="handle top">${tweetObject.user.handle}</div>
    </header>
    <output>${escape(tweetObject.content.text)}</output>
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
  
  const loadTweets = () => {
    $.get("/tweets/", function(data) {
      renderTweets(data);
    })
  };

  loadTweets();
});
 