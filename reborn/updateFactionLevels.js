const { getSystemFiles, getSectionsFromIni } = require('../functions');
const fsAsync = require('fs').promises;
const { IniFile } = require('bini-lib');

async function updateFactionLevels() {
    const systemFiles = await getSystemFiles(['intro', 'iw09']);
    const factionProps = await getSectionsFromIni("../DATA/MISSIONS/faction_prop.ini", "FactionProps");
    console.log(factionProps);
    for (const file of systemFiles) {
        const fileContent = await fsAsync.readFile(file, "utf-8");
        if (fileContent) {
            const sysIni = IniFile.fromString(file, fileContent);
            const zones = sysIni.sections.filter(s => s.name === "zone");
            
        }
    }
}

updateFactionLevels();

