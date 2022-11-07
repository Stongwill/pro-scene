import replace from "gulp-replace"; // плагин для замены 
import plumber from "gulp-plumber"; // обработка ошибок
import notify from "gulp-notify"; // сообщения в Windows
import browsersync from 'browser-sync'; // локальный сервер
import newer from 'gulp-newer'; // проверяет обновилась ли картинка в действительности
import ifPlugin from "gulp-if"; // условное ветвление 

export const plugins = {replace,plumber,notify,browsersync,newer,ifPlugin} 