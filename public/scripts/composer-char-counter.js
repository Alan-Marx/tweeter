$(document).ready(function() {

  $('textarea#tweet-text').on('keyup', function() {
    let inputText = $(this).val();
    let counter = $(this).parent().find('.counter');
    $(counter).val(140 - inputText.length);
    if ($(counter).val() < 0) {
      $(counter).css('color', '#FF0000');
    } else {
      $(counter).css('color', 'black');
    }
  })
});
