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
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
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
  select: {
    width: '100%',
    padding: '8px 12px',
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    fontSize: 14,
    boxSizing: 'border-box',
  },
  button: {
    padding: '4px 8px',
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: 12,
  },
  primaryButton: {
    padding: '8px 16px',
    border: `1px solid ${colors.primary}`,
    borderRadius: 0,
    backgroundColor: colors.primary,
    color: '#fff',
    cursor: 'pointer',
    fontSize: 14,
  },
  buttonRow: {
    display: 'flex',
    gap: 8,
  },
  notifRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.text,
  },
  target: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusSent: { color: '#388e3c' },
  statusDraft: { color: colors.textSecondary },
});

const recentNotifications = [
  { id: 1, title: 'Scheduled Maintenance', target: 'All users', status: 'Sent' },
  { id: 2, title: 'New Mod Submission Tool', target: 'Beta testers', status: 'Draft' },
];

export function AdminNotifications() {
  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.heading)}>Notifications</h1>

      <div {...stylex.props(styles.card)}>
        <h2 {...stylex.props(styles.heading)}>Send Notification</h2>
        <div {...stylex.props(styles.section)}>
          <label {...stylex.props(styles.label)}>Title</label>
          <input type="text" placeholder="Notification title" {...stylex.props(styles.input)} />
        </div>
        <div {...stylex.props(styles.section)}>
          <label {...stylex.props(styles.label)}>Message</label>
          <textarea placeholder="Notification content" {...stylex.props(styles.textarea)} />
        </div>
        <div {...stylex.props(styles.section)}>
          <label {...stylex.props(styles.label)}>Target</label>
          <select {...stylex.props(styles.select)}>
            <option>All users</option>
            <option>Subscribers only</option>
            <option>Admins only</option>
          </select>
        </div>
        <div {...stylex.props(styles.buttonRow)}>
          <button {...stylex.props(styles.primaryButton)}>Send</button>
          <button {...stylex.props(styles.button)}>Save as Draft</button>
        </div>
      </div>

      <h2 {...stylex.props(styles.heading)}>Recent Notifications</h2>
      {recentNotifications.map(n => (
        <div key={n.id} {...stylex.props(styles.card)}>
          <div {...stylex.props(styles.notifRow)}>
            <div>
              <div {...stylex.props(styles.title)}>{n.title}</div>
              <div {...stylex.props(styles.target)}>To: {n.target}</div>
            </div>
            <span {...stylex.props(styles.status, n.status === 'Sent' ? styles.statusSent : styles.statusDraft)}>
              {n.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
