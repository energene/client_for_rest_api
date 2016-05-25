module.exports = function(app) {
  require('./teams_controller')(app);
  require('./players_controller')(app);
};
