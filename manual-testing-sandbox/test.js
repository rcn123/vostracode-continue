class Calculator {
  constructor() {
    this.result = 0;
  }

  add(number) {
    this.result += number;
    return this;
  }

  subtract(number) {
    this.result -= number; // Fixed the subtraction method
    return this;
  }

  multiply(number) {
    this.result *= number;
    return this;
  }

  divide(number) {
    if (number === 0) {
      throw new Error("Cannot divide by zero");
    }
    this.result /= number;
    return this;
  }

  getResult() {
    return this.result;
  }

  reset() {
    this.result = 0;
    return this;
  }

  average(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
      throw new Error("Input must be a non-empty array of numbers");
    }
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    this.result = sum / numbers.length;
    return this;
  }
}
