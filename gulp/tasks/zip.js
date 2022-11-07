import del from "del";
import gulpZip from "gulp-zip";

export const zip = () => {
    del(`./${app.path.rootFolder}.zip`); // удаление zip-архива, если он существует
    return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
      .pipe(app.plugins.plumber(app.plugins.notify.onError({
            title: "ZIP",
            message: "Error <%= error.message %>", // Показывает сообщения в Windows
          })
        )
      )
      .pipe(gulpZip(`${app.path.rootFolder}.zip`))
      .pipe(app.gulp.dest('./')) // выгрузиться в корень проекта
        }