document.addEventListener('DOMContentLoaded', function () {
    new Swiper('.swiper', {
        direction: 'horizontal',
        slidesPerView: 'auto',
        spaceBetween: 20,
    });

    const tabElements = document.querySelectorAll('.tab-area a');
    const tabContentElements = document.querySelectorAll('.tab-contents');

    tabElements.forEach(function (tabElement, tabElementIndex, tabElementArray) {
        tabElement.addEventListener('click', function (event) {
            event.preventDefault();
            tabElementArray.forEach(function (tabElement) {
                tabElement.classList.remove('active')
            });
            tabContentElements.forEach(function (tabContentElement, tabContentElementIndex) {
                if (tabContentElementIndex === tabElementIndex) {
                    tabContentElement.style.display = '';
                } else {
                    tabContentElement.style.display = 'none';
                }
            });
            tabElement.classList.add('active');
        });
    });
});
