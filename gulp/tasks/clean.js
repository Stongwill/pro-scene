import del from 'del';
// Функция очищает папку с результатом, т.е при компиляции заново собирается проект
export const clean = () => {
    return del(app.path.clean);
}