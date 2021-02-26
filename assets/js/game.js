var playerName = window.prompt("What is your robot's name?");
var playerHealth = 1;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Arturobot", "Unghys", "Mecha-Godzilla"];
var enemyHealth = 50;
var enemyAttack = 12;

var startGame = function() {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
  
    // fight each enemy robot by looping over them and fighting them one at a time
    for (var i = 0; i < enemyNames.length; i++) {
      // if player is still alive, keep fighting
      if (playerHealth > 0) {
        // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
        window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
  
        // pick new enemy to fight based on the index of the enemyNames array
        var pickedEnemyName = enemyNames[i];
  
        // reset enemyHealth before starting new fight
        enemyHealth = 50;
  
        // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
        fight(pickedEnemyName);
      }
      // if player is not alive, break out of the loop and let endGame function run
      else {
        break;
      }
    }
  
    // after loop ends, we are either out of playerHealth or enemies to fight, so run the endGame function
    endGame();
};

var endGame = function() {
    if (playerHealth > 0) {
        window.alert("Great job you have survived the game! You now have score of " + playerMoney + ".");
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
var fight = function(enemyName) {
    // repeat and execute as long as the enemy-robot is alive
    while(enemyHealth > 0 && playerHealth > 0) {
        // alert players that they are starting the round
    var promptFight = window.prompt("Would you like to fight or skip this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerName + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerMoney = playerMoney - 10;
      console.log("playerMoney", playerMoney)
      break;
    }
  }
    // if player choses to fight, then fight
  if (promptFight === "fight" || promptFight === "FIGHT") {
      // remove enemy's health by subtracting the amount set in the playerAttack variable
      enemyHealth = enemyHealth - playerAttack;
      console.log(
       playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
      );
  
    // check enemy's health
    if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");
        break;
    } else {
      window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }
  
    // remove player's health by subtracting the amount set in the enemyAttack variable
    playerHealth = playerHealth - enemyAttack;
    console.log(
      enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );
  
    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + " has died!");
      break;
    } else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }

  } else {
    window.alert("You need to choose a valid option. Try again!");
  }
    }
};


startGame();