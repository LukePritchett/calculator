class Calculator {
    constructor(previousTextElement, currentTextElement) {
        this.previousTextElement = previousTextElement
        this.currentTextElement = currentTextElement
    }

    clear() {

    }

    delete() {

    }

    appendNumber(number) {

    }

    chooseOperation(operation) {

    }

    updateDisplay() {
        
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.quertySelector('[data-equals]')
const clearButton = document.quertySelector('[data-clear]')
const clearAllButton = document.quertySelector('[data-clearAll]')
const previousTextElement = document.quertySelector('[data-previous]')
const currentTextElement = document.quertySelector('[data-current]')