package gopal_week1.design_patterns_principles.FactoryMethodPattern;

public abstract class DocumentFactory {

    // Factory Method - subclasses will override this
    public abstract Document createDocument();

    // Common workflow using the factory method
    public void openDocument() {
        Document doc = createDocument();
        doc.open();
        doc.save();
        doc.close();
    }
}
