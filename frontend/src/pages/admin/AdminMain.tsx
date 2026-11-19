import { Link } from 'react-router';
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 16,
    marginBottom: 24,
  },
  card: {
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    padding: 16,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  links: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  link: {
    padding: '8px 16px',
    border: `1px solid ${colors.primary}`,
    borderRadius: 0,
    backgroundColor: '#fff',
    color: colors.primary,
    cursor: 'pointer',
    fontSize: 14,
    textDecoration: 'none',
  },
});

export function AdminMain() {
  const stats = [
    { label: 'Games', value: 12 },
    { label: 'Mods', value: 15420 },
    { label: 'Users', value: 8932 },
    { label: 'Downloads', value: 2345678 },
  ];

  const links = [
    { to: '/admin/users', label: 'Users' },
    { to: '/admin/games', label: 'Games' },
    { to: '/admin/mods', label: 'Mods' },
    { to: '/admin/categories', label: 'Categories' },
    { to: '/admin/notifications', label: 'Notifications' },
    { to: '/admin/emails', label: 'Emails' },
    { to: '/admin/links', label: 'Links' },
    { to: '/admin/locked-mods', label: 'Locked Mods' },
  ];

  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.heading)}>Admin Dashboard</h1>

      <div {...stylex.props(styles.grid)}>
        {stats.map((stat) => (
          <div key={stat.label} {...stylex.props(styles.card)}>
            <div {...stylex.props(styles.statLabel)}>{stat.label}</div>
            <div {...stylex.props(styles.statValue)}>{stat.value.toLocaleString()}</div>
          </div>
        ))}
      </div>

      <h2 {...stylex.props(styles.heading)}>Admin Pages</h2>
      <div {...stylex.props(styles.links)}>
        {links.map((link) => (
          <Link key={link.to} to={link.to} {...stylex.props(styles.link)}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
