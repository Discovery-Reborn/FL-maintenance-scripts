const { getSystemFiles, getSectionsFromIni } = require('../functions');
const fsAsync = require('fs').promises;
const { IniFile } = require('bini-lib');
const { Zone } = require('./SystemClasses');

const specials = {
    "gd_bh_grp": 18,
    "fc_h_grp": 18,
    "fc_corse_grp": 18,
    "fc_j_grp": 18,
    "gd_z_grp": 18,
    "fc_freelancer": 18
}

const specialKeys = Object.keys(specials);

async function updateFactionLevels() {
    const systemFiles = await getSystemFiles(['intro', 'iw09']);
    const factionProps = await getSectionsFromIni("../DATA/MISSIONS/faction_prop.ini", "FactionProps");
    console.log(factionProps);
    for (const file of systemFiles) {
        const fileContent = await fsAsync.readFile(file, "utf-8");
        if (fileContent) {
            const sysIni = IniFile.fromString(file, fileContent);
            const zones = sysIni.sections.filter(s => s.name === "zone");
            for (let zoneSection of zones) {
                const zone = new Zone(zoneSection);
                zone.encounters.forEach(enc => {
                    const factionNames = enc.factions.map(f => f.nickname);
                    const relFactionProps = factionProps.filter(f => factionNames.includes(f.affiliation));
                    for (const fp of relFactionProps) {
                        if (specialKeys.includes(fp.affiliation)) {
                            enc.level = specials[fp.affiliation];
                            break;
                        }
                        if (fp.legality === "lawful") {
                            enc.level = 17;
                            break;
                        }
                        if (fp.legality === "unlawful") {
                            enc.level = 19;
                            break;
                        }
                    }
                })
                zoneSection = zone.toSection();
            }
            const fileString = sysIni.toString();
            await fsAsync.writeFile("res_"+file, fileString);
        }
    }
}

updateFactionLevels();

