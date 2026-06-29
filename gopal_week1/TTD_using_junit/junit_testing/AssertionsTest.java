package gopal_week1.TTD_using_junit.junit_testing;

import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;

public class AssertionsTest {

    @Before
    public void setUp() {
        System.out.println("--- Test Started ---");
    }

    @After
    public void tearDown() {
        System.out.println("--- Test Completed ---\n");
    }

    @Test
    public void testAssertions() {

        // 1. Assert Equals - checks if two values are equal
        assertEquals(5, 2 + 3);
        System.out.println("assertEquals PASSED : 2 + 3 = 5");

        // 2. Assert True - checks if condition is true
        assertTrue(5 > 3);
        System.out.println("assertTrue PASSED   : 5 > 3 is true");

        // 3. Assert False - checks if condition is false
        assertFalse(5 < 3);
        System.out.println("assertFalse PASSED  : 5 < 3 is false");

        // 4. Assert Null - checks if object is null
        assertNull(null);
        System.out.println("assertNull PASSED   : object is null");

        // 5. Assert Not Null - checks if object is not null
        assertNotNull(new Object());
        System.out.println("assertNotNull PASSED: object is not null");

        // 6. Assert Array Equals - checks if two arrays are equal
        int[] expected = {1, 2, 3};
        int[] actual   = {1, 2, 3};
        assertArrayEquals(expected, actual);
        System.out.println("assertArrayEquals PASSED: arrays are equal");

        // 7. Assert Same - checks if two references point to same object
        String str = "JUnit";
        assertSame(str, str);
        System.out.println("assertSame PASSED   : same object reference");

        // 8. Assert Not Same - checks if two references are different objects
        String s1 = new String("hello");
        String s2 = new String("hello");
        assertNotSame(s1, s2);
        System.out.println("assertNotSame PASSED: different object references");
    }
}