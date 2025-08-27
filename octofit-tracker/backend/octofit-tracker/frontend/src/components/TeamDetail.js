import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/TeamDetail.css';

const TeamDetail = () => {
  const { teamName } = useParams();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const usersEndpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/users/`
    : '/api/users/';

  useEffect(() => {
    fetch(usersEndpoint)
      .then(res => res.json())
      .then(data => {
        // Filter users based on email domain
        const teamUsers = (data.results || data).filter(user => {
          const emailDomain = user.email.split('@')[1];
          if (teamName.toLowerCase() === 'marvel') {
            return emailDomain === 'marvel.com';
          } else if (teamName.toLowerCase() === 'dc') {
            return emailDomain === 'dc.com';
          }
          // For other teams, match against the team name
          return emailDomain.includes(teamName.toLowerCase());
        });
        setUsers(teamUsers);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [usersEndpoint, teamName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email domain matches team
    const emailDomain = newUser.email.split('@')[1];
    let isValidDomain = false;
    
    if (teamName.toLowerCase() === 'marvel' && emailDomain === 'marvel.com') {
      isValidDomain = true;
    } else if (teamName.toLowerCase() === 'dc' && emailDomain === 'dc.com') {
      isValidDomain = true;
    } else if (emailDomain && emailDomain.includes(teamName.toLowerCase())) {
      isValidDomain = true;
    }
    
    if (!isValidDomain) {
      setMessage(`Email domain must be ${teamName.toLowerCase()}.com for ${teamName} team members`);
      return;
    }

    // Send POST request to add new user
    fetch(usersEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to add user');
        }
        return res.json();
      })
      .then(data => {
        // Add new user to the list
        setUsers([...users, data]);
        // Clear form
        setNewUser({ name: '', email: '' });
        setMessage(`${newUser.name} added to ${teamName} team successfully!`);
        
        // Clear success message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
      })
      .catch(error => {
        console.error('Error adding user:', error);
        setMessage('Error adding user. Please try again.');
      });
  };

  // Function to determine the appropriate icon based on username (copied from Users.js)
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

  // Get team-specific styling
  const getTeamStyle = () => {
    if (teamName.toLowerCase() === 'marvel') {
      return { 
        headerColor: '#e23636', // Marvel red
        accent: '#e23636',
        logo: '⚡' // Marvel symbol
      };
    } else if (teamName.toLowerCase() === 'dc') {
      return { 
        headerColor: '#0476f4', // DC blue
        accent: '#0476f4',
        logo: '🦸‍♂️' // DC symbol
      };
    } else {
      return {
        headerColor: '#4B0082', // Default purple
        accent: '#4B0082',
        logo: '🏆'
      };
    }
  };

  const teamStyle = getTeamStyle();

  return (
    <div className="team-detail-container">
      <div className="team-header" style={{ backgroundColor: teamStyle.headerColor }}>
        <Link to="/teams" className="back-link">← Back to Teams</Link>
        <h2>{teamStyle.logo} {teamName} Team</h2>
      </div>

      <div className="team-content">
        <div className="add-member-form">
          <h3>Add New Team Member</h3>
          {message && <div className={message.includes('Error') ? "error-message" : "success-message"}>{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                required
                placeholder="Enter hero name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                required
                placeholder={`hero@${teamName.toLowerCase()}.com`}
              />
            </div>
            <button type="submit" className="add-button" style={{ backgroundColor: teamStyle.accent }}>
              Add to Team
            </button>
          </form>
        </div>

        <div className="team-members">
          <h3>Team Members</h3>
          {users.length === 0 ? (
            <p>No members found for {teamName} team.</p>
          ) : (
            <div className="users-list">
              {users.map((user, idx) => (
                <div key={idx} className="user-card">
                  <div className="user-avatar" style={{ borderColor: teamStyle.accent }}>
                    <span className="user-icon">{getUserIcon(user.name)}</span>
                  </div>
                  <div className="user-info">
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
