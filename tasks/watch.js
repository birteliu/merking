const gulp = require("gulp");
const slash = require("slash");
const { css } = require("./css");
const { script } = require("./script");
const { images } = require("./images");
const { layout } = require("./layout");
const { copy } = require("./copy");

// Paths
const paths = {
  scss: ["src/scss/*.*", "src/scss/*/*.*"],
  js: "src/js/*",
  images: "src/images/**/*",
  allHtml: "src/**/*.html",
};

// Watch files
function watchFiles() {
  function runLayout(file) {
    const run = gulp.series(layout(file ? file : ""));
    run();
  }

  const layoutWatch = (file) => {
    file = slash(file);
    if (!String(file).includes("src/templates")) {
      runLayout(file);
    } else {
      runLayout();
    }
  };

  gulp.watch(paths.scss, gulp.series(css, copy));
  gulp.watch(paths.js, gulp.series(script, copy));
  gulp.watch(paths.images, gulp.series(images, copy));

  // 檔案新增時監聽
  gulp.watch(paths.allHtml).on("add", layoutWatch);

  // 檔案更改時監聽
  gulp.watch(paths.allHtml).on("change", layoutWatch);
}

exports.watchFiles = watchFiles;
