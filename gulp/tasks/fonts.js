import fs from 'fs'; // плагин для работы с файловой системой
import fonter from 'gulp-fonter'; // преобразовует otf в ttf и woff
import ttf from 'gulp-ttf2woff2'; 

export const otfToTtf = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {}) // поиск otf-файлов
      .pipe( app.plugins.plumber(
          app.plugins.notify.onError({
            title: "FONTS",
            message: "Error <%= error.message %>", // Показывает сообщения в Windows
          })
        )
      )
      .pipe(fonter( { 
        formats: ['ttf'] // конвертирует в формат ttf
      }))
      .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`)) // выгружает в исходну папку
 
        }

export const ttfToWoff = () => {
            return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {}) // поиск otf-файлов
              .pipe( app.plugins.plumber(
                  app.plugins.notify.onError({
                    title: "FONTS",
                    message: "Error <%= error.message %>", // Показывает сообщения в Windows
                  })
                )
              )
              .pipe(fonter( { 
                formats: ['woff'] // конвертирует в формат ttf
              }))
              .pipe(app.gulp.dest(`${app.path.build.fonts}`)) // выгружает в исходну папку
              .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
              .pipe(ttf())
              .pipe(app.gulp.dest(`${app.path.build.fonts}`))
         
        }

export const fonts = () => {
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`; // файл стилей подключения шрифтов
    fs.readdir(app.path.build.fonts, (err, fontsFiles) => {
        if(fontsFiles){
            if(!fs.existsSync(fontsFile)){ // если файла нет, создаем его
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for(let i = 0; i < fontsFiles; i++){
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if(newFileOnly !== fontFileName){
                        let fontName = fontFIleName.split('-')[0] ? fontFIleName.split('-')[0] : fontFIleName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[0] : fontFIleName;
                        if(fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        }
                        else if(fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        }
                        else if(fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300;
                        }
                        else if(fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        }
                        else if(fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        }
                        else if(fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        }
                        else if(fontWeight.toLowerCase() === 'extrabold') {
                            fontWeight = 800;
                        }
                        else if(fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900;
                        }
                        else {
                            fontWeight = 400;
                        }
                        fs.appendFile(fontsFile, 
                            `@font-face {
                                font-family: ${fontName};
                                font-display: swap;
                                src: url("../fonts/${fontFileName}.woff2" format("woff2), url(../font/${fontFileName}.woff"));
                                font-weight: ${fontWeight};
                                font-style: normal;
                            }\r\n`, cb);
                            newFileOnly = fontFileName;
                    }
                }

            }
            else{
                console.log('Файл scss/fonts.scss уже создан, удалить его, чтобы получить его вновь')
            }
        }
    });

    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() {

    }
}