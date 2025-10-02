// File: scripts.js
// --- a/file:///c%3A/GitHub/ap0calip.github.io/scripts.js
// +++ b/file:///c%3A/GitHub/ap0calip.github.io/scripts.js
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
let cookieDay = 7; // Number of days before cookies expire
let saved = 'no'; // Flag to indicate if settings have been saved



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

function startGame() {
    // reset star and sticker cookies
    starNumber = 0;
    stickerNumber = 0;
    saved = 'yes';

    // Save current settings to cookies before starting the game
    updateCookies();

    // Redirect to the game page
    window.location.href = './the_numbers.html';
}

//****************** Cookie functions ******************

// Function to update cookies with current settings
function updateCookies() {
    alert(`before update: ${operator} ${level} ${stickerFolder} ${starNumber} ${stickerNumber} ${saved} ${operatorView}`);
    setCookie('stickerFolder', stickerFolder, cookieDay);
    setCookie('operator', operator, cookieDay);
    setCookie('starNumber', starNumber.toString(), cookieDay);
    setCookie('stickerNumber', stickerNumber.toString(), cookieDay);
    setCookie('level', level.toString(), cookieDay);
    setCookie('saved', saved, cookieDay);
    getAllCookies();
}

// Function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get all cookies and set default values if not present
function getAllCookies() {
    getCookie('stickerFolder') ? stickerFolder = getCookie('stickerFolder') : stickerFolder = 'BoySticker/';
    getCookie('operator') ? operator = getCookie('operator') : operator = '+';
    getCookie('starNumber') ? starNumber = parseInt(getCookie('starNumber')) : starNumber = 0;
    getCookie('stickerNumber') ? stickerNumber = parseInt(getCookie('stickerNumber')) : stickerNumber = 0;
    getCookie('level') ? level = parseInt(getCookie('level')) : level = 10;
    getCookie('saved') ? saved = getCookie('saved') : saved = 'no';

    // Set operatorView based on operator
    if (operator === '+') {operatorView = '+';}
    else if (operator === '-') {operatorView = '-';}
    else if (operator === '*') {operatorView = '×';}
    else if (operator === '/') {operatorView = '÷';}

    alert(`after get: ${operator} ${level} ${stickerFolder} ${starNumber} ${stickerNumber} ${saved} ${operatorView}`);
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

// Function to delete all cookies
function resetCookies() {
    setCookie('stickerFolder', 'BoySticker/', -1);
    setCookie('operator', '+', -1);
    setCookie('level', '10', -1);
    setCookie('starNumber', '0', -1);
    setCookie('stickerNumber', '0', -1);
}

