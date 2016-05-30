const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/localdb');

const teamsRouter = require(__dirname + '/routes/team_routes');
const playersRouter = require(__dirname + '/routes/player_routes');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api', teamsRouter);
app.use('/api', playersRouter);
app.use((req, res) => {
  res.status(404).send('Stuffed at the line, for no gain.');
});

module.exports = app.listen(PORT, () => {
  console.log('server up on port ' + PORT);
});
