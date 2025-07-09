window.addEventListener('load', function () {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const wrapperElement = document.querySelector('#wrapper')
    const mainElement = wrapperElement.querySelector('main');
    const galleryElements = mainElement.querySelectorAll('.gallery');
    const galleryImageElements = mainElement.querySelectorAll('.gallery .image-container');

    galleryElements.forEach(function (element) {
        const galleryImageElements = element.querySelectorAll('.gallery .image-container');
        galleryImageElements.forEach(function (element, elementIndex) {
            const boundingClientRect = element.getBoundingClientRect();
            const elementWidth = boundingClientRect.width - 75;
            const visibleRight = Math.min(boundingClientRect.right, windowWidth);
            const visibleWidth = Math.max(0, visibleRight - boundingClientRect.left) - 75;
            const visibilityRatio = visibleWidth / elementWidth;
            setTimeout(function () {
                element.style.opacity = '' + visibilityRatio;
                element.style.transform = 'translateY(0%)';
                element.dataset.ready = 'true';
            }, elementIndex * 100);
        });
    })

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
                let transform = 'translateX(' + -scrollY + 'px)';
                if (element.dataset.matrix3d) {
                    transform += ' matrix3d(' + element.dataset.matrix3d + ')';
                }
                element.style.transform = transform;
            });

            galleryImageElements.forEach(function (element) {
                if (element.dataset.ready) {
                    const boundingClientRect = element.getBoundingClientRect();
                    const elementWidth = boundingClientRect.width - 75;
                    const visibleRight = Math.min(boundingClientRect.right, windowWidth);
                    const visibleWidth = Math.max(0, visibleRight - boundingClientRect.left) - 75;
                    const visibilityRatio = visibleWidth / elementWidth;
                    element.style.opacity = '' + visibilityRatio;
                    element.style.transform = 'translateY(' + (10 - visibilityRatio * 10) + '%)';
                }
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
        galleryElements.forEach(function (element, elementIndex) {
            element.dataset.matrix3d = '1' +
                ', 0' +
                ', 0' +
                ', ' + (clientXPercent - 0.5) * 0.00005 * (elementIndex % 2 ? 1 : -1) + '' +
                ', 0' +
                ', 1' +
                ', 0' +
                ', ' + (clientYPercent - 0.5) * 0.0001 * (clientYPercent > 0.5 ? elementIndex % 2 ? -1 : 1 : elementIndex % 2 ? 1 : -1) + '' +
                ', 0' +
                ', 0' +
                ', 1' +
                ', 0' +
                ', 0' +
                ', 0' +
                ', 0' +
                ', 1';
            handleGallery();
        });
    });
});
