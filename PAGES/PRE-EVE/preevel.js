function goToHome() {
    window.location.href = "/index.html";
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


// Function to evaluate prefix expression
function evaluateExpression() {
    // Step 1: Get Prefix expression
    let prefixExpression = document.getElementById("prefixInput").value;
    let stack = [];
    let steps = [];

    // Step 2: Repeat until all characters in the prefix expression have been scanned
    for (let i = prefixExpression.length - 1; i >= 0; i--) {
        let symbol = prefixExpression[i];

        // Step 2b: If the read character is an operand, push it on the stack
        if (isOperand(symbol)) {
            stack.push(symbol);
            steps.push({ symbol: symbol, stack: stack.slice() });
        }
        // Step 2c: If the read character is an operator
        else if (isOperator(symbol)) {
            // Step 2c(i): Pop two values from the stack
            let operandA = stack.pop();
            let operandB = stack.pop();
            // Step 2c(ii): Apply the operation on the operands
            let result = evaluate(operandA, operandB, symbol);
            // Step 2c(iii): Push the result onto the stack
            stack.push(result);
            steps.push({ symbol: symbol, stack: stack.slice() });
        }
    }

    // Result is the final value on the stack
    let result = stack.pop();
    
    // Display results and steps
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



