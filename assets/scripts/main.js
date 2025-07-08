window.addEventListener('load', function () {
    const wrapperElement = document.querySelector('#wrapper')
    const mainElement = wrapperElement.querySelector('main');
    const galleryElements = mainElement.querySelectorAll('.gallery');

    const maxScrollWidth = Math.max.apply(
        null,
        Array.from(galleryElements).map(function (element) {
            return element.scrollWidth
        })
    );

    if (maxScrollWidth > 0) {
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        const minYear = 1885;
        const maxYear = 1969;
        const years = new Array(maxYear - minYear + 1).fill(null).map(function (_, index) {
            return minYear + index;
        })
        const scrollElement = document.createElement('div');

        scrollElement.style.height = maxScrollWidth + (windowHeight / 2) + 'px';
        wrapperElement.appendChild(scrollElement);

        const historyYearContainerElement = mainElement.querySelector('.history-year-container')

        document.addEventListener('scroll', function () {
            const scrollY = window.scrollY;
            const scrollHeight = window.document.body.scrollHeight;

            galleryElements.forEach(function (element) {
                element.style.transform = 'translateX(-' + scrollY + 'px)';
            });

            const scrollPercent = scrollY / (scrollHeight - windowHeight)
            const historyYearLine = historyYearContainerElement.querySelector('.history-year-line')
            historyYearLine.style.transform = 'scaleX(' + scrollPercent * 100 + '%)'
            const historyYear = historyYearContainerElement.querySelector('.btn')
            historyYear.style.transform = 'translateX(' + ((windowWidth - historyYear.clientWidth) * scrollPercent) + 'px)'
            historyYear.innerHTML = years.find(function (_, index, array) {
                return (index * (1 / (array.length - 1))) >= scrollPercent
            })
        });
    }
});
