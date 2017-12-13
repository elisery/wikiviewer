$(document).ready(function() {
  //Animate text box to expand on focus
  $('#text-box').on('click', function() {
    $(this).animate({width: '16rem'}, 'slow');
  }).blur(function() {
    $(this).animate({width: '2.1rem'}, 'slow');
    $(this).val('');
  });

  //Fade magnifying glass on click - OPTIONAL
  $('.fa-search').on('click', () => {
    $('this').hide();
    $('#text-box').css('display', inline);
  });

  //Submit form
  $('input').keypress(function(event) {
    if (event.which == 13) {
      console.log('we got this far');
      event.preventDefault();
      //Get search query value
      let queryValue = $('#text-box').val();
      //Construct query URL
      let endpoint = `http://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=${queryValue}`;
      console.log('This is the query value ' + queryValue);
      //Send JSON GET request to Wikipedia
      $.getJSON(endpoint, function(json) {
        console.log(json);
        //$(".results").html(JSON.stringify(json)); //TEMPORARY
        //drill down to right object
        console.log('This is the right json ' + json.query.search[5].title);
        //for each 'search' object construct html of title followed by snippet
        //in unordered list. entire entry should be in an <a> tag
        let jsonArray = json.query.search;
        let pageID = 0;
        let pageTitle = '';
        let pageSummary = '';
        jsonArray.forEach(entry => {
          pageID = entry.pageid;
          pageTitle = entry.title;
          pageSummary = entry.snippet;
          console.log(pageID + ' ' + pageTitle + ' ' + pageSummary);
          $('ul').append('<a href="http://en.wikipedia.org/wiki?curid='+ pageID
          + '" target="blank"><li><h2>' + pageTitle + '</h2><p>' + pageSummary + '</p></li></a>');
        });
      });
    }

  });

});

/*
1. x- in search box changes search box back to magnifying glass
2. x- in search box removes search results and moves search bar back to middle of
page
5. after pressing enter, search bar is moved from middle to top of page
6. deleting text in search bar does not refresh page
7. entering new text and pressing enter
  a) removes previous results
  b) inserts new results
*/
