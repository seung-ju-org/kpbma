const path = require('path');
const fs = require('fs');

const jsonPath = path.join(__dirname, '../data/digital-archive.json');
const digitalArchives = JSON.parse(fs.readFileSync(jsonPath), 'utf8');

const newDigitalArchives = digitalArchives.map((digitalArchive) => {
    return {
        ...digitalArchive,
        images: digitalArchive.images.map(image => {
                const driveId = image.startsWith('https://') ? image.split('/').at(-1) : null
                return {
                    url: image,
                    download: driveId ? `https://drive.google.com/file/d/${driveId}/view?usp=drive_link` : image
                }
            }
        )
    }
});

fs.writeFile(jsonPath, JSON.stringify(newDigitalArchives, null, 2), (error) => {
    if (error) {
        console.error(error)
    } else {
        console.log("Done");
    }
});
