var gulp = require('gulp');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');

gulp.task('deploy', function() {
  //gulp.src('dist', {read: false}).pipe(clean());

  

  gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'));

  gulp.src('src/css/*')
    .pipe(gulp.dest('dist/css'));

  gulp.src('src/greenspaces/*')
    .pipe(gulp.dest('dist/greenspaces'));

  gulp.src('src/partials/*')
    .pipe(gulp.dest('dist/partials'));

  gulp.src(['src/*',
            '!src/index.html'])
    .pipe(gulp.dest('dist/'));

  gulp.src('src/index.html')
    .pipe(usemin({ 
        js: [uglify({mangle:false}), 'concat']
    }))
      .pipe(gulp.dest('dist/'));
});