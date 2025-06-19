const gulp = require("gulp");
const gulpIf = require("gulp-if");
const dependents = require("gulp-dependents");

// dist 複製到 wwwroot
function copy() {
  return gulp
    .src(["dist/**", "!dist/js/**", "!dist/**/*.html", "!dist/templates/**"], {
      since: gulp.lastRun(copy),
    })
    .pipe(dependents());
  // .pipe(gulp.dest("../../wwwroot")) //若不要複製到 wwwroot 則將這行註解
}

function copyFont() {
  return gulp.src("src/fonts/**").pipe(gulp.dest("dist/fonts/"));
}

exports.copy = copy;
exports.copyFont = copyFont;
