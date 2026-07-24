import React from 'react';

function SyntheticEventButton() {
  const [clicked, setClicked] = React.useState(false);

  // React wraps the native browser event in a SyntheticEvent object (here called "e").
  // It behaves like the native DOM event but works consistently across all browsers.
  const handlePress = (e) => {
    console.log('SyntheticEvent type:', e.type); // e.g. "click"
    setClicked(true);
  };

  return (
    <div className="synthetic-section">
      <h2>Synthetic Event</h2>
      <button onClick={handlePress}>OnPress</button>
      {clicked && <p className="clicked-message">I was clicked</p>}
    </div>
  );
}

export default SyntheticEventButton;
