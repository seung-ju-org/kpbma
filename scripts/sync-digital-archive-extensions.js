const path = require('path');
const fs = require('fs');

const digitalArchiveFiles = fs.readdirSync(path.join(__dirname, '../data/files'));

const jsonPath = path.join(__dirname, '../data/digital-archive.json');
const digitalArchives = JSON.parse(fs.readFileSync(jsonPath), 'utf8');

const newDigitalArchives = digitalArchives.map((digitalArchive) => {
    function getRealFilename(path) {
        if (path.startsWith("youtube:")) {
            return path;
        }
        const paths = path.replace(/\.[^/.]+$/, '').split('/')
        const filename = paths.at(-1)
        const realFilename = digitalArchiveFiles.find(digitalArchiveFile => {
            return digitalArchiveFile.startsWith(filename)
        })

        return [...paths.slice(0, -1), realFilename].join('/')
    }

    return {
        ...digitalArchive,
        thumbnail: getRealFilename(digitalArchive.thumbnail),
        images: digitalArchive.images.map(image =>
            getRealFilename(image)
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
