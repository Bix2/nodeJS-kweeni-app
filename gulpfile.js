var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', function() {

})

gulp.task('sass', function () {
    return gulp.src('./development/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./development/css'));
})
   
gulp.task('css', function() {
    return gulp.src('./development/css/**.css')
        .pipe(autoprefixer({browsers: ['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']}))
		.pipe(concat('main.css'))
		.pipe(gulp.dest('./public/stylesheets'))
		.pipe(cleanCSS())
		.pipe(rename("main.min.css"))
		.pipe(gulp.dest('./public/stylesheets'));
})

gulp.task('watch', function () {
    gulp.watch('./development/scss/*.scss', ['sass']);
    gulp.watch('./development/css/**.css', ['css']);
    // other watchers
})

gulp.task('default', ['sass', 'css', 'watch'])