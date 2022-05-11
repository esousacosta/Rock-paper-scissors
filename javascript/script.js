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
  return aComputerChoice;
}

/**
 * @param {String} iPlayerInput the player's choice
 */
function isPlayerInputValid(iPlayerInput)
{
  const aValidChoicesList = ["ROCK", "PAPER", "SCISSORS"];
  return aValidChoicesList.indexOf(iPlayerInput) !== -1
    ? true
    : false;
}

function getPlayerInput()
{
  const aPlayerInput = prompt(
    "Please select one of the following options: ROCK, PAPER or SCISSORS",
    ""
  );
  return aPlayerInput ? aPlayerInput.toUpperCase() : null;
}

function getRoundWinner(iPlayerSelection, iComputerSelection)
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

function runSingleRoundOfRockPaperScissors(ioEvent)
{
  const aPlayerInput = getPlayerInput();
  const aComputerChoice = getComputerChoice();
  if (isPlayerInputValid(aPlayerInput))
  {
    return getRoundWinner(aPlayerInput, aComputerChoice);
  }
  else
  {
    alert("Please input a valid value among ROCK, PAPER or SCISSORS");
    return null;
  }
}

// TODO: retrieve the player's choice information from the event
function runGame(ioEvent)
{
  let aPlayerWins = 0;
  let aComputerWins = 0;
  let aDraws = 0;
  let aValidRoundsCount = 0;
  let aPlayerPointsParagraph = document.getElementById("playerPointsPara");
  let aComputerPointsParagraph = document.getElementById("computerPointsPara");
  let aDrawPointsParagraph = document.getElementById("drawPointsPara");
  
  while (aValidRoundsCount < 1)
  {
    const aResult = runSingleRoundOfRockPaperScissors(ioEvent);
    if (aResult)
    {
      switch (aResult.name)
      {
        case 'Player':
          aPlayerWins++;
          aValidRoundsCount++;
          alert("The player won!");
          break;
        case 'Computer':
          aComputerWins++;
          aValidRoundsCount++;
          alert("The computer won!");
          break;
        default:
          alert("It's a draw!");
          aDraws++;
          aValidRoundsCount++;
      }
    }
  }
  aPlayerPointsParagraph.innerHTML = aPlayerWins;
  aComputerPointsParagraph.innerHTML = aComputerWins;
  aDrawPointsParagraph.innerHTML = aDraws;
  alert(`End of game:
  - The player had ${aPlayerWins} wins; 
  - the computer had ${aComputerWins} wins; 
  - and there were ${aDraws} draws.`);
}

/**
 * 
 * @param {Prototype} ioEvent transitionend event
 */
function removeEnlargeButtonStyle(ioEvent)
{
  if (ioEvent.propertyName !== 'transform')
  {
    return;
  }
  this.classList.remove('clickAnimationEnlarge');
}

/**
 * 
 * @param {Array} ioPlayerOptionButtonNodeList a nodelist containing the player option buttons
 */
function toggleClickAnimationStyle(ioPlayerOptionButtonNodeList)
{
  ioPlayerOptionButtonNodeList.forEach(aNodeButton => aNodeButton.addEventListener('click',
    (ioEvent) => ioEvent.target.classList.toggle('clickAnimationEnlarge')));
  ioPlayerOptionButtonNodeList.forEach(aNodeButton => aNodeButton.addEventListener('transitionend',
    removeEnlargeButtonStyle));
}

const aPlayerOptionButtonNodeList = document.querySelectorAll("button.playerSelectionButton");
toggleClickAnimationStyle(aPlayerOptionButtonNodeList);

aPlayerOptionButtonNodeList.forEach(aNodeButton => aNodeButton.addEventListener('click', runGame));

const aLaunchGameButton = document.getElementById("aLaunchGameButtonId");
aLaunchGameButton.addEventListener("click", runGame);
