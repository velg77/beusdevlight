var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
//var browserSync = require('browser-sync').create();

livereload({ start: true });
// gulp.task('sass', function(){
//   return gulp.src('components/*.scss')
//     .pipe(sass()) // Converts Sass to CSS with gulp-sass
//     .pipe(gulp.dest('dist'))
// });

gulp.task('pack-css', function(){
  return gulp.src('components/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('assets/css'))
    .pipe(livereload());  
  // Other watchers
});

gulp.task('pack-js', function () {    
  return gulp.src(['components/**/*.js'])
      // .pipe(concat('main.js'))
      .pipe(gulp.dest('assets/js'))
      .pipe(livereload());
});

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('components/**/*.scss', ['pack-css']);   
  gulp.watch('components/**/*.js', ['pack-js']);
})

gulp.task('default', ['pack-css','pack-js','watch']);
