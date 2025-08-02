import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMySessions = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in.');
        return;
      }

      try {
        const res = await fetch('/api/my-sessions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

    fetchMySessions();
  }, []);

  return (
    <div className="sessions-bg">
    <div className="container">
      <h2 className="page-heading">📁 My Sessions</h2>
      {error && <p className="error">{error}</p>}

      {sessions.length === 0 && !error ? (
        <p>You haven't created any sessions yet.</p>
      ) : (
        <div className="session-list">
          {sessions.map((session) => (
            <div className="session-card" key={session._id}>
              <h4 className="session-title">{session.title}</h4>
              <p><strong>Status:</strong> <span className="status">{session.status}</span></p>
              <p><strong>Tags:</strong> {session.tags.join(', ')}</p>
              <p><strong>URL:</strong>{' '}
                <a
                  href={session.json_file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="url-link"
                >
                  {session.json_file_url}
                </a>
              </p>
              <button className="edit-button" onClick={() => navigate(`/editor?id=${session._id}`)}>
                ✏️ Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default MySessions;
