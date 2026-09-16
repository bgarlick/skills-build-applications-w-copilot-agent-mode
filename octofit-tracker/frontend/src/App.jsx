import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

const navigation = [
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Members' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/activities">
          <span className="brand-mark">O</span>
          <span>Octofit <em>Tracker</em></span>
        </NavLink>
        <nav className="main-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <NavLink key={item.to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/activities" />} />
        </Routes>
      </main>
      <footer><span>OCTOFIT / DAILY MOTION</span><span>Build consistency. Find your pace.</span></footer>
    </div>
  );
}

export default App;
