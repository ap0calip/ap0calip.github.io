// File: scripts_the_numbers.js
// --- a/file:///c%3A/GitHub/ap0calip.github.io/scripts_the_numbers.js
// +++ b/file:///c%3A/GitHub/ap0calip.github.io/scripts_the_numbers.js
// @@ -1,3 +1,4 @@

// Prevent the browser from navigating away without confirmation
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
// });

// Add sound effect on button click
const soundPositive = new Audio('sound/sound_positive.mp3');
const soundNegative = new Audio('sound/sound_negative.mp3');
const soundSticker = new Audio('sound/sound_sticker.mp3');

const maxStars = 8; // Maximum number of stars allowed, default is 8
const maxSticker = 20; // Maximum number of gifts allowed, default is 20
let operator = '+'; // Default operator
let operatorView = '+'; // Default operator view
let level = 10;     // Default level (Easy)
let stickerFolder = 'BoySticker/'; // Folder for sticker images
let starNumber = 0; // Starting number for the game
let stickerNumber = 0; // Starting number for the sticker
let firstNumber = 0; // First number in the equation
let secondNumber = 0; // Second number in the equation
let cookieDay = 1;

// Initialize the game with default settings
window.onload = function() {
    getCookie('stickerFolder') ? stickerFolder = getCookie('stickerFolder') : stickerFolder = 'BoySticker/';
    getCookie('operator') ? operator = getCookie('operator') : operator = '+';  
    getCookie('starNumber') ? starNumber = parseInt(getCookie('starNumber')) : starNumber = 0;
    getCookie('stickerNumber') ? stickerNumber = parseInt(getCookie('stickerNumber')) : stickerNumber = 0;
    getCookie('level') ? level = parseInt(getCookie('level')) : level = 10;
    updateSelector();
    updateStar()
    updateSticker();
    resetNumbers();
};

// Prevent F5 key from refreshing the page
// This is useful for preventing accidental page refreshes during gameplay
document.addEventListener('keydown', function (event) {
  // F5 has key code 116
  if (event.key === 'F5' || event.keyCode === 116) {
    event.preventDefault(); // Prevent the default refresh behavior
    console.log('F5 was pressed!');
    // You can trigger your custom logic here
  }
});

// Get keydown events for number input
document.addEventListener("keydown", function(event) {
  if (isDigit(event.key)) {
    addNumber(event.key);
  }
    else if (event.key === 'Enter') {
        checkResult();
    }
    else if (event.key === 'Escape') {
        clearResult();
    }
    else if (event.key === 'Backspace' || event.key === 'Delete') {
        let result = document.getElementById('result').innerHTML;
        result = result.slice(0, -1); // Remove the last character
        document.getElementById('result').innerHTML = result;
    }
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        // Prevent default behavior of arrow keys
        event.preventDefault();
    }
});

// Function to check if the key pressed is a digit
function isDigit(key) {
  return /^[0-9]$/.test(key); // Accepts only single digits 0–9
}

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
    updateCookies();
    resetNumbers();
}

// Handle level change from dropdown
function onLevelChange() {
    const lvl = document.getElementById('levelSelect').value;
    // Level 1: 0-10, Level 2: 0-12, Level 3: 0-100
    if (lvl === '1') level = 10;
    else if (lvl === '2') level = 12;
    else if (lvl === '3') level = 100;
    updateCookies();
    resetNumbers();
}

// Handle gender change from dropdown
// This will change the sticker folder based on the selected
function onGenderChange() {
    const gender = document.getElementById('genderSelect').value;
    if (gender === 'boy') {
        stickerFolder = 'BoySticker/';
    } else if (gender === 'girl') {
        stickerFolder = 'GirlSticker/';
    }
    updateCookies();
    resetNumbers();
}

function updateSelector() {
    if (operator === '+') {
        document.getElementById('operatorSelect').value = '+';
        operatorView = '+';
    } else if (operator === '-') {
        document.getElementById('operatorSelect').value = '-';
        operatorView = '-';
    } else if (operator === '*') {
        document.getElementById('operatorSelect').value = '*';
        operatorView = '×';
    } else if (operator === '/') {
        document.getElementById('operatorSelect').value = '/';
        operatorView = '÷';
    }

    if (level === 10) {
        document.getElementById('levelSelect').value = '1';
    }  else if (level === 12) {
        document.getElementById('levelSelect').value = '2';
    } else {
        document.getElementById('levelSelect').value = '3';
    }
    if (stickerFolder === 'BoySticker/') {
        document.getElementById('genderSelect').value = 'boy';
    } else if (stickerFolder === 'GirlSticker/') {
        document.getElementById('genderSelect').value = 'girl';
    }
}

function updateStar() {
    const starContainer = document.getElementById('starContainer');
    for( let i = 0; i < starNumber; i++) {
        let img = document.createElement('img');
        img.src = 'images/star.png'; // Change to your actual image path
        img.alt = 'Star';
        img.className = 'imgStar';
        starContainer.appendChild(img);
    }
}

function updateSticker() {
    const stickerContainer = document.getElementById('stickerContainer');
    for (let i = 0; i < stickerNumber; i++) {
        let img = document.createElement('img');
        img.src = `${stickerFolder}${i+1}.png`; // Change to your actual image path
        img.alt = 'Sticker';
        img.className = 'imgSticker';
        stickerContainer.appendChild(img);
    }
}

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

// Function to handle image click events
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

// Check the result when the user clicks the "Enter" button
function checkResult() {
    // Pause all sound effects to avoid overlap
    soundPositive.pause();
    soundNegative.pause();
    soundSticker.pause();
    
    let result = document.getElementById('result').innerHTML;
    const imgStar = document.getElementsByClassName('imgStar');
    const imgSticker = document.getElementsByClassName('imgSticker');
    const starContainer = document.getElementById('starContainer');
    const stickerContainer = document.getElementById('stickerContainer');
    let correctResult = eval(`${firstNumber} ${operator} ${secondNumber}`);
    if (parseInt(result) === correctResult) {
        if( imgStar.length < maxStars ) {
            soundPositive.currentTime = 0; // Ensure sound starts from the beginning
            soundPositive.play(); // Play positive sound effect
            let img = document.createElement('img');
            img.src = 'images/star.png'; // Change to your actual image path
            img.alt = 'Star';
            img.className = 'imgStar';
            starContainer.appendChild(img);
        }
        else {
            if (imgSticker.length > maxSticker) {
                alert(`You have already earned the maximum number of sticker! (${maxSticker})`);
            }
            else {
                soundSticker.play(); // Play sticker sound effect
                while (imgStar.length > 0) {
                    imgStar[imgStar.length - 1].remove();
                }
                let img = document.createElement('img');
                img.src = `${stickerFolder}${imgSticker.length + 1}.png`; // Change to your actual image path
                img.alt = 'Sticker';
                img.className = 'imgSticker';
                stickerContainer.appendChild(img);
                alert(`See your sticker below!`);
            }
        }
    } else {
        soundNegative.currentTime = 0; // Ensure sound starts from the beginning
        soundNegative.play(); // Play negative sound effect
        // Show an alert with the correct answer
        alert(`Incorrect! The correct answer is ${correctResult}.`);
        if (imgStar.length > 0) {
            imgStar[imgStar.length - 1].remove(); // Remove the last star if the answer is incorrect
        }  
    }
    starNumber = imgStar.length;
    stickerNumber = imgSticker.length -1; // Adjusted to match the number of stickers
    updateCookies();
    resetNumbers();
}

//****************** Cookie functions ******************

// Function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
    try {
        // Add validation for cookie name
        if (!name || typeof name !== 'string') {
            throw new Error('Invalid cookie name');
        }

        const cookieName = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        
        // Use array method find() instead of for loop
        const cookieValue = decodedCookie.split(';')
            .map(c => c.trim())
            .find(c => c.startsWith(cookieName));

        // Return cookie value or null if not found
        return cookieValue ? cookieValue.substring(cookieName.length) : null;
    } catch (error) {
        console.error('Error getting cookie:', error);
        return null;
    }
}

// Function to update cookies with current settings
function updateCookies() {
    setCookie('stickerFolder', stickerFolder, cookieDay);
    setCookie('operator', operator, cookieDay);
    setCookie('starNumber', starNumber.toString(), cookieDay);
    setCookie('stickerNumber', stickerNumber.toString(), cookieDay);
    setCookie('level', level.toString(), cookieDay);
}

// Function to delete all cookies
function resetCookies() {
    setCookie('stickerFolder', 'BoySticker/', -1);
    setCookie('operator', '+', -1);
    setCookie('starNumber', '0', -1);
    setCookie('stickerNumber', '0', -1);
    setCookie('level', '10', -1);
    
    location.reload(); // Reload the page to apply changes
    alert('All cookies have been reset to default values!');
}
