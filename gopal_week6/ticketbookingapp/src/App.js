import { useState } from 'react';
import './App.css';
import GuestPage from './GuestPage';
import UserPage from './UserPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  // Element variable: holds the JSX to render based on login state (conditional rendering)
  let page;
  if (isLoggedIn) {
    page = <UserPage />;
  } else {
    page = <GuestPage />;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>Flight Ticket Booking</h1>

        {/* Conditional rendering of Login vs Logout button based on isLoggedIn */}
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </header>

      {page}
    </div>
  );
}

export default App;
