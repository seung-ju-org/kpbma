document.addEventListener('DOMContentLoaded', function () {
    fetch('/data/digital-archive.json')
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            function init() {
                const minYear = 1920;

                function toByYear(str) {
                    const date = new Date(str);
                    return Math.max(minYear, Math.floor(date.getFullYear() / 10) * 10);
                }

                const urlSearchParams = new URLSearchParams(window.location.search);
                const query = urlSearchParams.get('q');
                const type = urlSearchParams.get('type');
                const category = urlSearchParams.get('category');
                let date = urlSearchParams.get('date');
                if (date) {
                    date = Number(urlSearchParams.get('date').replace(/[^0-9]/g, ''));
                }
                const theme = urlSearchParams.get('theme');

                const filteredData = data.filter(function (value) {
                    if (query && !value.title.toLowerCase().includes(query.toLowerCase())) return false;

                    if (type && value.type !== type) return false;

                    if (category && value.category !== category) return false;

                    if (date && date !== toByYear(value.date)) return false;

                    if (theme && value.theme !== theme) return false;

                    return true;
                });

                const totalCountElement = document.querySelector('#total-count')
                totalCountElement.innerText = filteredData.length + '';

                const dataCounts = data.reduce(function (previousValue, currentValue) {
                    Object.keys(previousValue).forEach(function (key) {
                        const name = key === 'date' ? toByYear(currentValue[key]) : currentValue[key];

                        if (name) {
                            if (!previousValue[key][name]) {
                                previousValue[key][name] = 0;
                            }

                            if ((!query || (currentValue.title.toLowerCase().includes(query.toLowerCase())))
                                && (!type || (currentValue.type === type))
                                && (!category || (category === currentValue.category))
                                && (!date || (date === toByYear(currentValue.date)))
                                && (!theme || (theme === currentValue.theme))) {
                                previousValue[key][name] += 1;
                            }
                        }
                    });

                    return previousValue;
                }, {
                    type: {
                        "산업": 0,
                        "협회": 0,
                    },
                    category: {
                        "사료": 0,
                        "사진": 0,
                        "광고": 0,
                        "문헌": 0,
                    },
                    date: {
                        1920: 0,
                        1930: 0,
                        1940: 0,
                        1950: 0,
                        1960: 0,
                        1970: 0,
                        1980: 0,
                        1990: 0,
                        2000: 0,
                        2010: 0,
                        2020: 0,
                    },
                    theme: {
                        "한국제약바이오산업의 유산": 0,
                        "혁신의 발자국": 0,
                        "사회공헌": 0,
                        "영광의 순간": 0,
                        "스타와 함께": 0,
                        "스포츠와 함께": 0,
                        "사이버역사관": 0,
                    },
                });

                const searchFormElement = document.search;

                searchFormElement.q.value = query || '';

                searchFormElement.addEventListener('submit', function (event) {
                    event.preventDefault();

                    const url = new URL(window.location.href);
                    url.searchParams.set('q', event.target.q.value);

                    window.history.replaceState({}, "", url.toString());

                    init();
                })


                const filterElement = document.querySelector('#filter');

                for (const child of filterElement.children) {
                    const childContentsElement = child.querySelector('.contents');

                    childContentsElement.innerHTML = '';

                    function handleSetFilter(key) {
                        Object.entries(dataCounts[key]).forEach(function (value) {
                            let name = value[0];
                            const count = value[1];

                            if (key === 'date') {
                                if (Number(name) <= minYear) {
                                    name += '대이전'
                                } else {
                                    name += '대'
                                }
                            }

                            const filterButtonElement = document.createElement('a');

                            const url = new URL(window.location.href);

                            if (url.searchParams.get(key) === name) {
                                filterButtonElement.classList.add('active');
                                url.searchParams.set(key, '');
                            } else {
                                url.searchParams.set(key, name);
                            }


                            const urlString = url.toString();

                            filterButtonElement.href = urlString;

                            filterButtonElement.addEventListener('click', function (event) {
                                event.preventDefault();

                                window.history.replaceState({}, "", urlString);

                                init();
                            });


                            const nameElement = document.createElement('b');
                            const countElement = document.createElement('span');

                            nameElement.innerText = name;
                            countElement.innerText = count + '';

                            filterButtonElement.appendChild(nameElement);
                            filterButtonElement.appendChild(countElement);
                            childContentsElement.appendChild(filterButtonElement);
                        });
                    }

                    switch (child.dataset.type) {
                        case 'type':
                            handleSetFilter('type');
                            break;
                        case 'category':
                            handleSetFilter('category');
                            break;
                        case 'date':
                            handleSetFilter('date');
                            break;
                        case 'theme':
                            handleSetFilter('theme');
                            break;
                    }
                }

                const archiveListElement = document.querySelector('.archive-list');

                archiveListElement.innerHTML = '';

                if (filteredData.length > 0) {
                    filteredData.forEach(function (value, index) {
                        const itemElement = document.createElement('a');
                        if (value.href) {
                            itemElement.href = value.href;
                        }
                        itemElement.classList.add('item');

                        const itemThumbElement = document.createElement('div');
                        itemThumbElement.classList.add('thumb');

                        const itemThumbImgElement = document.createElement('img');
                        itemThumbImgElement.src = value.thumbnail;

                        itemThumbElement.appendChild(itemThumbImgElement);

                        itemElement.appendChild(itemThumbElement);

                        const itemTitleElement = document.createElement('p');
                        itemTitleElement.innerText = value.title;

                        itemElement.appendChild(itemTitleElement);

                        archiveListElement.appendChild(itemElement);
                    });
                } else {
                    const emptyElement = document.createElement('div');
                    emptyElement.classList.add('empty');

                    emptyElement.innerText = '데이터가 존재하지 않습니다';

                    archiveListElement.appendChild(emptyElement);
                }
            }

            init();
        });
});
