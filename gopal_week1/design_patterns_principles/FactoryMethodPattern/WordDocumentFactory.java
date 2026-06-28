package gopal_week1.design_patterns_principles.FactoryMethodPattern;

public class WordDocumentFactory extends DocumentFactory {

    @Override
    public Document createDocument() {
        System.out.println("Factory: Creating a Word Document...");
        return new WordDocument();
    }
}