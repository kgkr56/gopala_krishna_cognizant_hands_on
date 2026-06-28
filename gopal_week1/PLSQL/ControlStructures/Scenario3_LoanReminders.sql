-- ============================================================
-- Scenario 3: Send reminders for loans due
--             within the next 30 days
-- ============================================================

DECLARE
    CURSOR c_due_loans IS
        SELECT c.CustomerName, l.LoanID, l.DueDate,
               (l.DueDate - SYSDATE) AS DaysLeft
        FROM Customers c
        JOIN Loans l ON c.CustomerID = l.CustomerID
        WHERE l.DueDate BETWEEN SYSDATE AND SYSDATE + 30
        ORDER BY l.DueDate ASC;
BEGIN
    DBMS_OUTPUT.PUT_LINE('=== Scenario 3: Loan Due Date Reminders (Next 30 Days) ===');
    DBMS_OUTPUT.PUT_LINE('--------------------------------------------------------------');

    FOR rec IN c_due_loans LOOP
        DBMS_OUTPUT.PUT_LINE('REMINDER  : Dear ' || rec.CustomerName || ',');
        DBMS_OUTPUT.PUT_LINE('            Your Loan ID ' || rec.LoanID ||
                             ' is due on ' || TO_CHAR(rec.DueDate, 'DD-MON-YYYY') ||
                             ' (' || ROUND(rec.DaysLeft) || ' days left).');
        DBMS_OUTPUT.PUT_LINE('            Please ensure timely payment to avoid penalties.');
        DBMS_OUTPUT.PUT_LINE('--------------------------------------------------------------');
    END LOOP;

    IF c_due_loans%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No loans are due in the next 30 days.');
    END IF;

    DBMS_OUTPUT.PUT_LINE('Reminder process completed.');
END;
/
