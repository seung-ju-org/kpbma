window.addEventListener('load', function () {
    const wrapperElement = document.body.querySelector('#wrapper');
    const boardDetailElement = wrapperElement.querySelector('.board-detail');
    const boardDetailMainImgElement = boardDetailElement.querySelector('#board-detail-main-img');
    const boardDetailMainImgImgElement = boardDetailMainImgElement.querySelector('#board-detail-main-img img');
    const boardDetailMetaTitleElement = boardDetailElement.querySelector('.board-detail .meta-container .meta .title');
    const boardDetailMetaContainerElement = boardDetailElement.querySelector('.board-detail .meta-container');
    const boardDetailBreadcrumbItems = boardDetailElement.querySelectorAll('.board-detail .breadcrumb li a');
    const fixedAreaElement = document.querySelector('.top-fixed-area');

    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;

        if (scrollY > 0) {
            boardDetailMainImgElement.style.width = '100%';
            boardDetailMainImgElement.style.height = '100vh';
            boardDetailMainImgElement.style.top = '0';
            boardDetailMainImgImgElement.style.opacity = '0.45';
            boardDetailMetaContainerElement.style.paddingTop = '50rem';
            boardDetailMetaTitleElement.style.color = '#ffffff';
            boardDetailBreadcrumbItems.forEach(function (element) {
                element.style.color = '#ffffff';
            });
        } else {
            boardDetailMainImgElement.style.width = null;
            boardDetailMainImgElement.style.height = null;
            boardDetailMainImgElement.style.top = null;
            boardDetailMainImgImgElement.style.opacity = null;
            boardDetailMetaContainerElement.style.paddingTop = null;
            boardDetailMetaTitleElement.style.color = null;
            boardDetailBreadcrumbItems.forEach(function (element) {
                element.style.color = null;
            });
        }

        if (fixedAreaElement) {
            if (scrollY >= (window.innerHeight - 80)) {
                fixedAreaElement.classList.add('active');
            } else {
                fixedAreaElement.classList.remove('active');
            }
        }
    });
});
