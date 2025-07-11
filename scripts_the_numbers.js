// File: scripts.js
// --- a/file:///c%3A/Users/ap0ca/OneDrive/Documents/Programming/HTML_The_Numbers/scripts.js
/* * The Numbers Game
 * A simple math game where users can practice addition.
 * This script generates random numbers and displays them for the user to solve.
 */

// Prevent the browser from navigating away without confirmation
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
});

const maxStars = 8; // Maximum number of stars allowed, default is 8
const maxGifts = 20; // Maximum number of gifts allowed, default is 20
let operator = '+'; // Default operator
let operatorView = '+'; // Default operator view
let level = 10;     // Default level (Easy)
let giftFolder = 'BoyGift/'; // Folder for gift images

// Handle operator change from dropdown
function onOperatorChange() {
    const op = document.getElementById('operatorSelect').value;
    operator = op;
    if (op === '+') {
        operatorView = '+';
    }
    else if (op === '-') {
        operatorView = '-';
    }
    else if (op === '*') {
        operatorView = '×';
    }
    else if (op === '/') {
        operatorView = '÷';
    }
    resetNumbers();
}

// Handle level change from dropdown
function onLevelChange() {
    const lvl = document.getElementById('levelSelect').value;
    // Level 1: 0-10, Level 2: 0-12, Level 3: 0-100
    if (lvl === '1') level = 10;
    else if (lvl === '2') level = 12;
    else if (lvl === '3') level = 100;
    resetNumbers();
}

function onGenderChange() {
    const gender = document.getElementById('genderSelect').value;
    if (gender === 'boy') {
        giftFolder = 'BoyGift/';
    } else if (gender === 'girl') {
        giftFolder = 'GirlGift/';
    }
    resetNumbers();
}

window.onload = function() {
    resetNumbers();
};

let firstNumber = 0;
let secondNumber = 0;

function resetNumbers() {
    if (operator === '+') {
        firstNumber = Math.floor(Math.random() * (level + 1));
        secondNumber = Math.floor(Math.random() * (level - firstNumber + 1));
    }
    else if (operator === '-') {
        firstNumber = Math.floor(Math.random() * (level + 1));
        secondNumber = Math.floor(Math.random() * (firstNumber + 1));
    }
    else if (operator === '*') {
        firstNumber = Math.floor(Math.random() * (level + 1));
        secondNumber = Math.floor(Math.random() * (level + 1));
    }
    else if (operator === '/') {
        secondNumber = Math.floor((Math.random() * level) + 1); // Avoid division by zero
        firstNumber = secondNumber * (Math.floor(Math.random() * (level + 1)));
    }
    // Update the HTML elements with the new numbers and operator
    document.getElementById('firstNumber').innerHTML = firstNumber;
    document.getElementById('secondNumber').innerHTML = secondNumber;
    document.getElementById('operator1').innerHTML = operatorView;
    document.getElementById('operator2').innerHTML = operatorView;

    document.getElementById('imgFirstNumber').src = `images/block.png`;
    document.getElementById('imgSecondNumber').src = `images/block.png`;
    document.getElementById('imgResultNumber').src = `images/block.png`;

    // Reset the result display
    document.getElementById('result').innerHTML = '';
}

function imgClick(element) {
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
        if (eval(`${firstNumber} ${operator} ${secondNumber}`) > 12) {
            document.getElementById(element).src = `images/13.png`;
        }
        else {
            document.getElementById(element).src = "images/" + eval(`${firstNumber} ${operator} ${secondNumber}`) + ".png";
        }
    }
    const intervalID = setTimeout(imgLeave, 10000, element);
}

function imgLeave(element) {
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
    let correctResult = eval(`${firstNumber} ${operator} ${secondNumber}`);
    const imgStar = document.getElementsByClassName('imgStar');
    const imgGift = document.getElementsByClassName('imgGift');
    const starContainer = document.getElementById('starContainer');
    const giftContainer = document.getElementById('giftContainer');
    if (parseInt(result) === correctResult) {
        if( imgStar.length < maxStars ) {
            let img = document.createElement('img');
            img.src = 'images/star.png'; // Change to your actual image path
            img.alt = 'Star';
            img.className = 'imgStar';
            starContainer.appendChild(img);
        }
        else {
            if (imgGift.length > maxGifts) {
                alert(`You have already earned the maximum number of gifts! (${maxGifts})`);
            }
            else {
                while (imgStar.length > 0) {
                    imgStar[imgStar.length - 1].remove();
                }
                let img = document.createElement('img');
                img.src = `${giftFolder}${imgGift.length + 1}.png`; // Change to your actual image path
                img.alt = 'Gift';
                img.className = 'imgGift';
                giftContainer.appendChild(img);
            }
        }
        resetNumbers();
    } else {
        alert(`Incorrect! The correct answer is ${correctResult}.`);
        if (imgStar.length > 0) {
            imgStar[imgStar.length - 1].remove(); // Remove the last star if the answer is incorrect
        }
        resetNumbers();    
    }
}
