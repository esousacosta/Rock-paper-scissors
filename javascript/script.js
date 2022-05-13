"use strict"

var aPlayerPointsParagraph = document.getElementById("playerPointsPara");
var aComputerPointsParagraph = document.getElementById("computerPointsPara");
var aDrawPointsParagraph = document.getElementById("drawPointsPara");
let aPlayerWins = 0;
let aComputerWins = 0;
let aDraws = 0;

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
  
function addAnimationToComputerButtonSelection(iComputerChoice)
{
    const aComputerSelectedOptionButton = document.getElementById(iComputerChoice.toLowerCase() + "Button");
    aComputerSelectedOptionButton.classList.toggle('clickAnimationEnlargeComputerVersion');
}

/**
 * 
 * @param {object} ioEvent the click event on one of the selection buttons
 * @returns
 */
function runSingleRoundOfRockPaperScissors(ioEvent)
{
  // const aPlayerInput = getPlayerInput();
  const aPlayerInput = ioEvent.target.textContent.toUpperCase();
  const aComputerChoice = getComputerChoice();
  setTimeout(addAnimationToComputerButtonSelection, 600, aComputerChoice);
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
  const aResult = runSingleRoundOfRockPaperScissors(ioEvent);
  if (aResult)
  {
    switch (aResult.name)
    {
      case 'Player':
        aPlayerWins++;
        break;
      case 'Computer':
        aComputerWins++;
        break;
      default:
        aDraws++;
    }
  }
  aPlayerPointsParagraph.innerHTML = aPlayerWins;
  aComputerPointsParagraph.innerHTML = aComputerWins;
  aDrawPointsParagraph.innerHTML = aDraws;
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
  this.classList.remove('clickAnimationEnlargeComputerVersion');
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
