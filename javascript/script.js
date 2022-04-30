class Winner
{
  static kPlayer = new Winner("Player");
  static kComputer = new Winner("Computer");
  static kDraw = new Winner("Draw");
  
  constructor(iWinnerName){
    this.name = iWinnerName;
  }
}

/**
 * @param {Array<string>} aRockPaperScissorsList - The list of options
 */
function randomlyPickRockPaperOrScissors()
{
  const aRockPaperScissorsList = ["ROCK", "PAPER", "SCISSORS"];
  return aRockPaperScissorsList[
    Math.floor(Math.random() * aRockPaperScissorsList.length)
  ];
}

function getComputerChoice()
{
  const aComputerChoice = randomlyPickRockPaperOrScissors();
  console.log("The computer picked: " + aComputerChoice);
  return aComputerChoice;
}

/*
* @param{string} iPlayerInput - the player's choice
*/
function isPlayerInputValid(iPlayerInput)
{
  const aValidChoicesList = ["ROCK", "PAPER", "SCISSORS"];
  return aValidChoicesList.indexOf(iPlayerInput.toUpperCase()) !== -1
    ? true
    : false;
}

function getPlayerInput()
{
  const aPlayerInput = prompt(
    "Please select one of the following options: ROCK, PAPER or SCISSORS",
    ""
  );
  return aPlayerInput;
}

function checkRoundWinner(iPlayerSelection, iComputerSelection)
{
  switch (iPlayerSelection)
  {
    case 'ROCK':
      if (iComputerSelection === 'PAPER')
      {
        return Winner.kComputer;
      }
      else if (iComputerSelection === 'SCISSORS')
      {
        return Winner.kPlayer;
      }
      else
      {
        return Winner.kDraw;
      }
      break;
    case 'PAPER':
      if (iComputerSelection === 'ROCK')
      {
        return Winner.kPlayer;
      }
      else if (iComputerSelection === 'SCISSORS')
      {
        return Winner.kComputer;
      }
      else
      {
        return Winner.kDraw;
      }
      break;
    case 'SCISSORS':
      if (iComputerSelection === 'ROCK')
      {
        return Winner.kComputer;
      }
      else if (iComputerSelection === 'PAPER')
      {
        return Winner.kPlayer;
      }
      else
      {
        return Winner.kDraw;
      }
      break;
    default:
  }
}

function runSingleRoundOfRockPaperScissors()
{
  const aPlayerInput = getPlayerInput();
  const aComputerChoice = getComputerChoice();
  if (isPlayerInputValid(aPlayerInput))
  {
    return checkRoundWinner();
  }
  else
  {
    alert("Please input a valid value among ROCK, PAPER or SCISSORS");
    return null;
  }
}

function runGame()
{
  for (let i = 0; i < 5; i++)
  {
    const aResult = runSingleRoundOfRockPaperScissors();
  }
}

const aLaunchGameButton = document.getElementById("aLaunchGameButtonId");
aLaunchGameButton.addEventListener("click", runSingleRoundOfRockPaperScissors);
