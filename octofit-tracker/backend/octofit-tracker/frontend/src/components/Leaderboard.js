import React, { useEffect, useState } from 'react';
import '../styles/Leaderboard.css'; // We'll create this file next

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
    : '/api/leaderboard/';

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard API endpoint:', endpoint);
        console.log('Fetched leaderboard:', data);
        // Sort leaderboard by points in descending order
        const sortedLeaderboard = [...(data.results || data)].sort((a, b) => b.points - a.points);
        setLeaderboard(sortedLeaderboard);
      });
  }, [endpoint]);

  // Function to determine the class name based on position
  const getPositionClass = (index) => {
    if (index === 0) return 'first-place'; // Jungle green for first place
    if (index === 1) return 'second-place'; // Orange for second place
    return ''; // Default for the rest
  };

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, idx) => (
            <tr key={idx} className={getPositionClass(idx)}>
              <td>#{idx + 1}</td>
              <td>Team {entry.team}</td>
              <td>{entry.points} pts</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
