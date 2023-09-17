const FILE_PATH = "../../DATA/EQUIPMENT/weapon_equip.ini";
const ratesMap = new Map([
    [0.12, 0.4],
    [0.15, 0.5],
    [0.17, 0.6],
    [0.2, 0.8],
    [0.25, 0.9],
    [0.33, 1.0],
    [0.5, 1.2],
    [0.665, 1.3]
])

const refireDelayPrefix = "refire_delay = ";
const dispersationPrefix = "dispersion_angle = ";

const fs = require('fs');

const allFileContents = fs.readFileSync(FILE_PATH, 'utf-8');
const fileLines = allFileContents.split(/\r?\n/);
let removeNext = false;

for (let i = 0; i < fileLines.length; i++) {
    const line = fileLines[i];
    if (line.startsWith(refireDelayPrefix)) {
        const refireDelay = parseFloat(line.replace(refireDelayPrefix, ""));
        if (ratesMap.has(refireDelay)) {
            const dispersation = ratesMap.get(refireDelay);
            fileLines.splice(i, 0, dispersationPrefix + dispersation);
            removeNext = true;
            i++;
        }
    }
    if (line.startsWith(dispersationPrefix) && removeNext) {
        fileLines.splice(i, 1);
        removeNext = false;
        i--;
    }
}

fs.writeFileSync(FILE_PATH, fileLines.join("\n"));