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
  filters: {
    display: 'flex',
    gap: 8,
    marginBottom: 16,
  },
  select: {
    padding: '8px 12px',
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    fontSize: 14,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  count: {
    fontSize: 14,
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
  approveButton: {
    padding: '4px 8px',
    border: `1px solid ${colors.primary}`,
    borderRadius: 0,
    backgroundColor: colors.primary,
    color: '#fff',
    cursor: 'pointer',
    fontSize: 12,
  },
  card: {
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    padding: 16,
    marginBottom: 8,
  },
  modRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.text,
  },
  game: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  status: {
    fontSize: 12,
  },
  statusApproved: { color: '#388e3c' },
  statusPending: { color: '#f57c00' },
  statusRejected: { color: '#d32f2f' },
});

const games = [
  { id: 1, name: 'Kerbal Space Program', slug: 'kerbal-space-program' },
  { id: 2, name: 'FTL: Faster Than Light', slug: 'ftl-faster-than-light' },
  { id: 3, name: 'Stellaris', slug: 'stellaris' },
];

const mods = [
  { id: 1, name: 'Advanced Rocketry', game: 'kerbal-space-program', author: 'Raz0r', status: 'approved' },
  { id: 2, name: 'Retrograde Particles', game: 'kerbal-space-program', author: 'Taranis', status: 'pending' },
  { id: 3, name: 'Fuel Economy', game: 'kerbal-space-program', author: 'LunaDev', status: 'approved' },
];

export function AdminMods() {
  const [gameFilter, setGameFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = mods.filter(m => {
    if (gameFilter !== 'all' && m.game !== gameFilter) return false;
    if (statusFilter !== 'all' && m.status !== statusFilter) return false;
    return true;
  });

  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.heading)}>Moderate Mods</h1>
      <div {...stylex.props(styles.filters)}>
        <select
          value={gameFilter}
          onChange={(e) => setGameFilter(e.target.value)}
          {...stylex.props(styles.select)}
        >
          <option value="all">All Games</option>
          {games.map(g => (
            <option key={g.id} value={g.slug}>{g.name}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          {...stylex.props(styles.select)}
        >
          <option value="all">All Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <div {...stylex.props(styles.header)}>
        <span {...stylex.props(styles.count)}>{filtered.length} mods</span>
        <button {...stylex.props(styles.button)}>Refresh</button>
      </div>
      {filtered.map(mod => (
        <div key={mod.id} {...stylex.props(styles.card)}>
          <div {...stylex.props(styles.modRow)}>
            <div>
              <div {...stylex.props(styles.name)}>{mod.name}</div>
              <div {...stylex.props(styles.game)}>
                {games.find(g => g.slug === mod.game)?.name ?? mod.game} · by {mod.author}
              </div>
              <span {...stylex.props(styles.status, mod.status === 'approved' ? styles.statusApproved : mod.status === 'pending' ? styles.statusPending : styles.statusRejected)}>
                {mod.status}
              </span>
            </div>
            <div {...stylex.props(styles.filters)}>
              <button {...stylex.props(styles.approveButton)}>Approve</button>
              <button {...stylex.props(styles.button)}>Reject</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
