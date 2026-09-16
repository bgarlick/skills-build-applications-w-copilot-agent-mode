import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();
    fetchCollection('leaderboard', controller.signal).then(setLeaders).then(() => setStatus('ready')).catch((error) => {
      if (error.name !== 'AbortError') setStatus('error');
    });
    return () => controller.abort();
  }, []);

  return (
    <section className="view-section">
      <div className="section-heading"><div><p className="eyebrow">Weekly challenge</p><h1>Leaderboard</h1></div><span className="count-badge">{leaders.length} ranked</span></div>
      {status === 'error' && <p className="alert alert-danger">Leaderboard could not be loaded.</p>}
      <div className="leaderboard-list">{leaders.map((entry) => <article className="leader-row" key={entry._id || entry.id || entry.rank}><span className={`rank rank-${entry.rank}`}>{entry.rank}</span><div className="leader-name"><strong>{entry.user?.displayName || entry.user?.username || 'Unknown athlete'}</strong><span>{entry.weeklyActivities} activities this week</span></div><strong className="points">{entry.points} pts</strong></article>)}</div>
      {status === 'ready' && leaders.length === 0 && <p className="empty-state">No rankings yet.</p>}
    </section>
  );
}

export default Leaderboard;
