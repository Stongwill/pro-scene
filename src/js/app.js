import * as modFunctions from "./modules/functions.js";
import Swiper from "swiper/bundle";
import "swiper/css";
import "swiper/css/bundle";

modFunctions.isWebp();
const btnPopup = document.querySelectorAll('.btn-call');
const popup = document.querySelector('.open-popup');
btnPopup.forEach(btns => {
    btns.addEventListener('click', function(){
        popup.classList.toggle('__active');
        document.body.classList.toggle('noscroll');
    });
    popup.addEventListener('click', function(e){
        if(!e.target.closest('.popup__block')){
            popup.classList.remove('__active');
            document.body.classList.remove('noscroll');
        }
    });
});

const slider = new Swiper(".about__slider", {  
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 4000,
      },
})