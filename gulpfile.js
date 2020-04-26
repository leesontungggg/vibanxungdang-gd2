// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var rename = require('gulp-rename')
var uglify = require('gulp-uglify');

gulp.task('sass', function(done) {
    gulp.src('./src/css/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(function(f) {
            return f.base;
        }))
    done();
});

gulp.task('compress', function (done) {
    gulp.src('./src/js/*.js')
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(function(f) {
        return f.base + '/minify';
    }))
    done();
})

gulp.task('copy', function (){
    gulp.src([
        "src/css/*.css",
        "src/js/**/*.min.js",
        "src/fonts/**/*.*",
        "src/images/*.*",
        "src/static/*.*",
        "src/*.html"
    ], {base: "src"})
        .pipe(gulp.dest("deploy"))
})

gulp.task('default', gulp.series('compress', 'sass'), function(done) {
   gulp.watch(['./src/css/**/*.scss', './src/js/*.js'], ['sass', 'compress']);
   done();
})

gulp.task('build', gulp.series('sass', 'compress', 'copy'), function() {
    
})
