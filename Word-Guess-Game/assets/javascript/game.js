window.onload = function() {

	var randomWord; // Array of words
	var randomCategory; // Selected category
	var word; // Selected word
	var letters = []; // Blank letters
	var guess; // User guess
	var guesses = []; // Stored guesses
	var tries; // Tries
	var counter; // Count correct guesses
	var space; // Handle spaces in words

	// Select Category
	function select() {
		if (chosenCategory === randomWord[0]) {
			categoryName.innerHTML = "Category: Generation One";
		} else if (chosenCategory === randomWord[1]) {
			categoryName.innerHTML = "Category: Generation Two";
		}
	}

	// Create blanks for word and handle spaces
	function result() {
		wordHolder = document.getElementById('blank');
		correct = document.createElement('ul');
	
		for (var i = 0; i < word.length; i++) {
			correct.setAttribute('id', 'word');
			guess = document.createElement('li');
			guess.setAttribute('class', 'guess');
			if (word[i] === " ") {
				guess.innerHTML = " ";
				space = 1;
			} else {
				guess.innerHTML = "_";
			}

			letters.push(guess);
			wordHolder.appendChild(correct);
			correct.appendChild(guess);
		}
	}

	// Show remaining tries for incorrect guesses
	displayTries = document.getElementById("tries");

	function life() {
		displayTries.setAttribute('class', 'label label-primary');
		displayTries.innerHTML = "You have " + tries + " tries left";
		if (tries < 1) {
			displayTries.setAttribute('class', 'label label-danger');
			displayTries.innerHTML = "Game Over";
		} else if (tries < 5) {
			displayTries.setAttribute('class', 'label label-warning');
		}
		for (var i = 0; i < letters.length; i++) {
			if (counter + space === letters.length) {
				displayTries.setAttribute('class', 'label label-success');
				displayTries.innerHTML = "You Win!";
			}
		}
	}

	// Check player keyPress
	function check(keyPressed) {
		userGuesses = document.getElementById("guessed");
		guess = String.fromCharCode(keyPressed.keyCode);
		if (tries === 0 || counter + space === letters.length) {
			alert('Click \'Play Again\' to start a new game.');
			return;
		} else if (guesses.find(function(item) {
				return item === guess.toUpperCase()
			})) {
			alert('You already guessed that letter. Try another.');
			return;
		}
		for (var i = 0; i < word.length; i++) {
			if (word[i] === guess.toLowerCase() || word[i] === guess.toUpperCase()) {
				letters[i].innerHTML = word[i];
				counter += 1;
			}
		}
		var j = (word.indexOf(guess));
		if (j === -1) {
			tries -= 1;
			life();
		} else {
			life();
		}

		guesses.push(guess.toUpperCase());
		userGuesses.innerHTML = 'Your Guesses: ' + guesses;
		// console.log('Guesses: ' + guesses);
		// console.log('Tries: ' + tries);
		// console.log('Counter: ' + counter);
	}

	// Play game
	function play() {
		randomWord = [
			["Pikachu", "Squirtle", "Bulbasaur", "Charmander", "Charizard", "Mew", "Mewtwo"],
			["Chikorita", "Cyndaquil", "Totodile", "Entei", "Suicune", "Raikou", "Lugia"]
		];

		chosenCategory = randomWord[Math.floor(Math.random() * randomWord.length)];
		word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];


		document.onkeypress = check;
		letters = [];
		guesses = [];
		tries = 10;
		counter = 0;
		space = 0;
		result();
		life();
		select();
	}

	play();

	// Reset game

	document.getElementById('reset').onclick = function() {
		correct.parentNode.removeChild(correct);
		userGuesses.innerHTML = 'Your Guesses: ';
		play();
	};
};
