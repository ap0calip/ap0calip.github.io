// File: scripts.js
// --- a/file:///c%3A/Users/ap0ca/OneDrive/Documents/Programming/HTML_The_Numbers/scripts.js
/* * The Numbers Game
 * A simple math game where users can practice addition.
 * This script generates random numbers and displays them for the user to solve.
 */
let operator = '+';
let level = 10;

window.onload = function() {
    resetNumbers();
};

let firstNumber = 0;
let secondNumber = 0;

function resetNumbers() {
    firstNumber = Math.floor((Math.random() * level) + 1);
    secondNumber = Math.floor((Math.random() * level) + 1);

    document.getElementById('firstNumber').innerHTML = firstNumber;
    document.getElementById('secondNumber').innerHTML = secondNumber;
    document.getElementById('operator').innerHTML = operator;

    document.getElementById('imgFirstNumber').src = `images/block.png`;
    document.getElementById('imgSecondNumber').src = `images/block.png`;
    document.getElementById('imgResultNumber').src = `images/block.png`;
}

function imgPointerOver(element) {
    if (element === 'imgFirstNumber') {
        if (firstNumber > 12) {
            document.getElementById(element).src = `images/13.png`;
        }
        else {
            document.getElementById(element).src = `images/${firstNumber}.png`;
        }
    } else if (element === 'imgSecondNumber') {
        if (secondNumber > 12) {
            document.getElementById(element).src = `images/13.png`;
        }
        else {
            document.getElementById(element).src = `images/${secondNumber}.png`;
        }
    } else if (element === 'imgResultNumber') {
        if (firstNumber + secondNumber > 12) {
            document.getElementById(element).src = `images/13.png`;
        }
        else {
            document.getElementById(element).src = `images/${firstNumber + secondNumber}.png`;
        }
    }
}

function imgPointerLeave(element) {
    document.getElementById(element).src = `images/block.png`;
}

function addNumber(element){
    let number = element;
    let result = document.getElementById('result').innerHTML;
    result += number;
    document.getElementById('result').innerHTML = result;
}

function clearResult() {
    document.getElementById('result').innerHTML = '';
}

function pointerOver(element) {
    document.getElementById(`${element}`).style.borderColor= 'black';
}

function pointerLeave(element) {
    document.getElementById(`${element}`).style.borderColor = 'white';
}

function checkResult() {
    let result = document.getElementById('result').innerHTML;
    let correctResult = firstNumber + secondNumber;
    if (parseInt(result) === correctResult) {
        let star = document.getElementById('star');
        let img = document.createElement('img');
        img.src = 'images/star.png'; // Change to your actual image path
        img.alt = 'Star';
        star.appendChild(img);
        resetNumbers();
        clearResult();
    } else {
        alert(`Incorrect! The correct answer is ${correctResult}.`);
        resetNumbers();
        clearResult();
    }
}