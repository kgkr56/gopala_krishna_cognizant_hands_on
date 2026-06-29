
package gopal_week1.TTD_using_junit.junit_testing;

import static org.mockito.Mockito.*;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.After;
import org.junit.Test;
import org.mockito.Mockito;

public class MyServiceTest {

    private ExternalApi mockApi;
    private MyService   service;

    @Before
    public void setUp() {
        // Step 1: Create mock object for ExternalApi
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
    // Test 1: Stub getData() to return predefined value
    // ============================================================
    @Test
    public void testExternalApi() {
        // Step 2: Stub the method to return predefined value
        when(mockApi.getData()).thenReturn("Mock Data");

        // Step 3: Use mock in the service
        String result = service.fetchData();

        // Assert
        assertEquals("Mock Data", result);
        System.out.println("[Mock] testExternalApi     : result = " + result + " PASSED");

        // Verify the method was called exactly once
        verify(mockApi, times(1)).getData();
        System.out.println("[Mock] verify getData()    : called 1 time PASSED");
    }

    // ============================================================
    // Test 2: Stub getUserById() with parameter
    // ============================================================
    @Test
    public void testGetUserById() {
        // Stub with specific parameter
        when(mockApi.getUserById(101)).thenReturn("Gopal Krishna");
        when(mockApi.getUserById(102)).thenReturn("Ramesh Kumar");

        String user1 = service.fetchUserById(101);
        String user2 = service.fetchUserById(102);

        assertEquals("Gopal Krishna", user1);
        assertEquals("Ramesh Kumar",  user2);
        System.out.println("[Mock] testGetUserById     : user1 = " + user1 + " PASSED");
        System.out.println("[Mock] testGetUserById     : user2 = " + user2 + " PASSED");
    }

    // ============================================================
    // Test 3: Stub isServiceAvailable() to return true
    // ============================================================
    @Test
    public void testServiceAvailable() {
        when(mockApi.isServiceAvailable()).thenReturn(true);

        String status = service.checkServiceStatus();

        assertEquals("Service is UP", status);
        System.out.println("[Mock] testServiceAvailable: status = " + status + " PASSED");
    }

    // ============================================================
    // Test 4: Stub isServiceAvailable() to return false
    // ============================================================
    @Test
    public void testServiceDown() {
        when(mockApi.isServiceAvailable()).thenReturn(false);

        String status = service.checkServiceStatus();

        assertEquals("Service is DOWN", status);
        System.out.println("[Mock] testServiceDown     : status = " + status + " PASSED");
    }
}