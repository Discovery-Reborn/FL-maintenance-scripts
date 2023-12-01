const { Section, Entry } = require("bini-lib");

/*
interface Enncounter {
    type: string
    level: number
    chance: number
    factions: Faction[]
}

interface Faction {
    nickname: string
    density: number
}
*/

function applySectionValues(obj, entries) {
    for (const entry of entries) {
        let entryObj = {}
        // if (entry.values.length === 1) {
        //     entryObj[entry.name] = entry.values[0];
        // } else {
            entryObj[entry.name] = entry.values;
        // }
        Object.assign(obj, entryObj);
    }
}

class Zone {
    constructor(section) {
        if (section.name === "zone") {
            const nonEncounters = section.entries.filter(e => e.name !== "encounter" && e.name !== "faction");
            applySectionValues(this, nonEncounters);
            this.encounters = [];
            let currentEncounter = {};
            section.entries.forEach(entry => {
                if (entry.name === "encounter") {
                    if (currentEncounter !== {}) {
                        this.encounters.push(currentEncounter);
                    }
                    currentEncounter = {
                        type: entry.values[0],
                        level: entry.values[1],
                        chance: entry.values[2],
                        factions: []
                    }
                }
                if (entry.name === "faction") {
                    currentEncounter.factions.push([{
                        nickname: entry.values[0],
                        density: entry.values[1]
                    }]);
                }
            });
            if (currentEncounter !== {}) {
                this.encounters.push(currentEncounter);
            }
        }
    }

    toSection() {
        const section = new Section("zone");
        const entries = Object.entries(this);
        entries.forEach(([key, value]) => {
            if (key === "encounters") {
                value.forEach(encounter => {
                    section.entries.push(new Entry("encounter", [encounter.type, encounter.level, encounter.chance]));
                    encounter.factions.forEach(fac => {
                        section.entries.push(new Entry("faction", [fac.nickname, fac.density]));
                    });
                })
            } else {
                section.entries.push(new Entry(key, value));
            }
        });
        return section;
    }

    toString() {
        let str = "[zone]\n";
        const entries = Object.entries(this);
        entries.forEach(([key, value]) => {
            if (key === "encounters") {
                value.forEach(encounter => {
                    str += "encounter = " + encounter.type + ", " + encounter.level + ", " + encounter.chance + "\n";
                    encounter.factions.forEach(fac => {
                        str += "faction = " + fac.nickname + ", " + fac.density + "\n";
                    });
                })
            } else {
                str += key + " = " + value.join(", ") + "\n";
            }
        });
        return str;
    }
}

module.exports = {
    Zone
}