const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const browsersync = require("browser-sync").create();
const notify = require("gulp-notify");
const dependents = require("gulp-dependents");
const sortMediaQueries = require("postcss-sort-media-queries");
const cssDeclarationSorter = require("css-declaration-sorter");
const cache = require("gulp-cached");
const remember = require("gulp-remember");

const plugins = [
  autoprefixer(),
  cssnano(),
  sortMediaQueries(),
  cssDeclarationSorter({ order: "smacss" }),
];
const source = ["src/scss/*.*", "src/scss/*/*.*"];
const sassOption = {
  outputStyle: "expanded", // nested | expanded | compact | compressed
  indentedSyntax: false,
};

function css() {
  return gulp
    .src(source, { since: gulp.lastRun(css) })
    .pipe(cache("scss"))
    .pipe(dependents())
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>"),
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass(sassOption).on("error", sass.logError))
    .pipe(postcss(plugins))
    .pipe(remember("scss"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(browsersync.stream());
}

exports.css = css;
