const express = require('express');
const jsonParser = require('body-parser').json();
const dbErrorHandler = require(__dirname + '/../lib/db_error_handler');
const Player = require(__dirname + '/../models/player');
var playersRouter = module.exports = exports = express.Router();

playersRouter.get('/players', (req, res) => {
  Player.find({}, (err, data) => {
    if (err) return dbErrorHandler(err, res);
    res.status(200).json(data);
  });
});

playersRouter.put('/players/:id', jsonParser, (req, res) => {
  Player.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true}, (err, data) => {
    if (err) return dbErrorHandler(err, res);
    res.status(200).json(data);
  });
});

playersRouter.post('/players', jsonParser, (req, res) => {
  var newplayer = new Player(req.body);
  newplayer.save((err, data) => {
    if (err) return dbErrorHandler(err, res);
    res.status(200).json(data);
  });
});

playersRouter.delete('/players/:id', (req, res) => {
  Player.remove({ _id: req.params.id }, (err) => {
    if (err) return dbErrorHandler(err, res);
    res.status(200).json({ msg: 'delete successful'});
  });
});
