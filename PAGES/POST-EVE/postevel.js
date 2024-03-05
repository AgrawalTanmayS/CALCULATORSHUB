function goToHome() {
    window.location.href = "/Index.html";
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
            case "infixToPrefix":
                window.location.href="../IN-TO-PRE/prefix.html"
                console.log("Switched to Infix to Prefix calculator");
                break;
            case "prefixEvaluation":
                window.location.href="../PRE-EVE/preevel.html"
                console.log("Switched to Postfix Evaluation calculator");
                break;
            default:
                console.log("Please select a valid calculator option");
                break;
        
    }
    
    console.log("Changing calculator");
}


// Function to evaluate postfix expression
function evaluateExpression() {
    // Step 1: Add a ")" at the end of the postfix expression
    let postfixExpression = document.getElementById("postfixInput").value + ')';
    let stack = [];
    let steps = [];

    // Step 2: Scan every character of the postfix expression
    for (let i = 0; i < postfixExpression.length; i++) {
        let symbol = postfixExpression[i];

        // Step 3: IF an operand is encountered, Push it on the stack
        if (isOperand(symbol)) {
            stack.push(symbol);
            steps.push({ symbol: symbol, stack: stack.slice() });
        }
        // IF an operator O is encountered
        else if (isOperator(symbol)) {
            // a: Pop the top two elements from the stack as A and B
            let operandA = stack.pop();
            let operandB = stack.pop();
            // b: Evaluate B O A
            let result = evaluate(operandB, operandA, symbol);
            // c: Push the result of evaluation on the stack
            stack.push(result);
            steps.push({ symbol: symbol, stack: stack.slice() });
        }
    }

    // Step 4: Set result = stack's top elements
    let result = stack.pop();
    
    // Step 5: Exit
    displayResults(result, steps);
}

// Helper function to check if a character is an operand
function isOperand(symbol) {
    return /^[0-9]$/.test(symbol);
}

// Helper function to check if a character is an operator
function isOperator(symbol) {
    return /[\+\-\*\/\^]$/.test(symbol);
}

// Helper function to evaluate expression based on operator
function evaluate(operandA, operandB, operator) {
    switch (operator) {
        case '+':
            return parseInt(operandA) + parseInt(operandB);
        case '-':
            return parseInt(operandA) - parseInt(operandB);
        case '*':
            return parseInt(operandA) * parseInt(operandB);
        case '/':
            return parseInt(operandA) / parseInt(operandB);
        case '^':
            return Math.pow(parseInt(operandA), parseInt(operandB));
        default:
            return 0;
    }
}

// Function to display results and steps in the HTML table
function displayResults(result, steps) {
    let table = document.getElementById("evaluationTable");
    table.innerHTML = ''; // Clear previous content

    // Add table headers
    let headerRow = table.insertRow(0);
    let symbolHeader = headerRow.insertCell(0);
    let stackHeader = headerRow.insertCell(1);
    symbolHeader.innerHTML = "<b>Symbol</b>";
    stackHeader.innerHTML = "<b>Stack</b>";

    // Add steps to the table
    for (let i = 0; i < steps.length; i++) {
        let row = table.insertRow(i + 1);
        let symbolCell = row.insertCell(0);
        let stackCell = row.insertCell(1);
        symbolCell.innerHTML = steps[i].symbol;
        stackCell.innerHTML = steps[i].stack.join(', ');
    }

    // Display result
    let resultDiv = document.getElementById("evaluatedExpression");
    resultDiv.innerHTML = "<b>Result:</b> " + result;
}


