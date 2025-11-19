function openPopup(options) {
    const popupWrapper = document.createElement('div');
    popupWrapper.classList.add('popup-wrapper');

    function handleClose() {
        popupWrapper.style.opacity = '0';
        setTimeout(function () {
            popupWrapper.remove();
        }, 200);
    }

    popupWrapper.addEventListener('click', handleClose);

    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup-container');
    popupContainer.addEventListener('click', function (event) {
        event.stopPropagation()
    });
    popupWrapper.appendChild(popupContainer);

    popupContainer.innerHTML = options.html

    const popupCloseButton = document.createElement('button');
    popupCloseButton.addEventListener('click', handleClose);
    popupCloseButton.classList.add('popup-close-button');
    popupContainer.appendChild(popupCloseButton);

    document.body.appendChild(popupWrapper);

    setTimeout(function () {
        popupWrapper.style.opacity = '1';
    });
}
