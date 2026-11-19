import { useParams, Link } from 'react-router';
import * as stylex from '@stylexjs/stylex';
import { colors, fonts } from '../styles/tokens.stylex';

const styles = stylex.create({
  container: { padding: 24 },
  heading: {
    fontFamily: fonts.heading,
    fontSize: 24,
    marginBottom: 16,
    color: colors.text,
  },
  meta: {
    display: 'flex',
    gap: 16,
    marginBottom: 24,
    fontSize: 14,
    color: colors.textSecondary,
  },
  buttons: {
    display: 'flex',
    gap: 8,
    marginBottom: 24,
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
  buttonOutline: {
    padding: '8px 16px',
    border: `1px solid ${colors.primary}`,
    borderRadius: 0,
    backgroundColor: '#fff',
    color: colors.primary,
    cursor: 'pointer',
    fontSize: 14,
  },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontFamily: fonts.heading,
    fontSize: 18,
    marginBottom: 12,
    color: colors.text,
  },
  text: {
    fontSize: 14,
    lineHeight: 1.6,
    color: colors.text,
  },
  link: {
    color: colors.primary,
    textDecoration: 'none',
  },
});

const mods = {
  1: {
    name: 'Advanced Propulsion',
    game: 'Kerbal Space Program',
    author: 'RocketMan',
    downloads: 15420,
    version: '1.0.0',
    description: 'Advanced propulsion systems for your space ships.',
    changelog: 'v1.0.0 - Initial release',
  },
};

export function ModDetail() {
  const { id } = useParams();
  const mod = mods[Number(id)] || mods[1];

  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.heading)}>{mod.name}</h1>
      <div {...stylex.props(styles.meta)}>
        <span>by {mod.author}</span>
        <span>{mod.game}</span>
      </div>
      <div {...stylex.props(styles.buttons)}>
        <button {...stylex.props(styles.button)}>Download</button>
        <button {...stylex.props(styles.buttonOutline)}>Like</button>
        <button {...stylex.props(styles.buttonOutline)}>Bookmark</button>
      </div>
      <div {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Description</h2>
        <p {...stylex.props(styles.text)}>{mod.description}</p>
      </div>
      <div {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Changelog</h2>
        <p {...stylex.props(styles.text)}>{mod.changelog}</p>
      </div>
      <div {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Links</h2>
        <Link to={`/${mod.game.toLowerCase().replace(/ /g, '-')}`} {...stylex.props(styles.link)}>
          Back to {mod.game}
        </Link>
      </div>
    </div>
  );
}
