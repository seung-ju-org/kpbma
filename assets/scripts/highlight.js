document.addEventListener('DOMContentLoaded', function () {
    const stickyPanelElements = document.querySelectorAll('.sticky-panel');

    stickyPanelElements.forEach(function (element) {
        const stickyAreaElement = element.querySelector('.sticky-area');
        const stickyAreaBoundingClientRect = stickyAreaElement.getBoundingClientRect();
        ScrollTrigger.create({
            trigger: stickyAreaElement,
            pin: true,
            start: "-=100",
            endTrigger: element,
            end: "bottom +=" + (stickyAreaBoundingClientRect.height + 100)
        });
    })
});
