document.addEventListener('DOMContentLoaded', function () {
    const stickyPanelElements = document.querySelectorAll('.sticky-panel');

    stickyPanelElements.forEach(function (element) {
        const stickyAreaElement = element.querySelector('.sticky-area')
        ScrollTrigger.create({
            trigger: stickyAreaElement,
            pin: true,
            start: "-=100",
            end: "+=200",
        });
    })
});
