window.addEventListener("load", function () {
    const swiper = new Swiper('.picture-container .swiper', {
        direction: 'vertical',
        slidesPerView: '1',
        spaceBetween: 0,
        allowSlideNext: true,
        allowSlidePrev: true,
        mousewheel: true,
        keyboard: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

    const pictureTitleListElement = document.querySelector(".picture-title-list");

    swiper.on('slideChange', function () {
        for (let i = 0; i < pictureTitleListElement.children.length; i++) {
            const pictureTitleListItemElement = pictureTitleListElement.children[i];
            pictureTitleListItemElement.classList.remove('active');

            if (i === swiper.activeIndex) {
                pictureTitleListItemElement.classList.add('active');
            }
        }
    });

    for (let i = 0; i < pictureTitleListElement.children.length; i++) {
        const pictureTitleListItemElement = pictureTitleListElement.children[i]
        const pictureTitleListItemButtonElement = pictureTitleListItemElement.querySelector('button');
        pictureTitleListItemButtonElement.addEventListener('click', function () {
            swiper.slideTo(i);
        });
    }
});
