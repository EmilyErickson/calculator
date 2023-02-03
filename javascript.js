let calculator = {
    displayValue: "",
    previousDisplay: "",
    currentOperand: null,
    waitingForSecondOperand: false,
    operator: null,
}

let numberButtons = document.querySelectorAll(".number")
let operationButtons = document.querySelectorAll(".operation")
let decimalButton = document.querySelector(".decimal")
let equalsButton = document.querySelector(".equals")
let deleteButton = document.querySelector(".erase")
let clearButton = document.querySelector(".clear")


function inputDigit(num) {
    let {displayValue, previousDisplay, waitingForSecondOperand} = calculator;
    if (waitingForSecondOperand === true) {
        calculator.previousDisplay = displayValue;
        calculator.displayValue = num;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === "0" ? num : displayValue + num;
    }
    // console.log(calculator)
}

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = "0."
        calculator.waitingForSecondOperand = false;
        return
    }
    if (!calculator.displayValue.includes(dot))
    calculator.displayValue += dot;
}

function takeOperator (nextOperator) {
    let { currentOperand, displayValue, previousDisplay, operator } = calculator
    let inputValue = parseFloat(displayValue);
    if(operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        // console.log(calculator);
        return;
    }
    if (currentOperand === null && !isNaN(inputValue)) {
        calculator.currentOperand = inputValue;
        calculator.previousDisplay = currentOperand;
    } else if (operator) {
        let result = operate(currentOperand, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(5))}`;
        calculator.previousDisplay = currentOperand + operator + inputValue;
        calculator.currentOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    // console.log(calculator);
}

function operate (currentOperand, secondOperand, operator) {
    if (operator === '+') return add(currentOperand, secondOperand);
    if (operator === '-') return subtract(currentOperand, secondOperand);
    if (operator === '*') return multiply(currentOperand, secondOperand);
    if (operator === '/') return divide(currentOperand, secondOperand);
    if (operator === '=') return equalsFunction();
  }

function equalsFunction() {
    let { currentOperand, displayValue, operator } = calculator
    let inputValue = parseFloat(displayValue);
    if(operator && calculator.waitingForSecondOperand) {
        calculator.displayValue = "null";
        calculator.previousDisplay = displayValue;
        return;
    }
    if (currentOperand === null && !isNaN(inputValue)) {
        calculator.displayValue = ""
        calculator.previousDisplay = "";
    } else if (operator) {
        let result = operate(currentOperand, inputValue, operator);
        if (result === "Can't divide by 0!") {
            alert("Can't divide by 0!")
            clearCalculator();
            return
        }
        calculator.displayValue = `${parseFloat(result.toFixed(5))}`;
        calculator.previousDisplay = currentOperand + operator + inputValue;
        calculator.currentOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = null;
    calculator.currentOperand = null;
    // console.log(calculator)
}

function updateDisplay() {
    let display = document.querySelector(".current");
    let previous = document.querySelector(".previous")
    display.textContent = calculator.displayValue
    previous.textContent = calculator.previousDisplay
}

function clearCalculator() {
    calculator.displayValue = "";
    calculator.previousDisplay = "";
    calculator.currentOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    // console.log(calculator);
}

function deleteDigit() {
    let { displayValue } = calculator
    calculator.displayValue = displayValue.slice(0, -1)
    // console.log(calculator)
}

numberButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        let {target} = e;
        inputDigit(target.textContent);
        updateDisplay();  
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        let {target} = e;
        takeOperator(target.textContent);
        updateDisplay();  
    })
})

decimalButton.addEventListener("click", (e) => {
    let {target} = e;
    inputDecimal(target.textContent);
    updateDisplay();  
})

equalsButton.addEventListener("click", (e) => {
    let {target} = e;
    equalsFunction(target.textContent);
    updateDisplay();  
})

deleteButton.addEventListener("click", () => {
    deleteDigit();
    updateDisplay();  
})

clearButton.addEventListener("click", () => {
    clearCalculator();
    updateDisplay();  
})

function add (num1, num2) {
    return num1 + num2
}
function subtract (num1, num2) {
    return num1 - num2
}
function multiply (num1, num2) {
    return num1 * num2
}
function divide (num1, num2) {
    console.log(calculator)
    if (num2 === 0) {
        clearCalculator();
        return calculator.displayValue = "Can't divide by 0!"
    } else {
    return num1 / num2}
}
