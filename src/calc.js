function getDamage(atkMon, defMon, selectedSkill, weather = "none") {
    
    //Calculation Variables
    let A = 1;
    let D = 1;
    let defHP = 1;
    let stab = 1;
    let effectiveness = 1;
    let trait1 = 1;
    let trait2 = 1;
    let crit = 1;
    let feelers = 1;
    let boosts1 = 1;
    let boosts2 = 1;
    let weatherBonus = 1;

    //Check Inputs
    if (false) {        //Fix
      crit = 1.5;
    } else {
      crit = 1;
    }
    
    if (false) {        //Fix
      feelers = 2.5;
    } else {
      feelers = 1;
    }

    if (selectedSkill.atkType == "Physical") {
        A = Math.round((atkMon.stats[2] / 100) * (atkMon.sets[0].level - 1) + 6) + atkMon.sets[0].potential[2];
        D = Math.round((defMon.stats[3] / 100) * (defMon.sets[0].level - 1) + 6) + defMon.sets[0].potential[3];
    } else if (selectedSkill.atkType == "Special") {
        A = Math.round((atkMon.stats[4] / 100) * (atkMon.sets[0].level - 1) + 6) + atkMon.sets[0].potential[4];
        D = Math.round((defMon.stats[5] / 100) * (defMon.sets[0].level - 1) + 6) + defMon.sets[0].potential[5];
    } else {
        return [0, 0, 0, 0]
    }

    defHP = Math.round((1 + atkMon.stats[2] / 100) * (atkMon.sets[0].level - 1) + 6) + atkMon.sets[0].potential[2];
    
    if (atkMon.type == selectedSkill.type) {
      stab = 1.25;
    } else {
      stab = 1;
    }
    
    effectiveness = getEffectiveness(selectedSkill.type, defMon.type);
    
    if (atkMon.sets[0].ability == "Clumsy Power") {
      trait1 = 1.25;
    } else if (atkMon.sets[0].ability == "Amplified" && effectiveness == 2) {
      trait1 = 1.25;
    } else {
      trait1 = 1;
    }

    if (-1 > 0) {                   //Fix
      boosts1 = 1 + boosts1 * 0.5;
    } else if (1 < 0) {             //Fix
      switch(boosts1) {
        case -1:
          boosts1 = 0.66;
          break;
        case -2:
          boosts1 = 0.5;
          break;
        case -3:
          boosts1 = 0.4;
          break;
        case -4:
          boosts1 = 0.33;
          break;
        case -5:
          boosts1 = 0.28;
          break;
        case -6:
          boosts1 = 0.25;
          break;
      }
    }

    if (-1 > 0) {                   //Fix
      boosts2 = 1 + boosts2 * 0.5;
    } else if (1 < 0) {             //Fix
      switch(boosts2) {
        case -1:
          boosts2 = 0.66;
          break;
        case -2:
          boosts2 = 0.5;
          break;
        case -3:
          boosts2 = 0.4;
          break;
        case -4:
          boosts2 = 0.33;
          break;
        case -5:
          boosts2 = 0.28;
          break;
        case -6:
          boosts2 = 0.25;
          break;
      }
    }

    //Check Weather
    if (weather == "Rain" && selectedSkill.type == "Water") {
        weatherBonus = 1.5;
    }
    if (weather == "Sandstorm" && selectedSkill.type == "Sand") {
        weatherBonus = 1.5;
    }
    if (weather == "Snow" && selectedSkill.type == "Ice") {
        weatherBonus = 1.5;
    }

    //Damage Calculation
    if (selectedSkill.name == "Splash") {
        var multipliers = stab * effectiveness * weatherBonus;
        var lowDamage = defMon.sets[0].level * multipliers;
        var highDamage = lowDamage;
        var highPerc = lowPerc;
    } else {
        var multipliers = stab * trait1 * trait2 * weatherBonus * crit * feelers * effectiveness * boosts1 / boosts2;
        var lowDamage = Math.floor( ((((((2*atkMon.sets[0].level)/5) + 2) * selectedSkill.power * A / D) / 50) + 2) * multipliers * 0.85 );
        var highDamage = Math.floor( ((((((2*atkMon.sets[0].level)/5) + 2) * selectedSkill.power * A / D) / 50) + 2) * multipliers );
    }
    var lowPerc = Math.round((lowDamage / defHP) * 100);
    var highPerc = Math.round((highDamage / defHP) * 100);

    return [lowDamage, highDamage, lowPerc, highPerc];

}

function getStatement(atkMon, defMon, selectedSkill) {
    let statement = "";
    if (selectedSkill.atkType == "Physical") {
        statement += atkMon.sets[0].potential[3] + " Atk ";
    } else if (selectedSkill.atkType == "Special") {
        statement += atkMon.sets[0].potential[5] + " SpA ";
    }

    statement += atkMon.name + " " + selectedSkill.name + " vs. ";

    if (selectedSkill.atkType == "Physical") {
        statement += defMon.sets[0].potential[4] + " Def ";
    } else if (selectedSkill.atkType == "Special") {
        statement += defMon.sets[0].potential[6] + " SpD ";
    }

    statement += defMon.name + ": " + getDamage(atkMon, defMon, selectedSkill)[0] + "-"
        + getDamage(atkMon, defMon, selectedSkill)[1] + " ";
    statement += "(" + getDamage(atkMon, defMon, selectedSkill)[2] + "% - "
        + getDamage(atkMon, defMon, selectedSkill)[3] + "%)";

    return statement;
}

function getEffectiveness(type1, type2) {
  
    switch(type1 + "->" + type2) {
      
      //Resistances
      case "Normal->Ghost":
      case "Electric->Electric":
      case "Electric->Sand":
      case "Ghost->Normal":
      case "Sand->Water":
      case "Sand->Sand":
      case "Fire->Water":
      case "Fire->Fire":
      case "Ice->Fire":
      case "Ice->Ice":
      case "Water->Water":
      case "Water->Electric":
      case "Water->Ice":
      case "Foul->Sand":
      case "Heavy->Fire":
      case "Air->Ice":
      case "Poison->Ice":
      case "Cut->Ghost":
        return 0.5;
        break;
      
      //Weaknesses
      case "Electric->Water":
      case "Ghost->Ghost":
      case "Sand->Electric":
      case "Fire->Ice":
      case "Ice->Water":
      case "Water->Sand":
      case "Water->Fire":
      case "Magic->Ghost":
      case "Foul->Water":
      case "Heavy->Ice":
      case "Air->Fire":
      case "Poison->Normal":
      case "Cut->Electric":
        return 2;
        break;
      
      //Neutral
      default:
        return 1;
        break;
    }
    
  }