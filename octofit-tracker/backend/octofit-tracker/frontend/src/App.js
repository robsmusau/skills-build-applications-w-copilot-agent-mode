
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import TeamDetail from './components/TeamDetail';
import Users from './components/Users';
import Workouts from './components/Workouts';


function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="/octofitapp-small.png" alt="OctoFit Logo" className="logo-img" />
            <span className="brand-text">OctoFit Tracker</span>
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/teams">Teams</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/workouts">Workouts</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:teamName" element={<TeamDetail />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={
            <div className="welcome-section">
              <img src="/octofitapp-small.png" alt="OctoFit Logo" style={{ height: '120px', marginBottom: '20px' }} />
              <h2>Welcome to OctoFit Tracker!</h2>
              <p>Your personal fitness companion for tracking activities and achieving your health goals.</p>
              <div className="mt-4">
                <Link to="/activities" className="btn me-3">Start Tracking</Link>
                <Link to="/teams" className="btn-secondary btn">Join a Team</Link>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;
