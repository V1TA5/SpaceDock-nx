import { useState } from 'react';
import { useLocation } from 'react-router';
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
  text: {
    fontSize: 14,
    color: colors.text,
  },
});

export function ResetPassword() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/auth/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      if (!response.ok) {
        throw new Error('Reset failed');
      }
      setSuccess(true);
    } catch {
      setError('Failed to reset password');
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.card)}>
          <h1 {...stylex.props(styles.heading)}>Password Reset</h1>
          <p {...stylex.props(styles.text)}>Password has been reset successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.card)}>
        <h1 {...stylex.props(styles.heading)}>Reset Password</h1>
        {error && <div {...stylex.props(styles.error)}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div {...stylex.props(styles.field)}>
            <label {...stylex.props(styles.label)}>New Password</label>
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
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              {...stylex.props(styles.input)}
            />
          </div>
          <button type="submit" {...stylex.props(styles.button)} disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
