var gulp = require('gulp');
var eslint = require('gulp-eslint');
var webpack = require('webpack-stream');

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
  .pipe(gulp.dest('./client/build/'));
});

gulp.task('static:dev', () => {
  gulp.src('client/app/**/*.html')
  .pipe(gulp.dest('./client/build/'));
});

gulp.task('lint', () => {
  return gulp.src(paths.scripts)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('build:dev', ['webpack:dev', 'static:dev']);

gulp.task('default', ['build:dev']);
