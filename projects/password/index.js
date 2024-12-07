// Declare Arrays

const upperArray = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", ];
const lowerArray = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", ];
const numberArray = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ];
const symbolArray = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "+", "-", ".", "`", "~", "|", "<", ">", "=", "-", "_"];
let totalArray = [];
let emptyArray = [];
let generatedArray = [];


// Merge totalArray

function createTotalArray(upper, lower, num, sym) {
    totalArray = emptyArray;
    if(upper === true) {
        totalArray = totalArray.concat(upperArray);
    }

    if(lower === true) {
        totalArray = totalArray.concat(lowerArray);
    }

    if(num === true) {
        totalArray = totalArray.concat(numberArray);
    }

    if(sym === true) {
        totalArray = totalArray.concat(symbolArray);
    }
}


// Copy function

const copyIcon = document.querySelector('#copy-icon');
copyIcon.addEventListener('click', copyPassword);

function copyPassword() {   //event
    allow="clipboard-read; clipboard-write";
    navigator.clipboard.writeText(generatedString);
    copiedOn();
}


// Copy-icon status

function copiedOn () {
    copyIcon.style = 'filter:brightness(1.9) hue-rotate(230deg)';
}

function copiedOff () {
    copyIcon.style = '';
}


// Get slider value to character length label

let slider = document.querySelector('#slider');
let chars = document.querySelector('#number-of-chars');
let slideCharLength = 10;
chars.innerHTML = slider.value;

slider.oninput = function() {
    chars.innerHTML = this.value;
    slideCharLength = this.value;
    strengthValue = checkStrength();
    changeStrengthStatus()
}


// Checkbox 1 status

let checkUpper = false 
const checkbox1 = document.querySelector('#checkbox-1');
checkbox1.addEventListener('click', toggle1);

function toggle1(event) {
    if(event.target.checked) {
        checkUpper = true;
    } else {
        checkUpper = false;
    }
    strengthValue = checkStrength();
    changeStrengthStatus()
}


// Checkbox 2 status - checkLower

let checkLower = false
const checkbox2 = document.querySelector('#checkbox-2');
checkbox2.addEventListener('click', toggle2);

function toggle2(event) {
    if(event.target.checked) {
        checkLower = true;
    } else {
        checkLower = false;
    }
    strengthValue = checkStrength();
    changeStrengthStatus()
}


// Checkbox 3 status - checkNumber

let checkNumber = false
const checkbox3 = document.querySelector('#checkbox-3');
checkbox3.addEventListener('click', toggle3);

function toggle3(event) {
    if(event.target.checked) {
        checkNumber = true;
    } else {
        checkNumber = false;
    }
    strengthValue = checkStrength();
    changeStrengthStatus()
}


// Checkbox 4 status - checkSymbol

let checkSymbol = false
const checkbox4 = document.querySelector('#checkbox-4');
checkbox4.addEventListener('click', toggle4);

function toggle4(event) {
    if(event.target.checked) {
        checkSymbol = true;
    } else {
        checkSymbol = false;
    }
    strengthValue = checkStrength();
    changeStrengthStatus();
}

// Strength section

let strengthValue = 0;

function checkStrength() {
    createTotalArray(checkUpper, checkLower, checkNumber, checkSymbol);
    let strength = slideCharLength * totalArray.length;
    return strength;
}


const strengthText = document.querySelector('#strength-text');
const meter1 = document.querySelector('#meter-1');
const meter2 = document.querySelector('#meter-2');
const meter3 = document.querySelector('#meter-3');
const meter4 = document.querySelector('#meter-4');


function goGreat() {
    strengthText.textContent = 'Great';
    meter1.style.backgroundColor = '#4abea0';
    meter2.style.backgroundColor = '#4abea0';
    meter3.style.backgroundColor = '#4abea0';
    meter4.style.backgroundColor = '#4abea0';   
}

function goStrong() {
    strengthText.textContent = 'Strong';
    meter1.style.backgroundColor = '#4abea0';
    meter2.style.backgroundColor = '#4abea0';
    meter3.style.backgroundColor = '#4abea0';
    meter4.style.backgroundColor = '#9b32e6';
}

function goAverage() {
    strengthText.textContent = 'Average';
    meter1.style.backgroundColor = '#ffa257';
    meter2.style.backgroundColor = '#ffa257';
    meter3.style.backgroundColor = '#9b32e6';
    meter4.style.backgroundColor = '#9b32e6';
}

function goWeak() {
    strengthText.textContent = 'Weak';
    meter1.style.backgroundColor = '#be4a4a';
    meter2.style.backgroundColor = '#9b32e6';
    meter3.style.backgroundColor = '#9b32e6';
    meter4.style.backgroundColor = '#9b32e6';
}


function changeStrengthStatus () {
    if(strengthValue > 800) {
        goGreat();
    } else if(strengthValue > 500) {
        goStrong();
    } else if(strengthValue > 150) {
        goAverage();
    } else {
        goWeak();
    }
}


// Random generator-section

function generateLetter(randomArray) {
    let randomLength = randomArray.length;
    let randomPosition = Math.floor(Math.random() * randomLength);
    let randomLetter = randomArray[ randomPosition ];
    return randomLetter;
}
    
function buildPasswordArray(randomArray, chars) {
    let newArray = [];
    for ( let i = 0; i < chars; i++ ) {
        newArray.push(generateLetter(randomArray));
    }
    return newArray;
}

// Generate button

const outputTextField = document.querySelector('#generated-password')
const generateButton = document.querySelector('.generate-button');
let generatedString = '';
generateButton.addEventListener('click', generate);

function generate() {
    allow="clipboard-read; clipboard-write";
    navigator.clipboard.writeText("");
    copiedOff();
    createTotalArray(checkUpper, checkLower, checkNumber, checkSymbol);
    generatedArray = emptyArray;
    generatedArray = buildPasswordArray(totalArray, slideCharLength);
    generatedString = generatedArray.join("");
    outputTextField.textContent = generatedString;
}