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

function showHelp() {
  console.log(`Usage: calculator <operation> <a> <b>\n\nOperations:\n  add    Add a and b\n  sub    Subtract b from a\n  mul    Multiply a and b\n  div    Divide a by b\n\nExamples:\n  node src/calculator.js add 2 3\n  node src/calculator.js sub 5 2\n`);
}

// CLI entrypoint: run only when executed directly
if (require.main === module) {
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
module.exports = { add, sub, mul, div };
