
package gopal_week1.junit_testing;

import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;

// Step 3: JUnit Test Class
public class CalculatorTest {

    private Calculator calculator;

    // Runs before each test
    @Before
    public void setUp() {
        calculator = new Calculator();
        System.out.println("--- Test Started ---");
    }

    // Runs after each test
    @After
    public void tearDown() {
        System.out.println("--- Test Completed ---\n");
    }

    // Test addition
    @Test
    public void testAdd() {
        int result = calculator.add(10, 5);
        System.out.println("testAdd: 10 + 5 = " + result);
        assertEquals("Addition failed!", 15, result);
    }

    // Test subtraction
    @Test
    public void testSubtract() {
        int result = calculator.subtract(10, 5);
        System.out.println("testSubtract: 10 - 5 = " + result);
        assertEquals("Subtraction failed!", 5, result);
    }

    // Test multiplication
    @Test
    public void testMultiply() {
        int result = calculator.multiply(10, 5);
        System.out.println("testMultiply: 10 * 5 = " + result);
        assertEquals("Multiplication failed!", 50, result);
    }

    // Test division
    @Test
    public void testDivide() {
        double result = calculator.divide(10, 5);
        System.out.println("testDivide: 10 / 5 = " + result);
        assertEquals("Division failed!", 2.0, result, 0.001);
    }

    // Test divide by zero throws exception
    @Test(expected = ArithmeticException.class)
    public void testDivideByZero() {
        System.out.println("testDivideByZero: dividing by 0...");
        calculator.divide(10, 0);
    }
}