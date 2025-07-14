document.addEventListener('DOMContentLoaded', function () {
    new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        speed: 2000,
        autoplay: {
            delay: 20000,
        },
        slidesPerView: 2,
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
