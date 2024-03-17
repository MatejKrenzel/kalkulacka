class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement, historyElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.historyElement = historyElement
      this.clear()
      this.history = []
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
        case '^':
          computation = Math.pow(prev, current)
          break
        case '%':
          computation = prev % current
          break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
      this.history.push({ expression: `${this.previousOperand} ${this.operation} ${this.currentOperand}`, result: computation })
      this.updateHistory()
    }
  
    updateHistory() {
      this.historyElement.innerHTML = this.history.map(calculation => `${calculation.expression} = ${calculation.result}`).join('<br>')
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  const numberButtons = document.getElementsByClassName('data-number')
  const operationButtons = document.getElementsByClassName('data-operation')
  const equalsButton = document.getElementById('data-equals')
  const deleteButton = document.getElementById('data-delete')
  const allClearButton = document.getElementById('data-all-clear')
  const historyButton = document.getElementById('data-history')
  const previousOperandTextElement = document.getElementsByClassName("previous-operand")[0]
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  const historyElement = document.getElementById('history')
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement, historyElement)
  
  Array.from(numberButtons).forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  Array.from(operationButtons).forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
  })

  historyButton.addEventListener('click', () => {
    historyElement.classList.toggle('show')
  })
