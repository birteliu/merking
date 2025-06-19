"use strict";
// Load plugins
const gulp = require("gulp");
const browsersync = require("browser-sync").create();
const del = require("del");

//載入各任務
const { css } = require("./tasks/css");
const { script } = require("./tasks/script");
const { images } = require("./tasks/images");
const { layout } = require("./tasks/layout");
const { watchFiles } = require("./tasks/watch");
const { copy, copyFont } = require("./tasks/copy");

// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "dist",
        },
        port: 3000,
        watch: true,
    });
    done();
}

// BrowserSync Reload
// function browserSyncReload(done) {
//   browsersync.reload();
//   done();
// }

// Clean task
function clean() {
    return del(["dist"], {
        force: true,
    });
}

// 任務清單
const build = gulp.parallel(copyFont, css, images, script, layout());

const dev = gulp.series(clean, build, browserSync, watchFiles, copy);

const watch = gulp.series(
    clean,
    gulp.parallel(copy, css, images, script),
    copy,
);

// 一般開發輸出
//gulp.series(照順序執行)
//gulp.parallel(同時執行)

//一般切版用  =>  gulp dev
//進mvc專案用  => gulp watch

// export tasks
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.dev = dev;
