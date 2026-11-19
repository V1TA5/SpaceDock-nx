import { useState } from 'react';
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
  searchRow: {
    display: 'flex',
    gap: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  searchInput: {
    padding: '8px 12px',
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    fontSize: 14,
    width: 300,
  },
  select: {
    padding: '8px 12px',
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    fontSize: 14,
  },
  card: {
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    padding: 16,
    marginBottom: 8,
  },
  userRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.text,
  },
  userEmail: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  badges: {
    display: 'flex',
    gap: 4,
    alignItems: 'center',
  },
  badge: {
    padding: '2px 8px',
    backgroundColor: '#f0f0f0',
    fontSize: 12,
    color: colors.textSecondary,
  },
  badgeBlue: { backgroundColor: '#e3f2fd', color: '#1976d2' },
  badgeGreen: { backgroundColor: '#e8f5e9', color: '#388e3c' },
  badgeRed: { backgroundColor: '#ffebee', color: '#d32f2f' },
  button: {
    padding: '4px 8px',
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: 12,
  },
});

const users = [
  { id: 1, username: 'admin', email: 'admin@spacedock.com', role: 'Superadmin', status: 'Active' },
  { id: 2, username: 'moderator1', email: 'mod1@spacedock.com', role: 'Admin', status: 'Active' },
  { id: 3, username: 'curator_jane', email: 'jane@spacedock.com', role: 'Curator', status: 'Active' },
];

const roles = ['All', 'Superadmin', 'Admin', 'Curator', 'Uploader', 'User'];

export function AdminUsers() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filtered = users.filter(u => {
    const matchesSearch = u.username.toLowerCase().includes(search.toLowerCase()) ||
                          u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.heading)}>Manage Users</h1>

      <div {...stylex.props(styles.searchRow)}>
        <input
          placeholder="Search username or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          {...stylex.props(styles.searchInput)}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          {...stylex.props(styles.select)}
        >
          {roles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div {...stylex.props(styles.card)}>
        <h2 {...stylex.props(styles.heading)}>Users ({filtered.length})</h2>
      </div>

      {filtered.map(u => (
        <div key={u.id} {...stylex.props(styles.card)}>
          <div {...stylex.props(styles.userRow)}>
            <div>
              <div {...stylex.props(styles.userName)}>{u.username}</div>
              <div {...stylex.props(styles.userEmail)}>{u.email}</div>
            </div>
            <div {...stylex.props(styles.badges)}>
              <span {...stylex.props(styles.badge, styles.badgeBlue)}>{u.role}</span>
              <span {...stylex.props(styles.badge, u.status === 'Active' ? styles.badgeGreen : styles.badgeRed)}>{u.status}</span>
              <button {...stylex.props(styles.button)}>Edit</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
