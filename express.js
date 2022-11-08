var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');
const { userInfo, type } = require('os');


//global variable for tweet data
var tweetinfo = []

//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    tweetinfo = JSON.parse(data);
  }
});
 

//Get functions
//Gets all user ID's
app.get('/tweets', function(req, res) {
  res.send(tweetinfo);
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  //TODO: send tweet info
  res.send(tweetinfo);
});

//Shows searched tweets
app.get('/searchinfo', function(req, res){
  //TODO: send searched tweets
  res.send(tweetinfo);
});

//Post functions
//Posts created tweets
app.post('/tweetcreate', function(req, res) {
  //TODO: create a tweet.
  var currid = req.body.id;
  var tweettext = req.body.text;
  var currdate = req.body.created_at;

  tweetinfo.push({
    id: currid,
    text: tweettext,
    created_at: currdate
  });
  res.send('Successfully created tweet');
});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  //TODO: search a tweet
});

//Update ID
app.put('/tweets/:nm', function(req, res) {
  //TODO: update tweets
  var id = req.params.nm;
  var i;

  for(i=0; i<tweetinfo.length; i++) {
    if(tweetinfo[i].user.name == id) {
      tweetinfo[i].user.screen_name = req.body.updateName;
    }
  }

  res.send("Successfully updated screen name");

});

//Delete 
app.delete('/tweetinfo/:tweetid', function(req, res) {
  //TODO: delete a tweet
  var tweetid = req.params.tweetid;
  console.log(typeof(tweetid));
  var i;
  for(i=0; i<tweetinfo.length; i++) {
    if(tweetinfo[i].id == tweetid) {
      tweetinfo.splice(i, 1);
    }
  }

  res.send("Successfully deleted");

});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});