var express = require('express');
var app = express();

app.use(express.static(__dirname + '/build'));

app.listen(process.env.PORT || 9999, function() {
  console.log('server up on port 9999');
});
