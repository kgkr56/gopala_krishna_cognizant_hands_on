package gopal_week1.design_patterns_principles.FactoryMethodPattern;

public class DocumentFactoryTest {

    public static void main(String[] args) {

        System.out.println("=== Factory Method Pattern - Document Management System ===\n");

        // Word Document
        System.out.println("--- Word Document ---");
        DocumentFactory wordFactory = new WordDocumentFactory();
        wordFactory.openDocument();

        System.out.println();

        // PDF Document
        System.out.println("--- PDF Document ---");
        DocumentFactory pdfFactory = new PdfDocumentFactory();
        pdfFactory.openDocument();

        System.out.println();

        // Excel Document
        System.out.println("--- Excel Document ---");
        DocumentFactory excelFactory = new ExcelDocumentFactory();
        excelFactory.openDocument();

        System.out.println();
        System.out.println("=== All documents created successfully using Factory Method! ===");
    }
}
