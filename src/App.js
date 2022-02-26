Public: {
    index.html
}
        const buttons = document.querySelectorAll('button')
        const display = document.querySelector('#display')

        const calculator = {
            displayValue: '',
            firstOperand: null,
            waitingForSecondOperand: false,
            operator: null,
        }

        const calculations = {
            '/': (a, b) => a / b,
            '*': (a, b) => a * b,
            '+': (a, b) => a + b,
            '-': (a, b) => a - b
        }

        function updateDisplay() {
            display.value = calculator.displayValue
        }

        updateDisplay()

        function performCalculation(operator) {
            const value = parseFloat(calculator.displayValue)
            if (calculator.firstOperand == null) {
                calculator.firstOperand = value
            } else if (calculator.operator) {
                const result = calculations[calculator.operator](calculator.firstOperand, value)
                calculator.displayValue = result
                calculator.firstOperand = result
            }
            calculator.waitingForSecondOperand = true
            calculator.operator = operator

            updateDisplay()
        }

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const key = button.innerText
                if (key === 'C') {
                    calculator.displayValue = '0'
                    calculator.firstOperand = null
                    calculator.waitingForSecondOperand = false
                    calculator.operator = null
                } else if (key === '=') {
                    performCalculation(calculator.operator)
                } else if (key === '+' || key === '-' || key === '*' || key === '/') {
                    performCalculation(key)
                } else if (key === '-') {
                    if (!calculator.displayValue.includes('.')) {
                        calculator.displayValue += '.'
                    }
                } else {
                    if (calculator.waitingForSecondOperand) {
                        calculator.displayValue = key
                        calculator.waitingForSecondOperand = false
                    } else {
                        calculator.displayValue += key
                    }
                }
                updateDisplay()

            })

        })





        