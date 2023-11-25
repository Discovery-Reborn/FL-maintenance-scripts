function applySectionValues(obj, entries) {
    for (const entry of entries) {
        let entryObj = {}
        if (entry.values.length === 1) {
            entryObj[entry.name] = entry.values[0];
        } else {
            entryObj[entry.name] = entry.values;
        }
        Object.assign(obj, entryObj);
    }
}

class Zone {
    constructor(section) {
        if (section.name === "zone") {
            const nonEncounters = section.entries.filter(e => e.name !== "encounter" && e.name !== "faction");
            applySectionValues(this, nonEncounters);
            // TODO add encounters
        }
    }
}

class Encounter {

}