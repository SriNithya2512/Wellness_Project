import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/App.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError(data.msg || 'Registration failed');
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
              alt="Arvyax wellness"
            />
          </div>

          <div className="auth-right">
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
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
              <button type="submit">Register</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '10px' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ fontWeight: 'bold', color: '#007bff' }}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
