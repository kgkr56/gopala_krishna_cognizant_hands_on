import { useContext } from 'react';
import ThemeContext from './ThemeContext';

function EmployeeCard({ employee }) {
  // Retrieve the current theme directly from context — no props needed
  const theme = useContext(ThemeContext);

  return (
    <div className={`employee-card ${theme}`}>
      <h3>{employee.name}</h3>
      <p>{employee.role}</p>
      <p>{employee.department}</p>
      <button className={`theme-button ${theme}`}>View Profile</button>
    </div>
  );
}

export default EmployeeCard;
