// main function that is fired when user clicks on the roll button
function rollDice () {
	// retrieve values for all user selection/input fields
	// Note that by default they come as strings so we have to use
	// parseInt to make them numbers
	const numDice = document.querySelector("#numDice").value;
	const numSides = document.querySelector("#numSides").value;
	const addSubtract = document.querySelector("#addSubtract").value;
	const modifier = document.querySelector("#modifier").value;

	// store results of individual dice rolls for display but also
	// sum together
	const rollArray = getRandNumber(numDice, numSides);
	const sumOfRolls = rollArray.reduce((total, amount) => total + amount);
	
	const rollSummary = numDice + "d" + numSides + " " + 
	addSubtract.toString() + " " + modifier + " : " + rollArray;

	// determine if we are adding/subtracting the modifier and then
	// do the math to get the results
	let rollTotals;
	if (addSubtract === '+') {
		rollTotals = sumOfRolls + modifier;
	} else {
		rollTotals =  sumOfRolls - modifier;
		
	}
	addToLog(rollTotals, rollSummary);
};

// function to generate and add the random numbers for the dice rolls
function getRandNumber (numDice, numSides) {
	// need to set a range of 1 - numSides so we don't get 0 as a value on a roll
	// Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
	const min = Math.ceil(1);
	const max = Math.floor(numSides + 1);
	let arrayOfRolls = [];
	for (i = 0; i < numDice; i++) {
		arrayOfRolls.push(Math.floor(Math.random() * (max - min) + min));
	}
	return arrayOfRolls;
};

// adds new rolls to the dice log by prepending entries to parent node
// this results in the most recent rolls at the top of the list, descending to oldest
function addToLog (rollTotals, rollSummary) {
	const diceLog = document.querySelector("#diceLog")
	const result = document.querySelector("#result")
	const newEntry = document.createElement("li")
	newEntry.textContent = rollSummary + " Total=" + rollTotals
	result.textContent = "Result: " + rollTotals
	diceLog.prepend(newEntry);
}

// clears all rolls in the dice log
function clearLog () {
	// Using Option 2 A from here that uses a loop to clear all children of a
	// parent node
	const diceLog = document.querySelector("#diceLog")
	const result = document.querySelector("#result")
	result.textContent = "Result: "
	while (diceLog.firstChild) {
		diceLog.removeChild(diceLog.lastChild);
	}
};