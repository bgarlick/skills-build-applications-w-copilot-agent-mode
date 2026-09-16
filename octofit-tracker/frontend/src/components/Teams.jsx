import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();
    fetchCollection('teams', controller.signal).then(setTeams).then(() => setStatus('ready')).catch((error) => {
      if (error.name !== 'AbortError') setStatus('error');
    });
    return () => controller.abort();
  }, []);

  return (
    <section className="view-section">
      <div className="section-heading"><div><p className="eyebrow">Find your people</p><h1>Teams</h1></div><span className="count-badge">{teams.length} teams</span></div>
      {status === 'error' && <p className="alert alert-danger">Teams could not be loaded.</p>}
      <div className="data-grid">{teams.map((team) => <article className="team-card" key={team._id || team.id || team.name}><div className="team-mark">{(team.name || 'T').slice(0, 1)}</div><div><h2>{team.name}</h2><p>{team.description}</p><small>{team.members?.length || 0} members · {team.totalPoints || 0} points</small></div></article>)}</div>
      {status === 'ready' && teams.length === 0 && <p className="empty-state">No teams yet.</p>}
    </section>
  );
}

export default Teams;
