const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  console.log(
    "Let's play a game where you (human) make up a number, and I (computer) try to guess it. The lowest possible number is 1."
  );

  let lowest = 1;
  // Story 6: "Extend the Guess Range"
  let highest = await ask(
    "Please enter a number that we'll use as the highest possible guess => ");
    highest = parseInt(highest); 

  let secretNumber = await ask("Ok, now enter a secret number between 1 and " + (highest) + ". (I promise I won't look.)\n");
  console.log("YOUR SECRET NUMBER: " + secretNumber);

  // Story 1: "Pick a Number, Any Number"

  function randomNum() {
    return Math.floor(Math.random() * highest + lowest )
  }

  let guess = randomNum();

  console.log("high range is " + highest); // seeing what the high range is. delete later

  let response = await ask("Is your number " + guess + "? yes or no? => ");

  // Story 2: Computer guessed correctly
  if (response === "yes") {
    console.log("Wow there was a 1 in 100 chance of that. Let's go eat cake!");
    process.exit()
  }

  // Story 3: Computer guessed wrong
  else {
    response = await ask(
      "I'll try again! Is your number higher (key in 'H') or lower (key in 'L')? => "
    );
    let calledTimes = 1; // ICEBOX - counting number of guesses

    // Stories 4 and 5: "Modify Your Guess Range" and "Make it Smarter"

    function guessHigher() {
      guess = Math.floor((highest + 1 + guess) / 2); // adding 1 so range actually goes up to AND INCLUDES their high range
      return guess;
    }

    function guessLower() {
      guess = Math.floor((guess + lowest) / 2);
      return guess;
    }

    while (response !== "yes" && response !== "Yes" && response !== "YES") {

      if (response === "H" || response === "h") {
        lowest = guess;
        response = await ask(
          "Higher you say? Ok. Is your number " +
            guessHigher() +
            "? \nKey in 'yes' if it is, or 'h' or 'l' for me to guess higher or lower! => "
        );

        calledTimes = calledTimes += 1 // For ICEBOX 2: How many tries

      } else {
        highest = guess;
        response = await ask(
          "Lower you say? Ok. Is your number " +
            guessLower() +
            "? \nKey in 'yes' if it is, or 'h' or 'l' for me to guess higher or lower! => "
        );

        calledTimes = calledTimes += 1 // For ICEBOX 2: How many tries

      }
    }
    console.log("Yay!");
    console.log("It took me " + calledTimes + " guesses.") // for ICEBOX 2: How many tries

    //For ICEBOX 1: play again (but doesn't work yet):
    let playAgain = await ask("Would you like to play again? Key in 'yes' or 'no' => ")
    if (playAgain === "yes") {
      start()
    } else {
      console.log("Thanks for playing! Byeeee")
      process.exit()
    }

  }

  process.exit()

}
