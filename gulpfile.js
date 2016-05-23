var gulp = require('gulp');
var webpack = require('webpack-stream');
const babel = require('babel-loader');
const html = require('html-loader');

gulp.task('static:dev', function() {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
});

gulp.task('webpack:dev', function() {
  return gulp.src('app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', function() {
 return gulp.src(__dirname + '/test/test_entry.js', { read: true })
   .pipe(webpack({
     module: {
      loaders: [
        {
          test: /\.html$/,
          loader: 'html'
        }
      ]
     },
     output: {
       filename: 'test_bundle.js'
     }
   }))
   .pipe(gulp.dest('test'));
});

gulp.task('build:dev', ['webpack:dev', 'static:dev']);

gulp.task('default', ['build:dev']);
