class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.readyToReset = false
        this.clear()
    }

    percentage() {
        this.currentOperand = (this.currentOperand / 100).toString()

    }

    squareRoot() {
        this.currentOperand = Math.sqrt(this.currentOperand)
        this.readyToReset = true

    }

    squared() {
        this.currentOperand = Math.pow(this.currentOperand, 2)
        this.readyToReset = true
    }

    fraction() {
        this.currentOperand = (1 / this.currentOperand).toString()
        this.readyToReset = true
    }

    calculateFactorial() {
        let num = this.currentOperand
        if (num == 0 || num == 1) {
            return 1
        } else {
            let rval = 1;
            for (var i = 2; i <= num; i++)
                rval = rval * i;
            return rval;
        }

    }

    factorial() {
       this.currentOperand = this.calculateFactorial(this.currentOperand)
       this.readyToReset = true
    }

    reverseSign() {
        if (this.currentOperand < 0) {
            this.currentOperand = Math.abs(this.currentOperand)
        } else {
            this.currentOperand = Math.abs(this.currentOperand) * -1
        }
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }

        this.readyToReset = true
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand

        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const percentageButton = document.querySelector('[data-percentage]')
const squareRootButton = document.querySelector('[data-square-root]')
const squaredButton = document.querySelector('[data-squared]')
const fractionButton = document.querySelector('[data-fraction]')
const factorialButton = document.querySelector('[data-factorial]')
const reverseSignButton = document.querySelector('[data-reverse-sign]')

const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {

        if (calculator.previousOperand === "" &&
            calculator.currentOperand !== "" &&
            calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }

        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()

    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

percentageButton.addEventListener('click', button => {
    calculator.percentage()
    calculator.updateDisplay()
})

squareRootButton.addEventListener('click', button => {
    calculator.squareRoot()
    calculator.updateDisplay()
})

squaredButton.addEventListener('click', button => {
    calculator.squared()
    calculator.updateDisplay()
})

fractionButton.addEventListener('click', button => {
    calculator.fraction()
    calculator.updateDisplay()
})

factorialButton.addEventListener('click', button => {
    calculator.factorial()
    calculator.updateDisplay()
})

reverseSignButton.addEventListener('click', button => {
    calculator.reverseSign()
    calculator.updateDisplay()
})