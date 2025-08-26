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
        const interactiveVisibleElements = document.querySelectorAll(".interactive-visible");

        for (let i = 0; i < interactiveVisibleElements.length; i++) {
            const element = interactiveVisibleElements[i];
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

        function animateNumber(element, start, end, duration, formatter) {
            const textNode = Array.from(element.childNodes)
                .find(n => n.nodeType === Node.TEXT_NODE && /\d/.test(n.nodeValue));
            if (!textNode) return;

            const numberRe = /[+-]?\d{1,3}(?:,\d{3})*(?:\.\d+)?|[+-]?\d+(?:\.\d+)?/;
            const format = formatter ?? (v => String(v));
            const t0 = performance.now();

            function frame(now) {
                const t = Math.min((now - t0) / duration, 1);
                const val = start + (end - start) * t;
                textNode.nodeValue = textNode.nodeValue.replace(numberRe, format(val));
                if (t < 1) requestAnimationFrame(frame);
            }

            requestAnimationFrame(frame);

        }


        const interactiveNumberElements = document.querySelectorAll(".interactive-number");
        for (let i = 0; i < interactiveNumberElements.length; i++) {
            const element = interactiveNumberElements[i];
            const isVisible = handleGetIsVisibleElement(element, element.dataset.interactiveOffset)

            if (isVisible) {
                if (element.dataset.interactiveIsVisible !== "true") {
                    const number = element.innerText
                        .match(/[+-]?\d{1,3}(?:,\d{3})*(?:\.\d+)?|[+-]?\d+(?:\.\d+)?/)?.[0]
                        .replace(/,/g, '') ?? null;

                    if (number !== null) {
                        animateNumber(element, 0, +number, 1000, function (value) {
                            return value.toLocaleString();
                        });
                    }
                }
                element.dataset.interactiveIsVisible = "true"
            } else {
                element.dataset.interactiveIsVisible = "false";
            }
        }
    }

    window.interactiveHandler = handler;

    document.addEventListener('DOMContentLoaded', function () {
        handler();
        window.addEventListener("scroll", handler);
    });
})();
