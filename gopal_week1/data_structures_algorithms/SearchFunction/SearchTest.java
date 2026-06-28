package gopal_week1.data_structures_algorithms.SearchFunction;


public class SearchTest {

    public static void main(String[] args) {

        // ============================================================
        // Step 1: Big O Notation Explanation (printed at runtime)
        // ============================================================
        System.out.println("=================================================");
        System.out.println("  Big O Notation - Search Algorithm Analysis");
        System.out.println("=================================================");
        System.out.println("Linear Search:");
        System.out.println("  Best Case   : O(1)  - element found at index 0");
        System.out.println("  Average Case: O(n)  - element found in the middle");
        System.out.println("  Worst Case  : O(n)  - element at last index or not found");
        System.out.println();
        System.out.println("Binary Search (requires sorted array):");
        System.out.println("  Best Case   : O(1)     - element is the middle element");
        System.out.println("  Average Case: O(log n) - eliminates half each step");
        System.out.println("  Worst Case  : O(log n) - element not found after log n steps");
        System.out.println("=================================================\n");

        // ============================================================
        // Step 2: Setup - Products array (unsorted for linear search)
        // ============================================================
        Product[] products = {
            new Product(105, "Laptop",      "Electronics"),
            new Product(102, "Headphones",  "Electronics"),
            new Product(108, "Desk Chair",  "Furniture"),
            new Product(101, "Smartphone",  "Electronics"),
            new Product(110, "Bookshelf",   "Furniture"),
            new Product(103, "Keyboard",    "Electronics"),
            new Product(107, "Monitor",     "Electronics"),
            new Product(104, "Mouse",       "Electronics"),
            new Product(106, "Webcam",      "Electronics"),
            new Product(109, "Study Table", "Furniture")
        };

        // Sorted array for binary search (sorted by productId)
        Product[] sortedProducts = {
            new Product(101, "Smartphone",  "Electronics"),
            new Product(102, "Headphones",  "Electronics"),
            new Product(103, "Keyboard",    "Electronics"),
            new Product(104, "Mouse",       "Electronics"),
            new Product(105, "Laptop",      "Electronics"),
            new Product(106, "Webcam",      "Electronics"),
            new Product(107, "Monitor",     "Electronics"),
            new Product(108, "Desk Chair",  "Furniture"),
            new Product(109, "Study Table", "Furniture"),
            new Product(110, "Bookshelf",   "Furniture")
        };

        int searchId = 107;
        System.out.println("Searching for Product ID: " + searchId + "\n");

        // ============================================================
        // Linear Search
        // ============================================================
        System.out.println("--- Linear Search ---");
        long startTime = System.nanoTime();
        Product linearResult = LinearSearch.linearSearchById(products, searchId);
        long linearTime = System.nanoTime() - startTime;

        if (linearResult != null)
            System.out.println("  Result : " + linearResult);
        else
            System.out.println("  Product not found.");
        System.out.println("  Time   : " + linearTime + " ns\n");

        // ============================================================
        // Binary Search
        // ============================================================
        System.out.println("--- Binary Search ---");
        startTime = System.nanoTime();
        Product binaryResult = BinarySearch.binarySearchById(sortedProducts, searchId);
        long binaryTime = System.nanoTime() - startTime;

        if (binaryResult != null)
            System.out.println("  Result : " + binaryResult);
        else
            System.out.println("  Product not found.");
        System.out.println("  Time   : " + binaryTime + " ns\n");

        // ============================================================
        // Step 4: Analysis
        // ============================================================
        System.out.println("=================================================");
        System.out.println("  Analysis & Conclusion");
        System.out.println("=================================================");
        System.out.println("Linear Search : O(n)      - suitable for small/unsorted data");
        System.out.println("Binary Search : O(log n)  - suitable for large/sorted data");
        System.out.println();
        System.out.println("Recommendation for E-commerce Platform:");
        System.out.println("  Use BINARY SEARCH - products can be pre-sorted by ID,");
        System.out.println("  and O(log n) is far faster than O(n) for large catalogs.");
        System.out.println("=================================================");
    }
}
