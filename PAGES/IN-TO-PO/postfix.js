// Function to go to home
function goToHome() {
    window.location.href = "/index.html";
    console.log("Navigating to home screen");
}

// Function to change the calculator type
function changeCalculator() {
    var calculatorSelect = document.getElementById("calculatorSelect");
    var selectedOption = calculatorSelect.value;

    // Perform actions based on the selected option
    switch (selectedOption) {
        case "infixToPrefix":
            window.location.href = "../IN-TO-PRE/prefix.html";
            console.log("Switched to Infix to prefix calculator");
            break;
        case "prefixEvaluation":
            window.location.href = "../PRE-EVE/preevel.html";
            console.log("Switched to Prefix Evaluation calculator");
            break;
        case "postfixEvaluation":
            window.location.href = "../POST-EVE/postevel.html";
            console.log("Switched to Postfix Evaluation calculator");
            break;
        default:
            console.log("Please select a valid calculator option");
            break;
    }
    console.log("Changing calculator");
}

// Function to perform infix to postfix conversion
function infixToPostfixConversion(infixExpression) {
    var stack = [];
    var output = [];

    // Operator precedence
    var precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '^': 3
    };

    for (var i = 0; i < infixExpression.length; i++) {
        var symbol = infixExpression[i];

        // If the symbol is an operand, add it to the output
        if (isOperand(symbol)) {
            output.push(symbol);
        } else if (symbol === '(') {
            // If the symbol is an opening parenthesis, push it onto the stack
            stack.push(symbol);
        } else if (symbol === ')') {
            // If the symbol is a closing parenthesis, pop operators from the stack and add to output until an opening parenthesis is encountered
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            // Pop the opening parenthesis from the stack
            stack.pop();
        } else {
            // If the symbol is an operator
            while (stack.length > 0 && precedence[stack[stack.length - 1]] >= precedence[symbol]) {
                output.push(stack.pop());
            }
            stack.push(symbol);
        }

        // Add a step to the table
        addStepToTable(symbol, stack.slice(), output.slice());
    }

    // Pop any remaining operators from the stack and add to output
    while (stack.length > 0) {
        output.push(stack.pop());
    }

    // Display the final step in the table
    addStepToTable('', stack.slice(), output.slice());

    // Return the converted expression
    return output.join('');
}

// Function to check if the symbol is an operand
function isOperand(symbol) {
    return /^[a-zA-Z0-9]$/.test(symbol);
}

// Function to add a step to the conversion table
// Function to add a step to the conversion table
function addStepToTable(symbol, stack, output) {
    var conversionTable = document.getElementById("conversionTable");
    
    // Handle the case when stack is an empty string or an array
    var stackDisplay = Array.isArray(stack) ? stack.join(',') : stack;

    var row = `<tr><td>${symbol}</td><td>${stackDisplay}</td><td>${output.join('')}</td></tr>`;
    conversionTable.innerHTML += row;
}


// Function to perform conversion and display steps in a table
function convertExpression() {
    var infixExpression = document.getElementById("infixInput").value;
    var conversionTable = document.getElementById("conversionTable");
    var convertedExpressionDiv = document.getElementById("convertedExpression");

    // Clear previous content
    conversionTable.innerHTML = '<tr><th>Symbol</th><th>Stack</th><th>Output</th></tr>';
    convertedExpressionDiv.innerHTML = '';  // Clear previous content

    // Validate input
    if (!infixExpression.trim()) {
        alert("Please enter an infix expression.");
        return;
    }

    // Perform infix to postfix conversion
    var postfixExpression = infixToPostfixConversion(infixExpression);

    // Log intermediate results to the console for debugging
    console.log("Postfix Expression:", postfixExpression);

    // Update table
    addStepToTable('', '', [postfixExpression]);

    // Display the final converted expression
    console.log("Final Converted Expression:", postfixExpression);
    convertedExpressionDiv.innerHTML = "Converted Expression (Postfix): " + postfixExpression;
}


// Initial conversion on page load
convertExpression();
