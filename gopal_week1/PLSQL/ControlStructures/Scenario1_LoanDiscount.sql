-- ============================================================
-- Scenario 1: Apply 1% discount on loan interest rates
--             for customers above 60 years old
-- ============================================================

-- Table Setup (run once to create tables)
CREATE TABLE Customers (
    CustomerID   NUMBER PRIMARY KEY,
    CustomerName VARCHAR2(100),
    Age          NUMBER,
    Balance      NUMBER,
    IsVIP        VARCHAR2(5) DEFAULT 'FALSE'
);

CREATE TABLE Loans (
    LoanID       NUMBER PRIMARY KEY,
    CustomerID   NUMBER REFERENCES Customers(CustomerID),
    InterestRate NUMBER,
    DueDate      DATE
);

-- Sample Data
INSERT INTO Customers VALUES (1, 'Gopal Krishna', 65, 15000, 'FALSE');
INSERT INTO Customers VALUES (2, 'Ramesh Kumar',  45, 8000,  'FALSE');
INSERT INTO Customers VALUES (3, 'Suresh Babu',   70, 5000,  'FALSE');
INSERT INTO Customers VALUES (4, 'Anitha Devi',   30, 20000, 'FALSE');
INSERT INTO Customers VALUES (5, 'Vijay Mohan',   62, 3000,  'FALSE');

INSERT INTO Loans VALUES (101, 1, 10.5, SYSDATE + 20);
INSERT INTO Loans VALUES (102, 2, 12.0, SYSDATE + 45);
INSERT INTO Loans VALUES (103, 3, 11.0, SYSDATE + 10);
INSERT INTO Loans VALUES (104, 4,  9.5, SYSDATE + 60);
INSERT INTO Loans VALUES (105, 5, 13.0, SYSDATE + 5);

COMMIT;

-- ============================================================
-- PL/SQL Block: Scenario 1
-- ============================================================
DECLARE
    CURSOR c_customers IS
        SELECT c.CustomerID, c.CustomerName, c.Age, l.LoanID, l.InterestRate
        FROM Customers c
        JOIN Loans l ON c.CustomerID = l.CustomerID;

    v_new_rate Loans.InterestRate%TYPE;
BEGIN
    DBMS_OUTPUT.PUT_LINE('=== Scenario 1: Loan Interest Rate Discount for Senior Customers ===');
    DBMS_OUTPUT.PUT_LINE('--------------------------------------------------------------');

    FOR rec IN c_customers LOOP
        IF rec.Age > 60 THEN
            v_new_rate := rec.InterestRate - 1;  -- Apply 1% discount

            UPDATE Loans
            SET InterestRate = v_new_rate
            WHERE LoanID = rec.LoanID;

            DBMS_OUTPUT.PUT_LINE('Customer : ' || rec.CustomerName ||
                                 ' | Age: '    || rec.Age          ||
                                 ' | Old Rate: '|| rec.InterestRate || '%' ||
                                 ' | New Rate: '|| v_new_rate      || '%');
        ELSE
            DBMS_OUTPUT.PUT_LINE('Customer : ' || rec.CustomerName ||
                                 ' | Age: '    || rec.Age          ||
                                 ' | No discount applied.');
        END IF;
    END LOOP;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('--------------------------------------------------------------');
    DBMS_OUTPUT.PUT_LINE('Discount applied successfully for customers above 60.');
END;
/
