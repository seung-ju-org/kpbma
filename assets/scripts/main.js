document.addEventListener('DOMContentLoaded', function () {
    new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 5000,
        },
        slidesPerView: 2,
        mousewheel: {
            enabled: 1
        },
    });
});
