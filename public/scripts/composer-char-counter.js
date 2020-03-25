$(document).ready(function() {

  $('textarea#tweet-text').on('keyup', function() {
    let inputText = $(this).val();
    let $counter = $(this).parent().find('.counter');
    $counter.val(140 - inputText.length);
    if ($counter.val() < 0) {
      $counter.addClass('over-limit');
    } else {
      $counter.removeClass('over-limit');
    }
  })
  
});
