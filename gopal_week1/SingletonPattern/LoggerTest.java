package gopal_week1.SingletonPattern;
public class LoggerTest {

    public static void main(String[] args) {

        Logger logger1 = Logger.getInstance();
        logger1.log("Application started.");

        Logger logger2 = Logger.getInstance();
        logger2.warn("This is a warning message.");

        if (logger1 == logger2) {
            System.out.println("\nSingleton works! Both logger1 and logger2 are the SAME instance.");
        } else {
            System.out.println("\nSingleton FAILED! Different instances were created.");
        }

        System.out.println("logger1 hashCode: " + logger1.hashCode());
        System.out.println("logger2 hashCode: " + logger2.hashCode());

        logger1.error("Something went wrong!");
    }
}
