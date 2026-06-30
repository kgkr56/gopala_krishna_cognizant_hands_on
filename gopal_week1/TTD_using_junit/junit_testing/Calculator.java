package gopal_week1.TTD_using_junit.junit_testing;


public class Calculator {

    // Add two numbers
    public int add(int a, int b) {
        return a + b;
    }

    // Subtract two numbers
    public int subtract(int a, int b) {
        return a - b;
    }

    // Multiply two numbers
    public int multiply(int a, int b) {
        return a * b;
    }

    // Divide two numbers
    public double divide(int a, int b) {
        if (b == 0) {
            throw new ArithmeticException("Cannot divide by zero!");
        }
        return (double) a / b;
    }
}