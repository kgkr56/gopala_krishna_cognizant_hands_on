-- ============================================================
-- Scenario 3: Transfer Funds Between Accounts
-- ============================================================

-- Table Setup (run once)
CREATE TABLE Accounts (
    AccountID    NUMBER PRIMARY KEY,
    CustomerName VARCHAR2(100),
    Balance      NUMBER
);

-- Sample Data
INSERT INTO Accounts VALUES (3001, 'Gopal Krishna', 50000);
INSERT INTO Accounts VALUES (3002, 'Ramesh Kumar',  20000);
INSERT INTO Accounts VALUES (3003, 'Suresh Babu',   5000);
INSERT INTO Accounts VALUES (3004, 'Anitha Devi',   75000);
COMMIT;

-- ============================================================
-- Stored Procedure: TransferFunds
-- ============================================================
CREATE OR REPLACE PROCEDURE TransferFunds (
    p_from_account  IN NUMBER,
    p_to_account    IN NUMBER,
    p_amount        IN NUMBER
) IS
    v_from_balance  NUMBER;
    v_from_name     VARCHAR2(100);
    v_to_name       VARCHAR2(100);
BEGIN
    DBMS_OUTPUT.PUT_LINE('=== Fund Transfer ===');
    DBMS_OUTPUT.PUT_LINE('------------------------------------------------------');

    -- Fetch source account details
    SELECT Balance, CustomerName
    INTO v_from_balance, v_from_name
    FROM Accounts
    WHERE AccountID = p_from_account;

    -- Fetch destination account name
    SELECT CustomerName
    INTO v_to_name
    FROM Accounts
    WHERE AccountID = p_to_account;

    DBMS_OUTPUT.PUT_LINE('From Account : ' || p_from_account || ' (' || v_from_name || ')');
    DBMS_OUTPUT.PUT_LINE('To Account   : ' || p_to_account   || ' (' || v_to_name   || ')');
    DBMS_OUTPUT.PUT_LINE('Amount       : $' || p_amount);
    DBMS_OUTPUT.PUT_LINE('------------------------------------------------------');

    -- Check sufficient balance
    IF v_from_balance < p_amount THEN
        DBMS_OUTPUT.PUT_LINE('ERROR: Insufficient balance!');
        DBMS_OUTPUT.PUT_LINE('Available Balance: $' || v_from_balance ||
                             ' | Requested: $' || p_amount);
        ROLLBACK;
        RETURN;
    END IF;

    -- Deduct from source account
    UPDATE Accounts
    SET Balance = Balance - p_amount
    WHERE AccountID = p_from_account;

    -- Add to destination account
    UPDATE Accounts
    SET Balance = Balance + p_amount
    WHERE AccountID = p_to_account;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Transfer Successful!');
    DBMS_OUTPUT.PUT_LINE(v_from_name || ' new balance: $' || (v_from_balance - p_amount));
    DBMS_OUTPUT.PUT_LINE('------------------------------------------------------');

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('ERROR: Account not found!');
        ROLLBACK;
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('ERROR: ' || SQLERRM);
        ROLLBACK;
END TransferFunds;
/

-- Execute: Transfer $10,000 from Account 3001 to 3002
SET SERVEROUTPUT ON;
EXEC TransferFunds(3001, 3002, 10000);

-- Execute: Test insufficient balance (transfer $100,000 from Account 3003)
EXEC TransferFunds(3003, 3002, 100000);