import { gsap } from 'gsap';
import SceneManager from './SceneManager';
import ProductGallery from './ProductGallery';
import EventManager from './EventManager';

import headlineImage from '../assets/headline.png';
import ctaImage from '../assets/cta.png';
import shadowImage from '../assets/shadow.png';

import videoSource from '../assets/video.mp4';

class App {
    constructor() {
        this.sceneManager = new SceneManager();
        this.eventManager = EventManager;

        this.productGallery = null;
        this.ctaButton = document.querySelector('.cta-button');
        this.productVideo = document.getElementById('product-video');
        this.orientationMessage = document.getElementById('orientation-lock-message');
        this.appContainer = document.getElementById('app');

        this.galleryImages = [
            './assets/shoe1.png',
            './assets/shoe2.png',
            './assets/shoe3.png',
            './assets/shoe4.png',
        ];

        this.init();
    }

    init() {
        this.eventManager.log('ad_load');
        this.setupEventListeners();
        this.checkOrientation();

        this.sceneManager.goToScene('intro');
        setTimeout(() => {
            this.sceneManager.goToScene('gallery');
            this.initGalleryAndCTA();
        }, 8000);
    }

    setupEventListeners() {
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('orientationchange', this.handleOrientationChange.bind(this));
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));

        if (this.ctaButton) {
            this.ctaButton.addEventListener('click', this.handleCtaClick.bind(this));
        } else {
            console.warn('CTA button not found.');
        }
    }

    checkOrientation() {
        if (window.innerWidth < window.innerHeight || !/Mobi|Android/i.test(navigator.userAgent)) {

            this.appContainer.classList.remove('hidden');
            this.orientationMessage.classList.remove('active');
            this.orientationMessage.classList.add('hidden');

        } 
        else {

            this.appContainer.classList.add('hidden');
            this.orientationMessage.classList.remove('hidden');
            this.orientationMessage.classList.add('active');
        }
    }

    handleResize() {
        this.eventManager.log('window_resize', {
            width: window.innerWidth,
            height: window.innerHeight
        });
        this.checkOrientation();
    }

    handleOrientationChange() {
        setTimeout(() => this.checkOrientation(), 100);
    }

    handleVisibilityChange() {
        if (document.hidden) {
            this.eventManager.log('page_hide');
            if (this.productVideo && !this.productVideo.paused) {
                this.productVideo.pause();
            }
        } 
        else {
            if (this.productVideo && this.sceneManager.getCurrentSceneElement() === this.sceneManager.scenes.video) {
                this.productVideo.play();
            }
        }
    }

    initGalleryAndCTA() {
        if (!this.productGallery) {
            this.productGallery = new ProductGallery(
                '.product-gallery',
                this.galleryImages,
                this.handleGallerySlideClick.bind(this)
            );
        }

        if (this.ctaButton) {
            gsap.to(this.ctaButton, {
                scale: 1.1,
                duration: 0.8,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }
    }

    /**
     * @param {number} slideIndex Clicked slide index
     */
    handleGallerySlideClick(slideIndex) {
        let videoPositionClass;
        let videoTransform;

        const uFSlideIndex = slideIndex + 1;

        switch (uFSlideIndex) {
            case 1:
                videoPositionClass = 'video-top-left';
                videoTransform = 'translate(0, 0)';
                break;
            case 2:
                videoPositionClass = 'video-top-right';
                videoTransform = 'translate(-100%, 0)';
                break;
            case 3:
                videoPositionClass = 'video-bottom-left';
                videoTransform = 'translate(0, -100%)';
                break;
            case 4:
                videoPositionClass = 'video-bottom-right';
                videoTransform = 'translate(-100%, -100%)';
                break;
            default:
                videoPositionClass = 'video-top-left';
                videoTransform = 'translate(0, 0)';
        }

        if (this.productVideo) {
            this.productVideo.classList.remove('video-top-left', 'video-top-right', 'video-bottom-left', 'video-bottom-right');
            this.productVideo.classList.add(videoPositionClass);
            this.productVideo.style.transform = videoTransform;
            this.productVideo.style.top = (uFSlideIndex === 1 || uFSlideIndex === 2) ? '0' : '100%';
            this.productVideo.style.left = (uFSlideIndex === 1 || uFSlideIndex === 3) ? '0' : '100%';

            this.productVideo.play().catch(error => {
                console.error("Video playback failed:", error);
            });
        }

        this.sceneManager.goToScene('video', { slideClicked: slideIndex, position: videoPositionClass });
    }

    handleCtaClick() {
        this.eventManager.log('user_interaction:cta_click');
        console.log('CTA button clicked!');
    }
}

export default App;