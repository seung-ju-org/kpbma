const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const CODE_MAP = {
    im: '이미지',
    vd: '영상',
    id: '산업',
    as: '협회',
    ad: '광고',
    pb: '출판물',
    wb: '사이버역사관',
    pp: '인물',
    rd: '연구개발',
    pd: '제품',
    sc: '사회공헌',
    ft: '행사',
    pz: '수상',
    ec: '기타',
}

const rootPath = path.join(__dirname, '..');
const xlsxPath = path.join(rootPath, 'data/digital-archive.xlsx');
const jsonPath = path.join(rootPath, 'data/digital-archive.json');

const workBook = xlsx.readFile(xlsxPath);

const json = xlsx.utils.sheet_to_json(workBook.Sheets.data);

const data = json.reduce((previousValue, currentValue) => {
    const key = `${currentValue['유형']}${currentValue['구분']}${currentValue['기록일시']}${currentValue['테마']}${currentValue['그룹넘버']}`;
    const previousData = previousValue.find(value => value.key === key);

    if (currentValue['파일키']) {
        const image = {
            url: currentValue['파일키'].startsWith('youtube:') ? currentValue['파일키'] : `https://lh3.google.com/u/0/d/${currentValue['파일키']}`,
            download: currentValue['파일키'].startsWith('youtube:') ? currentValue['파일키'] : `https://drive.google.com/file/d/${currentValue['pdf파일키'] ?? currentValue['파일키']}/view?usp=drive_link`
        }

        if (previousData) {
            previousData.images.push(image)
        } else {
            previousValue.push({
                key,
                type: CODE_MAP[currentValue['구분']],
                category: CODE_MAP[currentValue['유형']],
                subCategory: currentValue['세부카테고리'],
                date: `${currentValue['기록일시']}`,
                theme: CODE_MAP[currentValue['테마']],
                href: `/digital-archive/${key}`,
                thumbnail: image.url,
                title: currentValue['제목'],
                content: currentValue['내용'],
                images: [image],
                createdAt: currentValue['생성일']
            })
        }
    }

    return previousValue;
}, []);

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));

console.log('Done');
