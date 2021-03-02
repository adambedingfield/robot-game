var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
}

var getPlayerName = function() {
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?")
  }

  console.log("Your robot's name is ");
  return name;
};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 100;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >=7) {
      window.alert("Refilling a player's health by 20 for 7 coins.");
      this.health +=20;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enoug money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >=7) {
      window.alert("Upgrading player's attack by 6 for 7 coins.");
      this.attack += 6;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  }
};

var enemyInfo = [
  {
    name: "Arturobot",
    attack: randomNumber(10,14)
  },
  {
    name: "Unghys",
    attack: randomNumber(10,14)
  },
  {
    name: "Mecha-godzilla",
    attack: randomNumber(10,14)
  }
];

var startGame = function() {
    // reset player stats
    playerInfo.reset();
  
    // fight each enemy robot by looping over them and fighting them one at a time
    for (var i = 0; i < enemyInfo.length; i++) {
      // if player is still alive, keep fighting
      if (playerInfo.health > 0) {
        // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
        window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
  
        // pick new enemy to fight based on the index of the enemyNames array
        var pickedEnemyObj = enemyInfo[i];
  
        // reset enemyHealth before starting new fight
        pickedEnemyObj.health = randomNumber(40, 60);
  
        // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
        fight(pickedEnemyObj);
        if (playerInfo.health > 0 && i < enemyInfo.length -1) {
            shop();
        }

      }
      // if player is not alive, break out of the loop and let endGame function run
      else {
        break;
      }
    }
  
    // after loop ends, we are either out of playerInfo.health or enemies to fight, so run the endGame function
    endGame();
};


var shop = function() {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
      );
    switch (shopOptionPrompt) {
        case "REFILL": // new case
        case "refill":
          playerInfo.refillHealth();
          break;
        case "UPGRADE": // new case
        case "upgrade":
          playerInfo.upgradeAttack();
          break;
        case "LEAVE": // new case
        case "leave":
          window.alert("Leaving the store.");
          break;
        default:
          window.alert("You did not pick a valid option. Try again.");
          shop();
          break;
      }
};

var endGame = function() {
    if (playerInfo.health > 0) {
        window.alert("Great job you have survived the game! You now have score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    }
    else {
        window.alert ("Thank you for playing Robot Gladiators! Come back soon!");
    }
};
var fight = function(enemy) {
    // repeat and execute as long as the enemy-robot is alive
    while(enemy.health > 0 && playerInfo.health > 0) {
        // alert players that they are starting the round
    var promptFight = window.prompt("Would you like to fight or skip this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerInfo.money for skipping
      playerInfo.money = Math.max(0, playerInfo.money - 10);
      console.log("playerInfo.money", playerInfo.money)
      break;
    }
  }
    // if player choses to fight, then fight
  if (promptFight === "fight" || promptFight === "FIGHT") {
      // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
      var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
       playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
      );
  
    // check enemy's health
    if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");
        break;
    } else {
      window.alert(enemy.name + " still has " + enemy.health + " health left.");
    }
  
    // remove player's health by subtracting the amount set in the enemyAttack variable
    var damage = randomNumber(enemy.attack - 3, enemy.attack);
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
    );
  
    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + " has died!");
      break;
    } else {
      window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
    }

  } else {
    window.alert("You need to choose a valid option. Try again!");
  }
    }
};


startGame();
