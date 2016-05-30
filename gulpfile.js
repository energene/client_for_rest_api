const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const webpack = require('webpack-stream');
const cp = require('child_process');
const protractor = require('gulp-protractor').protractor;
const KarmaServer = require('karma').Server;
var children = [];

var paths = {
  scripts: [
    __dirname + '/index.js',
    __dirname + '/gulpfile.js',
    __dirname + '/client/app/**/*.js',
    __dirname + 'client/client_server.js',
    __dirname + '/server/lib/**/*.js',
    __dirname + '/server/models/**/*.js',
    __dirname + '/server/routes/**/*.js',
    __dirname + '/server/server.js'
  ]
};

gulp.task('webpack:dev', () => {
  return gulp.src('client/app/js/entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./client/build'));
});

gulp.task('static:dev', () => {
  return gulp.src('client/app/**/*.html')
    .pipe(gulp.dest('./client/build'));
});

gulp.task('webpack:test', () => {
  return gulp.src('test/unit/test_entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./test'));
});

gulp.task('start:server', () => {
  children.push(cp.fork(__dirname + '/server/server.js'));
  children.push(cp.spawn('mongod', ['--dbpath=./db']));
  children.push(cp.fork(__dirname + '/client/client_server.js', [], { env: {
    MONGODBD_URI: 'mongodb://localhost/team_test_db' } }));
  children.push(cp.spawn('webdriver-manager', ['start']));
});

gulp.task('lint', () => {
  return gulp.src(paths.scripts)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('mocha', () => {
  return gulp.src('./test/**/*test.js')
    .pipe(mocha())
    .once('end', () => {
      process.exit();
    });
});

gulp.task('protractor', ['start:server', 'build:dev'], () => {
  return gulp.src(['test/integration/db_spec.js'])
    .pipe(protractor({
      configFile: 'test/integration/config.js'
    }))
    .on('end', () => {
      children.forEach((child) => {
        child.kill('SIGKILL');
      });
    });
});

gulp.task('karma', (done) => {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('build:test', ['webpack:dev', 'static:dev']);
gulp.task('build:dev', ['lint', 'webpack:dev', 'static:dev', 'start:server']);
gulp.task('build:karma', ['webpack:dev', 'webpack:test', 'start:server', 'karma']);
gulp.task('test', ['protractor']);
gulp.task('default', ['build:dev', 'test']);
