// Функция проверяющая поддерживает ли брауз ер webp-формат
export const isWebp = () => {
    //проверка поддержки webp
    const testWebp = (callback) =>{
        let webp = new Image();
        webp.onload = webp.onerror = () => {
            callback(webp.height == 2);
        };
        webp.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    testWebp((support) => {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    })
}
