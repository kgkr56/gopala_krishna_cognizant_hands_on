-- ============================================================
-- Scenario 2: Update Employee Bonus Based on Performance
-- ============================================================

-- Table Setup (run once)
CREATE TABLE Employees (
    EmployeeID   NUMBER PRIMARY KEY,
    EmployeeName VARCHAR2(100),
    Department   VARCHAR2(50),
    Salary       NUMBER
);

-- Sample Data
INSERT INTO Employees VALUES (201, 'Kiran Raj',    'HR',        50000);
INSERT INTO Employees VALUES (202, 'Meena Devi',   'HR',        55000);
INSERT INTO Employees VALUES (203, 'Arjun Sharma', 'IT',        70000);
INSERT INTO Employees VALUES (204, 'Priya Nair',   'IT',        65000);
INSERT INTO Employees VALUES (205, 'Ravi Kumar',   'FINANCE',   60000);
INSERT INTO Employees VALUES (206, 'Divya Menon',  'FINANCE',   58000);
COMMIT;

-- ============================================================
-- Stored Procedure: UpdateEmployeeBonus
-- ============================================================
CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus (
    p_department     IN VARCHAR2,
    p_bonus_percent  IN NUMBER
) IS
    CURSOR c_employees IS
        SELECT EmployeeID, EmployeeName, Salary
        FROM Employees
        WHERE Department = p_department;

    v_bonus      NUMBER;
    v_new_salary NUMBER;
BEGIN
    DBMS_OUTPUT.PUT_LINE('=== Employee Bonus Update for Department: ' || p_department || ' ===');
    DBMS_OUTPUT.PUT_LINE('------------------------------------------------------');

    FOR rec IN c_employees LOOP
        v_bonus      := rec.Salary * (p_bonus_percent / 100);
        v_new_salary := rec.Salary + v_bonus;

        UPDATE Employees
        SET Salary = v_new_salary
        WHERE EmployeeID = rec.EmployeeID;

        DBMS_OUTPUT.PUT_LINE('Employee : ' || rec.EmployeeName   ||
                             ' | Old Salary: $' || rec.Salary    ||
                             ' | Bonus ('|| p_bonus_percent ||'%): $' || v_bonus ||
                             ' | New Salary: $' || v_new_salary);
    END LOOP;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('------------------------------------------------------');
    DBMS_OUTPUT.PUT_LINE('Bonus updated successfully for ' || p_department || ' department.');

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('No employees found in department: ' || p_department);
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
        ROLLBACK;
END UpdateEmployeeBonus;
/

-- Execute the procedure (IT department with 10% bonus)
SET SERVEROUTPUT ON;
EXEC UpdateEmployeeBonus('IT', 10);