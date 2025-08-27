document.addEventListener('DOMContentLoaded', function () {
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
    })
});

document.addEventListener('DOMContentLoaded', function () {
    new Swiper('.swiper', {
        direction: 'horizontal',
        slidesPerView: 2,
    });
});
