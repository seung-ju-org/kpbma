window.addEventListener("load", function () {


    const pictureListElement = document.querySelector(".picture-list");

    for (let i = 0; i < pictureListElement.children.length; i++) {
        const pictureListItemElement = pictureListElement.children[i];
        const swiperElement = pictureListItemElement.querySelector('.swiper');
        new Swiper(swiperElement, {
            slidesPerView: '1',
            centeredSlides: true,
            spaceBetween: 0,
        });
    }

    const pictureTitleListElement = document.querySelector(".picture-title-list");

    for (let i = 0; i < pictureTitleListElement.children.length; i++) {
        const pictureTitleListItemElement = pictureTitleListElement.children[i]
        const pictureTitleListItemButtonElement = pictureTitleListItemElement.querySelector('button');
        pictureTitleListItemButtonElement.addEventListener('click', function () {
            for (let j = 0; j < pictureTitleListElement.children.length; j++) {
                const pictureTitleListItemElement = pictureTitleListElement.children[j];
                pictureTitleListItemElement.classList.remove('active');

                if (i === j) {
                    pictureTitleListItemElement.classList.add('active');
                }
            }

            for (let j = 0; j < pictureTitleListElement.children.length; j++) {
                const pictureListItemElement = pictureListElement.children[j];
                pictureListItemElement.classList.remove('active');

                if (i === j) {
                    pictureListItemElement.classList.add('active');
                }
            }
        });
    }
});
