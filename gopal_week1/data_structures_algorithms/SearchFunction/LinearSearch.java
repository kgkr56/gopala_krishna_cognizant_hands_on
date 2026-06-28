package gopal_week1.data_structures_algorithms.SearchFunction;


public class LinearSearch {

    // Search by productId
    public static Product linearSearchById(Product[] products, int targetId) {
        for (int i = 0; i < products.length; i++) {         // O(n) - worst case checks all elements
            if (products[i].getProductId() == targetId) {
                System.out.println("  [Linear Search] Found at index: " + i);
                return products[i];
            }
        }
        return null; // Not found
    }

    // Search by productName
    public static Product linearSearchByName(Product[] products, String targetName) {
        for (int i = 0; i < products.length; i++) {
            if (products[i].getProductName().equalsIgnoreCase(targetName)) {
                System.out.println("  [Linear Search] Found at index: " + i);
                return products[i];
            }
        }
        return null; // Not found
    }
}
