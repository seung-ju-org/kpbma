document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

    ScrollSmoother.create({
        smooth: 1.5,
        speed: 0.25,
        effects: true,
        onUpdate: interactiveHandler
    });
});
