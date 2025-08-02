import React, { useEffect, useState } from 'react';
import '../styles/App.css';

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPublishedSessions = async () => {
      try {
        const res = await fetch('/api/sessions');
        const data = await res.json();
        if (!res.ok) {
          setError(data.msg || 'Error fetching sessions');
        } else {
          setSessions(data);
        }
      } catch (err) {
        setError('Server error');
      }
    };

    fetchPublishedSessions();
  }, []);

  return (
    <div className="dashboard-bg">
    <div className="container">
      <h2 className="page-heading">Published Wellness Sessions</h2>
      {error && <p className="error">{error}</p>}

      {sessions.length === 0 && !error ? (
        <p>No published sessions available.</p>
      ) : (
        <div className="session-list">
          {sessions.map((session) => (
            <div className="session-card" key={session._id}>
              <h4 className="session-title">{session.title}</h4>
              <p><strong>Status:</strong> {session.status}</p>
              <p><strong>Tags:</strong> {session.tags.join(', ')}</p>
              <p>
                <strong>URL:</strong>{' '}
                <a className="url-link" href={session.json_file_url} target="_blank" rel="noreferrer">
                  {session.json_file_url}
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
    
    </div>
  );
};

export default Dashboard;
