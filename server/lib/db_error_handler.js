module.exports = exports = function(err, res) {
  if (err) process.stdout.write(err);
  res.status(500).json({ msg: 'server error' });
};
