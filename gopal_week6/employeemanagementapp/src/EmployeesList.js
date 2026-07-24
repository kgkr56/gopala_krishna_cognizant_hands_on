import EmployeeCard from './EmployeeCard';

// Note: this component does NOT receive a "theme" prop at all anymore.
// It doesn't need to know about the theme — EmployeeCard reads it directly
// from ThemeContext further down the tree.
function EmployeesList({ employees }) {
  return (
    <div className="employees-list">
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
}

export default EmployeesList;
