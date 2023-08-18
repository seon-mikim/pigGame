
const rollDiceButton = document.querySelector('.roll-dice__button') 

const rollDice = () => {
	const diceImg = document.querySelector('.dice-img')	
	diceImg.classList.remove('dice-img--hidden')
};

const handleClick = () => {

	rollDice();
}

rollDiceButton.addEventListener('click', handleClick)

