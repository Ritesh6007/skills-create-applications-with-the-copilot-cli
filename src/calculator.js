#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations:
//  - add (addition)
//  - sub (subtraction)
//  - mul (multiplication)
//  - div (division)
//  - mod (modulo / remainder)
//  - pow (exponentiation / power)
//  - sqrt (square root)
// Usage examples:
//   node src/calculator.js add 2 3    # 5
//   node src/calculator.js div 10 2   # 5
//   node src/calculator.js mod 10 3   # 1
//   node src/calculator.js pow 2 8    # 256
//   node src/calculator.js sqrt 9     # 3
// The script accepts numeric operands and a command for the operation.

function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}

function div(a, b) {
  if (b === 0) throw new Error('division by zero');
  return a / b;
}

// Returns the remainder of a divided by b
function modulo(a, b) {
  if (b === 0) throw new Error('modulo by zero');
  return a % b;
}

// Returns base raised to exponent
function power(base, exponent) {
  return Math.pow(base, exponent);
}

// Returns the square root of n, errors on negative input
function squareRoot(n) {
  if (n < 0) throw new Error('square root of negative number');
  return Math.sqrt(n);
}

function showHelp() {
  console.log(`Usage: calculator <operation> <a> <b?>\n\nOperations:\n  add    Add a and b\n  sub    Subtract b from a\n  mul    Multiply a and b\n  div    Divide a by b\n  mod    Remainder of a / b\n  pow    base raised to exponent\n  sqrt   Square root of a (single operand)\n\nExamples:\n  node src/calculator.js add 2 3\n  node src/calculator.js mod 10 3\n  node src/calculator.js pow 2 8\n  node src/calculator.js sqrt 9\n`);
}

// CLI entrypoint: run only when executed directly
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showHelp();
    process.exit(args.length === 0 ? 1 : 0);
  }

  const op = args[0];

  // sqrt is a single-operand command; others require two operands
  const needsTwoOperands = !['sqrt'].includes(op.toLowerCase());
  if (needsTwoOperands && args.length < 3) {
    console.error('Error: missing arguments. Expected: <operation> <a> <b>');
    showHelp();
    process.exit(2);
  }

  // Parse numbers depending on operation
  let a, b;
  if (op.toLowerCase() === 'sqrt') {
    a = Number(args[1]);
    if (!Number.isFinite(a)) {
      console.error('Error: operand must be a valid number.');
      process.exit(3);
    }
  } else {
    a = Number(args[1]);
    b = Number(args[2]);
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      console.error('Error: operands must be valid numbers.');
      process.exit(3);
    }
  }

  let result;
  try {
    switch (op.toLowerCase()) {
      case 'add':
      case '+':
        result = add(a, b);
        break;
      case 'sub':
      case '-':
        result = sub(a, b);
        break;
      case 'mul':
      case '*':
      case 'x':
      case 'X':
        result = mul(a, b);
        break;
      case 'div':
      case '/':
        result = div(a, b);
        break;
      case 'mod':
      case '%':
      case 'modulo':
        result = modulo(a, b);
        break;
      case 'pow':
      case '^':
      case 'power':
        result = power(a, b);
        break;
      case 'sqrt':
        result = squareRoot(a);
        break;
      default:
        console.error(`Error: unknown operation '${op}'.`);
        showHelp();
        process.exit(5);
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(4);
  }

  if (Number.isFinite(result)) {
    console.log(result);
    process.exit(0);
  } else {
    console.error('Error: result is not a finite number');
    process.exit(6);
  }
}

// Export functions for testing
module.exports = { add, sub, mul, div, modulo, power, squareRoot };
