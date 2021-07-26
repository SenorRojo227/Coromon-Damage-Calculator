let coromon = getCoromon();
let skills = getSkills();

let chosenMons = [coromon[1], coromon[1]];;

function init() {

}

function resetSet(id) {
    let index = findCoromon(document.getElementById("name" + id).value);
    chosenMons[id - 1] = coromon[index];

    document.getElementById("type" + id).innerHTML = coromon[index].type;
    document.getElementById("pot" + id).innerHTML = 21;
    document.getElementById("lvl" + id).innerHTML = 25;
    document.getElementById("hp" + id).value = coromon[index].stats[0];
    document.getElementById("sp" + id).value = coromon[index].stats[1];
    document.getElementById("atk" + id).value = coromon[index].stats[2];
    document.getElementById("def" + id).value = coromon[index].stats[3];
    document.getElementById("spAtk" + id).value = coromon[index].stats[4];
    document.getElementById("spDef" + id).value = coromon[index].stats[5];
    document.getElementById("spe" + id).value = coromon[index].stats[6];

    updateSet(id);
}

function updateSet(id) {

    let side;
    if (id == 1) {
        side = "L";
    } else {
        side = "R";
    }

    for (let i = 1; i <= 7; i++) {
        chosenMons[id - 1].sets[0].potential[i - 1] = parseInt(document.getElementById("potInput" + side + i).value);
        baseStat = chosenMons[id - 1].stats[i - 1];
        level = chosenMons[id - 1].sets[0].level;
        potential = chosenMons[id - 1].sets[0].potential[i - 1];

        document.getElementById("finalStat" + side + i).innerHTML = Math.round((baseStat / 100) * (level - 1) + 6)
            + potential;
    }
    calculate();
}

function calculate() {
    let side = "L";     //Left vs Right Side
    for (let i = 1; i <= 4; i++) {
        console.log(findSkill(document.getElementById("skillLabel" + side + i).innerHTML));
        console.log(document.getElementById("skillLabel" + side + i).innerHTML);
        let index = findSkill(document.getElementById("skillLabel" + side + i).innerHTML);
        let damage = getDamage(chosenMons[0], chosenMons[1], skills[index]);
        document.getElementById("resultDamage" + side + i).innerHTML = damage[0] + "% - " + damage[1] + "%";

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