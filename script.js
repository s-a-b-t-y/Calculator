const input = document.getElementById("inputBox");
let currentInput = "";

// Select all buttons
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent.trim();

        switch (value) {
            case '=':
                if (currentInput.trim() === "" || /[^\d+\-*/.%()]$/.test(currentInput)) {
                    input.value = "Error";
                    currentInput = "";
                    return;
                }
                try {
                    // Use Function for safer evaluation (avoids global scope issues)
                    currentInput = Function('"use strict";return (' + currentInput + ')')();
                    input.value = currentInput;
                } catch (err) {
                    input.value = "Error";
                    currentInput = "";
                }
                break;

            case 'AC':
                currentInput = "";
                input.value = "";
                break;

            case 'DEL':
                currentInput = currentInput.slice(0, -1);
                input.value = currentInput;
                break;

            case '%':
                if (currentInput.trim() !== "" && !isNaN(currentInput)) {
                    try {
                        currentInput = Function('"use strict";return (' + currentInput + '/100)')();
                        input.value = currentInput;
                    } catch (err) {
                        input.value = "Error";
                        currentInput = "";
                    }
                }
                break;

            default:
                // Improved validation: Allow numbers, "00", ".", and operators, but prevent invalid starts or multiple decimals/operators
                if ((/^\d$/.test(value) || value === "00" || value === ".") && 
                    !(value === "." && currentInput.includes(".")) && 
                    !(currentInput === "" && /[\-*/]/.test(value))) {
                    currentInput += value;
                } else if (/^[\+\-\*\/]$/.test(value) && currentInput !== "" && !/[\+\-\*\/]$/.test(currentInput)) {
                    currentInput += value;
                }
                input.value = currentInput;
                break;
        }
    });
});