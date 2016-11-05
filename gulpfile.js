var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');


// var baseDir = ''
var destDir = 'build/'
var paths = {
  'htmlSrc': ['index.html'],
  'htmlDest': destDir,
  'jsSrc': ['js/**/*.js'],
  'jsDest': destDir + 'js',
  'cssSrc': ['css/**/*.css'],
  'cssDest': destDir + 'css',
  'imgSrc': ['img/**/*'],
  'imgDest': destDir + 'img'
}

/* Minify html */
gulp.task('htmlmin', function() {
  return gulp.src(paths.htmlSrc)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(destDir));
});

/* Minify js */
gulp.task('uglify', function (cb) {
  pump([
        gulp.src(paths.jsSrc),
        uglify(),
        gulp.dest(paths.jsDest)
    ],
    cb
  );
});

/* Minify CSS */
gulp.task('minify-css', function() {
  return gulp.src(paths.cssSrc)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(paths.cssDest));
});

/* Optimize Images */
gulp.task('opt-images', function(cb) {
  gulp.src(paths.imgSrc)
      .pipe(imagemin())
      .pipe(gulp.dest(paths.imgDest))
});

gulp.task('default', ['htmlmin', 'minify-css', 'uglify', 'opt-images'])
