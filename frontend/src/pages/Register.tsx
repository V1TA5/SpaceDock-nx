import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import * as stylex from '@stylexjs/stylex';
import { colors, fonts } from '../styles/tokens.stylex';

const styles = stylex.create({
  container: {
    padding: 24,
    maxWidth: 500,
    margin: 'auto',
  },
  card: {
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    padding: 24,
  },
  heading: {
    fontFamily: fonts.heading,
    fontSize: 24,
    marginBottom: 16,
    color: colors.text,
  },
  error: {
    color: colors.error,
    marginBottom: 16,
    fontSize: 14,
  },
  field: { marginBottom: 16 },
  label: {
    display: 'block',
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.text,
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    fontSize: 14,
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '8px 16px',
    border: `1px solid ${colors.primary}`,
    borderRadius: 0,
    backgroundColor: colors.primary,
    color: '#fff',
    cursor: 'pointer',
    fontSize: 14,
  },
  links: {
    marginTop: 16,
    fontSize: 14,
  },
  link: {
    color: colors.primary,
    textDecoration: 'none',
  },
});

export function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Registration failed');
      }
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.card)}>
        <h1 {...stylex.props(styles.heading)}>Register</h1>
        {error && <div {...stylex.props(styles.error)}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div {...stylex.props(styles.field)}>
            <label {...stylex.props(styles.label)}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              {...stylex.props(styles.input)}
            />
          </div>
          <div {...stylex.props(styles.field)}>
            <label {...stylex.props(styles.label)}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              {...stylex.props(styles.input)}
            />
          </div>
          <div {...stylex.props(styles.field)}>
            <label {...stylex.props(styles.label)}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              {...stylex.props(styles.input)}
            />
          </div>
          <div {...stylex.props(styles.field)}>
            <label {...stylex.props(styles.label)}>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              {...stylex.props(styles.input)}
            />
          </div>
          <button type="submit" {...stylex.props(styles.button)} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div {...stylex.props(styles.links)}>
          Already have an account?{' '}
          <Link to="/login" {...stylex.props(styles.link)}>Login</Link>
        </div>
      </div>
    </div>
  );
}
