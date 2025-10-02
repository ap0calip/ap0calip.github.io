// Initialize the game with default settings
window.onload = function () {
    getAllCookies();
    updateSelector();
    alert(`inst: ${operator} ${level} ${stickerFolder} ${starNumber} ${stickerNumber} ${saved} ${operatorView}`);
};

// Handle operator change from dropdown
function onOperatorChange() {
    const op = document.getElementById('operatorSelect').value;
    operator = op;
}

// Handle level change from dropdown
function onLevelChange() {
    const lvl = document.getElementById('levelSelect').value;
    // Level 1: 0-10, Level 2: 0-12, Level 3: 0-100
    if (lvl === '1') level = 10;
    else if (lvl === '2') level = 12;
    else if (lvl === '3') level = 100;
}

// Handle gender change from dropdown
// This will change the sticker folder based on the selected
function onGenderChange() {
    const gender = document.getElementById('genderSelect').value;
    if (gender === 'boy') stickerFolder = 'BoySticker/';
    else if (gender === 'girl') stickerFolder = 'GirlSticker/';
}

// Update the dropdown selectors to reflect current settings
function updateSelector() {
    // Set operator selector
    if (operator === '+') document.getElementById('operatorSelect').value = '+';
    else if (operator === '-') document.getElementById('operatorSelect').value = '-';
    else if (operator === '*') document.getElementById('operatorSelect').value = '*';
    else if (operator === '/') document.getElementById('operatorSelect').value = '/';

    // Set level selector
    if (level === 10) document.getElementById('levelSelect').value = '1';
    else if (level === 12) document.getElementById('levelSelect').value = '2';
    else if (level === 100) document.getElementById('levelSelect').value = '3';

    // Set Gender selector
    if (stickerFolder === 'BoySticker/') document.getElementById('genderSelect').value = 'boy';
    else if (stickerFolder === 'GirlSticker/') document.getElementById('genderSelect').value = 'girl';
}