switch (value) {
    case '=':
        if (currentInput.trim() === "") return;
        try {
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
        // Convert current input to percentage
        if (currentInput.trim() !== "") {
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
        if (/[\d+\-*/.]/.test(value)) {  // removed % from regex
            currentInput += value;
            input.value = currentInput;
        }
        break;
}
