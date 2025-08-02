import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError(data.msg || 'Login failed');
      }
    } catch {
      setError('Server error');
    }
  };

  return (
    
    <div className="auth-page">
      <div className="auth-overlay">
        <div className="auth-container">
          <div className="auth-left">
            <h1>Arvyax App</h1>
            <img
              src="https://wallpaperaccess.com/full/139100.jpg"
              alt="Wellness"
            />
          </div>

          <div className="auth-right">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '10px' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ fontWeight: 'bold', color: '#007bff' }}>
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
