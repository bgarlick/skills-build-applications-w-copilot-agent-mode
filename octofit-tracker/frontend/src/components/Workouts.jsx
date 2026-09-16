import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();
    fetchCollection('workouts', controller.signal).then(setWorkouts).then(() => setStatus('ready')).catch((error) => {
      if (error.name !== 'AbortError') setStatus('error');
    });
    return () => controller.abort();
  }, []);

  return (
    <section className="view-section">
      <div className="section-heading"><div><p className="eyebrow">Train with intent</p><h1>Workouts</h1></div><span className="count-badge">{workouts.length} plans</span></div>
      {status === 'error' && <p className="alert alert-danger">Workouts could not be loaded.</p>}
      <div className="data-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id || workout.id || workout.title}><div className="workout-top"><span className="category-tag">{workout.category}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><small className="capitalize">{workout.difficulty} · {workout.exercises?.length || 0} exercises</small></article>)}</div>
      {status === 'ready' && workouts.length === 0 && <p className="empty-state">No workouts yet.</p>}
    </section>
  );
}

export default Workouts;
