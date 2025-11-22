document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

    window.smoother = ScrollSmoother.create({
        smooth: 1.5,
        speed: 0.75,
        effects: true,
        onUpdate(event) {
            if (window.interactiveHandler) {
                window.interactiveHandler(event);
            }
            if (window.onUpdateSmoother) {
                window.onUpdateSmoother(event);
            }
        }
    });
});
