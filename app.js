let playerNumber = 0;
let accumulatedNumber = 0;
let playerSection = document.querySelector(`.player-${playerNumber}`);
let playerName = document.querySelector(`.item__name--${playerNumber}`);

const score = [0, 0];
const firstTotalSpan = document.querySelector('.inner__total--0');
const secondTotalSpan = document.querySelector('.inner__total--1');
const rollDiceButton = document.querySelector('.roll-dice--button');
const newGameButton = document.querySelector('.new-game--button');
const holdButton = document.querySelector('.hold--button');
const diceImg = document.querySelector('.dice-img');
const firstScore = document.querySelector('.item__score--0');
const secondScore = document.querySelector('.item__score--1');
const modal = document.querySelector('.modal');
const gameOverButton = document.querySelector('.modal__content--button');
const modalText = document.querySelector('.text');

const makeRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  diceImg.src = `dice-${diceCount}.png`;

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
    playerName = document.querySelector(`.item__name--${playerNumber}`);
    playerSection = document.querySelector(`.player-${playerNumber}`);
    playerSection.classList.add('player--active');
  } else if (playerNumber === 1) {
    playerSection.classList.remove('player--active');
		playerNumber = 0;
		playerName = document.querySelector(`.item__name--${playerNumber}`);
    playerSection = document.querySelector(`.player-${playerNumber}`);
    playerSection.classList.add('player--active');
  }
  accumulatedNumber = 0;
};

const gameOver = () => {
  if (score[0] >= 50 || score[1] >= 50) {
    const winnerPlayer = playerName.innerText;
    modal.classList.remove('modal--hidden');
    modalText.innerText = ` Winner ${winnerPlayer}🎉🎉`;
  }
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
