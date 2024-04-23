(function () {
    document.addEventListener("DOMContentLoaded", function() {
        const operations = {
            add: (a, b) => a + b,
            subtract: (a, b) => a - b,
            divide: (a, b) => b === 0 ? 'Error: Div by 0' : a / b,
            multiply: (a, b) => a * b,
            percent: (a, b) => a * (b / 100),
            square: (num) => num * num,
            reciprocal: (num) => num === 0 ? 'Error: Div by 0' : 1 / num
        };

        const calcState = {
            current: '',
            operator: '',
            previous: '',
            result: '',
            error: false
        };

        // Updates the display with the current result or input
        function updateDisplay() {
            const display = document.getElementById('display');
            display.textContent = calcState.error ? "Error" : calcState.result || calcState.current || "0";
        }

        // Resets the calculator state
        function resetCalculator() {
            calcState.current = '';
            calcState.previous = '';
            calcState.result = '';
            calcState.operator = '';
            calcState.error = false;
            updateDisplay();
        }

        // Handles the click event for all numeric buttons
        function handleNumber(number) {
            if (calcState.error) resetCalculator();
            calcState.current += number;
            updateDisplay();
        }

        // Performs the calculation based on the operator
        function performOperation() {
            if (!calcState.previous || !calcState.current || calcState.error) {
                return;
            }
            let result = operations[calcState.operator](parseFloat(calcState.previous), parseFloat(calcState.current));
            calcState.result = isNaN(result) ? "Error" : result.toString();
            calcState.error = isNaN(result);
            updateDisplay();
        }

        // Handles the click event for all operator buttons
        function handleOperation(operator) {
            if (calcState.current === "" && calcState.previous !== "") {
                calcState.operator = operator;
                return;
            }
            if (calcState.previous !== "") {
                performOperation();
                calcState.previous = calcState.result;
                calcState.current = "";
                calcState.operator = operator;
            } else {
                calcState.previous = calcState.current;
                calcState.current = "";
                calcState.operator = operator;
            }
            updateDisplay();
        }

        // Adds event listeners to all buttons
        document.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", (event) => {
                const value = event.target.textContent;
                if (button.classList.contains('operand')) {
                    if (value === '=') {
                        performOperation();
                    } else if (value === 'AC') {
                        resetCalculator();
                    } else {
                        handleOperation(value);
                    }
                } else {
                    handleNumber(value);
                }
            });
        });
        
        updateDisplay();  // Initial display update
    });
})();

