(function(){
    var CANVAS_WIDTH = document.body.clientWidth,
        CANVAS_HEIGHT = document.body.clientHeight,
        optionsBackground,
        bsBackground,
        body = document.body,
        headerLogo = document.getElementById('headerLogo');

    optionsBackground = {
        animation: 'points',
        points: 10,
        inkAmount: 11,
        size: 350,
        frames: 3,
        frameAnimation: true,
        splashing: false,
        color: '#000000',
        queue: true,
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT
    };
    bsBackground = new Brushstroke(optionsBackground);

    var currentSlideColor, nextSlideColor,
        bgHeight = document.getElementById('sliderBgLeft').clientHeight;
    var mainSwiper = new Swiper('.swiper-container', {
        speed: 600,
        slidesPerView: 1,
        simulateTouch: false,
        mousewheel: {
            invert: false,
        },
        on: {
            transitionStart: function(){
                currentSlideColor = document.getElementsByClassName('swiper-slide-active')[0].dataset.color;
                if (!mainSwiper.isEnd) {
                    nextSlideColor = document.getElementsByClassName('swiper-slide-next')[0].dataset.color;
                    TweenMax.to('.swiper-slide-active .js-slide-center', 1.5, {x: 0, ease: Expo.easeOut}, 0.2);

                    var nextSlideContentOffset = document.getElementsByClassName('swiper-slide-next')[0].querySelectorAll('.js-slide-center')[0].offsetLeft;
                    TweenMax.to('.swiper-slide-next .js-slide-center', 1.5, {x: -(nextSlideContentOffset + 200), ease: Expo.easeOut}, 0.2);
                } else {
                    nextSlideColor = currentSlideColor;
                    TweenMax.to('.swiper-slide-active .js-slide-center', 1.5, {x: 0, ease: Expo.easeOut}, 0.2);
                }
                document.getElementById('sliderBgLeft').style.backgroundColor = currentSlideColor;
                document.getElementById('sliderBgRight').style.backgroundColor = nextSlideColor;
            }

        }
    });

    var slidesArray = document.getElementsByClassName('swiper-slide');

    document.getElementById('sliderBgLeft').style.backgroundColor = slidesArray[0].dataset.color;
    document.getElementById('sliderBgRight').style.backgroundColor = slidesArray[1].dataset.color;

    startAnimation();
    function startAnimation() {
        tl = new TimelineMax();

        tl.set('#headerLogo', {y: - headerLogo.offsetTop - headerLogo.clientHeight});
        tl.set('.swiper-container', {opacity: 0});
        tl.set('#pageNav', {opacity: 0});


        bsBackground.draw({points: [0, CANVAS_HEIGHT / 5, CANVAS_WIDTH / 3, CANVAS_HEIGHT]});
        bsBackground.draw({points: [CANVAS_WIDTH / 3, CANVAS_HEIGHT, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 5 * 2]});

        body.classList.add('is-black');

        bsBackground.draw({points: [CANVAS_WIDTH / 2, CANVAS_HEIGHT / 5 * 2, CANVAS_WIDTH / 3 * 2, CANVAS_HEIGHT]});
        bsBackground.draw({points: [CANVAS_WIDTH / 3 * 2, CANVAS_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT / 5]});


        tl.to('#headerLogo', 0.3, {y:0, delay: 0.8, ease: Back.easeOut.config(1.7)});
        tl.fromTo('.js-header-wrap', 0.2, {scaleX: 0, ease: Expo.easeOut, delay: 1.1}, {scaleX:1, ease: Expo.easeOut, delay: 1.1}, 0.2);

        tl.set('.js-header-wrap', {transformOrigin: '100% 50% 0'});
        tl.set('.js-header-inner > *', {opacity: 1});

        tl.set('.swiper-container', {opacity: 1});
        tl.set('.js-slide-text span, .js-first-img a', {opacity: 0});
        tl.staggerFromTo(['.js-slide-text-wrap-1','.js-slide-text-wrap-2', '.js-first-img-wrap'], 
            0.2, {scaleY: 0, ease: Expo.easeOut}, {scaleY:1, ease: Expo.easeOut}, 0.1);


        tl.set(['.js-slide-text-wrap-1','.js-slide-text-wrap-2, .js-page-nav'], {transformOrigin: '100% 100% 0'});
        tl.set('.js-first-img-wrap', {transformOrigin: '0 0 0'});
        tl.set('.js-slide-text span, .js-first-img a', {opacity: 1});

        tl.staggerTo(['.js-slide-text-wrap-1','.js-slide-text-wrap-2', '.js-first-img-wrap'], 0.2, {scaleY:0, ease: Expo.easeOut}, 0.1);
        tl.fromTo('#pageNav', 1, {opacity: 0, ease: Back.easeOut.config(1.7), delay: 2}, {opacity: 1, ease: Back.easeOut.config(1.7), delay: 2}, 0.2);
        tl.fromTo('#circle path', 0.3, {scale:0, ease: Expo.easeOut, delay: 2}, {scale:1, ease: Expo.easeOut, delay: 2}, 0.2);
        tl.to('.js-header-wrap', 0.3, {scaleX:0, ease: Expo.easeOut, delay: 1.4}, 0.2);
        tl.to('#news', 0.4, {y:0, ease: Expo.easeOut, delay: 2}, 0.2);

        tl.to('#sliderBgLeft', 0.3, {y:0, ease: Expo.easeOut, delay: 2.2},  0.2);
        tl.to('#sliderBgRight', 0.3, {y:0, ease: Expo.easeOut, delay: 2.2},  0.2);
        var secondSlideContentOffset = document.getElementsByClassName('swiper-slide-next')[0].querySelectorAll('.js-slide-center')[0].offsetLeft;
        tl.to('.swiper-slide-next .js-slide-center', 0.3, {x: -(secondSlideContentOffset + 200), ease: Expo.easeOut, delay: 2.4}, 0.2);
    
        afterStartAnimation(tl);
    }

    function afterStartAnimation(tl) {
        TweenMax.to('.js-fly-text-2', 5, {x: -15, ease:'linear',  repeat: -1, yoyo:true});
        TweenMax.to('.js-fly-text-2', 4, {y: -10, ease:'linear',  repeat: -1, yoyo:true});

        TweenMax.to('.js-fly-text-1', 5, {y: -5, ease:'linear',  repeat: -1, yoyo:true});

        tl.to('#circle path', 2.5, {scale: 0.95, ease: 'linear', repeat: -1, yoyo:true});
    }
})()
