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
            boardDetailMainImgElement.classList.add("active");
            boardDetailMainImgImgElement.classList.add("active");
            boardDetailMetaContainerElement.classList.add("active");
            boardDetailMetaTitleElement.classList.add("active");
            boardDetailBreadcrumbItems.forEach(function (element) {
                element.classList.add("active");
            });
        } else {
            boardDetailMainImgElement.classList.remove("active");
            boardDetailMainImgImgElement.classList.remove("active");
            boardDetailMetaContainerElement.classList.remove("active");
            boardDetailMetaTitleElement.classList.remove("active");
            boardDetailBreadcrumbItems.forEach(function (element) {
                element.classList.remove("active");
            });
        }

        if (fixedAreaElement) {
            if (scrollY >= (window.innerHeight - 80)) {
                fixedAreaElement.style.top = '80px';
            } else {
                fixedAreaElement.style.top = '0px';
            }
        }
    });
});
