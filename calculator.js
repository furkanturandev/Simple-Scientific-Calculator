class Calculator {
    constructor() {
        this.currentInput = '';
        this.previousInput = '';
        this.operation = undefined;
        this.lastOperation = undefined;
        this.shouldResetScreen = false;
        this.isScientificMode = false;
        this.history = [];
        this.isHistoryOpen = false;
        
        // DOM Elements
        this.display = document.getElementById('result');
        this.operationDisplay = document.getElementById('operation');
        this.scientificButtons = document.querySelector('.scientific-buttons');
        this.toggleButton = document.getElementById('toggleScientific');
        this.historyPanel = document.getElementById('history');
        this.historyWrapper = document.querySelector('.history-wrapper');
        this.toggleHistoryBtn = document.getElementById('toggleHistory');
        this.historyCloseBtn = document.querySelector('.history-close');
        
        // Event Listeners
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.querySelectorAll('.calculator button').forEach(button => {
            button.addEventListener('click', () => {
                this.handleButton(button.value);
            });
        });

        this.toggleButton.addEventListener('click', () => {
            this.isScientificMode = !this.isScientificMode;
            this.scientificButtons.classList.toggle('active');
            this.toggleButton.textContent = this.isScientificMode ? 'Basic Mode' : 'Scientific Mode';
        });

        this.toggleHistoryBtn.addEventListener('click', () => {
            this.toggleHistory();
        });

        this.historyCloseBtn.addEventListener('click', () => {
            this.toggleHistory();
        });

        // Close history panel when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isHistoryOpen && 
                !this.historyWrapper.contains(e.target) && 
                e.target !== this.toggleHistoryBtn) {
                this.toggleHistory();
            }
        });
    }

    handleButton(value) {
        if (this.isNumber(value)) {
            this.handleNumber(value);
        } else if (this.isOperator(value)) {
            this.handleOperator(value);
        } else if (value === '=') {
            this.calculate();
        } else if (value === 'clear') {
            this.clear();
        } else if (value === 'backspace') {
            this.backspace();
        } else if (value === '.') {
            this.addDecimal();
        } else if (this.isScientificOperation(value)) {
            this.handleScientificOperation(value);
        }
    }

    handleScientificOperation(operation) {
        let result;
        const currentNumber = parseFloat(this.currentInput);
        let calculationString = '';

        switch(operation) {
            case 'square':
                calculationString = `${currentNumber}²`;
                result = Math.pow(currentNumber, 2);
                break;
            case 'sqrt':
                if (currentNumber < 0) {
                    alert('Cannot calculate square root of negative number!');
                    return;
                }
                calculationString = `√${currentNumber}`;
                result = Math.sqrt(currentNumber);
                break;
            case 'sin':
                calculationString = `sin(${currentNumber})`;
                result = Math.sin(this.toRadians(currentNumber));
                break;
            case 'cos':
                calculationString = `cos(${currentNumber})`;
                result = Math.cos(this.toRadians(currentNumber));
                break;
            case 'log':
                if (currentNumber <= 0) {
                    alert('Cannot calculate logarithm of zero or negative number!');
                    return;
                }
                calculationString = `log(${currentNumber})`;
                result = Math.log10(currentNumber);
                break;
            case 'pow':
                this.operation = 'pow';
                this.previousInput = this.currentInput;
                this.currentInput = '';
                this.updateOperationDisplay();
                return;
            case 'pi':
                calculationString = 'π';
                result = Math.PI;
                break;
            case 'e':
                calculationString = 'e';
                result = Math.E;
                break;
        }

        if (result !== undefined) {
            const previousValue = this.currentInput;
            this.currentInput = result.toString();
            this.updateDisplay();
            this.updateOperationDisplay();
            this.addToHistory(calculationString, result.toString());
        }
    }

    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    isScientificOperation(value) {
        return ['square', 'sqrt', 'sin', 'cos', 'log', 'pow', 'pi', 'e'].includes(value);
    }

    handleNumber(number) {
        if (this.shouldResetScreen) {
            this.currentInput = number;
            this.shouldResetScreen = false;
        } else {
            this.currentInput += number;
        }
        this.updateDisplay();
        this.updateOperationDisplay();
    }

    handleOperator(operator) {
        if (this.currentInput === '') return;
        if (this.previousInput !== '') {
            this.calculate();
        }
        this.operation = operator;
        this.previousInput = this.currentInput;
        this.currentInput = '';
        this.updateOperationDisplay();
    }

    updateOperationDisplay() {
        const operatorSymbols = {
            '+': '+',
            '-': '−',
            '*': '×',
            '/': '÷',
            '%': '%',
            'pow': '^'
        };
        
        if (this.operation && this.previousInput) {
            const currentValue = this.currentInput || '';
            this.operationDisplay.textContent = `${this.previousInput} ${operatorSymbols[this.operation]} ${currentValue}`;
        } else {
            this.operationDisplay.textContent = '';
        }
    }

    calculate() {
        if (this.previousInput === '' || this.currentInput === '') return;
        
        let computation;
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);
        
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert('Cannot divide by zero!');
                    return;
                }
                computation = prev / current;
                break;
            case '%':
                computation = (prev * current) / 100;
                break;
            case 'pow':
                computation = Math.pow(prev, current);
                break;
            default:
                return;
        }

        const calculationString = `${this.previousInput} ${this.operation} ${this.currentInput}`;
        this.currentInput = computation.toString();
        this.operation = undefined;
        this.previousInput = '';
        this.shouldResetScreen = true;
        this.updateDisplay();
        this.updateOperationDisplay();
        this.addToHistory(calculationString, computation.toString());
    }

    clear() {
        this.currentInput = '';
        this.previousInput = '';
        this.operation = undefined;
        this.lastOperation = undefined;
        this.updateDisplay();
        this.updateOperationDisplay();
    }

    backspace() {
        this.currentInput = this.currentInput.toString().slice(0, -1);
        this.updateDisplay();
        this.updateOperationDisplay();
    }

    addDecimal() {
        if (this.shouldResetScreen) {
            this.currentInput = '0.';
            this.shouldResetScreen = false;
            this.updateDisplay();
            this.updateOperationDisplay();
            return;
        }
        if (this.currentInput.includes('.')) return;
        this.currentInput += '.';
        this.updateDisplay();
        this.updateOperationDisplay();
    }

    updateDisplay() {
        this.display.value = this.currentInput || '0';
    }

    addToHistory(calculation, result) {
        this.history.unshift({ calculation, result });
        if (this.history.length > 10) {
            this.history.pop();
        }
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        if (this.history.length === 0) {
            this.historyPanel.innerHTML = `
                <div class="history-item" style="text-align: center; justify-content: center; color: rgba(255,255,255,0.5);">
                    <i class="fas fa-calculator"></i>
                    <span style="margin-left: 10px;">No calculations yet</span>
                </div>`;
            return;
        }

        this.historyPanel.innerHTML = this.history
            .map(item => `
                <div class="history-item" data-result="${item.result}">
                    <span class="history-calculation">${item.calculation}</span>
                    <span class="history-result">=&nbsp;${item.result}</span>
                </div>`)
            .join('');

        // Add click listeners to history items
        document.querySelectorAll('.history-item').forEach(item => {
            if (item.dataset.result) {  // Only add listeners to actual calculation items
                item.addEventListener('click', () => {
                    this.currentInput = item.dataset.result;
                    this.updateDisplay();
                    // Add a subtle highlight effect when clicked
                    item.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    setTimeout(() => {
                        item.style.backgroundColor = '';
                    }, 200);
                    this.toggleHistory();
                });
            }
        });
    }

    toggleHistory() {
        this.isHistoryOpen = !this.isHistoryOpen;
        this.historyWrapper.classList.toggle('active');
        
        // Animate the toggle button
        if (this.isHistoryOpen) {
            this.toggleHistoryBtn.style.transform = 'translateY(-10px)';
            this.toggleHistoryBtn.innerHTML = `
                <i class="fas fa-times"></i>
                Close History
            `;
        } else {
            this.toggleHistoryBtn.style.transform = '';
            this.toggleHistoryBtn.innerHTML = `
                <i class="fas fa-history"></i>
                View History
            `;
        }
    }

    isNumber(value) {
        return !isNaN(value) && value !== ' ';
    }

    isOperator(value) {
        return ['+', '-', '*', '/', '%'].includes(value);
    }
}

// Initialize calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});