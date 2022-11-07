import sass from "sass";
import gulpSass from "gulp-sass";
import gulpRename from "gulp-rename"; // переименовывает файлы
import cleanCss from "gulp-clean-css"; // Минификация css-файла
import webpCss from "gulp-webpcss"; // Вывод webp-изображений
import autoprefixer from "gulp-autoprefixer"; // добавляет вендорные префиксы
import groupCssMediaQueries from "gulp-group-css-media-queries"; // группирует медиа-запросы
import sourcemaps from 'gulp-sourcemaps';

const sassCompilier = gulpSass(sass);

//Копирует файлы из src
export const scss = () => {
  return app.gulp.src(app.path.src.scss)
  .pipe(app.plugins.ifPlugin(app.isDev, sourcemaps.init()))
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
          title: "SCSS",
          message: "Error: <%= error.message %>", // Показывает сообщения в Windows
        })
      )
    )
    .pipe(app.plugins.replace(/@img\//g, '../img/'))// путь к изображению, ../img/ - вход в папку img
    .pipe(sassCompilier({
        outputStyle: "expanded", // полностью развёрнутый CSS;
      })
    )
    .pipe(app.plugins.ifPlugin(app.isBuild,groupCssMediaQueries()))
    .pipe(app.plugins.ifPlugin(app.isBuild,autoprefixer({
          grid: true, // включаем поддержку grid
          overrideBrowserslist: ['last 3 versions'], // кол-во версий браузера
          cascade: true, // включение выравнивания
        })
      )
    )
    .pipe(app.plugins.ifPlugin(app.isBuild,webpCss({
      webpClass: ".webp", // если браузер поддерживает, то добавляет класс webp
      noWebpClass: ".no-webp", // если браузер не поддерживает, то добавляет класс no-webp
    })))
    .pipe(app.plugins.ifPlugin(app.isDev, sourcemaps.write('.')))
    .pipe(app.gulp.dest(app.path.build.css)) // Добавляет минифицированный файл
    .pipe(app.plugins.ifPlugin(app.isBuild,cleanCss()))
    .pipe(gulpRename({ suffix: '.min' }))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
};
