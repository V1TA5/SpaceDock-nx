import * as stylex from '@stylexjs/stylex';
import { colors, fonts } from '../../styles/tokens.stylex';

const styles = stylex.create({
  container: { padding: 24 },
  heading: {
    fontFamily: fonts.heading,
    fontSize: 24,
    marginBottom: 16,
    color: colors.text,
  },
  card: {
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    padding: 16,
    marginBottom: 8,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.text,
  },
  slug: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  button: {
    padding: '4px 8px',
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: 12,
  },
  text: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

const templates = [
  { id: 1, name: 'New User Verification', slug: 'verification' },
  { id: 2, name: 'Password Reset', slug: 'password-reset' },
  { id: 3, name: 'Mod Approval', slug: 'mod-approval' },
];

export function AdminEmails() {
  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.heading)}>Email Templates</h1>

      <div {...stylex.props(styles.card)}>
        <h2 {...stylex.props(styles.heading)}>Send Test Email</h2>
        <div {...stylex.props(styles.row)}>
          <span {...stylex.props(styles.text)}>To: admin@example.com</span>
          <button {...stylex.props(styles.button)}>Send</button>
        </div>
      </div>

      {templates.map(t => (
        <div key={t.id} {...stylex.props(styles.card)}>
          <div {...stylex.props(styles.row)}>
            <div>
              <div {...stylex.props(styles.name)}>{t.name}</div>
              <div {...stylex.props(styles.slug)}>{t.slug}</div>
            </div>
            <button {...stylex.props(styles.button)}>Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
}
