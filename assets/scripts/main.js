window.addEventListener('load', function () {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const wrapperElement = document.querySelector('#wrapper')
    const mainElement = wrapperElement.querySelector('main');
    const galleryElements = mainElement.querySelectorAll('.gallery');
    const galleryImageElements = mainElement.querySelectorAll('.gallery .image-container');

    const maxScrollWidth = Math.max.apply(
        null,
        Array.from(galleryElements).map(function (element) {
            return element.scrollWidth;
        })
    );

    if (maxScrollWidth > 0) {
        const minYear = 1885;
        const maxYear = 1969;
        const years = new Array(maxYear - minYear + 1).fill(null).map(function (_, index) {
            return minYear + index;
        })
        const scrollElement = document.createElement('div');

        scrollElement.style.height = maxScrollWidth + (windowHeight / 2) + 'px';
        wrapperElement.appendChild(scrollElement);

        const historyYearContainerElement = mainElement.querySelector('.history-year-container')

        function handleGallery() {
            const scrollY = window.scrollY;
            const scrollHeight = window.document.body.scrollHeight;
            const scrollPercent = Math.min(scrollY / (scrollHeight - windowHeight), 1)

            galleryElements.forEach(function (element) {
                element.style.transform = 'translateX(-' + scrollY + 'px)';
            });

            galleryImageElements.forEach(function (element, i) {
                const boundingClientRect = element.getBoundingClientRect();
                const elementWidth = boundingClientRect.width - 75;
                const visibleRight = Math.min(boundingClientRect.right, windowWidth);
                const visibleWidth = Math.max(0, visibleRight - boundingClientRect.left) - 75;
                const visibilityRatio = visibleWidth / elementWidth;
                element.style.opacity = '' + visibilityRatio;
            });

            const historyYearLine = historyYearContainerElement.querySelector('.history-year-line')
            historyYearLine.style.transform = 'scaleX(' + scrollPercent * 100 + '%)'
            const historyYear = historyYearContainerElement.querySelector('.btn')
            historyYear.style.transform = 'translateX(' + ((windowWidth - historyYear.clientWidth) * scrollPercent) + 'px)'
            historyYear.innerHTML = years.find(function (_, index, array) {
                return (index * (1 / (array.length - 1))) >= scrollPercent;
            });
        }

        handleGallery();
        document.addEventListener('scroll', handleGallery);
    }

    const mainBgImgElement = wrapperElement.querySelector('.main-bg img');
    const backgroundScale = 1.5
    mainBgImgElement.style.transform = 'scale(' + backgroundScale + ')';
    mainBgImgElement.style.transformOrigin = 'center center';
    document.body.addEventListener('mousemove', function (event) {
        const clientXPercent = event.clientX / windowWidth;
        const clientYPercent = event.clientY / windowHeight;
        const translateMargin = 15;
        const translateX = -clientXPercent * translateMargin + translateMargin / 2 + '%';
        const translateY = -clientYPercent * translateMargin + translateMargin / 2 + '%';
        mainBgImgElement.style.transform = 'scale(' + backgroundScale + ') translateX(' + translateX + ') translateY(' + translateY + ')';
    });
});
