import React from 'react';

function ListofPlayers() {
  // Array of 11 players with name and score
  const players = [
    { name: 'Rohit Sharma', score: 85 },
    { name: 'Virat Kohli', score: 92 },
    { name: 'Shubman Gill', score: 65 },
    { name: 'Rishabh Pant', score: 45 },
    { name: 'Hardik Pandya', score: 78 },
    { name: 'Ravindra Jadeja', score: 55 },
    { name: 'KL Rahul', score: 60 },
    { name: 'Jasprit Bumrah', score: 30 },
    { name: 'Mohammed Shami', score: 25 },
    { name: 'Kuldeep Yadav', score: 40 },
    { name: 'Shreyas Iyer', score: 72 }
  ];

  // ES6 map(): transform each player object into a list item
  const playerList = players.map((player, index) => (
    <li key={index}>
      {player.name} - {player.score}
    </li>
  ));

  // ES6 arrow function + filter(): keep only players with score below 70
  const lowScorePlayers = players.filter((player) => player.score < 70);

  const lowScoreList = lowScorePlayers.map((player, index) => (
    <li key={index}>
      {player.name} - {player.score}
    </li>
  ));

  return (
    <div className="list-of-players">
      <h2>List of Players</h2>
      <ul>{playerList}</ul>

      <h2>Players with Score Below 70</h2>
      <ul>{lowScoreList}</ul>
    </div>
  );
}

export default ListofPlayers;
