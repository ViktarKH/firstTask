import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import EventManager from './EventManager';

import shoe1 from '../assets/shoe1.png';
import shoe2 from '../assets/shoe2.png';
import shoe3 from '../assets/shoe3.png';
import shoe4 from '../assets/shoe4.png';

const eventManager = EventManager;

class ProductGallery {
    constructor(containerSelector, images, onSlideClickCallback) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) {
            console.error(`Product gallery container "${containerSelector}" not found.`);
            return;
        }

        this.galleryImages = [shoe1, shoe2, shoe3, shoe4];
        this.onSlideClickCallback = onSlideClickCallback;
        this.swiper = null;

        this.renderSlides();
        this.initSwiper();

        eventManager.log('ProductGallery: initialized', { container: containerSelector });
    }

    renderSlides() {
        const swiperWrapper = this.container.querySelector('.swiper-wrapper');
        if (!swiperWrapper) {
            console.error('Swiper wrapper not found in product gallery container.');
            return;
        }

        swiperWrapper.innerHTML = '';
        this.galleryImages.forEach((imgPath, index) => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            slide.innerHTML = `<img src="${imgPath}" alt="Product ${index + 1}">`;
            slide.addEventListener('click', () => {
                this.handleSlideClick(index);
            });
            swiperWrapper.appendChild(slide);
        });
    }

    initSwiper() {
        if (this.swiper) {
            this.swiper.destroy(true, true);
        }
        this.swiper = new Swiper(this.container, {
            modules: [Pagination, Navigation],
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            slidesPerView: 1,
            spaceBetween: 0,
            allowTouchMove: true,
            breakpoints: {
                768: {
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    spaceBetween: 20,
                },
            },
            on: {
                init: () => {
                    eventManager.log('Swiper: initialized');
                },
                slideChange: (swiper) => {
                    eventManager.log('Swiper: slide changed', {
                        activeIndex: swiper.activeIndex,
                        realIndex: swiper.realIndex,
                    });
                },
            },
        });
    }

    handleSlideClick(slideIndex) {
        eventManager.log('ProductGallery: slide clicked', { slideIndex });
        if (typeof this.onSlideClickCallback === 'function') {
            this.onSlideClickCallback(slideIndex);
        }
    }

    getSwiper() {
        return this.swiper;
    }
}

export default ProductGallery;