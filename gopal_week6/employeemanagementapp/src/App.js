import { useState } from 'react';
import './App.css';
import ThemeContext from './ThemeContext';
import EmployeesList from './EmployeesList';

const employees = [
  { id: 1, name: 'Priya Sharma', role: 'Frontend Developer', department: 'Engineering' },
  { id: 2, name: 'Arun Kumar', role: 'Backend Developer', department: 'Engineering' },
  { id: 3, name: 'Neha Reddy', role: 'UI/UX Designer', department: 'Design' },
  { id: 4, name: 'Sanjay Mehta', role: 'Project Manager', department: 'Operations' }
];

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    // The Provider makes "theme" available to every component nested inside it,
    // no matter how deep, without passing it down manually as a prop.
    <ThemeContext.Provider value={theme}>
      <div className={`App ${theme}`}>
        <h1>Employee Management App</h1>
        <button className="toggle-button" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>

        {/* No "theme" prop passed here anymore — EmployeesList gets it from context */}
        <EmployeesList employees={employees} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
