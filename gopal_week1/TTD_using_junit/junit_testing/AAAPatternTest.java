
package gopal_week1.TTD_using_junit.junit_testing;

import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import org.junit.BeforeClass;
import org.junit.AfterClass;
import static org.junit.Assert.*;

public class AAAPatternTest {

    private Calculator calculator;

    // ============================================================
    // Runs ONCE before all tests in this class
    // ============================================================
    @BeforeClass
    public static void initClass() {
        System.out.println("========================================");
        System.out.println("   AAA Pattern Test Suite Started");
        System.out.println("========================================\n");
    }

    // ============================================================
    // Runs before EACH test - Setup/Fixture
    // ============================================================
    @Before
    public void setUp() {
        calculator = new Calculator();  // Arrange - fresh instance each time
        System.out.println("--- [Setup] Calculator initialized ---");
    }

    // ============================================================
    // Runs after EACH test - Teardown
    // ============================================================
    @After
    public void tearDown() {
        calculator = null;  // release resource
        System.out.println("--- [Teardown] Calculator destroyed ---\n");
    }

    // ============================================================
    // Runs ONCE after all tests in this class
    // ============================================================
    @AfterClass
    public static void cleanUpClass() {
        System.out.println("========================================");
        System.out.println("   AAA Pattern Test Suite Completed");
        System.out.println("========================================");
    }

    // ============================================================
    // Test 1: Addition using AAA Pattern
    // ============================================================
    @Test
    public void testAdd() {
        // Arrange
        int a = 10, b = 5;

        // Act
        int result = calculator.add(a, b);

        // Assert
        assertEquals(15, result);
        System.out.println("[AAA] testAdd        : " + a + " + " + b + " = " + result + " PASSED");
    }

    // ============================================================
    // Test 2: Subtraction using AAA Pattern
    // ============================================================
    @Test
    public void testSubtract() {
        // Arrange
        int a = 10, b = 3;

        // Act
        int result = calculator.subtract(a, b);

        // Assert
        assertEquals(7, result);
        System.out.println("[AAA] testSubtract   : " + a + " - " + b + " = " + result + " PASSED");
    }

    // ============================================================
    // Test 3: Multiplication using AAA Pattern
    // ============================================================
    @Test
    public void testMultiply() {
        // Arrange
        int a = 4, b = 5;

        // Act
        int result = calculator.multiply(a, b);

        // Assert
        assertEquals(20, result);
        System.out.println("[AAA] testMultiply   : " + a + " * " + b + " = " + result + " PASSED");
    }

    // ============================================================
    // Test 4: Division using AAA Pattern
    // ============================================================
    @Test
    public void testDivide() {
        // Arrange
        int a = 20, b = 4;

        // Act
        double result = calculator.divide(a, b);

        // Assert
        assertEquals(5.0, result, 0.001);
        System.out.println("[AAA] testDivide     : " + a + " / " + b + " = " + result + " PASSED");
    }

    // ============================================================
    // Test 5: Divide by Zero Exception using AAA Pattern
    // ============================================================
    @Test(expected = ArithmeticException.class)
    public void testDivideByZero() {
        // Arrange
        int a = 10, b = 0;

        // Act & Assert
        calculator.divide(a, b);
        System.out.println("[AAA] testDivideByZero: Exception thrown PASSED");
    }
}
