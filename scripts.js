
$(function() {
   //Get 
   $('#get-button').on('click', function() {    //DONE displays user's ID's

        $.ajax({
          url: '/tweets',
          contentType: 'application/json',
          success: function(response) {           //when request is successful
            var ubodyEl = $('#namebody');

            ubodyEl.html('');
            var i;
            for(i=0; i<response.length; i++) {
              ubodyEl.append('\
                  <tr>\
                    <td class="id">' + response[i].user.id + '</td>\
                    <td class="text">' + response[i].user.screen_name + '</td>\
                    <td class="created">' + response[i].user.name + '</td>\
                  </tr>\
              ');
            }
          }
        });
    });


    //Get tweets
    $('#get-tweets-button').on('click', function(){ //DONE gets all tweets

        $.ajax({
          url: '/tweetinfo',
          contentType: 'application/json',
          success: function(response) {           //when request is successful
            var tbodyEl = $('#tweetbody');

            tbodyEl.html('');
            var i;
            for(i=0; i<response.length; i++) {
              tbodyEl.append('\
                  <tr>\
                    <td class="id">' + response[i].id + '</td>\
                    <td class="text">' + response[i].text + '</td>\
                    <td class="created">' + response[i].created_at + '</td>\
                  </tr>\
              ');
            }
          }
        });
    });

    //Get searched tweets
    $('#get-searched-tweets').on('click', function() {  //TODO get searched tweets
        //TODO: get a searched tweet(s) & display it
        $.ajax({
          url: '/searchinfo',
          contentType: 'application/json',
          success: function(response) {
            var sbodyEl = $('#searchbody');

          }
        });
    });


  //CREATE
  $('#create-form').on('submit', function(event){   //DONE created a tweet
        event.preventDefault();
        var createInput = $('#create-input');

        //need to split create input based on ;
        var infoArr = createInput.val().split(";");
        var date = new Date().toString();

        $.ajax({
          url: '/tweetcreate',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({id: infoArr[0], text: infoArr[1], created_at: date}),
          success: function(response) {
            console.log(response);
            createInput = "";
            $('#get-tweets-button').click();
          }
        });
  });

  //Create searched tweets
  $('#search-form').on('submit', function(event){   //DONE Search for tweet
    event.preventDefault();
    var userID = document.getElementById('search-input').value;

    $.ajax({
      url: '/searchinfo',
      contentType: 'application/json',
      success: function(response) {
        var sbodyEl = $('#searchbody');

        var i;
        for(i=0; i<response.length; i++) {
          console.log(response[i].user.id == userID);
          if(response[i].user.id == userID) {
            sbodyEl.append('\
              <tr>\
              <td class="id">' + response[i].user.id + '</td>\
              <td class="text">' + response[i].text + '</td>\
              <td class="created">' + response[i].created_at + '</td>\
            </tr>\
            ');
          }
        }

      }
    });

  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event) {
    event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var name = parsedStrings[0];
    var newName = parsedStrings[1];
    
    //TODO: update a tweet
    $.ajax({
      url: '/tweets/' + name,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ updateName: newName }),
      success: function(response) {
        $('#get-button').click();
        console.log(response);
      }
    });

  });


  //DELETE
  $("#delete-form").on('submit', function() {
    var id = $('#delete-input').val();
    event.preventDefault();

    //TODO: delete a tweet
    $.ajax({
      url:'/tweetinfo/' + id,
      method: 'DELETE',
      contentType: 'application/json',
      success: function(response) {
        $('#get-tweets-button').click();
        console.log(response);
      }
    });

  });
});


                    
   