import React, { useEffect, useState } from 'react';
import '../styles/Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/users/`
    : '/api/users/';

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Users API endpoint:', endpoint);
        console.log('Fetched users:', data);
        setUsers(data.results || data);
      });
  }, [endpoint]);

  // Function to determine the appropriate icon based on username
  const getUserIcon = (username) => {
    const name = username.toLowerCase();
    
    if (name.includes('spider') || name.includes('spiderman')) {
      return '🕸️'; // Spider web for Spiderman
    } else if (name.includes('iron') || name.includes('ironman')) {
      return '⚙️'; // Gear for Ironman
    } else if (name.includes('bat') || name.includes('batman')) {
      return '🦇'; // Bat for Batman
    } else if (name.includes('hulk')) {
      return '💪'; // Muscle for Hulk
    } else if (name.includes('thor')) {
      return '⚡'; // Lightning for Thor
    } else if (name.includes('captain') || name.includes('america')) {
      return '🛡️'; // Shield for Captain America
    } else if (name.includes('black') && name.includes('widow')) {
      return '🕷️'; // Spider for Black Widow
    } else if (name.includes('wonder') || name.includes('woman')) {
      return '✨'; // Sparkle for Wonder Woman
    } else if (name.includes('super') || name.includes('superman')) {
      return '👑'; // Crown for Superman
    } else {
      return '👤'; // Default person icon
    }
  };

  return (
    <div className="users-container">
      <h2>Users</h2>
      <div className="users-list">
        {users.map((user, idx) => (
          <div key={idx} className="user-card">
            <div className="user-avatar">
              <span className="user-icon">{getUserIcon(user.name)}</span>
            </div>
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
