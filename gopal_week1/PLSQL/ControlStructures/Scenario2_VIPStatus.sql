-- ============================================================
-- Scenario 2: Set IsVIP = TRUE for customers
--             with balance over $10,000
-- ============================================================

DECLARE
    CURSOR c_customers IS
        SELECT CustomerID, CustomerName, Balance, IsVIP
        FROM Customers;
BEGIN
    DBMS_OUTPUT.PUT_LINE('=== Scenario 2: Promote Customers to VIP Status ===');
    DBMS_OUTPUT.PUT_LINE('--------------------------------------------------------------');

    FOR rec IN c_customers LOOP
        IF rec.Balance > 10000 THEN
            UPDATE Customers
            SET IsVIP = 'TRUE'
            WHERE CustomerID = rec.CustomerID;

            DBMS_OUTPUT.PUT_LINE('Customer : ' || rec.CustomerName ||
                                 ' | Balance: $' || rec.Balance    ||
                                 ' | Status : Promoted to VIP ✔');
        ELSE
            DBMS_OUTPUT.PUT_LINE('Customer : ' || rec.CustomerName ||
                                 ' | Balance: $' || rec.Balance    ||
                                 ' | Status : Not eligible for VIP');
        END IF;
    END LOOP;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('--------------------------------------------------------------');
    DBMS_OUTPUT.PUT_LINE('VIP status updated successfully.');
END;
/
