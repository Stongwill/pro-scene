import webp from "gulp-webp";
import imageMin from "gulp-imagemin";

export const images = () => {
  return app.gulp.src(app.path.src.images)
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
          title: "IMAGES",
          message: "Error <%= error.message %>", // Показывает сообщения в Windows
        })
      )
    )
    .pipe(app.plugins.newer(app.path.build.images)) // обработка измененных и/или новых изображений
    .pipe(app.plugins.ifPlugin(app.isBuild, webp()))
    .pipe(app.plugins.ifPlugin(app.isBuild, app.gulp.dest(app.path.build.images)))
    .pipe(app.plugins.ifPlugin(app.isBuild, app.gulp.src(app.path.src.images))) // получить доступ к папке с изображениями
    .pipe(app.plugins.ifPlugin(app.isBuild,app.plugins.newer(app.path.build.images))) // обработка измененных и/или новых изображений
    .pipe(app.plugins.ifPlugin(app.isBuild, imageMin({
          // сжимает изображения
          verbose: true, // отображает на сколько удалось сжать изображение
          progressive: true, // сжатие изображений jpg без потери качества
          svgoPlugins: [{ removeViewBox: false }], // не удаляет  атрибут viewbox в svg
          interlaced: true, // ставится true(да) чересстрочное
          optimizationLevel: 3, // 0 to 7 - уровень сжатия изображения
        })
      )
    )

    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browsersync.stream());
};
