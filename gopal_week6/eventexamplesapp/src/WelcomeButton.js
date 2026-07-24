import React from 'react';

function WelcomeButton() {
  const [message, setMessage] = React.useState('');

  // Function that accepts an argument
  const sayWelcome = (name) => {
    setMessage(`Welcome, ${name}!`);
  };

  return (
    <div className="welcome-section">
      <h2>Welcome Button</h2>
      {/* Arrow function in onClick passes "welcome" as an argument */}
      <button onClick={() => sayWelcome('welcome')}>Say Welcome</button>
      {message && <p className="welcome-message">{message}</p>}
    </div>
  );
}

export default WelcomeButton;
