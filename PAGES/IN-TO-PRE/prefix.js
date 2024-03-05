function goToHome() {
    window.location.href="/index.html"
    console.log("Navigating to home screen");
}

function changeCalculator() {
        var calculatorSelect = document.getElementById("calculatorSelect");
        var selectedOption = calculatorSelect.value;
    
        // Perform actions based on the selected option
        switch (selectedOption) {
            case "infixToPostfix":
                window.location.href="../IN-TO-PO/postfix.html"
                console.log("Switched to Infix to Postfix calculator");
                break;
            case "prefixEvaluation":
                window.location.href="../PRE-EVE/preevel.html"
                console.log("Switched to Prefix Evaluation calculator");
                break;
            case "postfixEvaluation":
                window.location.href="../POST-EVE/postevel.html"
                console.log("Switched to Postfix Evaluation calculator");
                break;
            default:
                console.log("Please select a valid calculator option");
                break;
        
    }
    
    console.log("Changing calculator");
}

// Function to perform infix to prefix conversion
function infixToPrefixConversion(infixExpression) {
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

function isOperand(symbol) {
    // Check if the symbol is an operand (in this example, assume single characters are operands)
    return /^[a-zA-Z0-9]$/.test(symbol);
}

// Function to add a step to the conversion table
function addStepToTable(symbol, stack, output) {
    var conversionTable = document.getElementById("conversionTable");
    var row = `<tr><td>${symbol}</td><td>${stack.join(',')}</td><td>${output.join('')}</td></tr>`;
    conversionTable.innerHTML += row;
}


// Function to perform conversion and display steps in a table
function convertExpression() {
    var infixExpression = document.getElementById("infixInput").value;
    var conversionTable = document.getElementById("conversionTable");
    var convertedExpressionDiv = document.getElementById("convertedExpression");

    // Clear previous content
    conversionTable.innerHTML = '<tr><th>Symbol</th><th>Stack</th><th>Output</th></tr>';
    convertedExpressionDiv.innerHTML = '';

    // Validate input
    if (!infixExpression.trim()) {
        alert("Please enter an infix expression.");
        return;
    }

    var reversedInfix = infixExpression.split('').reverse().join('').replace(/\(/g, 'temp').replace(/\)/g, '(').replace(/temp/g, ')');

    // Perform conversion
    var convertedExpression = infixToPrefixConversion(reversedInfix);

    // Reverse the final converted expression
    var reversedConvertedExpression = convertedExpression.split('').reverse().join('');
    convertedExpressionDiv.innerText = "Converted Expression: " + reversedConvertedExpression;
}


// Initial conversion on page load
convertExpression();
