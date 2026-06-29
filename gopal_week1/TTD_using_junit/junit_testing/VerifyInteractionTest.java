
package gopal_week1.TTD_using_junit.junit_testing;

import static org.mockito.Mockito.*;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.After;
import org.junit.Test;
import org.mockito.Mockito;

public class VerifyInteractionTest {

    private ExternalApi mockApi;
    private MyService   service;

    @Before
    public void setUp() {
        // Step 1: Create mock object
        mockApi = Mockito.mock(ExternalApi.class);
        service = new MyService(mockApi);
        System.out.println("--- [Setup] Mock object created ---");
    }

    @After
    public void tearDown() {
        mockApi = null;
        service = null;
        System.out.println("--- [Teardown] Mock object destroyed ---\n");
    }

    // ============================================================
    // Test 1: Verify getData() is called once
    // ============================================================
    @Test
    public void testVerifyInteraction() {
        // Step 2: Call the method
        when(mockApi.getData()).thenReturn("Mock Data");
        service.fetchData();

        // Step 3: Verify the interaction
        verify(mockApi).getData();
        System.out.println("[Verify] testVerifyInteraction : getData() called PASSED");
    }

    // ============================================================
    // Test 2: Verify method called exact number of times
    // ============================================================
    @Test
    public void testVerifyCalledTimes() {
        when(mockApi.getData()).thenReturn("Mock Data");

        // Call fetchData 3 times
        service.fetchData();
        service.fetchData();
        service.fetchData();

        // Verify called exactly 3 times
        verify(mockApi, times(3)).getData();
        System.out.println("[Verify] testVerifyCalledTimes : getData() called 3 times PASSED");
    }

    // ============================================================
    // Test 3: Verify method never called
    // ============================================================
    @Test
    public void testVerifyNeverCalled() {
        // Don't call fetchData()
        verify(mockApi, never()).getData();
        System.out.println("[Verify] testVerifyNeverCalled : getData() never called PASSED");
    }

    // ============================================================
    // Test 4: Verify method called with specific argument
    // ============================================================
    @Test
    public void testVerifyWithArgument() {
        when(mockApi.getUserById(101)).thenReturn("Gopal Krishna");

        service.fetchUserById(101);

        // Verify called with specific argument 101
        verify(mockApi).getUserById(101);
        System.out.println("[Verify] testVerifyWithArgument: getUserById(101) called PASSED");
    }

    // ============================================================
    // Test 5: Verify at least once
    // ============================================================
    @Test
    public void testVerifyAtLeastOnce() {
        when(mockApi.getData()).thenReturn("Mock Data");

        service.fetchData();
        service.fetchData();

        // Verify called at least once
        verify(mockApi, atLeastOnce()).getData();
        System.out.println("[Verify] testVerifyAtLeastOnce : getData() called at least once PASSED");
    }
}