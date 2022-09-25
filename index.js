// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const digitsRegExp = /\d/g;
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", (req,res)=>{
  let dateInfo = req.params.date;
  if ( digitsRegExp.test(dateInfo)){
    date = new Date(parseInt(dateInfo,10));
  }
  else{
    date = new Date(dateInfo);
  }
  console.log(date,req.params.date);
  res.json({"unix": Math.floor(date / 1000), "utc": date.toUTCString()});
});

app.get("/api/", (req,res)=>{
  date = new Date();
  console.log(date,req.params.date);
  res.json({"unix": Math.floor(date / 1000), "utc": date.toUTCString()});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
