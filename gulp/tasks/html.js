import fileinclude from "gulp-file-include"; // пакет для сбора кусков файлов
import webpHtmlNosvg from "gulp-webp-html-nosvg"; // преобразовывает изображения в webp
import versionNumber from "gulp-version-number"; // не кеширует изменения

//Копирует файлы из src
export const html = () => {
  return app.gulp.src(app.path.src.html)
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
          title: "HTML",
          message: "Error <%= error.message %>", // Показывает сообщения в Windows
        })
      )
    )
    .pipe(fileinclude())
    .pipe(app.plugins.replace(/@img\//g, "img/"))
    .pipe(app.plugins.ifPlugin(app.isBuild,webpHtmlNosvg()))
       .pipe(app.plugins.ifPlugin(app.isBuild,versionNumber({
        'value': "%DT%",// добавляет ключ - текущую дату и время: к css, js - файлам
        'append': {
          'key': '_v',
          'cover': 0,
          'to': ['css','js']
        },
        'output': {
          'file': 'gulp/version.json'
        }
      })
    ))
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream()); // Выполняет автоматически обновления при изменении в браузере

};
