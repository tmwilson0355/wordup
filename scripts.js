const hints = {
    "adoptme" : "Hint: a popular game where you can take in pets",
    "bloxburg" : "Hint: a life simulation game where you can build and design your own dreamhouse",
    "murdermystery": "Hint: a game of whodunnit",
    "royalehigh": "Hint: a high school roleplaying game",
    "jailbreak": "Hint: a game that involves an illegal mass exodus"
}


document.addEventListener('DOMContentLoaded', () => {
    const words = ["adoptme", "bloxburg", "murdermystery", "royalehigh", "jailbreak"]
    
    let selectedWord = words[Math.floor(Math.random() * words.length)]

    let lives = 5
    let guessedLetters = []
    
    // using a for loop to create dashes for the words
    let displayWord = ""
    for(let i = 0; i < selectedWord.length; i++) {
        displayWord += "_"
    }
    let currentHint = hints[selectedWord]

    const wordElement = document.getElementById("word")
    const messageElement = document.getElementById("message")
    const livesElement = document.getElementById("lives")
    const keyboardElement = document.getElementById("keyboard")
    const hintElement = document.getElementById("hint")

    // update the content of the HTML elements
    wordElement.textContent = displayWord
    livesElement.textContent = lives
    hintElement.textContent = currentHint

    // making a function to update the displayed word
    // use a for loop to iterate over each character in selectedWord, check to see if a letter is guessed and append it into the displayWord. if its not append an underscore, make sure it updates accordingly.
    function updateDisplayWord() {
        displayWord = ""
        for(let i = 0; i < selectedWord.length; i++) {
            if(guessedLetters.includes(selectedWord[i])) {
                displayWord += selectedWord[i]
            } else {
                displayWord += "_"
            }
        } wordElement.textContent = displayWord
    } 

    // making a function to display winning or losing
    function checkGameStatus() {
        if(displayWord === selectedWord) {
            messageElement.textContent = "Congratulations! You guessed the word!"
            disableKeyboard()
        } else if (lives <= 0) {
            messageElement.textContent = `You lost! The word was: ${selectedWord}`
            disableKeyboard()
        }
    }

    // making a function to turn off the keyboard once the game ends
    // select all the button elements and disable them to prevent further guesses after the game is over
    function disableKeyboard() {
        const buttons = keyboardElement.querySelectorAll("button")
        buttons.forEach(button => button.disabled = true)
    }

    // making a function to sort through the guesses 
    // check if the guessed letter in in the word, if its true then update with the letter(s) else decrease lives by 1 and update screen
    function handleGuess(event) {
        const button = event.target
        const letter = button.textContent

        if(guessedLetters.includes(letter) || lives <= 0) return;
        guessedLetters.push(letter)
        button.disabled = true

        if(selectedWord.includes(letter)) {
            updateDisplayWord()
        } else {
            lives --
            livesElement.textContent = lives
        }
        checkGameStatus()
    }

    // asked chatGPT how to make a keyboard without typing out each button bc I ain't doing all that

    // created an array of letters by splitting the alphabet string, iterated over each letter and created buttons for it and added a click event listener that triggers handleGuess and appends it to the keyboardElement
    function createKeyboard() {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

        alphabet.forEach(letter => {
            const button = document.createElement("button")
            const span = document.createElement("span")
            span.textContent = letter
            button.appendChild(span)

            button.addEventListener("click", handleGuess)

            keyboardElement.appendChild(button)
        })
    }
    createKeyboard()
})