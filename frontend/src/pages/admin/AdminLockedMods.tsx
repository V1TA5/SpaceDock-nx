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
  button: {
    padding: '4px 8px',
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: 12,
  },
});

const lockedMods = [
  {
    id: 1,
    name: 'K&D Enhanced',
    game: 'Kerbal Space Program',
    author: 'moduser1',
    reason: 'Uses unapproved DLL injection',
    lockedBy: 'admin',
    lockedAt: '2026-11-15 14:32',
  },
  {
    id: 2,
    name: 'Physics Tweaker',
    game: 'Kerbal Space Program',
    author: 'spacefan42',
    reason: 'Conflicts with vanilla',
    lockedBy: 'modteam',
    lockedAt: '2026-11-14 09:10',
  },
];

export function AdminLockedMods() {
  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.heading)}>Locked Mods</h1>
      <div {...stylex.props(styles.card)}>
        <table {...stylex.props(styles.table)}>
          <thead>
            <tr>
              <th {...stylex.props(styles.th)}>ID</th>
              <th {...stylex.props(styles.th)}>Name</th>
              <th {...stylex.props(styles.th)}>Game</th>
              <th {...stylex.props(styles.th)}>Author</th>
              <th {...stylex.props(styles.th)}>Reason</th>
              <th {...stylex.props(styles.th)}>Locked By</th>
              <th {...stylex.props(styles.th)}>Locked At</th>
              <th {...stylex.props(styles.th)}>Action</th>
            </tr>
          </thead>
          <tbody>
            {lockedMods.map((m) => (
              <tr key={m.id}>
                <td {...stylex.props(styles.td)}>{m.id}</td>
                <td {...stylex.props(styles.td)}><span {...stylex.props(styles.name)}>{m.name}</span></td>
                <td {...stylex.props(styles.td)}>{m.game}</td>
                <td {...stylex.props(styles.td)}>{m.author}</td>
                <td {...stylex.props(styles.td)}>{m.reason}</td>
                <td {...stylex.props(styles.td)}>{m.lockedBy}</td>
                <td {...stylex.props(styles.td)}>{m.lockedAt}</td>
                <td {...stylex.props(styles.td)}>
                  <button {...stylex.props(styles.button)}>Unlock</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
