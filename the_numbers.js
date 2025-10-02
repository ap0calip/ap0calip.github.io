window.addEventListener("resize", updateTemplate);

// Initialize the game with default settings
window.onload = function () {
    updateTemplate();
    getAllCookies();
    if (saved === 'no') {
        window.location.href = './instruction.html';
    } 
    else {
        updateStar();
        updateSticker();
        resetNumbers();
    }
    alert(`numbers: ${operator} ${level} ${stickerFolder} ${starNumber} ${stickerNumber} ${saved} ${operatorView}`);
};

function updateStar() {
    const starContainer = document.getElementById('starContainer');
    for (let i = 0; i < starNumber; i++) {
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
        img.src = `${stickerFolder}${i + 1}.png`; // Change to your actual image path
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

function addNumber(element) {
    let number = element;
    let result = document.getElementById('result').innerHTML;
    result += number;
    document.getElementById('result').innerHTML = result;
}

function clearResult() {
    document.getElementById('result').innerHTML = '';
}

function pointerOver(element) {
    document.getElementById(`${element}`).style.borderColor = 'black';
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
        if (imgStar.length < maxStars) {
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
                img.src = `${stickerFolder}${imgSticker.length}.png`; // Change to your actual image path
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
    stickerNumber = imgSticker.length - 1; // Adjusted to match the number of stickers
    updateCookies();
    resetNumbers();
}

// Get keydown events for number input
document.addEventListener("keydown", function (event) {
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

// Function to get the current orientation of the device
function updateTemplate() {
    const container = document.querySelector('.numbers-container');
    const additionalContainer = document.querySelector('.additional-container');
    const imageBorderLeft = document.querySelector('.imgBorderLeft');
    const imageBorderRight = document.querySelector('.imgBorderRight');

    if (window.innerHeight > window.innerWidth) {
        //alert('Portrait');
        container.style.gridTemplateColumns = 'auto auto auto auto auto';
        imageBorderLeft.style.width = '0vw';
        imageBorderRight.style.width = '0vw';
    } else {
        //alert('Landscape');
        container.style.gridTemplateColumns = 'auto auto auto auto auto auto auto auto auto auto';
        imageBorderLeft.style.width = '7vw';
        imageBorderRight.style.width = '7vw';
    }
    additionalContainer.style.gridTemplateColumns = 'auto auto auto auto auto auto';
    additionalContainer.style.gridTemplateRows = '9vw 17vw';
    imageBorderLeft.style.height = 'auto';
    imageBorderRight.style.height = 'auto';
}