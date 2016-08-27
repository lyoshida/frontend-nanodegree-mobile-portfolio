var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');


var baseDir = 'views/'
var destDir = 'build/'
var paths = {
  'htmlSrc': baseDir + '**/*.html',
  'htmlDest': destDir,
  'jsSrc': baseDir + '**/*.js',
  'jsDest': destDir,
  'cssSrc': baseDir + '**/*.css',
  'cssDest': destDir,
  'imgSrc': [baseDir + 'images/*.png', baseDir + 'images/*.jpg'],
  'imgDest': destDir + 'images'
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
