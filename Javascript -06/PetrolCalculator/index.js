/*
    Petrol Calculator - index.js
    JavaScript logic for calculating petrol costs
*/

// Get DOM elements
const pricePerLiterInput = document.getElementById('pricePerLiter');
const litersInput = document.getElementById('liters');
const calculateBtn = document.getElementById('calculateBtn');
const resultParagraph = document.getElementById('result');

/**
 * Calculates the total cost of petrol based on price per liter and quantity
 * @param {number} pricePerLiter - The cost of petrol per liter
 * @param {number} liters - The number of liters purchased
 * @returns {number} The total cost
 */
function calculateTotalCost(pricePerLiter, liters) {
    return pricePerLiter * liters;
}

/**
 * Updates the result display with the calculated total cost
 * @param {number} totalCost - The total cost to display
 */
function displayResult(totalCost) {
    resultParagraph.textContent = `Total Cost: £${totalCost.toFixed(2)}`;
}

/**
 * Event handler for the calculate button click
 */
function handleCalculate() {
    // Get values from input fields
    const pricePerLiter = parseFloat(pricePerLiterInput.value);
    const liters = parseFloat(litersInput.value);
    
    // Validate inputs
    if (isNaN(pricePerLiter) || pricePerLiter < 0) {
        alert('Please enter a valid price per liter');
        return;
    }
    
    if (isNaN(liters) || liters < 0) {
        alert('Please enter a valid number of liters');
        return;
    }
    
    // Calculate and display result
    const totalCost = calculateTotalCost(pricePerLiter, liters);
    displayResult(totalCost);
}

// Add event listener to the calculate button
calculateBtn.addEventListener('click', handleCalculate);