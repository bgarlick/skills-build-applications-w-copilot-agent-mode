import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();
    fetchCollection('activities', controller.signal).then(setActivities).then(() => setStatus('ready')).catch((error) => {
      if (error.name !== 'AbortError') setStatus('error');
    });
    return () => controller.abort();
  }, []);

  return (
    <section className="view-section">
      <div className="section-heading"><div><p className="eyebrow">Movement log</p><h1>Activities</h1></div><span className="count-badge">{activities.length} logged</span></div>
      {status === 'error' && <p className="alert alert-danger">Activities could not be loaded.</p>}
      <div className="table-wrap"><table className="table align-middle"><thead><tr><th>Athlete</th><th>Activity</th><th>Duration</th><th>Distance</th><th>Calories</th></tr></thead><tbody>
        {activities.map((activity) => <tr key={activity._id || activity.id}><td><strong>{activity.user?.displayName || activity.user?.username || 'Unknown athlete'}</strong></td><td className="capitalize">{activity.type}</td><td>{activity.durationMinutes} min</td><td>{activity.distanceKm ? `${activity.distanceKm} km` : '—'}</td><td>{activity.calories} kcal</td></tr>)}
      </tbody></table></div>
      {status === 'ready' && activities.length === 0 && <p className="empty-state">No activities yet.</p>}
    </section>
  );
}

export default Activities;
