const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const newer = require("gulp-newer");
const cache = require("gulp-cached");
const remember = require("gulp-remember");

// Images task
function images() {
  return gulp
    .src("src/images/**/*.{png,jpg,gif,svg,webp}")
    .pipe(cache("images"))
    .pipe(newer("dist/images/"))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngquant()],
      })
    )
    .pipe(remember("images"))
    .pipe(gulp.dest("dist/images/"));
}

exports.images = images;
