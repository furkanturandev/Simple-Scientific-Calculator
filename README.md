# Simple Scientific Calculator

A modern, feature-rich calculator built with HTML, CSS, and JavaScript using Object-Oriented Programming principles. This calculator offers both basic and scientific calculation modes with a beautiful glassmorphism design.

![Calculator Preview](https://img.shields.io/badge/JavaScript-ES6-yellow) ![HTML5](https://img.shields.io/badge/HTML-5-orange) ![CSS3](https://img.shields.io/badge/CSS-3-blue)

## ✨ Features

### 🔢 Basic Operations
- Addition, Subtraction, Multiplication, Division
- Percentage calculations
- Decimal number support
- Backspace and Clear functions
- Real-time operation display

### 🔬 Scientific Operations
- Square (x²)
- Square Root (√)
- Sine (sin)
- Cosine (cos)
- Logarithm (log)
- Power (^)
- Mathematical constants (π, e)

### 📊 Additional Features
- **Calculation History**: View and reuse previous calculations
- **Smooth Animations**: Polished UI transitions and effects
- **Responsive Design**: Works seamlessly on all screen sizes
- **Toggle Modes**: Switch between Basic and Scientific modes
- **Operation Preview**: See your operations as you type
- **Error Handling**: Prevents invalid operations (division by zero, etc.)

## 🎨 Design

The calculator features a modern glassmorphism design with:
- Translucent backgrounds with backdrop blur
- Gradient color scheme
- Smooth hover effects and transitions
- Responsive button sizing
- Clean, intuitive interface

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation

1. Clone the repository:
```bash
git clone https://github.com/furkanturandev/Simple-Scientific-Calculator.git
```

2. Navigate to the project directory:
```bash
cd Calculator
```

3. Open `index.html` in your web browser:
```bash
# On Windows
start index.html

# On macOS
open index.html

# On Linux
xdg-open index.html
```

Or simply drag and drop the `index.html` file into your browser.

## 📁 Project Structure

```
Calculator/
│
├── index.html          # Main HTML file
├── style.css           # Styling and animations
├── calculator.js       # Calculator logic (OOP)
└── README.md          # Project documentation
```

## 🎯 Usage

### Basic Mode
1. Click numbers to input values
2. Select an operation (+, -, ×, ÷, %)
3. Enter the second number
4. Press = to see the result

### Scientific Mode
1. Click "Scientific Mode" button
2. Additional scientific functions appear
3. Use functions like x², √, sin, cos, log
4. For power operations (^), enter base number, click ^, then enter exponent

### History Panel
1. Click "View History" button
2. Browse previous calculations
3. Click any calculation to reuse its result
4. Panel closes automatically after selection

## 💻 Object-Oriented Architecture

The calculator is built using OOP principles with a single `Calculator` class that encapsulates:

- **State Management**: Current input, previous input, operations, history
- **Event Handling**: Button clicks, keyboard inputs
- **Display Updates**: Real-time screen updates
- **Calculation Logic**: All mathematical operations
- **History Management**: Storing and retrieving calculations

```javascript
class Calculator {
    constructor()
    handleButton(value)
    handleNumber(number)
    handleOperator(operator)
    handleScientificOperation(operation)
    calculate()
    updateDisplay()
    updateOperationDisplay()
    addToHistory(calculation, result)
    // ... and more
}
```

## 🌟 Key Features Explained

### Real-time Operation Display
See your calculations as you type them in a small display above the main screen:
```
5 × 3
```

### Calculation History
- Stores up to 10 recent calculations
- Click any history item to reuse the result
- Animated slide-up panel
- Scroll through history for older calculations

### Responsive Button Sizing
- Buttons automatically adjust when switching to scientific mode
- Calculator maintains consistent size
- Smooth transitions between modes

## 🐛 Error Handling

The calculator includes comprehensive error handling:
- Division by zero prevention
- Square root of negative numbers
- Logarithm of zero or negative numbers
- Invalid input detection

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

- **Furkan Turan** [@furkanturandev](https://github.com/furkanturandev)
- **Taha Mert Yıldız** [@tahamerrtt](https://github.com/tahamerrtt)
- **Burak Can Şen**
---
