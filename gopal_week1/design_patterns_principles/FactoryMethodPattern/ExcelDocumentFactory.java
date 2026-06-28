package gopal_week1.design_patterns_principles.FactoryMethodPattern;

public class ExcelDocumentFactory extends DocumentFactory {

    @Override
    public Document createDocument() {
        System.out.println("Factory: Creating an Excel Document...");
        return new ExcelDocument();
    }
}
