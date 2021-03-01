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
        enemyHealth = randomNumber(40, 60);
  
        // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
        fight(pickedEnemyName);
        if (playerHealth > 0 && i < enemyNames.length -1) {
            shop();
        }

      }
      // if player is not alive, break out of the loop and let endGame function run
      else {
        break;
      }
    }
  
    // after loop ends, we are either out of playerHealth or enemies to fight, so run the endGame function
    endGame();
};

var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
}

var shop = function() {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
      );
    switch (shopOptionPrompt) {
        case "REFILL": // new case
        case "refill":
          if (playerMoney >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
      
            playerHealth = playerHealth + 20;
            playerMoney = playerMoney - 7;
          }
          else {
            window.alert("You don't have enough money!");
          }
      
          break;
        case "UPGRADE": // new case
        case "upgrade":
          if (playerMoney >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
      
            playerAttack = playerAttack + 6;
            playerMoney = playerMoney - 7;
          }
          else {
            window.alert("You don't have enough money!");
          }
      
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
      playerMoney = Math.max(0, playerMoney - 10);
      console.log("playerMoney", playerMoney)
      break;
    }
  }
    // if player choses to fight, then fight
  if (promptFight === "fight" || promptFight === "FIGHT") {
      // remove enemy's health by subtracting the amount set in the playerAttack variable
      var damage = randomNumber(playerAttack -3, playerAttack);
      enemyHealth = Math.max(0, enemyHealth - damage);
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
    var damage = randomNumber(enemyAttack - 3, enemyAttack);
    playerHealth = Math.max(0, playerHealth - damage);
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
