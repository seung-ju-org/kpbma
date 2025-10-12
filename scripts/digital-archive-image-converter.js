const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const extensions = ['tif']

const digitalArchiveFilesPath = path.join(__dirname, '../data/files')
const digitalArchiveFiles = fs.readdirSync(digitalArchiveFilesPath);

(async () => {
    await Promise.all(digitalArchiveFiles.map((digitalArchiveFile) => {
        const originPath = path.join(digitalArchiveFilesPath, digitalArchiveFile);
        const outputPath = `${originPath.replace(/\.[^/.]+$/, '')}.jpg`;
        if (extensions.some(extension => digitalArchiveFile.endsWith(extension))) {
            return sharp(originPath)
                .jpeg({quality: 100})
                .toFile(outputPath)
                .catch(err => {
                    console.error("변환 실패:", err);
                })
                .then(() => fs.promises.unlink(originPath));
        }
    }));
    console.log("Done");
})()

