const classMap = {
    // from: to
    "hp_gun_special_1": "hp_gun_special_9",
    "hp_gun_special_2": "hp_gun_special_7",
    "hp_gun_special_3": "hp_gun_special_10",
    "hp_gun_special_4": "hp_gun_special_8",
    "hp_gun_special_5": "hp_gun_special_9", // Transport Turret (Heavy) not mentioned in new mapping
    "hp_gun_special_6": "hp_gun_special_1",
    "hp_gun_special_7": "hp_gun_special_9",
    "hp_gun_special_8": "hp_gun_special_3",
    "hp_gun_special_9": "hp_gun_special_6",
    "hp_gun_special_10": "hp_gun_special_10",
    // Missing: Long Range CD for LF only, HF/VHF CDs, Special Guns (i.e missiles, maxim gun, etc)
}

const fs = require("fs");

const FILE_PATH = "../DATA/SHIPS/shiparch.ini";
let shiparchText = fs.readFileSync(FILE_PATH, { encoding: "utf-8" });
const classMapEntries = Object.entries(classMap);
classMapEntries.forEach(([from, to]) => {
    shiparchText = shiparchText.replaceAll(from, to);
});
fs.writeFileSync(FILE_PATH, shiparchText);