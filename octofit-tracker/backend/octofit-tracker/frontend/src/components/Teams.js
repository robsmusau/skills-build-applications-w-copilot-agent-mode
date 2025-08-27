import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Teams.css';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/teams/`
    : '/api/teams/';

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Teams API endpoint:', endpoint);
        console.log('Fetched teams:', data);
        setTeams(data.results || data);
      });
  }, [endpoint]);

  // Get team icon/emoji based on team name
  const getTeamIcon = (teamName) => {
    const name = teamName.toLowerCase();
    if (name === 'marvel') {
      return '⚡'; // Marvel symbol
    } else if (name === 'dc') {
      return '🦸‍♂️'; // DC symbol
    } else if (name.includes('avenger')) {
      return '🛡️'; // Shield for Avengers
    } else if (name.includes('justice')) {
      return '⚖️'; // Justice symbol
    } else {
      return '👥'; // Default team icon
    }
  };

  // Get team color based on team name
  const getTeamColor = (teamName) => {
    const name = teamName.toLowerCase();
    if (name === 'marvel') {
      return '#e23636'; // Marvel red
    } else if (name === 'dc') {
      return '#0476f4'; // DC blue
    } else if (name.includes('avenger')) {
      return '#b11313'; // Avengers red
    } else if (name.includes('justice')) {
      return '#004b9c'; // Justice blue
    } else {
      return '#4B0082'; // Default purple
    }
  };

  return (
    <div className="teams-container">
      <h2>Teams</h2>
      <div className="teams-grid">
        {teams.map((team, idx) => (
          <Link to={`/teams/${team.name}`} className="team-card" key={idx}>
            <div 
              className="team-icon" 
              style={{ backgroundColor: getTeamColor(team.name) }}
            >
              {getTeamIcon(team.name)}
            </div>
            <div className="team-name">{team.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Teams;
