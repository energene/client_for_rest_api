const express = require('express');
const appexpress = module.exports = exports = express();
const mongoose = require('mongoose');

const authRoutes = require(__dirname + '/../routes/auth_routes');
const playerRoutes = require(__dirname + '/../routes/player_routes');
const teamRoutes = require(__dirname + '/../routes/team_routes');

appexpress.use('/api', authRoutes);
appexpress.use('/api', playerRoutes);
appexpress.use('/api', teamRoutes);

module.exports = exports = {
  server: appexpress,
  db: mongoose,
  dbconnect: process.env.MONGOLAB_URI || 'mongodb://localhost/localdbtest'
};
