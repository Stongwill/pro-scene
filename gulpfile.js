import gulp from "gulp";

import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

global.app = {
  path,
  gulp,
  plugins,
  isBuild: process.argv.includes('--build'), // если содержит: --build тогда режим Production
  isDev: !process.argv.includes('--build')// если не содержит: --build тогда режим Development
};

import { copy } from "./gulp/tasks/copy.js";
import { html } from "./gulp/tasks/html.js";
import { clean } from "./gulp/tasks/clean.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/javascript.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fonts } from "./gulp/tasks/fonts.js";
import { zip } from "./gulp/tasks/zip.js";

// Наблюдает за измениями в файлах
function observer() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

const fontsSeries = gulp.series(otfToTtf, ttfToWoff, fonts);

// Выполнения задач
const mainTasks = gulp.series(fontsSeries, gulp.parallel(copy, html, scss, js, images));

const dev = gulp.series(clean, mainTasks, gulp.parallel(observer, server));
const build = gulp.series(clean, mainTasks);
const zipProduction = gulp.series(clean, mainTasks, zip);

export { dev }
export { build }
export { zipProduction }
gulp.task("default", dev);
