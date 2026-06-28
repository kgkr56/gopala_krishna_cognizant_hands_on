package gopal_week1.design_patterns_principles.FactoryMethodPattern;

public class ExcelDocument implements Document {

    @Override
    public void open() {
        System.out.println("[Excel] Opening Excel Document (.xlsx)...");
    }

    @Override
    public void save() {
        System.out.println("[Excel] Saving Excel Document (.xlsx)...");
    }

    @Override
    public void close() {
        System.out.println("[Excel] Closing Excel Document (.xlsx)...");
    }
}
