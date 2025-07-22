document.addEventListener('DOMContentLoaded', function () {
    const columnCount = 4;
    const arrowSize = 24;

    const fameListElement = document.querySelector('.fame-list');
    const detailInfoElements = fameListElement.querySelectorAll('.detail-info');

    for (let i = 0; i < fameListElement.children.length; i += 2) {
        const index = i / 2;
        const itemIndex = index + Math.floor(index / columnCount) * columnCount;
        const itemElement = fameListElement.children[itemIndex];
        const detailInfoIndex = itemIndex + 1;
        const detailInfoElement = fameListElement.children[detailInfoIndex];
        const lastItemIndexInColumn = (Math.floor(index / columnCount) + 1) * columnCount * 2;
        const lastItemElement = fameListElement.children[lastItemIndexInColumn];

        detailInfoElement.style.position = 'relative';
        const arrowElement = document.createElement('div');
        arrowElement.style.position = 'absolute';
        arrowElement.style.width = arrowSize + 'px';
        arrowElement.style.height = arrowSize + 'px';
        arrowElement.style.transform = 'rotate(45deg)';
        arrowElement.style.top = -arrowSize / 2 + 'px';
        const boundingClientRect = itemElement.getBoundingClientRect();
        arrowElement.style.left = boundingClientRect.left + boundingClientRect.width / 2 - arrowSize + 'px';
        arrowElement.style.backgroundColor = '#333333';

        detailInfoElement.appendChild(arrowElement);

        fameListElement.insertBefore(detailInfoElement, lastItemElement);

        itemElement.addEventListener('click', function () {
            const isActive = detailInfoElement.style.display === 'block';

            detailInfoElements.forEach(function (element) {
                element.style.display = 'none';
                element.style.transform = 'translateY(-100%)';
                element.classList.remove('active');
            });

            if (!isActive) {
                detailInfoElement.style.display = 'block';
            }

            const y = detailInfoElement.getBoundingClientRect().height;

            setTimeout(function () {
                detailInfoElement.classList.add('active');
                detailInfoElement.style.transform = 'translateY(0)';
            });
        });
    }
});
