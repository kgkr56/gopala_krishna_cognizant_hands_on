
package gopal_week1.TTD_using_junit.junit_testing;

// Service class that depends on ExternalApi
public class MyService {

    private ExternalApi externalApi;

    // Constructor injection
    public MyService(ExternalApi externalApi) {
        this.externalApi = externalApi;
    }

    public String fetchData() {
        return externalApi.getData();
    }

    public String fetchUserById(int id) {
        return externalApi.getUserById(id);
    }

    public String checkServiceStatus() {
        if (externalApi.isServiceAvailable()) {
            return "Service is UP";
        } else {
            return "Service is DOWN";
        }
    }
}