
package gopal_week1.TTD_using_junit.junit_testing;

// External API interface - simulates a real external service
public interface ExternalApi {
    String getData();
    String getUserById(int id);
    boolean isServiceAvailable();
}