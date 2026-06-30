package gopal_week1.data_structures_algorithms.FinancialForecasting;

public class FinancialForecastTest {

    public static void main(String[] args) {

        // ============================================================
        // Step 1: Recursion Explanation
        // ============================================================
        System.out.println("=================================================");
        System.out.println("       Financial Forecasting Tool");
        System.out.println("=================================================");
        System.out.println("Recursion Concept:");
        System.out.println("  Recursion solves a problem by breaking it into");
        System.out.println("  smaller sub-problems of the same type.");
        System.out.println("  Each call solves one year's growth and passes");
        System.out.println("  the result to the next year until year 0.");
        System.out.println("  Base Case  : years == 0, return present value");
        System.out.println("  Recursive  : futureValue(PV * (1+r), r, n-1)");
        System.out.println("=================================================\n");

        // ============================================================
        // Input Values
        // ============================================================
        double presentValue = 10000.0;   // Initial investment: ₹10,000
        double growthRate   = 0.08;      // 8% annual growth rate
        int    years        = 5;         // Forecast for 5 years

        System.out.println("Initial Investment : ₹" + presentValue);
        System.out.println("Annual Growth Rate : " + (growthRate * 100) + "%");
        System.out.println("Forecast Period    : " + years + " years\n");

        // ============================================================
        // Step 3: Simple Recursive Calculation
        // ============================================================
        System.out.println("--- Simple Recursive Forecast ---");
        for (int i = 1; i <= years; i++) {
            double value = FinancialForecast.calculateFutureValueRecursive(presentValue, growthRate, i);
            System.out.printf("  Year %d : ₹%.2f%n", i, value);
        }

        double finalValue = FinancialForecast.calculateFutureValueRecursive(presentValue, growthRate, years);
        System.out.printf("%nFinal Value after %d years : ₹%.2f%n", years, finalValue);

        // ============================================================
        // Step 4: Memoized Recursive Calculation
        // ============================================================
        System.out.println("\n--- Memoized Recursive Forecast (Optimized) ---");
        FinancialForecast.clearMemo();
        double memoValue = FinancialForecast.calculateFutureValueMemoized(presentValue, growthRate, years);
        System.out.printf("%nFinal Value (Memoized) after %d years : ₹%.2f%n", years, memoValue);

        // ============================================================
        // Step 4: Analysis
        // ============================================================
        System.out.println("\n=================================================");
        System.out.println("  Time Complexity Analysis");
        System.out.println("=================================================");
        System.out.println("Simple Recursion:");
        System.out.println("  Time  : O(n) - one call per year");
        System.out.println("  Space : O(n) - call stack grows with years");
        System.out.println("  Risk  : StackOverflow for very large n");
        System.out.println();
        System.out.println("Memoized Recursion:");
        System.out.println("  Time  : O(n) - each year computed only once");
        System.out.println("  Space : O(n) - HashMap stores computed results");
        System.out.println("  Benefit: Avoids redundant computation on");
        System.out.println("           overlapping sub-problems");
        System.out.println();
        System.out.println("Optimization Tip:");
        System.out.println("  For very large n, use an iterative approach");
        System.out.println("  to avoid call stack overflow entirely.");
        System.out.println("=================================================");
    }
}

