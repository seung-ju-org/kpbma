document.addEventListener('DOMContentLoaded', function () {
    new Swiper('.swiper', {
        direction: 'horizontal',
        slidesPerView: 'auto',
    });

    const swiperWrapperElement = document.querySelector('.swiper-wrapper');

    const swiperWrapperImageElements = swiperWrapperElement.querySelectorAll('img');
    swiperWrapperImageElements.forEach(function (element) {
        element.addEventListener('click', function () {
            function handleClose() {
                popupWrapperElement.style.opacity = '0';
                setTimeout(function () {
                    popupWrapperElement.remove();
                }, 300);
            }

            const popupWrapperElement = document.createElement('div');

            popupWrapperElement.style.width = '100vw';
            popupWrapperElement.style.height = '100vh';
            popupWrapperElement.style.position = 'fixed';
            popupWrapperElement.style.top = '0px';
            popupWrapperElement.style.right = '0px';
            popupWrapperElement.style.bottom = '0px';
            popupWrapperElement.style.left = '0px';
            popupWrapperElement.style.backgroundColor = 'rgba(0, 0, 0, 0.25)';
            popupWrapperElement.style.zIndex = '1000';
            popupWrapperElement.style.display = 'flex';
            popupWrapperElement.style.alignItems = 'center';
            popupWrapperElement.style.justifyContent = 'center';
            popupWrapperElement.style.transition = 'opacity 0.3s ease-in-out';
            popupWrapperElement.style.opacity = '0';

            const popupImageContainerElement = document.createElement('div');
            popupImageContainerElement.style.width = '900px';
            popupImageContainerElement.style.height = '614px';
            popupImageContainerElement.style.boxShadow = '0px 0px 40px 0px rgba(0, 0, 0, 0.1)';
            popupImageContainerElement.style.backgroundColor = '#ffffff';
            popupImageContainerElement.style.borderRadius = '40px';
            popupImageContainerElement.style.position = 'relative';
            popupImageContainerElement.style.overflow = 'hidden';
            popupImageContainerElement.style.display = 'flex';
            popupImageContainerElement.style.flexDirection = 'column';
            popupImageContainerElement.style.justifyContent = 'space-between';

            popupImageContainerElement.addEventListener('click', function (event) {
                event.stopPropagation();
            });

            const popupImageElement = document.createElement('img');
            popupImageElement.src = element.src;
            popupImageElement.alt = element.alt;
            popupImageElement.style.display = 'block';
            popupImageElement.style.width = '100%';
            popupImageElement.style.height = '100%';
            popupImageElement.style.objectFit = 'cover';
            popupImageElement.style.position = 'absolute';
            popupImageElement.style.top = '0px';
            popupImageElement.style.right = '0px';
            popupImageElement.style.bottom = '0px';
            popupImageElement.style.left = '0px';
            popupImageElement.style.margin = 'auto';
            popupImageElement.style.pointerEvents = 'none';

            popupImageContainerElement.appendChild(popupImageElement);

            const popupHeaderElement = document.createElement('div');
            popupHeaderElement.style.padding = '30px';
            popupHeaderElement.style.position = 'relative';
            popupHeaderElement.style.display = 'flex';
            popupHeaderElement.style.justifyContent = 'flex-end';

            const popupCloseButtonElement = document.createElement('button');
            popupCloseButtonElement.style.display = 'block';
            popupCloseButtonElement.style.padding = '0';
            popupCloseButtonElement.style.cursor = 'pointer';
            popupCloseButtonElement.style.width = '62px';
            popupCloseButtonElement.style.height = '62px';
            popupCloseButtonElement.style.overflow = 'hidden';
            popupCloseButtonElement.style.border = '0';
            popupCloseButtonElement.style.backgroundColor = 'transparent';
            popupCloseButtonElement.style.borderRadius = '31px';
            popupCloseButtonElement.type = 'button';

            popupCloseButtonElement.addEventListener('click', handleClose);

            const popupCloseButtonImageElement = document.createElement('img');
            popupCloseButtonImageElement.src = '/assets/icons/popup_close.png';
            popupCloseButtonImageElement.alt = 'Close';
            popupCloseButtonImageElement.style.width = '100%';
            popupCloseButtonImageElement.style.height = '100%';
            popupCloseButtonImageElement.style.objectFit = 'cover';

            popupCloseButtonElement.appendChild(popupCloseButtonImageElement);

            popupHeaderElement.appendChild(popupCloseButtonElement);

            popupImageContainerElement.appendChild(popupHeaderElement);

            const popupFooterElement = document.createElement('div');
            popupFooterElement.style.padding = '30px';
            popupFooterElement.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 0) 30%, rgba(0, 0, 0, 1) 100%)';
            popupFooterElement.style.display = 'flex';
            popupFooterElement.style.justifyContent = 'space-between';
            popupFooterElement.style.position = 'relative';

            const popupTitleElement = document.createElement('p');
            popupTitleElement.innerText = element.alt;
            popupTitleElement.style.fontSize = '16px';
            popupTitleElement.style.color = '#ffffff';
            popupTitleElement.style.letterSpacing = '-0.3px';

            popupFooterElement.appendChild(popupTitleElement);

            const popupActionsContainerElement = document.createElement('div');
            popupActionsContainerElement.style.display = 'flex';
            popupActionsContainerElement.style.alignItems = 'center';
            popupActionsContainerElement.style.gap = '40px';

            const popupActions = [
                {
                    alt: 'Share',
                    src: '/assets/icons/share.png',
                    onClick() {

                    }
                },
                {
                    alt: 'Print',
                    src: '/assets/icons/print.png',
                    onClick() {

                    }
                },
                {
                    alt: 'Link',
                    src: '/assets/icons/link.png',
                    onClick() {

                    }
                },
                {
                    alt: 'Download',
                    src: '/assets/icons/download.png',
                    onClick() {

                    }
                }
            ];

            popupActions.forEach(function (popupAction) {
                const popupActionButtonElement = document.createElement('button');
                popupActionButtonElement.style.display = 'block';
                popupActionButtonElement.style.padding = '0';
                popupActionButtonElement.style.cursor = 'pointer';
                popupActionButtonElement.style.width = '24px';
                popupActionButtonElement.style.height = '24px';
                popupActionButtonElement.style.border = '0';
                popupActionButtonElement.style.backgroundColor = 'transparent';
                popupActionButtonElement.type = 'button';

                popupActionButtonElement.addEventListener('click', popupAction.onClick);

                const popupActionButtonImageElement = document.createElement('img');
                popupActionButtonImageElement.src = popupAction.src;
                popupActionButtonImageElement.alt = popupAction.alt;
                popupActionButtonImageElement.style.width = '100%';
                popupActionButtonImageElement.style.height = '100%';
                popupActionButtonImageElement.style.objectFit = 'contain';

                popupActionButtonElement.appendChild(popupActionButtonImageElement);

                popupActionsContainerElement.appendChild(popupActionButtonElement);
            });

            popupFooterElement.appendChild(popupActionsContainerElement);

            popupImageContainerElement.appendChild(popupFooterElement);

            popupWrapperElement.appendChild(popupImageContainerElement);

            popupWrapperElement.addEventListener('click', handleClose);

            document.body.appendChild(popupWrapperElement);

            setTimeout(function () {
                popupWrapperElement.style.opacity = '1';
            });
        });
    });
});
