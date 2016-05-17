const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/localdbtest');

const teamsRouter = require(__dirname + '/routes/team_routes');
const playersRouter = require(__dirname + '/routes/player_routes');
const authRouter = require(__dirname + '/routes/auth_routes');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:9999');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
  next();
});

app.use('/api', teamsRouter);
app.use('/api', playersRouter);
app.use('/api', authRouter);

app.listen(3000, () => {
  console.log('server up on port 3000');
});
