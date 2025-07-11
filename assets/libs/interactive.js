(function () {
    function handleGetIsVisibleElement(element, offset = 0) {
        const boundingClientRect = element.getBoundingClientRect();
        return (
            boundingClientRect.y + boundingClientRect.height - offset <
            window.innerHeight
        );
    }

    function handleElementVisible(element, visible) {
        if (visible) {
            element.style.opacity = 1;
            element.style.transform = "translateY(0)";
        } else {
            element.style.opacity = 0;
            element.style.transform = "translateY(30px)";
        }
    }

    function handleElementScrollVisible(element, offset = 0) {
        handleElementVisible(
            element,
            handleGetIsVisibleElement(element, offset),
        );
    }

    function handler() {
        const elements = document.querySelectorAll(".interactive-visible");

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const dataset = element.dataset;

            function handleVisible() {
                if (dataset.interactiveVisible === "true") {
                    handleElementVisible(element, true);
                } else {
                    handleElementScrollVisible(element, dataset.interactiveOffset);
                }
            }

            if (element.dataset.interactiveDelay > 0) {
                setTimeout(handleVisible, dataset.interactiveDelay);
            } else {
                handleVisible();
            }
        }
    }

    window.interactiveHandler = handler;

    window.addEventListener('load', function () {
        handler();
        window.addEventListener("scroll", handler);
    });
})();
