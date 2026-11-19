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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  card: {
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    padding: 16,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '8px 12px',
    borderBottom: `1px solid ${colors.border}`,
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
  td: {
    padding: '8px 12px',
    borderBottom: `1px solid ${colors.border}`,
    fontSize: 14,
  },
  name: {
    fontWeight: 'bold',
    color: colors.text,
  },
  slug: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  status: {
    fontSize: 12,
  },
  statusActive: { color: '#388e3c' },
  statusHidden: { color: colors.textSecondary },
  button: {
    padding: '4px 8px',
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: 12,
  },
  addButton: {
    padding: '8px 16px',
    border: `1px solid ${colors.primary}`,
    borderRadius: 0,
    backgroundColor: colors.primary,
    color: '#fff',
    cursor: 'pointer',
    fontSize: 14,
  },
});

const games = [
  { id: 1, name: 'Kerbal Space Program', slug: 'kerbal-space-program', mods: 15420, status: 'active' },
  { id: 2, name: 'FTL: Faster Than Light', slug: 'ftl-faster-than-light', mods: 8932, status: 'active' },
  { id: 3, name: 'Stellaris', slug: 'stellaris', mods: 12100, status: 'active' },
];

export function AdminGames() {
  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.heading)}>Games</h1>
        <button {...stylex.props(styles.addButton)}>Add Game</button>
      </div>
      <div {...stylex.props(styles.card)}>
        <table {...stylex.props(styles.table)}>
          <thead>
            <tr>
              <th {...stylex.props(styles.th)}>ID</th>
              <th {...stylex.props(styles.th)}>Name</th>
              <th {...stylex.props(styles.th)}>Slug</th>
              <th {...stylex.props(styles.th)}>Mods</th>
              <th {...stylex.props(styles.th)}>Status</th>
              <th {...stylex.props(styles.th)}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td {...stylex.props(styles.td)}>{game.id}</td>
                <td {...stylex.props(styles.td)}><span {...stylex.props(styles.name)}>{game.name}</span></td>
                <td {...stylex.props(styles.td)}><span {...stylex.props(styles.slug)}>{game.slug}</span></td>
                <td {...stylex.props(styles.td)}>{game.mods.toLocaleString()}</td>
                <td {...stylex.props(styles.td)}>
                  <span {...stylex.props(styles.status, game.status === 'active' ? styles.statusActive : styles.statusHidden)}>
                    {game.status}
                  </span>
                </td>
                <td {...stylex.props(styles.td)}>
                  <button {...stylex.props(styles.button)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
