class Calculator {
constructor(previousOperandElement, currentOperandElement){
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear()
}
clear(){
    this.currentOperand = ""
    this.previousOperandElement.value = ""
    this.operation = null

}

addNumber(number) {
    this.currentOperand +=  number.toString()
}
updateDisplay() {
    this.currentOperandElement.value = this.currentOperand
}
addOperation(operation) {
    if(this.currentOperand === "") return
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ""
}
    }

const numberButtons = document.getElementsByClassName("btn")
const operationButtons = document.getElementsByClassName("oper")
const equalsButton = document.getElementById("rovnasa")
const clearButton = document.getElementById("ce")
const delButton = document.getElementById("del")

const currentOperandElement = document.getElementsByClassName("textspace")[0]
const previousOperandElement = document.getElementsByClassName("textspace2") [0]
const calculator = new Calculator(currentOperandElement, previousOperandElement)



Array.from(numberButtons).forEach( button => {
    button.addEventListener("click", () => {
       calculator.addNumber(button.innerText)
        calculator.updateDisplay()
    } )
})

Array.from(operationButtons).forEach( button => {
    button.addEventListener("click", () => {
        calculator.addOperation(button.innerText)
        calculator.updateDisplay()
    } )
})
equalsButton.addEventListener("click", () => {
    //calculator.calculate();  // Calculate the result
    //calculator.updateDisplay();  // Update the display with the result
});

    clearButton.addEventListener("click", () => {
        calculator.clear();
        calculator.updateDisplay();
       // clearNumber()
       // updateDisplay()
    } )
  delButton.addEventListener("click", () => {
       calculator.deleteNumber();
       calculator.updateDisplay();
    //deleteNumber()
        //updateDisplay()
    } )

  