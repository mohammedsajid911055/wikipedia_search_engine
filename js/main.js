$(document).ready(function() {

      // Create the search function

      function search(){

      // Hide elements for results page
      $('#home').removeClass("home");
      $('#title').hide();
      $('#description').hide(); 
      $('#randomDiv').hide(); 
      $('#random').hide(); 
      $('#home').addClass("results");  
      $('#smallTitle').removeClass("hidden"); 
      // Enlarge and center search input and button
      $('#searchDiv').removeClass("col-sm-8"); 
      $('#searchDiv').addClass("col-md-10 col-md-offset-1");  

      

      // Get value from #searchfield, split and join with %20
      var searchString = $("#searchfield");
      searchString = searchString.val().split(" ");
    searchString = searchString.join("%20"); 
    var searchUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="
                  + searchString;  
       
    // Redirect to results page
    // document.location.href = "results.html"

    // Get the data from wiki api
    $.ajax({
      type: 'GET',
      url: searchUrl,
      dataType: 'jsonp',
      data: "fullurl",
      success: function(data) {

        // Clears previous results and searchfield
        document.getElementById("search-results").innerHTML = ""; 

        // Loops through each data
        $.each(data.query.pages, function(key) {
       
        // Insert data into HTML without creating variables. Adds on to each other
        document.getElementById("search-results").innerHTML += '<div class="div-results">' + '<a href="' + 'https://en.wikipedia.org/?curid=' + (data.query.pages[key].pageid) + '" target="_blank" id="results-link">' + '<div>' + '<h1>' + (data.query.pages[key].title) + '</h1>' + '<p>' + (data.query.pages[key].extract) + '</p></div></a></div>';
                                                                                                       
      }); // $.each function
      
      } // success: function
      
    }); // ajax

    
    
  }; // (new search function)
  

  // Call search function on button click

  $("#search").on("click", function(){search()});
 

  // Call search function on 'enter' key press
  document.getElementById('searchfield').onkeydown = function(e){
   if(e.keyCode == 13){
      search();
   }
};

}); // (document).ready