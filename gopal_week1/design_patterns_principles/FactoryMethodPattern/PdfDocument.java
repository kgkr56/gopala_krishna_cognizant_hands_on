package gopal_week1.design_patterns_principles.FactoryMethodPattern;


public class PdfDocument implements Document {

    @Override
    public void open() {
        System.out.println("[PDF] Opening PDF Document (.pdf)...");
    }

    @Override
    public void save() {
        System.out.println("[PDF] Saving PDF Document (.pdf)...");
    }

    @Override
    public void close() {
        System.out.println("[PDF] Closing PDF Document (.pdf)...");
    }
}

