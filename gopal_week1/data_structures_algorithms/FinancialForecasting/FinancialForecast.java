package gopal_week1.data_structures_algorithms.FinancialForecasting;


import java.util.HashMap;
import java.util.Map;

public class FinancialForecast {

    // ============================================================
    // Step 2 & 3: Recursive method to calculate future value
    // Formula: FutureValue = PresentValue * (1 + growthRate)^years
    // ============================================================

    // Simple Recursive Approach - O(n) time, O(n) space (call stack)
    public static double calculateFutureValueRecursive(double presentValue, double growthRate, int years) {
        // Base case: no more years to calculate
        if (years == 0) {
            return presentValue;
        }
        // Recursive case: apply growth rate for one year and recurse
        return calculateFutureValueRecursive(presentValue * (1 + growthRate), growthRate, years - 1);
    }

    // ============================================================
    // Step 4: Optimized using Memoization to avoid recomputation
    // Stores already-computed values to avoid redundant recursion
    // ============================================================
    private static Map<Integer, Double> memo = new HashMap<>();

    public static double calculateFutureValueMemoized(double presentValue, double growthRate, int years) {
        // Base case
        if (years == 0) {
            return presentValue;
        }
        // Check if already computed
        if (memo.containsKey(years)) {
            System.out.println("  [Memo] Using cached value for year " + years);
            return memo.get(years);
        }
        // Compute and store in memo
        double result = calculateFutureValueMemoized(presentValue * (1 + growthRate), growthRate, years - 1)
                        * (1 + growthRate);
        memo.put(years, result);
        return result;
    }

    // Clear memo for fresh calculations
    public static void clearMemo() {
        memo.clear();
    }
}
