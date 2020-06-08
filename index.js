//Eric
const gameStart = function () {
  // Welcome Screen
  const gameMsgs = {
  A1: "Welcome, please click [OK] to continue.",
  A2: "Please try again."
  }
  const welcomeScreen = confirm(gameMsgs.A1);
  if (welcomeScreen) {alert("And the adventure begins...")
  introduction();}
  else {alert(gameMsgs.A2)} // Try again...
  //if yes -> goto introduction, no -> exit
}
//Introduction of the situation
const introduction = function () {
alert("You're en route flying back to the U.S. from vacation when the plane's engine fails and sends you plummeting into the ocean. You wash up ashore and rummage through the wreckage and find a few resources to aid in survival, but use them wisely as time is against you!")
  // inventory.suvivors = gameDiff();
  const inventory = gameDiff();
  console.log(inventory)
  
  gamePlay(inventory)
 }
// Select Game Difficulty
const gameDiff = function () {
  const gameMode = prompt("Please select the difficulty: [easy, normal, hard]")
  if (gameMode === "easy") return easyGame()
  
  else if (gameMode === "normal") return normGame()
  
  else if (gameMode === "hard") return hardGame()
  
  else gameMode ();
}
// Game difficulties
  // Need to point string template ${__} to objects
// Game difficulties
  // Adjust integer values?
const easyGame = function () {
  const names = prompt("Please enter your name");
  const obj = {};
  obj.survivors = names.split(',').map(name => name.trim())
  obj.food = 30
  return obj;
}

const normGame = function () {
  const names = prompt("Please enter (2) names; i.e. marc, casey")
  const obj = {};
  obj.survivors = names.split(',').map(name => name.trim())
  obj.food = 40
  return obj;
}

const hardGame = function () {
 const names = prompt("Please enter (3) names; i.e. marc, casey, eric")
  const obj = {};
  obj.survivors = names.split(',').map(name => name.trim())
  obj.food = 50
  return obj;
}


//Marc
//================================================================
//  Game Play FUNCTION - COMPLETE
//   take an inventory object from the introduction function
//   loops over the gameplay recursively until the base case is met
//   calls printScenario for user I/O
//================================================================
const gamePlay = function(inventory) {
    
    //remove daily food from inventory
    inventory.food = inventory.food - inventory.survivors.length;
    
    //exit conditions
        //found exit from island
        //boat is the exit strategy
    if ((inventory.rope >= 1) && (inventory.wood >= 50) && (inventory.tarp >= 1)) {
      alert("Congratulations! You have enough supplies to build an escape raft. You sail off into the sunset with your intrepid crew and sturdy vessel. You flag down a passing shipping boat and climb aboard to safety and hot coffee. You won!")
      return
    } 

    //run out of supplies or survivors
    if (inventory.food <= 0 || inventory.survivors.length <= 0) {
      alert("Unfortunately your decisions have led to your downdfall and you have passed from this life onto the next. :(")
      confirm("Continue?"), gameStart ();
      return
    }
  
  //recursively call gamePlay function and invoke randomscenario
  gamePlay(printScenario(inventory, randomScenario()))

}

//Marc
//================================================================
//  PRINT SCENARIO FUNCTION - COMPLETED
//   take an inventory object and scenario object
//   prints to screen for user input and handles user input
//   return the new inventory
//================================================================
const printScenario = function (inventory, scene) {
//create message to print to screen
//add scenario to message
const scenario = scene[0];
  let message = scenario.message + "\r\n";
//add options to scenario message
  scenario.option.forEach( (optObj, i) => {
    message += (i + 1) + '. ' + optObj.choice + ' \r\n';
  })
//divide the scenario question from the inventory
message += '=============================\r\n'
//add the current inventory to the message
  for (let k in inventory) {
    message += k + ": " + inventory[k] + ' \r\n';
  }
    
  //initialize the inValid input 
  let invalidInput = true;
  //force the user to select a valid input before continuing
  while (invalidInput) {
    //take user input
    let userInput = prompt(message);
    //assume valid input
    invalidInput = false;

    //check if the user input is valid
    if (userInput-1 < scenario.option.length) {
        //check if the user has enough inventory to select the option
        for (let k in scenario.option[userInput-1].requirements) {
          if (!inventory[k] || inventory[k] - scenario.option[userInput-1].requirements[k] < 0) {
            invalidInput = true;
          }
        }
        //if the users input is valid but does not have the invetory - display fail message and try again
      if (invalidInput) {
        alert(scenario.option[userInput-1].fail + '\r\n\r\n')
      } else {
          //based on user input loop through inventory and add/delete based on result object
          //print success message
          alert(scenario.option[userInput-1].success + '\r\n\r\n')
          for (let k in scenario.option[userInput-1].result) {
            if (k === 'survivors') {
              inventory.survivors.pop();
            } else {
              inventory[k] = (inventory[k] ? inventory[k] + scenario.option[userInput-1].result[k] : scenario.option[userInput-1].result[k])
            }
          }
      } 
    } else {
      //not a valid input - return error and loop again
      invalidInput = true;
      alert('Please type in a valid input. ex. "2"\r\n\r\n');
    }
  }
//return updated inventory 
  return inventory
}


//================================================================
//  SCENARIO GENERATOR FUNCTION - 
//   stores all scenario objects in an array
//   returns a function which randomly selects and returns non-played scenarios when invoked
//   prints the current day
//================================================================
const scenarioGenerator = function () {
  const playedScenarios = [];
  scenarioArr = [
{
    message: "You found a turtle. What do you do?",
    option: [
      {
        choice: "Keep it for a pet",
        success: "You named him Henry",
        fail: "You don't have enough food for that",
        requirements: {
          food: 1
        },
        result: {
          food: -1,
          memories: 1
        }
      },
      {
        choice: "Eat it",
        success: "You're a monster!",
        requirements: {
        },
        result: {
          food: 1,
          regrets: 1
        }
      },
      {
        choice: "Leave him be",
        success: "He goes on his merry way.",
        requirements:{}
      }
    ]
  },

{
    message: "You find a large X marked on the ground. What do you do?",
    option: [
      {
        choice: "Dig up the spot with your shovel",
        success: "You found a tarp!",
        fail: "You don't have a shovel",
        requirements: {
          shovel: 1
        },
        result: {
          tarp: 1
        }
      },
      {
        choice: "Keep walking",
        success: "You ignore the X and keep going",
        requirements: {}
      },
      {
        choice: "Try and dig with your hands",
        success: "You succed in digging up a tarp, but have to eat extra food to make up the energy you lost",
        requirements: {
          food: 1
        },
        result: {
          food: -1
        }
      }
    ]
  },

{
    message: "You see a banana tree. What do you do?",
    option: [
      {
        choice: "Climb up the tree to pick the bananas",
        success: "You fall from the tree and die. But at least you got some bananas!",
        requirements: {},
        result: {
          food: 5,
          survivors: -1
        }
      },
      {
        choice: "Shake the tree",
        success: "The bananas fall from the tree",
        requirements: {},
        result: {
          food: 5
        }
      },
      {
        choice: "Keep walking past the tree",
        success: "You continue on your way",
        requirements:{},
        result: {}
      }
    ]
  },

{
    message: "You see a banana tree. What do you do?",
    option: [
      {
        choice: "Climb up the tree to pick the bananas",
        success: "You fall from the tree and die. But at least you got some bananas!",
        requirements: {},
        result: {
          food: 5,
          survivors: -1
        }
      },
      {
        choice: "Shake the tree",
        success: "The bananas fall from the tree",
        requirements: {},
        result: {
          food: 5
        }
      },
      {
        choice: "Keep walking past the tree",
        success: "You continue on your way",
        requirements:{},
        result: {}
      }
    ]
  },

{
    message: "You see a grove of trees ahead. What do you do?",
    option: [
      {
        choice: "Chop down the trees for wood",
        success: "You got 10 pieces of wood!",
        fail: "You don't have an axe",
        requirements: {
          axe: 1
        },
        result: {
          wood: 10
        }
      },
      {
        choice: "Pick up fallen branches",
        success: "You got 5 pieces of wood!",
        requirements: {},
        result: {
          wood: 5
        }
      },
      {
        choice: "Continue walking past the tree",
        success: "You continue on your way",
        requirements: {},
        result: {}
      }
    ]
  },

{
    message: "You see a grove of trees ahead. What do you do?",
    option: [
      {
        choice: "Chop down the trees for wood",
        success: "You got 10 pieces of wood!",
        fail: "You don't have an axe",
        requirements: {
          axe: 1
        },
        result: {
          wood: 10
        }
      },
      {
        choice: "Pick up fallen branches",
        success: "You got 5 pieces of wood!",
        requirements: {},
        result: {
          wood: 5
        }
      },
      {
        choice: "Continue walking past the tree",
        success: "You continue on your way",
        requirements: {},
        result: {}
      }
    ]
  },

{
    message: "You see a washed up crate on the shore",
    option: [
      {
        choice: "Open the crate and look inside",
        success: "You find an axe in the crate",
        requirements: {},
        result: {
          axe: 1
          }
      },
      {
        choice: "Cautiously approach the crate and open it to look inside",
        success: "You find a shovel in the crate",
        requirements: {},
        result: {
          shovel: 1
        }
      },
      {
        choice: "Leave the crate alone—you don't know what's inside!",
        success: "You continue on your way",
        requirements:{}
      }
    ]
  },

{
  message: "You see a broken raft washed up on the shore. What do you do?",
  option: [
    {
      choice: "Break up the raft with you axe to get usable wood",
      success: "You got 10 pieces of wood!",
      fail: "You don't have an axe",
      requirements: {
        axe: 1
      },
      result: {
        wood: 10
      }
    },
    {
      choice: "Break up the wood by hand",
      success: "It's difficult, but you get a few pieces of wood",
      requirements: {},
      result: {
        wood: 5
      }
      },
    {
      choice: "Ignore the broken raft",
      success: "You continue on your way",
      requirements:{},
      result: {}
      }
    ]
  },

{
  message: "You see a broken raft washed up on the shore. What do you do?",
  option: [
    {
      choice: "Break up the raft with you axe to get usable wood",
      success: "You got 10 pieces of wood!",
      fail: "You don't have an axe",
      requirements: {
        axe: 1
      },
      result: {
        wood: 10
      }
    },
    {
      choice: "Break up the wood by hand",
      success: "It's difficult, but you get a few pieces of wood",
      requirements: {},
      result: {
        wood: 5
      }
      },
    {
      choice: "Ignore the broken raft",
      success: "You continue on your way",
      requirements:{},
      result: {}
      }
    ]
  },

{
  message: "You see a dirty duffel bag hidden under some leaves. What do you do?",
  option: [
    {
      choice: "Search the duffel—there could be something useful inside",
      success: "You find a rope and some rations inside!",
      requirements: {},
      result: {
        rope: 1,
        food: 3
      }
      },
    {
      choice: "Kick the duffel before searching—there could be something dangerous inside",
      success: "You find a rope and rations inside—but the rations crumbled to bits while you were kicking the bag",
      requirements: {},
      result: {
        rope: 1
      }
      },
    {
      choice: "Ignore the bag and continue moving",
      success: "You continue on your way",
      requirements:{},
      result: {}
      }
    ]
  },

{
  message: "You hear rustling in a bush ahead. What do you do?",
  option: [
    {
      choice: "Approach the bush cautiously—it could be dangerous",
      success: "Once you're close, you can see that there's a snake—you manage to run away in time",
      requirements: {},
      result: {}
      },
    {
      choice: "Approach the bush stomping and yelling—you could scare away whatever's there",
      success: "A snake streaks out of the bush! You avoid its path, but drop and crush some food rations as you're escaping",
      requirements: {},
      result: {
        food: -3
      }
      },
    {
      choice: "Ignore the bush and keep going",
      success: "You continue on your way",
      requirements:{},
      result: {}
      }
    ]
  },

{
  message: "You see a cave up ahead. What do you do?",
  option: [
    {
      choice: "Enter the cave",
      success: "Inside, you find a pile of supplies—mostly trash, but you salvage an axe and a rope",
      requirements: {},
      result: {
        axe: 1,
        rope: 1
      }
      },
    {
      choice: "Call into the cave to see if anyone's inside",
      success: "You call into the cave, which triggers a rockslide inside. You're safe, but can no longer enter",
      requirements: {},
      result: {}
      },
    {
      choice: "Ignore the cave and continue on",
      success: "You continue on your way",
      requirements:{},
      result: {}
      }
    ]
  },

{
  message: "You see a cave up ahead. What do you do?",
  option: [
    {
      choice: "Enter the cave",
      success: "Your entrance triggers a cave-in. One member of your group does not escape",
      requirements: {},
      result: {
        survivors: -1
      }
      },
    {
      choice: "Call into the cave to see if anyone's inside",
      success: "You call into the cave and it's clear. There's mostly trash inside, but you salvage an axe",
      requirements: {},
      result: {
        axe: 1
      }
      },
    {
      choice: "Ignore the cave and continue on",
      success: "You continue on your way",
      requirements:{},
      result: {}
      }
    ]
  },

{
  message: "You see a huge fallen log stuck under a boulder up ahead. What do you do?",
  option: [
    {
      choice: "Use teamwork to remove the log and chop it up with your axe",
      success: "You get the log out and get 20 pieces of wood",
      fail: "You don't have enough people or tools to do that",
      requirements: {
        survivors: 2,
        axe: 1
      },
      result: {
        wood: 20
      }
      },
    {
      choice: "Chop what you can off of the log without moving it",
      success: "You get 10 pieces of wood",
      fail: "You don't have an axe",
      requirements: {
        axe: 1
      },
      result: {
        wood: 10
      }
      },
    {
      choice: "Try to move the log yourself",
      success: "You're unable to move the log, and can't break off any usable pieces",
      requirements:{},
      result: {}
      }
    ]
  },

{
  message: "You see a huge fallen log stuck under a boulder up ahead. What do you do?",
  option: [
    {
      choice: "Use teamwork to remove the log and chop it up with your axe",
      success: "You get the log out and get 20 pieces of wood",
      fail: "You don't have enough people or tools to do that",
      requirements: {
        survivors: 2,
        axe: 1
      },
      result: {
        wood: 20
      }
      },
    {
      choice: "Chop what you can off of the log without moving it",
      success: "You get 10 pieces of wood",
      requirements: {
        axe: 1
      },
      result: {
        wood: 10
      }
      },
    {
      choice: "Try to move the log yourself",
      success: "You're unable to move the log, and can't break off any usable pieces",
      requirements:{},
      result: {}
      }
    ]
  },

{
  message: "You see a run-down shack ahead. What do you do?",
  option: [
    {
      choice: "Walk up to the shack and see what's inside",
      success: "There's no one inside, but you manage to find a lighter and 5 usable pieces of wood",
      requirements: {},
      result: {
        lighter: 1,
        wood: 5
      }
      },
    {
      choice: "Take some wood from outside the shack, but don't go in",
      success: "You pick up some scrap wood from outside the shack, but a snake jumps out and bites a member of your group",
      requirements: {},
      result: {
        survivors: -1,
        wood: 5
      }
      },
    {
      choice: "Ignore the shack—you don't know what could be inside",
      success: "You continue on your way",
      requirements:{},
      result: {}
      }
    ]
  },

{
  message: "You see a rabbit up ahead. What do you do?",
  option: [
    {
      choice: "Throw your axe at it—you need food",
      success: "Success! You killed the rabbit and can eat it now, but your axe broke from the impact",
      fail: "You don't have an axe",
      requirements: {
        axe: 1
      },
      result: {
        food: 5,
        axe: -1
      }
      },
    {
      choice: "Toss a rock at the rabbit—you need food",
      success: "Darn it—the rock misses and the rabbit bolts away in fear",
      requirements: {},
      result: {}
      },
    {
      choice: "Leave the rabbit alone",
      success: "You continue on your way",
      requirements:{},
      result: {}
      }
    ]
  },

{
  message: "You see a rabbit up ahead. What do you do?",
  option: [
    {
      choice: "Throw your axe at it—you need food",
      success: "Success! You killed the rabbit and can eat it now, but your axe broke from the impact",
      fail: "You don't have an axe",
      requirements: {
        axe: 1
      },
      result: {
        food: 5,
        axe: -1
      }
      },
    {
      choice: "Toss a rock at the rabbit—you need food",
      success: "Darn it—the rock misses and the rabbit bolts away in fear",
      requirements: {},
      result: {}
      },
    {
      choice: "Leave the rabbit alone",
      success: "You continue on your way",
      requirements:{},
      result: {}
      }
    ]
  },

{
  message: "You see some long vines hanging from a tree up ahead. What do you do?",
  option: [
    {
      choice: "Chop some of the vines with your axe—these could help you build an escape boat",
      success: "You chopped down the vines you needed!",
      fail: "You don't have an axe",
      requirements: {
        axe: 1
      },
      result: {
        rope: 1
      }
      },
    {
      choice: "Try to rip as many vines off as you can with your hands",
      success: "Your hands prove extremely ineffective in removing usable pieces of the vines",
      requirements: {},
      result: {}
      },
    {
      choice: "Ignore the vines and keep walking",
      success: "",
      requirements:{},
      result: {}
      }
    ]
  },

{
  message: "You see some long vines hanging from a tree up ahead. What do you do?",
  option: [
    {
      choice: "Chop some of the vines with your axe—these could help you build an escape boat",
      success: "You chopped down the vines you needed!",
      fail: "You don't have an axe",
      requirements: {
        axe: 1
      },
      result: {
        rope: 1
      }
      },
    {
      choice: "Try to rip as many vines off as you can with your hands",
      success: "Your hands prove extremely ineffective in removing usable pieces of the vines",
      requirements: {},
      result: {}
      },
    {
      choice: "Ignore the vines and keep walking",
      success: "",
      requirements:{},
      result: {}
      }
    ]
  },

{
  message: "You see the remains of an old boat on the shore ahead. What do you do?",
  option: [
    {
      choice: "Cautiously approach the wreckage and see what you can salvage",
      success: "Most of the wood is rotten—but you find an old rope that might be useful",
      requirements: {},
      result: {
        rope: 1
      }
      },
    {
      choice: "Confidently approach the wreckage to see what you could use",
      success: "Most of the wood is rotten—but you find an old rope and a lighter that might be useful",
      requirements: {},
      result: {
        rope: 1,
        lighter: 1
      }
      },
    {
      choice: "Ignore the ship—it could be dangerous",
      success: "You continue on your way",
      requirements:{},
      result: {}
      }
    ]
  },

{
  message: "You see an old wooden chest hidden in the brush. What do you do?",
  option: [
    {
      choice: "Open the chest",
      success: "Wow! Inside you find an axe, a shovel, and some spare wood",
      requirements: {},
      result: {
        wood: 5,
        axe: 1,
        shovel: 1
      }
      },
    {
      choice: "Say a prayer for good luck and then open the chest",
      success: "Wow! Inside you find an axe, a shovel, and some spare wood",
      requirements: {},
      result: {
        wood: 5,
        axe: 1,
        shovel: 1
      }
      },
    {
      choice: "Ignore the chest",
      success: "You continue on your way",
      requirements:{},
      result: {}
      }
    ]
  },

{
  message: "You see an thermos abandoned on the shore. What do you do?",
  option: [
    {
      choice: "Drink from it, you're very thirsty",
      success: "The water tastes fine, but ends up making members of your group very sick—one dies",
      requirements: {},
      result: {
        survivors: -1
      }
      },
    {
      choice: "Dump the liquid out the thermos but keep it with you in case it's useful",
      success: "You've added a thermos to your inventory",
      requirements: {},
      result: {
        thermos: 1
      }
      },
    {
      choice: "Ignore the thermos",
      success: "You continue on your way",
      requirements:{},
      result: {}
      }
    ]
  },

{
  message: "You see an thermos abandoned on the shore. What do you do?",
  option: [
    {
      choice: "Drink from it, you're very thirsty",
      success: "The water is clean and refreshing",
      requirements: {},
      result: {}
    },
    {
      choice: "Dump the liquid out the thermos but keep it with you in case it's useful",
      success: "A snake falls out of the thermos, biting and killing a member of your group",
      requirements: {},
      result: {
        survivors: -1
      }
      },
    {
      choice: "Ignore the thermos",
      success: "You continue on your way",
      requirements:{},
      result: {}
      },
  ]
},
      
  
  {
  message: "You see a tree with a few coconuts on it. What do you do?",
  option: [
    {
      choice: "Shake the tree so that the coconuts fall",
      success: "The coconuts fall, but one strikes and kills a member of your group",
      requirements: {},
      result: {
        survivors: -1,
        food: 5
      }
      },
    {
      choice: "Climb up the tree and throw the coconuts down",
      success: "Success! You safely get up and down the tree, and the coconuts are delicious",
      requirements: {},
      result: {
        food: 5
      }
      },
    {
      choice: "Ignore the tree",
      success: "You continue on your way",
      requirements:{},
      result: {}
      }
    ]
  }
];


  //Marc
  const scenarioFunction = function () {
    //print current day to screen
    alert('DAY ' + playedScenarios.length);
    //if there are no scenario's left then play end game scenario
    if (scenarioArr.length === 0) {

    } else {
      //randomly pick from non-played scenarios
      //store playedScenario index into array
      playedScenarios.push(
        scenarioArr.splice(
          Math.floor(Math.random() * scenarioArr.length), 1
        )
      );
    }
    //return a scenario object
    return playedScenarios[playedScenarios.length-1]
  }
  return scenarioFunction;
}

const randomScenario = scenarioGenerator();
//Starts the game
gameStart();

