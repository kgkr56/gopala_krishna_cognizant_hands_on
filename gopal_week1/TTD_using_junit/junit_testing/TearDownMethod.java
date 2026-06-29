
package gopal_week1.TTD_using_junit.junit_testing;

import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import org.junit.BeforeClass;
import org.junit.AfterClass;
import static org.junit.Assert.*;

public class TearDownMethod {

    private Calculator calculator;

    @BeforeClass
    public static void initClass() {
        System.out.println("========================================");
        System.out.println("   TearDown Method Test Suite Started");
        System.out.println("========================================\n");
    }

    @Before
    public void setUp() {
        calculator = new Calculator();
        System.out.println("--- [Setup] Calculator initialized ---");
    }

    @After
    public void tearDown() {
        calculator = null;
        System.out.println("--- [Teardown] Calculator destroyed ---\n");
    }

    @AfterClass
    public static void cleanUpClass() {
        System.out.println("========================================");
        System.out.println("   TearDown Method Test Suite Completed");
        System.out.println("========================================");
    }

    @Test
    public void testAdd() {
        int result = calculator.add(10, 5);
        assertEquals(15, result);
        System.out.println("[Test] testAdd: 10 + 5 = " + result + " PASSED");
    }

    @Test
    public void testSubtract() {
        int result = calculator.subtract(10, 3);
        assertEquals(7, result);
        System.out.println("[Test] testSubtract: 10 - 3 = " + result + " PASSED");
    }

    @Test
    public void testMultiply() {
        int result = calculator.multiply(4, 5);
        assertEquals(20, result);
        System.out.println("[Test] testMultiply: 4 * 5 = " + result + " PASSED");
    }

    @Test
    public void testDivide() {
        double result = calculator.divide(20, 4);
        assertEquals(5.0, result, 0.001);
        System.out.println("[Test] testDivide: 20 / 4 = " + result + " PASSED");
    }
}