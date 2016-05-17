const express = require('express');
const jsonParser = require('body-parser').json();
const dbErrorHandler = require(__dirname + '/../lib/db_error_handler');
const Team = require(__dirname + '/../models/team');
var teamsRouter = module.exports = exports = express.Router();

teamsRouter.get('/teams', (req, res) => {
  Team.find({}, (err, data) => {
    console.log("GETTEAMWORKS");
    if (err) return dbErrorHandler(err, res);
    res.status(200).json(data);
  });
});

teamsRouter.put('/teams/:id', jsonParser, (req, res) => {
  Team.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, data) => {
    if (err) return dbErrorHandler(err, res);
    res.status(200).json(data);
  });
});

teamsRouter.post('/teams', jsonParser, (req, res) => {
  var newTeam = new Team(req.body);
  newTeam.save((err, data) => {
    if (err) return dbErrorHandler(err, res);
    res.status(200).json(data);
  });
});

teamsRouter.delete('/teams/:id', (req, res) => {
  Team.remove({ _id: req.params.id }, (err) => {
    if (err) return dbErrorHandler(err, res);
    res.status(200).json({ msg: 'delete successful' });
  });
});
