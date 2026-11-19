import { useState } from 'react';
import { Link } from 'react-router';
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
  text: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
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
  strong: { fontWeight: 'bold' },
});

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/auth/forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to send reset email');
      }
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.card)}>
          <h1 {...stylex.props(styles.heading)}>Check Your Email</h1>
          <p {...stylex.props(styles.text)}>
            A password reset link has been sent to{' '}
            <span {...stylex.props(styles.strong)}>{email}</span>.
          </p>
          <p {...stylex.props(styles.text)}>
            Didn't receive it? Check your spam folder or{' '}
            <Link to="/forgot" {...stylex.props(styles.link)}>try again</Link>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.card)}>
        <h1 {...stylex.props(styles.heading)}>Forgot Password</h1>
        <p {...stylex.props(styles.text)}>
          Enter your email address and we'll send you a link to reset your password.
        </p>
        {error && <div {...stylex.props(styles.error)}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div {...stylex.props(styles.field)}>
            <label {...stylex.props(styles.label)}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              {...stylex.props(styles.input)}
            />
          </div>
          <button type="submit" {...stylex.props(styles.button)} disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <div {...stylex.props(styles.links)}>
          Remember your password?{' '}
          <Link to="/login" {...stylex.props(styles.link)}>Login</Link>
        </div>
      </div>
    </div>
  );
}
