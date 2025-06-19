const gulp = require("gulp");
const plumber = require("gulp-plumber");
const browsersync = require("browser-sync").create();
const dependents = require("gulp-dependents");

// js task
function script() {
  return gulp
    .src(["src/js/**/*"], {
      since: gulp.lastRun(script),
    })
    .pipe(dependents())
    .pipe(plumber())
    .pipe(gulp.dest("dist/js/"))
    .pipe(browsersync.stream());
}

exports.script = script;
