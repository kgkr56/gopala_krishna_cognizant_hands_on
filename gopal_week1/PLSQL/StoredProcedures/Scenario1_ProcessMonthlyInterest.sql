-- ============================================================
-- Scenario 1: Process Monthly Interest for Savings Accounts
-- ============================================================

-- Table Setup (run once)
CREATE TABLE SavingsAccounts (
    AccountID   NUMBER PRIMARY KEY,
    CustomerName VARCHAR2(100),
    Balance     NUMBER,
    AccountType VARCHAR2(20) DEFAULT 'SAVINGS'
);

-- Sample Data
INSERT INTO SavingsAccounts VALUES (1001, 'Gopal Krishna', 50000, 'SAVINGS');
INSERT INTO SavingsAccounts VALUES (1002, 'Ramesh Kumar',  30000, 'SAVINGS');
INSERT INTO SavingsAccounts VALUES (1003, 'Suresh Babu',   20000, 'SAVINGS');
INSERT INTO SavingsAccounts VALUES (1004, 'Anitha Devi',   75000, 'SAVINGS');
INSERT INTO SavingsAccounts VALUES (1005, 'Vijay Mohan',   10000, 'SAVINGS');
COMMIT;

-- ============================================================
-- Stored Procedure: ProcessMonthlyInterest
-- ============================================================
CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest IS
    CURSOR c_accounts IS
        SELECT AccountID, CustomerName, Balance
        FROM SavingsAccounts
        WHERE AccountType = 'SAVINGS';

    v_interest      NUMBER;
    v_new_balance   NUMBER;
    v_interest_rate NUMBER := 0.01; -- 1% monthly interest
BEGIN
    DBMS_OUTPUT.PUT_LINE('=== Process Monthly Interest for Savings Accounts ===');
    DBMS_OUTPUT.PUT_LINE('------------------------------------------------------');

    FOR rec IN c_accounts LOOP
        v_interest    := rec.Balance * v_interest_rate;
        v_new_balance := rec.Balance + v_interest;

        UPDATE SavingsAccounts
        SET Balance = v_new_balance
        WHERE AccountID = rec.AccountID;

        DBMS_OUTPUT.PUT_LINE('Account  : ' || rec.AccountID   ||
                             ' | Customer: ' || rec.CustomerName ||
                             ' | Old Balance: $' || rec.Balance  ||
                             ' | Interest: $'    || v_interest   ||
                             ' | New Balance: $' || v_new_balance);
    END LOOP;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('------------------------------------------------------');
    DBMS_OUTPUT.PUT_LINE('Monthly interest processed successfully for all savings accounts.');
END ProcessMonthlyInterest;
/

-- Execute the procedure
SET SERVEROUTPUT ON;
EXEC ProcessMonthlyInterest;