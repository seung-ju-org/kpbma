document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const wrapperElement = document.querySelector('#wrapper')
    const introElement = wrapperElement.querySelector('.intro');
    const introHrElement = introElement.querySelector('hr');
    const mainBgElement = wrapperElement.querySelector('.main-bg');
    const mainBgImgElements = mainBgElement.querySelectorAll('img');
    const mainElement = wrapperElement.querySelector('main');
    const galleryElements = mainElement.querySelectorAll('.gallery');
    const galleryImageElements = mainElement.querySelectorAll('.gallery .image-container');

    const smoothContentElement = document.querySelector('#smooth-content');
    introHrElement.style.transform = 'scaleX(1)';
    setTimeout(function () {
        const introBgImg = introElement.querySelector('.intro-bg-img');
        introBgImg.style.opacity = '0.2';
        setTimeout(function () {
            const introImg = introElement.querySelector('.intro-img');
            introImg.style.opacity = '1';

            introImg.style.transform = 'translateY(0)';
            const introText = introElement.querySelector('h2');
            introText.style.opacity = '1';
            introText.style.transform = 'translateY(0)';
            setTimeout(function () {
                introHrElement.style.transform = 'scaleX(1)';
                setTimeout(function () {
                    introImg.style.opacity = '0';
                    introText.style.opacity = '0';

                    setTimeout(function () {
                        introElement.style.opacity = '0';
                        introHrElement.style.opacity = '0';

                        const backgroundScale = 1.5;
                        mainBgElement.style.transform = 'scale(' + backgroundScale + ')';
                        mainBgElement.style.transformOrigin = 'center center';

                        setTimeout(function () {
                            introElement.style.display = 'none';
                        }, 1000);

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
                            const maxYear = 2024;
                            const years = new Array(maxYear - minYear + 1).fill(null).map(function (_, index) {
                                return minYear + index;
                            })
                            const scrollElement = document.createElement('div');

                            scrollElement.style.height = maxScrollWidth + (windowHeight / 2) + 'px';
                            smoothContentElement.appendChild(scrollElement);

                            const historyYearContainerElement = mainElement.querySelector('.history-year-container')

                            let x = 0
                            let progress = 0

                            function handleGallery(event) {
                                if (event && event.scrollTrigger) {
                                    progress = event.scrollTrigger.progress;
                                    x = maxScrollWidth * progress
                                }

                                galleryElements.forEach(function (element) {
                                    let elementX = -x;
                                    if (element.dataset.x) {
                                        elementX += +element.dataset.x
                                    }
                                    let transform = 'translateX(' + elementX + 'px)';
                                    if (element.dataset.y) {
                                        transform += ' translateY(' + element.dataset.y + 'px)';
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
                                historyYearLine.style.transform = 'scaleX(' + progress * 100 + '%)'
                                const historyYear = historyYearContainerElement.querySelector('.btn')
                                historyYear.style.transform = 'translateX(' + ((windowWidth - historyYear.clientWidth) * progress) + 'px)'
                                const year = years.find(function (_, index, array) {
                                    return (index * (1 / (array.length - 1))) >= progress;
                                });
                                historyYear.innerHTML = "" + year;

                                mainBgImgElements.forEach(function (element) {
                                    element.style.opacity = '0';
                                });

                                for (let i = mainBgImgElements.length - 1; i >= 0; i -= 1) {
                                    const element = mainBgImgElements[i];

                                    const elementYear = element.dataset.year;

                                    if (year >= elementYear) {
                                        element.style.opacity = '0.9';
                                        break;
                                    }
                                }
                            }

                            handleGallery();
                            ScrollSmoother.create({
                                smooth: 1.5,
                                speed: 0.75,
                                effects: true,
                                onUpdate: handleGallery
                            });
                        }

                        document.body.addEventListener('mousemove', function (event) {
                            const clientXPercent = event.clientX / windowWidth;
                            const clientYPercent = event.clientY / windowHeight;
                            const translateMargin = 15;
                            const translateX = -clientXPercent * translateMargin + translateMargin / 1 + '%';
                            const translateY = -clientYPercent * translateMargin + translateMargin / 1 + '%';
                            mainBgElement.style.transform = 'scale(' + backgroundScale + ') translateX(' + translateX + ') translateY(' + translateY + ')';
                            galleryElements.forEach(function (element) {
                                element.dataset.x = '' + (clientXPercent - 0.5) * 25;
                                element.dataset.y = '' + (clientYPercent - 0.5) * 25;
                                handleGallery();
                            });
                        });
                    }, 1000);
                }, 500);
            }, 1000);
        }, 1000);
    }, 1000);
});
