#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations:
//  - add (addition)
//  - sub (subtraction)
//  - mul (multiplication)
//  - div (division)
// Usage examples:
//   node src/calculator.js add 2 3    # 5
//   node src/calculator.js div 10 2   # 5
// The script accepts two numeric operands and a command for the operation.

function showHelp() {
  console.log(`Usage: calculator <operation> <a> <b>\n\nOperations:\n  add    Add a and b\n  sub    Subtract b from a\n  mul    Multiply a and b\n  div    Divide a by b\n\nExamples:\n  node src/calculator.js add 2 3\n  node src/calculator.js sub 5 2\n`);
}

const args = process.argv.slice(2);
if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  showHelp();
  process.exit(args.length === 0 ? 1 : 0);
}

if (args.length < 3) {
  console.error('Error: missing arguments. Expected: <operation> <a> <b>');
  showHelp();
  process.exit(2);
}

const [op, aStr, bStr] = args;
const a = Number(aStr);
const b = Number(bStr);

if (!Number.isFinite(a) || !Number.isFinite(b)) {
  console.error('Error: operands must be valid numbers.');
  process.exit(3);
}

let result;
switch (op.toLowerCase()) {
  case 'add':
  case '+':
    result = a + b;
    break;
  case 'sub':
  case '-':
    result = a - b;
    break;
  case 'mul':
  case '*':
  case 'x':
  case 'X':
    result = a * b;
    break;
  case 'div':
  case '/':
    if (b === 0) {
      console.error('Error: division by zero');
      process.exit(4);
    }
    result = a / b;
    break;
  default:
    console.error(`Error: unknown operation '${op}'.`);
    showHelp();
    process.exit(5);
}

// Print the result to stdout
if (Number.isFinite(result)) {
  // For clean output, use the native string conversion
  console.log(result);
  process.exit(0);
} else {
  console.error('Error: result is not a finite number');
  process.exit(6);
}
