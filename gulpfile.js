var gulp = require('gulp');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');

gulp.task('deploy', function() {
  //gulp.src('dist', {read: false}).pipe(clean());

  

  gulp.src('src/app/images/**/*')
    .pipe(gulp.dest('dist/images'));

  gulp.src('src/app/css/*')
    .pipe(gulp.dest('dist/css'));

  gulp.src('src/app/greenspaces/*')
    .pipe(gulp.dest('dist/greenspaces'));

  gulp.src('src/app/partials/*')
    .pipe(gulp.dest('dist/partials'));

  gulp.src(['src/app/*',
            '!src/app/index.html'])
    .pipe(gulp.dest('dist/'));

  gulp.src('src/app/index.html')
    .pipe(usemin({ 
        js: [uglify({mangle:false}), 'concat']
    }))
      .pipe(gulp.dest('dist/'));
});