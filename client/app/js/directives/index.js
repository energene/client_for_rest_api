module.exports = function(app) {
  require('./player_display')(app);
  require('./player_form')(app);
  require('./team_display')(app);
  require('./team_form')(app);
};
