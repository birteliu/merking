const gulp = require("gulp");
const browsersync = require("browser-sync").create();
const nunjucksRender = require("gulp-nunjucks-render");
const prettify = require("gulp-prettify");

// nunjucksRender
const layout = (file) => () => {
    const srcPath = file ? file : "src/**/*.html";
    const destPath = file
        ? `dist/${file.replace("src/", "").replace(/[^/]+$/, "")}`
        : "dist/";

    return gulp
        .src(srcPath)
        .pipe(nunjucksRender({ path: ["src/templates"] }))
        .pipe(prettify({ indent_size: 2, extra_liners: [] }))
        .pipe(gulp.dest(destPath))
        .pipe(browsersync.stream());
};

exports.layout = layout;
