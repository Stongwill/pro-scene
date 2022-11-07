export const server = () => {
    app.plugins.browsersync.init({ // инициализация сервера
        server: {
            baseDir: `${app.path.build.html}` // путь откуда запустить файлы
        },
        notify: false, // уберает сообщения в браузере
        ui: false,
        tunnel: true,
        port: 3000
    })
}