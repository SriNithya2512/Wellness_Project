import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/App.css';

const SessionEditor = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [jsonFileUrl, setJsonFileUrl] = useState('');
  const [error, setError] = useState('');
  const [autoSaveMessage, setAutoSaveMessage] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = localStorage.getItem('token');
  const sessionId = searchParams.get('id');

  const fetchSession = async () => {
    if (!sessionId || !token) return;
    try {
      const res = await fetch(`/api/my-sessions/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setTitle(data.title || '');
        setTags((data.tags || []).join(', '));
        setJsonFileUrl(data.json_file_url || '');
      } else {
        setError(data.msg || 'Failed to fetch session');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  useEffect(() => {
    fetchSession();
    // eslint-disable-next-line
  }, [sessionId]);

  const handleAutoSave = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/my-sessions/save-draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sessionId,
          title,
          tags: tags.split(',').map((tag) => tag.trim()),
          json_file_url: jsonFileUrl,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setAutoSaveMessage('✅ Auto-saved at ' + new Date().toLocaleTimeString());
      } else {
        setAutoSaveMessage('⚠️ Auto-save failed');
      }
      setTimeout(() => setAutoSaveMessage(''), 3000);
    } catch (err) {
      setAutoSaveMessage('⚠️ Auto-save failed');
    }
  };

  useEffect(() => {
    if (!title && !tags && !jsonFileUrl) return;
    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => {
      handleAutoSave();
    }, 5000);
    setTimeoutId(id);
    return () => clearTimeout(id);
    // eslint-disable-next-line
  }, [title, tags, jsonFileUrl]);

  const handleSaveDraft = async () => {
    if (!token) return setError('You must be logged in');
    try {
      const res = await fetch('/api/my-sessions/save-draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sessionId,
          title,
          tags: tags.split(',').map((tag) => tag.trim()),
          json_file_url: jsonFileUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || 'Failed to save draft');
      } else {
        setError('');
        setAutoSaveMessage('✅ Draft saved!');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handlePublish = async () => {
    if (!token) return setError('You must be logged in');
    try {
      const draftRes = await fetch('/api/my-sessions/save-draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sessionId,
          title,
          tags: tags.split(',').map((tag) => tag.trim()),
          json_file_url: jsonFileUrl,
        }),
      });

      const draftData = await draftRes.json();

      if (!draftRes.ok) {
        return setError(draftData.msg || 'Failed to save draft before publishing');
      }

      const publishRes = await fetch('/api/my-sessions/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sessionId: draftData._id,
        }),
      });

      const publishData = await publishRes.json();

      if (!publishRes.ok) {
        setError(publishData.msg || 'Publish failed');
      } else {
        navigate('/my-sessions');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="editor-bg">
    <div className="editor-container">
      <h2>Session Editor</h2>
      {error && <p className="error">{error}</p>}
      {autoSaveMessage && <p className="autosave">{autoSaveMessage}</p>}

      <form onSubmit={(e) => e.preventDefault()} className="editor-form">
        <input
          type="text"
          placeholder="Session Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="text"
          placeholder="JSON File URL"
          value={jsonFileUrl}
          onChange={(e) => setJsonFileUrl(e.target.value)}
        />
        <div className="editor-buttons">
          <div className="editor-buttons">
  <button className="btn-draft" onClick={handleSaveDraft}>Save as Draft</button>
  <button className="btn-publish" onClick={handlePublish}>Publish</button>
</div>

        </div>
      </form>
    </div>
    </div>
  );
};

export default SessionEditor;
