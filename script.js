import coromonJSON from "./src/coromon.json" assert {type: 'json'};
import skillsJSON from "./src/skills.json" assert {type: 'json'};
import traitsJSON from "./src/traits.json" assert {type: 'json'};
import itemsJSON from "./src/items.json" assert {type: 'json'};
import setsJSON from "./src/sets.json" assert {type: 'json'};

const coromon = coromonJSON.S1;
const skills = skillsJSON.S1;
const traits = traitsJSON.S1;
const items = itemsJSON.S1["Held Items"];

let coromonList = Object.keys(coromon);
let skillList = Object.keys(skills);

let chosenMons = [Object.assign({}, coromon.Cubzero.statBoost = [0, 0, 0, 0, 0]), Object.assign({}, coromon.Cubzero.statBoost = [0, 0, 0, 0, 0])];
let chosenSkills = [[Object.assign({}, skills["(No Skill)"].crit = false), Object.assign({}, skills["(No Skill)"].crit = false), Object.assign({}, skills["(No Skill)"].crit = false), Object.assign({}, skills["(No Skill)"].crit = false)],
                    [Object.assign({}, skills["(No Skill)"].crit = false), Object.assign({}, skills["(No Skill)"].crit = false), Object.assign({}, skills["(No Skill)"].crit = false), Object.assign({}, skills["(No Skill)"].crit = false)]];

window.onload = function() {
    initCoromon();
    initSkills();
    initTraits();
    initItems();

    resetSet(1);
    resetSet(2);
}

function initCoromon() {
    for (let i = 1; i <= 2; i++) {
        for (let j = 0; j < coromonList.length; j++) {
            let optgroup = document.createElement("optgroup");
            optgroup.label = coromonList[j];
            /*
            for (let k = 0; k < coromon[j].sets.length; k++) {
                let option = document.createElement("option");
                option.innerHTML = coromon[j].name + " (" + coromon[j].sets[k].setTitle + ")";
                optgroup.appendChild(option);
            }*/
            let blankOption = document.createElement("option");
            blankOption.innerHTML = coromonList[j] + " (Blank Set)";
            optgroup.appendChild(blankOption);

            document.getElementById("name" + i).appendChild(optgroup);
        }
    }
}

function initSkills() {
    let side = "L";
    let runTimes = 0;
    while (runTimes < 2) {
        for (let i = 1; i <= 4; i++) {
            for (let j = 0; j < skillList.length; j++) {
                let option = document.createElement("option");
                option.innerHTML = skillList[j];
                document.getElementById("skillInput" + side + i).appendChild(option);
            }
        }
        side = "R";
        runTimes++;
    }
}

function initTraits() {
    for (let i = 1; i <= 2; i++) {
        for (let j = 0; j < Object.keys(traits).length; j++) {
            let option = document.createElement("option");
            option.innerHTML = Object.keys(traits)[j];
            document.getElementById("trait" + i).appendChild(option);
        }
    }
}

function initItems() {
    for (let i = 1; i <= 2; i++) {
        for (let j = 0; j < Object.keys(items).length; j++) {
            let option = document.createElement("option");
            option.innerHTML = Object.keys(items)[j];
            document.getElementById("item" + i).appendChild(option);
        }
    }
}

function resetSet(id) {

    //Reset Lists
    //coromon = coromonJSON.S1;
    //skills = skillsJSON.S1;

    //Coromon Search
    let selectedCoromon = document.querySelector("#name" + id + " option:checked").parentElement.label;
    chosenMons[id - 1] = Object.assign({}, coromon[selectedCoromon]);
    chosenMons[id - 1].name = selectedCoromon;
    chosenMons[id - 1].statBoost = [0, 0, 0, 0, 0];
    chosenMons[id - 1].sets = [];

    chosenMons[id - 1].sets.push(
        {
            setTitle: "Blank Set",
            level: 50,
            potential: [0, 0, 0, 0, 0, 0, 0],
            trait: "(No Trait)",
            item: "(No Item)",
            skills: ["(No Skill)", "(No Skill)", "(No Skill)", "(No Skill)"]
        }
    );

    //Skill Search
    for (let i = 0; i < 4; i++) {
        chosenSkills[id - 1][i] = Object.assign({}, skills[chosenMons[id - 1].sets[0].skills[i]]);
        chosenSkills[id - 1][i].name = chosenMons[id - 1].sets[0].skills[i];
    }

    //Reset Name
    document.getElementById("resultHeader" + id).innerHTML = selectedCoromon + "'s skills (Select one for more info)";
    
    //Reset Type
    document.getElementById("type" + id).value = coromon[selectedCoromon].Type;

    //Reset Level
    document.getElementById("lvl" + id).value = 50;

    //Reset Stats
    document.getElementById("hp" + id).value = coromon[selectedCoromon].Stats["HP"];
    document.getElementById("sp" + id).value = coromon[selectedCoromon].Stats["SP"];
    document.getElementById("atk" + id).value = coromon[selectedCoromon].Stats["Atk"];
    document.getElementById("def" + id).value = coromon[selectedCoromon].Stats["Def"];
    document.getElementById("spAtk" + id).value = coromon[selectedCoromon].Stats["Sp.A"];
    document.getElementById("spDef" + id).value = coromon[selectedCoromon].Stats["Sp.D"];
    document.getElementById("spe" + id).value = coromon[selectedCoromon].Stats["Spe"];

    //Reset Trait
    document.getElementById("trait" + id).value = "(No Trait)";       //!!!Fix
    if (document.getElementById("trait" + id).value == null) {
        document.getElementById("trait" + id).value == "(No Trait)";
    }

    //Reset Item
    document.getElementById("item" + id).value = "(No Item)";           //!!!Fix
    if (document.getElementById("item" + id).value == null) {
        document.getElementById("item" + id).value == "(No Item)";
    }

    let side;
    if (id == 1) {
        side = "L";
    } else {
        side = "R";
    }

    //Blank Set Bug
    //let setIndex = Array.prototype.selectedCoromonOf.call(document.querySelector("#name" + id + " option:checked").parentElement,
    //document.querySelector("#name" + id + " option:checked"));
    //console.log(setIndex);
    
   
    //Reset Potential
    for (let i = 1; i <= 7; i++) {
        document.getElementById("potInput" + side + i).value = chosenMons[id - 1].sets[0].potential[i - 1];
    }

    //Reset Stat boost
    for (let i = 1; i <= 5; i++) {
        document.getElementById("statBoost" + side + i).value = chosenMons[id - 1].statBoost[i - 1];
    }

    //Reset Skill Info
    for (let i = 1; i <= 4; i++) {
        document.getElementById("skillLabel" + side + i).innerHTML = chosenMons[id - 1].sets[0].skills[i - 1];
        document.getElementById("skillInput" + side + i).value = chosenMons[id - 1].sets[0].skills[i - 1];
        document.getElementById("skillDmg" + side + i).value = chosenSkills[id - 1][i - 1].Power;
        document.getElementById("skillType" + side + i).value = chosenSkills[id - 1][i - 1].Type;
        document.getElementById("skillDmgType" + side + i).value = chosenSkills[id - 1][i - 1].Category;
    }

    //Reset Crit
    for (let i = 1; i <= 4; i++) {
        document.getElementById("crit" + side + i).checked = false;
    }

    updateSet(id);

}

function updateSet(id) {

    let side;
    if (id == 1) {
        side = "L";
    } else {
        side = "R";
    }

    //Update Type
    chosenMons[id - 1].Type = document.getElementById("type" + id).value;

    //Update Level
    chosenMons[id - 1].sets[0].level = document.getElementById("lvl" + id).value;

    //Update Stats
    chosenMons[id - 1].Stats["HP"] = document.getElementById("hp" + id).value;
    chosenMons[id - 1].Stats["SP"] = document.getElementById("sp" + id).value;
    chosenMons[id - 1].Stats["Atk"] = document.getElementById("atk" + id).value;
    chosenMons[id - 1].Stats["Def"] = document.getElementById("def" + id).value;
    chosenMons[id - 1].Stats["Sp.A"] = document.getElementById("spAtk" + id).value;
    chosenMons[id - 1].Stats["Sp.D"] = document.getElementById("spDef" + id).value;
    chosenMons[id - 1].Stats["Spe"] = document.getElementById("spe" + id).value;
    for (let i = 1; i <= 5; i++) {
        chosenMons[id - 1].statBoost[i - 1] = parseInt(document.getElementById("statBoost" + side + i).value);
    }

    for (let i = 1; i <= 7; i++) {
        chosenMons[id - 1].sets[0].potential[i - 1] = parseInt(document.getElementById("potInput" + side + i).value);
        let baseStat = chosenMons[id - 1].Stats[Object.keys(chosenMons[id - 1].Stats)[i - 1]];
        let level = chosenMons[id - 1].sets[0].level;
        let potential = chosenMons[id - 1].sets[0].potential[i - 1];
        let boost;
        if (i >= 3) {
            boost = chosenMons[id - 1].statBoost[i - 3];
            if (boost > 0) {
                boost = 1 + boost * 0.5;
            } else if (boost < 0) {
                switch(boost) {
                case -1:
                    boost = 0.66;
                    break;
                case -2:
                    boost = 0.5;
                    break;
                case -3:
                    boost = 0.4;
                    break;
                case -4:
                    boost = 0.33;
                    break;
                case -5:
                    boost = 0.28;
                    break;
                case -6:
                    boost = 0.25;
                    break;
                }
            } else {
                boost = 1;
            }
        }

        if (i == 1) {
            document.getElementById("finalStat" + side + i).innerHTML = Math.floor(baseStat * level / 99) + 10
                + parseInt(level) + parseInt(potential);
        } else if (i == 2) {
            document.getElementById("finalStat" + side + i).innerHTML = Math.floor(baseStat * level / 99) + 20
                + potential;
        } else {
            document.getElementById("finalStat" + side + i).innerHTML = Math.floor((Math.floor(baseStat * level / 99) + 5
                + potential) * boost);
        }
    }

    //Update Skills
    for (let i = 1; i <= 4; i++) {
        if (chosenMons[id - 1].sets[0].skills[i - 1] != document.getElementById("skillInput" + side + i).value) {
            chosenMons[id - 1].sets[0].skills[i - 1] = document.getElementById("skillInput" + side + i).value;
            document.getElementById("skillLabel" + side + i).innerHTML = chosenMons[id - 1].sets[0].skills[i - 1];
            chosenSkills[id - 1][i - 1] = skills[chosenMons[id - 1].sets[0].skills[i - 1]];
            document.getElementById("skillDmg" + side + i).value = chosenSkills[id - 1][i - 1].Power;
            document.getElementById("skillType" + side + i).value = chosenSkills[id - 1][i - 1].Type;
            document.getElementById("skillDmgType" + side + i).value = chosenSkills[id - 1][i - 1].Category;
            chosenSkills[id - 1][i - 1].crit = false;
            document.getElementById("critLabel" + side + i).classList.remove("checked");
        } else {
            chosenSkills[id - 1][i - 1] = skills[chosenMons[id - 1].sets[0].skills[i - 1]];
            chosenSkills[id - 1][i - 1].Power = document.getElementById("skillDmg" + side + i).value;
            chosenSkills[id - 1][i - 1].Type = document.getElementById("skillType" + side + i).value;
            chosenSkills[id - 1][i - 1].Category = document.getElementById("skillDmgType" + side + i).value;
        }
        chosenSkills[id - 1][i - 1].name = document.getElementById("skillInput" + side + i).value;
    }

    //Update Trait
    chosenMons[id - 1].sets[0].trait = document.getElementById("trait" + id).value;

    //Update Item
    chosenMons[id - 1].sets[0].item = document.getElementById("item" + id).value;

    //Update Crit
    for (let i = 1; i <= 4; i++) {
        if (document.getElementById("crit" + side + i).checked) {
            chosenSkills[id - 1][i - 1].crit = true;
            document.getElementById("critLabel" + side + i).classList.add("checked");
        } else {
            chosenSkills[id - 1][i - 1].crit = false;
            document.getElementById("critLabel" + side + i).classList.remove("checked");
        }
    }

    calculate();
}

function calculate() {
    let side = "L";     //Left vs Right Side
    for (let i = 1; i <= 4; i++) {
        let damage;

        if (side == "L") {
            damage = getDamage(chosenMons[0], chosenMons[1], chosenSkills[0][i - 1]);
        } else {
            damage = getDamage(chosenMons[1], chosenMons[0], chosenSkills[1][i - 1]);
        }

        document.getElementById("resultDamage" + side + i).innerHTML = damage[2] + "% - " + damage[3] + "%";

        
        if (document.getElementById("skillRadio" + side + i).checked) {
            if (side == "L") {
                document.getElementById("mainResult").innerHTML = getStatement(chosenMons[0], chosenMons[1], chosenSkills[0][i - 1]);
            } else {
                document.getElementById("mainResult").innerHTML = getStatement(chosenMons[1], chosenMons[0], chosenSkills[1][i - 1]);
            }
        }

        if (i == 4 && side == "L") {
            side = "R";
            i = 0;
        }
    }
}

window.resetSet = resetSet;
window.updateSet = updateSet;
window.calculate = calculate;