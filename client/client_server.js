var express = require('express');
var app = express();

console.log(__dirname);
app.use(express.static(__dirname + '/build'));

app.listen(process.env.PORT || 9999, function() {
  console.log("UPDATE2");
  console.log('server up on port 9999');
});
