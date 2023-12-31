let playerNumber = 0;
let accumulatedNumber = 0;
let playerSection = document.querySelector(`.player-${playerNumber}`);

const score = [0, 0];

const firstScore = document.querySelector('.item__score--0');
const secondScore = document.querySelector('.item__score--1');
const firstTotalSpan = document.querySelector('.inner__total--0');
const secondTotalSpan = document.querySelector('.inner__total--1');

const holdButton = document.querySelector('.hold--button');
const newGameButton = document.querySelector('.new-game--button');
const rollDiceButton = document.querySelector('.roll-dice--button');
const gameOverButton = document.querySelector('.modal__content--button');

const diceImg = document.querySelector('.dice-img');
const modal = document.querySelector('.modal');



const makeRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const gameOver = () => {
  const modalText = document.querySelector('.text');
  if (score[0] >= 50 || score[1] >= 50) {
    if (score[0] > score[1]) {
      modalText.innerText = ` Winner PLAYER${score.length-1}🎉🎉`;
		}
		else if (score[0] < score[1]) {
      modalText.innerText = ` Winner PLAYER${score.length}🎉🎉`;
		}
		modal.classList.remove('modal--hidden');
    rollDiceButton.removeEventListener('click', handleClick);
    newGameButton.removeEventListener('click', handleClick);
	}
};

const holdGame = () => {
  if (score[0] <= 50) {
    score[0] += Number(firstTotalSpan.innerText);
    firstScore.innerText = score[0];
  }
  if (score[1] <= 50) {
    score[1] += Number(secondTotalSpan.innerText);
    secondScore.innerText = score[1];
  }
  changePlayer();
  gameOver();
};

const newGame = () => {
  modal.classList.add('modal--hidden');
  diceImg.classList.add('dice-img--hidden');
  firstTotalSpan.innerText = 0;
  secondTotalSpan.innerText = 0;
  firstScore.innerText = 0;
  secondScore.innerText = 0;
  score[0] = 0;
  score[1] = 0;
};

const rollDice = () => {
  const diceCount = makeRandomNumber(1, 6);
  const isActive = checkActivePlayer();

  diceImg.classList.remove('dice-img--hidden');
  diceImg.src = `assets/dice-${diceCount}.png`;

  getCurrentTotal(diceCount);
  if (isActive && diceCount <= 2) {
    changePlayer();
  }
  gameOver();
};

const checkActivePlayer = () => {
  const activeWhoPlayer = playerSection.classList.contains('player--active');
  return activeWhoPlayer;
};

const changePlayer = () => {
  if (playerNumber === 0) {
    playerSection.classList.remove('player--active');
    playerNumber = 1;
    playerSection = document.querySelector(`.player-${playerNumber}`);
    playerSection.classList.add('player--active');
  } else if (playerNumber === 1) {
    playerSection.classList.remove('player--active');
    playerNumber = 0;
    playerSection = document.querySelector(`.player-${playerNumber}`);
    playerSection.classList.add('player--active');
  }
  accumulatedNumber = 0;
};

const getCurrentTotal = (diceCount) => {
  if (playerNumber === 0) {
    secondTotalSpan.innerText = 0;
    accumulatedNumber += diceCount;
    firstTotalSpan.innerText = accumulatedNumber;
  } else if (playerNumber === 1) {
    firstTotalSpan.innerText = 0;
    accumulatedNumber += diceCount;
    secondTotalSpan.innerText = accumulatedNumber;
  }
};

const handleClick = (event) => {
  const { classList } = event.target;
  const buttonClassName = classList[1];
  if (buttonClassName === 'roll-dice--button') return rollDice();
  if (buttonClassName === 'new-game--button') return newGame();
  if (buttonClassName === 'hold--button') return holdGame();
  if (buttonClassName === 'modal__content--button') return newGame();
};

gameOverButton.addEventListener('click', handleClick);
rollDiceButton.addEventListener('click', handleClick);
newGameButton.addEventListener('click', handleClick);
holdButton.addEventListener('click', handleClick);
