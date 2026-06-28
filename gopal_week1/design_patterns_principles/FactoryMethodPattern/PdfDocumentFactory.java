package gopal_week1.design_patterns_principles.FactoryMethodPattern;

public class PdfDocumentFactory extends DocumentFactory {

    @Override
    public Document createDocument() {
        System.out.println("Factory: Creating a PDF Document...");
        return new PdfDocument();
    }
}
