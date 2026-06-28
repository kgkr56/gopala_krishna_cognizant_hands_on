package gopal_week1.data_structures_algorithms.SearchFunction;


public class BinarySearch {

    public static Product binarySearchById(Product[] sortedProducts, int targetId) {
        int low = 0;
        int high = sortedProducts.length - 1;
        int steps = 0;

        while (low <= high) {
            steps++;
            int mid = (low + high) / 2;
            int midId = sortedProducts[mid].getProductId();

            if (midId == targetId) {
                System.out.println("  [Binary Search] Found at index: " + mid + " in " + steps + " step(s)");
                return sortedProducts[mid];
            } else if (midId < targetId) {
                low = mid + 1;   // Search right half
            } else {
                high = mid - 1;  // Search left half
            }
        }
        return null; // Not found
    }
}
