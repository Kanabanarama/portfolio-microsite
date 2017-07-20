var gulp    = require('gulp');
var $       = require('gulp-load-plugins')();
var sass    = require('gulp-sass');
var connect = require('gulp-connect');

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'))
    .pipe(connect.reload());
});

gulp.task('javascript', function () {
  gulp.src('js/**/*.js')
    .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(connect.reload());
});

gulp.task('serve', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['js/**/*.js'], ['javascript']);
  gulp.watch(['*.html'], ['html']);
})

gulp.task('default', ['sass', 'serve', 'watch']);