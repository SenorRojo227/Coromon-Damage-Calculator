let coromon = getCoromon();
let skills = getSkills();
let traits = getTraits();
let items = getItems();

let chosenMons = [coromon[0], coromon[0]];
let chosenSkills = [skills[0], skills[0], skills[0], skills[0]];

window.onload = function() {
    initCoromon();
    initSkills();
    initTraits();
    initItems();

    resetSet(1);
    resetSet(2);
    calculate();
}

function initCoromon() {
    for (let i = 1; i <= 2; i++) {
        for (let j = 0; j < coromon.length; j++) {
            let optgroup = document.createElement("optgroup");
            optgroup.label = coromon[j].name;
            for (let k = 0; k < coromon[j].sets.length; k++) {
                let option = document.createElement("option");
                option.innerHTML = coromon[j].name + " (" + coromon[j].sets[k].setTitle + ")";
                optgroup.appendChild(option);
            }
            let blankOption = document.createElement("option");
            blankOption.innerHTML = coromon[j].name + " (Blank Set)";
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
            for (let j = 0; j < skills.length; j++) {
                let option = document.createElement("option");
                option.innerHTML = skills[j].name;
                document.getElementById("skillInput" + side + i).appendChild(option);
            }
        }
        side = "R";
        runTimes++;
    }
}

function initTraits() {
    for (let i = 1; i <= 2; i++) {
        for (let j = 0; j < traits.length; j++) {
            let option = document.createElement("option");
            option.innerHTML = traits[j];
            document.getElementById("trait" + i).appendChild(option);
        }
    }
}

function initItems() {
    for (let i = 1; i <= 2; i++) {
        for (let j = 0; j < items.length; j++) {
            let option = document.createElement("option");
            option.innerHTML = items[j];
            document.getElementById("item" + i).appendChild(option);
        }
    }
}

function resetSet(id) {

    //Coromon Search
    let selectedCoromon = document.querySelector("#name" + id + " option:checked").parentElement.label;
    let crmIndex = findCoromon(selectedCoromon);
    chosenMons[id - 1] = coromon[crmIndex];

    //Add Blank Set (Delete if-statement for V1.0.0)
    if (chosenMons[id - 1].sets.length == 0) {
        chosenMons[id - 1].sets.push(
            {
                setTitle: "Blank Set",
                level: 25,
                potential: [0, 0, 0, 0, 0, 0, 0],
                trait: "(none)",
                item: "(none)",
                skills: ["(No Skill)", "(No Skill)", "(No Skill)", "(No Skill)"]
            }
        );
    }

    //Skill Search
    let selectedSkills = [];
    let skillIndex = [];
    for (let i = 0; i < 4; i++) {
        selectedSkills[i] = chosenMons[id - 1].sets[0].skills[i];
        skillIndex[i] = findSkill(selectedSkills[i]);
        chosenSkills[i] = skills[skillIndex[i]];
    }

    //Reset Name
    document.getElementById("resultHeader" + id).innerHTML = coromon[crmIndex].name + "'s skills (Select one for more info)";
    
    //Reset Type
    document.getElementById("type" + id).value = coromon[crmIndex].type;

    //Reset Level
    document.getElementById("lvl" + id).value = 25;

    //Reset Stats
    document.getElementById("hp" + id).value = coromon[crmIndex].stats[0];
    document.getElementById("sp" + id).value = coromon[crmIndex].stats[1];
    document.getElementById("atk" + id).value = coromon[crmIndex].stats[2];
    document.getElementById("def" + id).value = coromon[crmIndex].stats[3];
    document.getElementById("spAtk" + id).value = coromon[crmIndex].stats[4];
    document.getElementById("spDef" + id).value = coromon[crmIndex].stats[5];
    document.getElementById("spe" + id).value = coromon[crmIndex].stats[6];

    //Reset Trait
    document.getElementById("trait" + id).value = coromon[crmIndex].sets[0].trait;
    if (document.getElementById("trait" + id).value == null) {
        document.getElementById("trait" + id).value == "(none)";
    }

    //Reset Item
    document.getElementById("item" + id).value = coromon[crmIndex].sets[0].item;
    if (document.getElementById("item" + id).value == null) {
        document.getElementById("item" + id).value == "(none)";
    }

    let side;
    if (id == 1) {
        side = "L";
    } else {
        side = "R";
    }

    /* Blank Set Bug
    let setIndex = Array.prototype.crmIndexOf.call(document.querySelector("#name" + id + " option:checked").parentElement,
    document.querySelector("#name" + id + " option:checked"));
    console.log(setIndex);
    */
   
    //Reset Potential
    for (let i = 1; i <= 7; i++) {
        document.getElementById("potInput" + side + i).value = chosenMons[id - 1].sets[0].potential[i - 1];
    }

    //Reset Skill Info
    for (let i = 1; i <= 4; i++) {
        document.getElementById("skillLabel" + side + i).innerHTML = chosenSkills[i - 1].name;
        document.getElementById("skillInput" + side + i).value = chosenSkills[i - 1].name;
        document.getElementById("skillDmg" + side + i).value = chosenSkills[i - 1].power;
        document.getElementById("skillType" + side + i).value = chosenSkills[i - 1].type;
        document.getElementById("skillDmgType" + side + i).value = chosenSkills[i - 1].atkType;
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
    chosenMons[id - 1].sets[0].type = document.getElementById("type" + id).value;

    //Update Level
    chosenMons[id - 1].sets[0].level = document.getElementById("lvl" + id).value;

    //Update Stats
    chosenMons[id - 1].stats[0] = document.getElementById("hp" + id).value;
    chosenMons[id - 1].stats[1] = document.getElementById("sp" + id).value;
    chosenMons[id - 1].stats[2] = document.getElementById("atk" + id).value;
    chosenMons[id - 1].stats[3] = document.getElementById("def" + id).value;
    chosenMons[id - 1].stats[4] = document.getElementById("spAtk" + id).value;
    chosenMons[id - 1].stats[5] = document.getElementById("spDef" + id).value;
    chosenMons[id - 1].stats[6] = document.getElementById("spe" + id).value;

    for (let i = 1; i <= 7; i++) {
        chosenMons[id - 1].sets[0].potential[i - 1] = parseInt(document.getElementById("potInput" + side + i).value);
        baseStat = chosenMons[id - 1].stats[i - 1];
        level = chosenMons[id - 1].sets[0].level;
        potential = chosenMons[id - 1].sets[0].potential[i - 1];

        if (i == 1) {
            document.getElementById("finalStat" + side + i).innerHTML = Math.floor(baseStat * level / 99) + 10
                + parseInt(level) + parseInt(potential);
        } else if (i == 2) {
            document.getElementById("finalStat" + side + i).innerHTML = Math.floor(0.3354 * level + 19.64);
        } else {
            document.getElementById("finalStat" + side + i).innerHTML = Math.floor(baseStat * level / 99) + 5
                + potential;
        }
    }

    //Update Skills
    for (let i = 1; i <= 4; i++) {
        chosenMons[id - 1].sets[0].skills[i - 1] = document.getElementById("skillInput" + side + i).value;
        document.getElementById("skillLabel" + side + i).innerHTML = chosenMons[id - 1].sets[0].skills[i - 1];
        chosenSkills[i - 1] = skills[findSkill(chosenMons[id - 1].sets[0].skills[i - 1])];
        document.getElementById("skillDmg" + side + i).innerHTML = chosenSkills[i - 1].power;
        document.getElementById("skillType" + side + i).innerHTML = chosenSkills[i - 1].type;
        document.getElementById("skillDmgType" + side + i).innerHTML = chosenSkills[i - 1].atkType;
    }

    //Update Trait
    chosenMons[id - 1].sets[0].trait = document.getElementById("trait" + id).value;

    //Update Item
    chosenMons[id - 1].sets[0].item = document.getElementById("item" + id).value;

    calculate();
}

function calculate() {
    let side = "L";     //Left vs Right Side
    for (let i = 1; i <= 4; i++) {
        let crmIndex = findSkill(document.getElementById("skillLabel" + side + i).innerHTML);
        let damage;

        if (side == "L") {
            damage = getDamage(chosenMons[0], chosenMons[1], skills[crmIndex]);
        } else {
            damage = getDamage(chosenMons[1], chosenMons[0], skills[crmIndex]);
        }

        document.getElementById("resultDamage" + side + i).innerHTML = damage[2] + "% - " + damage[3] + "%";

        
        if (document.getElementById("skillRadio" + side + i).checked) {
            if (side == "L") {
                document.getElementById("mainResult").innerHTML = getStatement(chosenMons[0], chosenMons[1], skills[crmIndex]);
            } else {
                document.getElementById("mainResult").innerHTML = getStatement(chosenMons[1], chosenMons[0], skills[crmIndex]);
            }
        }

        if (i == 4 && side == "L") {
            side = "R";
            i = 0;
        }
    }
}

function findCoromon(name) {
    for (let i = 0; i < coromon.length; i++) {
        if (name == coromon[i].name) {
            return i;
        }
    }
}

function findSkill(name) {
    for (let i = 0; i < skills.length; i++) {
        if (name == skills[i].name) {
            return i;
        }
    }
}