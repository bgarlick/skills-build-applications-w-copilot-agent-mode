import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();
    fetchCollection('users', controller.signal)
      .then((items) => {
        setUsers(items);
        setStatus('ready');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('error');
      });
    return () => controller.abort();
  }, []);

  return (
    <section className="view-section">
      <div className="section-heading">
        <div><p className="eyebrow">Community</p><h1>Members</h1></div>
        <span className="count-badge">{users.length} members</span>
      </div>
      {status === 'error' && <p className="alert alert-danger">Members could not be loaded.</p>}
      <div className="data-grid">
        {users.map((user) => (
          <article className="data-card" key={user._id || user.id || user.username}>
            <div className="avatar">{(user.displayName || user.username || '?').slice(0, 1).toUpperCase()}</div>
            <div><h2>{user.displayName || user.username}</h2><p>{user.email}</p><small>@{user.username}</small></div>
          </article>
        ))}
      </div>
      {status === 'ready' && users.length === 0 && <p className="empty-state">No members yet.</p>}
    </section>
  );
}

export default Users;
