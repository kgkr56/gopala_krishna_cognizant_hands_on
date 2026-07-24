import React from 'react';

function IndianPlayers() {
  // Odd team and Even team players
  const oddTeamPlayers = ['Rohit Sharma', 'Virat Kohli', 'Rishabh Pant', 'Jasprit Bumrah', 'Kuldeep Yadav'];
  const evenTeamPlayers = ['Shubman Gill', 'Hardik Pandya', 'Ravindra Jadeja', 'KL Rahul', 'Mohammed Shami', 'Shreyas Iyer'];

  // ES6 Destructuring: pull out individual players by position
  const [oddPlayer1, oddPlayer2, oddPlayer3, ...remainingOddPlayers] = oddTeamPlayers;
  const [evenPlayer1, evenPlayer2, evenPlayer3, ...remainingEvenPlayers] = evenTeamPlayers;

  // Two more arrays for T20 and Ranji Trophy players
  const T20players = ['Suryakumar Yadav', 'Yashasvi Jaiswal', 'Arshdeep Singh'];
  const RanjiTrophyPlayers = ['Sarfaraz Khan', 'Mukesh Kumar', 'Tilak Varma'];

  // ES6 Merge feature: spread operator to combine both arrays
  const allDomesticAndT20Players = [...T20players, ...RanjiTrophyPlayers];

  return (
    <div className="indian-players">
      <h2>Odd Team Players (Destructured)</h2>
      <p>Player 1: {oddPlayer1}</p>
      <p>Player 2: {oddPlayer2}</p>
      <p>Player 3: {oddPlayer3}</p>
      <p>Remaining Odd Team Players: {remainingOddPlayers.join(', ')}</p>

      <h2>Even Team Players (Destructured)</h2>
      <p>Player 1: {evenPlayer1}</p>
      <p>Player 2: {evenPlayer2}</p>
      <p>Player 3: {evenPlayer3}</p>
      <p>Remaining Even Team Players: {remainingEvenPlayers.join(', ')}</p>

      <h2>T20 + Ranji Trophy Players (Merged)</h2>
      <ul>
        {allDomesticAndT20Players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </div>
  );
}

export default IndianPlayers;
