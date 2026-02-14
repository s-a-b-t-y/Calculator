// Get reference to input field
const input = document.getElementById('inputBox');

// Track current input
let currentInput = "";

// Reference all buttons inside calculator
const buttons = document.querySelectorAll('.Calculator button');

// Loop through buttons and attach click logic
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText; // Get the button text

        switch (value) {
            case '=':
                // Evaluate safely
                if (currentInput.trim() === "") return;

                try {
                    // Use Function constructor instead of eval for slightly safer evaluation
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
                currentInput = currentInput.slice(0, -1); // Remove last character
                input.value = currentInput;
                break;

            default:
                // Append only valid characters (digits, operators, decimal)
                if (/[\d+\-*/%.]/.test(value)) {
                    currentInput += value;
                    input.value = currentInput;
                }
                break;
        }
    });
});
