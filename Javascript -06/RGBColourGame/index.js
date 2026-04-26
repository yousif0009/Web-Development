/*
    RGB Colour Guessing Game - index.js
    JavaScript logic for the RGB colour guessing game
*/

// Game state variables
let targetColour = {};
let lives = 3;
let score = 0;
let gameActive = true;

// DOM elements
const rgbValueDisplay = document.getElementById('rgbValue');
const livesCountDisplay = document.getElementById('livesCount');
const scoreCountDisplay = document.getElementById('scoreCount');
const colourOptionsContainer = document.getElementById('colourOptions');
const messageDisplay = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

/**
 * Generates a random RGB colour object
 * @returns {Object} RGB colour object with r, g, b properties
 */
function generateRandomColour() {
    return {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
    };
}

/**
 * Converts RGB object to CSS string
 * @param {Object} colour - RGB colour object
 * @returns {string} CSS rgb string
 */
function colourToString(colour) {
    return `rgb(${colour.r}, ${colour.g}, ${colour.b})`;
}

/**
 * Generates an array of colour options including the target
 * @param {Object} target - The correct colour to include
 * @param {number} count - Number of options to generate
 * @returns {Array} Array of colour objects
 */
function generateColourOptions(target, count) {
    const options = [target];
    
    while (options.length < count) {
        const newColour = generateRandomColour();
        
        // Ensure the colour is visually different from existing options
        const isDifferent = options.some(opt => {
            const diff = Math.abs(opt.r - newColour.r) + 
                        Math.abs(opt.g - newColour.g) + 
                        Math.abs(opt.b - newColour.b);
            return diff > 100;
        });
        
        if (isDifferent) {
            options.push(newColour);
        }
    }
    
    // Shuffle the options
    return options.sort(() => Math.random() - 0.5);
}

/**
 * Sets up a new round of the game
 */
function setupNewRound() {
    // Generate target colour
    targetColour = generateRandomColour();
    
    // Display the RGB value to guess
    rgbValueDisplay.textContent = colourToString(targetColour);
    
    // Generate colour options
    const options = generateColourOptions(targetColour, 4);
    
    // Clear previous options
    colourOptionsContainer.innerHTML = '';
    
    // Create buttons for each colour option
    options.forEach(colour => {
        const button = document.createElement('button');
        button.className = 'colour-btn';
        button.style.backgroundColor = colourToString(colour);
        button.addEventListener('click', () => handleColourGuess(colour, button));
        colourOptionsContainer.appendChild(button);
    });
    
    // Clear message
    messageDisplay.textContent = '';
    messageDisplay.className = 'message';
    
    gameActive = true;
}

/**
 * Handles the user's colour guess
 * @param {Object} guessedColour - The colour the user clicked
 * @param {HTMLElement} buttonElement - The button element that was clicked
 */
function handleColourGuess(guessedColour, buttonElement) {
    if (!gameActive) return;
    
    const isCorrect = guessedColour.r === targetColour.r && 
                      guessedColour.g === targetColour.g && 
                      guessedColour.b === targetColour.b;
    
    if (isCorrect) {
        // Correct guess
        buttonElement.classList.add('correct');
        messageDisplay.textContent = 'Correct! Well done!';
        messageDisplay.className = 'message correct';
        score++;
        scoreCountDisplay.textContent = score;
        
        gameActive = false;
        
        // Start new round after a short delay
        setTimeout(() => {
            setupNewRound();
        }, 1500);
    } else {
        // Wrong guess
        buttonElement.classList.add('wrong');
        lives--;
        livesCountDisplay.textContent = lives;
        
        if (lives <= 0) {
            // Game over
            messageDisplay.textContent = `Game Over! Final Score: ${score}`;
            messageDisplay.className = 'message game-over';
            gameActive = false;
            restartBtn.classList.remove('hidden');
        } else {
            messageDisplay.textContent = 'Wrong! Try again.';
            messageDisplay.className = 'message wrong';
        }
    }
}

/**
 * Resets the game to initial state
 */
function restartGame() {
    lives = 3;
    score = 0;
    livesCountDisplay.textContent = lives;
    scoreCountDisplay.textContent = score;
    restartBtn.classList.add('hidden');
    setupNewRound();
}

// Event listener for restart button
restartBtn.addEventListener('click', restartGame);

// Initialize the game
setupNewRound();