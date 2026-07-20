import React from 'react';
import '../Stylesheets/mystyle.css';

function CalculateScore(props) {
  const average = props.total / props.goal;

  return (
    <div className="score-card">
      <h2>Student Score Calculator</h2>
      <p><span className="label">Name:</span> {props.name}</p>
      <p><span className="label">School:</span> {props.school}</p>
      <p><span className="label">Total Marks:</span> {props.total}</p>
      <p><span className="label">Number of Subjects:</span> {props.goal}</p>
      <p className="average"><span className="label">Average Score:</span> {average.toFixed(2)}</p>
    </div>
  );
}

export default CalculateScore;
