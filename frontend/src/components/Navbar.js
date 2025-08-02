import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!token) return null;

  return (
    <div style={styles.wrapper}>
      <div style={styles.overlay}>
        <nav style={styles.nav}>
          <h2 style={styles.brand}>Arvyax</h2>
          <div style={styles.linksContainer}>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/my-sessions" style={styles.link}>My Sessions</Link>
            <Link to="/editor" style={styles.link}>Editor</Link>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </div>
        </nav>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundImage: 'url("https://www.pixelstalk.net/wp-content/uploads/2016/10/Calming-Images.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    height: '150px',
    width: '100%',
  },
  overlay: {
    backdropFilter: 'blur(6px)',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 20px',
  },
  brand: {
    color: '#fff',
    fontSize: '28px',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
  },
  linksContainer: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '16px',
    textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
  },
  button: {
    background: 'crimson',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: '500',
  }
};

export default Navbar;
