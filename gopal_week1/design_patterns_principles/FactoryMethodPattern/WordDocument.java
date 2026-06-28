

package gopal_week1.design_patterns_principles.FactoryMethodPattern;

public class WordDocument implements Document {

    @Override
    public void open() {
        System.out.println("[Word] Opening Word Document (.docx)...");
    }

    @Override
    public void save() {
        System.out.println("[Word] Saving Word Document (.docx)...");
    }

    @Override
    public void close() {
        System.out.println("[Word] Closing Word Document (.docx)...");
    }
}