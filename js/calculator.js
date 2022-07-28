/* JavaScript Calculator
   Versión 0.1
   Author: Eduardo Nordmann
   Date: 24/07/2022
*/
//Vars
let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let total = null;

//Constans
const buttons = document.querySelectorAll('button');

window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.code}']`);
    key.click();
});

function setDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayValue;
    if(displayValue.length > 9) {
        display.innerText = displayValue.substring(0, 9);
    }
}



function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

function buttonClicked() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
           
            if(buttons[i].classList.contains('operand')) {
                setOperand(buttons[i].value);
                setDisplay();
            } else if(buttons[i].classList.contains('operator')) {
                setOperator(buttons[i].value);
            } else if(buttons[i].classList.contains('equals')) {
                setEquals();
                setDisplay();
            } else if(buttons[i].classList.contains('decimal')) {
                setDecimal(buttons[i].value);
                setDisplay();
            } else if(buttons[i].classList.contains('percent')) {
                setPercent(displayValue);
                setDisplay();
            } else if(buttons[i].classList.contains('sign')) {
                setSign(displayValue);
                setDisplay();
            } else if(buttons[i].classList.contains('clear'))
                clearDisplay();
                setDisplay();
        }
    )}
}


function setOperand(operand) {
    if(firstOperator === null) {
        if(displayValue === '0' || displayValue === 0) {
            displayValue = operand;
        } else if(displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    } else {
        if(displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }
}

function setOperator(operator) {
    if(firstOperator != null && secondOperator === null) {
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = roundValue(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else if(firstOperator != null && secondOperator != null) {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        secondOperator = operator;
        displayValue = roundValue(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else { 
        firstOperator = operator;
        firstOperand = displayValue;
    }
}

function setEquals() {
    if(firstOperator === null) {
        displayValue = displayValue;
    } else if(secondOperator != null) {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        if(result === 'Donkey') {
            displayValue = result;
        } else {
            displayValue = roundValue(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        if(result === 'Donkey') {
            displayValue = result;
        } else {
            displayValue = roundValue(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

function setDecimal(dot) {
    if(displayValue === firstOperand || displayValue === secondOperand) {
        displayValue = '0';
        displayValue += dot;
    } else if(!displayValue.includes(dot)) {
        displayValue += dot;
    } 
}

function setPercent(value) {
    displayValue = (value/100).toString();
}

function setSign(value) {
    displayValue = (value * -1).toString();
}

function roundValue(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

// Basic Math fuctions
function add(a,b) {
    if ((!isNaN(a))&&(!isNaN(b))) {
        return a+b;
    }else{
        return false;
    }
    
}

function add(a,b) {
    if ((!isNaN(a))&&(!isNaN(b))) {
        return a+b;
    }else{
        return false;
    }
    
}
function substract(a,b) {
    if ((!isNaN(a))&&(!isNaN(b))) {
        return a-b;
    }else{
        return false;
    }
    
}
function multiply(a,b) {
    if ((!isNaN(a))&&(!isNaN(b))) {
        return a*b;
    }else{
        return false;
    }
    
}
function divide(a,b) {
    if (((!isNaN(a))&&(!isNaN(b))&& b!=0)) {
        return a/b;
    }else{
        return false;
    }
    
}

function operate(a, b, operator) {
    switch (operator) {
        case '+':
            return add(a,b);
    
        case '-':
            return substract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            if (b!=0) {
                return divide(a,b);
            }else{
                return "Donkey!";
            }
    }
}

setDisplay();
buttonClicked();
