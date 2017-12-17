$(document).ready(function() {
  //Animate text box to expand on click
  $('#text-box').on('click', function() {
    $(this).animate({width: '16rem'}, 'slow');
  }).blur(function() {
    $(this).animate({width: '2.1rem'}, 'slow');
    $(this).val('');
  });

  $('input[type=search]').on('search', function () {
    // this function will be executed on click of X (clear button)
    $('ul').empty();
    //Move main content back to center of page
    $('.main').css('justify-content', 'center');
  });

  //Submit form
  $('input').keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      //Clear any results
      $('ul').empty();
      //Get search query value
      let queryValue = $('#text-box').val();
      //Construct query URL
      let endpoint = `http://cors.io/?u=https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=${queryValue}`;
      //Send JSON GET request to Wikipedia
      $.getJSON(endpoint, function(json) {
        //console.log('This is the right json' + json.query.search[5].title);

        //for each 'search' object construct html of title followed by snippet
        //in unordered list in an <a> tag
        let jsonArray = json.query.search;
        let pageID = 0;
        let pageTitle = '';
        let pageSummary = '';
        jsonArray.forEach(entry => {
          pageID = entry.pageid;
          pageTitle = entry.title;
          pageSummary = entry.snippet;
          //Move main content to top of page
          $('.main').css('justify-content', 'flex-start');

          $('ul').append('<a href="http://en.wikipedia.org/wiki?curid='+ pageID
          + '" target="blank"><li><h2>' + pageTitle + '</h2><p>' + pageSummary + '</p></li></a>');
        }); //forEach
      }); //getJSON
    } //if

  }); //input keypress event

}); //document ready
