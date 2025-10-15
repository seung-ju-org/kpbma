document.addEventListener('DOMContentLoaded', function () {
    new Swiper('.swiper', {
        direction: 'horizontal',
        slidesPerView: 2,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    ScrollTrigger.create({
        trigger: ".tab-area",
        pin: true,
        start: "-=85",
        end: document.body.scrollHeight + "+=100",

    });

    document.querySelectorAll(".section-cover").forEach(function (element) {
        ScrollTrigger.create({
            trigger: element,
            pin: true,
            start: "-=125",
            end: "bottom",
            onUpdate(scrollTrigger) {
                scrollTrigger.trigger.style.backgroundColor = 'rgba(33, 33, 33, ' + Math.max(0, (scrollTrigger.progress * 1.3) - 0.3) + ')'
            }
        });
    });

    document.querySelectorAll(".fixed-area").forEach(function (element) {
        ScrollTrigger.create({
            trigger: element,
            pin: true,
            start: "-=125",
            end: element.scrollHeight + "-=300"
        });
    });

    const locaRemoteContainerElement = document.querySelector('.loca-remote');
    const locaRemoteElements = locaRemoteContainerElement.querySelectorAll('li a');

    locaRemoteElements.forEach(function (locaRemoteElement) {
        locaRemoteElement.addEventListener('click', function (event) {
            event.preventDefault();
            smoother.scrollTo(locaRemoteElement.hash, true);
        });
    });

    window.onUpdateSmoother = function () {
        for (let i = locaRemoteElements.length - 1; i >= 0; i--) {
            const locaRemoteElement = locaRemoteElements[i];
            const hash = locaRemoteElement.hash;
            const sectionElement = document.querySelector(hash);
            const boundingClientRect = sectionElement.getBoundingClientRect();

            if (locaRemoteElement.classList.contains('active')) {
                locaRemoteElement.classList.remove('active');
            }

            if (boundingClientRect.y - (130 + window.innerHeight / 2) < 0) {
                locaRemoteContainerElement.classList.remove('hide');
                locaRemoteElements.forEach(function (locaRemoteElement, locaRemoteElementIndex) {
                    if (i !== locaRemoteElementIndex) {
                        locaRemoteElement.classList.remove('active');
                    }
                });
                locaRemoteElement.classList.add('active');
                break;
            }

            if (i === 0) {
                locaRemoteContainerElement.classList.add('hide');
            }
        }
    }
});
