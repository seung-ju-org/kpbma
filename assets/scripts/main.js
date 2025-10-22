/* global Swiper */
document.addEventListener('DOMContentLoaded', function () {
    const introElement = document.querySelector('#intro');
    introElement.style.backgroundColor = 'transparent';
    const introCanvasElement = introElement.querySelector('canvas');
    const context = introCanvasElement.getContext('2d');

    function drawCurve(verticalFactor, flipProgress, horizontalProgress) {
        const width = introCanvasElement.clientWidth;
        const height = introCanvasElement.clientHeight;
        introCanvasElement.width = width;
        introCanvasElement.height = height;

        context.clearRect(0, 0, width, height);
        context.fillStyle = '#ffffff';

        function lerp(a, b, t) {
            return a * (1 - t) + b * t;
        }

        const paddingX = width * 0.01;
        const cornerRadius = 100;
        const middleYRelative = height * verticalFactor;

        function drawShape(isBottom) {
            const ySign = isBottom ? -1 : 1;
            const yBase = isBottom ? height : 0;

            const flipFactor = 1 - 2 * flipProgress;

            const middleY = yBase + ySign * middleYRelative;
            const sCurveEndY = middleY + ySign * cornerRadius * flipFactor;

            const finalLeftSCurveStart = paddingX + cornerRadius;
            const finalRightSCurveStart = width - paddingX - cornerRadius;
            const finalLeftEdge = paddingX;
            const finalRightEdge = width - paddingX;

            const sCurveStartX = lerp(width / 2, finalLeftSCurveStart, horizontalProgress);
            const rightCurveStartX = lerp(width / 2, finalRightSCurveStart, horizontalProgress);
            const leftEdgeX = lerp(width / 2, finalLeftEdge, horizontalProgress);
            const rightEdgeX = lerp(width / 2, finalRightEdge, horizontalProgress);

            context.beginPath();
            context.moveTo(0, yBase);
            context.lineTo(width, yBase);

            context.lineTo(width, sCurveEndY);
            context.lineTo(rightEdgeX, sCurveEndY);
            context.bezierCurveTo(rightCurveStartX, sCurveEndY, rightEdgeX, middleY, rightCurveStartX, middleY);

            context.lineTo(sCurveStartX, middleY);

            context.bezierCurveTo(leftEdgeX, middleY, sCurveStartX, sCurveEndY, leftEdgeX, sCurveEndY);
            context.lineTo(0, sCurveEndY);

            context.closePath();
            context.fill();
        }

        drawShape(false);
        drawShape(true);
    }

    function startAnimation() {
        const totalDuration = 1000;
        const startVerticalFactor = 0.475;
        const endVerticalFactor = 0;
        let startTime = null;

        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / totalDuration, 1);

            function easeInOutCubic(p) {
                return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
            }

            const horizontalProgress = easeInOutCubic(progress);

            const overlapStartPoint = 0.6;
            const verticalPhaseDuration = 1 - overlapStartPoint;
            const verticalPhaseProgress = Math.max(0, (progress - overlapStartPoint) / verticalPhaseDuration);
            const easedVerticalProgress = easeInOutCubic(verticalPhaseProgress);

            const verticalFactor = startVerticalFactor + (endVerticalFactor - startVerticalFactor) * easedVerticalProgress;

            drawCurve(verticalFactor, easedVerticalProgress, horizontalProgress);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                introElement.remove();
            }
        }

        requestAnimationFrame(animate);
    }

    function initializeCanvas() {
        const width = introCanvasElement.clientWidth;
        const height = introCanvasElement.clientHeight;
        introCanvasElement.width = width;
        introCanvasElement.height = height;
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, width, height);
    }

    initializeCanvas();
    setTimeout(() => {
        startAnimation();
        window.addEventListener('resize', startAnimation);
    }, 2000);

    const logoElement = introElement.querySelector('.logo');
    const logoSymbolElement = logoElement.querySelector('.symbol');
    const logoTxtElement = logoElement.querySelector('.txt');
    const logoSpanElement = logoElement.querySelector('span');
    logoSymbolElement.style.opacity = '1';
    logoSymbolElement.style.transform = 'translateY(0)';
    setTimeout(function () {
        logoSymbolElement.style.transform = 'translateY(0) translateX(-12rem)';
    }, 500);

    setTimeout(function () {
        logoTxtElement.style.opacity = '1';
        logoTxtElement.style.transform = 'translateY(0)';
    }, 750);

    setTimeout(function () {
        logoSpanElement.style.opacity = '1';
        if (window.innerWidth >= 425) {
            logoSpanElement.style.transform = 'translateY(0) translateX(13rem)';
        } else {
            logoSpanElement.style.transform = 'translateY(0) translateX(5rem)';
        }
    }, 1000);

    setTimeout(function () {
        logoSymbolElement.style.opacity = '0';
        logoSymbolElement.style.transform = 'translateY(1rem) translateX(-12rem)';
        logoTxtElement.style.opacity = '0';
        logoTxtElement.style.transform = 'translateY(1rem)';
        logoSpanElement.style.opacity = '0';
        if (window.innerWidth >= 425) {
            logoSpanElement.style.transform = 'translateY(1rem) translateX(13rem)';
        } else {
            logoSpanElement.style.transform = 'translateY(1rem) translateX(5rem)';
        }
    }, 2000);


    new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        speed: 2000,
        autoplay: {
            delay: 6000,
        },
        slidesPerView: 1,
        mousewheel: {
            enabled: 1
        },
    });

    const mainElement = document.querySelector('main');
    const ballContainerElement = document.createElement('div');

    ballContainerElement.style.position = 'absolute';
    ballContainerElement.style.width = '100vw';
    ballContainerElement.style.height = '100vh';
    ballContainerElement.style.pointerEvents = 'none';
    ballContainerElement.style.zIndex = '0';

    const ballCount = 15;
    const sizes = [10, 15, 20];
    const colors = ['#eb994a', '#915eef', '#ebda4a', '#c4d1f8', '#00aec5'];
    const ballElements = [];

    for (let i = 0; i <= ballCount; i += 1) {
        const ballElement = document.createElement('div');
        const size = sizes[Math.round(Math.random() * (sizes.length - 1))];
        const color = colors[Math.round(Math.random() * (colors.length - 1))];
        ballElement.style.position = 'absolute';
        ballElement.style.width = size + 'px';
        ballElement.style.height = size + 'px';
        ballElement.style.borderRadius = size + 'px';
        ballElement.style.top = '0';
        ballElement.style.right = '0';
        ballElement.style.bottom = '0';
        ballElement.style.left = '0';
        ballElement.style.margin = 'auto';
        ballElement.style.backgroundColor = color;
        ballElement.style.transition = 'opacity 0.8s ease, transform 0.25s ease, top 0.9s cubic-bezier(0, 1, 0.1, 1), left 0.9s cubic-bezier(0, 1, 0.1, 1)';
        ballElement.style.transform = 'scale(0)';
        ballElement.style.opacity = '0';

        setTimeout(function () {
            ballElement.style.opacity = (Math.random() * 0.5 + 0.25) + '';
            ballElement.style.transform = 'scale(1)';
            ballElement.style.left = (Math.round(Math.random() * window.innerWidth) - window.innerWidth / 2) * 2 + 'px';
            ballElement.style.top = ((85 + Math.round(Math.random() * (window.innerHeight - 85))) - window.innerHeight / 2) * 2 + 'px';
        }, 100);

        ballElements.push(ballElement);

        ballContainerElement.appendChild(ballElement);
    }

    setTimeout(function () {
        document.body.addEventListener('mousemove', function (event) {
            const clientXPercent = event.clientX / window.innerWidth;
            const clientYPercent = event.clientY / window.innerHeight;
            const translateMargin = 500;
            const translateX = -clientXPercent * translateMargin + translateMargin / 2 + '%';
            const translateY = -clientYPercent * translateMargin + translateMargin / 2 + '%';
            ballElements.forEach(function (element) {
                element.style.transform = 'scale(1) translateX(' + translateX + ') translateY(' + translateY + ')';
            });
        });
    }, 500);

    mainElement.appendChild(ballContainerElement)
});
