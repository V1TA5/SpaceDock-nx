import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { colors, fonts } from '../styles/tokens.stylex';

const styles = stylex.create({
  container: {
    padding: 24,
    maxWidth: 600,
  },
  heading: {
    fontFamily: fonts.heading,
    fontSize: 24,
    marginBottom: 24,
    color: colors.text,
  },
  card: {
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    padding: 16,
    marginBottom: 16,
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
  textarea: {
    width: '100%',
    padding: '8px 12px',
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    fontSize: 14,
    minHeight: 100,
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  button: {
    padding: '8px 16px',
    border: `1px solid ${colors.primary}`,
    borderRadius: 0,
    backgroundColor: colors.primary,
    color: '#fff',
    cursor: 'pointer',
    fontSize: 14,
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    fontSize: 32,
    color: colors.textSecondary,
  },
});

export function ProfileEdit() {
  const [username, setUsername] = useState('space_pilot');
  const [email, setEmail] = useState('pilot@spacedock.io');
  const [displayName, setDisplayName] = useState('Space Pilot');
  const [bio, setBio] = useState('I explore the stars and mod games.');

  const handleSave = () => {
    console.log('Profile saved', { username, email, displayName, bio });
  };

  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.heading)}>Edit Profile</h1>

      <div {...stylex.props(styles.card)}>
        <div {...stylex.props(styles.avatar)}>?</div>
        <button {...stylex.props(styles.button)}>Upload Avatar</button>
      </div>

      <div {...stylex.props(styles.card)}>
        <div {...stylex.props(styles.field)}>
          <label {...stylex.props(styles.label)}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            {...stylex.props(styles.input)}
          />
        </div>

        <div {...stylex.props(styles.field)}>
          <label {...stylex.props(styles.label)}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            {...stylex.props(styles.input)}
          />
        </div>

        <div {...stylex.props(styles.field)}>
          <label {...stylex.props(styles.label)}>Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            {...stylex.props(styles.input)}
          />
        </div>

        <div {...stylex.props(styles.field)}>
          <label {...stylex.props(styles.label)}>Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            {...stylex.props(styles.textarea)}
          />
        </div>

        <button onClick={handleSave} {...stylex.props(styles.button)}>Save Changes</button>
      </div>
    </div>
  );
}
