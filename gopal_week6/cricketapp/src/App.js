import { useState } from 'react';
import './App.css';
import ListofPlayers from './ListofPlayers';
import IndianPlayers from './IndianPlayers';

function App() {
  const [flag, setFlag] = useState(true);

  // Simple if/else based on the flag variable to decide which component to show
  let content;
  if (flag) {
    content = <ListofPlayers />;
  } else {
    content = <IndianPlayers />;
  }

  return (
    <div className="App">
      <h1>Cricket App</h1>
      <button onClick={() => setFlag(!flag)}>
        Toggle Flag (currently: {flag.toString()})
      </button>
      {content}
    </div>
  );
}

export default App;
